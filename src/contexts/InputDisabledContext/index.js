import React, { useContext } from 'react';

const InputDisabledContext = React.createContext();

export function useWritableInput() {
  const context = useContext(InputDisabledContext);

  if (context === undefined) {
    throw new Error('useWritableInput must be used within a InputDisabledContext provider');
  }

  return context;
}

export default InputDisabledContext;
