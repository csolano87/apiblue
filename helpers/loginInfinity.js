
const  xpath = require('xpath')
, dom = require('xmldom').DOMParser

const axios = require('axios');
const loginInfinity= async ()=>{
return new Promise((resolve,reject)=>{ 
    


    const CacheUserName = '_SYSTEM'
 
const CachePassword = 'INFINITY'

const token = `${CacheUserName}:${CachePassword}`;
const encodedToken = Buffer.from(token).toString('base64');
const session_url = 'http://192.168.100.102/csp/acb/zdk.ws.wSessions.cls?pstrUserName=ROCHE&pstrPassword=Helpdesk1&pblniPad=0&soap_method=Login'

const config = {
  method: 'get',
  url: session_url,
  
  
  headers: { 'Authorization': 'Basic '+ encodedToken }
};
axios(config)
    .then(function (response) {
   
    
const  doc = new dom().parseFromString(response.data);
     const select  = xpath.useNamespaces({'SOAP-ENV':'http://tempuri.org'})
     const sn = select('string(//SOAP-ENV:LoginResult)', doc);
console.log('Token:', sn);
resolve(sn)
})
.catch(function (error) {
  //console.log(error);
}); 




    })
}

module.exports={loginInfinity}