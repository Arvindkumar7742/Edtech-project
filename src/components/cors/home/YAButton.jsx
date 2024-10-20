import React from 'react'
import { FaArrowRight } from 'react-icons/fa'

export const YAButton = ({text}) => {
  return (
    <div className='flex flex-row gap-2 item-center mt-6 bg-yellow-100 p-2 text-[15px] rounded-lg text-black hover:scale-95 transtion:all duration-100 pl-3 pr-3'>
        <button>{text}</button> <div><FaArrowRight className='mt-1'/></div></div>
  )
}
