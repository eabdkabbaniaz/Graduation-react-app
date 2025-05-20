import StudentCreateForm from "../students/StudentCreateForm";
import StudentTable from "./StudentTable";
import StudentEditForm from "../students/StudentEditForm";
import MainContent from "../layout/MainContent";
import { fetchStudents } from "../../../Api/studentApi";
import { fetchCategory } from "../../../api/categories";
import { useEffect, useState } from "react";

const Students = ({ name, description }) => {

  const [students, setStudents] = useState([]);
  const [isWaiting, setIsWaiting] = useState(false);
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [categories, setCategories] = useState([]);
  const [originalStudents, setOriginalStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsWaiting(true);
        const { students, last_page } = await fetchStudents(page);
        setStudents(students);
        setOriginalStudents(students);
        setLastPage(last_page)

        const data = await fetchCategory();
        setCategories(data);
      } catch (error) {
        setError("An error occurred while loading the data😥");
      } finally {
        setIsWaiting(false);
      }
    };
    getData();
  }, [page,isSubmitting === false]);
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
        page={page}
        lastPage={lastPage}
        setPage={setPage}
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
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
          isEditModalOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
        />
      )}

    </MainContent>
  );
}
export default Students;