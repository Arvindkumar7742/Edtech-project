const { contactUsEmail } = require("../mail/templates/contactUsFormRes");
const mailSender = require("../utils/mailSender")

exports.contactUS= async (req,res)=>{
    try{
        const {firstName,lastName,email,countryCode,phoneNumber,message} = req.body;
        const body = contactUsEmail(email,firstName,lastName,message,phoneNumber,countryCode);
        const result = await mailSender(email,"Response saved successfully",body);

        return res.status(200).json({
            success:true,
            data:result,
            message:"Email sent succesfully"
        })
    }catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            error:error,
            message:"email not sent",
        });
    }
}