

const Services = () => {

    const items = [
        {
            image: "https://images.pexels.com/photos/20639510/pexels-photo-20639510/free-photo-of-electronic-devices-in-an-office.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Attendance Tracking",
            description: "Effortless employee attendance monitoring and reporting."
        },
        {
            image: "https://www.hono.ai/public/uploads/images/202405/image_750x415_1716859798_791b4161a40601501d66.jpg",
            title: "Performance Evaluation",
            description: "Comprehensive employee performance reviews and feedback."
        },
        {
            image: "https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Payroll Management",
            description: "Streamlined payroll processing and tax management."
        },
        {
            image: "https://www.orangehrm.com/assets/Uploads/Leave-Time-Off-Management-System.jpg",
            title: "Leave Management",
            description: "Efficient tracking and management of employee leaves."
        },
        {
            image: "https://images.pexels.com/photos/4344860/pexels-photo-4344860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "HR Analytics",
            description: "Insightful data-driven analytics for better HR decision-making."
        },
        {
            image: "https://images.pexels.com/photos/7709242/pexels-photo-7709242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Employee Self-Service",
            description: "Empower employees with self-service options for HR tasks."
        }
    ]

    return (
        <div className='sm:my-[100px] my-16 w-[95%] mx-auto'>
            <div className='sm:pb-12 pb-8'>
                <p className="text-xl text-pmColor font-montserrat font-bold text-center">Our Services</p>
                <h1 className="mt-2 text-2xl font-semibold text-black font-poppins text-center capitalize lg:text-4xl dark:text-white">
                    services we provide
                </h1>
            </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-6'>
                {
                    items.map((item, index) => (
                        <div key={index} className="w-full overflow-hidden bg-white rounded-lg shadow-lg dark:bg-themeColor2">
                            <div className="relative overflow-hidden">
                                <img className="object-cover object-top w-full h-[300px] transition-transform duration-500 transform hover:scale-110" src={item.image} alt="avatar" />
                            </div>

                            <div className="text-center p-5">
                                <a href="#" className="block text-xl font-bold text-gray-800 dark:text-white pt-5" role="link">{item.title}</a>
                                <span className="text-sm text-gray-700 dark:text-gray-200 block pt-3">{item.description}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Services;