const { Router } = require('express');


const { erGet} = require('../controllers/infinity');
const router = Router();
router.get('/:code', erGet );


module.exports = router;