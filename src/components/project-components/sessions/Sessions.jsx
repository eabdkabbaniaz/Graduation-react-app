import MainContent from "../layout/MainContent";
import SessionsTable from "./SessionsTable";

export default function Sessions({name,description,setSessionNameQR,setCode}){

    return (
        <MainContent name={name} description={description}>
            <SessionsTable setSessionNameQR={setSessionNameQR}  setCode={setCode}/>
        </MainContent>
    )
}
