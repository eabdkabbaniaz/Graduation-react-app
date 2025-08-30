import MainContent from "../layout/MainContent";
import SessionsTable from "./SessionsTable";
import { useState } from "react";
import Session from "./Session"

export default function Sessions({name,description,setSessionNameQR,setCode}){

    const [showSession , setShowSession] = useState(false)
    const [showSessionName , setShowSessionName] = useState("")
    const [showSessionId , setShowSessionId] = useState()

    return (
        <MainContent name={name} description={description}>
            {!showSession && <SessionsTable setSessionNameQR={setSessionNameQR}  setCode={setCode} setShowSession={setShowSession} setShowSessionName={setShowSessionName} setShowSessionId={setShowSessionId}/>}
            {showSession && <Session sessionName={showSessionName} sessionId={showSessionId} setShowSession={setShowSession}/>}
        </MainContent>
    )
}
