const Section = require('../models/Section')
const Course = require('../models/Course');
const SubSection = require("../models/SubSection");

exports.createSection = async (req, res) => {
    try {
        //fetch the data from body
        console.log("hello my name is arvid kumar");
        const { sectionName, courseId } = req.body;
        console.log(sectionName, courseId );

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

        console.log("hello");
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
            success: true,
            message: "Section created successfully",
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
            success: true,
            message: "Section updated successfully",
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
      const { sectionId, courseId } = req.body
      await Course.findByIdAndUpdate(courseId, {
        $pull: {
          courseContent: sectionId,
        },
      })

      const section = await Section.findById(sectionId)
      console.log(sectionId, courseId)
      if (!section) {
        return res.status(404).json({
          success: false,
          message: "Section not found",
        })
      }

      // Delete the associated subsections
      await SubSection.deleteMany({ _id: { $in: section.subSections } })
  
      await Section.findByIdAndDelete(sectionId)
  
      // find the updated course and return it
      const course = await Course.findById(courseId)
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      res.status(200).json({
        success: true,
        message: "Section deleted",
        data: course,
      })
    } catch (error) {
      console.error("Error deleting section:", error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }