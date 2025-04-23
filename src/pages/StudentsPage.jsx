import EmployeeForm from "../components/project-components/Students/StudentForm";

import EmployeeTable from "../components/project-components/Students/StudentTable";



const Employees = () => {
  return (
    <div className="container px-6 mx-auto grid">
      <h1 className="text-xl font-bold mb-4 text-purple-500 text-center mt-7">إدارة الطلاب</h1>
      <EmployeeTable />
      <EmployeeForm />
    </div>
  );
}
export default Employees;
