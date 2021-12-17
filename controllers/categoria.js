const { Request, Response } = require('express');

const fs = require("fs");

const bcryptjs = require('bcryptjs');

//const { json } =require ('sequelize/types');
const Cabecera = require('../models/cabecera');
const Detalle = require('../models/detalle');


const categoriaGet = async (req, res) => {
   
    
      
    const cabecera = await Cabecera.findAll();
   
    res.send('select  guardada con exito..');
   
       

};


    const categoriaPost = async (req, res) => {

<<<<<<< HEAD
     
  const {CODLABORATORIO,LABORATORIO,CODTIPOORDEN,TIPOORDEN, CODPROCEDENCIA,PROCEDENCIA,CODSERVICIO,SERVICIO,CODDOCTOR,DOCTOR,IMPRESORA, NUMEROORDEN, FECHAORDEN, HORAORDEN, TIPOIDENTIFICADOR, IDENTIFICADOR, NOMBRES, APELLIDO, SEGUNDOAPELLIDO, FECHANACIMIENTO, SEXO, OBSERVACIONES } = req.body.CABECERA;
   
  const existeorden = await Cabecera.findOne({
    where: {  NUMEROORDEN: NUMEROORDEN }});

    if (existeorden) {
      return res.status(400).json({
      msg:'La orden ya existe'
      });
      }

 /*  const cabecera = await Cabecera.create({ CODTIPOORDEN,TIPOORDEN,CODPROCEDENCIA,PROCEDENCIA,CODSERVICIO,SERVICIO,CODDOCTOR,DOCTOR,IMPRESORA, NUMEROORDEN, FECHAORDEN, HORAORDEN, TIPOIDENTIFICADOR, IDENTIFICADOR, NOMBRES, APELLIDO, SEGUNDOAPELLIDO, FECHANACIMIENTO, SEXO, OBSERVACIONES}); */
 const cabecera = await Cabecera.create({ CODLABORATORIO,LABORATORIO,CODTIPOORDEN,TIPOORDEN,CODPROCEDENCIA,PROCEDENCIA,CODSERVICIO,SERVICIO,CODDOCTOR,DOCTOR,IMPRESORA, NUMEROORDEN, FECHAORDEN, HORAORDEN, TIPOIDENTIFICADOR, IDENTIFICADOR, NOMBRES, APELLIDO, SEGUNDOAPELLIDO, FECHANACIMIENTO, SEXO, OBSERVACIONES});

 




  req.body.DETALLE.forEach(async(e) => { 
    const detalle = await Detalle.create({CODEXAMEN:e.CODEXAMEN,EXAMEN:e.EXAMEN,COMENTARIO:e.COMENTARIO,IDCABECERA:cabecera.NUMEROORDEN});
=======

       const { CODLABORATORIO,LABORATORIO,CODTIPOORDEN,TIPOORDEN,CODPROCEDENCIA,PROCEDENCIA,CODSERVICIO,SERVICIO,CODDOCTOR,DOCTOR,IMPRESORA, NUMEROORDEN, FECHAORDEN, HORAORDEN, TIPOIDENTIFICADOR, IDENTIFICADOR, NOMBRES, APELLIDO, SEGUNDOAPELLIDO, FECHANACIMIENTO, SEXO, OBSERVACIONES } = req.body.CABECERA;
   
  
  
  const cabecera = await Cabecera.create({ CODLABORATORIO,LABORATORIO,CODTIPOORDEN,TIPOORDEN,CODPROCEDENCIA,PROCEDENCIA,CODSERVICIO,SERVICIO,CODDOCTOR,DOCTOR,IMPRESORA, NUMEROORDEN, FECHAORDEN, HORAORDEN, TIPOIDENTIFICADOR, IDENTIFICADOR, NOMBRES, APELLIDO, SEGUNDOAPELLIDO, FECHANACIMIENTO, SEXO, OBSERVACIONES});
 
  req.body.DETALLE.forEach(async(e) => { 
    const detalle = await Detalle.create({CODEXAMEN:e.CODEXAMEN,EXAMEN:e.EXAMEN,COMENTARIO:e.COMENTARIO,IDCABECERA:NUMEROORDEN});
>>>>>>> 07ec100479704ff347dcd1bd236cfa134e5e57a3
  });
  
 


  //const filename = `${CODE}-${year}${month}${day}-${hour}${minutes}-${seconds}-${mili}.txt`
  const filename = `${NUMEROORDEN}.txt`
               
  //    //-------------------si funcionaa
  const id = req.body.DETALLE.map(({ CODEXAMEN }) => CODEXAMEN).join("/n");
  const name = req.body.DETALLE.map(({ EXAMEN }) => EXAMEN).join("|");
 
  const data =`H|\^&|Roche^^Diagnostics|||Order Entry^Interface||HPBO^^cobas_Infinity||||P|
P|1|${NUMEROORDEN}|${IDENTIFICADOR}|${APELLIDO} ${SEGUNDOAPELLIDO}|${NOMBRES}|${FECHANACIMIENTO}|${SEXO}|${IDENTIFICADOR}|${TIPOORDEN}|${OBSERVACIONES}||${FECHAORDEN}|${HORAORDEN}
O|1|${id}|${name}
 `

  fs.writeFileSync( `${filename}`,data)  
 
   res.status(201).json({ 


msg:'Guardado con exito'
    }
      );
    };

    const categoriaUpdate = async (req, res) => {
   
    
        res.send('update guardada con exito..');
    
    };

    const categoriaDelete = async (req, res) => {
   
        res.send('delete guardada con exito..');
    
    };

    module.exports={categoriaGet,

        categoriaPost,
        categoriaUpdate,
        categoriaDelete
    }