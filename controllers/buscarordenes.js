

const express = require('express');
const { Request, Response } = require('express');
const Cabecera = require('../models/cabecera');
const localStorage = require('localStorage');
const axios = require('axios').default;
const xml2js = require('xml2js');
const fs = require("fs");
const appt = express();
const { loginInfinity } = require('../helpers/loginInfinity');
const { key } = require('localStorage');
const stripNS = require('xml2js').processors.stripPrefix
const login = require('../controllers/login');
const Usuario = require('../models/usuarios');

//const { json } = require('sequelize/types');

const buscarordenes = async (req, res) => {

   const { cedula } = req.params;

   const tokenID = localStorage.getItem('Idtoken')
   

   const rawcookies = localStorage.getItem('rawcookies');
   let params = {
      'soap_method': `${process.env.Ordenes}`,
      'pstrSessionKey': `${tokenID}`,
       'pstrPatientID2':`${cedula}`,
     // 'pstrSampleID': `${cedula}`,
    //  'pstrOrigin': '9' //`${process.env.pstrOrigin}`

   };

   try {

      const insstance = axios.create({
         baseURL: `${process.env.baseURL}/wso.ws.wOrders.cls`,
         params,
         headers: { 'cookie': rawcookies }
      });

      const respo = await insstance.get();
         const path2 = `${respo.data}`
         xml2js.parseString(path2, { explicitArray: false, mergeAttrs: true, explicitRoot: false, tagNameProcessors: [stripNS] }, (err, result) => {
            if (err) {
               throw err
            }
            
          
          const listaordenes = result.Body.GetListResponse.GetListResult.diffgram.DefaultDataSet.SQL
     
          console.log(listaordenes.SurNameAndName)
        
   if ( Array.isArray(listaordenes) == true ){
              
      const listaorden=   listaordenes.filter( function (el){ 
         return el.IsOrderValidated === 'true',
      el.Origin ==='CONSULTA EXTERNA' });
   console.log('es un array',listaordenes.SurNameAndName)
       res.status(200).json({ ok: true, listaordenes: listaorden })
     

    } else{ 
       let listaArray=[];
       listaArray.push(listaordenes)
     console.log('es un obj convertido en array ',listaArray)
       const listaorden=   listaArray.filter( function (el){ 
          return el.IsOrderValidated === 'true',
          el.Origin ==='CONSULTA EXTERNA'});
       res.status(200).json({ ok: true, listaordenes: listaorden }) 
      }

         
          
      

         })
      
   } catch (error) {
      // console.log(listaordenes)
      console.log('error', error)
      res.status(404).json({ "ok": false, "ERROR DEL SERVER": error })


   }



};

const buscarordene = async (req, res) => {

   const { PatientID2, SampleID } = req.body;
 const user = req.usuario
  console.log('usuario', user.usuario)

   const CacheUserName = `${process.env.CacheUserName}`
   const CachePassword = `${process.env.CachePassword}`
   const token = `${CacheUserName}:${CachePassword}`;
   const encodedToken = Buffer.from(token).toString('base64');

   appt.set('encodedToken', encodedToken);
   console.log('return TokenAuthorization :: ', encodedToken);

   const tokenResult = appt.get('tokenResult');

   const responseToken = await loginInfinity(encodedToken, tokenResult);

   appt.set('tokenResult', responseToken);
   console.log('retorna LoginResult: ', responseToken)
    const Idtoken = responseToken;
  localStorage.setItem('Idtoken', Idtoken);

   const rawcookies = localStorage.getItem('rawcookies');  
   let params = {
        'soap_method': `${process.env.Ordenes}`,
        'pstrSessionKey': `${Idtoken}`,
       // 'pstrSessionKey': `${responseToken}`,
       
        'pstrPatientID2': `${PatientID2}`,
        'pstrSampleID': `${SampleID}`,
      'pstrDoctorID':`${user.usuario}`
   };

 
     
        const intance = axios.create({
            baseURL: `${process.env.baseURL}/wso.ws.wOrders.cls`,
            params,
            headers: { 'cookie': rawcookies }
        });
     
        
            const resp = await intance.post();
           
            try {
                  
                  xml2js.parseString(resp.data, { explicitArray: false, mergeAttrs: true, explicitRoot: false, tagNameProcessors: [stripNS] }, (err, result) => {
               
                     if (err) {
                   
                        throw err
                     }  
                   
                                         
                    const listaordenes = result.Body.GetListResponse.GetListResult.diffgram.DefaultDataSet.SQL;
                  

            


                   if (listaordenes != undefined) {
                     if ( Array.isArray(listaordenes) === true ){
                 
                              
                        res.status(200).json({ok: true,  listaordenes: listaordenes })
                                     
                     }  else { 
                        let listaArray=[];
                        listaArray.push(listaordenes)
                      
                       
                        res.status(200).json({ ok: true,  listaordenes:listaArray }) 
                       }  
                   } else {
                     res.status(200).json({ ok: false,  listaordenes: "undefined"}) 
                   }
                   
               
                                     
                  });  
          
               
         } catch (error) {
            console.log('---- line 147777777');
            appt.set('tokenResult', "");
            buscarordene(req, res);
         } 
   
      
}   


module.exports = {
   buscarordene, buscarordenes
}

/* const buscarordene = async (req, res) => {


   const { PatientID2, SampleID } = req.body;

   const CacheUserName = `${process.env.CacheUserName}`
   const CachePassword = `${process.env.CachePassword}`
   const token = `${CacheUserName}:${CachePassword}`;
   const encodedToken = Buffer.from(token).toString('base64');


   appt.set('encodedToken', encodedToken);
   console.log('return TokenAuthorization :: ', encodedToken);

   const tokenResult = appt.get('tokenResult');

   const responseToken = await loginInfinity(encodedToken, tokenResult);

   appt.set('tokenResult', responseToken);
   console.log('retorna LoginResult: ', responseToken)
   const Idtoken = responseToken;
  // localStorage.setItem('Idtoken', Idtoken);

   const rawcookies = localStorage.getItem('rawcookies');
   let params = {
      'soap_method': `${process.env.Ordenes}`,
      'pstrSessionKey': `${Idtoken}`,
      'pstrPatientID2': `${PatientID2}`,
      'pstrSampleID': `${SampleID}`

   };
  

try {
   
   const intance = axios.create({

      baseURL: `${process.env.baseURL}/wso.ws.wOrders.cls`,
      params,
      headers: { 'cookie': rawcookies }

   });

   const resp = await intance.get();
   console.log('status code :: ',resp.status)
   if(resp.status ==200 ){ 

      const path2 = `${resp.data}`

     xml2js.parseString(path2, { explicitArray: true, mergeAttrs: true, explicitRoot: false, tagNameProcessors: [stripNS] }, (err, result) => {
         if (err) {
            throw err
         
      }         
         const listaordenes = result.Body[0].GetListResponse[0].GetListResult[0].diffgram[0].DefaultDataSet[0].SQL;
  
         if ( listaordenes !='') {
        
            res.status(200).json({ ok: true, token: Idtoken,"status_server" : resp.status,  listaordenes: listaordenes })
                     
          } else {
            console.log('Ingresando try chat2 >>')
            console.log('llamando a erGet nuevamente en el else :: ');
            appt.set('tokenResult', "");
            buscarordene(req, res);
          }
      }) ; 
     
                     
        }else {
         console.log('elseeee:: ');
         res.status(200).json({"success" : false, "status_server" : resp.status, "message": "Problemas con la respuesta del servicio externo, por favor contacte con soporte tecnico." })
       }
       console.log('Ingresando try chat3 >>')
      
      console.log('Ingresando try chat 4>>')
  } catch (error) {
   res.status(404).json({"success" : false, "ERROR DEL SERVER": error })     

} 
   
}    */



module.exports = {
   buscarordene, buscarordenes
}