
const { Router } = require('express');


const { pacientes} = require('../controllers/pacientes');


const router = Router();


router.post('/:cedula', pacientes );

/* 
router.put('/:id',usuariosUpdate );

router.post('/',usuariosPost );

router.delete('/:id',usuariosDelete );
 */






module.exports = router;