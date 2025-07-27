import toast from "react-hot-toast";
import rzpLogo from "../../assets/Logo/IMG_0034.jpg"
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";
const { apiconnector } = require("../apiConnector")
const { PAYMENT } = require("../apis")



function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror= () =>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch){
    try{

        //load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res) {
            toast.error("RazorPay SDK failed to load");
            return;
        }

        const orderResponse = await apiconnector("POST",PAYMENT.CAPTURE_PAYMENT,{
            courses
        },{
            Authorization: `Bearer ${token}`,
          });
 
        if(!orderResponse?.data?.success){
            console.log("mai error hui bahi",orderResponse.response.message)
            throw new Error(orderResponse.response.message);
        }

        let options = {
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse?.data?.data?.currency,
            amount: `${orderResponse?.data?.data.amount}`,
            order_id:orderResponse?.data?.data?.id,
            name:"StudyNotionAK",
            description: "Thank You for Purchasing the Course",
            image:rzpLogo,
            prefill: {
                name:`${userDetails.firstName}`,
                email:userDetails.email
            },
            handler: function(response) {
                //send successful mail
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount,token );
                //verifyPayment
                verifyPayment({...response, courses}, token, navigate, dispatch);
            }
        }

        const paymentObject =new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("Payment failed",function (response){
            toast.error("oops payment failed");
            // console.log(response.error);
        })

    }catch(error){
        console.log("PAYMENT API ERROR.....",error);
        toast.error(error.message);

    }
}

async function sendPaymentSuccessEmail(response, amount, token) {
    try{
        await apiconnector("POST", PAYMENT.SEND_SUCCESSFUL_EMAIL, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        },{
            Authorization: `Bearer ${token}`
        })
    }
    catch(error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
}

//verify payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentLoading(true));
    try{
        const response  = await apiconnector("POST", PAYMENT.VERIFY_SIGNATURE, bodyData, {
            Authorization:`Bearer ${token}`,
        })

        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("payment Successful, you are added to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }   
    catch(error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}