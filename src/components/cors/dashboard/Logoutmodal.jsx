import React from 'react'

export const Logoutmodal = ({
    data
}) => {
  return (
    <div className='fixed inset-0 backdrop-blur-lg grid place-items-center'>
      <div className='flex flex-col border-[1px] border-richblack-600 bg-richblack-900 p-8 rounded-md'>
      <div className='flex flex-col gap-3'>
            <p className='text-white text-2xl'>{data.text1}</p>
            <p className='text-richblack-200'>{data.text2}</p>
        </div>
        <div className='flex flex-row gap-3 text-lg font-bold'>
            <button className=' mt-6 bg-yellow-100 p-2 text-[15px] rounded-lg text-black pt-3 pb-3 pl-4 pr-4'
             onClick={data.onclick1}>{data.btn1}</button>
            <button className=' mt-6 bg-richblack-400 text-black p-2 text-[15px] rounded-lg pt-3 pb-3 pl-4 pr-4'
            onClick={data.onclick2}>{data.btn2}</button>   
        </div>
      </div>
    </div>
  )
}
