import { useEffect, useState } from "react";
import { BiSolidContact } from "react-icons/bi";
import { IoMdHome } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import { Link, NavLink } from "react-router-dom";


const NavBar = () => {

        
    // console.log(icon);
    const [isDark, setIsDark] = useState(() => {
        // Retrieve theme preference from local storage or default to false (light theme)
        const savedTheme = localStorage.getItem("theme");
        return savedTheme ? JSON.parse(savedTheme) : false;
    });


    useEffect(() => {
        // Save theme preference to local storage whenever it changes
        localStorage.setItem("theme", JSON.stringify(isDark));

        // Update HTML class based on the theme
        const html = document.querySelector("html");
        if (isDark) {
            html.classList.add("dark");
            html.classList.remove("light");
        } else {
            html.classList.add("light");
            html.classList.remove("dark");
        }

    }, [isDark]);

    const toggle = () => {
        setIsDark(!isDark);
    };


    return (
        <div>
            <aside className="flex flex-col w-60 h-screen max-h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l">
                <Link to='/' className='flex items-center gap-3 mb-5'>
                    <img className="w-14" src="https://i.ibb.co/KzY41M1/management-1.png" alt="" />
                    <h2 className='text-xl font-bold italic'>EmployeeFlow</h2>
                </Link>

                <div className="flex flex-col justify-between flex-1 mt-6">
                    <nav>
                        <NavLink to='/' className="flex items-center px-4 py-2 mb-5 text-black transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-200" href="#">
                            <IoMdHome className="text-[22px]" />

                            <span className="mx-4 font-medium">Home</span>
                        </NavLink>

                        <NavLink to='/contact' className="flex items-center px-4 py-2 mt-5 text-black hover:bg-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-200" href="#">
                            <BiSolidContact className="text-lg"/>

                            <span className="mx-4 font-medium">Contact</span>
                        </NavLink>
                        <NavLink to='/dashboard' className="flex items-center px-4 py-2 mt-5 text-black hover:bg-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-200" href="#">
                            <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            <span className="mx-4 font-medium">Dashboard</span>
                        </NavLink>


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
                        </a>
                    </nav>

                    <div className="flex items-center px-4 -mx-2 sm:mb-0 mb-10 hidden">
                        <img className="object-cover mx-2 rounded-full h-9 w-9" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="avatar" />
                        <span className="mx-2 font-medium text-black">John Doe</span>
                        <TbLogout className='text-xl ml-5' />
                    </div>

                    <Link to='/login' className="group sm:mb-0 mb-10 relative inline-flex h-12 items-center justify-center w-full rounded-lg bg-secColor py-1 pl-6 pr-14 font-medium text-neutral-50">
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