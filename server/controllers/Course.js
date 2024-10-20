const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadOnCloudinary } = require("../utils/cloudinary");



exports.createCourse = async (req,res) =>{
    try{
        //fetch all data from req
        const { name, courseDecreption , whatYouWillLearn, price, tags , category} = req.body;

        //fetch image from files
        const thumbnail = req.files.Thumbnail;

        //validate all data
        if(!name || !courseDecreption || !whatYouWillLearn || !price || !tags || !category ){
            return res.status(400).json({
                success:false,
                message:"Please provide all field."
            })
        }

        //validate tha tag
        const categoryExist = await Category.findOne({name:category});
        if(!categoryExist){
            return res.status(400).json({
                success:false,
                message:"Category not exist."
            })
        }

        //uplaod image on cloudianey
        const uplaoded = await uploadOnCloudinary(thumbnail);

        //fetcth the instucter and check for instucter
        const id = req.user.id;
        const instucterDetails = await User.findById(id);
        console.log("instucter Details are",instucterDetails);
        if(!instucterDetails){
            return res.status(400).json({
                success:false,
                message:"instucterDetails Not found."
            })
        }

        //create Course
        const course = await Course.create({
            name:name,whatYouWillLearn,courseDecreption,price,Category:categoryExist._id,thumbnail:uplaoded.secure_url,
            tags:tags,instructor:instucterDetails._id
        })
        console.log("course -->",course);
        //push the course for coreesponding user
        const res1=await User.findByIdAndUpdate(instucterDetails._id,
            {
                $push:{
                    courses:course._id,
                }
            },{new:true}
        )
        console.log("res1 -->",res1);
        //push the course in the Category
        const res2 = await Category.findOneAndUpdate({name:category},
            {
                $push:{
                    courses:course._id,
                }
            },{new:true}
        )
        console.log("res2 -->",res2);
        //return the response
        return res.status(200).json({
            success:true,
            message:"Course created succesfully.",
            data:course
        })
        
    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            message:"error in course creation.",
            success:false,
            error:error
        })
    }
}

//fetch ALL Course

exports.getAllCourses = async(req,res) =>{
    try{
        const courses = await Course.find({});

        console.log(courses);

        return res.status(200).json({
            success:true,
            message:"All courses fetched successfully.",
            data:courses
        })
    }catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Error in fetching the courses",
            error:error
        })
    }
}

//get course details
exports.getCourseDeatils= async(req,res)=>{
    try{
        //get the data -course id
        const courseId = req.body.id;

        //validate the data
        const courseDetails = await Course.findById(courseId).
        populate({
            path:"instructor",
            populate:{
                path:"addtionalDetails"
            }
        })
        .populate({
            path:"courseContent",
            populate:{
                path:"subSections"
            }
        })
        .populate("category")
        .exec();

        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:"course id not found.",
            })
        }
        //send the course details
        return res.status(200).json({
            success:true,
            message:"Course details fetched successfully.",
            data:courseDetails
        })
    }catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"unable to fetch course details.",
            error:error
        })
    }
}


//categoryPagedetails
exports.categoryPageDetails = async(req,res)=>{
    try{
        //get the category
        const {categoryId} = req.body;

        //get all the courses for this category
        const allCoursesCategory = await Category.findById(categoryId).
        populate(
            {path:"courses"}).exec();

        if(!allCoursesCategory){
            return res.status(400).json({
                success:false,
                message:"Not exist any course for this category.",
            })
        }
        //get different course for different category
        const allDifferentCategoryCourse = await Category.find({
            _id :{$ne : categoryId}
        }).populate({path:"courses"}).exec();

        //get top selling courses
	// Get top-selling courses across all categories
    //HW -- need to review again -- for this one
    const allCategories = await Category.find().populate("courses");
    const allCourses = allCategories.flatMap((category) => category.courses);
    const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10);

    res.status(200).json({
        selectedCategory: allCoursesCategory,
        differentCategories: allDifferentCategoryCourse,
        mostSellingCourses: mostSellingCourses,
    });
} catch (error) {
    return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
    });
}
};