import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Contact from "../Pages/Contact/Contact";
import Error from "../Sheared/Error";
import WorkSheet from "../Pages/DashBoard/EmployeeDB/WorkSheet";
import PaymentHistory from "../Pages/DashBoard/EmployeeDB/PaymentHistory";
import PrivateRoute from "./PrivateRoute";

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
                path: "/dashboard/work-sheet",
                element: <PrivateRoute><WorkSheet></WorkSheet></PrivateRoute>,
            },
            {
                path: "/dashboard/payment-history",
                element: <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>,
            },
        ],
    },
]);

export default Route;