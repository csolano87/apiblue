
const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet,
    usuariosUpdate,
        usuariosPost,
        usuariosDelete,
        usuariosGetID,
       } = require('../controllers/usuarios');
const { rolValido } = require('../helpers/db-validators');
const { validarCampos } = require('../middleware/validar-campos');
//const Usuario = require('../models/usuarios');

const {validarJWT}=require('../middleware/validar-jwt')


const router = Router();


router.get('/', usuariosGet );
router.get('/:id', usuariosGetID );

router.put('/:id',usuariosUpdate );

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('apellido','El apellido es obligatorio').not().isEmpty(),
    check('usuario','El usuario es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio/ min 8 letras').isLength({min :8}),
    check('rol').custom(rolValido),
    validarCampos],usuariosPost );

router.delete('/:id',usuariosDelete );

//router.patch('/', usuariosPatch );





module.exports = router;