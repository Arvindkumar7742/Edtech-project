import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sidebarLinks } from "../../../data/dashboard-links"
import { SidebarLink } from './SidebarLink';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../services/operations/authOperation';
import { VscSignOut } from "react-icons/vsc";
import { Logoutmodal } from './Logoutmodal';

export const Sidebar = () => {
  const { user } = useSelector((state) => state.profile);
  const [confirmationModal, setConfirmationmodal] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className='flex text-white flex-col gap-2 pt-[50px] bg-richblack-800 h-screen w-[15%]'>
      {
        sidebarLinks.map((item, index) => {
          if (item.type && user?.accountType !== item.type) {
            return null;
          }
          return (
            <div key={item.id}>
              <SidebarLink name={item.name} path={item.path} icon={item.icon} />
            </div>
          )
        })
      }
      <div className='bg-richblack-600 ml-3 mr-3 mt-5 h-[0.01rem] w-5/11 mx-auto'></div>
      <div className='flex flex-col'>
        <SidebarLink name="Settings" path="/dashboard/settings" icon="VscSettingsGear" />
        <button
          onClick={() => {
            setConfirmationmodal({
              text1: "Are you sure?",
              text2: "You will be logged out of your account.",
              btn1: "Logout",
              btn2: "Cancel",
              onclick1: () => {
                dispatch(logout(navigate));
              },
              onclick2: () => {
                setConfirmationmodal(null);
              }
            })
          }}
          className='flex flex-row gap-4 items-center p-2 pl-6 text-richblack-200'
        >
          <VscSignOut />
          <span>Logout</span>
        </button>
        {
          confirmationModal && <Logoutmodal data={confirmationModal} />
        }
      </div>
    </div>
  )
}
