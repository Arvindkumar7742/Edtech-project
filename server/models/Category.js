const mongoose=require("mongoose")

const tagSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  descreption:{
    type:String,
    required:true
  },
  courses:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Course"
  }]
})

const Category=mongoose.model("Category",tagSchema);
module.exports = Category