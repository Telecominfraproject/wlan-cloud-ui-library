import React from 'react';
import PropTypes from 'prop-types';
import RolesContext from 'contexts/RolesContext';

const RolesProvider = ({ children, roleIsWritable, role, featureRoles }) => {
  return (
    <RolesContext.Provider
      value={{
        role,
        roleIsWritable,
        featureRoles,
      }}
    >
      {children}
    </RolesContext.Provider>
  );
};

RolesProvider.propTypes = {
  children: PropTypes.node.isRequired,
  roleIsWritable: PropTypes.bool,
  role: PropTypes.string,
  featureRoles: PropTypes.instanceOf(Array),
};

RolesProvider.defaultProps = {
  roleIsWritable: true,
  role: '',
  featureRoles: null,
};

export default RolesProvider;
