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
        const {doctor, codigo_doctor,usuario, password, rol}=req.body;
console.log({doctor, codigo_doctor,usuario, password, rol})
    

      let nomdoctor = doctor.indexOf(" ");
      
      let nombredoctor = doctor.substring( nomdoctor);
     

const codDoctor=doctor.indexOf(" ");
         let ceduladoctor = doctor.substring(0, codDoctor);

        // const report=pdf.replace('localhost','http://192.168.1.2')
    const user= new Usuario({doctor:nombredoctor, codigo_doctor:ceduladoctor,usuario, password, rol});
   
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
        const {body}=req
     console.log(id)
     const existeUser = await Usuario.findByPk(id);
     console.log(existeUser)
      /*   
       if ( password ) {
           
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync( password, salt );
        }  */
    

       //const user = await Usuario.findCreateFind(  resto );

         await existeUser.update(  body );
       

       res.status(200).json({ok:true, usuario:existeUser})
    
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