import axiosInstance from "./axiosInstance";

export const getProfile = async () => {
    try {
        const response = await axiosInstance.get(`/Auth/profile`);
        const data = response.data.data;
        return data;
    } catch (error) {
        console.error("Error fetching profile:", error);
        throw error;
    }
};
