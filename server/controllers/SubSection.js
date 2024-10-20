const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadOnCloudinary } = require("../utils/cloudinary");

exports.createSubSection =async(req,res) =>{
    try{
        //fetch the data
        const { title, description ,timeDuration ,sectionId} = req.body;

        //fetch the video file from reqfile
        const videoFile = req.files.Video;

        //validate the data
        if(!timeDuration || !title || !description || !sectionId){
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
            title,timeDuration,description,videoUrl:uploadedVideo.secure_url
        })
    
        //update section
        const updatedSection = await Section.findByIdAndUpdate(sectionId
            ,{
            $push:{
                subSections:subSection._id
            }
        },{new:true}).populate("subSections").exec();

        //return the response
        return res.status(200).json({
            success:false,
            message:"Subsection created succesfully",
            data:updatedSection
        })

    }catch(error){
        console.log(error);
        return res.status(400).json({
            message:"Unable to create subsection",
            success:false,
            error:error
        })
    }
}

exports.updateSubSection = async (req,res) =>{
    try{
        //fetch the data from req
        const { title, description ,timeDuration ,subSectionId} = req.body;


        // VideoUrl ko update kerna bahi left out hai

        //validate the
        if(!timeDuration || !title || !description || !subSectionId){
            return res.status(400).json({
                success: false,
                message: "Missing properties"
            })
        } 

        //update 
        const updatedSubSection = await SubSection.findByIdAndUpdate(subSectionId,{
            title, description ,timeDuration
        },{new:true});

        //return response
        return res.status(200).json({
            success:false,
            message:"Subsection updated succesfully",
            data:updatedSubSection
        })
    }catch(error){
        console.log(error);
        return res.status(400).json({
            message:"Unable to update subsection",
            success:false,
            error:error
        })
    }
}

//delete ths subsection
exports.deleteSubSection = async(req,res) =>{
    try{
        const { subSectionId } =req.query;

        const subSection = await SubSection.findById(subSectionId);
        if (!subSection) {
            return res.status(400).json({
                success: false,
                message: "subSection Does not Exist"
            })
        }

        await SubSection.findByIdAndDelete(subSectionId);
        //Section ko update kerna abi ke liye leftout hai
        return res.status(200).json({
            success:true,
            message:"subSection deleted successfully."
        })

    }catch(error){
        console.log(error);
        return res.status(400).json({
            message:"Unable to delete subsection",
            success:false,
            error:error
        })
    }
}