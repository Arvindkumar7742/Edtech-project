const base_url = process.env.REACT_APP_BASE_URL;

export const categories = {
    CATEGORIES_API: base_url + '/course/showAllCategories'
}

export const auth = {
    SENDOTP_API: base_url + '/auth/sendotp',
    LOGIN_API: base_url + '/auth/login',
    SIGNUP: base_url + '/auth/signup',
    RESETPASSWORD_TOKEN_API: base_url + '/auth/reset-password-token',
    RESETPASSWORD: base_url + '/auth/reset-password',
    CHANGE_PASSWORD_API: base_url + '/auth/changepassword',
}

export const contact = {
    CONTACT_US: base_url + '/reach/contact',
}

//API for profile
export const profile = {
    UPDATE_PICTURE: base_url + '/profile/updateDisplayPicture',
    DELETE_PROFILE_API: base_url + '/profile/deleteuser',
    UPDATE_PROFILE_API: base_url + '/profile/updateProfile',
    GET_ENROLLED_COURSES: base_url + '/profile/getenrolledcourses'
}

// COURSE ENDPOINTS
export const courseEndpoints = {
    GET_ALL_COURSE_API: base_url + "/course/getAllCourse",
    COURSE_DETAILS_API: base_url + "/course/getCourseDetails",
    EDIT_COURSE_API: base_url + "/course/editCourse",
    COURSE_CATEGORIES_API: base_url + "/course/showAllCategories",
    CREATE_COURSE_API: base_url + "/course/createCourse",
    CREATE_SECTION_API: base_url + "/course/addSection",
    CREATE_SUBSECTION_API: base_url + "/course/addSubSection",
    UPDATE_SECTION_API: base_url + "/course/updateSection",
    UPDATE_SUBSECTION_API: base_url + "/course/updateSubSection",
    GET_ALL_INSTRUCTOR_COURSES_API: base_url + "/course/getInstructorCourses",
    DELETE_SECTION_API: base_url + "/course/deleteSection",
    DELETE_SUBSECTION_API: base_url + "/course/deleteSubSection",
    DELETE_COURSE_API: base_url + "/course/deleteCourse",
    GET_FULL_COURSE_DETAILS_AUTHENTICATED:
        base_url + "/course/getFullCourseDetails",
    LECTURE_COMPLETION_API: base_url + "/course/updateCourseProgress",
    CREATE_RATING_API: base_url + "/course/createRating",
}

// CATALOG PAGE DATA
export const catalogData = {
    CATALOGPAGEDATA_API: base_url + "/course/getCategoryPageDetails",
  }