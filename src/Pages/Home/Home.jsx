import Banner from "./HomeComponents/Banner";
import Testimonials from "./HomeComponents/Testimonials";



const Home = () => {

    const currentUrl = window.location.href;
    console.log(currentUrl);
    
    return (
        <div>
            <Banner></Banner>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;