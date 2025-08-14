import axiosInstance from "./axiosInstance";

export const loginApi = async (data) => {
    try {
        const response = await axiosInstance.post(`/Auth/login`, data);
        return response.data.data;
    } catch (error) {
        console.error("Error Login:", error);
        throw error;
    }
};
