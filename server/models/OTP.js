const otpTemplate = require('../mail/templates/emailVerificationTemplate');
const mailSender = require('../utils/mailSender')

const mongoose=require("mongoose")

const otpSchema=new mongoose.Schema({
      email:{
    type:String,
    required:true
  },
  otp:{
    type:Number,
    required:true
  },
  createdAt:{
    type:Date,
    default:Date.now(),
    expires:2*60*100,
  }
})

/* ------------------ Send email function to send the email ----------------- */
async function sendEmail(email,otp){
    try{
        const emailResponse=await mailSender(email,"Verification email from Studynotion",otpTemplate(otp));
        console.log("Email sent successfully:::",emailResponse);
    }catch(error){
        console.log("Error in seding the email",error);
    }
}

/* -----used pre middleware, so before saving in otpschema, it will sebd the email ---- */
otpSchema.pre("save",async function(next){
    await sendEmail(this.email,this.otp);
    next();
})

const Otp=mongoose.model("Otp",otpSchema);
module.exports= Otp