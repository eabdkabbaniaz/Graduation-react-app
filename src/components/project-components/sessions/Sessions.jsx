import MainContent from "../layout/MainContent";
import SessionsTable from "./SessionsTable";

export default function Sessions({name,description}){

    return (
        <MainContent name={name} description={description}>
            <SessionsTable />
        </MainContent>
    )
}
