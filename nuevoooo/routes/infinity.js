const { Router } = require('express');





const { erGet, tokenInfinity, pacienteInfinity } = require('../controllers/infinity');
const { validarJWT } = require('../middleware/validar-jwt');
const { existenumeroorden } = require('../middleware/validar-orden');

const { esAdminRole } = require('../middleware/validar-roles');
const router = Router();

//router.get('/', tokenInfinity);

router.get('/:NUMEROORDEN', erGet);

//router.post('/:cedula', pacienteInfinity);


module.exports = router;