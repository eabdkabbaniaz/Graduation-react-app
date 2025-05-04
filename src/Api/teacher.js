import axiosInstance from "./axiosInstance";

export const fetchTeacher = async () => {
    try {
        const response = await axiosInstance.get(`/teacher/index`);
        //console.log("response ", response.data);
        const data = response.data.data;
        console.log("data rr4", data)
        return data;
    } catch (error) {
        console.error("Error fetching teacher:", error);
        throw error;
    }
};

export const deleteTeacher = async (teacherId) => {
    return await axiosInstance.delete(`/teacher/destroy/${teacherId}`);
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



export const updateTeacher = async (id, data) => {
    try {
        const response = await axiosInstance.patch(`/teacher/update/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("فشل في تحديث بيانات المعيد:", error);
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
