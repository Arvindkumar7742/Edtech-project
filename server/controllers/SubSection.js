const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadOnCloudinary } = require("../utils/cloudinary");

exports.createSubSection = async (req, res) => {
    try {
        //fetch the data
        const { title, description, sectionId } = req.body;

        //fetch the video file from reqfile
        const videoFile = req.files.video;

        //validate the data
        if (!title || !description || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "Missing properties"
            })
        }

        //validate the section exist or not
        const section = await Section.findById(sectionId);
        if (!section) {
            return res.status(400).json({
                success: false,
                message: "Section Does not Exist."
            })
        }

        //upload on clodunary
        const uploadedVideo = await uploadOnCloudinary(videoFile);

        //crate a subsection
        const subSection = await SubSection.create({
            title, timeDuration:"20", description, videoUrl: uploadedVideo.secure_url
        })

        //update section
        const updatedSection = await Section.findByIdAndUpdate(sectionId
            , {
                $push: {
                    subSections: subSection._id
                }
            }, { new: true }).populate("subSections").exec();

        //return the response
        return res.status(200).json({
            success: true,
            message: "Subsection created succesfully",
            data: updatedSection
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Unable to create subsection",
            success: false,
            error: error
        })
    }
}

exports.updateSubSection = async (req, res) => {
    try {
      const { sectionId, subSectionId, title, description } = req.body
      const subSection = await SubSection.findById(subSectionId)
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }

      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadOnCloudinary(video)
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
      await subSection.save()

      // find updated section and return it
      const updatedSection = await Section.findById(sectionId).populate(
        "subSections"
      )
  
  
      console.log("5");
      return res.json({
        success: true,
        message: "Section updated successfully",
        data: updatedSection,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
  }

//delete ths subsection
exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    )
    const subSection = await SubSection.findByIdAndDelete(subSectionId)

    if (!subSection) {
      return res
        .status(404)
        .json({ success: false, message: "SubSection not found" })
    }

    // find updated section and return it
    const updatedSection = await Section.findById(sectionId).populate(
      "subSections"
    )

    return res.json({
      success: true,
      message: "SubSection deleted successfully",
      data: updatedSection,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the SubSection",
    })
  }
}