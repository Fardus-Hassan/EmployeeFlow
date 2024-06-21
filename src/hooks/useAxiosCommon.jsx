import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3000",
})

const useAxiosCommon = () => {
    return instance;
};

export default useAxiosCommon;