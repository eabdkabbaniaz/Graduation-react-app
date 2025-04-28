// // src/api/studentService.js
// import axios from "axios";

// export const fetchStudents = async (page = 1) => {
//   try {
//     const response = await axios.get(`http://127.0.0.1:8000/api/studentAdmin/index?page=${page}`);
//     const { data , last_page } = response.data.data;

//     return {
//       students: data,
//       last_page
//     };
//   } catch (error) {
//     console.error("Error fetching students:", error);
//     throw error;
//   }
// };


// export const deleteStudent = async (studentId) => {
//     return await axios.delete(`${API_BASE_URL}/destroy/${studentId}`);
//   };

import axiosInstance from "./axiosInstance";

// جلب الطلاب
export const fetchStudents = async (page = 1) => {
  try {
    const response = await axiosInstance.get(`/studentAdmin/index?page=${page}`);
    const { data, last_page } = response.data.data;
    return {
      students: data,
      last_page,
    };
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

// حذف طالب
export const deleteStudent = async (studentId) => {
  return await axiosInstance.delete(`/studentAdmin/destroy/${studentId}`);
};


// عرض تفاصيل طالب طالب
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


// studentApi.js
export const createStudent = async ({ name, university_number, category_id }) => {
    try {
      const response = await axiosInstance.post(`/studentAdmin/create`, {
        name,
        university_number,
        category_id
      });
      return response.data; // راجع لو عندك success, message, data حسب الحاجة
    } catch (error) {
      console.error("فشل في إنشاء الطالب:", error);
      throw error;
    }
  };
  
