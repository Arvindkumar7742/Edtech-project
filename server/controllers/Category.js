const Category = require("../models/Category")

exports.createCategory = async (req,res) =>{
    try{
        //fecth the data from req
        const { name, descrption } = req.body;

        //validate the data
        if(!name || !descrption){
            return res.status(400).json({
                success:false,
                message:"Please weitr name and descrption of Category",
            })
        }

        //create Entry in DB
        const result =await Category.create({
            name:name,descreption:descrption
        })

        //return the response
        return res.status(200).json({
            success:true,
            message:"Category created successfully."
        })
    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Error in Category creation",
            error:error
        })
    }
}

exports.getAllCategories = async(req,res) =>{
    try{
        const categories = await Category.find({});

        return res.status(200).json({
            success:true,
            message:"All categories fetched successfully.",
            categories
        })
    }catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Error in fetching the categories",
            error:error,
        })
    }
}