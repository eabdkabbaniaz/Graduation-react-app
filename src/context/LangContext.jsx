import { createContext, useState, useEffect } from 'react';

const LangContext = createContext();

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState('en'); 

  useEffect(() => {
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  useEffect(() => {
    if (lang === 'ar') {
      document.documentElement.classList.add('ar');
      localStorage.setItem('lang', 'ar');
    } else {
      document.documentElement.classList.remove('ar');
      localStorage.setItem('lang', 'en');
    }
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
};

export default LangContext;
