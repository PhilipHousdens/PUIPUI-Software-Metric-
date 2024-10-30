
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api"
});

export default {
    async getProduct(limit, page) {
        return await axios.get(`http://localhost:8000/api/data/${limit}/${page}`);
    },
    getProductById(productId) {
        return axiosInstance.get(`/product/${productId}`);
    }
};
