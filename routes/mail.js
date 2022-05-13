const {Router}=require('express');
const { mail } = require('../controllers/mail');



const router=Router();

router.post('/',mail);


module.exports=router;