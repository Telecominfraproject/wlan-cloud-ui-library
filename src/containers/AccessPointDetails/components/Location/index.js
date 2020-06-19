import React from 'react';
import { Card, Form, Select } from 'antd';
import Button from 'components/Button';
import styles from '../../index.module.scss';

const { Option } = Select;
const { Item } = Form;

const Location = () => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 12 },
  };

  const handleOnSave = () => {
    form.validateFields().catch(() => {});
  };
  return (
    <Form {...layout} form={form}>
      <div className={styles.InlineEndDiv}>
        <Button className={styles.saveButton} onClick={handleOnSave} type="primary">
          Save
        </Button>
      </div>
      <Card title="Location">
        <Item
          label="City"
          name="city"
          rules={[
            {
              required: true,
              message: 'Please select your location city.',
            },
          ]}
        >
          <Select className={styles.Field} placeholder="Select Location Site...">
            <Option value="default">Default</Option>
          </Select>
        </Item>
        <Item
          label="Building"
          name="building"
          rules={[
            {
              required: true,
              message: 'Please select your location building.',
            },
          ]}
        >
          <Select className={styles.Field} placeholder="Select Location Building...">
            <Option value="default">Default</Option>
          </Select>
        </Item>
        <Item
          label="Floor"
          name="floor"
          rules={[
            {
              required: true,
              message: 'Please select your location floor.',
            },
          ]}
        >
          <Select className={styles.Field} placeholder="Select Location Floor...">
            <Option value="default">Default</Option>
          </Select>
        </Item>
      </Card>
    </Form>
  );
};

export default Location;
