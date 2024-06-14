import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";

const Banner = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

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

    return (
        <div>
            <div className="w-full h-[95vh] relative bg-fixed bg-no-repeat bg-cover bg-center transition-transform duration-500 ease-out" style={{
                backgroundImage: `url("https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
                // transform: `translateY(${scrollPosition / -15}px)`
            }}>
                <div className="bg-black bg-opacity-50 w-full h-full absolute top-0 flex justify-center items-center transition-opacity duration-300 ease-in-out">
                    <div className="w-[95%] mx-auto transition-transform duration-500 ease-out" style={{
                        // transform: `translateY(${scrollPosition / -1.5}px)`
                    }}>
                        <h1 className={`mx-auto text-center text-white overflow-hidden lg:text-[46px] text-[35px] font-black font-poppins`}> <span className="sm:flex sm:justify-center sm:items-center gap-5"><span className={`duration-100 ease-out block`} style={{
                                transform: `translateX(${scrollPosition / -1}px)`
                            }}>Empowering</span> <span
                            className={`duration-100 ease-out block`} style={{
                                transform: `translateX(${scrollPosition / 1}px)`
                            }}>Workforce</span> </span>
                            <span className={`text-pmColor duration-100 ease-out block`}  style={{
                                transform: `translateY(${scrollPosition / -5}px)`
                            }}><Typewriter
                            words={['Productivity', 'Performance', 'Effectiveness']}
                            typeSpeed={100}
                            deleteSpeed={50}
                            delaySpeed={3000}
                            cursorStyle='_'
                            autoStart={true}
                            loop={true}
                            cursor='pointer'
                        /></span></h1>
                        <p className='max-w-[800px] w-[95%] mx-auto text-center duration-100 ease-out block font-medium text-white lg:text-[16px] text-[14px] mt-4 mb-8 font-montserrat' style={{
                                transform: `translateY(${scrollPosition / 5}px)`
                            }}>Streamline HR tasks, boost productivity, and foster collaboration with our innovative workforce management solutions. Join us for efficiency.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
