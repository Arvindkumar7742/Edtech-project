import React from "react";
import ContactDetails from "./ContactDetails";
import ContactFormSection from "../AboutPage/ContactFormSection";
import Footer from "../../common/Footer";
import ReviewSlider from "../../common/ReviewSlider";

export const ContactUs = () => {
  return (
    <div className="flex flex-col mt-[100px] ">
      <div className="flex flex-row w-11/12 mx-auto gap-x-3">
        <ContactDetails />
        <ContactFormSection flag={true} />
      </div>
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>
      <Footer />
    </div>
  );
};
