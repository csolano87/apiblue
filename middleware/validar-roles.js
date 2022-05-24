const {repsonse, response}=require('express')


const esAdminRole= (req,res=repsonse,next)=>{  

if(!req.usuario){
    //console.log(req.usuario)
return res.status(500).json({msg : 'Se quiere verificar el role sin validar el token primero'});
}
const {rol,nombre}=req.usuario;
console.log(rol)

if (rol!== 'DOCTOR_ADMIN') {
   return res.status(401).json({msg :`${nombre} no es administrador-no puede hacer esto`}) 
}
next();
}
 const tieneRole=(...roles)=>{

return (req, res=response,next)=>{
    if(!req.usuario){
        console.log(req.usuario)
    return res.status(500).json({msg : 'Se quiere verificar el role sin validar el token primero'});
    }
if(!roles.includes(req.usuario.rol)){
    return res.status(401).json({msg: `El servicio requiere uno de estos roles ${roles}`});

}
    next();
}

} 
module.exports={esAdminRole}