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
import AllEmployeeList from "../Pages/DashBoard/Admin/AllEmployeeList";
import AdminRoute from "./AdminRoute";
import DashBoard from "../Pages/DashBoard/DashBoard";
import HrRoute from "./HrRoute";
import EmployeeRoute from "./EmployeeRoute";
import ContactUs from "../Pages/DashBoard/Admin/ContactUs";

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
                element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
            },
            {
                path: "/dashboard/work-sheet",
                element: <EmployeeRoute><PrivateRoute><WorkSheet></WorkSheet></PrivateRoute></EmployeeRoute>,
            },
            {
                path: "/dashboard/payment-history",
                element: <EmployeeRoute><PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute></EmployeeRoute>,
            },
            {
                path: "/dashboard/employee-list",
                element: <HrRoute><PrivateRoute><EmployeeList></EmployeeList></PrivateRoute></HrRoute>,
            },
            {
                path: "/dashboard/progress",
                element: <HrRoute><PrivateRoute><Progress></Progress></PrivateRoute></HrRoute>,
            },
            {
                path: "/dashboard/detail/:email",
                element: <HrRoute><PrivateRoute><Details></Details></PrivateRoute></HrRoute>,
            },
            {
                path: "/dashboard/all-employee-list",
                element: <AdminRoute><PrivateRoute><AllEmployeeList></AllEmployeeList></PrivateRoute></AdminRoute>,
            },
            {
                path: "/dashboard/contact",
                element: <AdminRoute><PrivateRoute><ContactUs></ContactUs></PrivateRoute></AdminRoute>,
            },

        ],
    },
]);

export default Route;