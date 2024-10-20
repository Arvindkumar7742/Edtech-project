const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { updateProfile, getUserdetails, deleteUser, updateDisplayPicture, getUserEnrolledCourses } = require('../controllers/Profile');

/* -------------------------------------------------------------------------- */
/*                             routes for profile                             */
/* -------------------------------------------------------------------------- */
router.put('/updateProfile', auth, updateProfile);
router.get('/getProfileDetails', auth, getUserdetails);
router.delete('/deleteuser', auth,deleteUser);
router.post('/updateDisplayPicture', auth, updateDisplayPicture);
router.get('/getenrolledcourses',auth , getUserEnrolledCourses);

module.exports = router;