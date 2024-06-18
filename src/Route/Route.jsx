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
import EmployeeList from "../Pages/DashBoard/HRDB/EmployeeList";
import Progress from "../Pages/DashBoard/HRDB/Progress";
import Details from "../Pages/DashBoard/HRDB/Details";

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
            {
                path: "/dashboard/employee-list",
                element: <PrivateRoute><EmployeeList></EmployeeList></PrivateRoute>,
            },
            {
                path: "/dashboard/progress",
                element: <PrivateRoute><Progress></Progress></PrivateRoute>,
            },
            {
                path: "/dashboard/detail/:email",
                element: <PrivateRoute><Details></Details></PrivateRoute>,
            },

        ],
    },
]);

export default Route;