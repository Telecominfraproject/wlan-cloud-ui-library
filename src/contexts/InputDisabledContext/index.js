import React, { useContext } from 'react';

const InputDisabledContext = React.createContext();

// Shortcut for importing the context
export function useWritableInput() {
  const context = useContext(InputDisabledContext);

  if (context === undefined) {
    throw new Error('useWritableInput must be used within a InputDisabledContext provider');
  }

  return context;
}

// A hoc that adds the property disabled to the form inputs that it applies to
export function withWritableInput(component) {
  const Component = component;
  return function CustomItem(props) {
    const { roleIsWritable } = useContext(InputDisabledContext);
    return <Component disabled={!roleIsWritable} {...props} />;
  };
}

export default InputDisabledContext;
