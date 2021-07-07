import React from 'react';
import PropTypes from 'prop-types';
import { Select as AntdSelect } from 'antd';

const ContainedSelect = ({ children, ...restProps }) => (
  <AntdSelect
    getPopupContainer={triggerNode => triggerNode.parentElement}
    dropdownStyle={{ zIndex: 9999 }}
    {...restProps}
  >
    {children}
  </AntdSelect>
);

ContainedSelect.propTypes = {
  children: PropTypes.node,
};

ContainedSelect.defaultProps = {
  children: null,
};

export default ContainedSelect;
