const User= require("../models/User");
const Otp = require("../models/OTP");
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt');
const Profile = require("../models/Profile")
const jwt = require("jsonwebtoken");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const mailSender = require("../utils/mailSender");
require("dotenv").config();
//To send Otp
exports.sendOTP = async (req,res)=>{
    try{
        // fetching the email from reqbody
        const { email }=req.body;

        const userExist = await User.findOne({email:email});

        if(userExist){
            return res.status(409).json({
                success:false,
                message:"User alresdy exist"
            })
        }

        let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets:false });
     
        //For unique otp
        let otpExist = await Otp.findOne({otp:otp});
  
        while(otpExist){
            otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
            otpExist = await Otp.findOne({otp});
        }
        
        //Save th otp in database
        const result = await Otp.create({email,otp});

        console.log("Result after send the otp::",otp);

        return res.status(200).json({
            success:true,
            message:"OTP Saved successfully",
            otp:result.otp
        })

    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Problem in otp generating.",
            error:error
        })
    }
}

exports.signUp = async (req , res) =>{
    try{
        //Fetch the data from body
        const {email,
             firstName,
             lastName,
             otp,
             accountType,
             password,
             confirmPassword,
             contactNumber
            } = req.body;

        //validate all the data also 
        if(!email || !firstName || !otp || !password || !confirmPassword || !password || !confirmPassword ){
            return res.status(403).json({
                success:false,
                message:"Validation error",
            })
        }

        //password == confirm password
        if( password != confirmPassword){
            return res.status(400).json({
                success:false,
                message:"password not matches with confirm password",
            })
        }

        //check use already exist or not
        const userAlreadyExist =await User.findOne({email});
        if(userAlreadyExist){
            return res.status(409).json({
                success:false,
                message:"User already Exist with this email"
            })
        }

        // taje the most recent otp and chekc that it is equal to or not in the database
        const recentOtp =await Otp.find({email}).sort({createdAt:-1}).limit(1);

        if(recentOtp.length == 0){
            return res.status(400).json({
                success:false,
                message:"Otp not found",
            })
        }else if(otp != recentOtp[0].otp){
            return res.status(400).json({
                success:false,
                message:"Otp not Matched",
            })
        }

        //hash password
        const hashPassword = await bcrypt.hash(password,10);

        //save this into database
        const profileDetails = await Profile.create({
            gender:null,
            contactNumber,
            dateOfBirth:null,
            about:null
        });
        const result = await User.create({email,
            firstName,lastName,
            password:hashPassword,
            addtionalDetails:profileDetails._id,
            accountType,
            imageUrl:"https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg"
        })

        // return the response
        return res.status(200).json({
            success:true,
            message:"User SignUp successfully",
            result
        })
    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Signup error",
            error:error
        })
    }
}

exports.login = async (req,res) =>{
    try{
        //fetch the data from request body
        const {email , password } = req.body;

        //validate the data
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Validtion error - All field are required, try again",
            })
        }

        //check user exist
        const userExist =await User.findOne({email}).populate("addtionalDetails");
        if(!userExist){
            return res.status(400).json({
                success:false,
                message:"User does not exit with this email.",
            })
        }

        //Generate the jwtToken
        if(await bcrypt.compare(password,userExist.password)){
            const payload = {
                id:userExist._id,
                email:userExist.email,
                accountType:userExist.accountType,
        }
        const token = jwt.sign(payload , process.env.JWT_SECRET,{
            expiresIn:"2h",
        })
        userExist.token = token,
        userExist.password=undefined; // ?????
        req.body.token =token;

        const options={
            expires:new Date( Date.now() + 3*24*60*60*1000),
            httpOnly:false
        }
        res.cookie("token",token,options).status(200).json({
            success:true,
            token,
            userExist,
            message:"login succesfully",
        })
    }else{
         //return the response
        return res.status(400).json({
            success:false,
            message:"password not matched",
        })
    }

    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"User login fails",
        })
    }
}

exports.changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "Does't matched with old passsword" });
		}

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			await mailSender(updatedUserDetails.email,
                "Password updated succesfully",
				passwordUpdated(
					updatedUserDetails.email,
					`${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				));
			
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};