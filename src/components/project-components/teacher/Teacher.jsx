import { useEffect, useState } from "react";
import MainContent from "../layout/MainContent";
import TeacherTable from "./TeacherTable";
import { fetchTeacher } from "../../../api/teacher";
const Teacher = ({ name, description }) => {

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
                setError("An error occurred while loading the data");
            } finally {
                setIsWaiting(false);
            }
        };
        getData();
    }, []);
    
    return (
        <MainContent name={name} description={description}>
            <TeacherTable teachers={teachers} setTeacher={setTeacher} isWaiting={isWaiting} setIsWaiting={setIsWaiting} error={error} setError={setError} />
        </MainContent>
    );
}
export default Teacher;