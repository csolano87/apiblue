const { Router } = require('express');

const { check } = require('express-validator');
//validator = require('validator');

const { login } = require('../controllers/auth');
const { validarCampos } = require('../middleware/validar-campos');


const router = Router();

router.post('/login',[

    check('usuario', 'El usuario es obligatorio').not().isEmpty(),

    

    check('password','El password es obligatorio/ min 8 letras').isLength({min :8}),
     validarCampos],
    login);



module.exports=router;