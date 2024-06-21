import { useContext, useEffect, useState } from "react";
import { GlobalStateContext } from "../../Global/GlobalContext";
import { TbLogout } from "react-icons/tb";
import { Link, Navigate, useLocation } from "react-router-dom";
import axios from "axios";


const FiredEmployeeModal = () => {

    const [fire, setFired]= useState(false)

    const { logout, user } = useContext(GlobalStateContext)
    const { pathname } = useLocation()


    useEffect(() => {
        const fetchData = async()=>{
            try{
                const {data} = await axios.get(`http://localhost:3000/users/${user?.email}`)
                if(data?.fired){
                    setFired(true)
                }
                
            }
            catch(error){
                console.log(error)
            }
        }
        fetchData()
    },[user?.email])

    return (
        <>
            {
                fire && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-auto">
                <div className="relative bg-white dark:bg-themeColor2 rounded-lg shadow-2xl max-w-fit w-[95%]">
                    <div className="flex items-center p-8 w-full lg:px-12">
                        <div className="w-full">
                            <div className='flex items-center justify-center gap-3 mb-5'>
                                <img className="w-14" src="https://i.ibb.co/KzY41M1/management-1.png" alt="EmployeeFlow Logo" />
                                <h2 className='text-xl font-bold italic text-black dark:text-white'>EmployeeFlow</h2>
                            </div>
                            <p className="text-gray-500 font-semibold dark:text-gray-400 text-center">
                                You have been Fired, You can no longer use this account
                            </p>
    
                            <Link to='/login'>
                                <button onClick={() => {
                                    logout()
                                    setFired(false)
                                }} className="text-pmColor text-center my-6 hover:underline mx-auto flex gap-2 items-center">Logout  <TbLogout className='text-xl cursor-pointer text-pmColor' title="logout" /></button>
                            </Link>
                        </div>
                    </div>
                </div>
                {
                    pathname !== '/' && <Navigate to="/" replace={true} />
                }

            </div> 
            }
        </>
    );
};

export default FiredEmployeeModal;