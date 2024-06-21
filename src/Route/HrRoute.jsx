import { Navigate } from "react-router-dom";
import Spinner from "../Components/smallComponents/Spinner";
import { useContext, useEffect, useState} from "react";
import { GlobalStateContext } from "../Global/GlobalContext";
import WithLoading from "../Components/smallComponents/WithLoading";
import useAxiosSecure from "../hooks/useAxiosSecure";


const HrRoute = ({ children }) => {
    const { user, logout, } = useContext(GlobalStateContext);
    const [loading, setLoading] = useState(true)
    const AxiosSecure = useAxiosSecure();
    const [role, setRole] = useState()


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data } = await AxiosSecure.get(`/users/${user?.email}`);
                setRole(data.role);
            } catch (error) {
                console.error("Error fetching user role:", error);
                // Handle error (e.g., redirect to login page)
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchData();
        }
    }, [user?.email, AxiosSecure]);


    if (loading) {
        return <Spinner></Spinner>;
    }

    if (user && user.email && role == 'HR') {
        return <WithLoading>
            {children}
        </WithLoading>;
    } 
    else {
        return <>
            <Navigate to="/login" replace={true} />
            {/* {logout()} */}
        </>

    }
};

export default HrRoute;