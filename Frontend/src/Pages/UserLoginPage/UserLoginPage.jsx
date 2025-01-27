import React from 'react'
import { Link } from 'react-router-dom'

const UserLoginPage = () => {
  return (
    <>
      <div className="h-screen bg-[#212121] w-full">
        <img
          className='w-32 py-6 px-6 pb-2 cursor-pointer'
          src="https://freelogopng.com/images/all_img/1659768779uber-logo-white.png"
          alt="" />
        <div className='w-full p-4 flex flex-col justify-between h-[90%]'>
          <form className='w-full flex flex-col gap-4 mt-4'>
            <div className="flex flex-col gap-2.5 w-full">
              <h2
                className='font-normal font-sans text-white text-[16px]'>
                What's you email?
              </h2>
              <input type="email"
                className='p-4 py-2 placeholder:text-xs rounded-sm w-full outline-none'
                placeholder='Email*'
                required />
            </div>
            <div className="flex flex-col gap-2.5 w-full">
              <h2
                className='font-normal font-sans text-white text-[16px]'>
                Password
              </h2>
              <input type="password"
                className='p-4 py-2 placeholder:text-xs rounded-sm w-full outline-none'
                placeholder='Password*'
                required />
            </div>
            <button
              className='border-none 
                    p-4 py-2 mt-3 
                    rounded-sm w-full
                     bg-green-500 
                     text-white cursor-pointer hover:bg-green-700 font-medium'>
              Login
            </button>
            <p className='text-white text-xs text-center'>Create a new account? <Link className='underline text-blue-500' to="/user-register">Register</Link></p>
          </form>
          <div>
            <Link to='/captain-login'
              className='flex justify-center items-center border-none 
                    p-4 py-2 mt-3
                    rounded-sm w-full
                     bg-orange-500 
                     text-white cursor-pointer hover:bg-orange-700 font-medium mb-3'
            >
              Sign up as Captain
            </Link>
            <p className='text-xs text-gray-500'>The site is protected bt XYX and firefox
              {" "}<span className='font-bold underline'>Privacy Policy</span> {" "}
              and {" "} <span className='font-bold underline'>Terms of Service</span>.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserLoginPage
