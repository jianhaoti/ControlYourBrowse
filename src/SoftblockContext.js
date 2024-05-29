import React, { createContext, useContext, useState } from "react";

// Create a Context for the softblock state
const SoftblockContext = createContext();

// Create a custom hook to use the SoftblockContext
export const useSoftblock = () => {
  return useContext(SoftblockContext);
};

// Create a provider component
export const SoftblockProvider = ({ children }) => {
  const [isSoftblockOn, setIsSoftblockOn] = useState(false);

  return (
    <SoftblockContext.Provider value={{ isSoftblockOn, setIsSoftblockOn }}>
      {children}
    </SoftblockContext.Provider>
  );
};
