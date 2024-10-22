const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadOnCloudinary } = require("../utils/cloudinary");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");


//create the course
exports.createCourse = async (req, res) => {
    try {
        // Fetch all data from req
        const { name, courseDecreption, whatYouWillLearn, instructions, price, tag, category, status } = req.body;

        // Fetch image from files
        const thumbnail = req.files?.thumbnail;
        if (!thumbnail) {
            return res.status(400).json({
                success: false,
                message: "Thumbnail is required."
            });
        }

        // Validate all data
        if (!name || !courseDecreption || !instructions || !whatYouWillLearn || !price || !tag || !category) {
            return res.status(400).json({
                success: false,
                message: "Please provide all fields."
            });
        }

        if (!status || status === undefined) {
            status = "Draft";
        }

        // Validate the category
        const categoryExist = await Category.findById(category);
        if (!categoryExist) {
            return res.status(400).json({
                success: false,
                message: "Category does not exist."
            });
        }

        // Upload image to Cloudinary (make sure it succeeds)
        const uploaded = await uploadOnCloudinary(thumbnail);
        if (!uploaded || !uploaded.secure_url) {
            return res.status(500).json({
                success: false,
                message: "Image upload failed."
            });
        }

        // Fetch the instructor and check for instructor details
        const id = req.user.id;
        const instructorDetails = await User.findById(id);
        if (!instructorDetails) {
            return res.status(400).json({
                success: false,
                message: "Instructor details not found."
            });
        }

        // Create Course
        const course = await Course.create({
            name: name,
            whatYouWillLearn,
            courseDecreption,
            price,
            Category: categoryExist._id,
            thumbnail: uploaded.secure_url,
            tags: tag,
            status: status,
            instructions: instructions,
            instructor: instructorDetails._id
        });

        // Push the course for corresponding user
        await User.findByIdAndUpdate(instructorDetails._id, {
            $push: { courses: course._id }
        }, { new: true });

        // Push the course in the Category
        await Category.findByIdAndUpdate(categoryExist._id, {
            $push: { courses: course._id }
        }, { new: true });

        // Return the response after successful course creation

        return res.status(200).json({
            success: true,
            message: "Course created successfully",
            course: course
        })

    } catch (error) {
        // Log the error and return a response if headers haven't been sent
        console.error("Error in creating course:", error);

        // // Ensure the error response is only sent once
        return res.status(500).json({
            success: false,
            message: "Error in course creation.",
            error: error.message
        });
    }
};

//fetch ALL Course
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({});

        console.log(courses);

        return res.status(200).json({
            success: true,
            message: "All courses fetched successfully.",
            data: courses
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Error in fetching the courses",
            error: error
        })
    }
}

// Edit Course Details
exports.editCourse = async (req, res) => {
    try {
        const { courseId, status } = req.body
        const updates = req.body
        const course = await Course.findById(courseId)

        if (!course) {
            return res.status(404).json({ error: "Course not found" })
        }

        if (status != undefined) {
            course.status = status;
        }
        // If Thumbnail Image is found, update it
        if (req.files) {
            console.log("thumbnail update")
            const thumbnail = req.files.thumbnail
            const uploaded = await uploadOnCloudinary(thumbnail);
            course.thumbnail = uploaded.secure_url
        }

        // Update only the fields that are present in the request body
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                if (key === "tag" || key === "instructions") {
                    course[key] = JSON.parse(updates[key])
                } else {
                    course[key] = updates[key]
                }
            }
        }

        await course.save()

        const updatedCourse = await Course.findOne({
            _id: courseId,
        })
            .populate({
                path: "instructor",
                populate: {
                    path: "addtionalDetails",
                },
            })
            .populate("Category")
            .populate("ratingAndReviews")
            .exec()

        res.json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}

//get course details
exports.getCourseDeatils = async (req, res) => {
    try {
        //get the data -course id
        const {courseId} = req.body;

        //validate the data
        const courseDetails = await Course.findById(courseId).
            populate({
                path: "instructor",
                populate: {
                    path: "addtionalDetails"
                }
            })
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSections"
                }
            })
            .populate("Category")
            .exec();

        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: "course id not found.",
            })
        }
        //send the course details
        return res.status(200).json({
            success: true,
            message: "Course details fetched successfully.",
            data: courseDetails
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "unable to fetch course details.",
            error: error
        })
    }
}


//categoryPagedetails
exports.categoryPageDetails = async (req, res) => {
    try {
        //get the category
        const { categoryId } = req.body;

        //get all the courses for this category
        const allCoursesCategory = await Category.findById(categoryId).
            populate(
                { path: "courses" }).exec();

        if (!allCoursesCategory) {
            return res.status(400).json({
                success: false,
                message: "Not exist any course for this category.",
            })
        }
        //get different course for different category
        const allDifferentCategoryCourse = await Category.find({
            _id: { $ne: categoryId }
        }).populate({ path: "courses" }).exec();

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

exports.getInstructorCourses = async (req, res) => {
    try {
        // Get the instructor ID from the authenticated user or request body
        const instructorId = req.user.id

        // Find all courses belonging to the instructor
        const instructorCourses = await Course.find({
            instructor: instructorId,
        }).sort({ createdAt: -1 })
        // Return the instructor's courses
        return res.status(200).json({
            success: true,
            data: instructorCourses,
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve instructor courses",
            error: error.message,
        })
    }
}

// To delete a particular course
exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.body

        // Find the course
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({ message: "Course not found" })
        }

        // Unenroll students from the course
        const studentsEnrolled = course.studentEnrolled
        for (const studentId of studentsEnrolled) {
            await User.findByIdAndUpdate(studentId, {
                $pull: { courses: courseId },
            })
        }

        // Delete sections and sub-sections
        const courseSections = course.courseContent
        for (const sectionId of courseSections) {
            // Delete sub-sections of the section
            const section = await Section.findById(sectionId)
            if (section) {
                const subSections = section.subSections
                for (const subSectionId of subSections) {
                    await SubSection.findByIdAndDelete(subSectionId)
                }
            }

            // Delete the section
            await Section.findByIdAndDelete(sectionId)
        }

        // Delete the course
        await Course.findByIdAndDelete(courseId)

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        })
    }
}