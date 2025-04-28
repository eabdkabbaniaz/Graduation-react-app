import StudentForm from "./StudentForm";
import StudentTable from "./StudentTable";
import MainContent from "../layout/MainContent";

const Students = ({ name , description}) => {
  return (
    <MainContent name={name} description={description}>
      <StudentTable />
      <StudentForm />
    </MainContent>
  );
}
export default Students;
