
const  xpath = require('xpath')
, dom = require('xmldom').DOMParser

const axios = require('axios');
const localStorage = require('localStorage');


const loginInfinity = async (encodedToken)=>{
 // console.log('tokenEncodedToken >>> ', encodedToken);
 const tokenResult =localStorage.getItem('Idtoken');
 console.log(tokenResult)
  //console.log('tokenResult >>> ', tokenResult);
  if(tokenResult == undefined || tokenResult == '' || tokenResult == null) {
    
    console.log('LLAMANDO AL SERVICIO LOGIN ......');
    return new Promise(async  (resolve,reject)=>{       
      let params={
        'soap_method':`${process.env.Login}`,
        'pstrUserName':`${process.env.pstrUserName}`,
        'pstrPassword':`${process.env.pstrPassword}`,
        'pblniPad':0
    };

    try {
      
      const intanc= axios.create({
     
        baseURL: `${process.env.baseURL}/zdk.ws.wSessions.cls`,
        params,
        headers: {'Authorization':`Basic ${encodedToken}` }
      }); 
     

      const resp= await intanc.get();
 
      const rawcookies=resp.headers['set-cookie']

      localStorage.setItem('rawcookies',rawcookies)
       const  doc = new dom().parseFromString(resp.data);       
      const select  = xpath.useNamespaces({'SOAP-ENV':'http://tempuri.org'})
      const sn = select('string(//SOAP-ENV:LoginResult)', doc);
      console.log('campo LoginResult:', sn);

      resolve(sn)




      
    } catch (error) {
      console.log('ERROR DE LOGIN ',error)
    }
        
    })   
    
  }
  console.log('NOOOOOO LLAMANDO AL SERVICIO LOGIN ......');
  return tokenResult;

}
module.exports={loginInfinity}