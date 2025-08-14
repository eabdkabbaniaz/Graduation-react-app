import MainContent from "../../layout/MainContent";
import MedictionTable from "./MedictionTable";

export default function Medictions({ name , description}) {
    return (
        <MainContent name={name} description={description}>
            <MedictionTable />
        </MainContent>
    )
}