import axios from "axios";

const instance = axios.create({
    baseURL: "https://assignment-12-server-teal.vercel.app",
})

const useAxiosSecure = () => {
    return instance;
};

export default useAxiosSecure;