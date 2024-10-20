const User = require("../models/User");
const Course = require("../models/Course");
const RatingAndReview = require("../models/RatingAndReviews");
const { default: mongoose } = require("mongoose");


//create ratting
exports.createRatingAndReview = async (req, res) => {
    try {
        //get user id
        const userId = req.user.id;

        //fetch data from req body
        const { rating, reviews, courseId } = req.body;

        if (!rating || !reviews || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Provide all fields"
            })
        }

        //validate user Enrollled or not
        const EnrollledStudent = await Course.findOne({
            _id: courseId,
            studentEnrolled: {
                $elemMatch: {
                    $eq: userId
                }
            }
        })

        //Check user already review the course
        const alreadyReview = await RatingAndReview.findOne({
            user: userId,
            course: courseId
        })

        //create ratting 
        const ratingAndReview = await RatingAndReview.create({
            rating, reviews,
            user: userId,
            course: courseId,
        })

        //course updadate with this ratting
        const updatedCourse = await Course.findByIdAndUpdate(courseId, {
            $push: {
                ratingAndReviews: ratingAndReview._id,
            }
        })
        console.log(updatedCourse);

        //return the response
        return res.status(200).json({
            success: true,
            message: "Rating and review created successfully.",
            ratingAndReview
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "unable to create rating and review."
        })
    }
}

//get average ratting 
exports.getAverageRating = async (req, res) => {
    try {
        //fetch the courseId from reqbody
        const { courseId } = req.body;

        //validate the course exist
        const courseExist = await Course.findById(courseId);
        if (!courseExist) {
            return res.status(400).json({
                success: false,
                meassage: "Course not Exist from this course Id."
            })
        }
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating: { $avg: "$rating"},
                }
            }
        ]);

        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            })
        }

        return res.status(200).json({
            success: true,
            meassage: "No rating found from this course , average rating is 0.",
            averageRating: 0
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            meassage: "Unable to find average rating.",
            error: error
        })
    }
}


//get all rating
exports.getAllrating = async (req, res) => {
    try {
        const allRatingAndReviews = await RatingAndReview.find({}).populate("user").populate("course");

        return res.status(200).json({
            success: true,
            message: "All rating and reviews are fetched.",
            allRatingAndReviews
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            meassage: "Unable to fetch All rating and review.",
            error: error
        })
    }
}


//getAllCourserating
exports.getAllCourseRating = async (req, res) => {
    try {
        //get the course id
        const { courseId } = req.body;

        //validate the course id
        const courseExist = await Course.findById(courseId);
        if (!courseExist) {
            return res.status(400).json({
                success: false,
                meassage: "Course not Exist from this course Id."
            })
        }

        //get all course rating and reviews
        const allRatingAndReview = await RatingAndReview.find({ course: courseId }).sort({ "rating": "desc" })
            .populate({
                path: "user",
                select: "firstName lastName email image"
            })
            .populate({
                path: "course",
                select: "name"
            }).exec();

        //return the response
        return res.status(200).json({
            success: true,
            message: "All rating and reviews are fetched for this course.",
            allRatingAndReview
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            meassage: "Unable to fetch All rating and review for this course.",
            error: error
        })
    }
}
