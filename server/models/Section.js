const mongoose=require("mongoose")

const sectionSchema=new mongoose.Schema({
    sectionName:{
        type:String,
    },
    subSections:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"SubSection",
            required:true
        }
    ]
})

const Section=mongoose.model("Section",sectionSchema);
module.exports=Section