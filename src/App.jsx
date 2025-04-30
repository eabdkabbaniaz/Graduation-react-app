import './App.css'
import CreateAccount from './components/project-components/create_account/createAccount'
import { Route, Routes } from 'react-router-dom'
import MainApp from './components/project-components/main/MainApp'
import Universities from './components/project-components/Universities/Universities'
import DashboardPage from './components/project-components/home/DashboardPage'
import Charts from './components/project-components/charts/Charts'
import Students from './components/project-components/students/Students'
import NotFound from './components/ui-components/NotFound'
import { useContext } from 'react'
import LangContext from './context/LangContext'
import { authLang } from './lang/authLang'
import { langs } from './lang/langs'

function App() {

  const {lang , setLang} = useContext(LangContext)

  return (
    
    <Routes>
      <Route path="/" element={<MainApp lang={lang} />}>
        <Route path="/dashboard" element={<DashboardPage name={authLang[langs[lang]].Dashboard} description={authLang[langs[lang]].homeDescription} />} />
        <Route path="/universities" element={<Universities name={authLang[langs[lang]].Universities} description={authLang[langs[lang]].universitiesDescription} />} />
        <Route path="/students" element={<Students name={authLang[langs[lang]].Students} description={authLang[langs[lang]].studentsDescription} />} />  
        <Route path="/charts" element={<Charts name={authLang[langs[lang]].Charts} description={authLang[langs[lang]].chartsDescription} />} />    
      </Route>
      <Route path="/create_account" element={<CreateAccount />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
export default App