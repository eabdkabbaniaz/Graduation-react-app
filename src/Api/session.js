import axiosInstance from "./axiosInstance";

export const getSession = async () => {
    try {
        const response = await axiosInstance.get(`/session/index/1`);
        //console.log("response ", response.data);
        const data = response.data.data;
        return data;
    } catch (error) {
        console.error("Error fetching teacher:", error);
        throw error;
    }
};

export const deleteSession = async (id) => {
    return await axiosInstance.delete(`/session/destroy/${id}`);
};

export const createTeacher = async ({ name, email }) => {
    try {
        const response = await axiosInstance.post(`/teacher/create`, {
            name,
            email,
        });
        console.log(response.data, "dataloehruekj");
        return response.data.data.original.data;
    } catch (error) {
        console.error("فشل في إنشاء المعيد:", error);
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

export const toggleTeacherStatus = async (id) => {
    try {
        const response = await axiosInstance.get(`/teacher/toggleActivation/${id}`);
        return response.data;
    } catch (err) {
        console.error("فشل تغيير الحالة", err);
        throw err;
    }
};