import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase.config";



export const GlobalStateContext = createContext(null);

const GlobalContext = ({ children }) => {

    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);

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


 



    return (

        <GlobalStateContext.Provider value={{ user, open, showModal, setShowModal, isOpen, setIsOpen, setOpen, setLoading, register, login, logout, setUser, updateUserProfile, loading, }}>
            {children}
        </GlobalStateContext.Provider>

    );
};

export default GlobalContext;