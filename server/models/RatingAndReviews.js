const mongoose=require("mongoose")

const ratingAndReviewSchema=new mongoose.Schema({
  user:{
    type:mongoose.Schema.ObjectId,
    ref:"User"
  },
  rating:{
    type:Number,
    required:true,
  },
  reviews:{
    type:String,
    required:true
  },
	course: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Course",
		index: true,
	},
})

const RatingAndReview=mongoose.model("RatingAndReview",ratingAndReviewSchema);
module.exports = RatingAndReview