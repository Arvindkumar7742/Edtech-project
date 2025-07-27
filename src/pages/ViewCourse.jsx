import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';

export const ViewCourse = () => {

    const [reviewModal,setReviewModal] = useState(null);

  return (
    <>
    <div>
        <VideoDetailsSidebar />
        <div>
            <Outlet/>
        </div>
        {
            // reviewModal && <ReviewModal setReviewModal={setReviewModal}/>
        }
    </div>
    </>
  )
}
