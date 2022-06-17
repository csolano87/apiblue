const { Request, Response } = require('express');
const  xpath = require('xpath') , dom = require('xmldom').DOMParser
const axios = require('axios').default;
const localStorage = require('localStorage');

const xml2js = require('xml2js');
const fs = require("fs");

const stripNS = require('xml2js').processors.stripPrefix
//const parser = new xml2js.Parser({ attrkey: "ATTR" });
const pacientes=async (req,res)=>{

/*     let params={
        'soap_method':'GetList',
        'pstrSessionKey',
        
    }; */

    const {cedula}=req.params;
    

  const token=  localStorage.getItem('Idtoken')
  
  const rawcookies=localStorage.getItem('rawcookies');
  let params={
    'soap_method':`${process.env.Ordenes}`,
    'pstrSessionKey':`${token}`,
    'pstrPatientID1':`${cedula}`
   /*  'pstrUserName':`${process.env.pstrUserName}`,
    'pstrPassword':`${process.env.pstrPassword}`, 
    'pblniPad':0*/
};
    try {
      
        const intance= axios.create({
               
          /*baseURL: `${process.env.baseURL}/wso.ws.wPatients.cls?soap_method=GetList&pstrSessionKey=${token}&pstrPatientID1=${cedula}&pstrPatientID2=&pstrPatientID3=&pstrFirstName=&pstrLastName=&pstrSeconSurname=&pstrSurNameAndName=&pintAgeUnit=0&pintAgeFrom=&pintAgeTo=&pstrBirthdateFrom=&pstrBirthdateTo=&pstrSex=`,*/
          
          baseURL: `${process.env.baseURL}/wso.ws.wPatients.cls`,
          params,
          headers:{'cookie':rawcookies}
 
        });
  
        const resp= await intance.post();

       const path = `${resp.data}`;
       

        xml2js.parseString(path, {explicitArray : false,mergeAttrs : true, explicitRoot:false,tagNameProcessors: [stripNS]},(err, result)=> {
              if(err ) {
             throw err
          }
        
    const pacientes=result.Body.GetListResponse.GetListResult.diffgram.DefaultDataSet.SQL;
   
   console.log(pacientes)

          res.status(200).json({ok:true ,pacientes: pacientes})
              }); 
     
           
      } catch (error) {
        console.log('ERROR DE PACIENTES ',error)
      }
          
 
};

module.exports={pacientes};