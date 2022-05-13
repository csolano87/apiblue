const {Router}=require('express');
const { password } = require('../controllers/password');



const router=Router();

router.put('/:id',password);


module.exports=router;