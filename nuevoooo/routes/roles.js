
const { Router } = require('express');


const {  consultaroles, createroles} = require('../controllers/roles');


const router = Router();

router.get('/',consultaroles );
router.post('/', createroles );
/* 

router.put('/:id',usuariosUpdate );

router.post('/',usuariosPost );

router.delete('/:id',usuariosDelete );
 */






module.exports = router;