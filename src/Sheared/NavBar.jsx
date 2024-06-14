import { useContext, useEffect, useState } from "react";
import { BiSolidContact } from "react-icons/bi";
import { IoMdHome } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { Link, NavLink } from "react-router-dom";
import { GlobalStateContext } from "../Global/GlobalContext";


const NavBar = () => {

    const { isOpen, setIsOpen, user, logout, userRole, setUserRole } = useContext(GlobalStateContext)


    return (
        <div className={`z-50 fixed xl:translate-x-[0] ${isOpen ? "translate-x-[0]" : " translate-x-[-100%]"} duration-500 ease-out`}>

            <aside onClick={()=>setIsOpen(!isOpen)} className="flex flex-col w-60 h-screen max-h-screen px-4 py-8 overflow-y-auto bg-white dark:bg-themeColor2 border-r rtl:border-r-0 rtl:border-l dark:border-white  dark:border-opacity-20">

                <Link to='/' className='flex items-center gap-3 mb-5'>
                    <img className="w-14" src="https://i.ibb.co/KzY41M1/management-1.png" alt="" />
                    <h2 className='text-xl font-bold italic text-black dark:text-white'>EmployeeFlow</h2>
                </Link>


                <div className="flex flex-col justify-between flex-1 mt-10">
                    <nav>
                        <NavLink to='/' className="flex items-center px-4 py-2 mb-5 text-black transition-colors duration-300 transform rounded-md dark:text-white hover:bg-secColor hover:text-white" href="#">
                            <IoMdHome className="text-[22px]" />

                            <span className="mx-4 font-medium">Home</span>
                        </NavLink>

                        <NavLink to='/contact' className="flex items-center px-4 py-2 mt-5 transition-colors duration-300 text-black hover:text-white hover:bg-secColor rounded-md dark:text-white" href="#">
                            <BiSolidContact className="text-lg" />

                            <span className="mx-4 font-medium">Contact</span>
                        </NavLink>
                        <NavLink to='/dashboard' className="flex items-center px-4 py-2 mt-5 transition-colors duration-300 text-black hover:bg-secColor hover:text-white rounded-md dark:text-white" href="#">
                            <MdSpaceDashboard className="text-lg" />

                            <span className="mx-4 font-medium">Dashboard</span>
                        </NavLink>

                        {/* 
                        <hr className="my-6 border-gray-200 dark:border-gray-600" />

                        <a className="flex items-center px-4 py-2 mt-5 text-black transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-200" href="#">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            <span className="mx-4 font-medium">Tickets</span>
                        </a>

                        <a className="flex items-center px-4 py-2 mt-5 text-black transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-200" href="#">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99037 8.74926 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75219 5.38285C8.74926 5.99037 10.0492 5.45193 10.3246 4.31731Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            <span className="mx-4 font-medium">Settings</span>
                        </a> */}
                    </nav>

                    <div className={`items-center mt-10 ${user ? "flex":"hidden"}`}>
                        <div className="max-w-10 max-h-10 rounded-full mr-2">
                        <img className="object-cover mr-2 rounded-full h-10 w-10" title={user?.email} src={user?.photoURL} alt={user?.displayName} />
                        </div>
                        <span className="mx-2 font-medium text-black dark:text-white w-[120px]">{user?.displayName}</span>
                        <TbLogout onClick={()=>logout()} className='text-xl ml-5 text-black dark:text-white cursor-pointer' title="logout" />
                    </div>

                    <Link to='/login' className={`group relative inline-flex h-12 items-center justify-center w-full rounded-lg bg-secColor py-1 pl-6 pr-14 font-medium text-neutral-50 ${user ? "hidden":"block"}`}>
                        <span className="z-10 ml-7">Log In</span>
                        <div className="absolute right-1 inline-flex h-10 w-10 items-center justify-end rounded-lg bg-pmColor transition-[width] group-hover:w-[calc(100%-8px)]"><div className="mr-2.5 flex items-center justify-center">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-50">
                                <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor">
                                </path>
                            </svg>
                        </div>
                        </div>
                    </Link>
                </div>
            </aside>
        </div>
    );
};

export default NavBar;