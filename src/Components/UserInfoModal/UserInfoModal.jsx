import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdManageAccounts } from 'react-icons/md';
import { IoPeople } from 'react-icons/io5';
import { FaStarOfLife } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { GlobalStateContext } from '../../Global/GlobalContext';
import WithLoading from '../smallComponents/WithLoading';
import { TbLogout } from 'react-icons/tb';
import axios from 'axios';
import toast from 'react-hot-toast';


const UserInfoModal = () => {

    const { showModal, setShowModal, logout, user } = useContext(GlobalStateContext);
    const [role, setRole] = useState('');
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
    const [error, setError] = useState('');


    const onSubmit = async (data) => {
        const email = user?.email
        const name = user?.displayName
        const imgUrl = user?.photoURL
        const { bankAccount, designation, phone, role, salary } = data;
        const userInfo = { email, name, bankAccount, designation, phone, role, salary, imgUrl, verify : false,}
        console.log(userInfo);

        const { data: info } = await axios.post('http://localhost:3000/users', userInfo);

        console.log(info);

        if (info.acknowledged) {
            reset();
            setError("");
            toast.success('successfully Registered');
            setRole(null);
            setShowModal(false);
        }


    };



    return (
        <WithLoading>
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 overflow-auto">
                    <div className="relative bg-white dark:bg-themeColor2 rounded-lg shadow-lg w-[90%] sm:max-w-3xl lg:w-3/5">
                        <div className="flex items-center p-8 w-full lg:px-12">
                            <div className="w-full">
                                <div className='flex items-center justify-start gap-3 mb-5'>
                                    <img className="w-14" src="https://i.ibb.co/KzY41M1/management-1.png" alt="EmployeeFlow Logo" />
                                    <h2 className='text-xl font-bold italic text-black dark:text-white'>EmployeeFlow</h2>
                                </div>
                                <p className="mt-4 text-gray-500 dark:text-gray-400">
                                    Create your account, manage employee details, track performance, and streamline HR processes seamlessly.
                                </p>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mt-6">
                                        <h1 className="text-gray-500 dark:text-gray-300">Select Who You Are</h1>
                                        <div className="mt-3 flex flex-nowrap items-center justify-center md:gap-5 gap-3">
                                            <label className={`flex justify-center w-full px-4 py-3 hover:text-white hover:bg-secColor duration-300 text-pmColor border ${role === "HR" ? "bg-pmColor text-white" : ""} border-pmColor rounded-lg focus:outline-none cursor-pointer`}>
                                                <input {...register("role", { required: true })}
                                                    type="radio"
                                                    name="role"
                                                    className="hidden"
                                                    value="HR"
                                                    checked={role === "HR"}
                                                    onChange={() => {
                                                        setRole('HR');
                                                        setValue('role', 'HR');
                                                    }}
                                                />
                                                <MdManageAccounts className="text-2xl" />
                                                <span className="mx-2 mt-[2px] font-poppins">
                                                    HR
                                                </span>
                                            </label>
                                            <label className={`flex justify-center w-full px-4 py-3 hover:text-white hover:bg-secColor duration-300 text-pmColor border ${role === "Employee" ? "bg-pmColor text-white" : ""} border-pmColor rounded-lg focus:outline-none cursor-pointer`}>
                                                <input {...register("role", { required: true })}
                                                    type="radio"
                                                    name="role"
                                                    className="hidden"
                                                    value="Employee"
                                                    checked={role === "Employee"}
                                                    onChange={() => {
                                                        setRole('Employee');
                                                        setValue('role', 'Employee');
                                                    }}
                                                />
                                                <IoPeople className="text-2xl" />
                                                <span className="mx-2 mt-[2px] font-poppins">
                                                    Employee
                                                </span>
                                            </label>
                                        </div>
                                        {errors.role && <span className="text-xs text-red-500">Select Who You Are</span>}
                                    </div>
                                    <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                                        <div>
                                            <label className="mb-2 text-sm text-gray-600 dark:text-gray-200 flex items-center gap-2">Phone number <FaStarOfLife className="text-[10px] text-pmColor" /></label>
                                            <input {...register("phone", { required: true })}
                                                type="number" placeholder="XXX-XX-XXXX-XXX" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-themeColor dark:text-gray-300 dark:border-gray-700 focus:border-pmColor focus:outline-none" />
                                            {errors.phone && <span className="text-xs text-red-500">This Name field is required</span>}
                                        </div>
                                        <div>
                                            <label className="mb-2 text-sm text-gray-600 dark:text-gray-200 flex items-center gap-2">Bank Account No<FaStarOfLife className="text-[10px] text-pmColor" /></label>
                                            <input {...register("bankAccount", { required: true })}
                                                type="text" placeholder="Your Bank Account No" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-themeColor dark:text-gray-300 dark:border-gray-700 focus:border-pmColor focus:outline-none" />
                                            {errors.bankAccount && <span className="text-xs text-red-500">This Name field is required</span>}
                                        </div>
                                        <div>
                                            <label className="mb-2 text-sm text-gray-600 dark:text-gray-200 flex items-center gap-2">Designation <FaStarOfLife className="text-[10px] text-pmColor" /></label>
                                            <input {...register("designation", { required: true })}
                                                type="text" placeholder="Your Designation" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-themeColor dark:text-gray-300 dark:border-gray-700 focus:border-pmColor focus:outline-none" />
                                            {errors.designation && <span className="text-xs text-red-500">This Name field is required</span>}
                                        </div>
                                        <div>
                                            <label className="mb-2 text-sm text-gray-600 dark:text-gray-200 flex items-center gap-2">Salary <FaStarOfLife className="text-[10px] text-pmColor" /></label>
                                            <input {...register("salary", { required: true })}
                                                type="number" placeholder="Your Salary" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-themeColor dark:text-gray-300 dark:border-gray-700 focus:border-pmColor focus:outline-none" />
                                            {errors.salary && <span className="text-xs text-red-500">This Name field is required</span>}
                                        </div>

                                    </div>
                                    <div className="sm:mt-7 mt-4 rounded-lg relative">
                                        <span className="text-xs text-red-500 absolute z-10 top-[-22px] left-0">{error}</span>
                                        <button className={`group relative inline-flex h-12 items-center justify-center w-full rounded-lg bg-secColor py-1 pl-6 pr-14 font-medium text-neutral-50`}>
                                            <span className="z-10 ml-7">Register</span>
                                            <div className="absolute right-1 inline-flex h-10 w-10 items-center justify-end rounded-lg bg-pmColor transition-[width] group-hover:w-[calc(100%-8px)]">
                                                <div className="mr-2.5 flex items-center justify-center">
                                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-50">
                                                        <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor">
                                                        </path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                </form>
                                <button onClick={() => {
                                    logout()
                                    setShowModal(false)
                                }} className="text-pmColor text-sm text-center my-6 hover:underline mx-auto flex gap-2 items-center">Logout  <TbLogout className='text-xl cursor-pointer text-pmColor' title="logout" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </WithLoading>
    );
};

export default UserInfoModal;