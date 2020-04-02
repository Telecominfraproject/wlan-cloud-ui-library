import React from 'react';
import PropTypes from 'prop-types';
import ThemeContext from 'contexts/ThemeContext';

const ThemeProvider = ({ children, company, logo, logoMobile }) => (
  <ThemeContext.Provider value={{ company, logo, logoMobile }}>{children}</ThemeContext.Provider>
);

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
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
