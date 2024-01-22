const express=require('express');
const { signUpUser, getAllUser,loginUser } = require('../controllers/controller');
const authMiddleware = require('../middleware/authMiddleware');

const router=express.Router();

router.post('/signUp',signUpUser);
router.post('/login',authMiddleware,loginUser);
router.get('/get',authMiddleware,getAllUser)


module.exports=router;