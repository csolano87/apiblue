
const { config } = require('dotenv');
const { Request, Response } = require('express');
const  xpath = require('xpath') , dom = require('xmldom').DOMParser
const axios = require('axios').default;
const localStorage = require('localStorage');

const login=async (req,res)=>{




    let params={
        'soap_method':`${process.env.Login}`,
        'pstrUserName':`${process.env.pstrUserName}`,
        'pstrPassword':`${process.env.pstrPassword}`,
        'pblniPad':0
    };
    /* const CacheUserName = '_SYSTEM'
    const CachePassword = 'INFINITY' */
    const token = `${process.env.CacheUserName}:${process.env.CachePassword}`;
      
    
    const encodedToken = Buffer.from(token).toString('base64');
    try {
      
       const instance= axios.create({
               
          baseURL: `${process.env.baseURL}/zdk.ws.wSessions.cls`,
          params,
         headers: {'Authorization':`Basic ${encodedToken}` }
        }); 
      /*   axios.defaults.baseURL=`${process.env.baseURL}/zdk.ws.wSessions.cls`

        axios.interceptors.request.use((config) =>{
          const psrttokenID = localStorage.getItem('psrttoken');
          if (psrttokenID) 
            config.headers.Authorization=`Basic ${encodedToken}`;
            return config;
          }, error=>{
            return Promise.reject(error)
          
         
         

        }) */
  
        const resp= await instance.post();
       
        const rawcookies=resp.headers['set-cookie']
  
        localStorage.setItem('rawcookies',rawcookies);
         const  doc = new dom().parseFromString(resp.data);       
        const select  = xpath.useNamespaces({'SOAP-ENV':'http://tempuri.org'})
        const Idtoken = select('string(//SOAP-ENV:LoginResult)', doc);

        localStorage.setItem('Idtoken', Idtoken);
         res.status(200).json({ok:true, token:Idtoken}) 
       
      } catch (error) {
        console.log('ERROR DE LOGIN ',error)
      }
          
         


};

module.exports={login};