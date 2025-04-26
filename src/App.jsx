import './App.css'
import CreateAccount from './components/project-components/create_account/createAccount'
import { Route, Routes } from 'react-router-dom'
import MainApp from './components/project-components/main/MainApp'
import Universities from './components/project-components/Universities/Universities'
import DashboardPage from './components/project-components/home/DashboardPage'
import Charts from './components/project-components/charts/Charts'
import Students from './components/project-components/students/Students'
import NotFound from './components/ui-components/NotFound'

function App() {

  return (
    
    <Routes>
      <Route path="/" element={<MainApp />}>
        <Route path="/dashboard" element={<DashboardPage name="Dashboard" description="this is home page" />} />
        <Route path="/universities" element={<Universities name="Universities"  description="this is Universities page" />} />
        <Route path="/Charts" element={<Charts name="Charts" description="this is Charts page" />} />
        <Route path="/students" element={<Students name="Students" description="this is Students page" />} />      
      </Route>
      <Route path="/create_account" element={<CreateAccount />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
export default App