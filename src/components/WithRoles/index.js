import React from 'react';
import {
  Input as AntdInput,
  Select as AntdSelect,
  Switch as AntdSwitch,
  Radio,
  Checkbox as AntdCheckbox,
  Upload as AntdUpload,
} from 'antd';
import { useRoles } from 'contexts/RolesContext';

const { Search: AntdSearch, TextArea: AntdTextArea, Password: AntdPassword } = AntdInput;
const { Group } = Radio;
const { Group: CheckGroup } = AntdCheckbox;

function containsRole(userRoles, givenRoles) {
  return givenRoles.filter(i => userRoles.indexOf(i) !== -1).length > 0;
}

// This is for hiding/showing components
const WithRoles = ({ children, access }) => {
  const { roleIsWritable, roles } = useRoles();

  if (access && !containsRole(roles, access)) {
    return children;
  }

  if (roleIsWritable) {
    return children;
  }

  return null;
};

// This is for disabling components
const withDisabledRoles = Component => props => {
  const { roleIsWritable } = useRoles();
  return <Component disabled={!roleIsWritable} {...props} />;
};

export const Input = withDisabledRoles(AntdInput);
export const Select = withDisabledRoles(AntdSelect);
export const Switch = withDisabledRoles(AntdSwitch);
export const Search = withDisabledRoles(AntdSearch);
export const Upload = withDisabledRoles(AntdUpload);
export const Checkbox = withDisabledRoles(AntdCheckbox);
export const CheckboxGroup = withDisabledRoles(CheckGroup);
export const TextArea = withDisabledRoles(AntdTextArea);
export const Password = withDisabledRoles(AntdPassword);
export const RadioGroup = withDisabledRoles(Group);

export default WithRoles;
