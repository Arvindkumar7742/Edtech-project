const express = require('express');
const { contactUS } = require('../controllers/ContactUs');
const router = express.Router();

//Route for to contact 
router.post("/contact",contactUS);

//create rating to an course
module.exports= router
