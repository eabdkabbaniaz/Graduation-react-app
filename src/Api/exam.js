import axiosInstance from "./axiosInstance";

export const getExam = async () => {
    try {
        const response = await axiosInstance.get(`/exams/index`);
        const data = response.data.data;
        return data;
    } catch (error) {
        console.error("Error fetching teacher:", error);
        throw error;
    }
};

export const deleteExam = async (id) => {
    return await axiosInstance.delete(`/exams/destroy/${id}`);
};

export const addExam = async (data) => {
    try {
        const response = await axiosInstance.post(`/exams/store`, data);
        return response.data.data;
    } catch (error) {
        console.error("فشل في إنشاء اختبار:", error);
        throw error;
    }
};

export const editExam = async (id, data) => {
    try {
        const response = await axiosInstance.put(`/exams/update/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("فشل في تحديث بيانات الامتحان:", error);
        throw error;
    }
};
