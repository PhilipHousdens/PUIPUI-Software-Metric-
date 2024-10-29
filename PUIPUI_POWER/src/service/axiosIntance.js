
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api"
});

export default {
    getProduct(page = 1) { 
        return axiosInstance.get(`/data`, { params: { page } }); 
    },
    getProductById(productId) {
        return axiosInstance.get(`/product/${productId}`);
    }
};
