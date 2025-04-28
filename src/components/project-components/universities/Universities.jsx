import MainContent from "../layout/MainContent";
import UniversityTable from "./UniversityTable";

export default function Universities({ name , description}) {
    return (
        <MainContent name={name} description={description}>
            <UniversityTable />
        </MainContent>
    )
}