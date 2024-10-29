import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api"
});

export default {
    getProduct() {
        return axiosInstance.get("/data")
            .catch((error) => {
                console.error("Error fetching products:", error);
                throw error; // Rethrow the error for further handling
            });
    },

    getProductById(id) {
        return axiosInstance.get("/data/" + id)
            .catch((error) => {
                console.error("Error fetching product by ID:", error);
                throw error; // Rethrow the error for further handling
            });
    }
};
