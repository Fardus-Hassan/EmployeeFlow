import { useContext, useEffect, useState } from "react";
import { BiSolidContact } from "react-icons/bi";
import { IoMdHome } from "react-icons/io";
import { MdOutlinePayment, MdSpaceDashboard } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { Link, NavLink, useLocation } from "react-router-dom";
import { GlobalStateContext } from "../Global/GlobalContext";
import { FaSheetPlastic } from "react-icons/fa6";
import { RiGitRepositoryPrivateLine, RiH1 } from "react-icons/ri";


const NavBar = () => {

    const { isOpen, setIsOpen, user, logout } = useContext(GlobalStateContext)
    const [path, setPath] = useState("")
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation()

    useEffect(() => {
        setPath(pathname.split('/')[1])
        console.log(path);
    }, [pathname, path])


    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);


    const commonItem = () => {
        return <>
            <NavLink to='/' className="flex items-center px-4 py-2 mb-5 text-black transition-colors duration-300 transform rounded-md dark:text-white hover:bg-secColor hover:text-white" href="#">
                <IoMdHome className="text-[22px]" />

                <span className="mx-4 font-medium">Home</span>
            </NavLink>

            <NavLink to='/contact' className="flex items-center px-4 py-2 mt-5 transition-colors duration-300 text-black hover:text-white hover:bg-secColor rounded-md dark:text-white" href="#">
                <BiSolidContact className="text-lg" />

                <span className="mx-4 font-medium">Contact</span>
            </NavLink>
        </>
    }


    return (
        <>
            {open && (
                <div
                    className="fixed w-screen h-screen inset-0 z-[500] flex items-center justify-center overflow-y-auto bg-themeColor bg-opacity-70"
                    aria-labelledby="modal-title"
                    role="dialog"
                    aria-modal="true"
                >
                    <div
                        className={`relative px-4 pt-5 pb-4 text-left transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-themeColor sm:my-8 sm:max-w-sm sm:w-full sm:p-6 ${open ? 'translate-y-0 opacity-100 sm:scale-100' : 'translate-y-4 opacity-0 sm:scale-95'
                            }`}
                    >
                        <div>
                            <div>
                                <div className="flex items-center justify-center">
                                    <RiGitRepositoryPrivateLine className="text-2xl text-pmColor" />
                                </div>

                                <div className="mt-2 text-center">
                                    <h3
                                        className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
                                        id="modal-title"
                                    >
                                        Private Route
                                    </h3>
                                    <p className="mt-2 text-sm w-[80%] mx-auto text-gray-500 dark:text-gray-400">
                                        If you want to go here ! Please login
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:flex items-center justify-center">
                            <div className="sm:flex sm:items-center ">
                                <button
                                    onClick={closeModal}
                                    className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                                >
                                    Cancel
                                </button>

                                <Link to='/dashboard/work-sheet'>
                                    <button onClick={closeModal} className="group relative inline-flex sm:w-fit w-full sm:mt-0 mt-3  text-center mx-auto h-9 items-center justify-center overflow-hidden rounded-md bg-secColor px-5 font-medium text-neutral-200">
                                        <span className="text-sm">LogIn</span>
                                        <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor"></path></svg>
                                        </div>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className={`z-50 fixed xl:translate-x-[0] ${isOpen ? "translate-x-[0]" : " translate-x-[-100%]"} duration-500 ease-out`}>


                <aside onClick={() => setIsOpen(!isOpen)} className="flex flex-col w-60 h-screen max-h-screen px-4 py-8 overflow-y-auto bg-white dark:bg-themeColor2 border-r rtl:border-r-0 rtl:border-l dark:border-white  dark:border-opacity-20">

                    <Link to='/' className='flex items-center gap-3 mb-5'>
                        <img className="w-14" src="https://i.ibb.co/KzY41M1/management-1.png" alt="" />
                        <h2 className='text-xl font-bold italic text-black dark:text-white'>EmployeeFlow</h2>
                    </Link>


                    <div className="flex flex-col justify-between flex-1 mt-10">
                        {/* All User DB */}
                        <nav className={`${path == 'dashboard' ? "hidden" : ""}`}>

                            {commonItem()}




                            {user?.email ? <NavLink to='/dashboard/work-sheet' className="flex items-center px-4 py-2 mt-5 transition-colors duration-300 text-black hover:bg-secColor hover:text-white rounded-md dark:text-white" href="#">
                                <MdSpaceDashboard className="text-lg" />

                                <span className="mx-4 font-medium">Dashboard</span>
                            </NavLink> : <button onClick={openModal} className="flex items-center px-4 py-2 mt-5 transition-colors duration-300 text-black hover:bg-secColor hover:text-white rounded-md dark:text-white w-full" href="#">
                                <MdSpaceDashboard className="text-lg" />

                                <span className="mx-4 font-medium">Dashboard</span>
                            </button>}

                        </nav>

                        {/* Employee DB */}
                        <nav className={`${path !== 'dashboard' ? "hidden" : ""}`}>
                            <NavLink to='/dashboard/work-sheet' className="flex items-center px-4 py-2 mb-5 text-black transition-colors duration-300 transform rounded-md dark:text-white hover:bg-secColor hover:text-white" href="#">
                                <FaSheetPlastic className="text-lg" />

                                <span className="mx-4 font-medium">Work Sheet</span>
                            </NavLink>

                            <NavLink to='/dashboard/payment-history' className="flex items-center px-4 py-2 mt-5 transition-colors duration-300 text-black hover:text-white hover:bg-secColor rounded-md dark:text-white" href="#">
                                <MdOutlinePayment className="text-xl" />

                                <span className="mx-4 font-medium">Payment History</span>
                            </NavLink>

                            <hr className="my-6 border-gray-200 dark:border-gray-600" />

                            {commonItem()}
                        </nav>
                        {/* HR DB */}
                        <nav>

                        </nav>
                        {/* Admin DB */}
                        <nav>

                        </nav>







                        <div className={`items-center mt-10 ${user ? "flex" : "hidden"}`}>
                            <div className="max-w-10 max-h-10 rounded-full mr-2">
                                <img className="object-cover mr-2 rounded-full h-10 w-10" title={user?.email} src={user?.photoURL} alt={user?.displayName} />
                            </div>
                            <span className="mx-2 font-medium text-black dark:text-white w-[120px]">{user?.displayName}</span>
                            <TbLogout onClick={() => logout()} className='text-xl ml-5 text-black dark:text-white cursor-pointer' title="logout" />
                        </div>

                        <Link to='/login' className={`group relative inline-flex h-12 items-center justify-center w-full rounded-lg bg-secColor py-1 pl-6 pr-14 font-medium text-neutral-50 ${user ? "hidden" : "block"}`}>
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
                </aside >
            </div >
        </>
    );
};

export default NavBar;