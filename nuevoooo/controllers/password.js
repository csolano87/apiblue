



const password=async(req,res)=>{
   

    const {id} =req.params;
        
     

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



res.status(200).json({ok:true, msg:'Se restalecio la constrasena con exito '})
}

module.exports={password}