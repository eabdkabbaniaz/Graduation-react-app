import StudentCreateForm from "../Students/StudentCreateForm";
import StudentTable from "./StudentTable";
import StudentEditForm from "../Students/StudentEditForm";
import MainContent from "../layout/MainContent";
import { fetchStudents } from "../../../Api/studentApi";
import { fetchCategory } from "../../../Api/categories";
import { useEffect, useState } from "react";


const Students = ({ name, description }) => {

  const [students, setStudents] = useState([]);
  const [isWaiting, setIsWaiting] = useState(false);
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [categories, setCategories] = useState([]);
  const [originalStudents, setOriginalStudents] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        setIsWaiting(true);
        const { students, last_page } = await fetchStudents();
        setStudents(students);
        setOriginalStudents(students);

        const data = await fetchCategory();
        setCategories(data);
      } catch (error) {
        setError("An error occurred while loading the data😥");
      } finally {
        setIsWaiting(false);
      }
    };
    getData();
  }, []);
  return (
    <MainContent name={name} description={description}>
      <StudentTable
        isWaiting={isWaiting}
        error={error}
        setStudents={setStudents}
        students={students}
        categories={categories}
        onEdit={setSelectedStudent}
        originalStudents={originalStudents}
        setIsEditModalOpen={setIsEditModalOpen}
      />

      <StudentCreateForm
        setData={setStudents}
        categories={categories}
        setError={setError}
        error={error}
      />


      {isEditModalOpen && (
        <StudentEditForm
          student={selectedStudent}
          setData={setStudents}
          setError={setError}
          error={error}
        />
      )}

    </MainContent>
  );
}
export default Students;
