import toast from "react-hot-toast"
import { apiconnector } from "../apiConnector";
import { auth, profile } from "../apis";
import { setUser } from "../../slices/profileSlice";
import { logout } from "./authOperation";


export function updateDisplayPicturetoken(token,formData){
    return async(dispatch)=>{
        const toastId = toast.loading("loading..");
        try{
            const res =await apiconnector("POST",profile.UPDATE_PICTURE,
                formData,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            )

            if(!res.data.success){
                throw new Error(res.data.message);
            }

            console.log("Response from update display picture...==>>",res);
            dispatch(setUser(res.data.data));
            localStorage.setItem("user", JSON.stringify(res.data.data));
            toast.success("Profile photo updated succesfully");
            
        }catch(error){
           console.log("error from update picture api",error);
           toast.error("cannot update profile picture");
        }
        toast.dismiss(toastId);
    }
}

export function deleteProfile(token, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      try {
        const response = await apiconnector("DELETE", profile.DELETE_PROFILE_API, null, {
          Authorization: `Bearer ${token}`,
        })
        console.log("DELETE_PROFILE_API API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Profile Deleted Successfully")
       // dispatch(logout(navigate)) -- why
      } catch (error) {
        console.log("DELETE_PROFILE_API API ERROR............", error)
        toast.error("Could Not Delete Profile")
      }
      toast.dismiss(toastId)
    }
  }

  export function updateProfile(token, formData) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      try {
        const response = await apiconnector("PUT", profile.UPDATE_PROFILE_API, formData, {
          Authorization: `Bearer ${token}`,
        })
        console.log("UPDATE_PROFILE_API API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        dispatch(
          setUser(response.data.user)
        )
        localStorage.setItem("user",JSON.stringify(response.data.user));
        toast.success("Profile Updated Successfully")
      } catch (error) {
        console.log("UPDATE_PROFILE_API API ERROR............", error)
        toast.error("Could Not Update Profile")
      }
      toast.dismiss(toastId)
    }
  }

  export async function changePassword(token, formData) {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiconnector("POST", auth.CHANGE_PASSWORD_API, formData, {
        Authorization: `Bearer ${token}`,
      })
      console.log("CHANGE_PASSWORD_API API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Password Changed Successfully")
    } catch (error) {
      console.log("CHANGE_PASSWORD_API API ERROR............", error)
      toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
  }