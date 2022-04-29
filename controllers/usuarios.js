const { Request, Response } = require('express');



const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuarios');



const usuariosGet = async (req, res) => {
   
    const desde=Number(req.query.desde) || 0;
        const usuarios = await Usuario.findAll({  offset: desde, limit: 5 })
   
const total = await Usuario.count();
        res.json({ ok: true,usuarios, total:total });
       

};

const usuariosGetID = async (req, res) => {
   
    
  //  const usuario = await Usuario.find();

    res.json({ usuarios });
   

};





    const usuariosPost = async (req, res) => {
   
    try {
        const {nombre, apellido,usuario, password, rol}=req.body;

         
    const user= new Usuario({nombre, apellido,usuario, password, rol});
   
console.log(user)
    const existeUser = await Usuario.findOne({
        where: {
            usuario: user.usuario
        }
    });

  
    if (existeUser) {
        return res.status(400).json({
            msg:'Este usuario ya existe'
        });
     }
    
// encriptar 

  const salt =bcryptjs.genSaltSync();
  user.password=bcryptjs.hashSync(password, salt )



//try {

    //const usuario=new Usuario(body);
    await user.save();
    res.status(201).json({  msg:'El usuario a sido registrado con exito'
     }
       );
/* } catch (error) {
    console.log(error)
    res.status(500).json({ 


        msg: 'Error al guardar comuniquese con el Administrador..'
     } */
       

    
  
    } catch (error) {
        console.log(error)
    }
    };

    const usuariosUpdate = async (req, res) => {
        const {id} =req.params;
        //const usuario = await Usuario.findByPk(id);
     

        const {  password, ...resto } = req.body;
console.log(password)
        if ( password ) {
            // Encriptar la contraseña
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync( password, salt );
        }
    

        const user = await Usuario.findCreateFind(  resto );

        const usuario = await Usuario.findCreateFind(  resto );


        res.send('update guardada con exito..');
    
    };

    const usuariosDelete = async (req, res) => {
   
    const {id} =req.params;
  
    const user = await Usuario.findByPk(id);
   
    if(!user){
        return res.status(404).json({

            msg:`No existe un usuario con el id ${id}`
        })
    }
   // await usuario.destroy();
   await user.update({estado:false});
        res.status(200).json({
            msg:'El usuario a sido desactivado con exito...'});
    
    };

    module.exports={usuariosGet,
        usuariosGetID,
        usuariosPost,
        usuariosUpdate,
        usuariosDelete
    }