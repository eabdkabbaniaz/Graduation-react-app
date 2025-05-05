import axiosInstance from "./axiosInstance";

export const fetchCategory = async () => {
    try {
        const response = await axiosInstance.get(`/Category/index`);
        //console.log("response ", response.data);
        const data = response.data.data;
        console.log("data rr4", data)
        return data;
    } catch (error) {
        console.error("Error fetching category:", error);
        throw error;
    }
};


export const fetchStudetnByCategory = async (id, data) => {
    try {
        const response = await axiosInstance.get(`/Category/show/${id}`);
        return response.data;
    } catch (error) {
        console.error("فشل في تحديث التجربة:", error);
        throw error;
    }
};