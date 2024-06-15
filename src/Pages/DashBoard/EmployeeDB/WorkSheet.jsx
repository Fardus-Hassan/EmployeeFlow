import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const WorkSheet = () => {
    const [tasks, setTasks] = useState('');
    const [hoursWorked, setHoursWorked] = useState('');
    const [date, setDate] = useState(new Date());
    const [entries, setEntries] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!tasks || !hoursWorked) return; // basic validation

        // Create a new entry object
        const newEntry = {
            id: new Date().getTime(), // simple unique id
            tasks,
            hoursWorked: parseFloat(hoursWorked), // convert to number
            date: date.toLocaleDateString(), // format date as string
        };

        // Add the new entry to the entries array
        setEntries([...entries, newEntry]);

        // Clear the form fields
        setTasks('');
        setHoursWorked('');
        setDate(new Date());
    };

    return (
        <div className="w-[95%] mx-auto py-24">
            {/* Form section */}
            <form onSubmit={handleSubmit} className="w-full">
    <div className="mb-4 flex sm:justify-center items-center gap-4 sm:overflow-visible overflow-x-auto">
        <div className="w-full border border-pmColor rounded-md min-w-[125px]">
            <select
                id="tasks"
                name="tasks"
                value={tasks}
                onChange={(e) => setTasks(e.target.value)}
                className="block w-full text-center border-none shadow-sm rounded-md text-sm p-3 dark:bg-themeColor2 text-black dark:text-white font-montserrat font-semibold"
                required
            >
                <option value="" className='font-montserrat font-medium'>Select Task</option>
                <option value="Sales" className='font-montserrat font-medium'>Sales</option>
                <option value="Support" className='font-montserrat font-medium'>Support</option>
                <option value="Content" className='font-montserrat font-medium'>Content</option>
                <option value="Paper-work" className='font-montserrat font-medium'>Paper-work</option>
            </select>
        </div>
        <div className="w-full border border-pmColor rounded-md min-w-[125px]">
            <input
                type="number"
                id="hoursWorked"
                name="hoursWorked"
                placeholder='Hours Worked'
                value={hoursWorked}
                onChange={(e) => setHoursWorked(e.target.value)}
                className="block w-full text-center dark:bg-themeColor2 placeholder:text-white dark:text-white rounded-md outline-none shadow-sm text-sm p-3 font-montserrat font-semibold"
                required
            />
        </div>
        <div className="relative w-full border border-pmColor rounded-md min-w-[125px]">
            <DatePicker
                id="date"
                selected={date}
                onChange={(date) => setDate(date)}
                className="block w-full text-center p-3 pr-4 dark:text-white dark:bg-themeColor2 rounded-md shadow-sm text-sm outline-none font-montserrat font-semibold"
                dateFormat="dd/MM/yyyy"
            />
        </div>
        <div className="w-full min-w-[125px]">
            <button
                type="submit"
                className="py-3 w-full rounded-md shadow-sm text-sm font-semibold font-poppins text-white bg-pmColor hover:bg-secColor"
            >
                Submit
            </button>
        </div>
    </div>
</form>


            {/* Table section */}
            <div className="w-full  overflow-x-auto rounded-lg mt-10 border border-pmColor">
                <table className="min-w-full">
                    <thead className="bg-secColor">
                        <tr>
                            <th scope="col" className="px-6 text-center text-sm py-3 font-medium text-white uppercase text-nowrap tracking-wider">
                                Task
                            </th>
                            <th scope="col" className="px-6 text-center text-sm py-3 font-medium text-white uppercase text-nowrap tracking-wider">
                                Hours Worked
                            </th>
                            <th scope="col" className="px-6 text-center text-sm py-3 font-medium text-white uppercase text-nowrap tracking-wider">
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-themeColor divide-y divide-gray-200">
                        {entries.map(entry => (
                            <tr key={entry.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">{entry.tasks}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">{entry.hoursWorked}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">{entry.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WorkSheet;
