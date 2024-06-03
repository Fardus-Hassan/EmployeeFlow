import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Contact from "../Pages/Contact/Contact";
import Error from "../Sheared/Error";
import DashBoard from "../Pages/DashBoard/DashBoard";

const Route = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <Error></Error>,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
            {
                path: "/contact",
                element: <Contact></Contact>,
            },
            {
                path: "/dashboard",
                element: <DashBoard></DashBoard>,
            }
        ],
    },
    // {
    //     path: "/login",
    //     element:<Login></Login>,
    // },
    // {
    //     path: "/register",
    //     element: <Register></Register>,
    // }
]);

export default Route;