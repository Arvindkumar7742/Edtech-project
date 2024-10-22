const mongoose=require("mongoose")

const courseSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    courseDecreption:{
        type:String,
        required:true,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    whatYouWillLearn:{
        type:String,
    },
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section"
        }
    ],
    ratingAndReviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview"
        }
    ],
    price:{
        type:Number,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    Category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    tags:{
        type:[String],
        required:true
    },
    studentEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }],
    instructions: {
		type: [String],
	},
    status: {
		type: String,
		enum: ["Draft", "Published"],
	},
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const Course=mongoose.model("Course",courseSchema);
module.exports = Course