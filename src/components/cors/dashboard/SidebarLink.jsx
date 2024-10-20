import React from 'react'
import { NavLink, matchPath, useLocation } from 'react-router-dom'
import * as icons from "react-icons/vsc"

export const SidebarLink = ({name,path,icon}) => {
  const Icon = icons[icon];
  const location = useLocation();
  function matchRoute(path){
    return matchPath(path,location.pathname);
  }
  return (
    <NavLink to={path}>
      <div className={`relative flex flex-row gap-4 items-center p-2 pl-6 ${matchRoute(path) ? "bg-yellow-800 text-yellow-50" :"text-richblack-200"}`}>
        {
          matchRoute(path) && <div className='w-[0.2rem] h-full bg-yellow-100 absolute top-0 left-0'></div>
        }
        <Icon/>
          <p>{name}</p>
      </div>
    </NavLink>
  )
}
