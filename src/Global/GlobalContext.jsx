import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase.config";
import axios from "axios";
import Spinner from "../Components/smallComponents/Spinner";
import useAxiosSecure from "../hooks/useAxiosSecure";


export const GlobalStateContext = createContext(null);

const GlobalContext = ({ children }) => {

    const AxiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [load, setLoad] = useState(false);

    // AuthContext ---------------------------------------------------------------------------------------------------
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const prevuser = auth.prevUser;


    console.log(user);





    const register = (email, password) => {

        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)

    }

    const login = (email, password) => {

        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)

    }

    const logout = () => {


        setLoading(true)
        signOut(auth)
            .then(() => {

                setUser(null);

            }).catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth,(currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => {
            unSubscribe();
        }
    }, []);


    const updateUserProfile = async (photoURL, name) => {

        return updateProfile(auth.currentUser, {

            displayName: name,
            photoURL: photoURL

        }).then(() => {

            setUser(prevuser => {
                return {
                    ...prevuser,
                    photoURL: photoURL,
                    displayName: name
                }
            })

        }).catch((error) => {
            console.error(error)
        });

    }


    
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



    return (

        <GlobalStateContext.Provider value={{ user, role, open, setLoad, load, showModal, setShowModal, isOpen, setIsOpen, setOpen, setLoading, register, login, logout, setUser, updateUserProfile, loading, }}>
            {children}
        </GlobalStateContext.Provider>

    );
};

export default GlobalContext;