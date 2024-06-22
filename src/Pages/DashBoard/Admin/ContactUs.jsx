import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../Components/smallComponents/Spinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";


const ContactUs = () => {


    const AxiosSecure = useAxiosSecure()
    const [currentEntry, setCurrentEntry] = useState(null)


    const { data: entries = [], isLoading } = useQuery({
        queryKey: ['contact'],
        queryFn: async () => {

            const { data } = await AxiosSecure.get(`/contact`);
            return data;
        }

    })

    if (isLoading) {
        return <Spinner></Spinner>
    }




    return (
        <>
            <div className="w-[95%] mx-auto sm:pb-24 pb-10 pt-10">
                <div className='sm:pb-12 pb-8'>
                    <p className="text-xl text-pmColor font-montserrat font-bold text-center">Payment History</p>
                    <h1 className="mt-2 text-2xl font-semibold text-black font-poppins text-center capitalize lg:text-4xl dark:text-white">
                        Perfect payment track
                    </h1>
                </div>
                <div className="w-full overflow-x-auto rounded-lg border border-pmColor">
                    <table className="min-w-full">
                        <thead className="bg-secColor">
                            <tr>
                                <th scope="col" className="px-6 text-center text-sm py-3 font-medium text-white uppercase text-nowrap tracking-wider">
                                    Name
                                </th>
                                <th scope="col" className="px-6 text-center text-sm py-3 font-medium text-white uppercase text-nowrap tracking-wider">
                                    Email
                                </th>
                                <th scope="col" className="px-6 text-center text-sm py-3 font-medium text-white uppercase text-nowrap tracking-wider">
                                    Subject
                                </th>
                                <th scope="col" className="px-6 text-center text-sm py-3 font-medium text-white uppercase text-nowrap tracking-wider">
                                    Message
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-themeColor">
                            {entries.map((entry, index) => (
                                <tr key={entry._id} className={index % 2 === 0 ? 'bg-gray-100 dark:bg-themeColor' : 'bg-white dark:bg-themeColor2'}>
                                    <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">{entry.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">{entry.email} taka</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">{entry.subject}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">
                                        <button onClick={() => setCurrentEntry(entry)} className="px-3 py-1 bg-secColor text-white rounded-xl">View Message</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {currentEntry &&
                    <div className="fixed w-screen h-screen inset-0 z-[500] flex items-center justify-center overflow-y-auto bg-secColor bg-opacity-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div className={`relative px-4 pt-5 pb-4 w-[95%] text-left transition-all h-fit transform bg-white rounded-lg shadow-xl dark:bg-themeColor sm:my-8 max-w-lg sm:w-full sm:p-6`}>
                            <div className='max-w-full max-h-[500px] overflow-y-auto'>
                                <div className="mt-2 text-center">
                                    <h3 className="text-xl font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
                                        {currentEntry.name}
                                    </h3>
                                    <h4 className="text-black dark:text-white mt-3 text-sm">{currentEntry.email}</h4>
                                    <p className="text-black dark:text-white my-5 text-sm"><strong>{currentEntry.subject} : </strong>{currentEntry.message}</p>
                                </div>
                            </div>
                            <div className="mt-5 sm:flex items-center justify-center">
                                <button onClick={() => { setCurrentEntry(null) }} className="w-full px-4 py-2 mt-2 text-sm block font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>}
            </div>
        </>
    );
};

export default ContactUs;