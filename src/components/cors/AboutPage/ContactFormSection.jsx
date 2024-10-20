import React from "react";
import {ContactUsForm} from "../contactPage/ContactUsForm"

const ContactFormSection = ({flag}) => {
  return (
    <div className={flag ? "w-6/12 mx-auto border-2 border-richblack-700 p-[40px] rounded-lg ml-2" :"mx-auto"}>
      <h1 className="text-center text-4xl font-semibold text-white">{flag ? "Got a Idea? We’ve got the skills. Let’s team up" :"Get in Touch"}</h1>
      <p className="text-center text-richblack-300 mt-3">
        {
          flag ? "Tall us more about yourself and what you're got in mind.":"We&apos;d love to here for you, Please fill out this form."
        }
      </p>
      <div className="mt-12 mx-auto">
        <ContactUsForm/>
      </div>
    </div>
  );
};

export default ContactFormSection;
