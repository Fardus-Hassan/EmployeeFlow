import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import WithLoading from "../../Components/smallComponents/WithLoading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../Components/smallComponents/Spinner";

const DashBoard = () => {
    const [selectedFilter, setSelectedFilter] = useState('All');
    const AxiosSecure = useAxiosSecure();

    const { data = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data : info } = await AxiosSecure.get(`/users`);
            const employees = info.filter(item => item.role !== 'Admin');
            return employees;
        }
    });

    useEffect(() => {
        refetch();
    }, [selectedFilter, refetch]);

    const handleFilterChange = (event) => {
        setSelectedFilter(event.target.value);
    };

    const filteredData = data.filter(entry => {
        if (selectedFilter === 'All') return true;
        if (selectedFilter === 'HR' && entry.role === 'HR') return true;
        if (selectedFilter === 'Employee' && entry.role === 'Employee') return true;
        if (selectedFilter === 'Unverified Employee' && entry.verify === false) return true;
        if (selectedFilter === 'Fired Employee' && entry?.fired === true) return true;
        return false;
    });

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <WithLoading>
            <div className="w-[95%] mx-auto sm:pb-24 pb-10 pt-10">
                <div className='sm:pb-12 pb-8'>
                    <p className="text-xl text-pmColor font-montserrat font-bold text-center">Dashboard</p>
                    <h1 className="mt-2 text-2xl font-semibold text-black font-poppins text-center capitalize lg:text-4xl dark:text-white">
                        All Employee Info
                    </h1>
                </div>
                <div className="mb-8 flex justify-end">
                    {/* <label htmlFor="filter" className="mr-2 text-black dark:text-white">Filter:</label> */}
                    <select
                        id="filter"
                        value={selectedFilter}
                        onChange={handleFilterChange}
                        className="py-2 px-4 text-center rounded outline-none bg-pmColor text-white"
                    >
                        <option className="" value="All">All</option>
                        <option className="" value="HR">HR</option>
                        <option className="" value="Employee">Employee</option>
                        <option className="" value="Unverified Employee">Unverified Employee</option>
                        <option className="" value="Fired Employee">Fired Employee</option>
                    </select>
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
                                    Role
                                </th>
                                <th scope="col" className="px-6 text-center text-sm py-3 font-medium text-white uppercase text-nowrap tracking-wider">
                                    Status
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-themeColor">
                            {filteredData.map((entry, index) => (
                                <tr key={entry._id} className={index % 2 === 0 ? 'bg-gray-100 dark:bg-themeColor' : 'bg-white dark:bg-themeColor2'}>
                                    <td className='text-black dark:text-white px-6 py-4'>{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">
                                        <div 
                                         className='w-10 h-10 rounded-full'>
                                            <img className='h-10 w-10 rounded-full object-cover' src={entry?.imgUrl} alt="" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">{entry.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">{entry.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">{entry.role}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">{entry?.fired ? <span className="text-red-500">Fired</span> : <span>Worked</span> }</td>
                                    <td className='text-black dark:text-white px-6 py-4'>{index + 1}</td>
                                </tr>
                            ))} 
                        </tbody>
                    </table>
                </div>
            </div>
        </WithLoading>
    );
};

export default DashBoard;
