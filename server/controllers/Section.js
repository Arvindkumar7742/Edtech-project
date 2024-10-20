const Section = require('../models/Section')
const Course = require('../models/Course');


exports.createSection = async (req, res) => {
    try {
        //fetch the data from body
        const { sectionName, courseId } = req.body;

        //validate the data
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Missing properties"
            })
        }

        //validate Course Id
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(400).json({
                success: false,
                message: "Course Does not Exist"
            })
        }

        //create section
        const section = await Section.create({
            sectionName: sectionName
        })

        //Add section to course 
        const updateCourse = await Course.findByIdAndUpdate(courseId ,
            {
                $push: {
                    courseContent: section._id
                }
            }, { new: true }
        ).populate("courseContent").exec();

        //return the response
        return res.status(200).json({
            success: false,
            message: "Section created succesfully",
            data: updateCourse
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Error in craeting the section"
        })
    }
}

//update section
exports.updateSection = async (req, res) => {
    try {
        //fecth the data 
        const { sectionName, sectionId } = req.body;

        //validate the data
        if (!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "Missing properties"
            })
        }

        //validate the section also
        const section = await Section.findById(sectionId);
        if (!section) {
            return res.status(400).json({
                success: false,
                message: "Section Does not Exist"
            })
        }

        //update the data
        const updatedSection = await Section.findByIdAndUpdate(sectionId,
            {
                    sectionName: sectionName
            }, { new: true }
        ).populate("subSections").exec();

        //return the response
        return res.status(200).json({
            success: false,
            message: "Section updated succesfully",
            data: updatedSection
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "unable in update the section",
            error: error.message
        })
    }
}

exports.deleteSection = async (req, res) => {
    try {
        //fetch the data - asssuming id in params
        const { sectionId } = req.query;

        //validate the data
        if (!sectionId) {
            return res.status(400).json({
                success: false,
                message: "Please provide the sectin id please."
            })
        }

        //validate the section also
        const section = await Section.findById(sectionId);
        if (!section) {
            return res.status(400).json({
                success: false,
                message: "Section Does not Exist"
            })
        }

        //delete section
        await Section.findByIdAndDelete(sectionId);

        //update course also  -- --- HW //need to check shuld be update the course

        //return the response
        return res.status(200).json({
            success: false,
            message: "Section deleted succesfully",
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "unable in  the delete section",
            error: error.message
        })
    }
}