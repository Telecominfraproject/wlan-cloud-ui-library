import React from 'react';
import PropTypes from 'prop-types';
import RolesContext from 'contexts/RolesContext';

const RolesProvider = ({ children, isReadOnly, role, featureRoles, ...restProps }) => {
  return (
    <RolesContext.Provider
      value={{
        role,
        isReadOnly,
        featureRoles,
        ...restProps,
      }}
    >
      {children}
    </RolesContext.Provider>
  );
};

RolesProvider.propTypes = {
  children: PropTypes.node.isRequired,
  isReadOnly: PropTypes.bool,
  role: PropTypes.string,
  featureRoles: PropTypes.instanceOf(Array),
};

RolesProvider.defaultProps = {
  isReadOnly: false,
  role: '',
  featureRoles: null,
};

export default RolesProvider;
