const { Router } = require('express');

const { check } = require('express-validator');
//validator = require('validator');

const { login } = require('../controllers/auth');
const { validarCampos } = require('../middleware/validar-campos');


const router = Router();

router.post('/login',[
<<<<<<< HEAD
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
=======
    check('correo', 'El usuario es obligatorio').not().isEmpty(),
>>>>>>> 07ec100479704ff347dcd1bd236cfa134e5e57a3
    check('password','El password es obligatorio/ min 8 letras').isLength({min :8}),
     validarCampos],
    login);



module.exports=router;