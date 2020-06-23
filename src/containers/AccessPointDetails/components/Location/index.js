import React from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Select } from 'antd';
import Button from 'components/Button';
import styles from '../../index.module.scss';

const { Option } = Select;
const { Item } = Form;

const Location = ({ locations, data }) => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 12 },
  };

  const handleOnSave = () => {
    form.validateFields().catch(() => {});
  };

  console.log(data);
  console.log(locations);

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
          <Select className={styles.Field} placeholder="Select Location City...">
            {Object.keys(locations).map(i => (
              <Option value={locations[i].name}>{locations[i].name}</Option>
            ))}
          </Select>
        </Item>

        <Item label="Building" name="building">
          <Select className={styles.Field} placeholder="Select Location Building...">
            <Option value="COUNTRY">COUNTRY</Option>
            <Option value="SITE">SITE</Option>
            <Option value="BUILDING">BUILDING</Option>
            <Option value="FLOOR">FLOOR</Option>
          </Select>
        </Item>
        <Item label="Floor" name="floor">
          <Select className={styles.Field} placeholder="Select Location Floor...">
            <Option value="default">Default</Option>
          </Select>
        </Item>
      </Card>
    </Form>
  );
};

Location.propTypes = {
  data: PropTypes.instanceOf(Object),
  locations: PropTypes.instanceOf(Array).isRequired,
};

Location.defaultProps = {
  data: {},
};

export default Location;
