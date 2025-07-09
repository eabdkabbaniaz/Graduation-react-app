import MainContent from "../layout/MainContent";
import ExamTable from "./ExamTable";
import Button from "../../ui-components/Button";
import { useNavigate } from "react-router-dom";

export default function Exams({name , description}) {

    const navigate = useNavigate();
    return (
        <MainContent name={name} description={description}>
            <div dir="rtl">
            <Button signal="" name="show all questions" onClick={() => navigate("../questions")} />
            </div>
            <ExamTable />
        </MainContent>
    )
}