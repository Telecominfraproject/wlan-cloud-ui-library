import React from 'react';
import {
  Input as AntdInput,
  Switch as AntdSwitch,
  Radio,
  Checkbox as AntdCheckbox,
  Upload as AntdUpload,
  Button as AntdButton,
} from 'antd';

import ContainedSelect from 'components/ContainedSelect';
import { useRoles } from 'contexts/RolesContext';

const { Search: AntdSearch, TextArea: AntdTextArea, Password: AntdPassword } = AntdInput;
const { Group } = Radio;
const { Group: CheckGroup } = AntdCheckbox;

export function containsRole(userRole, givenRoles) {
  return givenRoles.indexOf(userRole) >= 0;
}

// This is for hiding/showing components
const WithRoles = ({ children, access }) => {
  const { isReadOnly, role } = useRoles();

  if (access) {
    if (!containsRole(role, access)) {
      return null;
    }
    return children;
  }

  if (!isReadOnly) {
    return children;
  }

  return null;
};

// This is for disabling components
// eslint-disable-next-line react/prop-types
const withDisabledRoles = Component => ({ disabled, ...restProps }) => {
  const { isReadOnly } = useRoles();
  return <Component disabled={isReadOnly || disabled} {...restProps} />;
};

// eslint-disable-next-line react/prop-types
const withRoles = Component => ({ access, ...restProps }) => {
  const { isReadOnly, role } = useRoles();

  if (access) {
    if (!containsRole(role, access)) {
      return null;
    }
  }

  if (!isReadOnly) {
    return <Component {...restProps} />;
  }

  return null;
};

export const RoleProtectedBtn = withRoles(AntdButton);

export const Input = withDisabledRoles(AntdInput);
export const Select = withDisabledRoles(ContainedSelect);
export const Switch = withDisabledRoles(AntdSwitch);
export const Search = withDisabledRoles(AntdSearch);
export const Upload = withDisabledRoles(AntdUpload);
export const Checkbox = withDisabledRoles(AntdCheckbox);
export const CheckboxGroup = withDisabledRoles(CheckGroup);
export const TextArea = withDisabledRoles(AntdTextArea);
export const Password = withDisabledRoles(AntdPassword);
export const RadioGroup = withDisabledRoles(Group);

export default WithRoles;
