const express = require('express');
const app = express();

const userRoutes = require('./routes/User');
const courseRoutes = require('./routes/Course');
const paymentRoutes = require('./routes/Payment');
const profileRoutes = require('./routes/Profile');
const contactRoutes = require('./routes/contactus');

const { connect }= require('./config/database');
const { cloudinaryConnect } = require('./config/cloudinary');

const cookieParser = require('cookie-parser'); 
const cors = require('cors');
const fileUpload = require('express-fileupload');

require('dotenv').config();

//connect to mongo DB 
connect();
//to connect the cloudinary
cloudinaryConnect();

//to parse the data from body
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp'
}));

app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)

//For auth router
app.use('/api/v1/auth' , userRoutes);
app.use('/api/v1/payment' , paymentRoutes);
app.use('/api/v1/course' , courseRoutes);
app.use('/api/v1/profile' , profileRoutes);
app.use('/api/v1/reach' , contactRoutes);

app.get('/' ,(req,res)=>{
    res.send("<h1>Server is running...</h1>")
})

app.listen(process.env.PORT , ()=>{
    console.log(`Server is listening on PORT NO ${process.env.PORT}`)
})

