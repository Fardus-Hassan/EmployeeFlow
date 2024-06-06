import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase.config";


export const GlobalStateContext = createContext(null);

const GlobalContext = ({ children }) => {

    const [loading, setLoading] = useState(true)
    const [searchData, setSearchData] = useState([])
    const [open, setOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // AuthContext ---------------------------------------------------------------------------------------------------
    const [user, setUser] = useState(null);
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
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {

            setUser(currentUser);
            setLoading(false)


        });
        return () => {
            unSubscribe();
        }
    }, [])


    const updateUserProfile = (photoURL, name) => {

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


    // AuthContext --------------------------------------------------------------------------------------------------------------


    // const handleSearch = async (value) => {
    //     const { data } = await axios.get(`${import.meta.env.VITE_SERVER}/events/search/event?search=${value}`)
    //     setSearchData(data);
    // }



    // const currentUrl = window.location.href;
    // console.log(currentUrl);
    // useEffect(() => {
    //     setUrl(currentUrl);
    // }, [currentUrl]);
    // console.log(url);


    return (

        <GlobalStateContext.Provider value={{ user, searchData, open, isOpen, setIsOpen, setOpen, setLoading, register, login, logout, setUser, updateUserProfile, loading, }}>
            {children}
        </GlobalStateContext.Provider>

    );
};

export default GlobalContext;