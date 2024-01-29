import React, { createContext, useState, useEffect } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [userToken, setUserTokenState] = useState(() => localStorage.getItem('userToken') || "");
  const [userEmail, setUserEmailState] = useState(() => localStorage.getItem('userEmail') || "");

  const setUserToken = (token) => {
    localStorage.setItem('userToken', token);
    setUserTokenState(token);
  };

  const setUserEmail = (email) => {
    localStorage.setItem('userEmail', email);
    setUserEmailState(email);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('userToken');
    if (storedToken !== userToken) {
      setUserTokenState(storedToken);
    }

    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail !== userEmail) {
      setUserEmailState(storedEmail);
    }
  }, [userToken, userEmail]);

  const contextValue = {
    userToken,
    setUserToken,
    userEmail,
    setUserEmail
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
