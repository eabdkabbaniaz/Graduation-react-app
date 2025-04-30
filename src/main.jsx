import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { LangProvider } from './context/LangContext.jsx';

createRoot(document.getElementById('root')).render(
  <LangProvider>
  <ThemeProvider>
  <Router>
    <App />
  </Router>
  </ThemeProvider>
  </LangProvider>
)
