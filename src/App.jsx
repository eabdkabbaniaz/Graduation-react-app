import './App.css'
import CreateAccount from './components/project-components/create_account/createAccount'
import { Route, Routes } from 'react-router-dom'
import MainApp from './components/project-components/main/MainApp'
import Universities from './components/project-components/Universities/Universities'
import DashboardPage from './components/project-components/home/DashboardPage'
import Charts from './components/project-components/charts/Charts'
import Students from './components/project-components/students/Students'
import NotFound from './components/ui-components/NotFound'
import { useContext, useState } from 'react'
import LangContext from './context/LangContext'
import { authLang } from './lang/authLang'
import { langs } from './lang/langs'
import Experinence from './components/project-components/experinence/Experinence'
import Teacher from './components/project-components/teacher/Teacher'
import Questions from './components/project-components/questions/Questions'
import Sessions from './components/project-components/sessions/Sessions'
import Exams from './components/project-components/exams/Exams'
import Subjects from './components/project-components/subjects/Subjects'
import SessionQRCode from './components/ui-components/SessionQRCode'

function App() {

  const {lang , setLang} = useContext(LangContext)
  const [sessionNameQR , setSessionNameQR] = useState("");
  const [code , setCode] = useState("");

  return (
    
    <Routes>
      <Route path="/" element={<MainApp lang={lang} />}>
        <Route path="/dashboard" element={<DashboardPage name={authLang[langs[lang]].Dashboard} description={authLang[langs[lang]].homeDescription} />} />
        <Route path="/universities" element={<Universities name={authLang[langs[lang]].Universities} description={authLang[langs[lang]].universitiesDescription} />} />
        <Route path="/students" element={<Students name={authLang[langs[lang]].Students} description={authLang[langs[lang]].studentsDescription} />} />  
        <Route path="/charts" element={<Charts name={authLang[langs[lang]].Charts} description={authLang[langs[lang]].chartsDescription} />} />    
        <Route path="/experinences" element={<Experinence name={authLang[langs[lang]].Experinences} description={authLang[langs[lang]].experinencesDescription} />} />      
        <Route path="/teachers" element={<Teacher name={authLang[langs[lang]].Teachers} description={authLang[langs[lang]].teachersDescription} />} />
        <Route path="/exams" element={<Exams name={authLang[langs[lang]].Exams} description={authLang[langs[lang]].examsDescription} />} />  
        <Route path="/sessions" element={<Sessions name={authLang[langs[lang]].Sessions} description={authLang[langs[lang]].sessionsDescription} setSessionNameQR={setSessionNameQR} setCode={setCode} />} />            
        <Route path="/subjects" element={<Subjects name={authLang[langs[lang]].Subjects} description={authLang[langs[lang]].subjectsDescription} />} />            
      </Route>
      <Route path="/create_account" element={<CreateAccount />} />
      <Route path="/questions" element={<Questions />} />
      <Route path="/qr" element={<SessionQRCode sessionName={sessionNameQR} code={code} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
export default App