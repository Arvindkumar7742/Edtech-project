const User = require('../models/User');
const Course = require('../models/Course');
const  mailSender  = require('../utils/mailSender');
const { instance } = require('../config/Razorpay');
const { default: mongoose } = require('mongoose');
const crypto = require('crypto');
const { courseEnrollmentEmail } = require('../mail/templates/courseEnrollmentEmail');
const { paymentSuccessEmail } = require('../mail/templates/paymentSuccessEmail');

//To initiate an order to purchase to do payment from razorpay
exports.capturePayment =async (req,res)=>{
    try{
        const { courses } = req.body;
        const userId = req.user.id;

        if(courses.length==0){
            return res.status(400).json({
                success:false,
                message:"Course not find to buy."
            })
        }

        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not exist for this ID"
            })
        }

        let totalPrice = 0;
    
        for(const courseId of courses){
            const course = await Course.findById(courseId);
            if(!course){
                return res.status(400).json({
                    success:false,
                    message:`Course not Exist for courseID- ${courseId}`
                })
            }

            // console.log("This course is",);
            totalPrice = totalPrice + course.price;
            if(course.studentEnrolled.includes(userId)){
                return res.status(400).json({
                    success:false,
                    message:`User already enrolled for this courseId-${courseId}`
                })
            }
        }

        let options={
            amount:totalPrice * 100,
            currency : "INR",
            receipt:Math.random(Date.now()).toString(),
        }

        try{
            const paymentResponse = await instance.orders.create(options);

            return res.status(200).json({
                success:true,
                message:"Order created successfully",
                data:paymentResponse
            })
        }
        catch(error){
            console.log("Error in creating order",error);
            return res.status(400).json({
                success:false,
                message:"payment failed",
                error:error,
            })
        }


    }catch(error){
        console.log("Error in initiate order API",error);
        return res.status({
            success:true,
            message:"Error in intiating the order",
            error:error
        })
    }
}

// To verify an payment(order)
exports.verifySignature = async(req,res) =>{
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const {courses} = req.body;
    const userId = req.user.id;


    if(!razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature || !courses || !userId) {
            return res.status(200).json({success:false, message:"Payment Failed"});
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

    if(expectedSignature == razorpay_signature){
        //enroll student to that course
        await enrollStudents(courses, userId, res);
        console.log("Mai yaha hui bhai---------");
        //return res
        return res.status(200).json({success:true, message:"Payment Verified"});
    }
    return res.status(400).json({
        success:false,
        message:"signature failed to match",
    })

    //need to make the signature to verify the account

}

//Enrolled the student into course
const enrollStudents = async(courses, userId, res) => {

    if(!courses || !userId) {
        return res.status(400).json({success:false,message:"Please Provide data for Courses or UserId"});
    }

    for(const courseId of courses) {
        try{
            //find the course and enroll the student in it
        const enrolledCourse = await Course.findOneAndUpdate(
            {_id:courseId},
            {$push:{studentEnrolled:userId}},
            {new:true},
        )

        if(!enrolledCourse) {
            return res.status(500).json({success:false,message:"Course not Found"});
        }

        //find the student and add the course to their list of enrolledCOurses
        const enrolledStudent = await User.findByIdAndUpdate(userId,
            {$push:{
                courses: courseId,
            }},{new:true})

        //Need to send the email to the student
        await mailSender(enrolledStudent.email,
            `Successfully Enrolled into ${enrolledCourse.name}`,
            courseEnrollmentEmail(enrolledCourse.name, enrolledStudent.firstName));
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }

}

//Successful payment email ro student
exports.sendPaymentSuccessEmail = async(req, res) => {
    console.log("mia yha aaya hu backend--1");
    const {orderId, paymentId, amount} = req.body;

    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId) {
        console.log("validating the things",orderId,paymentId,amount,userId);
        return res.status(400).json({success:false, message:"Please provide all the fields"});
    }

    try{
        //student to send the email
        const enrolledStudent = await User.findById(userId);
        console.log("user data",enrolledStudent);
        await mailSender(
            enrolledStudent.email,
            `Payment Received`,
            paymentSuccessEmail(`${enrolledStudent.firstName}`,
             amount/100,orderId, paymentId)
        )
    }
    catch(error) {
        console.log("error in sending mail", error)
        return res.status(500).json({success:false, message:"Could not send email"})
    }
}