import toast from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { resetCart } from "../../slices/cartSlice";
const { apiconnector } = require("../apiConnector");
const { auth } = require("../apis");

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true));
    try {
      const res = await apiconnector("POST", auth.SENDOTP_API, { email });

      console.log("HElloo-->12")
      console.log("res:::=====>>>>>", res);
      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      toast.success("Otp sent succesfully");
      navigate("/verify-email");
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
}

export function Signup(
  email,
  firstName,
  lastName,
  otp,
  accountType,
  password,
  confirmPassword
  , navigate
) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("loading....");
    try {
      const res = await apiconnector("POST", auth.SIGNUP, {
        email,
        firstName,
        lastName,
        otp,
        accountType,
        password,
        confirmPassword,
      });

      console.log("OTP OTP OTP OTP OTP===>", otp);
      console.log("res:::=====>>>>>", res);
      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      toast.success("Sign Up successfully");
      navigate("/login");

    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Could not signup");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
}

export function login(email, password, navigate) {
  return async (dispatch) => {

    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true));
    try {
      const res = await apiconnector("POST", auth.LOGIN_API, { email, password });

      console.log("res:::=====>>>>>", res);
      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      toast.success("Login Succesfully");
      const userImage = res.data?.userExist?.imageUrl
        ? res.data.userExist.imageUrl
        : `https://api.dicebear.com/5.x/initials/svg?seed=${res.data.userExist.firstName} ${res.data.userExist.lastName}`
      dispatch(setUser(res.data.userExist));
      localStorage.setItem("user", JSON.stringify(res.data.userExist));
      dispatch(setToken(res.data.token));
      localStorage.setItem("token", JSON.stringify(res.data.token));
      navigate("/dashboard");
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Could not login")
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
}

export function resetPasswordToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Loading...");
    try {
      const res = await apiconnector("POST", auth.RESETPASSWORD_TOKEN_API, { email });

      console.log("Response from the reset password token==>", res);
      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      toast.success("email sent sucessfully");
      setEmailSent(true);
    } catch (error) {
      console.log("Token send API ERROR............", error)
      toast.error("Cound not send Email");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
}

export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Loading...");
    try {
      const res = await apiconnector("POST", auth.RESETPASSWORD, { password, confirmPassword, token });

      console.log("Response from the reset password==>", res);
      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      toast.success("Password reset succesfully");
      navigate("/login")
    } catch (error) {
      console.log("reset password API ERROR............", error)
      toast.error("Cound not update the password");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
}

export function logout(navigate) {
  return async (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(resetCart());
    toast.success("Logeed out successfully.");
    navigate("/");
  }
}

