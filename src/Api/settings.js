import axiosInstance from "./axiosInstance";

export const getCalculationMethods = async () => {
    try {
        const response = await axiosInstance.get(`/Grades/getCalculationMethods`);
        const data = response.data;
        return data;
    } catch (error) {
        console.error("Error fetching getCalculationMethods:", error);
        throw error;
    }
};

export const postCalculationMethods = async (id , data) => {
    try {
        const response = await axiosInstance.post(`/Grades/updateCalculationMethods/${id}`, data);
        console.log(response.message)
    } catch (error) {
        console.error("فشل في تعديل طريقة الحساب:", error);
        throw error;
    }
};