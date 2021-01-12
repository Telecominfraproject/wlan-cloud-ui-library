import React from 'react';
import PropTypes from 'prop-types';
import ThemeContext from 'contexts/ThemeContext';

const ThemeProvider = ({ children, company, logo, logoMobile, routes, radioTypes }) => (
  <ThemeContext.Provider value={{ company, logo, logoMobile, routes, radioTypes }}>
    {children}
  </ThemeContext.Provider>
);

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  routes: PropTypes.instanceOf(Object).isRequired,
  company: PropTypes.string,
  logo: PropTypes.string,
  logoMobile: PropTypes.string,
  radioTypes: PropTypes.instanceOf(Object).isRequired,
};

ThemeProvider.defaultProps = {
  company: 'Your Company',
  logo: '',
  logoMobile: '',
};

export default ThemeProvider;
