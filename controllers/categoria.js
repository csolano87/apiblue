const { Request, Response } = require('express');

const fs = require("fs");

const bcryptjs = require('bcryptjs');

//const { json } =require ('sequelize/types');
const Cabecera = require('../models/cabecera');
const Detalle = require('../models/detalle');
const path = require("path");

const categoriaGet = async(req, res) => {
    const desde=Number(req.query.desde) || 0;


    const cabecera = await Cabecera.findAll({offset: desde, limit:10 } );
    const total = await Cabecera.count();
   res.status(200).json({ok:true,
ordenes:cabecera, total:total })



};

const login=async(req,res)=>{
res.send(200).json({ok:true})
}


const categoriaPost = async(req, res) => {



    const { CODLABORATORIO, LABORATORIO, CODTIPOORDEN, TIPOORDEN, CODPROCEDENCIA, PROCEDENCIA, CODSERVICIO, SERVICIO, CODDOCTOR, DOCTOR, IMPRESORA, NUMEROORDEN, FECHAORDEN, HORAORDEN, TIPOIDENTIFICADOR, IDENTIFICADOR, NOMBRES, APELLIDO, SEGUNDOAPELLIDO, FECHANACIMIENTO, SEXO, OBSERVACIONES } = req.body.CABECERA;



    const existeorden = await Cabecera.findOne({
        where: { NUMEROORDEN: NUMEROORDEN }
    });

    if (existeorden) {
        return res.status(40).json({ msg: 'La orden ya existe' });
    }

    /*  const cabecera = await Cabecera.create({ CODTIPOORDEN,TIPOORDEN,CODPROCEDENCIA,PROCEDENCIA,CODSERVICIO,SERVICIO,CODDOCTOR,DOCTOR,IMPRESORA, NUMEROORDEN, FECHAORDEN, HORAORDEN, TIPOIDENTIFICADOR, IDENTIFICADOR, NOMBRES, APELLIDO, SEGUNDOAPELLIDO, FECHANACIMIENTO, SEXO, OBSERVACIONES}); */
    const cabecera = await Cabecera.create({ CODLABORATORIO, LABORATORIO, CODTIPOORDEN, TIPOORDEN, CODPROCEDENCIA, PROCEDENCIA, CODSERVICIO, SERVICIO, CODDOCTOR, DOCTOR, IMPRESORA, NUMEROORDEN, FECHAORDEN, HORAORDEN, TIPOIDENTIFICADOR, IDENTIFICADOR, NOMBRES, APELLIDO, SEGUNDOAPELLIDO, FECHANACIMIENTO, SEXO, OBSERVACIONES });


    req.body.DETALLE.forEach(async(e) => {
        const detalle = await Detalle.create({ CODEXAMEN: e.CODEXAMEN, EXAMEN: e.EXAMEN, COMENTARIO: e.COMENTARIO, IDCABECERA: cabecera.NUMEROORDEN });

    });




    //const OUT_DIR = "scratch";
    const out_dir= String.raw `C:/xampp/htdocs/`;

    //nova
    const filename = path.join(out_dir, `${NUMEROORDEN}.txt`)








    const fech = FECHAORDEN.replaceAll('/', '')


    const er = HORAORDEN.replaceAll(':', '')
    const nac = FECHANACIMIENTO.replaceAll('/', '')



    //const name = req.body.DETALLE.map(({ CODEXAMEN }) => ` ${CODEXAMEN}`);



    //revi
    const id = req.body.DETALLE.map(({ CODEXAMEN }, i) => `OBR|${i+1}|||${CODEXAMEN}`).join('\n')

    console.log(id)




    //blue lab -revimedical
    const data = `MSH|^~&||BLUE LAB|cobas Infinity|Roche Ecuador|${fech}${er} ||OML^O21^OML_O21|${fech}${er}
PID|1|${IDENTIFICADOR}|${IDENTIFICADOR}|${IDENTIFICADOR}|${APELLIDO}^${NOMBRES}|${SEGUNDOAPELLIDO}|${nac}|${SEXO}
PV1||1|^^|${CODTIPOORDEN}^${TIPOORDEN}|1^BLUELAB|ZBR1^${IMPRESORA}|1|9|9|||||||||${fech}${er}|${NUMEROORDEN}
ORC|NW||||||||${fech}${er}|||${CODDOCTOR}|${CODTIPOORDEN}|||R|${CODSERVICIO}
${id} `

    fs.writeFileSync(`${filename}`, data)

    res.status(201).json({ msg: 'Guardado con exito' });

};
const categoriaUpdate = async(req, res) => {


    res.send('update guardada con exito..');

};

const categoriaDelete = async(req, res) => {

    res.send('delete guardada con exito..');

};

module.exports = {
    categoriaGet,
    categoriaPost,
    categoriaUpdate,
    categoriaDelete,
    login
}