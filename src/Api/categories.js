import axiosInstance from "./axiosInstance";

export const fetchCategory = async () => {
    try {
        const response = await axiosInstance.get(`/Category/index`);
        return response.data;
    } catch (error) {
        console.error("Error fetching Category:", error);
        throw error;
    }
};