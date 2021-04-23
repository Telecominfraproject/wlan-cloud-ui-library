import React from 'react';
import PropTypes from 'prop-types';
import RolesContext from 'contexts/RolesContext';

const RolesProvider = ({ children, roleIsWritable, roles }) => {
  return (
    <RolesContext.Provider
      value={{
        roles,
        roleIsWritable,
      }}
    >
      {children}
    </RolesContext.Provider>
  );
};

RolesProvider.propTypes = {
  children: PropTypes.node.isRequired,
  roleIsWritable: PropTypes.bool,
  roles: PropTypes.instanceOf(Array),
};

RolesProvider.defaultProps = {
  roleIsWritable: true,
  roles: null,
};

export default RolesProvider;
