import React, { useEffect, useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import { FaCartPlus } from "react-icons/fa";
import { apiconnector } from '../../services/apiConnector'
import { categories } from '../../services/apis'
import { MdKeyboardArrowDown } from "react-icons/md";
import { ProfileDropdown } from '../cors/auth/ProfileDropdown'

export const Navbar = () => {

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);

    const location = useLocation();
    const matchRoute = (path) => {
        return matchPath(path, location.pathname);
    }

    const [sublinks , setSublinks] = useState([]);
    //to fetch all categories
    const fetchSubLinks = async()=>{
        const res = await apiconnector("GET",categories.CATEGORIES_API);
        setSublinks(res.data.categories);
    }
    useEffect(()=>{
        fetchSubLinks();
    },[]);
    return (
        <div className='flex justify-center item-center h-14 border-b-[1px] border-richblack-700 pt-2'>
            <div className='flex flex-row item-center justify-between w-11/12 max-w-maxContent my-auto'>

                {/* Image */}
                <Link to="/">
                    <img src={logo} alt='stuynotionLogo' width={160} height={42} loading='lazy' />
                </Link>

                {/* Nav bralinks */}
                <nav >
                    <ul className='flex flex-row gap-x-4 text-richblack-25'>
                        {
                            NavbarLinks.map((item, index) => (
                                <li key={index}>
                                    {
                                        item.title === "Catalog" ? (
                                        <div className='flex flex-row gap-1 justify-center items-center group relative'>
                                          <p>{item.title}</p> 
                                          <MdKeyboardArrowDown />
                                          <div className='invisible opacity-0 group-hover:visible group-hover:opacity-100
                                        transitiona-all duration-200 min-h-[50px] w-[250px] bg-richblack-5 
                                        text-richblack-900 absolute rounded-lg top-[40px] right-[-60px] z-10'>
                                            <div className='h-10 w-10 bg-richblack-5 absolute left-[160px] top-[-8px] rotate-45'></div>
                                            <div className=' p-3'>
                                            {
                                               sublinks.length ? (<div className='flex flex-col'>{sublinks.map((link,index)=>{
                                                return (<Link key={index} to={`/categories/`+`${link.name}`.split(" ").join("-")}><span>{link.name}</span></Link>)
                                               })}</div>) :(<div></div>)
                                            }
                                            </div>
                                          </div>
                                        </div>) : (
                                            <Link to={item?.path}>
                                                <p className={`${matchRoute(item.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                    {item.title}
                                                </p>
                                            </Link>
                                        )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                {/* signup/login button */}
                <div className='flex gap-x-4 items-center'>
                    {
                        user && user.accounType !== "Instructor" && (
                            <Link to="/dashboard/cart" className='relative text-richblack-400'>
                                <FaCartPlus />
                                <span>{totalItems >0 && (<div></div>)}</span>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/login">
                                <button className='bg-richblack-800 text-richblack-100 border-richblack-600 rounded-md 
                                px-3 py-2'>Log in</button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/signup">
                                <button className='bg-richblack-800 text-richblack-100 border-richblack-600 rounded-md
                                px-3 py-2'>Sign up</button>
                            </Link>
                        )
                    }
                    
                        <ProfileDropdown/>
                     
                </div>
            </div>
        </div>
    )
}
