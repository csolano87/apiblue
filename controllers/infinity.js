
const { Request, Response } = require('express');
const axios = require('axios');

const fs = require('fs')
const http = require('http');

const  xpath = require('xpath')
, dom = require('xmldom').DOMParser

const request = require('request');
const { loginInfinity } = require('../helpers/loginInfinity');


  const erGet = async (req, res) => {



    const { code } = req.params;

  

 

    const sn= await loginInfinity();
    
  



const CacheUserName = '_SYSTEM'
 
const CachePassword = 'INFINITY'

const token = `${CacheUserName}:${CachePassword}`;
const encodedToken = Buffer.from(token).toString('base64');
const session_url =`http://192.168.100.102/csp/acb/wso.ws.wReports.cls?pstrSessionKey=${sn}&pstrSampleID=${code}&pstrRegisterDate=2021-08-20&pstrFormatDescription=NUEVO&pstrPrintTarget=Target by default&soap_method=Preview`
//const session_url=`http://192.168.100.102/csp/acb/wso.ws.wReports.cls?soap_method=Preview&pstrSessionKey=${sn}&pstrSampleID=${code}&pstrRegisterDate=20210820&pstrFormatDescription=NUEVO&pstrPrintTarget=Targetbydefault`
const config = {
  method: 'get',
  url: session_url,
  
  headers: { 'Authorization': 'Basic '+ encodedToken }
};

axios(config)
    .then(function (response) {
      const  doc = new dom().parseFromString(response.data);
      const select   =xpath.useNamespaces({'SOAP-ENV':'http://tempuri.org'});
      const pdf = select('string(//SOAP-ENV:PreviewResult)', doc);
res.json({pdf}) 




    })
    .catch(function (error) {
      console.log(error);
    });



 



     



}
module.exports={erGet
}
