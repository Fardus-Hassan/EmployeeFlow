
import Scroll from "../../Components/smallComponents/Scroll";
import WithLoading from "../../Components/smallComponents/WithLoading";
import AboutUs from "./HomeComponents/AboutUs";
import Banner from "./HomeComponents/Banner";
import OurAchievement from "./HomeComponents/OurAchievement,";
import Services from "./HomeComponents/Services";
import Testimonials from "./HomeComponents/Testimonials";



const Home = () => {



    return (
        <WithLoading>
            <div>
                <Banner></Banner>
                <Services></Services>
                <AboutUs></AboutUs>
                <OurAchievement></OurAchievement>
                <Testimonials></Testimonials>
                <Scroll></Scroll>
            </div>
        </WithLoading>
    );
};

export default Home;