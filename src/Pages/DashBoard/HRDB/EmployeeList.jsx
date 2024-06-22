// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import toast from 'react-hot-toast';
// import { IoCheckmark } from 'react-icons/io5';
// import { PiExclamationMarkBold } from 'react-icons/pi';
// import { RiGitRepositoryPrivateLine } from 'react-icons/ri';
// import { RxCross2 } from 'react-icons/rx';
// import { Link } from 'react-router-dom';
// import Spinner from '../../../Components/smallComponents/Spinner';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';
// import { loadStripe } from '@stripe/stripe-js';
// import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
// import CheckOutFrom from '../../../Components/CheckOutFrom/CheckOutFrom';
// import { TbCoinTakaFilled } from 'react-icons/tb';

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH);

// const EmployeeList = () => {
//     const [open, setOpen] = useState(false);
//     const [verify, setVerify] = useState(false);
//     const [detailsOpen, setDetailsOpen] = useState(false);
//     const [currentEntry, setCurrentEntry] = useState(null);
//     const AxiosSecure = useAxiosSecure();
//     const [isPayed, setIsPayed] = useState(false);


//     const { data = [], isLoading, refetch } = useQuery({
//         queryKey: ['users'],
//         queryFn: async () => {
//             const { data } = await AxiosSecure.get('/users');
//             return data;
//         }
//     });

//     const entries = data.filter(item => item.role === 'Employee');

//     const { data: paymentHistory = [], isLoading: loader, refetch: refech } = useQuery({
//         queryKey: ['payment-history', currentEntry?.email],
//         queryFn: async () => {
//             if (currentEntry?.email) {
//                 const { data } = await AxiosSecure.get(`/payment-history/${currentEntry?.email}`);
//                 return data;
//             }
//             return [];
//         },
//         enabled: !!currentEntry?.email,
//     });

//     const date = new Date();
//     const day = date.getDate();
//     const month = date.toLocaleString('en-US', { month: 'short' }); // 'Jun'
//     const year = date.getFullYear(); // 2024
//     let thisMonth = paymentHistory.filter(item => item.month === `${month}'${year}`);

//     // useEffect(() => {
//     //     if (thisMonth.length >= 1) {
//     //         setIsPayed(true);
//     //     } else {
//     //         setIsPayed(false);
//     //     }
//     // }, [thisMonth, currentEntry?.email]);

//     const handleVerify = async (id, name) => {
//         try {
//             const { data } = await axios.patch(`https://assignment-12-server-teal.vercel.app/users/${id}`, { verify: true });
//             if (data.acknowledged) {
//                 toast.success(`Verified ${name}`);
//                 refetch();
//             }
//         } catch (error) {
//             console.error('Failed to fetch data:', error);
//         }
//     };

//     const openModal = (entry) => {

//         setCurrentEntry(entry);
//         // refech();
//         setOpen(true);

//     };

//     const closeModal = () => {
//         setOpen(false);
//         setCurrentEntry(null);
//     };

//     const openVerifyModal = (entry) => {
//         setCurrentEntry(entry);
//         setVerify(true);
//     };

//     const closeVerifyModal = () => {setVerify(false); setCurrentEntry(null);};

//     const openDetailsModal = (entry) => {
//         setCurrentEntry(entry);
//         setDetailsOpen(true);
//     };

//     const closeDetailsModal = () => {setDetailsOpen(false); setCurrentEntry(null);};

//     if (isLoading || loader) {
//         return <Spinner />;
//     }

//     console.log(isPayed);


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
//                                     Email
//                                 </th>
//                                 <th scope="col" className="px-6 text-center text-sm py-3 font-medium text-white uppercase text-nowrap tracking-wider">
//                                     Verified
//                                 </th>
//                                 <th scope="col" className="px-6 text-center text-sm py-3 font-medium text-white uppercase text-nowrap tracking-wider">
//                                     Bank Account
//                                 </th>
//                                 <th scope="col" className="px-6 text-center text-sm py-3 font-medium text-white uppercase text-nowrap tracking-wider">
//                                     Salary
//                                 </th>
//                                 <th scope="col" className="px-6 text-center text-sm py-3 font-medium text-white uppercase text-nowrap tracking-wider">
//                                     Pay
//                                 </th>
//                                 <th scope="col" className="px-6 text-center text-sm py-3 font-medium text-white uppercase text-nowrap tracking-wider">
//                                     Details
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
//                                     <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">{entry.email}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">
//                                         <button disabled={entry.verify} onClick={() => openVerifyModal(entry)} className={`text-xl text-white rounded-full p-1 ${entry.verify == true ? "bg-secColor" : "bg-red-500"}`}>
//                                             {entry.verify == true ? <IoCheckmark /> : <RxCross2 />}
//                                         </button>
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">{entry.bankAccount}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">{entry.salary} taka</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">
//                                         {
//                                             entry?.fired ? <span className='text-red-500'>Fired</span> :
//                                                 <button disabled={!entry.verify} onClick={() => {
//                                                     openModal(entry)
//                                                 }}
//                                                     className={`rounded-xl ${entry.verify ? " bg-secColor text-white" : "cursor-not-allowed bg-gray-500 text-gray-300"} px-3 py-1 font-poppins font-bold`}>
//                                                     Pay
//                                                 </button>
//                                         }
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">
//                                         <Link to={`/dashboard/detail/${entry.email}`} className='rounded-xl bg-secColor px-3 py-1 text-white font-poppins font-bold'>Details</Link>
//                                     </td>
//                                     <td className='text-black dark:text-white px-6 py-4'>{index + 1}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//             {verify && currentEntry && (
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
//                                         If you verified once, you cannot unverify later
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
//                                 <button onClick={closeVerifyModal} className="w-full block px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
//                                     Cancel
//                                 </button>
//                                 <button onClick={() => {
//                                     closeVerifyModal();
//                                     handleVerify(currentEntry._id, currentEntry.name);
//                                 }} className="group relative inline-flex w-full sm:mt-0 mt-3 text-center mx-auto h-9 items-center justify-center overflow-hidden rounded-md bg-secColor px-5 font-medium text-white">
//                                     <span className="text-sm">Verify</span>
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
//             {open && currentEntry && (
//                 <div className="fixed w-screen h-screen inset-0 z-[500] flex items-center justify-center overflow-y-auto bg-secColor bg-opacity-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
//                     {
//                         thisMonth.length >= 1 ? <div className={`relative px-4 pt-5 pb-4 text-left transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-themeColor sm:my-8 max-w-sm sm:w-full w-[95%] sm:p-6`}>
//                             <div>
//                                 <div>
//                                     <div className="flex items-center justify-center">
//                                         <TbCoinTakaFilled className='text-5xl bg-pmColor rounded-full text-white' />
//                                     </div>
//                                     <div className="mt-2 text-center">
//                                         <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
//                                             Salary Paid
//                                         </h3>
//                                         <p className="mt-2 text-wrap text-sm w-[80%] mx-auto text-gray-500 dark:text-gray-400">
//                                             You have already paid this employee once this month
//                                         </p>
//                                         <div className='py-3 pt-6 gap-5'>
//                                             <div className='w-20 h-20 rounded-full mx-auto mb-4'>
//                                                 <img className='h-20 w-20 rounded-full object-cover' src={currentEntry?.imgUrl} alt="" />
//                                             </div>
//                                             <div className='text-center space-y-2 text-black dark:text-white text-sm font-montserrat'>
//                                                 <h2>{currentEntry.name}</h2>
//                                                 <h2>{currentEntry.email}</h2>
//                                                 <h2>{currentEntry.salary} taka</h2>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="mt-5 sm:flex items-center justify-center">
//                                 <button
//                                     onClick={() => { setIsPayed(false); setCurrentEntry(null)}}
//                                     className="w-full px-4 py-2 mt-2 text-sm block font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
//                                     Close
//                                 </button>
//                             </div>
//                         </div>
//                             : <div className={`relative px-4 pt-5 pb-4 w-[95%] text-left transition-all transform bg-white rounded-lg shadow-xl dark:bg-themeColor sm:my-8 max-w-sm sm:w-full sm:p-6`}>
//                                 <div className='max-w-full'>
//                                     <div>
//                                         <div className="flex items-center justify-center">
//                                             <TbCoinTakaFilled className='text-5xl bg-pmColor rounded-full text-white' />
//                                         </div>
//                                         <div className="mt-2 text-center">
//                                             <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
//                                                 Pay Salary
//                                             </h3>
//                                             <p className="mt-2 text-wrap text-sm w-[80%] mx-auto text-gray-500 dark:text-gray-400">
//                                                 You cannot pay an employee twice in a month
//                                             </p>
//                                             <div className='py-3 pt-6 gap-5'>
//                                                 <div className='w-20 h-20 rounded-full mx-auto mb-4'>
//                                                     <img className='h-20 w-20 rounded-full object-cover' src={currentEntry?.imgUrl} alt="" />
//                                                 </div>
//                                                 <div className='text-center space-y-2 text-black dark:text-white text-sm font-montserrat'>
//                                                     <h2>{currentEntry.name}</h2>
//                                                     <h2>{currentEntry.email}</h2>
//                                                     <h2>{currentEntry.salary} taka</h2>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <Elements stripe={stripePromise}>
//                                     <CheckOutFrom salary={currentEntry.salary} email={currentEntry.email} closeModal={closeModal} isPayed={isPayed}></CheckOutFrom>
//                                 </Elements>
//                             </div>
//                     }
//                 </div>
//             )}
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
//             {/* {
//                 thisMonth.length >= 1 && currentEntry && <div className="fixed w-screen h-screen inset-0 z-[500] flex items-center justify-center overflow-y-auto bg-secColor bg-opacity-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
//                     <div className={`relative px-4 pt-5 pb-4 text-left transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-themeColor sm:my-8 max-w-sm sm:w-full w-[95%] sm:p-6`}>
//                         <div>
//                             <div>
//                                 <div className="flex items-center justify-center">
//                                     <TbCoinTakaFilled className='text-5xl bg-pmColor rounded-full text-white' />
//                                 </div>
//                                 <div className="mt-2 text-center">
//                                     <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
//                                         Salary Paid
//                                     </h3>
//                                     <p className="mt-2 text-wrap text-sm w-[80%] mx-auto text-gray-500 dark:text-gray-400">
//                                         You have already paid this employee once this month
//                                     </p>
//                                     <div className='py-3 pt-6 gap-5'>
//                                         <div className='w-20 h-20 rounded-full mx-auto mb-4'>
//                                             <img className='h-20 w-20 rounded-full object-cover' src={currentEntry?.imgUrl} alt="" />
//                                         </div>
//                                         <div className='text-center space-y-2 text-black dark:text-white text-sm font-montserrat'>
//                                             <h2>{currentEntry.name}</h2>
//                                             <h2>{currentEntry.email}</h2>
//                                             <h2>{currentEntry.salary} taka</h2>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="mt-5 sm:flex items-center justify-center">
//                             <button
//                                 onClick={() => { setCurrentEntry(null); thisMonth = [] }}
//                                 className="w-full px-4 py-2 mt-2 text-sm block font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
//                                 Close
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             } */}
//         </>
//     );
// };

// export default EmployeeList;



import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { IoCheckmark } from 'react-icons/io5';
import { PiExclamationMarkBold } from 'react-icons/pi';
import { RiGitRepositoryPrivateLine } from 'react-icons/ri';
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import Spinner from '../../../Components/smallComponents/Spinner';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import CheckOutFrom from '../../../Components/CheckOutFrom/CheckOutFrom';
import { TbCoinTakaFilled } from 'react-icons/tb';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH);

const EmployeeList = () => {
    const [open, setOpen] = useState(false);
    const [verify, setVerify] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [currentEntry, setCurrentEntry] = useState(null);
    const AxiosSecure = useAxiosSecure();
    const [isPayed, setIsPayed] = useState(false);

    const { data = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await AxiosSecure.get('/users');
            return data;
        }
    });

    const entries = data.filter(item => item.role === 'Employee');

    const { data: paymentHistory = [], isLoading: loader, refetch: refech } = useQuery({
        queryKey: ['payment-history', currentEntry?.email],
        queryFn: async () => {
            if (currentEntry?.email) {
                const { data } = await AxiosSecure.get(`/payment-history/${currentEntry?.email}`);
                return data;
            }
            return [];
        },
        enabled: !!currentEntry?.email,
    });

    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' }); // 'Jun'
    const year = date.getFullYear(); // 2024
    let thisMonth = paymentHistory.filter(item => item.month === `${month}'${year}`);


    const handleVerify = async (id, name) => {
        try {
            const { data } = await axios.patch(`https://assignment-12-server-teal.vercel.app/users/${id}`, { verify: true });
            if (data.acknowledged) {
                toast.success(`Verified ${name}`);
                refetch();
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    const openModal = (entry) => {
        setCurrentEntry(entry);
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
        setCurrentEntry(null);
    };

    const openVerifyModal = (entry) => {
        setCurrentEntry(entry);
        setVerify(true);
    };

    const closeVerifyModal = () => {
        setVerify(false);
        setCurrentEntry(null);
    };

    const openDetailsModal = (entry) => {
        setCurrentEntry(entry);
        setDetailsOpen(true);
    };

    const closeDetailsModal = () => {
        setDetailsOpen(false);
        setCurrentEntry(null);
    };

    console.log(currentEntry, isPayed);

    if (isLoading || loader) {
        return <Spinner />;
    }

    return (
        <>
            <div className="w-[95%] mx-auto sm:pb-24 pb-10 pt-10">
                <div className='sm:pb-12 pb-8'>
                    <p className="text-xl text-pmColor font-montserrat font-bold text-center">Employee List</p>
                    <h1 className="mt-2 text-2xl font-semibold text-black font-poppins text-center capitalize lg:text-4xl dark:text-white">
                        All Employee Info
                    </h1>
                </div>
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
                                    Email
                                </th>
                                <th scope="col" className="px-6 text-center text-sm py-3 font-medium text-white uppercase text-nowrap tracking-wider">
                                    Verified
                                </th>
                                <th scope="col" className="px-6 text-center text-sm py-3 font-medium text-white uppercase text-nowrap tracking-wider">
                                    Bank Account
                                </th>
                                <th scope="col" className="px-6 text-center text-sm py-3 font-medium text-white uppercase text-nowrap tracking-wider">
                                    Salary
                                </th>
                                <th scope="col" className="px-6 text-center text-sm py-3 font-medium text-white uppercase text-nowrap tracking-wider">
                                    Pay
                                </th>
                                <th scope="col" className="px-6 text-center text-sm py-3 font-medium text-white uppercase text-nowrap tracking-wider">
                                    Details
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-themeColor">
                            {entries.map((entry, index) => (
                                <tr key={entry._id} className={index % 2 === 0 ? 'bg-gray-100 dark:bg-themeColor' : 'bg-white dark:bg-themeColor2'}>
                                    <td className='text-black dark:text-white px-6 py-4'>{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">
                                        <div onClick={() => openDetailsModal(entry)} className='w-10 h-10 rounded-full cursor-pointer'>
                                            <img className='h-10 w-10 rounded-full object-cover' src={entry?.imgUrl} alt="" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">{entry.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">{entry.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">
                                        <button disabled={entry.verify} onClick={() => openVerifyModal(entry)} className={`text-xl text-white rounded-full p-1 ${entry.verify ? "bg-secColor" : "bg-red-500"}`}>
                                            {entry.verify ? <IoCheckmark /> : <RxCross2 />}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">{entry.bankAccount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">{entry.salary} taka</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">
                                        {entry?.fired ? <span className='text-red-500'>Fired</span> :
                                            <button disabled={!entry.verify} onClick={() => openModal(entry)} className={`rounded-xl ${entry.verify ? " bg-secColor text-white" : "cursor-not-allowed bg-gray-500 text-gray-300"} px-3 py-1 font-poppins font-bold`}>
                                                Pay
                                            </button>
                                        }
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">
                                        <Link to={`/dashboard/detail/${entry.email}`} className='rounded-xl bg-secColor px-3 py-1 text-white font-poppins font-bold'>Details</Link>
                                    </td>
                                    <td className='text-black dark:text-white px-6 py-4'>{index + 1}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Verify Modal */}
            {verify && currentEntry && (
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
                                        If you verified once, you cannot unverify later
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
                                <button onClick={closeVerifyModal} className="w-full block px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                                    Cancel
                                </button>
                                <button onClick={() => {
                                    closeVerifyModal();
                                    handleVerify(currentEntry._id, currentEntry.name);
                                    setCurrentEntry(null)
                                }} className="group relative inline-flex w-full sm:mt-0 mt-3 text-center mx-auto h-9 items-center justify-center overflow-hidden rounded-md bg-secColor px-5 font-medium text-white">
                                    <span className="text-sm">Verify</span>
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

            {/* Payment Modal */}
            {open && currentEntry?.verify && (
                <div className="fixed w-screen h-screen inset-0 z-[500] flex items-center justify-center overflow-y-auto bg-secColor bg-opacity-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    {
                         thisMonth.length >= 1 ? <div className={`relative px-4 pt-5 pb-4 text-left transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-themeColor sm:my-8 max-w-sm sm:w-full w-[95%] sm:p-6`}>
                            <div>
                                <div>
                                    <div className="flex items-center justify-center">
                                        <TbCoinTakaFilled className='text-5xl bg-pmColor rounded-full text-white' />
                                    </div>
                                    <div className="mt-2 text-center">
                                        <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
                                            Salary Paid
                                        </h3>
                                        <p className="mt-2 text-wrap text-sm w-[80%] mx-auto text-gray-500 dark:text-gray-400">
                                            You have already paid this employee once this month
                                        </p>
                                        <div className='py-3 pt-6 gap-5'>
                                            <div className='w-20 h-20 rounded-full mx-auto mb-4'>
                                                <img className='h-20 w-20 rounded-full object-cover' src={currentEntry?.imgUrl} alt="" />
                                            </div>
                                            <div className='text-center space-y-2 text-black dark:text-white text-sm font-montserrat'>
                                                <h2>{currentEntry.name}</h2>
                                                <h2>{currentEntry.email}</h2>
                                                <h2>{currentEntry.salary} taka</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:flex items-center justify-center">
                                <button
                                    onClick={() => { setCurrentEntry(null) }}
                                    className="w-full px-4 py-2 mt-2 text-sm block font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                                    Close
                                </button>
                            </div>
                        </div>
                            : <div className={`relative px-4 pt-5 pb-4 w-[95%] text-left transition-all transform bg-white rounded-lg shadow-xl dark:bg-themeColor sm:my-8 max-w-sm sm:w-full sm:p-6`}>
                                <div className='max-w-full'>
                                    <div>
                                        <div className="flex items-center justify-center">
                                            <TbCoinTakaFilled className='text-5xl bg-pmColor rounded-full text-white' />
                                        </div>
                                        <div className="mt-2 text-center">
                                            <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
                                                Pay Salary
                                            </h3>
                                            <p className="mt-2 text-wrap text-sm w-[80%] mx-auto text-gray-500 dark:text-gray-400">
                                                You cannot pay an employee twice in a month
                                            </p>
                                            <div className='py-3 pt-6 gap-5'>
                                                <div className='w-20 h-20 rounded-full mx-auto mb-4'>
                                                    <img className='h-20 w-20 rounded-full object-cover' src={currentEntry?.imgUrl} alt="" />
                                                </div>
                                                <div className='text-center space-y-2 text-black dark:text-white text-sm font-montserrat'>
                                                    <h2>{currentEntry.name}</h2>
                                                    <h2>{currentEntry.email}</h2>
                                                    <h2>{currentEntry.salary} taka</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Elements stripe={stripePromise}>
                                    <CheckOutFrom salary={currentEntry.salary} email={currentEntry.email} closeModal={closeModal} isPayed={isPayed}></CheckOutFrom>
                                </Elements>
                            </div>
                    }
                </div>
            )}

            {/* Details Modal */}
            {detailsOpen && currentEntry && (
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
                            <button onClick={()=>{closeDetailsModal(); setCurrentEntry(null)}} className="w-full px-4 py-2 mt-2 text-sm block font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EmployeeList;
