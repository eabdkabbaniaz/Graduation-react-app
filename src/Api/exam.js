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



export const editExam = async (id, data) => {
    try {
        const response = await axiosInstance.put(`/Exam/update/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("فشل في تحديث بيانات الجلسة:", error);
        throw error;
    }
};
