import MainContent from "../layout/MainContent";
import MarksTable from "./MarksTable";

export default function Marks({name , description}) {

    return (
        <MainContent name={name} description={description}>
            <MarksTable />
        </MainContent>
    )
}