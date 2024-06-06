import { FaStarOfLife } from "react-icons/fa6";
import { IoPeople } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { Link } from "react-router-dom";


const Register = () => {
    return (
        // <section className="bg-white dark:bg-themeColor">
        //     <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        //         <form className="w-full max-w-md">
        //             <div className='flex items-center justify-center gap-3 mb-5'>
        //                 <img className="w-14" src="https://i.ibb.co/KzY41M1/management-1.png" alt="" />
        //                 <h2 className='text-xl font-bold italic text-black dark:text-white'>EmployeeFlow</h2>
        //             </div>
        //             <div className="flex items-center justify-between mt-4">
        //                 <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

        //                 <div className="text-xs text-center text-gray-500 uppercase dark:text-gray-400">Register Here</div>

        //                 <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
        //             </div>
        //             <div className="relative flex items-center mt-8">
        //                 <span className="absolute">
        //                     <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        //                         <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        //                     </svg>
        //                 </span>

        //                 <input type="text" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-themeColor2 dark:text-gray-300 dark:border-gray-600 focus:border-pmColor focus:outline-none" placeholder="Your Name" />
        //             </div>

        //             <label htmlFor="dropzone-file" className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border rounded-lg cursor-pointer dark:border-gray-600 dark:bg-themeColor2 ">
        //                 <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        //                     <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        //                 </svg>

        //                 <h2 className="mx-3 text-gray-400">Profile Photo</h2>

        //                 <input id="dropzone-file" type="file" className="hidden" />
        //             </label>

        //             <div className="relative flex items-center mt-6">
        //                 <span className="absolute">
        //                     <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        //                         <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        //                     </svg>
        //                 </span>

        //                 <input type="email" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-themeColor2  dark:text-gray-300 dark:border-gray-600 focus:border-pmColor focus:outline-none" placeholder="Email address" />
        //             </div>

        //             <div className="relative flex items-center mt-4">
        //                 <span className="absolute">
        //                     <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        //                         <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        //                     </svg>
        //                 </span>

        //                 <input type="password" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-themeColor2  dark:text-gray-300 dark:border-gray-600 focus:border-pmColor focus:outline-none" placeholder="Password" />
        //             </div>

        //             <div className="relative flex items-center mt-4">
        //                 <span className="absolute">
        //                     <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        //                         <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        //                     </svg>
        //                 </span>

        //                 <input type="password" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-themeColor2 dark:text-gray-300 dark:border-gray-600 focus:border-pmColor focus:outline-none" placeholder="Confirm Password" />
        //             </div>

        //             <div className="mt-6">
        //             <div className="mt-6 rounded-lg">
        //                 <button className="group relative inline-flex h-12 items-center justify-center w-full rounded-lg bg-secColor py-1 pl-6 pr-14 font-medium text-neutral-50">
        //                     <span className="z-10 ml-7">Register</span>
        //                     <div className="absolute right-1 inline-flex h-10 w-10 items-center justify-end rounded-lg bg-pmColor transition-[width] group-hover:w-[calc(100%-8px)]"><div className="mr-2.5 flex items-center justify-center">
        //                         <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-50">
        //                             <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor">
        //                             </path>
        //                         </svg>
        //                     </div>
        //                     </div>
        //                 </button>
        //             </div>

        //                 <div className="mt-6 text-center ">
        //                     <Link to="/login" className="text-sm text-pmColor hover:underline">
        //                         Already have an account?
        //                     </Link>
        //                 </div>
        //             </div>
        //         </form>
        //     </div>
        // </section>
        <section className="bg-white dark:bg-themeColor lg:my-0 my-10">
            <div className="flex justify-center min-h-screen">
                <div className="hidden bg-cover lg:block lg:w-2/5" style={{ backgroundImage: `url("https://images.pexels.com/photos/4057059/pexels-photo-4057059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")` }}>
                </div>

                <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
                    <div className="w-full">
                        <div className='flex items-center justify-start gap-3 mb-5'>
                            <img className="w-14" src="https://i.ibb.co/KzY41M1/management-1.png" alt="" />
                            <h2 className='text-xl font-bold italic text-black dark:text-white'>EmployeeFlow</h2>
                        </div>

                        <p className="mt-4 text-gray-500 dark:text-gray-400">
                        Create your account, manage employee details, track performance, and streamline HR processes seamlessly.
                        </p>

                        <div className="mt-6">
                            <h1 className="text-gray-500 dark:text-gray-300">Selected Who you are</h1>

                            <div className="mt-3 flex flex-nowrap items-center justify-center md:gap-5 gap-3">
                                <button className="flex justify-center w-full px-4 py-3 hover:text-white hover:bg-pmColor duration-300 text-pmColor border border-pmColor rounded-lg focus:outline-none">
                                <MdManageAccounts className="text-2xl"/>

                                    <span className="mx-2 mt-[2px] font-poppins">
                                        HR
                                    </span>
                                </button>

                                <button className="flex justify-center w-full px-4 py-3 hover:text-white hover:bg-pmColor duration-300 text-pmColor border border-pmColor rounded-lg focus:outline-none">
                                <IoPeople className="text-2xl"/>

                                    <span className="mx-2 mt-[2px] font-poppins">
                                        Employee
                                    </span>
                                </button>
                            </div>
                        </div>

                        <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                            <div>
                                <label className="mb-2 text-sm text-gray-600 dark:text-gray-200 flex items-center gap-2">Your Name <FaStarOfLife className="text-[10px] text-pmColor"/></label>
                                <input type="text" placeholder="John" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-themeColor dark:text-gray-300 dark:border-gray-700 focus:border-pmColor focus:outline-none" />
                            </div>

                            <label htmlFor="dropzone-file" className="flex relative items-center px-3 py-3 w-full mx-auto mt-6 text-center bg-white border rounded-lg cursor-pointer dark:border-gray-600 dark:bg-themeColor">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg> */}
                                <p className="text-gray-600 dark:text-gray-200 text-sm absolute top-[-30px] left-0 flex items-center gap-2">Your Photo <FaStarOfLife className="text-[10px] text-pmColor"/></p>

                                <h2 className="mx-2 dark:text-gray-600 text-gray-400">Upload Photo</h2>

                                <input id="dropzone-file" type="file" className="hidden" />
                            </label>

                            <div>
                            <label className="mb-2 text-sm text-gray-600 dark:text-gray-200 flex items-center gap-2">Phone number <FaStarOfLife className="text-[10px] text-pmColor"/></label>
                                <input type="text" placeholder="XXX-XX-XXXX-XXX" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-themeColor dark:text-gray-300 dark:border-gray-700 focus:border-pmColor focus:outline-none" />
                            </div>

                            <div>
                            <label className="mb-2 text-sm text-gray-600 dark:text-gray-200 flex items-center gap-2">Email address <FaStarOfLife className="text-[10px] text-pmColor"/></label>
                                <input type="email" placeholder="example@gmail.com" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-themeColor dark:text-gray-300 dark:border-gray-700 focus:border-pmColor focus:outline-none" />
                            </div>

                            <div>
                            <label className="mb-2 text-sm text-gray-600 dark:text-gray-200 flex items-center gap-2">Bank Account No<FaStarOfLife className="text-[10px] text-pmColor"/></label>
                                <input type="password" placeholder="Your Bank Account No" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-themeColor dark:text-gray-300 dark:border-gray-700 focus:border-pmColor focus:outline-none" />
                            </div>

                            <div>
                            <label className="mb-2 text-sm text-gray-600 dark:text-gray-200 flex items-center gap-2">Designation <FaStarOfLife className="text-[10px] text-pmColor"/></label>
                                <input type="password" placeholder="Your Designation" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-themeColor dark:text-gray-300 dark:border-gray-700 focus:border-pmColor focus:outline-none" />
                            </div>
                            <div>
                            <label className="mb-2 text-sm text-gray-600 dark:text-gray-200 flex items-center gap-2">Salary <FaStarOfLife className="text-[10px] text-pmColor"/></label>
                                <input type="password" placeholder="Your Salary" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-themeColor dark:text-gray-300 dark:border-gray-700 focus:border-pmColor focus:outline-none" />
                            </div>
                            <div>
                            <label className="mb-2 text-sm text-gray-600 dark:text-gray-200 flex items-center gap-2">Password <FaStarOfLife className="text-[10px] text-pmColor"/></label>
                                <input type="password" placeholder="Enter your password" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-themeColor dark:text-gray-300 dark:border-gray-700 focus:border-pmColor focus:outline-none" />
                            </div>
                            <div>
                            <label className="mb-2 text-sm text-gray-600 dark:text-gray-200 flex items-center gap-2">Confirm password <FaStarOfLife className="text-[10px] text-pmColor"/></label>
                                <input type="password" placeholder="Enter your password" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-themeColor dark:text-gray-300 dark:border-gray-700 focus:border-pmColor focus:outline-none" />
                            </div>

                            <div className="mt-6 rounded-lg">
                                <button className="group relative inline-flex h-12 items-center justify-center w-full rounded-lg bg-secColor py-1 pl-6 pr-14 font-medium text-neutral-50">
                                    <span className="z-10 ml-7">Register</span>
                                    <div className="absolute right-1 inline-flex h-10 w-10 items-center justify-end rounded-lg bg-pmColor transition-[width] group-hover:w-[calc(100%-8px)]"><div className="mr-2.5 flex items-center justify-center">
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-50">
                                            <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor">
                                            </path>
                                        </svg>
                                    </div>
                                    </div>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;