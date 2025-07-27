const express = require('express');
const { capturePayment, verifySignature, sendPaymentSuccessEmail } = require('../controllers/Payment');
const { auth, isStudent } = require('../middlewares/auth');
const router = express.Router();

/* ------------------------- To capture the payment ------------------------ */
router.post('/capturePayment' , auth ,isStudent, capturePayment);
/* ------------------------- To verify the signature ------------------------ */
router.post('/verifySignature' , auth ,isStudent, verifySignature);
/* ------------------------- successful send the email ------------------------ */
router.post('/sendPaymentSuccessEmail' , auth ,isStudent, sendPaymentSuccessEmail);

module.exports = router;