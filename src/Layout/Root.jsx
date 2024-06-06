import { Outlet } from "react-router-dom";
import NavBar from "../Sheared/NavBar";
import Footer from "../Sheared/Footer";
import Toggle from "../Components/Theme/Toggle";
import ScrollToTop from "../Components/smallComponents/ScrollToTop";
import Scroll from "../Components/smallComponents/Scroll";

const Root = () => {



    return (
        <div>
            <div>

                <NavBar></NavBar>
            </div>

            <div className="xl:max-w-[calc(100vw-240px)] xl:ml-[240px] mx-auto dark:bg-themeColor bg-white">
                <div className="min-h-[calc(100vh-104px)]">
                    <ScrollToTop>
                        <Toggle></Toggle>
                        <Outlet></Outlet>
                        <Scroll></Scroll>
                    </ScrollToTop>
                </div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Root;