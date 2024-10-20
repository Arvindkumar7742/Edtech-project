import React, { useState } from 'react'
import { GrUpload } from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux';
import { updateDisplayPicturetoken } from '../../../../services/operations/settingOperation';

export const ProfileImage = () => {

  const dispatch = useDispatch();

  const {user} = useSelector((state)=>state.profile); 
  const {token} = useSelector((state)=>state.auth);
 // console.log(user);

  const [loading,setLoading] = useState(false);
  const [profileImage ,setProfileImage] = useState(null);
  //const [previewImage , setPreviewImage] = useState(null);

  function changeHandler(e){
    setProfileImage(e.target.files[0]);
  }

  function handleClick(){
    setLoading(true);
    try{
      const formData = new FormData();
      formData.append("displayPicture",profileImage);
      dispatch(updateDisplayPicturetoken(token,formData)).then(()=>setLoading(false));
    }catch(error){
      console.log("ERROR MESSAGE - ", error.message)
    }
  }
  return (
    <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
      <div className="flex items-center gap-x-4">
        <img
          src={user.imageUrl}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[78px] rounded-full object-cover"
        />
        <div className='text-white flex flex-col gap-2'>
          <p className='text-[18px]'>Change Profile Picture</p>
          <div class="flex flex-row gap-3 items-center">
            <div>
            <input type="file" name="profileImage" id="profileImage" class="hidden" onChange={changeHandler}/>
            <label for="profileImage" class="bg-richblack-700 text-richblack-50  text-center max-w-[100px] py-2 px-4 rounded cursor-pointer hover:bg-richblack-600">
              Select
            </label>
            </div>
            <div>
              <button onClick={handleClick}
              className='flex flex-row gap-2 items-center justify-center bg-yellow-200 p-1 rounded-md '>
                {loading?"uplaoding...":"upload"} <GrUpload />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
