const {Router}=require('express');
const { doctor } = require('../controllers/doctor');



const router=Router();

router.get('/',doctor);


module.exports=router;