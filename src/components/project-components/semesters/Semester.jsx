import MainContent from "../layout/MainContent";
import SemesterTable from "./SemesterTable";

export default function Semester({name , description}) {

    return (
        <MainContent name={name} description={description}>
            <SemesterTable />
        </MainContent>
    )
}