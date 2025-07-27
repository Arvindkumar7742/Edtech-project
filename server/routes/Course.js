const express = require("express");
const router = express.Router();
const {
  auth,
  isInstructer,
  isAdmin,
  isStudent,
} = require("../middlewares/auth");
const {
  createCourse,
  getAllCourses,
  getCourseDeatils,
  categoryPageDetails,
  editCourse,
  getInstructorCourses,
  deleteCourse,
  getFullCourseDetails,
} = require("../controllers/Course");
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/SubSection");
const { createCategory, getAllCategories } = require("../controllers/Category");
const {
  createRatingAndReview,
  getAllrating,
  getAverageRating,
  getAllCourseRating,
  getAllRatingReview,
} = require("../controllers/RatingAndReview");
const { updateCourseProgress } = require("../controllers/courseProgress");

/* -------------------------------------------------------------------------- */
/*              Routes to create the course(only for instructer)              */
/* -------------------------------------------------------------------------- */

/* -------------------------- To create the course -------------------------- */
router.post("/createCourse", auth, isInstructer, createCourse);

/* -------------------------- To edit the course -------------------------- */
router.post("/editCourse", auth, isInstructer, editCourse);

/* --------------------------- get course details --------------------------- */
router.post("/getFullCourseDetails", auth, getFullCourseDetails);
router.post("/getCourseDetails", getCourseDeatils);

/* --------------------------- To delete an course -------------------------- */
router.delete("/deleteCourse", auth, isInstructer, deleteCourse);

/* -------------------------------------------------------------------------- */
/*                   Routes to create section and subsection                  */
/* -------------------------------------------------------------------------- */

/* ------------------------------- for section ------------------------------ */
router.post("/addSection", auth, isInstructer, createSection);
router.post("/updateSection", auth, isInstructer, updateSection);
router.delete("/deleteSection", auth, isInstructer, deleteSection);

/* ----------------------------- for subsection ----------------------------- */
router.post("/addSubSection", auth, isInstructer, createSubSection);
router.post("/updateSubSection", auth, isInstructer, updateSubSection);
router.delete("/deleteSubSection", auth, isInstructer, deleteSubSection);

/* -------------------------------------------------------------------------- */
/*                      Routes for ctagory only for admin                     */
/* -------------------------------------------------------------------------- */
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", getAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

/* -------------------------------------------------------------------------- */
/*                   Routes for creating rating and reviews                   */
/* -------------------------------------------------------------------------- */
router.post("/createRating", auth, isStudent, createRatingAndReview);
router.get("/getReviews", getAllRatingReview);
router.get("/getAverageRating", getAverageRating);
router.get("/getCourseAllRating", getAllCourseRating);

// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructer, getInstructorCourses);

// Course progress Update Route
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

module.exports = router;
