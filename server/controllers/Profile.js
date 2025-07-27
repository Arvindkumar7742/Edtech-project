const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadOnCloudinary } = require("../utils/cloudinary");

exports.updateProfile = async (req, res) => {
  try {
    //fetch the data
    const {
      firstName,
      lastName,
      gender = "",
      dateOfBirth = "",
      about = "",
      contactNumber,
    } = req.body;

    //fetch the user id
    const userId = req.user.id;

    //validate the data
    if (!about || !contactNumber || !userId) {
      return res.status(400).json({
        success: false,
        message: "Missing properties",
      });
    }

    //validate the user
    const user = await User.findByIdAndUpdate(
      userId,
      {
        firstName: firstName,
        lastName: lastName,
      },
      { new: true }
    ).populate("addtionalDetails");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user Does not Exist",
      });
    }

    //update the user profile and save
    const profileId = user.addtionalDetails;
    const profileDetails = await Profile.findById(profileId);

    //update
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.contactNumber = contactNumber;
    profileDetails.gender = gender;

    const updatedPofile = await profileDetails.save();

    //return the responsedateila
    user.addtionalDetails = updatedPofile;
    return res.status(200).json({
      success: true,
      message: "profile details updated succesfully",
      user: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Unable to update profile.",
      success: false,
      error: error,
    });
  }
};

//delete user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;

    //validate the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user Does not Exist",
      });
    }

    //delete profile
    const profileId = user.addtionalDetails;
    await Profile.findByIdAndDelete(profileId);

    //delete user
    const deletedUser = await User.findByIdAndDelete(userId);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Unable to delete user",
      success: false,
      error: error,
    });
  }
};

exports.getUserdetails = async (req, res) => {
  try {
    const userId = req.user.id;

    //validate the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user Does not Exist",
      });
    }

    //update the user profile and save
    const profileId = user.addtionalDetails;
    const profileDetails = await Profile.findById(profileId);

    return res.status(200).json({
      success: true,
      message: "profile details fetched succesfully",
      data: profileDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Unable to fetch profile detils.",
      success: false,
      error: error,
    });
  }
};

exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;
    console.log("Printing the user:::", req.user);
    const image = await uploadOnCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    console.log(image);
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { imageUrl: image.secure_url },
      { new: true }
    ).populate("addtionalDetails");
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserdetails = async (req, res) => {
  try {
    const userId = req.user.id;

    //validate the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user Does not Exist",
      });
    }

    //update the user profile and save
    const profileId = user.addtionalDetails;
    const profileDetails = await Profile.findById(profileId);

    return res.status(200).json({
      success: true,
      message: "profile details fetched succesfully",
      data: profileDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Unable to fetch profile detils.",
      success: false,
      error: error,
    });
  }
};

exports.getUserEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId)
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSections",
            model: "SubSection",
          },
        },
      })
      .exec();

    let enrolledCourses;
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not exist",
      });
    } else {
      enrolledCourses = user.courses;
    }
    res.send({
      success: true,
      message: "enrolled courses fetched succesfullly",
      data: enrolledCourses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
