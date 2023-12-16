import React, { createContext, useState } from 'react';

const ModeContext = createContext();

const ModeState = (props) => { 
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ModeContext.Provider value={{ darkMode, setDarkMode }}>
      {props.children}
    </ModeContext.Provider>
  );
};

export { ModeContext, ModeState }; 