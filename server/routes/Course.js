const express = require('express');
const router = express.Router();
const {auth, isInstructer, isAdmin, isStudent} = require('../middlewares/auth');
const { createCourse, getAllCourses, getCourseDeatils, categoryPageDetails } = require('../controllers/Course');
const { createSection, updateSection, deleteSection } = require('../controllers/Section');
const { createSubSection, updateSubSection, deleteSubSection } = require('../controllers/SubSection');
const { createCategory, getAllCategories } = require('../controllers/Category');
const { createRatingAndReview, getAllrating, getAverageRating, getAllCourseRating } = require('../controllers/RatingAndReview');

/* -------------------------------------------------------------------------- */
/*              Routes to create the course(only for instructer)              */
/* -------------------------------------------------------------------------- */

/* -------------------------- To create the course -------------------------- */
router.post('/createCourse', auth , isInstructer , createCourse );

/* ---------------------------- to get all course --------------------------- */
router.get('/getAllCourse' , getAllCourses );

/* --------------------------- get course details --------------------------- */
router.get('/getCourseDetails' ,getCourseDeatils);

/* -------------------------------------------------------------------------- */
/*                   Routes to create section and subsection                  */
/* -------------------------------------------------------------------------- */

/* ------------------------------- for section ------------------------------ */
router.post('/addSection' , auth ,isInstructer , createSection);
router.post('/updateSection' , auth ,isInstructer , updateSection);
router.delete('/deleteSection' , auth ,isInstructer , deleteSection);

/* ----------------------------- for subsection ----------------------------- */
router.post('/addSubSection' , auth ,isInstructer , createSubSection);
router.post('/updateSubSection' , auth ,isInstructer , updateSubSection);
router.delete('/deleteSubSection' , auth ,isInstructer , deleteSubSection);

/* -------------------------------------------------------------------------- */
/*                      Routes for ctagory only for admin                     */
/* -------------------------------------------------------------------------- */
router.post('/createCategory' , auth , isAdmin , createCategory);
router.get('/showAllCategories' , getAllCategories);
router.get('/showCatgeoryPageDetails' , categoryPageDetails);

/* -------------------------------------------------------------------------- */
/*                   Routes for creating rating and reviews                   */
/* -------------------------------------------------------------------------- */
router.post('/createRating' , auth , isStudent , createRatingAndReview);
router.get('/getAllRating' , getAllrating);
router.get('/getAverageRating' , getAverageRating);
router.get('/getCourseAllRating' , getAllCourseRating);

module.exports = router;

