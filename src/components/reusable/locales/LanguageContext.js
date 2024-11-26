import React, { createContext, useState, useEffect } from 'react';
import en from './en.json';
import fr from './fr.json';
import ar from './ar.json';


const translations = { en, ar, fr };

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [t, setT] = useState(translations[language]);

  const switchLanguage = (lang) => {
    setLanguage(lang);
    setT(translations[lang]);
  };

  useEffect(() => {
    setT(translations[language]);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ t, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
