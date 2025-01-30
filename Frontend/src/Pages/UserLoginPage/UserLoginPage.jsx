import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserContext } from '../../Context/userContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import Spinner from '../../Components/Spinner/Spinner'
import Cookies from 'js-cookie'

const UserLoginPage = () => {
  const navigate = useNavigate()
  const { setUser, loading, setLoading } = useUserContext();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const loginHandler = async (e) => {
    e.preventDefault();
    const loginUser = {
      email,
      password
    }
    try {
      const response = await axios.post('/api/v1/users/login', loginUser);
      if (response.data && response.data.success) {
        toast.success(response.data.message, {
          className: "text-xs"
        });
        setUser(response.data.user);
        Cookies.set('token',response.data?.token);
        setLoading(false);
        navigate('/')
      } else {
        toast.error(response.data.message, {
          className: "text-xs"
        });
      }
    } catch (err) {
      console.log(err.response?.data || err.message); // Log error details
      const errorMessage = err.response?.data?.message
        || err.response?.data?.error?.[0]?.msg
        || err.message
        || err.response?.data;

      if (errorMessage) {
        toast.error(errorMessage, { className: "text-xs" });
      }

    } finally {
      setLoading(false);

    }
  }
  return (
    <>
      <div className="h-screen bg-[#212121] w-full">
        <img
          className='w-32 py-6 px-6 pb-2 cursor-pointer'
          src="https://freelogopng.com/images/all_img/1659768779uber-logo-white.png"
          alt="" />
        <div className='w-full p-4 flex flex-col justify-between h-[90%]'>
          <form className='w-full flex flex-col gap-4 mt-4' onSubmit={loginHandler}>
            <div className="flex flex-col gap-2.5 w-full">
              <h2
                className='font-normal font-sans text-white text-[16px]'>
                What's you email?
              </h2>
              <input type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
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
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
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
              {
                loading ? (<Spinner/>) : ("Login")
              }
            </button>
            <p className='text-white text-xs text-center'>Create a new account? <Link className='text-blue-500' to="/user-register">Register</Link></p>
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
