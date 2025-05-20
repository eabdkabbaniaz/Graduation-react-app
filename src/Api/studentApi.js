import axiosInstance from "./axiosInstance";


export const fetchStudents = async (page = 1) => {
  try {
    const response = await axiosInstance.get(`/studentAdmin/index?page=${page}`);
    const { data, last_page } = response.data.data;
    const { next_page_url } = response.data;
    return {
      students: data,
      last_page,
      next_page_url
    };
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};


export const deleteStudent = async (studentId) => {
  return await axiosInstance.delete(`/studentAdmin/destroy/${studentId}`);
};

export const showStudetnt = async (studentId) => {
    try {
        const response = await axiosInstance.get(`/Student/show/${studentId}`);
        const { data } = response.data;
        return {
          student: data,
        };
      } catch (error) {
        console.error("Error fetching students:", error);
        throw error;
      }
};


export const createStudent = async ({ name, university_number, category_id }) => {
    try {
      const response = await axiosInstance.post(`/studentAdmin/create`, {
        name,
        university_number,
        category_id
      });
      return response.data; 
    } catch (error) {
      console.error("فشل في إنشاء الطالب:", error);
      throw error;
    }
  };


  export const updateStudent = async (id, data) => {
      try {
          const response = await axiosInstance.patch(`/studentAdmin/update/${id}`, data);
          console.log("ehfkdhjjfjdfhlasdf")
          return response.data;
      } catch (error) {
          console.error("فشل في تحديث بيانات الطالب:", error);
          throw error;
      }
  };
  
  export const importStudents = async (data) => {
    try {
        const response = await axiosInstance.post(`/studentAdmin/import-students`, data);
        return response.data;
    } catch (error) {
        console.error("فشل تصدير الطلاب:", error);
        throw error;
    }
};
