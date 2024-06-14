
import Scroll from "../../Components/smallComponents/Scroll";
import WithLoading from "../../Components/smallComponents/WithLoading";
import AboutUs from "./HomeComponents/AboutUs";
import Banner from "./HomeComponents/Banner";
import Services from "./HomeComponents/Services";
import Testimonials from "./HomeComponents/Testimonials";



const Home = () => {



    return (
        <WithLoading>
            <div>
                <Banner></Banner>
                <Services></Services>
                <Testimonials></Testimonials>
                <AboutUs></AboutUs>
                <Scroll></Scroll>
            </div>
        </WithLoading>
    );
};

export default Home;