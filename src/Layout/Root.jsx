import { Outlet } from "react-router-dom";
import NavBar from "../Sheared/NavBar";
import Footer from "../Sheared/Footer";

const Root = () => {
    return (
        <div className="flex">
            <div>
            <NavBar></NavBar>
            </div>
            <div className="w-full max-h-screen overflow-y-auto">
                <div className="min-h-[calc(100vh-104px)] ">
                    <Outlet></Outlet>
                </div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Root;