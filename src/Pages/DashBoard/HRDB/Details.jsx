
import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import WithLoading from '../../../Components/smallComponents/WithLoading';
import { MdVerifiedUser } from "react-icons/md";
import { RxCross2 } from 'react-icons/rx';
import { FaUserLarge } from "react-icons/fa6";
import { BsBank } from "react-icons/bs";
import { TbCoinTakaFilled } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import { FaSquarePhone } from "react-icons/fa6";
import { FaFileCircleCheck } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";

const Details = () => {


    const { email } = useParams();
    const [data, setData] = useState({});
    console.log(data);

    const len = [1,2,3,4,5,6,7,8,9,10,11,12,]

    const wid = len.length * 100;
    // const widString = wid.toString();

    // console.log(widString);



    const option = {

        tooltip: {},
        xAxis: {
            data: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",]
        },
        yAxis: [{ type: 'value', position: 'left' }],
        series: [{
            name: 'Salary',
            type: 'bar',
            itemStyle: {
                color: '#44bd32' // Change the color to blue
            },
            label: {
                show: true,
                position: 'top',
                formatter: '{c}', // Display the data value
                color: '#6E7079' // Color of the label text
            },

            // data: [
            //     { value: 10000, itemStyle: { color: '#FF5733' } }, // January - Red
            // ],
            data: [
                { value: 80000, },
                { value: 50000, },
                { value: 20000, },
                { value: 70000, },
                { value: 30000, },
                { value: 90000, },
                { value: 80000, },
                { value: 40000, },
                { value: 100000, },
                { value: 12000, },
                { value: 60000, },
                { value: 10000, },
            ],
        }],
        // yAxis: [ { type: 'value', position: 'right' }]
        grid: {
            left: 25,
            right: 25,
            top: 25,
            bottom: 25,
            containLabel: true
        },
    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/users/${email}`);
                setData(response.data); // Assuming response.data is an object containing the user info
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [email]);
    return (
        <WithLoading>
            <div className='sm:pb-24 pb-10 pt-10 max-w-screen'>
                <div className='sm:pb-12 pb-8 w-[95%] mx-auto'>
                    <p className='text-xl text-pmColor font-montserrat font-bold text-center'>Employee Detail</p>
                    <h1 className='mt-2 text-2xl font-semibold text-black font-poppins text-center capitalize lg:text-4xl dark:text-white'>
                        Personal Details</h1>
                </div>
                <div className='flex md:flex-row flex-col justify-between mb-10 gap-5 w-[95%] mx-auto'>
                    <div className='2xl:w-[20%] md:w-[30%] w-full sm:h-[500px] h-[300px] lg:h-[300px] bg-white dark:bg-themeColor2 rounded-2xl shadow-2xl'>
                        <img className='w-full object-cover h-full rounded-2xl' src={data.imgUrl} alt="" />
                    </div>
                    <div className='flex-1 grid lg:grid-cols-4 grid-cols-2 gap-5'>

                        <div className='text-center bg-white dark:text-white text-black dark:bg-themeColor2 2xl:px-10 px-5 py-5 rounded-2xl shadow-2xl'>
                            <div className='flex flex-col justify-center items-center h-full'>
                                <FaUserCircle className='text-3xl text-secColor mb-3' />
                                <h1 className='font-poppins font-semibold'>{data.name}</h1>
                            </div>
                        </div>
                        <div className='text-center bg-white dark:text-white text-black dark:bg-themeColor2 px-10 py-5 rounded-2xl shadow-2xl'>
                            <div className='flex flex-col justify-center items-center h-full'>
                                <FaFileCircleCheck className='text-3xl text-secColor mb-3' />
                                <h1 className='font-poppins font-semibold'>{data.designation}</h1>
                            </div>
                        </div>
                        <div className='text-center bg-white dark:text-white text-black dark:bg-themeColor2 2xl:px-10 px-5 py-5 rounded-2xl shadow-2xl'>
                            <div className='flex flex-col justify-center items-center h-full'>
                                <FaSquarePhone className='text-3xl text-secColor mb-3' />
                                <h1 className='font-poppins font-semibold'>{data.phone}</h1>
                            </div>
                        </div>
                        <div className='text-center bg-white dark:text-white text-black dark:bg-themeColor2 2xl:px-10 px-5 py-5 rounded-2xl shadow-2xl'>
                            <div className='flex flex-col justify-center  h-full overflow-auto'>
                                <MdEmail className='text-3xl text-secColor mb-3 mx-auto' />
                                <h1 className='font-poppins font-semibold'>{data.email}</h1>
                            </div>
                        </div>
                        <div className='text-center bg-white dark:text-white text-black dark:bg-themeColor2 2xl:px-10 px-5 py-5 rounded-2xl shadow-2xl'>
                            <div className='flex flex-col justify-center items-center h-full'>
                                <TbCoinTakaFilled className='text-[34px] text-secColor mb-3' />
                                <h1 className='font-poppins font-semibold'>{data.salary} taka</h1>
                            </div>
                        </div>
                        <div className='text-center bg-white dark:text-white text-black dark:bg-themeColor2 2xl:px-10 px-5 py-5 rounded-2xl shadow-2xl'>
                            <div className='flex flex-col justify-center h-full overflow-auto'>
                                <BsBank className='text-3xl text-secColor mb-3 mx-auto' />
                                <h1 className='font-poppins font-semibold'>{data.bankAccount}</h1>
                            </div>
                        </div>
                        <div className='text-center bg-white dark:text-white text-black dark:bg-themeColor2 2xl:px-10 px-5 py-5 rounded-2xl shadow-2xl'>
                            <div className='flex flex-col justify-center items-center h-full'>
                                <FaUserLarge className='text-[26px] text-secColor mb-3' />
                                <h1 className='font-poppins font-semibold'>{data.role}</h1>
                            </div>
                        </div>
                        <div className='text-center bg-white dark:text-white text-black dark:bg-themeColor2 2xl:px-10 px-5 rounded-2xl shadow-2xl'>
                            <div className='flex flex-col justify-center items-center h-full'>
                                {data.verify ? <MdVerifiedUser className='text-3xl text-secColor mb-3' /> : <RxCross2 className={`text-3xl text-white rounded-full p-1 bg-red-500 mb-3`} />}
                                <h1 className='font-poppins font-semibold'>{data.verify ? "Verified" : "Unverified"}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`overflow-x-auto mx-5`}>
                    <ReactECharts className={`min-h-[500px] min-w-[calc(100vw-300px)]`} option={option} style={{ width: wid, padding: 0, margin: 0 }} opts={{ renderer: 'svg' }} />
                </div>
            </div>
        </WithLoading>
    );
};

export default Details;