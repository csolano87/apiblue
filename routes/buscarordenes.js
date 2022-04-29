
const { Router } = require('express');
const {  buscarordenes,buscarordene } = require('../controllers/buscarordenes');
const {validarJWT}=require('../middleware/validar-jwt');
const { esAdminRole } = require('../middleware/validar-roles');


const router = Router();


 router.get('/:cedula',[
   validarJWT,
   esAdminRole,
  ], buscarordenes ); 
router.post('/',[
   validarJWT,
   esAdminRole,
  ], buscarordene );


   module.exports = router;