import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import countryCode from "../../../data/countrycode.json"
import { apiconnector } from '../../../services/apiConnector';
import { contact } from '../../../services/apis';
import toast from 'react-hot-toast';

export const ContactUsForm = ({flag}) => {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
        reset,
    } = useForm();

    async function submitHandler(data) {
        const toastId = toast.loading("Loading...")
        setLoading(true);
        try {
            const res = await apiconnector("POST", contact.CONTACT_US, data);

            if (!res.data.success) {
                throw new Error(res.data.message);
            }

            toast.success("Response saved successfully");
        } catch (error) {
            console.log("CONTACT_US API ERROR............", error)
            toast.error("Could not send saved res")
        }
        setLoading(false);
        toast.dismiss(toastId);
    }
    useEffect(() => {
        reset({
            firstName: "",
            lastName: "",
            email: "",
            countryCode: "",
            phoneNumber: "",
            message: ""
        })
    }, [reset, isSubmitSuccessful]);
    return (
        <div >
            <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-2'>
                <div className='flex flex-col gap-5' >
                    <div className='flex flex-row gap-2'>
                        <label htmlFor='firstName' className='flex flex-col text-white w-6/12'>
                            <span>First Name</span>
                            <input
                                type="text"
                                id='firstName'
                                className='bg-richblack-700 rounded-md p-[14px] border-neutral-500  border-b-[1pt] outline-none'
                                name='firstName'
                                placeholder='Enter first name'
                                {...register("firstName", { "required": true })}
                            />
                            {
                                errors.firstName && (
                                    <span className='text-[13px] mt-2 text-yellow-200'>Please Enter your first name*</span>
                                )
                            }
                        </label>
                        <label htmlFor='lastName' className='flex flex-col text-white w-6/12'>
                            <span>Last Name</span>
                            <input
                                type="text"
                                id='lastName'
                                className='bg-richblack-700 rounded-md p-[14px] border-neutral-500  border-b-[1pt] outline-none w-full'
                                name='lastName'
                                placeholder='Enter last name'
                                {...register("lastName", { "required": true })}
                            />
                            {
                                errors.lastName && (
                                    <span className='text-[13px] mt-2 text-yellow-200'>Please Enter your last name*</span>
                                )
                            }
                        </label>
                    </div>
                    <label htmlFor='email' className='flex flex-col text-white'>
                        <span>Email address</span>
                        <input
                            type="email"
                            id='email'
                            className='bg-richblack-700 rounded-md p-[14px] border-neutral-500  border-b-[1pt] outline-none'
                            name='email'
                            placeholder='Enter You email'
                            {...register("email", { "required": true })}
                        />
                        {
                            errors.email && (
                                <span className='text-[13px] mt-2 text-yellow-200'>Please Enter your Email address*</span>
                            )
                        }
                    </label>
                    <div className='flex flex-col'>
                        <p className='text-white'>Phone number</p>
                        <div className='flex flex-row gap-2'>
                            <div className='flex flex-col gap-1'>
                                <select name="countryCode" id="countryCode" className='text-white bg-richblack-700 rounded-md p-[17px] border-neutral-500  border-b-[1pt] outline-none w-[90px] p-[10px] '
                                    {...register("countryCode", { required: true })}>
                                        <option value="" selected disabled hidden>{countryCode[0].code} -{countryCode[0].country}</option>
                                    {
                                        countryCode.map((item, index) => (
                                            <option  className='text-richbalck-100 bg-richblack-800 rounded-md' key={index} value={item.code}>{item.code} -{item.country}</option>
                                        ))
                                    }
                                </select>
                                {
                                    errors.countryCode &&(
                                        <span className='text-[13px] mt-2 text-yellow-200'>
                                            Enter your country code* 
                                        </span>
                                    )
                                }
                            </div>
                            <div className='flex flex-col gap-1 w-full'>
                                <input type='tel'
                                    id='phoneNumber'
                                    name='phoneNumber'
                                    className='bg-richblack-700 rounded-md p-[14px] border-neutral-500  border-b-[1pt] outline-none '
                                    placeholder='phone number'
                                    {
                                    ...register("phoneNumber", {
                                        required: {
                                            value: true, message: "Enter the phone number"
                                        },
                                        maxLength: {
                                            value: 10, message: "Number length can not exceed 10"
                                        },
                                        minLength: { length: 8, message: "Number length can not less then 8" }
                                    },
                                    )
                                    }></input>
                                {
                                    errors.phoneNumber && (
                                        <span className='text-[13px] mt-2 text-yellow-200'>{errors.phoneNumber.message}*</span>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <label htmlFor='message' className='flex flex-col text-richblack-50'>
                        <span>Message</span>
                        <textarea name="message" id="message"
                            rows={10}
                            cols={20}
                            className='bg-richblack-700 rounded-md p-[14px] border-neutral-500  border-b-[1pt] outline-none'
                            {...register("message", { required: true })}
                            placeholder='Enter your message...'
                        ></textarea>
                        {
                            errors.message && (
                                <span className='text-[13px] mt-2 text-yellow-200'>
                                    Enter the message*
                                </span>
                            )
                        }
                    </label>
                </div>
                <button type='submit' className='flex justify-center items-center bg-yellow-200 text-richblack-900 rounded-md p-3'>Send Message</button>
            </form>
        </div>
    )
}
