import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import './checkOutFrom.css'
import { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { GlobalStateContext } from '../../Global/GlobalContext';
import toast from 'react-hot-toast';
import { ImSpinner9 } from "react-icons/im";

const CheckOutFrom = ({ salary, email, closeModal, isPayed }) => {

    const { user } = useContext(GlobalStateContext)
    const [clientSecret, setClientSecret] = useState()
    const [cardError, setCardError] = useState()
    const AxiosSecure = useAxiosSecure()
    const [processing, setProcessing] = useState(false)

    const stripe = useStripe();
    const elements = useElements();

    console.log(isPayed);

    useEffect(() => {
        if (salary && salary > 1) {
            getClientSecret(salary)
        }
    }, [salary])

    const getClientSecret = async (salary) => {
        const { data } = await AxiosSecure.post(`/create-payment-intent`, { price: salary })
        setClientSecret(data.clientSecret)
    }


    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        setProcessing(true)

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: card,
        })

        if (error) {
            setCardError(error.message)
            setProcessing(false)
        } else {
            setCardError('')
        }


        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {

            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName,
                    email: user?.email,
                },
            }

        })

        if (confirmError) {
            setCardError(confirmError.message)
            setProcessing(false)
        } else {
            setCardError('')
        }


        if (paymentIntent.status === 'succeeded') {

            const date = new Date()
            let day = date.getDate();
            let month = date.toLocaleString('en-US', { month: 'short' }); // 'Jun'
            let year = date.getFullYear(); // 2024
            console.log(month, year);

            const payment = {
                day: day,
                month: `${month}'${year}`,
                year: year,
                amount: salary,
                transactionId: paymentIntent.id,
                email: email
            }

            console.log(payment);

            const sentPayment = async () => {
                const { data } = await AxiosSecure.post('/payment-history', payment)
                if(data.acknowledged){
                    toast.success('payment successful')
                    closeModal()
                }
            }


            sentPayment()
            setProcessing(false)


        }


    }

    return (
        <div>
            {
                isPayed ? "": <form className='mt-6' onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#fff',
                                '::placeholder': {
                                    color: '#fff',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div>
                    {cardError && <p className=' text-red-500 text-sm pb-3 text-center'>{cardError}</p>}
                    <div className="sm:flex sm:items-center w-full">
                        <span onClick={closeModal} className="w-full block px-4 text-center py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100">
                            Cancel
                        </span>
                        <button type="submit" disabled={!stripe || !clientSecret || processing} className="group relative inline-flex w-full sm:mt-0 mt-3 text-center mx-auto h-9 items-center justify-center overflow-hidden rounded-md bg-secColor px-5 font-medium text-white">
                            {processing ? <span className="text-sm animate-spin"><ImSpinner9 className='text-white text-xl' /></span> : <span className="text-sm">Pay</span>}
                        </button>
                    </div>
                </div>
            </form>
            }
        </div>
    );
};

export default CheckOutFrom;