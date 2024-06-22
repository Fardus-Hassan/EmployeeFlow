import axios from "axios";

const instance = axios.create({
    baseURL: "https://assignment-12-server-teal.vercel.app",
})

const useAxiosCommon = () => {
    return instance;
};

export default useAxiosCommon;