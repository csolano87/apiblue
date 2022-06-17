
/* const express = require('express');
const axios = require('axios');
const sessionstorage = require('sessionstorage');
const localStorage = require('localStorage');
const cookieParser = require('cookie-parser')
const  xpath = require('xpath')
, dom = require('xmldom').DOMParser
const Cabecera = require('../models/cabecera');
const request = require('request');

const appt = express();

const { loginInfinity } = require('../helpers/loginInfinity');
const { BindingElement } = require('soap/lib/wsdl/elements');
const { BasicAuthSecurity } = require('soap');
const { send } = require('process');
const { cookie } = require('request');
const { ifError } = require('assert');
const { response } = require('express');

const stripNS = require('xml2js').processors.stripPrefix
const xml2js = require('xml2js');
const erGet = async (req, res) => {
  


  const { NUMEROORDEN } = req.params;


console.log(NUMEROORDEN)


  
  
  const CacheUserName = '_SYSTEM'
  const CachePassword = 'INFINITY'
  const token = `${CacheUserName}:${CachePassword}`;
  const encodedToken = Buffer.from(token).toString('base64'); 

  appt.set('encodedToken', encodedToken);
  console.log('return TokenAuthorization :: ', encodedToken);

  const tokenResult = appt.get('tokenResult');

  const responseToken = await loginInfinity(encodedToken, tokenResult);
  appt.set('tokenResult', responseToken);
  console.log('retorna LoginResult: ', responseToken)

  const tokenLoginResult = responseToken;

  const substringcode = NUMEROORDEN.substring(0,6);
  const anio = substringcode.substring(0,2);
  const mes = substringcode.substring(2,4);
  const dia = substringcode.substring(4,6);
  const newCode = anio+'-'+mes+'-'+dia;
  const concatAnio = '20'+newCode;
  const date = concatAnio;
  const description = 'NUEVO'; 

  
  
  const rawcookie =localStorage.getItem('rawcookies')
  console.log(rawcookie)

    
  
       
    const instance = axios.create({
    
      baseURL: 'http://192.168.1.2/csp/acb/wso.ws.wReports.cls?soap_method=Preview&pstrSessionKey='+tokenLoginResult+'&pstrSampleID='+NUMEROORDEN+'&pstrRegisterDate='+date+'&pstrFormatDescription='+description+'&pstrPrintTarget=Target+by+default',
      headers:{'cookie':rawcookie},
      'content-type': 'application/json',
  'accept': 'application/json'
  

  });

try {
  const response= await instance.get();

 
  console.log(response.data)

  
  xml2js.parseString(response.data, {explicitArray : false,mergeAttrs : true, explicitRoot:false,tagNameProcessors: [stripNS]},(err, result)=> {
    if(err ) {
   throw err
   
}

   const pdf=result.Body.PreviewResponse.PreviewResult
      
   if (pdf != undefined ) {

    const report=pdf.replace('localhost','http://192.168.1.2')
     res.status(200).json({"success" : true, "status_server" : response.status, "pdf": report })
 
  
   } else {
    
    res.status(400).json({"success" : false,  "pdf": 'El numero de orden que ingresaste no es correcto verifica la orden y vuleve a intentar..' })
   
   } 
 })

} catch (error) {
  

 
    console.log('---- line 147777777');
    appt.set('tokenResult', "");
    erGet(req, res); 
    } 


module.exports={erGet
}
  
} */
 
/* termina */
 
     /*  if (pdf!='') {

        res.status(200).json({"success" : true, "status_server" : response.status, "pdf": pdf })
           
    } else {
      console.log('llamando a erGet nuevamente en el else :: ');
      appt.set('tokenResult', "");
      erGet(req, res);
    }  */
   
       
   /*  } else {
          
      res.status(200).json({"success" : false, "message": "Problemas con la respuesta del servicio externo, por favor contacte con soporte tecnico." }) 
    } */
   
 /* } catch (error) {
    if(error.response.status === 500){
      res.status(400).json({"pdf":'data no existe'})
   }else{
    const  doc = new dom().parseFromString(response.data);
    const select = xpath.useNamespaces({'SOAP-ENV':'http://tempuri.org'});
    const pdf = select('string(//SOAP-ENV:PreviewResult)', doc);
  
    
    if (pdf!='') {

      res.status(200).json({"success" : true, "status_server" : response.status, "pdf": pdf })
         
  } else {
    console.log('llamando a erGet nuevamente en el else :: ');
    appt.set('tokenResult', "");
    erGet(req, res);
  
   
   }
   
  
 }  

  } */
  
  



/* const returnTokenAuthorization = async => {
  const storageEncodedToken = appt.get('encodedToken');
  console.log('Init encodedToken ::: ', storageEncodedToken);
  if (storageEncodedToken == undefined || storageEncodedToken == '' || storageEncodedToken == null) {
    const CacheUserName = '_SYSTEM'
    const CachePassword = 'INFINITY'
    const token = `${CacheUserName}:${CachePassword}`;
    const encodedToken = Buffer.from(token).toString('base64');
    console.log('Generar Token para authorization: ', encodedToken);
    return encodedToken;
  }  
  return storageEncodedToken; */


 /* 
const express = require('express');
const axios = require('axios');
const sessionstorage = require('sessionstorage');
const localStorage = require('localStorage');
const cookieParser = require('cookie-parser')
const  xpath = require('xpath')
, dom = require('xmldom').DOMParser
const Cabecera = require('../models/cabecera');
const request = require('request');

const appt = express();

const { loginInfinity } = require('../helpers/loginInfinity');
const { BindingElement } = require('soap/lib/wsdl/elements');
const { BasicAuthSecurity } = require('soap');
const { send } = require('process');
const { cookie } = require('request');
const erGet = async (req, res) => {
  


  const { NUMEROORDEN } = req.params;



  if (NUMEROORDEN.length < 10 || NUMEROORDEN.length > 10) {
     res.status(404).json({msg:`El numero de orden: ${NUMEROORDEN} no es el correcto`});


    } 


  
  
  const CacheUserName = '_SYSTEM'
  const CachePassword = 'INFINITY'
  const token = `${CacheUserName}:${CachePassword}`;
  const encodedToken = Buffer.from(token).toString('base64');

  appt.set('encodedToken', encodedToken);
  console.log('return TokenAuthorization :: ', encodedToken);

  const tokenResult = appt.get('tokenResult');

  const responseToken = await loginInfinity(encodedToken, tokenResult);
  appt.set('tokenResult', responseToken);
  console.log('retorna LoginResult: ', responseToken)

  const tokenLoginResult = responseToken;

  const substringcode = NUMEROORDEN.substring(0,6);
  const anio = substringcode.substring(0,2);
  const mes = substringcode.substring(2,4);
  const dia = substringcode.substring(4,6);
  const newCode = anio+'-'+mes+'-'+dia;
  const concatAnio = '20'+newCode;
  const date = concatAnio;
  const description = 'NUEVO';
  
  const rawcookie =localStorage.getItem('rawcookies')
  console.log(rawcookie)

    
  try {
    const instance = axios.create({
    
        baseURL: 'http://192.168.1.2/csp/acb/wso.ws.wReports.cls?soap_method=Preview&pstrSessionKey='+tokenLoginResult+'&pstrSampleID='+NUMEROORDEN+'&pstrRegisterDate='+date+'&pstrFormatDescription='+description+'&pstrPrintTarget=Target+by+default',
        headers:{'cookie':rawcookie}
    
 
    });
  
    const response= await instance.get();

    console.log('status code :: ', response.status);

    if(response.status == 200) {
      const  doc = new dom().parseFromString(response.data);
      const select = xpath.useNamespaces({'SOAP-ENV':'http://tempuri.org'});
      const pdf = select('string(//SOAP-ENV:PreviewResult)', doc);
        
      if (pdf!='') {

        res.status(200).json({"success" : true, "status_server" : response.status, "pdf": pdf })
      } else {
        console.log(pdf)
       console.log('aqui 11')
        console.log('llamando a erGet nuevamente en el else :: ');
        appt.set('tokenResult', "");
        erGet(req, res);
      }
       console.log('aqui 221')
    } else {
      console.log('aqui 22')
      console.log('elseeee:: ');
      res.status(200).json({"success" : false, "status_server" : response.status, "message": "Problemas con la respuesta del servicio externo, por favor contacte con soporte tecnico." })
    }
      console.log('aqui3')
  } catch (error) {
    res.status(404).json({"success" : false, "ERROR DEL SERVER": error })
  }
  
  

}

const returnTokenAuthorization = async => {
  const storageEncodedToken = appt.get('encodedToken');
  console.log('Init encodedToken ::: ', storageEncodedToken);
  if (storageEncodedToken == undefined || storageEncodedToken == '' || storageEncodedToken == null) {
    const CacheUserName = '_SYSTEM'
    const CachePassword = 'INFINITY'
    const token = `${CacheUserName}:${CachePassword}`;
    const encodedToken = Buffer.from(token).toString('base64');
    console.log('Generar Token para authorization: ', encodedToken);
    return encodedToken;
  }  
  return storageEncodedToken;
} 


module.exports={erGet
}

 
 */



const express = require('express');
const axios = require('axios');
const sessionstorage = require('sessionstorage');
const localStorage = require('localStorage');
const cookieParser = require('cookie-parser')
const  xpath = require('xpath')
, dom = require('xmldom').DOMParser
const Cabecera = require('../models/cabecera');
const request = require('request');

const appt = express();
const { loginInfinity } = require('../helpers/loginInfinity');
const { BindingElement } = require('soap/lib/wsdl/elements');
const { BasicAuthSecurity } = require('soap');
const { send } = require('process');
const { cookie } = require('request');
const stripNS = require('xml2js').processors.stripPrefix
const xml2js = require('xml2js');
const erGet = async (req, res) => {
  
  const { NUMEROORDEN } = req.params;
  
    

  const substringcode = NUMEROORDEN.substring(0,6);
  const anio = substringcode.substring(0,2);
  const mes = substringcode.substring(2,4);
  const dia = substringcode.substring(4,6);
  const newCode = anio+'-'+mes+'-'+dia;
  const concatAnio = '20'+newCode;
  const date = concatAnio;
  //const description = 'INFORMES DOCENTE';
  const description = 'NUEVO';
  const rawcookie=localStorage.getItem('rawcookies')
  const tokenID = localStorage.getItem('Idtoken')
  const params= {
      

    'soap_method':`${process.env.Reporte}`,
    'pstrSessionKey':`${tokenID}`,
    'pstrSampleID':`${NUMEROORDEN}`,
    'pstrRegisterDate':`${date}`,
    'pstrFormatDescription':`${description}`,
    'pstrPrintTarget':`${process.env.Target}`


    }; 
 
  try {
    const instance = axios.create({

         
      baseURL: `${process.env.baseURL}/wso.ws.wReports.cls`,
      params,
      headers:{'cookie':rawcookie} 
    });
    const response= await instance.get();
 
    console.log('status code :: ', response.status);
    console.log(response.data)
  
    xml2js.parseString(response.data, {explicitArray : false,mergeAttrs : true, explicitRoot:false,tagNameProcessors: [stripNS]},(err, result)=> {
      if(err ) {
     throw err
     
  }
  
     const pdf=result.Body.PreviewResponse.PreviewResult
     console.log(pdf)
        
     if (pdf != undefined ) {
  
      const report=pdf.replace('localhost','http://192.168.1.2')
       res.status(200).json({"success" : true, "status_server" : response.status, "pdf": report })
   
    
     } else {
      
      res.status(400).json({"success" : false,  "pdf": 'El numero de orden que ingresaste no es correcto verifica la orden y vuleve a intentar..' })
     
     } 
   })

  } catch (error) {
    res.status(404).json({"success" : false, "error": error })

  }
  
  

}





module.exports={erGet
}



 

