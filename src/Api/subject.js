import axiosInstance from "./axiosInstance";

export const getSubject = async () => {
    try {
        const response = await axiosInstance.get(`/subjects/index`);
        const data = response.data.data;
        return data;
    } catch (error) {
        console.error("Error fetching teacher:", error);
        throw error;
    }
};

export const deleteSubject = async (id) => {
    return await axiosInstance.delete(`/subjects/destroy/${id}`);
};

export const addSubject = async ({ name }) => {
    try {
        const response = await axiosInstance.post(`/subjects/store`, {name});
        return response.data.data;
    } catch (error) {
        console.error("فشل في إنشاء مادة:", error);
        throw error;
    }
};

export const editSubject = async (id, data) => {
    try {
        const response = await axiosInstance.put(`/subjects/update/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("فشل في تحديث بيانات الجلسة:", error);
        throw error;
    }
};
