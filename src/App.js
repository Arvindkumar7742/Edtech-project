import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import { Navbar } from "./components/common/Navbar";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { Error } from "./pages/Error";
import ForgotPassword from "./pages/ForgotPassword";
import OpenRoute from "./components/cors/auth/OpenRoute";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import { ContactUs } from "./components/cors/contactPage/ContactUs"
import { Dashboard } from "./pages/Dashboard";
import { PrivateRoute } from "./components/cors/auth/PrivateRoute";
import MyProfile from "./components/cors/dashboard/MyProfile";
import EnrolledCourses from "./components/cors/dashboard/EnrolledCourses";
import { Settings } from "./components/cors/dashboard/settings/Settings";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import Cart from "./components/cors/dashboard/Cart";
import AddCourse from "./components/cors/dashboard/AddCourse";
import MyCourses from "./components/cors/dashboard/MyCourses";
import EditCourse from "./components/cors/dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";

function App() {
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>

        <Route path="/login" element={
          <OpenRoute>
            <Login />
          </OpenRoute>
        }></Route>

        <Route path="/signup" element={
          <OpenRoute>
            <Signup /></OpenRoute>
        }></Route>

        <Route path="/" element={<Home />}></Route>
        <Route path="/catalog/:catalogName" element={<Catalog />}></Route>
        <Route path="courses/:courseId" element={<CourseDetails/>} />

        <Route path="/forgot-password" element={
          <OpenRoute>
            <ForgotPassword />
          </OpenRoute>
        }></Route>

        <Route path="/updatePassword/:id" element={
          <OpenRoute>
            <UpdatePassword />
          </OpenRoute>
        }></Route>

        <Route path="/verify-email" element={
          <OpenRoute>
            <VerifyEmail />
          </OpenRoute>
        }></Route>

        <Route path="/about" element={
          <About />
        }></Route>


        <Route path="/contact" element={
          <OpenRoute>
            <ContactUs />
          </OpenRoute>
        }></Route>

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >

          <Route path="/dashboard/my-profile"
            element={<MyProfile />}
          ></Route>
          <Route path="/dashboard/settings"
            element={<Settings />}
          ></Route>

          {
            user?.accountType == ACCOUNT_TYPE.STUDENT &&
            <>
              <Route path="/dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              ></Route>
              <Route path="/dashboard/cart"
                element={<Cart />}
              ></Route>
            </>
          }

          {
            user?.accountType == ACCOUNT_TYPE.INSTRUCTOR &&
            <>
              <Route path="/dashboard/my-courses"
                element={<MyCourses />}
              ></Route>
              <Route path="/dashboard/add-course"
                element={<AddCourse />}
              ></Route>
              <Route path="/dashboard/instructor"
                element
              ></Route>
              <Route path="dashboard/edit-course/:courseId"
                element={<EditCourse />} />
            </>
          }
        </Route>

        <Route path="*" element={<Error />}> </Route>
      </Routes>
    </div>
  );
}

export default App;
