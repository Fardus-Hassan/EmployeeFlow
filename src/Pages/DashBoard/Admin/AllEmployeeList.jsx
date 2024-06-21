import axios from "axios";
import { useState } from "react";
import Spinner from "../../../Components/smallComponents/Spinner";
import { FaPen, FaTh } from "react-icons/fa";
import { TbCoinTakaFilled } from "react-icons/tb";
import toast from "react-hot-toast";
import { FaUserTie } from "react-icons/fa";
import { PiExclamationMarkBold } from "react-icons/pi";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllEmployeeList = () => {
    const AxiosSecure = useAxiosSecure();
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [currentEntry, setCurrentEntry] = useState(null);
    const [salaryModal, SetSalaryModal] = useState(false);
    const [fired, setFired] = useState(false);
    const [makeHR, setMakeHR] = useState(false);
    const [viewMode, setViewMode] = useState("table"); // State for toggling view mode (table or grid)

    const openDetailsModal = (entry) => {
        setCurrentEntry(entry);
        setDetailsOpen(true);
    };

    const updateSalary = (entry) => {
        SetSalaryModal(true);
        setCurrentEntry(entry);
    };

    const closeDetailsModal = () => setDetailsOpen(false);

    const { data = [], isLoading, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const { data } = await AxiosSecure.get(`/users`);
            return data;
        },
    });

    const employee = data.filter((item) => item.role !== "Admin");

    const entries = employee.filter((item) => item.verify == true);

    const handleSalary = async (e) => {
        e.preventDefault();
        const presentSalary = currentEntry.salary;
        const newSalary = e.target.salary.value;
        const employeeEmail = currentEntry.email;

        if (parseInt(presentSalary) === parseInt(newSalary)) {
            return toast.error("Salary is not updated");
        } else if (parseInt(presentSalary) > parseInt(newSalary)) {
            return toast.error("You cannot reduce salary");
        } else {
            try {
                const response = await AxiosSecure.patch(`/users/updateSalary/${employeeEmail}`, {
                    salary: newSalary,
                });
                if (response.data.acknowledged) {
                    toast.success("Salary updated successfully");
                    SetSalaryModal(false);
                    refetch();
                }
            } catch (error) {
                console.error(error);
                toast.error("Error updating salary");
            }
        }
    };

    const handleFired = async (fired) => {
        const email = currentEntry.email;

        try {
            const response = await AxiosSecure.patch(`/users/fired/${email}`, { fired: fired });
            if (response.data.acknowledged) {
                toast.success("Employee fired successfully");
                setFired(false);
                refetch();
            }
        } catch (error) {
            console.error(error);
            toast.error("Error firing employee");
        }
    };

    const handleMakeHR = async () => {
        const email = currentEntry.email;

        try {
            const response = await AxiosSecure.patch(`/users/makeHR/${email}`, { role: "HR" });
            if (response.data.acknowledged) {
                toast.success("Made HR successfully");
                setMakeHR(false);
                refetch();
            }
        } catch (error) {
            console.error(error);
            toast.error("Error making HR");
        }
    };

    const toggleViewMode = () => {
        setViewMode((prevMode) => (prevMode === "table" ? "grid" : "table"));
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <div className="w-[95%] mx-auto sm:pb-24 pb-10 pt-10">
                <div className="sm:pb-12 pb-8">
                    <p className="text-xl text-pmColor font-montserrat font-bold text-center">Employee List</p>
                    <h1 className="mt-2 text-2xl font-semibold text-black font-poppins text-center capitalize lg:text-4xl dark:text-white">
                        All Employee Info
                    </h1>
                </div>
                <div className="flex justify-end mb-4 mr-6">
                    <button
                        onClick={toggleViewMode}
                        className="bg-pmColor hover:bg-opacity-80 text-white font-semibold px-4 py-2 rounded-md flex items-center"
                    >
                        {viewMode === "table" ? (
                            <>
                                <FaTh className="mr-2" /> Grid View
                            </>
                        ) : (
                            <>
                                <FaPen className="mr-2" /> Table View
                            </>
                        )}
                    </button>
                </div>
                {viewMode === "table" ? (
                    <div className="w-full overflow-x-auto rounded-lg border border-pmColor">
                        <table className="min-w-full">
                            <thead className="bg-secColor">
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th scope="col" className="px-6 text-center text-sm py-3 font-medium text-white uppercase text-nowrap tracking-wider">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 text-center text-sm py-3 font-medium text-white uppercase text-nowrap tracking-wider">
                                        Designation
                                    </th>
                                    <th scope="col" className="px-6 text-center text-sm py-3 font-medium text-white uppercase text-nowrap tracking-wider">
                                        Salary
                                    </th>
                                    <th scope="col" className="px-6 text-center text-sm py-3 font-medium text-white uppercase text-nowrap tracking-wider">
                                        Make HR
                                    </th>
                                    <th scope="col" className="px-6 text-center text-sm py-3 font-medium text-white uppercase text-nowrap tracking-wider">
                                        Fired
                                    </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-themeColor">
                                {entries.map((entry, index) => (
                                    <tr
                                        key={entry._id}
                                        className={index % 2 === 0 ? "bg-gray-100 dark:bg-themeColor" : "bg-white dark:bg-themeColor2"}
                                    >
                                        <td className="text-black dark:text-white px-6 py-4">{index + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">
                                            <div onClick={() => openDetailsModal(entry)} className="w-10 h-10 rounded-full cursor-pointer">
                                                <img className="h-10 w-10 rounded-full object-cover" src={entry?.imgUrl} alt="" />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">{entry.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">{entry.designation}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">{entry.salary} taka <FaPen onClick={() => updateSalary(entry)} className={`inline text-pmColor cursor-pointer mb-1 ml-1 ${entry?.fired ? "hidden" : ""}`} /></td>
                                        <td className="px-6 py-4 whitespace-nowrap mx-auto text-black text-sm dark:text-white font-semibold text-center">
                                            <button disabled={entry?.fired} className={`${entry.role === "Employee" ? "p-2 bg-pmColor rounded-full cursor-default" : "cursor-default"} ${entry?.fired ? "cursor-not-allowed" : ""}`}>
                                                {entry.role === "Employee" ? (
                                                    <FaUserTie onClick={() => { setMakeHR(true); setCurrentEntry(entry); }} className={`text-white text-xl ${entry?.fired ? "cursor-not-allowed" : "cursor-pointer"}`} />
                                                ) : (
                                                    <FaUserTie className="dark:text-white text-black text-xl cursor-default" />
                                                )}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">
                                            {!entry?.fired ? (
                                                <button onClick={() => { setFired(true); setCurrentEntry(entry); }} className={`rounded-xl bg-secColor text-white px-3 py-1 font-poppins font-bold`}>
                                                    Fired
                                                </button>
                                            ) : (
                                                <span className="text-red-500">Fired</span>
                                            )}
                                        </td>
                                        <td className="text-black dark:text-white px-6 py-4">{index + 1}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {entries.map((entry, index) => (
                            <div
                                key={entry._id}
                                className="bg-white dark:bg-themeColor2 rounded-lg shadow-md overflow-hidden"
                            >
                                <div className="relative">
                                    <img className="h-56 w-full object-cover" src={entry?.imgUrl} alt="Employee" />
                                    <div className="absolute top-2 right-2">
                                        <button onClick={() => openDetailsModal(entry)} className="bg-pmColor text-white rounded-full p-3">
                                            <FaPen className="text-lg" />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-xl text-black dark:text-white font-semibold mb-2">{entry.name}</h3>
                                    <p className="text-sm text-black dark:text-white mb-2">{entry.designation}</p>
                                    <p className="text-sm text-black dark:text-white">Salary: {entry.salary} taka</p>
                                    <div className="flex justify-end mt-4">
                                        <button
                                            disabled={entry?.fired}
                                            className={` ${entry.fired ? "cursor-not-allowed" : "cursor-pointer"} mr-2  ${entry.role === "Employee"
                                                ? "bg-pmColor text-white rounded-full p-3 cursor-pointer"
                                                : "bg-gray-300 text-gray-500 rounded-full p-3 cursor-default"
                                                }`}
                                            onClick={() => {
                                                if (entry.role === "Employee") {
                                                    setMakeHR(true);
                                                    setCurrentEntry(entry);
                                                }
                                            }}
                                        >
                                            <FaUserTie className="text-xl" />
                                        </button>
                                        <button disabled={entry?.fired}
                                            onClick={() => {
                                                setFired(true);
                                                setCurrentEntry(entry);
                                            }}
                                            className={`mr-2 rounded-full px-3 p-2 ${entry?.fired ? "bg-red-500 text-white cursor-not-allowed" : "bg-secColor text-white"
                                                }`}
                                        >
                                            {entry?.fired ? "Fired" : "Fire"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* Modals */}
            {detailsOpen && (
                <div className="fixed w-screen h-screen inset-0 z-[500] flex items-center justify-center overflow-y-auto bg-secColor bg-opacity-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className={`relative px-4 pt-5 pb-4 w-[95%] text-left transition-all h-fit transform bg-white rounded-lg shadow-xl dark:bg-themeColor sm:my-8 max-w-lg sm:w-full sm:p-6`}>
                        <div className='max-w-full'>
                            <div className="mt-2 text-center">
                                <div className='w-full h-[300px] rounded-xl mx-auto mb-4'>
                                    <img className='h-[300px] w-full rounded-xl object-cover' src={currentEntry?.imgUrl} alt="" />
                                </div>
                                <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
                                    {currentEntry.name}
                                </h3>
                                <div className="text-sm my-8 text-wrap text-center sm:text-left text-gray-500 dark:text-gray-400 gap-8 sm:flex justify-center">
                                    <div className='space-y-3'>
                                        {/* <div><strong>Name:</strong> {currentEntry.name}</div> */}
                                        <div><strong>Email:</strong> {currentEntry.email}</div>
                                        <div><strong>Phone:</strong> {currentEntry.phone}</div>
                                        <div><strong>Bank Account:</strong> {currentEntry.bankAccount}</div>
                                    </div>
                                    <div className='space-y-3 sm:mt-0 mt-3'>
                                        <div><strong>Designation:</strong> {currentEntry.designation}</div>
                                        <div><strong>Salary:</strong> {currentEntry.salary}</div>
                                        <div><strong>Role:</strong> {currentEntry.role}</div>
                                    </div>
                                </div>
                                <div className='text-gray-500 dark:text-gray-400 text-sm text-wrap mx-auto'><strong>Verified:</strong> {currentEntry.verify ? "Yes" : "No"}</div>
                            </div>
                        </div>
                        <div className="mt-5 sm:flex items-center justify-center">
                            <button onClick={closeDetailsModal} className="w-full px-4 py-2 mt-2 text-sm block font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {salaryModal && (
                <div className="fixed w-screen h-screen inset-0 z-[500] flex items-center justify-center overflow-y-auto bg-secColor bg-opacity-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <form onSubmit={handleSalary} className={`relative px-4 pt-5 pb-4 text-left transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-themeColor sm:my-8 max-w-sm sm:w-full w-[95%] sm:p-6`}>
                        <div>
                            <div>
                                <div className="flex items-center justify-center">
                                    <TbCoinTakaFilled className='text-5xl bg-pmColor rounded-full text-white' />
                                </div>
                                <div className="mt-2 text-center">
                                    <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
                                        Salary Increase
                                    </h3>
                                    <p className="mt-2 text-wrap text-sm w-[80%] mx-auto text-gray-500 dark:text-gray-400">
                                        Once the salary is increased, it cannot be reduced later
                                    </p>
                                    <div className='py-3 pt-6 gap-5'>
                                        <div className='w-20 h-20 rounded-full mx-auto mb-4'>
                                            <img className='h-20 w-20 rounded-full object-cover' src={currentEntry?.imgUrl} alt="" />
                                        </div>
                                        <div className='text-center space-y-2 text-black dark:text-white text-sm font-montserrat'>
                                            <h2>{currentEntry.name}</h2>
                                            <h2>{currentEntry.email}</h2>
                                            <h2>{currentEntry.designation}</h2>
                                        </div>
                                        <div>
                                            <input name="salary" type="number" defaultValue={currentEntry.salary} className="rounded-lg mt-3 outline-none py-1 px-2 text-center bg-secColor bg-opacity-20 text-black dark:text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:flex items-center justify-center">
                            <div className="sm:flex sm:items-center w-full">
                                <button onClick={() => SetSalaryModal(false)} className="w-full block px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                                    Cancel
                                </button>
                                <button className="group relative inline-flex w-full sm:mt-0 mt-3 text-center mx-auto h-9 items-center justify-center overflow-hidden rounded-md bg-secColor px-5 font-medium text-white">
                                    <span className="text-sm">Increase</span>
                                    <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http:www.w3.org/2000/svg" className="h-5 w-5">
                                            <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor"></path>
                                        </svg>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
            {fired && (
                <div className="fixed w-screen h-screen inset-0 z-[500] flex items-center justify-center overflow-y-auto bg-secColor bg-opacity-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className={`relative px-4 pt-5 pb-4 text-left transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-themeColor sm:my-8 max-w-sm sm:w-full w-[95%] sm:p-6`}>
                        <div>
                            <div>
                                <div className="flex items-center justify-center">
                                    <PiExclamationMarkBold className='text-5xl bg-pmColor rounded-full text-white' />
                                </div>
                                <div className="mt-2 text-center">
                                    <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
                                        Warning
                                    </h3>
                                    <p className="mt-2 text-wrap text-sm w-[80%] mx-auto text-gray-500 dark:text-gray-400">
                                        Once you have <strong>fired</strong> someone, <strong>they will no longer be able to use their account on this website,</strong> so please check carefully before fired.
                                    </p>
                                    <div className='py-3 pt-6 gap-5'>
                                        <div className='w-20 h-20 rounded-full mx-auto mb-4'>
                                            <img className='h-20 w-20 rounded-full object-cover' src={currentEntry?.imgUrl} alt="" />
                                        </div>
                                        <div className='text-center space-y-2 text-black dark:text-white text-sm font-montserrat'>
                                            <h2>{currentEntry.name}</h2>
                                            <h2>{currentEntry.email}</h2>
                                            <h2>{currentEntry.designation}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:flex items-center justify-center">
                            <div className="sm:flex sm:items-center w-full">
                                <button onClick={() => setFired(false)} className="w-full block px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                                    Cancel
                                </button>
                                <button onClick={() => handleFired(true)} className="group relative inline-flex w-full sm:mt-0 mt-3 text-center mx-auto h-9 items-center justify-center overflow-hidden rounded-md bg-secColor px-5 font-medium text-white">
                                    <span className="text-sm">Fired</span>
                                    <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http:www.w3.org/2000/svg" className="h-5 w-5">
                                            <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor"></path>
                                        </svg>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {makeHR && (
                <div className="fixed w-screen h-screen inset-0 z-[500] flex items-center justify-center overflow-y-auto bg-secColor bg-opacity-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className={`relative px-4 pt-5 pb-4 text-left transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-themeColor sm:my-8 max-w-sm sm:w-full w-[95%] sm:p-6`}>
                        <div>
                            <div>
                                <div className="flex items-center justify-center">
                                    <FaUserTie className='text-5xl bg-pmColor rounded-full p-1.5 text-white' />
                                </div>
                                <div className="mt-2 text-center">
                                    <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
                                        Make HR
                                    </h3>
                                    <p className="mt-2 text-wrap text-sm w-[80%] mx-auto text-gray-500 dark:text-gray-400">
                                        Once you make HR, you can't make him an employee later
                                    </p>
                                    <div className='py-3 pt-6 gap-5'>
                                        <div className='w-20 h-20 rounded-full mx-auto mb-4'>
                                            <img className='h-20 w-20 rounded-full object-cover' src={currentEntry?.imgUrl} alt="" />
                                        </div>
                                        <div className='text-center space-y-2 text-black dark:text-white text-sm font-montserrat'>
                                            <h2>{currentEntry.name}</h2>
                                            <h2>{currentEntry.email}</h2>
                                            <h2>{currentEntry.designation}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:flex items-center justify-center">
                            <div className="sm:flex sm:items-center w-full">
                                <button onClick={() => setMakeHR(false)} className="w-full block px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                                    Cancel
                                </button>
                                <button onClick={handleMakeHR} className="group relative inline-flex w-full sm:mt-0 mt-3 text-center mx-auto h-9 items-center justify-center overflow-hidden rounded-md bg-secColor px-5 font-medium text-white">
                                    <span className="text-sm">Make HR</span>
                                    <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http:www.w3.org/2000/svg" className="h-5 w-5">
                                            <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor"></path>
                                        </svg>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AllEmployeeList;





// import axios from "axios";
// import { useState } from "react";
// import Spinner from "../../../Components/smallComponents/Spinner";
// import { FaPen } from "react-icons/fa6";
// import { TbCoinTakaFilled } from "react-icons/tb";
// import toast from "react-hot-toast";
// import { FaUserTie } from "react-icons/fa";
// import { PiExclamationMarkBold } from "react-icons/pi";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const AllEmployeeList = () => {
//     const AxiosSecure = useAxiosSecure()
//     const [detailsOpen, setDetailsOpen] = useState(false);
//     const [currentEntry, setCurrentEntry] = useState(null);
//     const [salaryModal, SetSalaryModal] = useState(false);
//     const [fired, setFired] = useState(false)
//     const [makeHR, setMakeHR] = useState(false)


//     const openDetailsModal = (entry) => {
//         setCurrentEntry(entry);
//         setDetailsOpen(true);
//     };

//     const updateSalary = (entry) => {
//         SetSalaryModal(true)
//         setCurrentEntry(entry)
//     }
//     const closeDetailsModal = () => setDetailsOpen(false);


//     const { data =[], isLoading, refetch } = useQuery({
//         queryKey: ['users'],
//         queryFn: async () => {

//             const { data } = await AxiosSecure.get(`/users`);
//             return data;
//         }

//     })

//     const employee = data.filter(item => item.role !== 'Admin');

//     const entries = employee.filter(item => item.verify == true)


//     const handleSalary = async (e) => {
//         e.preventDefault();
//         const presentSalary = currentEntry.salary
//         const newSalary = e.target.salary.value
//         const employeeEmail = currentEntry.email

//         console.log(presentSalary, newSalary);


//         if (parseInt(presentSalary) === parseInt(newSalary)) {
//             return toast.error('Salary is not updated');
//         } else if (parseInt(presentSalary) > parseInt(newSalary)) {
//             return toast.error('You cannot reduce salary');
//         }

//         else {

//             try {
//                 const response = await AxiosSecure.patch(`http://localhost:3000/users/updateSalary/${employeeEmail}`, { salary: newSalary });
//                 if (response.data.acknowledged) {
//                     toast.success('Salary updated successfully');
//                     SetSalaryModal(false)
//                     refetch()
//                 }
//             } catch (error) {
//                 console.error(error);
//                 toast.error('Error updating salary');
//             }
//         }


//     }

//     const handleFired = async (fired) => {

//         const email = currentEntry.email

//         try {
//             const response = await axios.patch(`http://localhost:3000/users/fired/${email}`, { fired: fired });
//             if (response.data.acknowledged){
//                 toast.success('Fired Employee successfully');
//                 setFired(false)
//                 refetch()
//             }
//         } catch (error) {
//             console.error(error);
//             toast.error(error);
//         }

//     }

//     const handleMakeHR = async () => {
//         const email = currentEntry.email
//         console.log('HR', email);

//         try {
//             const response = await axios.patch(`http://localhost:3000/users/makeHR/${email}`, { role: "HR" });
//             if (response.data.acknowledged){
//                 toast.success('Make HR successfully');
//                 setMakeHR(false)
//                 refetch()
//             }
//         } catch (error) {
//             console.error(error);
//             toast.error(error);
//         }

//     }

//     if (isLoading) {
//         return <Spinner></Spinner>
//     }

//     return (
//         <>
//             <div className="w-[95%] mx-auto sm:pb-24 pb-10 pt-10">
//                 <div className='sm:pb-12 pb-8'>
//                     <p className="text-xl text-pmColor font-montserrat font-bold text-center">Employee List</p>
//                     <h1 className="mt-2 text-2xl font-semibold text-black font-poppins text-center capitalize lg:text-4xl dark:text-white">
//                         All Employee Info
//                     </h1>
//                 </div>
//                 <div className="w-full overflow-x-auto rounded-lg border border-pmColor">
//                     <table className="min-w-full">
//                         <thead className="bg-secColor">
//                             <tr>
//                                 <th></th>
//                                 <th></th>
//                                 <th scope="col" className="px-6 text-center text-sm py-3 font-medium text-white uppercase text-nowrap tracking-wider">
//                                     Name
//                                 </th>
//                                 <th scope="col" className="px-6 text-center text-sm py-3 font-medium text-white uppercase text-nowrap tracking-wider">
//                                     Designation
//                                 </th>
//                                 <th scope="col" className="px-6 text-center text-sm py-3 font-medium text-white uppercase text-nowrap tracking-wider">
//                                     Salary
//                                 </th>
//                                 <th scope="col" className="px-6 text-center text-sm py-3 font-medium text-white uppercase text-nowrap tracking-wider">
//                                     Make HR
//                                 </th>
//                                 <th scope="col" className="px-6 text-center text-sm py-3 font-medium text-white uppercase text-nowrap tracking-wider">
//                                     Fired

//                                 </th>
//                                 <th></th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white dark:bg-themeColor">
//                             {entries.map((entry, index) => (
//                                 <tr key={entry._id} className={index % 2 === 0 ? 'bg-gray-100 dark:bg-themeColor' : 'bg-white dark:bg-themeColor2'}>
//                                     <td className='text-black dark:text-white px-6 py-4'>{index + 1}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">
//                                         <div onClick={() => openDetailsModal(entry)} className='w-10 h-10 rounded-full cursor-pointer'>
//                                             <img className='h-10 w-10 rounded-full object-cover' src={entry?.imgUrl} alt="" />
//                                         </div>
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">{entry.name}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">{entry.designation}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">{entry.salary} taka <FaPen onClick={() => updateSalary(entry)} className={`inline text-pmColor cursor-pointer mb-1 ml-1 ${entry?.fired ? "hidden":""}`} /></td>
//                                     <td className="px-6 py-4 whitespace-nowrap mx-auto text-black text-sm dark:text-white font-semibold text-center">
//                                         <button disabled={entry?.fired} className={`${entry.role === "Employee" ? "p-2 bg-pmColor rounded-full cursor-default" : "cursor-default"} ${entry?.fired ? "cursor-not-allowed":""}`}>
//                                             {entry.role === 'Employee' ? <FaUserTie onClick={() => { setMakeHR(true), setCurrentEntry(entry) }} className={`text-white text-xl ${entry?.fired ? "cursor-not-allowed":"cursor-pointer"}`} /> : <FaUserTie className="dark:text-white text-black text-xl cursor-default" />}
//                                         </button>
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">
//                                         {
//                                             !entry?.fired ? <button onClick={() => { setFired(true), setCurrentEntry(entry) }} className={`rounded-xl bg-secColor text-white px-3 py-1 font-poppins font-bold`}>Fired</button>: <span className="text-red-500">Fired</span>
//                                         }
//                                     </td>
//                                     <td className='text-black dark:text-white px-6 py-4'>{index + 1}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//             {detailsOpen && currentEntry && (
//                 <div className="fixed w-screen h-screen inset-0 z-[500] flex items-center justify-center overflow-y-auto bg-secColor bg-opacity-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
//                     <div className={`relative px-4 pt-5 pb-4 w-[95%] text-left transition-all h-fit transform bg-white rounded-lg shadow-xl dark:bg-themeColor sm:my-8 max-w-lg sm:w-full sm:p-6`}>
//                         <div className='max-w-full'>
//                             <div className="mt-2 text-center">
//                                 <div className='w-full h-[300px] rounded-xl mx-auto mb-4'>
//                                     <img className='h-[300px] w-full rounded-xl object-cover' src={currentEntry?.imgUrl} alt="" />
//                                 </div>
//                                 <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
//                                     {currentEntry.name}
//                                 </h3>
//                                 <div className="text-sm my-8 text-wrap text-center sm:text-left text-gray-500 dark:text-gray-400 gap-8 sm:flex justify-center">
//                                     <div className='space-y-3'>
//                                         {/* <div><strong>Name:</strong> {currentEntry.name}</div> */}
//                                         <div><strong>Email:</strong> {currentEntry.email}</div>
//                                         <div><strong>Phone:</strong> {currentEntry.phone}</div>
//                                         <div><strong>Bank Account:</strong> {currentEntry.bankAccount}</div>
//                                     </div>
//                                     <div className='space-y-3 sm:mt-0 mt-3'>
//                                         <div><strong>Designation:</strong> {currentEntry.designation}</div>
//                                         <div><strong>Salary:</strong> {currentEntry.salary}</div>
//                                         <div><strong>Role:</strong> {currentEntry.role}</div>
//                                     </div>
//                                 </div>
//                                 <div className='text-gray-500 dark:text-gray-400 text-sm text-wrap mx-auto'><strong>Verified:</strong> {currentEntry.verify ? "Yes" : "No"}</div>
//                             </div>
//                         </div>
//                         <div className="mt-5 sm:flex items-center justify-center">
//                             <button onClick={closeDetailsModal} className="w-full px-4 py-2 mt-2 text-sm block font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
//                                 Close
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//             {salaryModal && currentEntry && (
//                 <div className="fixed w-screen h-screen inset-0 z-[500] flex items-center justify-center overflow-y-auto bg-secColor bg-opacity-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
//                     <form onSubmit={handleSalary} className={`relative px-4 pt-5 pb-4 text-left transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-themeColor sm:my-8 max-w-sm sm:w-full w-[95%] sm:p-6`}>
//                         <div>
//                             <div>
//                                 <div className="flex items-center justify-center">
//                                     <TbCoinTakaFilled className='text-5xl bg-pmColor rounded-full text-white' />
//                                 </div>
//                                 <div className="mt-2 text-center">
//                                     <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
//                                         Salary Increase
//                                     </h3>
//                                     <p className="mt-2 text-wrap text-sm w-[80%] mx-auto text-gray-500 dark:text-gray-400">
//                                         Once the salary is increased, it cannot be reduced later
//                                     </p>
//                                     <div className='py-3 pt-6 gap-5'>
//                                         <div className='w-20 h-20 rounded-full mx-auto mb-4'>
//                                             <img className='h-20 w-20 rounded-full object-cover' src={currentEntry?.imgUrl} alt="" />
//                                         </div>
//                                         <div className='text-center space-y-2 text-black dark:text-white text-sm font-montserrat'>
//                                             <h2>{currentEntry.name}</h2>
//                                             <h2>{currentEntry.email}</h2>
//                                             <h2>{currentEntry.designation}</h2>
//                                         </div>
//                                         <div>
//                                             <input name="salary" type="number" defaultValue={currentEntry.salary} className="rounded-lg mt-3 outline-none py-1 px-2 text-center bg-secColor bg-opacity-20 text-black dark:text-white" />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="mt-5 sm:flex items-center justify-center">
//                             <div className="sm:flex sm:items-center w-full">
//                                 <button onClick={() => SetSalaryModal(false)} className="w-full block px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
//                                     Cancel
//                                 </button>
//                                 <button className="group relative inline-flex w-full sm:mt-0 mt-3 text-center mx-auto h-9 items-center justify-center overflow-hidden rounded-md bg-secColor px-5 font-medium text-white">
//                                     <span className="text-sm">Increase</span>
//                                     <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
//                                         <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
//                                             <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor"></path>
//                                         </svg>
//                                     </div>
//                                 </button>
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//             )}
//             {fired && currentEntry && (
//                 <div className="fixed w-screen h-screen inset-0 z-[500] flex items-center justify-center overflow-y-auto bg-secColor bg-opacity-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
//                     <div className={`relative px-4 pt-5 pb-4 text-left transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-themeColor sm:my-8 max-w-sm sm:w-full w-[95%] sm:p-6`}>
//                         <div>
//                             <div>
//                                 <div className="flex items-center justify-center">
//                                     <PiExclamationMarkBold className='text-5xl bg-pmColor rounded-full text-white' />
//                                 </div>
//                                 <div className="mt-2 text-center">
//                                     <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
//                                         Warning
//                                     </h3>
//                                     <p className="mt-2 text-wrap text-sm w-[80%] mx-auto text-gray-500 dark:text-gray-400">
//                                         Once you have <strong>fired</strong> someone, <strong>they will no longer be able to use their account on this website,</strong> so please check carefully before fired.
//                                     </p>
//                                     <div className='py-3 pt-6 gap-5'>
//                                         <div className='w-20 h-20 rounded-full mx-auto mb-4'>
//                                             <img className='h-20 w-20 rounded-full object-cover' src={currentEntry?.imgUrl} alt="" />
//                                         </div>
//                                         <div className='text-center space-y-2 text-black dark:text-white text-sm font-montserrat'>
//                                             <h2>{currentEntry.name}</h2>
//                                             <h2>{currentEntry.email}</h2>
//                                             <h2>{currentEntry.designation}</h2>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="mt-5 sm:flex items-center justify-center">
//                             <div className="sm:flex sm:items-center w-full">
//                                 <button onClick={() => setFired(false)} className="w-full block px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
//                                     Cancel
//                                 </button>
//                                 <button onClick={() => handleFired(true)} className="group relative inline-flex w-full sm:mt-0 mt-3 text-center mx-auto h-9 items-center justify-center overflow-hidden rounded-md bg-secColor px-5 font-medium text-white">
//                                     <span className="text-sm">Fired</span>
//                                     <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
//                                         <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
//                                             <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor"></path>
//                                         </svg>
//                                     </div>
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//             {makeHR && currentEntry && (
//                 <div className="fixed w-screen h-screen inset-0 z-[500] flex items-center justify-center overflow-y-auto bg-secColor bg-opacity-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
//                     <div className={`relative px-4 pt-5 pb-4 text-left transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-themeColor sm:my-8 max-w-sm sm:w-full w-[95%] sm:p-6`}>
//                         <div>
//                             <div>
//                                 <div className="flex items-center justify-center">
//                                     <FaUserTie className='text-5xl bg-pmColor rounded-full p-1.5 text-white' />
//                                 </div>
//                                 <div className="mt-2 text-center">
//                                     <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
//                                         Make HR
//                                     </h3>
//                                     <p className="mt-2 text-wrap text-sm w-[80%] mx-auto text-gray-500 dark:text-gray-400">
//                                         Once you make HR, you can't make him an employee later
//                                     </p>
//                                     <div className='py-3 pt-6 gap-5'>
//                                         <div className='w-20 h-20 rounded-full mx-auto mb-4'>
//                                             <img className='h-20 w-20 rounded-full object-cover' src={currentEntry?.imgUrl} alt="" />
//                                         </div>
//                                         <div className='text-center space-y-2 text-black dark:text-white text-sm font-montserrat'>
//                                             <h2>{currentEntry.name}</h2>
//                                             <h2>{currentEntry.email}</h2>
//                                             <h2>{currentEntry.designation}</h2>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="mt-5 sm:flex items-center justify-center">
//                             <div className="sm:flex sm:items-center w-full">
//                                 <button onClick={() => setMakeHR(false)} className="w-full block px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
//                                     Cancel
//                                 </button>
//                                 <button onClick={handleMakeHR} className="group relative inline-flex w-full sm:mt-0 mt-3 text-center mx-auto h-9 items-center justify-center overflow-hidden rounded-md bg-secColor px-5 font-medium text-white">
//                                     <span className="text-sm">Make HR</span>
//                                     <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
//                                         <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
//                                             <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor"></path>
//                                         </svg>
//                                     </div>
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default AllEmployeeList;