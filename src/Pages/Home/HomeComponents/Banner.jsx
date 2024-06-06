import { Typewriter } from "react-simple-typewriter";

const Banner = () => {
    return (
        <div>

            <div className="w-full h-[90vh] relative bg-fixed bg-no-repeat bg-cover bg-center" style={{backgroundImage: `url("https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`}}>
                {/* <img className="w-full h-[80vh] object-cover" src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" /> */}
                <div className="bg-black bg-opacity-50 w-full h-full absolute top-0 flex justify-center items-center">
                   <div>
                   <h1 className=' max-w-[600px] mx-auto text-center text-white lg:text-[46px] text-[35px] font-black font-poppins'>Empowering Workforce <span className='text-pmColor'><Typewriter
                        words={['Productivity', 'Performance', 'Effectiveness']}
                        typeSpeed={100}
                        deleteSpeed={50}
                        delaySpeed={3000}
                        cursorStyle='_'
                        autoStart={true}
                        loop={true}
                        cursor='pointer'
                    /></span></h1>
                    <p className='max-w-[800px] w-[95%] mx-auto text-center font-medium text-white lg:text-[16px] text-[14px] mt-4 mb-8 font-montserrat'>Streamline HR tasks, boost productivity, and foster collaboration with our innovative workforce management solutions. Join us for efficiency.</p>
                   </div>
                </div>
            </div>

        </div>
    );
};

export default Banner;
