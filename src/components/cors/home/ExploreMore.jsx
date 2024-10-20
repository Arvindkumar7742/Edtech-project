import React, { useState } from 'react'
import  {HomePageExplore} from "../../../data/homepage-explore"

const Items = [
    {
        key:1,
        name:"Free"
    },
    {
        key:2,
        name:"New to coding"
    },
    {
        key:3,
        name:"Most popular"
    },
    {
        key:4,
        name:"Skill paths"
    },
    {
        key:5,
        name:"Career paths"
    }

]
export const ExploreMore = () => {

    const [currentTab ,setCurrentTab] = useState(Items[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

    function clickHandler(key){
        setCurrentTab(Items[key-1]);
        const result = HomePageExplore.filter((course) => course.tag === Items[key].name);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

    return (
        <div className='mt-[100px] flex flex-col gap-5'>
            <div className='text-[40px] text-center text-white text-bold leading-[2.5rem]'>
                Unlock the <span className='text-green-600 text-bold text-richblue-200'>Power of Code</span>
            </div>
            <div className='text-center text-richblack-300'>
            Learn to build anything you can imagine
            </div>
            <div className='flex flex-row  bg-richblack-800 justify-center rounded-full' >
                {
                    Items.map((item)=>{
                        return (
                            <p className={`text-[16px] text-richblack-300 text-center w-[130px] h-[50px] pt-3 rounded-full
                             hover:bg-richblack-900 ml-1 mr-1 hover:text-white hover:cursor-pointer transition-all duration-300
                        ${currentTab.name === item.name ? "bg-richblack-900 text-white" :""}`}
                            onClick={()=>clickHandler(item.key)} >{item.name}</p>
                        )
                    })
                }
            </div>

        </div>
    )
}
