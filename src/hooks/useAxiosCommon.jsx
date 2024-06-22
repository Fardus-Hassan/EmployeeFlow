import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:4000",
})

const useAxiosCommon = () => {
    return instance;
};

export default useAxiosCommon;