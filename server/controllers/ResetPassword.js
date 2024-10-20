const User = require("../models/User");
const bcrypt = require('bcrypt');
const mailSender = require("../utils/mailSender");

exports.resetPasswordToken = async (req, res) => {
    try {
        //fetch the data (email) from request body
        const { email } = req.body;

        //validate the data or email exist
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(500).json({
                success: false,
                message: "Your email is not registered with us"
            })
        }

        //generate the token
        const token = crypto.randomUUID();

        //save it in the User model
        const svaedToken = await User.findOneAndUpdate(
            { email: email },
            {
                token,
                tokenExpiryTime: Date.now() + 5 * 60 * 1000
            },
            { new: true });
        //create link
        const url = `http://localhost:3000/updatePassword/${token}`
        //send it to user from mail sender
        await mailSender(email,"Link for reset the password" , `you can reset the password from the given link ${url}`);

        //return the response
        return res.status(200).json({
            success:true,
            message:"Email sent succesfully."
        })
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Error in rest password token"
        })
    }
}

//reset password
exports.resetPassword = async(req,res) =>{
    try{
        //Fetch from request body
        const {password,confirmPassword,token} = req.body;

        //validate the data
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password is not match to confirm password"
            })
        }

        //check the data to from token , validate expiery time from also
        const user = await User.findOne({token:token});

        if(!user){
            return res.status(400).json({
                success:false,
                message:"Token is not valid"
            })
        }

        if(user.tokenExpiryTime < Date.now()){
            return res.status(400).json({
                success:false,
                message:"Token expierd please try again, cannot reset the password"
            })
        }

        //hash the password
        const hashPassword =await bcrypt.hash(password,10);
        //reset the passsword
        const result = await User.findOneAndUpdate(
            {email:user.email},
            {password:hashPassword});

        //send the rresponse
        return res.status(200).json({
            success:true,
            message:"Password reset successfully."
        })
    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Error in password reset.",
            error:error
        })
    }
}

