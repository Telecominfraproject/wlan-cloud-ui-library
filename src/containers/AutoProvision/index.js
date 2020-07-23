import React, { useState } from 'react';
import { Card, Form, Select, Switch, Table } from 'antd';
import { FormOutlined, DeleteFilled } from '@ant-design/icons';
import Button from 'components/Button';
import Container from 'components/Container';
import Modal from 'components/Modal';
import globalStyles from 'styles/index.scss';
import FormModal from './components/FormModal';
import styles from './index.module.scss';

const { Item } = Form;
const { Option } = Select;

const AutoProvision = () => {
  const [form] = Form.useForm();
  const [toggle, setToggle] = useState(false);
  const [activeModel, setActiveModel] = useState({});
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 12 },
  };

  const onSubmit = () => {
    form
      .validateFields()
      .then(values => {
        console.log(values);
      })
      .catch(() => {});
  };

  const columns = [
    {
      title: 'MODEL',
      dataIndex: 'model',
      key: 'model',
      width: 100,
    },
    {
      title: 'PROFILE ID',
      dataIndex: 'ProfileId',
      key: 'profileId',
      width: 700,
    },
    {
      title: '',
      dataIndex: '',
      key: 'editModel',
      width: 60,
      render: (_, record) => (
        <Button
          title="edit-model"
          className={styles.InfoButton}
          type="primary"
          icon={<FormOutlined />}
          onClick={() => {
            setActiveModel({ ...record });
            setEditModal(true);
          }}
        />
      ),
    },
    {
      title: '',
      dataIndex: '',
      key: 'deleteModel',
      width: 60,
      render: (_, record) => (
        <Button
          title="delete-model"
          className={styles.InfoButton}
          type="primary"
          icon={<DeleteFilled />}
          onClick={() => {
            setActiveModel({ ...record });
            setDeleteModal(true);
          }}
        />
      ),
    },
  ];

  const data = [{ model: 'default', ProfileId: 'profileid' }];

  return (
    <Container>
      <Modal
        onCancel={() => setDeleteModal(false)}
        onSuccess={() => {}}
        visible={deleteModal}
        title="Are you sure?"
        buttonText="Delete"
        buttonType="danger"
        content={
          <p>
            Are you sure you want to delete the model: <strong> {activeModel.model} </strong>
          </p>
        }
      />
      <FormModal
        onCancel={() => setAddModal(false)}
        visible={addModal}
        onSubmit={() => {}}
        title="Add Model"
      />

      <FormModal
        onCancel={() => setEditModal(false)}
        visible={editModal}
        onSubmit={() => {}}
        title="Edit Model"
        {...activeModel}
      />
      <Form {...layout} form={form}>
        <div className={styles.Header}>
          <h1>Auto Provisioning</h1>
          <Item name="toggle" valuePropName="checked" noStyle>
            <Switch
              className={styles.Toggle}
              checked={toggle}
              onChange={() => setToggle(!toggle)}
              checkedChildren="Enabled"
              unCheckedChildren="Disabled"
            />
          </Item>
          <div>
            <Button type="primary" onClick={onSubmit}>
              Save
            </Button>
          </div>
        </div>

        {toggle && (
          <div className={styles.Content}>
            <Card title="Location">
              <Item
                label="Auto Provisioning Location"
                name="locationId"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Auto Provision Location',
                  },
                ]}
              >
                <Select className={globalStyles.field} placeholder="Select Location">
                  <Option key="default" value="default">
                    Default
                  </Option>
                </Select>
              </Item>
            </Card>

            <Card title="Equipment Profiles">
              <div className={styles.Content}>
                <div className={styles.ButtonDiv}>
                  <Button onClick={() => setAddModal(true)}>Add Model</Button>
                </div>
                <Table rowKey="ProfileId" columns={columns} dataSource={data} pagination={false} />
              </div>
            </Card>
          </div>
        )}
      </Form>
    </Container>
  );
};

export default AutoProvision;
