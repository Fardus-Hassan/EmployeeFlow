import React from 'react';
import { FaArrowRight } from "react-icons/fa";

const AboutUs = () => {
    return (
            <div>
                <div className='mb-12'>
                    <p className="text-xl text-pmColor font-montserrat font-bold text-center">About Us</p>
                    <h1 className="mt-2 text-2xl font-semibold text-black font-poppins text-center capitalize lg:text-4xl dark:text-white">
                    Empower Your Team
                    </h1>
                </div>
                <div className="max-w-[1440px] mx-auto sm:mb-16 flex lg:flex-row flex-col justify-between items-center sm:gap-20 gap-8">
                    <div data-aos="fade-down" data-aos-duration="1000" className="relative">
                        <div className="flex justify-between">
                            <div className="relative overflow-hidden w-[48.5%] h-[455px] sm:mb-20 rounded-xl">
                                <img className="block w-full h-full object-cover transition-transform duration-500 transform hover:scale-110" src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            </div>
                            <div className="relative overflow-hidden w-[48.5%] sm:h-[600px] rounded-xl">
                                <img className="block w-full h-full object-cover transition-transform duration-500 transform hover:scale-110" src="https://images.pexels.com/photos/7876708/pexels-photo-7876708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            </div>
                        </div>

                        <div className='sm:max-w-[48.5%] h-fit p-6 mt-4 sm:mt-0 bg-pmColor bg-opacity-80 rounded-xl sm:absolute sm:bottom-0'>
                            <div className='flex justify-between items-center gap-5'>
                                <h1 className='text-white flex flex-col justify-center items-center font-poppins font-semibold text-3xl'><span>10 +</span><span>Years</span></h1>
                                <p className='text-sm font-montserrat font-medium text-white'>Seasoned professionals crafting flawless events for lasting memories.</p>
                            </div>
                        </div>
                    </div>
                    <div data-aos="fade-down" data-aos-duration="1000" className="lg:max-w-[50%] lg:px-0 px-6 h-full">

                        <h3 className="text-base sm:text-2xl font-poppins font-bold inline-block  text-pmColor">ABOUT US
                        </h3>
                        <p className=" text-black dark:text-white text-opacity-70 text-sm sm:text-base font-medium font-montserrat my-7">Your dedicated partner in revolutionizing workforce management. Streamline processes, boost productivity, and drive success with our innovative solutions. </p>
                        <div className="grid grid-cols-2 my-7 gap-5">
                            <span className="flex justify-start items-center gap-2 text-opacity-50 text-sm sm:text-[16px] font-heebo font-semibold  text-black dark:text-white"><FaArrowRight className="text-pmColor text-sm sm:text-lg  " /> Empowering Workforce Solutions</span>
                            <span className="flex justify-start items-center gap-2 text-opacity-50 text-sm sm:text-[16px] font-heebo font-semibold  text-black dark:text-white"><FaArrowRight className="text-pmColor text-sm sm:text-lg  " /> Streamline HR Processes</span>
                            <span className="flex justify-start items-center gap-2 text-opacity-50 text-sm sm:text-[16px] font-heebo font-semibold  text-black dark:text-white"><FaArrowRight className="text-pmColor text-sm sm:text-lg  " /> Boost Productivity Today</span>
                            <span className="flex justify-start items-center gap-2 text-opacity-50 text-sm sm:text-[16px] font-heebo font-semibold  text-black dark:text-white"><FaArrowRight className="text-pmColor text-sm sm:text-lg  " /> Employee Management Revolution</span>
                            <span className="flex justify-start items-center gap-2 text-opacity-50 text-sm sm:text-[16px] font-heebo font-semibold  text-black dark:text-white"><FaArrowRight className="text-pmColor text-sm sm:text-lg  " /> Simplify Workforce Management</span>
                            <span className="flex justify-start items-center gap-2 text-opacity-50 text-sm sm:text-[16px] font-heebo font-semibold  text-black dark:text-white"><FaArrowRight className="text-pmColor text-sm sm:text-lg  " /> Elevate Your Team Management</span>

                        </div>
                    </div>
                </div>
            </div>
    );
};

export default AboutUs;