import axiosInstance from "./axiosInstance";

export const fetchExperinence = async () => {
    try {
        const response = await axiosInstance.get(`/Experinence/index`);
        const data = response.data.data;
        return data;
    } catch (error) {
        console.error("Error fetching experinence:", error);
        throw error;
    }
};

export const deleteExperinence = async (experinenceId) => {
    return await axiosInstance.delete(`/Experinence/destroy/${experinenceId}`);
};

export const createExperinence = async ({ name, before_instruction, after_instruction }) => {
    try {
        const response = await axiosInstance.post(`/Experinence/create`, {
            name,
            before_instruction,
            after_instruction,
        });
        console.log(response.data,"dataloehruekj");
        return response.data.data;
    } catch (error) {
        console.error("فشل في إنشاء التجربة:", error);
        throw error;
    }
};

export const updateExperinence = async (id, data) => {
    try {
        const response = await axiosInstance.patch(`/Experinence/update/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("فشل في تحديث التجربة:", error);
        throw error;
    }
};


export const toggleExperinenceStatus = async (id) => {
    try {
        const response = await axiosInstance.get(`/Experinence/changeStatus/${id}`);
        return response.data;
    } catch (err) {
        console.error("فشل تغيير الحالة", err);
        throw err;
    }
};

  
  