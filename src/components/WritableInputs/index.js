import React from 'react';
import {
  Select as AntdSelect,
  Input as AntdInput,
  Switch as AntdSwitch,
  Radio,
  Checkbox as AntdCheckbox,
  Upload as AntdUpload,
} from 'antd';
import { useWritableInput } from 'contexts/InputDisabledContext';

// A list of inputs that are disabled based on the users role
const SelectDisabled = props => {
  return <AntdSelect {...props} />;
};

const InputDisabled = props => {
  return <AntdInput {...props} />;
};

export const SwitchDisabled = props => {
  return <AntdSwitch {...props} />;
};

const SearchDisabled = props => {
  const { Search: AntdSearch } = AntdInput;
  return <AntdSearch {...props} />;
};

const RadioGroupDisabled = props => {
  const { Group } = Radio;

  return <Group {...props} />;
};

const CheckboxDisabled = props => {
  return <AntdCheckbox {...props} />;
};

const CheckboxGroupDisabled = props => {
  const { Group: CheckGroup } = AntdCheckbox;
  return <CheckGroup {...props} />;
};

const UploadDisabled = props => {
  return <AntdUpload {...props} />;
};

const TextAreaDisabled = props => {
  const { TextArea: AntdTextArea } = AntdInput;
  return <AntdTextArea {...props} />;
};

const PasswordDisabled = props => {
  const { Password: AntdPassword } = AntdInput;
  return <AntdPassword {...props} />;
};

export const withWritableInput = Component => props => {
  const { roleIsWritable } = useWritableInput();

  return <Component disabled={!roleIsWritable} {...props} />;
};

export const Select = withWritableInput(SelectDisabled);
export const Input = withWritableInput(InputDisabled);
export const Search = withWritableInput(SearchDisabled);
export const RadioGroup = withWritableInput(RadioGroupDisabled);
export const Checkbox = withWritableInput(CheckboxDisabled);
export const CheckboxGroup = withWritableInput(CheckboxGroupDisabled);
export const Upload = withWritableInput(UploadDisabled);
export const TextArea = withWritableInput(TextAreaDisabled);
export const Password = withWritableInput(PasswordDisabled);
export const Switch = withWritableInput(SwitchDisabled);
