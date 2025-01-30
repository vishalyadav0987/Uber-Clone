import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserContext } from '../../Context/userContext'
import axios from 'axios';
import toast from 'react-hot-toast';

const UserRegisterPage = () => {
    const navigate = useNavigate();
    const { setUser, loading, setLoading } = useUserContext()
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const registerHandler = async (e) => {
        e.preventDefault();
        const newUser = {
            fullname: {
                firstname,
                lastname
            },
            email,
            password
        }
        setLoading(true)
        try {
            const response = await axios.post('http://localhost:3000/api/v1/users/register', newUser);
            if (response.data && response.data.success) {
                toast.success(response.data.message, {
                    className: "text-xs"
                });
                setUser(response.data.user);
                setLoading(false);
                navigate('/go-on-ride')
                setFirstname('');
                setLastname('');
                setEmail('');
                setPassword('');
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
                    <form className='w-full flex flex-col gap-4 mt-4' onSubmit={registerHandler}>
                        {/* for full name  */}
                        <div className="flex flex-col gap-2.5 w-full">
                            <h2
                                className='font-normal font-sans text-white text-[16px]'>
                                What's you name?
                            </h2>
                            <div className='flex gap-4 w-full'>
                                <input type="text"
                                    value={firstname}
                                    onChange={(e) => {
                                        setFirstname(e.target.value)
                                    }}
                                    className='p-4 py-2 placeholder:text-xs rounded-sm w-1/2 outline-none'
                                    placeholder='Firstname*'
                                    required />
                                <input type="text"
                                    value={lastname}
                                    onChange={(e) => {
                                        setLastname(e.target.value)
                                    }}
                                    className='p-4 py-2 placeholder:text-xs rounded-sm w-1/2 outline-none'
                                    placeholder='Lastname*'
                                    required />
                            </div>
                        </div>
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
                                loading ? (


                                    <div role="status">
                                        <svg
                                            aria-hidden="true"
                                            class="w-8 h-8 text-gray-200 animate-spin
                                         dark:text-gray-600 fill-black"
                                            viewBox="0 0 100 101"
                                            fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        <span class="sr-only">Loading...</span>
                                    </div>


                                ) : ("Create account")
                            }
                        </button>
                        <p className='text-white text-xs text-center'>If already have account <Link className='underline text-blue-500' to="/user-login">Login</Link></p>
                    </form>
                    <div>
                        <Link to='/captain-register'
                            className='flex justify-center items-center border-none 
                    p-4 py-2 mt-3
                    rounded-sm w-full
                     bg-orange-500 
                     text-white cursor-pointer hover:bg-orange-700 font-medium mb-3'
                        >
                            Sign in as Captain
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

export default UserRegisterPage
