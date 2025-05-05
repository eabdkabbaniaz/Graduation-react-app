import { useEffect, useState } from "react";
import MainContent from "../layout/MainContent";
import TeacherForm from "./TeacherForm";
import TeacherTable from "./teacherTable";
import { fetchTeacher } from "../../../api/teacher";
const Teacher = ({ name, description }) => {
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    const [teachers, setTeacher] = useState([]);
    const [error, setError] = useState(null);
    const [isWaiting, setIsWaiting] = useState(false);
    useEffect(() => {
        const getData = async () => {
            try {
                setIsWaiting(true);
                const data = await fetchTeacher();
                setTeacher(data);
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
            <TeacherTable
                teachers={teachers} setTeacher={setTeacher} isWaiting={isWaiting} error={error}
                onEdit={setSelectedTeacher}
            />
            <TeacherForm
                teacher={selectedTeacher}
                setData={setTeacher}
            />
        </MainContent>
    );
}
export default Teacher;