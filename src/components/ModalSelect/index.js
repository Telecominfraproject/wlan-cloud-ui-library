import React from 'react';
import PropTypes from 'prop-types';
import { Select as AntdSelect } from 'antd';

const ModalSelect = ({ children, className, ...restProps }) => (
  <AntdSelect
    className={className}
    getPopupContainer={triggerNode => triggerNode.parentElement}
    {...restProps}
  >
    {children}
  </AntdSelect>
);

ModalSelect.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

ModalSelect.defaultProps = {
  children: null,
  className: '',
};

export default ModalSelect;
