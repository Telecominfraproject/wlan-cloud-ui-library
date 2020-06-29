import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';

export const EditableContext = React.createContext();

export const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

EditableRow.propTypes = {
  index: PropTypes.number,
};

EditableRow.defaultProps = {
  index: 0,
};
