import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

const LoaderContext = createContext({
  loading: true,
  isUnveiled: false,
  handleUnveil: () => {},
  handleComplete: () => {},
});

export function LoaderProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [isUnveiled, setIsUnveiled] = useState(false);

  const handleUnveil = useCallback(() => {
    setIsUnveiled(true);
  }, []);

  const handleComplete = useCallback(() => {
    setLoading(false);
    setIsUnveiled(true);
  }, []);

  const value = useMemo(
    () => ({
      loading,
      isUnveiled,
      handleUnveil,
      handleComplete,
    }),
    [loading, isUnveiled, handleUnveil, handleComplete]
  );

  return (
    <LoaderContext.Provider value={value}>
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  return useContext(LoaderContext);
}

