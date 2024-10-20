import React from 'react'
import { ProfileImage } from './ProfileImage'
import { useSelector } from 'react-redux'
import DeleteAccount from './DeleteAccount'
import EditProfile from './EditProfile'
import UpdatePassword from './ChangePassword'

export const Settings = () => {
  const { user } = useSelector((state) => state.profile)
  return (
    <div>
       <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Profile
      </h1>
      <ProfileImage />
      <EditProfile/>
      <UpdatePassword/>
      <DeleteAccount/>
    </div>
  )
}
