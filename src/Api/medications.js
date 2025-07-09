import axiosInstance from "./axiosInstance";

export const getMedications = async () => {
    try {
        const response = await axiosInstance.get(`/medication/index`);
        const data = response.data.data;
        return data;
    } catch (error) {
        console.error("Error fetching medications:", error);
        throw error;
    }
};

export const deleteMediction = async (id) => {
    try {
        const response = await axiosInstance.delete(`/medication/destroy/${id}`);
    } catch (error) {
        console.error("Error delete medication:", error);
        throw error;
    }
};

export const editMediction = async (id, data) => {
    try {
        const response = await axiosInstance.put(`/medication/update/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("فشل في تحديث بيانات الدواء:", error);
        throw error;
    }
};

export const addMediction  = async (data) => {
    try {
        const response = await axiosInstance.post(`/medication/store`, data);
        return response.data.data;
    } catch (error) {
        console.error("فشل في إنشاء الدواء:", error);
        throw error;
    }
};

export const getSystems = async () => {
    try {
        const response = await axiosInstance.get(`/system/index`);
        const data = response.data.data;
        return data;
    } catch (error) {
        console.error("Error fetching systems:", error);
        throw error;
    }
};

export const deleteSystem = async (id) => {
    try {
        const response = await axiosInstance.delete(`/system/destroy/${id}`);
    } catch (error) {
        console.error("Error fetching systems:", error);
        throw error;
    }
};

export const editSystem = async (id, data) => {
    try {
        const response = await axiosInstance.put(`/system/update/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("فشل في تحديث بيانات النظام:", error);
        throw error;
    }
};

export const addSystem = async (data) => {
    try {
        const response = await axiosInstance.post(`/system/store`, data);
        return response.data.data;
    } catch (error) {
        console.error("فشل في إنشاء النظام:", error);
        throw error;
    }
};


export const getEffects = async () => {
    try {
        const response = await axiosInstance.get(`/effect/index`);
        const data = response.data.data;
        return data;
    } catch (error) {
        console.error("Error fetching effects:", error);
        throw error;
    }
};


export const deleteEffect = async (id) => {
    try {
        const response = await axiosInstance.delete(`/effect/destroy/${id}`);
    } catch (error) {
        console.error("Error fetching effects:", error);
        throw error;
    }
};

export const editEffect = async (id, data) => {
    try {
        const response = await axiosInstance.put(`/effect/update/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("فشل في تحديث بيانات التأثيرات:", error);
        throw error;
    }
};

export const addEffect = async (data) => {
    try {
        const response = await axiosInstance.post(`/effect/store`, data);
        return response.data.data;
    } catch (error) {
        console.error("فشل في إنشاء التأثير:", error);
        throw error;
    }
};
