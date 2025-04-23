import './App.css'
import CreateAccount from './components/project-components/create_account/createAccount'
import { Route, Routes } from 'react-router-dom'
import MainApp from './components/project-components/main/MainApp'
import Universities from './components/project-components/Universities/Universities'
import DashboardPage from './components/project-components/home/DashboardPage'
import Charts from './components/project-components/charts/Charts'
import Employees from './pages/StudentsPage'

function App() {

  return (
    
    <Routes>
      <Route path="/" element={<MainApp />}>
        <Route path="/dashboard" element={<DashboardPage name="Dashboard" />} />
        <Route path="/universities" element={<Universities name="Universities" />} />
        <Route path="/Charts" element={<Charts name="Charts" />} />
        <Route path="/students" element={<Employees name="Students" />} />
      
      </Route>
      <Route path="/create_account" element={<CreateAccount />} />
    </Routes>
  )
}
export default App