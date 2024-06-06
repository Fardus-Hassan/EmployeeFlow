

const Services = () => {

    const items = [1, 2, 3, 4, 5, 6]

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
                            <img className="object-cover w-full h-56" src="https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="avatar" />

                            <div className="text-center pb-5">
                                <a href="#" className="block text-xl font-bold text-gray-800 dark:text-white py-5" tabindex="0" role="link">Seamless Onboarding and Smooth Exits</a>
                                <span className="text-sm text-gray-700 dark:text-gray-200"> Ensure efficient employee transitions with automated checklists, document management, and streamlined onboarding and offboarding processes.</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Services;