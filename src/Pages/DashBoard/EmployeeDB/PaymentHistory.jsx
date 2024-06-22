import { useContext } from "react";
import { GlobalStateContext } from "../../../Global/GlobalContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {

    const { user } = useContext(GlobalStateContext)
    const AxiosSecure = useAxiosSecure()


    // const entries = [
    //     {
    //         month: "16/06/2024",
    //         amount: "30000",
    //         transactionId: "5346783fgh544"

    //     },
    //     {
    //         month: "16/06/2024",
    //         amount: "30000",
    //         transactionId: "5346783fgh544"

    //     },
    //     {
    //         month: "16/06/2024",
    //         amount: "30000",
    //         transactionId: "5346783fgh544"

    //     },
    //     {
    //         month: "16/06/2024",
    //         amount: "30000",
    //         transactionId: "5346783fgh544"

    //     }
    // ];


    const { data: entries = [], isLoading, refetch } = useQuery({
        queryKey: ['payment-history', user?.email],
        queryFn: async () => {

            const { data } = await AxiosSecure.get(`/payment-history/${user?.email}`);
            return data;
        }

    })


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
                                    MOUNT/YEAR
                                </th>
                                <th scope="col" className="px-6 text-center text-sm py-3 font-medium text-white uppercase text-nowrap tracking-wider">
                                    Amount
                                </th>
                                <th scope="col" className="px-6 text-center text-sm py-3 font-medium text-white uppercase text-nowrap tracking-wider">
                                    Transaction Id
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-themeColor">
                            {entries.map((entry, index) => (
                                <tr key={entry._id} className={index % 2 === 0 ? 'bg-gray-100 dark:bg-themeColor' : 'bg-white dark:bg-themeColor2'}>
                                    <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">{entry.month}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">{entry.amount} taka</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-black text-sm dark:text-white font-semibold text-center">{entry.transactionId}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </>
    );
};

export default PaymentHistory;