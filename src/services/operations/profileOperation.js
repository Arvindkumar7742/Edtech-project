import toast from "react-hot-toast";
import { apiconnector } from "../apiConnector";
import { profile } from "../apis";

export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
    const response = await apiconnector(
      "GET",
      profile.GET_ENROLLED_COURSES,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES==>", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.data;
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error);
    toast.error("Could Not Get Enrolled Courses");
  }
  toast.dismiss(toastId);
  return result;
}

export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiconnector(
      "GET",
      profile.GET_INSTRUCTOR_DATA_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("GET_INSTRUCTOR_DATA_API API RESPONSE............", response);
    result = response?.data?.courses;
  } catch (error) {
    console.log("GET_INSTRUCTOR_DATA_API API ERROR............", error);
    toast.error("Could Not Get Instructor Data");
  }
  toast.dismiss(toastId);
  return result;
}
