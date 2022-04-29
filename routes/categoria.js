
const { Router } = require('express');
const { check } = require('express-validator');

const { categoriaGet,
    categoriaUpdate,
    categoriaPost,
        categoriaDelete,login
       } = require('../controllers/categoria');
const { existenumeroorden } = require('../helpers/db-validators');


const { validarCampos } = require('../middleware/validar-campos');
//const Usuario = require('../models/usuarios');

const {validarJWT}=require('../middleware/validar-jwt');
const { esAdminRole } = require('../middleware/validar-roles');


const router = Router();


router.get('/', [validarJWT,
    esAdminRole],categoriaGet );


router.put('/:id',categoriaUpdate );
router.get('/',login);
router.post('/',[validarJWT,
    esAdminRole,
  
     check('CABECERA.NUMEROORDEN','El numero de orden dede contener 10 caracteres').isLength({min:10,max :10}),
    
     check('CABECERA.CODTIPOORDEN', 'El CODTIPOORDEN es obligatorio').not().isEmpty(),
     check('CABECERA.TIPOORDEN', 'El TIPOORDEN es obligatorio').not().isEmpty(),
     check('CABECERA.CODPROCEDENCIA', 'El CODPROCEDENCIA es obligatorio').not().isEmpty(),
     check('CABECERA.PROCEDENCIA', 'El PROCEDENCIA es obligatorio').not().isEmpty(),
     check('CABECERA.CODSERVICIO', 'El CODSERVICIO es obligatorio').not().isEmpty(),
     check('CABECERA.SERVICIO', 'El SERVICIO es obligatorio').not().isEmpty(),
     check('CABECERA.CODDOCTOR', 'El CODDOCTOR es obligatorio').not().isEmpty(),
     check('CABECERA.DOCTOR', 'El DOCTOR es obligatorio').not().isEmpty(),
     check('CABECERA.IMPRESORA', 'El IMPRESORA es obligatorio').not().isEmpty(),
     check('CABECERA.FECHAORDEN', 'El FECHAORDEN es obligatorio').not().isEmpty(),

     check('CABECERA.HORAORDEN', 'El HORAORDEN es obligatorio').not().isEmpty(),
     check('CABECERA.TIPOIDENTIFICADOR', 'El TIPOIDENTIFICADOR es obligatorio').not().isEmpty(),
     check('CABECERA.IDENTIFICADOR', 'El IDENTIFICADOR es obligatorio').not().isEmpty(),
     check('CABECERA.NOMBRES', 'El NOMBRES es obligatorio').not().isEmpty(),
     check('CABECERA.APELLIDO', 'El APELLIDO es obligatorio').not().isEmpty(),
     

     check('CABECERA.SEGUNDOAPELLIDO', 'El SEGUNDOAPELLIDO es obligatorio').not().isEmpty(),
     check('CABECERA.FECHANACIMIENTO', 'El FECHANACIMIENTO es obligatorio').not().isEmpty(),
  
     check('CABECERA.SEXO', 'El SEXO es obligatorio').not().isEmpty(),
     check('CABECERA.OBSERVACIONES', 'El OBSERVACIONES es obligatorio').not().isEmpty(),
     check('DETALLE.*.CODEXAMEN', 'El CODEXAMEN es obligatorio',).not().isEmpty(),
     check('DETALLE.*.EXAMEN', 'El EXAMEN es obligatorio').not().isEmpty(),
     
    validarCampos
    ],categoriaPost );

router.delete('/:id' ,[validarJWT,esAdminRole],categoriaDelete );

//router.patch('/', usuariosPatch );





module.exports = router;