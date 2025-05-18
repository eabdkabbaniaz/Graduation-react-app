import axiosInstance from "./axiosInstance";

export const getQuestions = async () => {
    try {
        const response = await axiosInstance.get(`/questions/index`);
        const data = response.data.data;
        return data;
    } catch (error) {
        console.error("Error fetching questions:", error);
        throw error;
    }
};

export const deleteQustion = async (id) => {
    return await axiosInstance.delete(`/questions/destroy/${id}`);
};

export const editQustion = async (id, data) => {
    try {
        const response = await axiosInstance.put(`/questions/update/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("فشل في تحديث معلومات السؤال :", error);
        throw error;
    }
};

export const addQustion = async (data) => {
    try {
        const response = await axiosInstance.post(`/questions/store`, data);
        console.log(response.message)
        return response.message;
    } catch (error) {
        console.error("فشل في إنشاءالسؤال:", error);
        throw error;
    }
};