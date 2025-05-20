import MainContent from "../layout/MainContent";
import SubjectTable from "./SubjectTable";

export default function Subjects({name , description}) {

    return (
        <MainContent name={name} description={description}>
            <SubjectTable />
        </MainContent>
    )
}