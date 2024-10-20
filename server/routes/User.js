const express = require('express');
const { signUp, login, sendOTP, changePassword } = require('../controllers/Auth');
const { resetPasswordToken, resetPassword } = require('../controllers/ResetPassword');
const { auth } = require('../middlewares/auth');
const router = express.Router();

//For user to sign up or login
router.post('/signup',signUp);
router.post('/login' ,login);

//For user to verify otp
router.post('/sendotp' ,sendOTP);

//email send for reset password
router.post('/reset-password-token' ,resetPasswordToken);
router.post('/reset-password' ,resetPassword);

//pasword update route
router.post('/changepassword',auth,changePassword);

//Change password route is pending???


//create rating to an course
module.exports= router
