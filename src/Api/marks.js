import axiosInstance from "./axiosInstance";

export const getMarks = async () => {
    try {
        const response = await axiosInstance.get(`/Grades/allStudentGrades`);
        const data = response.data.data;
        return data;
    } catch (error) {
        console.error("Error fetching questions:", error);
        throw error;
    }
};

export const exportMarks = async (data,head) => {
    try {
        const response = await axiosInstance.post(`/export`, data,head);
        return response;
    } catch (error) {
        console.error("فشل في تصدير التقرير:", error);
        throw error;
    }
};