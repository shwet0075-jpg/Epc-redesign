import React, { createContext, useContext, useState } from 'react';

const LoaderContext = createContext({
  loading: true,
  isUnveiled: false,
  handleUnveil: () => {},
  handleComplete: () => {},
});

export function LoaderProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [isUnveiled, setIsUnveiled] = useState(false);

  const handleUnveil = () => {
    setIsUnveiled(true);
  };

  const handleComplete = () => {
    setLoading(false);
    setIsUnveiled(true);
  };

  return (
    <LoaderContext.Provider
      value={{
        loading,
        isUnveiled,
        handleUnveil,
        handleComplete,
      }}
    >
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  return useContext(LoaderContext);
}
