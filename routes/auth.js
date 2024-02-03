const express=require('express');
const router=express.Router();
const authController=require('../controllers/authController');
const authMiddleware=require('../middleware/authMiddleware');

router.post('/login',authController.login);
router.post('/register',authController.register);
router.delete('/DeleteUser',authMiddleware,authController.DeleteUser);

module.exports=router;