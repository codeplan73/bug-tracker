import React from 'react'
import {Link} from 'react-router-dom'
import {AiFillQuestionCircle} from 'react-icons/ai'
import {GrOverview} from 'react-icons/gr'
import image from './../assets/bug.png'


const Homepage = () => {
  return (
    <div className='container flex mx-auto my-12 flex-col md:flex-row md:mt-20 lg:p-12'>
      <img className="h-1/2 w-full md:w-1/2" src={image} alt="" />
      <div className='w-90 md:w-1/2 lg:w-2/5 mx-auto flex-col justify-center bg-slate-400 p-5 rounded-md shadow-2xl items-center'>
        <h2 className='text-2xl my-2 mt-6 font-semibold text-center'>What do you need help with?</h2>
        <h4 className='text-xl my-2  mb-6 font-semibold text-slate-200 text-center'>Please choose from an option below</h4>
        <Link to='/' className='flex gap-2 mb-4 items-center justify-center mx-auto w-9/12 bg-slate-200 p-1 rounded-sm '>
          <AiFillQuestionCircle />
          Create New Ticket
          </Link>
        <Link to='/' className='flex gap-2 mx-auto items-center justify-center w-9/12 bg-slate-200 p-1 rounded-sm text-center'>
          <GrOverview />
          View Mt Tickets
        </Link>
      </div>
    </div>
  )
}

export default Homepage