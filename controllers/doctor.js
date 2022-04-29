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
const { CLIENT_RENEG_LIMIT } = require('tls');
const { Console } = require('console');


const doctor=async(req,res)=>{


    const tokenID=localStorage.getItem('Idtoken')
    const rawcookies=localStorage.getItem('rawcookies');
let params={
    'soap_method':'GetList',
    'pstrSessionKey':`${tokenID}`,
    'pstrDemographicCode':'',
    'pstrDemographicName':'Doctor',
    'pstrValueCode':'',
    'pstrDescription':'',
    'pintStatus': 1
};


const instance=axios.create({
    baseURL:`${process.env.baseURL}/wso.ws.wDemographicValues.cls`,
    params,
    headers: { 'cookie': rawcookies }
});

const resp=await instance.get();

 
xml2js.parseString(resp.data, { explicitArray: false, mergeAttrs: true, explicitRoot: false, tagNameProcessors: [stripNS] }, (err, result) => {
   if (err) {
      throw err
   }
const listadoctor = JSON.parse(JSON.stringify(result.Body.GetListResponse.GetListResult.diffgram.DefaultDataSet.SQL))
//const listadoctor=result.Body.GetListResponse.GetListResult.diffgram.DefaultDataSet.SQL;


res.status(200).json({ok:true,lista:listadoctor})
}) 
}
module.exports={doctor}