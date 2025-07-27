const express = require("express");
const router = express.Router();
const { auth, isInstructer } = require("../middlewares/auth");
const {
  updateProfile,
  getUserdetails,
  deleteUser,
  updateDisplayPicture,
  getUserEnrolledCourses,
  instructorDashboard,
} = require("../controllers/Profile");

/* -------------------------------------------------------------------------- */
/*                             routes for profile                             */
/* -------------------------------------------------------------------------- */
router.put("/updateProfile", auth, updateProfile);
router.get("/getProfileDetails", auth, getUserdetails);
router.delete("/deleteuser", auth, deleteUser);
router.post("/updateDisplayPicture", auth, updateDisplayPicture);
router.get("/getenrolledcourses", auth, getUserEnrolledCourses);
router.get("/instructorDashboard", auth, isInstructer, instructorDashboard);

module.exports = router;
