import React, { createContext, useState } from 'react';

const LoadingBarContext = createContext();

const LoadingBarState = (props) => { 
    const [progress, setProgress] = useState(0);

  return (
    <LoadingBarContext.Provider value={{ progress, setProgress }}>
      {props.children}
    </LoadingBarContext.Provider>
  );
};

export { LoadingBarContext, LoadingBarState };