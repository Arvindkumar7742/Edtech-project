const express = require('express');
const { capturePayment, varifySignature } = require('../controllers/Payment');
const { auth, isStudent } = require('../middlewares/auth');
const router = express.Router();

/* ------------------------- To captutre the payment ------------------------ */
router.post('/capturePayment' , auth ,isStudent, capturePayment);
router.post('/verifySignature' , varifySignature);

module.exports = router;