import axios from "axios";
import { useEffect, useState } from "react";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import Spinner from "../../../Components/smallComponents/Spinner";
import { GrPowerReset } from "react-icons/gr";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const months = [
    { id: 0, name: "January" },
    { id: 1, name: "February" },
    { id: 2, name: "March" },
    { id: 3, name: "April" },
    { id: 4, name: "May" },
    { id: 5, name: "June" },
    { id: 6, name: "July" },
    { id: 7, name: "August" },
    { id: 8, name: "September" },
    { id: 9, name: "October" },
    { id: 10, name: "November" },
    { id: 11, name: "December" },
];

const Progress = () => {
    const [entries, setEntries] = useState([]);
    // const [allEmployees, setAllEmployees] = useState([]);
    const [employee, setEmployee] = useState('');
    const [query, setQuery] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [monthQuery, setMonthQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [reset, setReset] = useState(false);
    const [totalWorkHours, setTotalWorkHours] = useState(0); // State for total work hours
    const AxiosSecure = useAxiosSecure()


    
    const { data =[], isLoading : load } = useQuery({
        queryKey: ['employeeWorkSheet'],
        queryFn: async () => {

            const { data } = await AxiosSecure.get(`/employeeWorkSheet`);
            return data;
        }

    })


    const { data : allEmployees = [], isLoading : loader } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {

            const { data } = await AxiosSecure.get(`/users`);
            const onlyEmployees = data.filter(item => item.role !== 'Admin');
            return onlyEmployees;
        }

    })

    // Filtered employees based on query
    const filteredEmployees =
        query === ''
            ? allEmployees
            : allEmployees.filter((person) => person.name.toLowerCase().includes(query.toLowerCase()));

    // Filtered months based on monthQuery
    const filteredMonths =
        monthQuery === ''
            ? months
            : months.filter((month) => month.name.toLowerCase().startsWith(monthQuery.toLowerCase()));

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const { data } = await AxiosSecure.get(`/employeeWorkSheet`);
                data.sort((a, b) => {
                    const dateA = new Date(
                        parseInt(a.date.split('/')[2]), // Year
                        parseInt(a.date.split('/')[1]) - 1, // Month (zero-indexed)
                        parseInt(a.date.split('/')[0]) // Day
                    );
                    const dateB = new Date(
                        parseInt(b.date.split('/')[2]), // Year
                        parseInt(b.date.split('/')[1]) - 1, // Month (zero-indexed)
                        parseInt(b.date.split('/')[0]) // Day
                    );
                    return dateB - dateA; // Sort in descending order
                });

                setEntries(data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
        fetchData();
    }, [reset, data]);


    useEffect(() => {
        const fetchFilteredData = async () => {
            setIsLoading(true);
            try {
                let url = `/employeeWorkSheet`;
                if (employee) url += `/${employee}`;
                const { data } = await AxiosSecure.get(url);
                const filteredData = selectedMonth
                    ? data.filter((entry) => {
                        const entryMonth = new Date(
                            parseInt(entry.date.split('/')[2]), // Year
                            parseInt(entry.date.split('/')[1]) - 1, // Month (zero-indexed)
                            parseInt(entry.date.split('/')[0]) // Day
                        ).getMonth();
                        return entryMonth === selectedMonth.id;
                    })
                    : data;

                filteredData.sort((a, b) => {
                    const dateA = new Date(
                        parseInt(a.date.split('/')[2]), // Year
                        parseInt(a.date.split('/')[1]) - 1, // Month (zero-indexed)
                        parseInt(a.date.split('/')[0]) // Day
                    );
                    const dateB = new Date(
                        parseInt(b.date.split('/')[2]), // Year
                        parseInt(b.date.split('/')[1]) - 1, // Month (zero-indexed)
                        parseInt(b.date.split('/')[0]) // Day
                    );
                    return dateB - dateA; // Sort in descending order
                });

                setEntries(filteredData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFilteredData();
    }, [employee, selectedMonth, AxiosSecure]);

    // Calculate total work hours whenever entries or selectedEmployee changes
    useEffect(() => {
        let totalHours = 0;
        entries.forEach(entry => {
            if (!selectedEmployee || entry.employeeEmail === selectedEmployee.email) {
                totalHours += entry.hoursWorked;
            }
        });
        setTotalWorkHours(totalHours);
    }, [entries, selectedEmployee]);

    

    if (isLoading || load || loader) {
        return <Spinner></Spinner>
    }

    return (
        <div className="w-[95%] mx-auto sm:pb-24 pb-10 pt-10">
            <div className='sm:pb-12 pb-8'>
                <p className="text-xl text-pmColor font-montserrat font-bold text-center">Forward Movement</p>
                <h1 className="mt-2 text-2xl font-semibold text-black font-poppins text-center capitalize lg:text-4xl dark:text-white">
                    All Employee Progress
                </h1>
            </div>
            <div className="flex sm:flex-row flex-col sm:justify-end justify-center gap-4 items-center mb-8">
                <button onClick={() => {
                    setReset(!reset)
                    setMonthQuery('')
                    setEmployee('')
                    setSelectedMonth(null)
                    setSelectedEmployee(null)
                    setQuery('')
                    setSelectedMonth(null)
                }} className="'w-full rounded-lg placeholder:text-white border-none bg-secColor py-1.5 text-sm/6 text-white text-opacity-95 px-3 group relative inline-flex h-9 items-center justify-center overflow-hidden">
                    <span className="text-sm">Reset</span>
                    <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
                        <GrPowerReset className="font-bold ml-1"/>
                    </div>
                </button>
                <div className="w-52 h-full">
                    <Combobox value={selectedEmployee} onChange={(value) => setSelectedEmployee(value)}>
                        <div className="relative">
                            <ComboboxInput placeholder="Select Employee"
                                className={clsx(
                                    'w-full rounded-lg placeholder:text-white border-none bg-secColor py-1.5 pr-8 pl-3 text-sm/6 text-white',
                                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                )}
                                displayValue={(person) => person?.name}
                                onChange={(event) => setQuery(event.target.value)}
                            />
                            <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5 hover:bg-pmColor rounded-lg duration-200">
                                <ChevronDownIcon className="size-4 fill-white" />
                            </ComboboxButton>
                        </div>
                        <Transition
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            afterLeave={() => setQuery('')}
                        >
                            <ComboboxOptions
                                anchor="bottom"
                                className="w-[var(--input-width)] rounded-xl border border-white/5 dark:bg-secColor bg-secColor p-1 [--anchor-gap:var(--spacing-1)] empty:hidden block mt-1 shadow-2xl max-h-48 min-h-fit overflow-y-auto"
                            >
                                {filteredEmployees.map((person) => (
                                    <ComboboxOption
                                        onClick={() => setEmployee(person.email)}
                                        key={person.id}
                                        value={person}
                                        className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                                    >
                                        <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                                        <div className="text-sm/6 text-white">{person.name}</div>
                                    </ComboboxOption>
                                ))}
                            </ComboboxOptions>
                        </Transition>
                    </Combobox>
                </div>
                <div className="w-52 h-full">
                    <Combobox value={selectedMonth} onChange={(value) => setSelectedMonth(value)}>
                        <div className="relative">
                            <ComboboxInput placeholder="Select Month"
                                className={clsx(
                                    'w-full rounded-lg placeholder:text-white border-none bg-secColor py-1.5 pr-8 pl-3 text-sm/6 text-white',
                                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                )}
                                displayValue={(month) => month?.name}
                                onChange={(event) => setMonthQuery(event.target.value)}
                            />
                            <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5 hover:bg-pmColor rounded-lg duration-200">
                                <ChevronDownIcon className="size-4 fill-white" />
                            </ComboboxButton>
                        </div>
                        <Transition
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            afterLeave={() => setMonthQuery('')}
                        >
                            <ComboboxOptions
                                anchor="bottom"
                                className="w-[var(--input-width)] rounded-xl border border-white/5 dark:bg-secColor bg-secColor p-1 [--anchor-gap:var(--spacing-1)] empty:hidden block mt-1 shadow-2xl max-h-48 min-h-fit overflow-y-auto"
                            >
                                {filteredMonths.map((month) => (
                                    <ComboboxOption
                                        onClick={() => setSelectedMonth(month)}
                                        key={month.id}
                                        value={month}
                                        className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                                    >
                                        <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                                        <div className="text-sm/6 text-white">{month.name}</div>
                                    </ComboboxOption>
                                ))}
                            </ComboboxOptions>
                        </Transition>
                    </Combobox>
                </div>
            </div>

            {/* Total Work Hours Section */}
            <div className="flex justify-center mb-4">
                <p className="text-lg font-semibold text-center text-black dark:text-white">Total Work Hours:</p>
                <p className="ml-2 text-lg font-semibold text-center text-pmColor">{totalWorkHours} hours</p>
            </div>

            {/* Table of Entries */}
            {entries.length > 0 ? (
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
                                    Task
                                </th>
                                <th scope="col" className="px-6 text-center text-sm py-3 font-medium text-white uppercase text-nowrap tracking-wider">
                                    Work Hours
                                </th>
                                <th scope="col" className="px-6 text-center text-sm py-3 font-medium text-white uppercase text-nowrap tracking-wider">
                                    Date/Month/Year
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-themeColor">
                            {entries.map((entry, index) => (
                                <tr key={entry._id} className={index % 2 === 0 ? 'bg-gray-100 dark:bg-themeColor' : 'bg-white dark:bg-themeColor2'}>
                                    <td className='text-black dark:text-white px-6 py-4'>{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">
                                        <div className='w-10 h-10 rounded-full'>
                                            <img className='h-10 w-10 rounded-full object-cover' src={entry?.employeePhoto} alt="" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">{entry.employeeName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">{entry.employeeEmail}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">{entry.tasks}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">{entry.hoursWorked} hours</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">{entry.date}</td>
                                    <td className='text-black dark:text-white px-6 py-4'>{index + 1}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <h1 className="text-black dark:text-white text-2xl font-poppins font-semibold mx-auto text-center">No Data Found</h1>
            )}
        </div>
    );
};

export default Progress;
