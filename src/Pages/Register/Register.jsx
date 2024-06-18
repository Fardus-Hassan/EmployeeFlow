import { FaStarOfLife } from "react-icons/fa6";
import { IoPeople } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import WithLoading from "../../Components/smallComponents/WithLoading";
import { useContext, useEffect, useState } from "react";
import { GlobalStateContext } from "../../Global/GlobalContext";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import axios from "axios";


const Register = () => {

    const [role, setRole] = useState(null);
    const [imgName, setImgName] = useState(null);
    const { register: regis, setUser, updateUserProfile} = useContext(GlobalStateContext);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const form = location?.state || '/';
    const imgHostingKey = import.meta.env.VITE_imgbb_apiKey;
    const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm();



    const photoName = watch('photo', '');
    useEffect(() => {
        setImgName(photoName[0]?.name);
    }, [photoName]);



    const onSubmit = async (data) => {
        const {
            name, photo, phone, email, bankAccount, designation, salary, password, confirmPassword, role
        } = data;
    
        try {
            // Password validation
            if (password.length < 6) {
                return setError('Password should be at least 6 characters');
            }
            if (!/[A-Z]/.test(password)) {
                return setError('Must have an UPPERCASE letter in the password');
            }
            if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                return setError('Must have a special character in the password');
            }
            if (password !== confirmPassword) {
                return setError('Password and Confirm Password must match');
            }
    
            let imgUrl = null;
            // Upload photo if provided
            if (photo && photo[0]) {
                try {
                    const formData = new FormData();
                    formData.append('image', photo[0]);
                    const response = await axios.post(imgHostingApi, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    imgUrl = response.data?.data?.url;
                } catch (error) {
                    console.error('Error uploading image:', error);
                    return setError('Failed to upload image');
                }
            }
    
            // Register user with email and password
            const result = await regis(email, password);
            setUser(result.user);
    
            // Update user profile with uploaded image and name
            await updateUserProfile(imgUrl, name);
    
            // Prepare user info to be sent to backend
            const userInfo = {
                name, imgUrl, phone, email, bankAccount, designation, salary, role, verify : false
            };
    
            // Send user info to backend for registration
            const response = await axios.post('http://localhost:3000/users', userInfo);
    
            // Handle any error messages from the backend
            if (response.data?.message) {
                setError(response.data.message);
            }
    
            // Reset form and state after successful registration
            toast.success('Registered Successfully');
            reset();
            setError('');
            setRole(null);
            navigate(form); // Navigate to the specified form route
        } catch (error) {
            console.error('Registration error:', error);
            setError(error.message);
        }
    };
    


    return (
        <WithLoading>
            <section className="bg-white dark:bg-themeColor lg:my-0 py-5">
                <div className="flex justify-center min-h-screen">
                    <div className="hidden bg-cover lg:block lg:w-2/5" style={{ backgroundImage: `url("https://images.pexels.com/photos/4057059/pexels-photo-4057059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")` }}>
                    </div>

                    <div className="flex items-center sm:max-w-3xl sm:p-8 py-8 w-[90%] mx-auto lg:px-12 lg:w-3/5">
                        <div className="w-full">
                            <div className='flex items-center justify-start gap-3 mb-5'>
                                <img className="w-14" src="https://i.ibb.co/KzY41M1/management-1.png" alt="" />
                                <h2 className='text-xl font-bold italic text-black dark:text-white'>EmployeeFlow</h2>
                            </div>

                            <p className="mt-4 text-gray-500 dark:text-gray-400">
                                Create your account, manage employee details, track performance, and streamline HR processes seamlessly.
                            </p>



                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mt-6">
                                    <h1 className="text-gray-500 dark:text-gray-300">Selected Who you are</h1>

                                    <div className="mt-3 flex flex-nowrap items-center justify-center md:gap-5 gap-3">
                                        <label className={`flex justify-center w-full px-4 py-3 hover:text-white hover:bg-secColor duration-300 text-pmColor border ${role == "HR" ? "bg-pmColor text-white" : ""} border-pmColor rounded-lg focus:outline-none cursor-pointer`}>
                                            <input {...register("role", { required: true })}
                                                type="radio"
                                                name="role"
                                                className="hidden"
                                                value="HR"
                                                checked={role === "HR"}
                                                onChange={() => {
                                                    setRole('HR');
                                                    setValue('role', 'HR'); // set the value in the form
                                                }}
                                            />
                                            <MdManageAccounts className="text-2xl" />
                                            <span className="mx-2 mt-[2px] font-poppins">
                                                HR
                                            </span>
                                        </label>

                                        <label className={`flex justify-center w-full px-4 py-3 hover:text-white hover:bg-secColor duration-300 text-pmColor border ${role == "Employee" ? "bg-pmColor text-white" : ""} border-pmColor rounded-lg focus:outline-none cursor-pointer`}>
                                            <input {...register("role", { required: true })}
                                                type="radio"
                                                name="role"
                                                className="hidden"
                                                value="Employee"
                                                checked={role === "Employee"}
                                                onChange={() => {
                                                    setRole('Employee');
                                                    setValue('role', 'Employee'); // set the value in the form
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
                                        <label className="mb-2 text-sm text-gray-600 dark:text-gray-200 flex items-center gap-2">Your Name <FaStarOfLife className="text-[10px] text-pmColor" /></label>
                                        <input {...register("name", { required: true })}
                                            type="text" placeholder="Your Full Name" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-themeColor dark:text-gray-300 dark:border-gray-700 focus:border-pmColor focus:outline-none" />
                                        {errors.name && <span className="text-xs text-red-500">This Name field is required</span>}
                                    </div>

                                    <label htmlFor="dropzone-file" className={`flex relative items-center ${errors.photo && "mb-6"} px-3 w-full md:max-h-[50px] h-[50px] mx-auto mt-7 text-center bg-white border rounded-lg cursor-pointer dark:border-gray-700 dark:bg-themeColor`}>
                                        <p className="text-gray-600 dark:text-gray-200 text-sm absolute top-[-30px] left-0 flex items-center gap-2">Your Photo <FaStarOfLife className="text-[10px] text-pmColor" /></p>

                                        <h2 className={`mx-2  ${imgName ? "text-gray-700 dark:text-gray-300" : "text-gray-400 dark:text-gray-600"} text-base`}>{imgName ? `${imgName.split('.')[0].slice(0, 20)}${imgName.length > 20 ? '...' : ''}.${imgName.split('.').pop()}` : "Upload Photo"}</h2>

                                        <input {...register("photo", { required: true })}
                                            id="dropzone-file" type="file" className="hidden" />
                                        {errors.photo && <span className="text-xs text-red-500 absolute left-0 bottom-[-22px]">This Name field is required</span>}
                                    </label>

                                    <div>
                                        <label className="mb-2 text-sm text-gray-600 dark:text-gray-200 flex items-center gap-2">Phone number <FaStarOfLife className="text-[10px] text-pmColor" /></label>
                                        <input {...register("phone", { required: true })}
                                            type="number" placeholder="XXX-XX-XXXX-XXX" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-themeColor dark:text-gray-300 dark:border-gray-700 focus:border-pmColor focus:outline-none" />
                                        {errors.phone && <span className="text-xs text-red-500">This Name field is required</span>}
                                    </div>

                                    <div>
                                        <label className="mb-2 text-sm text-gray-600 dark:text-gray-200 flex items-center gap-2">Email address <FaStarOfLife className="text-[10px] text-pmColor" /></label>
                                        <input {...register("email", { required: true })}
                                            type="email" placeholder="example@gmail.com" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-themeColor dark:text-gray-300 dark:border-gray-700 focus:border-pmColor focus:outline-none" />
                                        {errors.email && <span className="text-xs text-red-500">This Name field is required</span>}
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
                                    <div>
                                        <label className="mb-2 text-sm text-gray-600 dark:text-gray-200 flex items-center gap-2">Password <FaStarOfLife className="text-[10px] text-pmColor" /></label>
                                        <input {...register("password", { required: true })}
                                            type="password" placeholder="Enter your password" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-themeColor dark:text-gray-300 dark:border-gray-700 focus:border-pmColor focus:outline-none" />
                                        {errors.password && <span className="text-xs text-red-500">This Name field is required</span>}
                                    </div>
                                    <div>
                                        <label className="mb-2 text-sm text-gray-600 dark:text-gray-200 flex items-center gap-2">Confirm password <FaStarOfLife className="text-[10px] text-pmColor" /></label>
                                        <input {...register("confirmPassword", { required: true })}
                                            type="password" placeholder="Enter your password" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-themeColor dark:text-gray-300 dark:border-gray-700 focus:border-pmColor focus:outline-none" />
                                        {errors.confirmPassword && <span className="text-xs text-red-500">This Name field is required</span>}
                                    </div>

                                    <div className="sm:mt-7 mt-4 rounded-lg relative">
                                        <span className="text-xs text-red-500 absolute z-10 top-[-22px] left-0">{error}</span>
                                        <button className={`group relative inline-flex h-12 items-center justify-center w-full rounded-lg bg-secColor py-1 pl-6 pr-14 font-medium text-neutral-50`}>
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
                                </div>
                            </form>
                            <Link to='/login' className="text-pmColor text-sm text-center block my-6 hover:underline">Already Have an Account ?</Link>
                        </div>
                    </div>
                </div>
            </section>
        </WithLoading>
    );
};

export default Register;