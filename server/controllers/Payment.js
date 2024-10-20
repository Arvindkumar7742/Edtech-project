const User = require('../models/User');
const Course = require('../models/Course');
const { mailSender } = require('../utils/mailSender');
const { instance } = require('../config/Razorpay');
const { default: mongoose } = require('mongoose');


exports.capturePayment=  async(req,res) =>{

    //fetch teh data , fetch the user id , fetch the course id
    const courseId = req.body;
    const userId = req.user.id;

    if(!courseId){
        return res.status(400).json({
            success:false,
            message:"Please provide a valid course id",
        })
    }
    //validate user
    const user = await User.findById(userId);
    if(!user){
        return res.status(400).json({
            success:false,
            message:"User not exist with this id",
        })
    }

    let course;
    try{
         //validate that user already purchased course,
        course = await Course.findById(courseId);
        if(!course){
            return res.status(400).json({
                success:false,
                message:"Course not exist",
            })
        }

        const newCourseId = new mongoose.Schema.Types.ObjectId(courseId);
        if(course.studentEnrolled.includes(newCourseId)){
            return res.status(400).json({
                success:false,
                message:"Student already Buy this course",
            })
        }

    }catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Error fetch the course",
            error:error
        });
    } 
    //create order
    const price = course.price;
    
    const options = {
        amount:price * 100,
        currency : "INR",
        receipt:Math.random(Date.now()).toString(),
        courseId:courseId,
        userId
    }

    try{
        const paymentReasponse = await instance.orders.create(options);
        console.log(paymentReasponse);

        return res.status(200).json({
            success:true,
            courseName : course.name,
            courseDesrption : course.courseDecreption,
            thumbnail:course.thumbnail,
            price:course.price,
            orderId : paymentReasponse.orderId,
            currancy:paymentReasponse.currency,
            amount:paymentReasponse.amount
        })
    
    }catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Could not initiate the order",
        })
    }
    //send response

}

exports.varifySignature = async(req,res) =>{
    const webhookSecret = "123456";

    const signature = req.headers["x-razorpay-signature"];

    const shshum = crypto.createHmac("sha256" , webhookSecret);
    shshum.update(JSON.stringify(req.body));
    const digest = shshum.digest("hex");

    if(signature==digest){
        console.log("payment is autorized");

        const {courseId, userId} = req.body.payload.payment.entity.notes;

        try{
                //fulfil the action

                //find the course and enroll the student in it
                const enrolledCourse = await Course.findOneAndUpdate(
                                                {_id: courseId},
                                                {$push:{studentsEnrolled: userId}},
                                                {new:true},
                );

                if(!enrolledCourse) {
                    return res.status(500).json({
                        success:false,
                        message:'Course not Found',
                    });
                }

                console.log(enrolledCourse);

                //find the student andadd the course to their list enrolled courses me 
                const enrolledStudent = await User.findOneAndUpdate(
                                                {_id:userId},
                                                {$push:{courses:courseId}},
                                                {new:true},
                );

                console.log(enrolledStudent);

                //mail send krdo confirmation wala 
                const emailResponse = await mailSender(
                                        enrolledStudent.email,
                                        "Congratulations from CodeHelp",
                                        "Congratulations, you are onboarded into new CodeHelp Course",
                );

                console.log(emailResponse);
                return res.status(200).json({
                    success:true,
                    message:"Signature Verified and COurse Added",
                });


        }       
        catch(error) {
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            });
        }
    }
    else {
        return res.status(400).json({
            success:false,
            message:'Invalid request',
        });
    }

}