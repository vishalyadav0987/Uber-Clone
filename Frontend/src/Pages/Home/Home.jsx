import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <>
            <div className='relative h-screen'>
                <Link to="/"><img
                    className='absolute z-10 w-32 py-6 px-6 pb-2 cursor-pointer'
                    src="https://freelogopng.com/images/all_img/1659768779uber-logo-white.png" alt="" /></Link>
                <img className='object-contain absolute top-0' src="https://images.pexels.com/photos/11532773/pexels-photo-11532773.jpeg" alt="" />
                <div className='absolute bottom-0  w-full bg-[#212121] h-[220px] p-4 py-7 
                rounded-t-lg'>
                    <Link to='/user-register'
                        className='flex justify-center items-center border-none 
                    p-4 py-2 mt-3
                    rounded-sm w-full
                     bg-green-500 
                     text-white cursor-pointer hover:bg-green-600 font-medium mb-3'
                    >
                        Sign in as User
                    </Link>
                    <Link to='/captain-register'
                        className='flex justify-center items-center border-none 
                    p-4 py-2 mt-3
                    rounded-sm w-full
                     bg-orange-500 
                     text-white cursor-pointer hover:bg-orange-600 font-medium mb-3'
                    >
                        Sign in as Captain
                    </Link>
                    <p className='text-xs text-gray-500 px-2'>The site is protected bt XYX and firefox
                        {" "}<span className='font-bold underline'>Privacy Policy</span> {" "}
                        and {" "} <span className='font-bold underline'>Terms of Service</span>.
                    </p>
                </div>
            </div>

        </>
    )
}

export default Home
