import axiosInstance from "./axiosInstance";

export const getSession = async (expId) => {
    try {
        const response = await axiosInstance.get(`/session/index/${expId}`);
        const data = response.data.data;
        return data;
    } catch (error) {
        console.error("Error fetching session:", error);
        throw error;
    }
};

export const deleteSession = async (id) => {
    return await axiosInstance.delete(`/session/destroy/${id}`);
};

export const addSession = async (data) => {
    try {
        const response = await axiosInstance.post(`/session/store`, data);
        return response.data.data;
    } catch (error) {
        console.error("فشل في إنشاء جلسة:", error);
        throw error;
    }
};

export const editSession = async (id, data) => {
    try {
        const response = await axiosInstance.put(`/session/update/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("فشل في تحديث بيانات الجلسة:", error);
        throw error;
    }
};

// export const attend = async (code) => {
//     try {
//         const response = await axiosInstance.post(`/attend`, {code});
//         return response.data;
//     } catch (error) {
//         console.error("invalid QR", error);
//         throw error;
//     }
// };

export const showSession = async () => {
    try {
        const response = await axiosInstance.get(`/sessionQuestion/index`);
        const data = response.data.data;
        return data;
    } catch (error) {
        console.error("Error fetching session Question:", error);
        throw error;
    }
};

export const addSessionQuestion = async (data) => {
    try {
        const response = await axiosInstance.post(`/sessionQuestion/store`, data);
        return response.data.data;
    } catch (error) {
        console.error("فشل في إنشاء سؤال جلسة:", error);
        throw error;
    }
};

export const deleteSessionQuestion = async (id) => {
    try {
        const response = await axiosInstance.delete(`/sessionQuestion/destroy/${id}`);
        return response.data;
    } catch (error) {
        console.error("فشل في حذف سؤال جلسة:", error);
        throw error;
    }
};

