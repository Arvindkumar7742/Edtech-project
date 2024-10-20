const nodemailer=require("nodemailer");
require('dotenv').config();

module.exports=mailSender =async(email,title,body)=>{
    try {
        const tranaspoter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })

        let info = await tranaspoter.sendMail({
            from: "AK From Linux || StudyNotion",
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
        })

        console.log("printing the sender email Info from mailSender::::", info);
    }
    catch (error) {
        console.log("Error while sending the email in mailsSender:::::",error);
    }
}
