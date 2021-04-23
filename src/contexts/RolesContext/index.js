import React, { useContext } from 'react';

const RolesContext = React.createContext();

export function useRoles() {
  const context = useContext(RolesContext);

  if (context === undefined) {
    throw new Error('useRoles must be used within a RolesContext provider');
  }

  return context;
}

export default RolesContext;
