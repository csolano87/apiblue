
const { Router } = require('express');
const { check } = require('express-validator');

const { categoriaGet,
    categoriaUpdate,
    categoriaPost,
        categoriaDelete,
       } = require('../controllers/categoria');
const { validarCampos } = require('../middleware/validar-campos');
//const Usuario = require('../models/usuarios');

const {validarJWT}=require('../middleware/validar-jwt')


const router = Router();


router.get('/', categoriaGet );


router.put('/:id',categoriaUpdate );

router.post('/',[validarJWT
    //check('AREA','El area es obligatorio').not().isEmpty(),
   /*  check('Header.AREA','El area es obligatorio').not().isEmpty(),
    check('Header.CODE','El code es obligatorio').not().isEmpty(),
    check('Header.DATE','El date es obligatorio').not().isEmpty(),
    check('Header.HOUR','El hour es obligatorio').not().isEmpty(),
    check('Header.IDENTIFICATIONTYPE','El tipode identificacion es obligatorio').not().isEmpty(),
    check('Header.IDENTIFIER','El identifier es obligatorio').not().isEmpty(),
    check('Header.NAME','El name es obligatorio').not().isEmpty(),
    check('Header.LASTNAME','El lastname es obligatorio').not().isEmpty(),
    check('Header.SECONDLASTNAME','El secondlastname es obligatorio').not().isEmpty(),
    check('Header.BIRTHDAY','El birthday es obligatorio').not().isEmpty(),
    check('Header.SEX','El sex es obligatorio').not().isEmpty(),
    check('Header.OBSERVATION','El observation es obligatorio').not().isEmpty(), */
    //check('Lines.CODE','El code es obligatorio').not().isEmpty(),
    //check('Lines.PRODUCTOID','El productoid es obligatorio').not().isEmpty(),
    //check('Lines.PRODUCTONAME','El productoname es obligatorio').not().isEmpty(),
  
    ],categoriaPost );

router.delete('/:id',categoriaDelete );

//router.patch('/', usuariosPatch );





module.exports = router;