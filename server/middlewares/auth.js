const jwt =require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req,res,next) =>{
    try{
        const token = req.cookies.token ||
                        req.body.token ||
                        req.header("Authorization").replace("Bearer ", "");

        if(!token){
            return res.status(400).json({
                success:false,
                message:"Token not found"
            });
        }
        try{
            const decode = jwt.decode(token, process.env.JWT_SECRET);
            req.user = decode;
        }
        catch(error){
            console.log(error);
            return res.status(400).json({
                success:false,
                message:"Token is not valid",
                error:error,
            })
        }
        next();
    }
    catch(error){
        return res.status(200).json({
            success:false,
            message:"Error in auth whille token validating",
            error:error
        })
    }
}

//isStudent
exports.isStudent =async (req,res,next) => {
    try{
        if(req.user.accountType !== "Student"){
            res.status(400).json({
                success:false,
                massage:"This is a protected route only for student."
            })
        }
        next();
    }
    catch(error){
        res.status(400).json({
            success:false,
            massage:"User role can not be varified, please check again"
        })
    }
}

//isInstructer
exports.isInstructer =async (req,res,next) => {
    try{
        if(req.user.accountType !== "Instructer"){
            res.status(400).json({
                success:false,
                massage:"This is a protected route only for Instructer."
            })
        }
        next();
    }
    catch(error){
        res.status(400).json({
            success:false,
            massage:"User role can not be varified, please check again"
        })
    }
}

//isAdmin
exports.isAdmin =async (req,res,next) => {
    try{
        if(req.user.accountType !== "Admin"){
            res.status(400).json({
                success:false,
                massage:"This is a protected route only for Admin."
            })
        }
        next();
    }
    catch(error){
        res.status(400).json({
            success:false,
            massage:"User role can not be varified, please check again"
        })
    }
}