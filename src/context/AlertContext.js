import React, { createContext, useState } from 'react';

const AlertContext = createContext();

const AlertState = (props) => { 
    const [alertinfo, setAlertinfo] = useState(null);

  return (
    <AlertContext.Provider value={{ alertinfo, setAlertinfo }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export { AlertContext, AlertState };