import React, { useEffect, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { MdAddIcCall, MdLocationOn } from 'react-icons/md';
import { Link } from 'react-router-dom';
import WithLoading from '../../Components/smallComponents/WithLoading';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';


const Contact = () => {


    const [scrollPosition, setScrollPosition] = useState(0);
    const [error, setError] = useState(null)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    useEffect(() => {
        const handleScroll = () => {
            const position = window.scrollY;
            setScrollPosition(position);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const onSubmit = async (data) => {
        setError('')
        try {
            const { data: info } = await axios.post('https://assignment-12-server-teal.vercel.app/contact', data);
            if (info.acknowledged) {
                reset();
                toast.success('Message Send Successfully');
            }
        } catch (error) {
            console.error(error);
            return setError(error.message);
        }


    }

    return (
        <WithLoading>
            <div>
                <div className='overflow-hidden'>
                    <div className='w-full lg:h-[50vh] h-[80vh] object-cover bg-fixed bg-cover bg-bottom' style={{ backgroundImage: `url("https://images.pexels.com/photos/8866725/pexels-photo-8866725.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")` }}>
                        <div className="bg-black bg-opacity-50 w-full h-full flex flex-col justify-center items-center">
                            <div className='lg:flex lg:justify-center lg:items-center lg:gap-14 lg:ml-32'>
                                <div className=''>
                                    <h1 className='text-7xl font-poppins text-white font-bold text-center lg:mb-0 mb-5 duration-300 ease-out' style={{
                                        transform: `translateX(${scrollPosition / -1}px)`
                                    }}>Contact</h1>
                                </div>
                                <span className='lg:h-32 lg:w-[2px] w-[80%] h-[2px] block mx-auto lg:mb-0 mb-5 bg-white bg-opacity-40'></span>
                                <div className='lg:space-y-0 space-y-3 duration-300 ease-out' style={{
                                    transform: `translateX(${scrollPosition / 1}px)`
                                }}>
                                    <p className='font-montserrat text-white w-full lg:my-2 font-semibold text-opacity-80 lg:text-left text-center'>Contact us for support assistance.</p>
                                    <p className='font-montserrat text-white w-full lg:my-2 font-semibold text-opacity-80 lg:text-left text-center'>Get in touch for employee management help.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full min-h-[50vh] py-10 bg-pmColor relative'>
                        <div className='bg-pmColor w-fit px-8 py-3 rounded-3xl absolute top-0 right-[50%] translate-x-[50%] translate-y-[-50%]'>
                            <h1 className='text-white font-poppins font-semibold text-nowrap'><Link to='/' className='hover:underline'>Home</Link> / <span>Contact</span></h1>
                        </div>
                        <div className='flex flex-col justify-center items-center min-h-[50vh]'>
                            <div className='flex xl:justify-center justify-between gap-10 items-center 2xl:w-[80%] w-full md:flex-nowrap flex-wrap'>
                                <div className='flex flex-col justify-center items-center xl:w-[30%] w-full translate-y-3'>
                                    <div className='rounded-full border-2 border-white p-10'>
                                        <MdLocationOn className='text-9xl text-white' />
                                    </div>
                                    <div className='mt-5'>
                                        <h1 className='text-xl text-white font-poppins font-semibold text-center'>OUR <br />LOCATION</h1>
                                        <p className='text-white font-montserrat font-medium my-2 text-center max-w-[300px]'>PO Box 97845 Baker st. 567, Los Angeles,</p>
                                        <p className='text-center font-montserrat text-white'>California, US.</p>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-center items-center xl:w-[30%] w-full'>
                                    <div className='rounded-full border-2 border-white p-10'>
                                        <MdAddIcCall className='text-9xl text-white' />
                                    </div>
                                    <div className='mt-5'>
                                        <h1 className='text-xl text-white font-poppins font-semibold text-center'>CONTACT <br /> US</h1>
                                        <p className='text-white font-montserrat font-medium my-2 text-center'>Mobile: (+0123) 465 789</p>
                                        <p className='text-center font-montserrat text-white'>Fax: (+0122) 456 789</p>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-center items-center xl:w-[30%] w-full'>
                                    <div className='rounded-full border-2 border-white p-10'>
                                        <FaPaperPlane className='text-9xl text-white' />
                                    </div>
                                    <div className='mt-5'>
                                        <h1 className='text-xl text-white font-poppins font-semibold text-center'>WRITE SOME <br />WORDS</h1>
                                        <p className='text-white font-montserrat font-medium my-2 text-center'>Support247@thimpress.com</p>
                                        <p className='text-center font-montserrat text-white'>Info@thimpress.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='my-20 2xl:w-[70%] lg:w-[90%] w-[90%] mx-auto'>
                        <div className='my-10'>
                            <h1 className='sm:text-5xl text-4xl dark:text-white text-black font-poppins text-center'>Reach Out to Us</h1>
                            <p className='dark:text-white text-black sm:text-base text-sm text-center mt-5'>Submit your details, and we'll respond promptly to your inquiry.</p>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='grid md:grid-cols-3 lg:gap-8 sm:gap-5 gap-3'>
                                <div className="mt-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="yourName">Your Name</label>
                                    <input {...register("name", { required: true })}
                                        id="yourName" className="block w-full px-4 py-2 text-gray-700 bg-white border border-black border-opacity-20 rounded-lg dark:bg-themeColor dark:text-gray-300 dark:border-gray-600 focus:border-pmColor focus:ring-opacity-40 focus:outline-none" type="text" />
                                    {errors.name && <span className="text-xs text-red-500">This field is required</span>}
                                </div>
                                <div className="mt-4">
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="EmailAddress">Email Address</label>
                                    <input {...register("email", { required: true })}
                                        id="EmailAddress" className="block w-full px-4 py-2 text-gray-700 bg-white border border-black border-opacity-20 rounded-lg dark:bg-themeColor dark:text-gray-300 dark:border-gray-600 focus:border-pmColor focus:ring-opacity-40 focus:outline-none" type="email" />
                                    {errors.email && <span className="text-xs text-red-500">This field is required</span>}
                                </div>
                                <div className="mt-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="subject">Subject</label>
                                    <input {...register("subject", { required: true })}
                                        id="subject" className="block w-full px-4 py-2 text-gray-700 bg-white border border-black border-opacity-20 rounded-lg dark:bg-themeColor dark:text-gray-300 dark:border-gray-600 focus:border-pmColor focus:ring-opacity-40 focus:outline-none" type="text" />
                                    {errors.subject && <span className="text-xs text-red-500">This field is required</span>}
                                </div>
                            </div>
                            <div className="mt-8">
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="message">Message</label>
                                <textarea {...register("message", { required: true })}
                                    id="message" className="block w-full h-32 px-4 py-2 text-gray-700 bg-white border border-black border-opacity-20 rounded-lg dark:bg-themeColor dark:text-gray-300 dark:border-gray-600 focus:border-pmColor focus:ring-opacity-40 focus:outline-none" type="text" />
                                {errors.message && <span className="text-xs text-red-500">This field is required</span> || <span className="text-xs text-red-500">{error}</span>}
                            </div>
                            <div className="mt-8 rounded-lg md:w-[30%] mx-auto">
                                <button className="group relative inline-flex h-12 items-center justify-center w-full rounded-lg bg-secColor py-1 pl-6 pr-14 font-medium text-neutral-50">
                                    <span className="z-10 ml-7 text-nowrap">Sent Message</span>
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
        </WithLoading>
    );
};

export default Contact;