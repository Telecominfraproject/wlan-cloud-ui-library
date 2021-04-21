import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

import Modal from 'components/Modal';
import { IP_REGEX } from 'containers/ProfileDetails/constants';

import globalStyles from 'styles/index.scss';

import { modalLayout } from 'utils/form';

const { Item } = Form;

const FormModal = ({ onSubmit, onClose, title, visible }) => {
  const [form] = Form.useForm();

  const content = (
    <Form form={form} {...modalLayout}>
      <Item
        name="greTunnelName"
        label="Name"
        rules={[
          {
            required: true,
            message: 'Name field cannot be empty',
          },
        ]}
      >
        <Input className={globalStyles.field} placeholder="Enter Name" />
      </Item>
      <Item
        name="greRemoteInetAddr"
        label="Remote IP Address"
        rules={[
          {
            required: true,
            message: 'Remote IP Address field cannot be empty',
          },
          {
            pattern: IP_REGEX,
            message: 'Enter in the format [0-255].[0-255].[0-255].[0-255]',
          },
        ]}
        hasFeedback
      >
        <Input className={globalStyles.field} placeholder="Enter Remote IP Address" />
      </Item>
      <Item
        label="VLAN IDs"
        name="vlanIdsInGreTunnel"
        rules={[
          {
            pattern: /^\s*(\d+(\s*,\s*\d+)*)?\s*$/i,
            message: 'Please enter a comma separated list of numbers',
          },
        ]}
        hasFeedback
      >
        <Input className={globalStyles.field} placeholder="Enter list of VLAN IDs" />
      </Item>
    </Form>
  );

  const addGre = () => {
    form
      .validateFields()
      .then(values => {
        const formattedValues = {
          ...values,
          vlanIdsInGreTunnel: values.vlanIdsInGreTunnel?.split(',').map(i => parseInt(i, 10)),
        };
        form.resetFields();
        onSubmit(formattedValues);
      })
      .catch(() => {});
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      onCancel={handleCancel}
      visible={visible}
      onSuccess={addGre}
      title={title}
      content={content}
    />
  );
};

FormModal.propTypes = {
  onClose: PropTypes.func,
  visible: PropTypes.bool,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
  buttonText: PropTypes.string,
};

FormModal.defaultProps = {
  onClose: () => {},
  visible: false,
  onSubmit: () => {},
  title: '',
  buttonText: '',
};

export default FormModal;
