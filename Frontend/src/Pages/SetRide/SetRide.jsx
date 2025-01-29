import React, { useRef, useState } from 'react'
import mapImage from '../../assets/map.png'
import gsap from "gsap";
import { useGSAP } from '@gsap/react'
import { FaChevronDown } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

const SetRide = () => {
    const searchPanelRef = useRef(null);
    const [searchPanel, setSearchPanel] = useState(false);
    const [pickUpLocation, setPickUpLocation] = useState("");
    const [destination, setDestination] = useState("")
    useGSAP(function () {
        if (searchPanel) {
            gsap.to(searchPanelRef.current, {
                height: "70%",
            })
        } else {
            gsap.to(searchPanelRef.current, {
                height: 0,
            })
        }
    }, [searchPanel])
    return (
        <>
            <div className='h-screen relative overflow-hidden'>
                <img className='absolute top-0'
                    src={mapImage} alt="" />
                <div className='absolute w-full h-full flex flex-col justify-end'>
                    <div className="h-[30%] bg-[#212121]
                   w-full p-4 pb-5">
                        {
                            searchPanel && (
                                <div
                                    onClick={() => {
                                        setSearchPanel(false)
                                    }}
                                    className='text-white 
                        absolute right-6 mt-4 cursor-pointer'><FaChevronDown />
                                </div>
                            )
                        }
                        <h2 className='text-[24px] text-white mb-5 mt-2'>Find a trip</h2>
                        <div className='flex flex-col gap-4 relative'>
                            <input
                                onClick={() => {
                                    setSearchPanel(true)
                                }}
                                value={pickUpLocation}
                                onChange={(e) => {
                                    setPickUpLocation(e.target.value)
                                }}
                                className='p-4 py-2 cursor-pointer
                        rounded-sm placeholder:text-sm pl-9'
                                type="text"
                                placeholder='Add a pick-up location'
                            />
                            <input
                                value={destination}
                                onChange={(e) => {
                                    setDestination(e.target.value)
                                }}
                                className='p-4 py-2 pl-9 cursor-pointer
                         rounded-sm placeholder:text-sm outline-none'
                                type="text"
                                placeholder='Enter your destination'
                            />
                            <span className='w-2 h-2 rounded-full border-2
                         border-[#121212] absolute left-4 top-4'></span>
                            <span className='w-1 h-10
                         bg-[#121212] absolute top-7 left-[18px] rounded-sm'></span>
                            <span className='w-2 h-2 rounded-full border-2
                         border-[#121212] absolute left-4 top-[72px]'></span>
                        </div>
                    </div>
                    <div ref={searchPanelRef} className="h-0 bg-[#212121]">
                        <h2 className='text-[24px] text-white px-5 pb-7'>Location</h2>
                        <div className="flex flex-col gap-2">
                            {
                                Array.from([1, 2, 3, 4, 5]).map((val,index) => {
                                    return (
                                        <div key={index}>
                                            <div 
                                            className="flex items-center gap-3
                                             text-white p-2 px-4 cursor-pointer">
                                                <div 
                                                className="h-10 w-10 bg-gray-400 
                                                text-xl flex items-center justify-center rounded-full
                                                ">
                                                    <IoLocationSharp />
                                                </div>
                                                <div className='flex flex-col'>
                                                    <span
                                                    onClick={(e)=>{
                                                        setPickUpLocation(e.target.textContent)
                                                    }} 
                                                    className='font-semibold text-[15px]'
                                                    >Rohini Sector-1{val} Delhi</span>
                                                    <span className='text-xs text-[#fefefe]'>
                                                        M2K Mall, Near Rohini, Delhi, 110086</span>
                                                </div>
                                            </div>
                                            <div className='h-[1px] bg-[#313131] w-full my-3'></div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SetRide
