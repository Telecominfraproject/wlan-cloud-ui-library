import React from 'react';
import PropTypes from 'prop-types';
import { Select as AntdSelect } from 'antd';

const ContainedSelect = ({ children, className, ...restProps }) => (
  <AntdSelect
    className={className}
    getPopupContainer={triggerNode => triggerNode.parentElement}
    {...restProps}
  >
    {children}
  </AntdSelect>
);

ContainedSelect.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

ContainedSelect.defaultProps = {
  children: null,
  className: '',
};

export default ContainedSelect;
