import axiosInstance from "./axiosInstance";

export const getMarks = async () => {
    try {
        const response = await axiosInstance.get(`/Grades/allStudentGrades`);
        const data = response.data.data;
        return data;
    } catch (error) {
        console.error("Error fetching Grades:", error);
        throw error;
    }
};

export const userMarkDetails = async (id) => {
    try {
        const response = await axiosInstance.get(`/Grades/userDetails/${id}`);
        const data = response.data;
        return data;
    } catch (error) {
        console.error("Error fetching Grades Details:", error);
        throw error;
    }
};

export const exportMarks = async (data,head) => {
    try {
        const response = await axiosInstance.post(`/export`, data,head);
        return response;
    } catch (error) {
        console.error("فشل في تصدير ملف العلامات:", error);
        throw error;
    }
};