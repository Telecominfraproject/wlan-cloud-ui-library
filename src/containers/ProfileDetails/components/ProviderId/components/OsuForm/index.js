import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Switch, Form, Input, Button, Table, Select } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Modal from 'components/Modal';
import FormModal from '../FormModal';

import styles from '../../../index.module.scss';

const { Option } = Select;

const OsuForm = ({ data, onSubmit, removeItem }) => {
  const { Item } = Form;
  const [osuEnabled, setOsuEnabled] = useState(
    data.osuServerUri !== null && data.osuServerUri !== ''
  );

  const [nameModal, setNameModal] = useState(false);
  const [descModal, setDescModal] = useState(false);
  const [iconModal, setIconModal] = useState(false);

  const [nameForm] = Form.useForm();
  const [iconForm] = Form.useForm();

  const osuNameCols = [
    {
      title: 'Name',
      dataIndex: 'dupleName',
      width: 500,
    },
    {
      title: 'Locale',
      dataIndex: 'locale',
    },
    {
      title: '',
      width: 80,
      render: item => (
        <Button
          title="removePlmn"
          icon={<DeleteOutlined />}
          className={styles.iconButton}
          onClick={() => {
            removeItem('osuFriendlyName', item);
          }}
        />
      ),
    },
  ];

  const osuDescCols = [
    {
      title: 'Name',
      dataIndex: 'dupleName',
      width: 500,
    },
    {
      title: 'Locale',
      dataIndex: 'locale',
    },
    {
      title: '',
      width: 80,
      render: item => (
        <Button
          title="removePlmn"
          icon={<DeleteOutlined />}
          className={styles.iconButton}
          onClick={() => {
            removeItem('osuServiceDescription', item);
          }}
        />
      ),
    },
  ];

  const handleCloseModal = index => {
    if (index === 'osuFriendlyName') {
      setNameModal(false);
    }
    if (index === 'osuServiceDescription') {
      setDescModal(false);
    }
    if (index === 'osuIconList') {
      setIconModal(false);
    }
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 15 },
  };

  return (
    <Card
      title={
        <>
          Online Sign Up (OSU){' '}
          <Switch
            checkedChildren="Enabled"
            unCheckedChildren="Disabled"
            style={{ marginLeft: '1rem' }}
            onChange={() => setOsuEnabled(!osuEnabled)}
            defaultChecked={osuEnabled}
          />
        </>
      }
      bodyStyle={!osuEnabled ? { padding: '0' } : {}}
    >
      {osuEnabled && (
        <>
          <Item
            name="osuServerUri"
            label="Server URI:"
            rules={[
              {
                required: true,
                message: 'Server uri field cannot be empty',
              },
            ]}
          >
            <Input placeholder="Enter a value for server uri" />
          </Item>

          <Card
            title="Name:"
            bordered={false}
            extra={<Button onClick={() => setNameModal(true)}>Add</Button>}
          >
            <Table
              dataSource={data?.osuFriendlyName}
              columns={osuNameCols}
              pagination={false}
              rowKey={data?.osuFriendlyName}
            />
          </Card>
          <Item name="osuFriendlyName" style={{ height: '0' }}>
            <FormModal
              title="Add Name"
              fieldName="osuFriendlyName"
              onSubmit={onSubmit}
              visible={nameModal}
              form={nameForm}
              closeModal={handleCloseModal}
            />
          </Item>

          <Card
            title="Description:"
            bordered={false}
            extra={<Button onClick={() => setDescModal(true)}>Add</Button>}
          >
            <Table
              dataSource={data?.osuServiceDescription}
              columns={osuDescCols}
              pagination={false}
              rowKey={data?.osuServiceDescription}
            />
          </Card>
          <Item name="osuServiceDescription" style={{ height: '0' }}>
            <FormModal
              title="Add Description"
              fieldName="osuServiceDescription"
              onSubmit={onSubmit}
              visible={descModal}
              form={nameForm}
              closeModal={handleCloseModal}
            />
          </Item>

          <Card
            title="Icons:"
            bordered={false}
            extra={<Button onClick={() => setIconModal(true)}>Add</Button>}
          >
            <Table
              dataSource={data?.osuIconList}
              columns={[
                {
                  title: 'URL',
                  dataIndex: 'imageUrl',
                  width: 500,
                },
                {
                  title: 'Locale',
                  dataIndex: 'iconLocale',
                },
                {
                  title: '',
                  width: 80,
                  render: item => (
                    <Button
                      title="removeIcon"
                      icon={<DeleteOutlined />}
                      className={styles.iconButton}
                      onClick={() => {
                        removeItem('osuIconList', item);
                      }}
                    />
                  ),
                },
              ]}
              pagination={false}
              rowKey={data?.osuIconList}
            />
          </Card>

          <Item name="osuIconList" style={{ height: '0' }}>
            <Modal
              onSuccess={() => {
                iconForm.validateFields().then(values => {
                  onSubmit('osuIconList', values);
                  iconForm.resetFields();
                  setIconModal(false);
                });
              }}
              onCancel={() => {
                iconForm.resetFields();
                setIconModal(false);
              }}
              title="Add Icon"
              visible={iconModal}
              content={
                <Form {...layout} form={iconForm}>
                  <Item
                    name="imageUrl"
                    label="Url:"
                    rules={[
                      {
                        required: true,
                        message: 'Url field cannot be empty',
                      },
                    ]}
                  >
                    <Input placeholder="Enter the image url" />
                  </Item>

                  <Item
                    name="iconLocale"
                    label="Locale:"
                    rules={[
                      {
                        required: true,
                        message: 'Locale field cannot be empty',
                      },
                    ]}
                  >
                    <Select placeholder="Please select">
                      <Option value="en_CA">English</Option>
                      <Option value="fr_CA">Francais</Option>
                    </Select>
                  </Item>
                </Form>
              }
            />
          </Item>
        </>
      )}
    </Card>
  );
};

OsuForm.propTypes = {
  data: PropTypes.instanceOf(Object),
  onSubmit: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
};

OsuForm.defaultProps = {
  data: {},
};

export default OsuForm;
