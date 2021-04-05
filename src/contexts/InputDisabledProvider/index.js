import React from 'react';
import PropTypes from 'prop-types';
import FormDisabledContext from 'contexts/InputDisabledContext';

const InputDisabledProvider = ({ children, roleIsWritable }) => {
  return (
    <FormDisabledContext.Provider
      value={{
        roleIsWritable,
      }}
    >
      {children}
    </FormDisabledContext.Provider>
  );
};

InputDisabledProvider.propTypes = {
  children: PropTypes.node.isRequired,
  roleIsWritable: PropTypes.bool,
};

InputDisabledProvider.defaultProps = {
  roleIsWritable: true,
};

export default InputDisabledProvider;
