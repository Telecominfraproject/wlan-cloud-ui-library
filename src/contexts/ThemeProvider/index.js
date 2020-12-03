import React from 'react';
import PropTypes from 'prop-types';
import ThemeContext from 'contexts/ThemeContext';

const ThemeProvider = ({ children, company, logo, logoMobile, routes }) => (
  <ThemeContext.Provider value={{ company, logo, logoMobile, routes }}>
    {children}
  </ThemeContext.Provider>
);

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  routes: PropTypes.instanceOf(Object).isRequired,
  company: PropTypes.string,
  logo: PropTypes.string,
  logoMobile: PropTypes.string,
};

ThemeProvider.defaultProps = {
  company: 'Your Company',
  logo: '',
  logoMobile: '',
};

export default ThemeProvider;
