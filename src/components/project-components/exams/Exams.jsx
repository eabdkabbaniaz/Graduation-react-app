import MainContent from "../layout/MainContent";
import ExamTable from "./ExamTable";
import Button from "../../ui-components/Button";
import { Link } from "react-router-dom";

export default function Exams({name , description}) {

    return (
        <MainContent name={name} description={description}>
            <div dir="rtl">
            <Link to="../questions">
            <Button signal="" name="show all questions"/>
            </Link>  
            </div>
            <ExamTable />
        </MainContent>
    )
}