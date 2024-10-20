import React from 'react'
import { TypeAnimation } from 'react-type-animation';
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { YButton } from '../components/cors/home/YButton'
import { BButton } from '../components/cors/home/BButton'
import Banner from "../assets/Images/banner.mp4"
import { YAButton } from '../components/cors/home/YAButton'
import HighlightText from '../components/cors/home/HighlightText'
import CTAButton from '../components/cors/home/Button'
import TimelineSection from '../components/cors/home/TimelineSection'
import LearningLanguageSection from '../components/cors/home/LearningLanguageSection'
import InstructorSection from '../components/cors/home/InstructorSection'
import Footer from '../components/common/Footer'
import { ExploreMore } from '../components/cors/home/ExploreMore';
function Home() {
  return (
    <div>
      {/*Section1  */}
      <div className='relative mx-auto mb-10 flex flex-col w-11/12 max-w-maxContent items-center 
    text-white justify-between bg-richblack-900'>

        <Link to={"/signup"}>
          <div className=' group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
          transition-all duration-200 hover:scale-95 w-fit'>
            <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
              transition-all duration-200 group-hover:bg-richblack-900'>
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>

        </Link>

        <div className='text-[40px] text-white mt-6 text-bold'>
          Empower Your Future with <span className='text-green-600 text-bold text-richblue-200'>Coding Skills</span>
        </div>

        <div className='text-richblack-400 text-[15px] w-7/12 mt-6'>
          With our online coding courses, you can learn at your own pace, from anywhere in the world,
          and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
        </div>

        <div className='flex gap-4 mt-5'>
          <Link to="/signup">
            <YButton text={"Learn More"} />
          </Link>
          <Link to="/login">
            <BButton text={"Book a demmo"} />
          </Link>
        </div>

        <div className='mt-[90px]'>
          <video width="1200" height="1000" muted loop autoPlay className='shadow-custom'>
            <source src={Banner} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className='flex flex-row  gap-10 mt-[110px] '>
          <div className='w-6/12 flex gap-2 flex-col w-6/12'>
            <div className='text-[40px] text-white text-bold leading-[2.5rem]'>
              Unlock Your <span className='text-green-600 text-bold text-richblue-200'>coding potential</span> with our online courses
            </div>

            <div className='text-richblack-400 text-[19px] w-full mt-6'>
              Our courses are designed and taught by industry experts who have years of experience
              in coding and are passionate about sharing their knowledge with you.
            </div>

            <div className='flex flex-row gap-6'>
              <Link to="/signup"><YAButton text={"Try it Yourself"} />
              </Link>
              <Link to="/login">
                <BButton text={"Learn More"} />
              </Link>
            </div>
          </div>
          <div className='text-white flex flex-row gap-2 border border-richblack-700 w-[400px] h-[235px] text-[14px]
         gradient-bg'>
            {/* code block */}
            <div className='flex flex-col text-richblack-200 pl-1'>
              <p>1</p>
              <p>2</p>
              <p>3</p>
              <p>4</p>
              <p>5</p>
              <p>6</p>
              <p>7</p>
              <p>8</p>
              <p>9</p>
              <p>10</p>
              <p>11</p>
            </div>

            <div className='w-[90%] text-yellow-200'>
              <TypeAnimation
                sequence={[
                  `<!DOCTYPE html>
          <html>
          head><title>Example</
          title><linkrel="stylesheet"href="styles.css">
          /head>
          body>
          h1><ahref="/">Header</a>
          /h1>
          nav><ahref="one/">One</a><ahref="two/">Two<
          /a><ahref="three/">Three</a>
          /nav>`, // actual line-break inside string literal also gets animated in new line, but ensure there are no leading spaces
                  1000,
                  '',
                ]}
                style={{ whiteSpace: 'pre-line', display: 'block' }}
                repeat={Infinity}
                omitDeletionAnimation={true}
              />
            </div>

          </div>
        </div>
        <div className='flex flex-row-reverse  gap-10 mt-[110px] '>
          <div className='w-6/12 flex gap-2 flex-col w-6/12 ml-[190px]'>
            <div className='text-[40px] text-white text-bold leading-[2.5rem]'>
              Start <span className='text-green-600 text-bold text-richblue-200'>Coding in seconds</span>
            </div>

            <div className='text-richblack-400 text-[19px] w-full mt-6'>
              Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.
            </div>

            <div className='flex flex-row gap-6'>
              <Link to="/signup"><YAButton text={"Continue Lesson"} />
              </Link>
              <Link to="/login">
                <BButton text={"Learn More"} />
              </Link>
            </div>
          </div>
              {/* codeblock */}
          <div className='text-white flex flex-row gap-2 border border-richblack-700 w-[400px] h-[235px] text-[14px]
         gradient-bg'>
            {/* code block */}
            <div className='flex flex-col text-richblack-200 pl-1'>
              <p>1</p>
              <p>2</p>
              <p>3</p>
              <p>4</p>
              <p>5</p>
              <p>6</p>
              <p>7</p>
              <p>8</p>
              <p>9</p>
              <p>10</p>
              <p>11</p>
            </div>

            <div className='w-[90%] text-yellow-200'>
              <TypeAnimation
                sequence={[
                  `<!DOCTYPE html>
          <html>
          head><title>Example</
          title><linkrel="stylesheet"href="styles.css">
          /head>
          body>
          h1><ahref="/">Header</a>
          /h1>
          nav><ahref="one/">One</a><ahref="two/">Two<
          /a><ahref="three/">Three</a>
          /nav>`, // actual line-break inside string literal also gets animated in new line, but ensure there are no leading spaces
                  1000,
                  '',
                ]}
                style={{ whiteSpace: 'pre-line', display: 'block' }}
                repeat={Infinity}
                omitDeletionAnimation={true}
              />
            </div>

          </div>
        </div>

        {/* Tab wala thing */}
        <ExploreMore/>
      </div>





      {/*Section 2  */}
      <div className='bg-pure-greys-5'>
        <div className='bg-frame h-[333px]'>
          <div className=' flex flex-row w-11/12 justify-center gap-8 '>
            <Link to="/signup" className='mt-[200px]'>
              <YAButton text="Explore full catalog" />
            </Link>
            <Link to="/login" className="mt-[200px]">
              <BButton text="Learn More" />
            </Link>
          </div>
        </div>

        <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>

          <div className='flex flex-row gap-5 mb-10 mt-[95px]'>
            <div className='text-4xl font-semibold w-[45%]'>
              Get the Skills you need for a
              <HighlightText text={"Job that is in demand"} />
            </div>

            <div className='flex flex-col gap-10 w-[40%] items-start'>
              <div className='text-[16px]'>
                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                <div>
                  Learn more
                </div>
              </CTAButton>
            </div>

          </div>

          

          <TimelineSection />

          <LearningLanguageSection />

        </div>

      </div>
      <div className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white'>

        <InstructorSection />

        <h2 className='text-center text-4xl font-semobold mt-10'>review from Other Learners</h2>
        {/* Review Slider here */}
      </div>


      {/*Footer */}
      <Footer />

    </div>
  )
}

export default Home