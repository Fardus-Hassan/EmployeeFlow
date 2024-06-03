import React, { useState, useEffect, useRef } from 'react';

const testimonials = [
    {
        id: 1,
        name: 'Ema Watson',
        position: 'Marketing Manager at Stech',
        photo: 'https://images.pexels.com/photos/532220/pexels-photo-532220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        testimonial: '“Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad tempora doloribus expedita laborum saepe voluptas perferendis delectus assumenda”.'
    },
    {
        id: 2,
        name: 'John Doe',
        position: 'CEO at Company',
        photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        testimonial: '“Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur”.'
    },
    {
        id: 3,
        name: 'Jane Smith',
        position: 'CTO at TechCorp',
        photo: 'https://images.pexels.com/photos/10031556/pexels-photo-10031556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        testimonial: '“Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur”.'
    }
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState('right');
    const [animate, setAnimate] = useState(false);
    const slideInterval = useRef(null);

    const startSlideInterval = () => {
        slideInterval.current = setInterval(() => {
            setDirection('right');
            setAnimate(true);
            setCurrentIndex(prevIndex => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
        }, 5000);
    };

    const resetSlideInterval = () => {
        clearInterval(slideInterval.current);
        startSlideInterval();
    };

    const handlePrevClick = () => {
        setDirection('left');
        setAnimate(true);
        setCurrentIndex(prevIndex => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
        resetSlideInterval();
    };

    const handleNextClick = () => {
        setDirection('right');
        setAnimate(true);
        setCurrentIndex(prevIndex => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
        resetSlideInterval();
    };

    useEffect(() => {
        startSlideInterval();
        return () => {
            clearInterval(slideInterval.current);
        };
    }, []);

    useEffect(() => {
        if (animate) {
            const timeout = setTimeout(() => {
                setAnimate(false);
            }, 300); // Match animation duration here
            return () => clearTimeout(timeout);
        }
    }, [animate]);

    const currentTestimonial = testimonials[currentIndex];

    return (
        <section className="bg-white dark:bg-gray-900">
            <style>{`
                @keyframes slide-in-right {
                    from {
                        opacity: 0;
                        transform: translateX(100%);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                @keyframes slide-out-right {
                    from {
                        opacity: 1;
                        transform: translateX(0);
                    }
                    to {
                        opacity: 0;
                        transform: translateX(-100%);
                    }
                }
                @keyframes slide-in-left {
                    from {
                        opacity: 0;
                        transform: translateX(-100%);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                @keyframes slide-out-left {
                    from {
                        opacity: 1;
                        transform: translateX(0);
                    }
                    to {
                        opacity: 0;
                        transform: translateX(100%);
                    }
                }
                .slide-in-right {
                    animation: slide-in-right 0.3s forwards;
                }
                .slide-out-right {
                    animation: slide-out-right 0.3s forwards;
                }
                .slide-in-left {
                    animation: slide-in-left 0.3s forwards;
                }
                .slide-out-left {
                    animation: slide-out-left 0.3s forwards;
                }
            `}</style>
            <div className="max-w-6xl px-6 py-10 mx-auto">
                <p className="text-xl font-medium text-blue-500">Testimonials</p>
                <h1 className="mt-2 text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
                    What clients are saying
                </h1>
                <main className="relative z-20 w-full mt-8 md:flex md:items-center xl:mt-12">
                    <div className={`absolute w-full bg-pmColor -z-10 md:h-96 rounded-2xl`}></div>
                    <div className={`w-full p-6 bg-pmColor md:flex md:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-12 md:justify-evenly ${animate ? (direction === 'right' ? 'slide-in-right' : 'slide-in-left') : ''}`}>
                        <img
                            className={`h-24 w-24 md:mx-6 rounded-full object-cover shadow-md md:h-[32rem] md:w-80 lg:h-[36rem] lg:w-[26rem] md:rounded-2xl ${animate ? (direction === 'right' ? 'slide-in-right' : 'slide-in-left') : ''}`}
                            src={currentTestimonial.photo}
                            alt={currentTestimonial.name}
                        />
                        <div className={`mt-2 md:mx-6 ${animate ? (direction === 'right' ? 'slide-in-right' : 'slide-in-left') : ''}`}>
                            <div>
                                <p className="text-xl font-medium tracking-tight text-white">{currentTestimonial.name}</p>
                                <p className="text-white opacity-70">{currentTestimonial.position}</p>
                            </div>
                            <p className="mt-4 text-lg leading-relaxed text-white md:text-xl">
                                {currentTestimonial.testimonial}
                            </p>
                            <div className="flex items-center justify-between mt-6 md:justify-start">
                                <button
                                    title="left arrow"
                                    className="p-2 text-white transition-colors duration-300 border rounded-full rtl:-scale-x-100 hover:bg-blue-400"
                                    onClick={handlePrevClick}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    title="right arrow"
                                    className="p-2 text-white transition-colors duration-300 border rounded-full rtl:-scale-x-100 md:mx-6 hover:bg-blue-400"
                                    onClick={handleNextClick}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </section>
    );
};

export default Testimonials;
