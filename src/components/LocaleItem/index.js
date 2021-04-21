import React from 'react';
import PropTypes from 'prop-types';
import { Select, Form } from 'antd';
import ContainedSelect from 'components/ContainedSelect';

const { Option } = Select;
const { Item } = Form;

const LocaleDropdown = ({ name }) => {
  return (
    <Item
      name={name}
      label="Locale:"
      rules={[
        {
          required: true,
          message: 'Locale field cannot be empty',
        },
      ]}
    >
      <ContainedSelect placeholder="Please select" data-testid="localeItem">
        <Option value="en_CA">English</Option>
        <Option value="fr_CA">Francais</Option>
      </ContainedSelect>
    </Item>
  );
};

LocaleDropdown.propTypes = {
  name: PropTypes.string,
};

LocaleDropdown.defaultProps = {
  name: '',
};

export default LocaleDropdown;
