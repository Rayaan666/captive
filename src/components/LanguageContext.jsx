import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('preferredLanguage') || 'en';
  });

  const updateDocumentAttributes = (lang) => {
    const html = document.documentElement;
    if (lang === 'ar') {
      html.setAttribute('lang', 'ar');
      html.setAttribute('dir', 'rtl');
    } else {
      html.setAttribute('lang', 'en');
      html.setAttribute('dir', 'ltr');
    }
  };

  useEffect(() => {
    updateDocumentAttributes(language);
  }, [language]);

  const changeLanguage = (lang) => {
    if (lang === language) return;

    localStorage.setItem('preferredLanguage', lang);
    setLanguageState(lang);
    updateDocumentAttributes(lang);

    // Set Google Translate cookie
    const domain = window.location.hostname.replace(/^www\./, '');
    const cookieValue = lang === 'ar' ? '/en/ar' : '/en/en';
    
    // Clear old cookies and set new ones to ensure Google Translate reads it correctly
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain};`;
    
    document.cookie = `googtrans=${cookieValue}; path=/;`;
    document.cookie = `googtrans=${cookieValue}; path=/; domain=.${domain};`;

    // Reload is required to force Google Translate element to re-translate and apply RTL correctly on load
    window.location.reload();
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
