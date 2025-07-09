import MainContent from "../../layout/MainContent";
import SystemTable from "./MedictionTable";

export default function Medictions({ name , description}) {
    return (
        <MainContent name={name} description={description}>
            <SystemTable />
        </MainContent>
    )
}