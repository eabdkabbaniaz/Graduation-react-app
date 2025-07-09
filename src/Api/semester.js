import axiosInstance from "./axiosInstance";

export const showAllSemester = async () => {
    try {
        const response = await axiosInstance.get(`/session/AllSemester`);
        const data = response.data.data;
        return data;
    } catch (error) {
        console.error("Error fetching teacher:", error);
        throw error;
    }
};

// export const deletesemester = async (id) => {
//     return await axiosInstance.delete(`/semesters/destroy/${id}`);
// };

// export const addsemester = async ({ name }) => {
//     try {
//         const response = await axiosInstance.post(`/semesters/store`, {name});
//         return response.data.data;
//     } catch (error) {
//         console.error("فشل في إنشاء مادة:", error);
//         throw error;
//     }
// };

// export const editsemester = async (id, data) => {
//     try {
//         const response = await axiosInstance.put(`/semesters/update/${id}`, data);
//         return response.data;
//     } catch (error) {
//         console.error("فشل في تحديث بيانات الجلسة:", error);
//         throw error;
//     }
// };
