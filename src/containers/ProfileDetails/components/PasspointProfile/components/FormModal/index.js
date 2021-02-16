import React from 'react';
import PropTypes from 'prop-types';
import { Input, Select, Form } from 'antd';
import Modal from 'components/Modal';
import { modalLayout } from 'utils/form';

const { Item } = Form;
const { Option } = Select;

const FormModal = ({ visible, onCancel, onSubmit, currentPortList, title }) => {
  const [form] = Form.useForm();

  const addItem = () => {
    form
      .validateFields()
      .then(values => {
        onSubmit(values);
        form.resetFields();
        onCancel();
      })
      .catch(() => {});
  };

  const canceledModal = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      onSuccess={addItem}
      onCancel={canceledModal}
      visible={visible}
      title={title}
      content={
        <Form {...modalLayout} form={form}>
          <Item
            label="Status"
            name="connectionCapabilitiesStatus"
            rules={[{ required: true, message: 'Status field cannot be empty' }]}
          >
            <Select placeholder="Select a status">
              <Option value="open">Open</Option>
              <Option value="closed">Closed</Option>
            </Select>
          </Item>
          <Item
            label="Protocol"
            name="connectionCapabilitiesIpProtocol"
            rules={[{ required: true, message: 'Protocol field cannot be empty' }]}
          >
            <Select placeholder="Select a protocol">
              <Option value="ICMP">ICMP</Option>
              <Option value="TCP">TCP</Option>
              <Option value="UDP">UDP</Option>
            </Select>
          </Item>
          <Item
            label="Port"
            name="connectionCapabilitiesPortNumber"
            rules={[
              {
                required: true,
                message: 'Port field cannot be empty',
              },
              ({ getFieldValue }) => ({
                validator(_rule, value) {
                  if (
                    currentPortList.filter(
                      // eslint-disable-next-line eqeqeq
                      i => i.connectionCapabilitiesPortNumber == value?.toString()
                    ).length > 0
                  ) {
                    return Promise.reject(new Error('Port is already used'));
                  }
                  if (
                    !value ||
                    (getFieldValue('connectionCapabilitiesPortNumber') <= 65535 &&
                      getFieldValue('connectionCapabilitiesPortNumber') >= 0)
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Port expected between 1 - 6553'));
                },
              }),
            ]}
          >
            <Input type="number" min={0} max={65535} placeholder="Enter a port" />
          </Item>
        </Form>
      }
    />
  );
};

FormModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  currentPortList: PropTypes.instanceOf(Array),
  title: PropTypes.string.isRequired,
};

FormModal.defaultProps = {
  currentPortList: [],
};

export default FormModal;
