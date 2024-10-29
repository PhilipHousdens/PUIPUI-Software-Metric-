import axios from "axios";


const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api"
})

export default {
    getProduct() {
        return axiosInstance.get("/data");
    }
}