import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Select, Form, Button, Table, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Modal from 'components/Modal';
import globalStyles from 'styles/index.scss';
import styles from '../index.module.scss';

const { Item } = Form;
const { Option } = Select;

const VenueForm = ({ form, details }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'dupleName',
    },
    {
      title: 'Locale',
      dataIndex: 'locale',
    },
    {
      title: 'URL',
      dataIndex: 'venueUrl',
    },
    {
      title: '',
      width: 80,
      render: () => (
        <Button
          title="remove"
          icon={<DeleteOutlined />}
          className={styles.iconButton}
          type="danger"
          // onClick={() => handleRemove(row id)}
        />
      ),
    },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [nameForm] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      venueGroupId: details.venueTypeAssignment.venueGroupId || 0,
    });
  }, [form, details]);

  const handleNameSave = () => {
    nameForm
      .validateFields()
      .then(() => {
        nameForm.resetFields();
      })
      .catch(() => {});
  };

  return (
    <div className={styles.ProfilePage}>
      <Card title="Venue Type">
        <Item label="Group:" name="venueGroupId">
          <Select className={globalStyles.field} placeholder="Select Venue Group">
            <Option value={0}>Unspecified</Option>
            <Option value={1}>Assembly</Option>
            <Option value={2}>Business</Option>
            <Option value={3}>Assembly</Option>
            <Option value={4}>Factory and Industrial</Option>
            <Option value={5}>Institutional</Option>
            <Option value={6}>Mercantile</Option>
            <Option value={7}>Residential</Option>
            <Option value={8}>Storage</Option>
            <Option value={9}>Utility and Miscellaneous</Option>
            <Option value={10}>Vehicular</Option>
            <Option value={11}>Outdoor</Option>
          </Select>
        </Item>
        <Item label="Type:">
          <Select>
            <Option value={1}>Research and Development Facility</Option>
            <Option value={1}>Research and Development Facility</Option>
          </Select>
        </Item>
      </Card>

      <Card
        title="Venue Name"
        extra={
          <Button type="solid" onClick={() => setModalVisible(true)}>
            Add Name
          </Button>
        }
      >
        <Table
          dataSource={details?.venueNameSet}
          columns={columns}
          pagination={false}
          rowKey={details?.venueNameSet}
        />
      </Card>

      <Modal
        onCancel={() => setModalVisible(false)}
        onSuccess={() => {
          handleNameSave();
          // setModalVisible(false);
        }}
        visible={modalVisible}
        buttonText="Save"
        title="Add name"
        content={
          <Form form={nameForm} layout="vertical">
            <Item
              name="dupleName"
              label="Name"
              rules={[{ required: true, message: 'Name field cannot be empty' }]}
            >
              <Input />
            </Item>
            <Item
              name="locale"
              label="Locale"
              rules={[{ required: true, message: 'Locale field cannot be empty' }]}
            >
              <Input />
            </Item>
            <Item
              name="venueUrl"
              label="Url"
              rules={[{ required: true, message: 'Url field cannot be empty' }]}
            >
              <Input />
            </Item>
          </Form>
        }
      />
    </div>
  );
};

VenueForm.propTypes = {
  details: PropTypes.instanceOf(Object),
  form: PropTypes.instanceOf(Object),
};

VenueForm.defaultProps = {
  form: null,
  details: {},
};

export default VenueForm;
