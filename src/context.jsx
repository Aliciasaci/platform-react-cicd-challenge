import React, { createContext, useState, useEffect } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [userToken, setUserTokenState] = useState(() => localStorage.getItem('userToken') || "");
  const [userEmail, setUserEmailState] = useState(() => localStorage.getItem('userEmail') || "");
  const [userId, setUserIdState] = useState(() => localStorage.getItem('userId') || null);

  const setUserToken = (token) => {
    localStorage.setItem('userToken', token);
    setUserTokenState(token);
  };

  const setUserEmail = (email) => {
    localStorage.setItem('userEmail', email);
    setUserEmailState(email);
  };

  const setUserId = (id) => {
    localStorage.setItem('userId', id);
    setUserIdState(id);
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

    const storedUserId = localStorage.getItem('userId');
    if (storedUserId !== userId) {
      setUserIdState(storedUserId);
    }
  }, [userToken, userEmail, userId]);

  const contextValue = {
    userToken,
    setUserToken,
    userEmail,
    setUserEmail,
    userId,
    setUserId
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
