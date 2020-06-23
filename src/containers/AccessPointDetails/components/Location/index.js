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

  const findLocation = (objects, id) => {
    const arr = [...objects];
    while (arr.length) {
      const obj = arr.shift();
      if (obj.id === id) return obj;
      arr.push(...(obj.children || []));
    }
    return null;
  };

  const initialLocation = findLocation(locations, data.locationId);
  const parentLocation = findLocation(locations, initialLocation.parentId);
  const grandparentLocation = findLocation(locations, parentLocation.parentId);

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
            {grandparentLocation.locationType === 'SITE' && (
              <Option value={grandparentLocation.name}>{grandparentLocation.name}</Option>
            )}
          </Select>
        </Item>

        <Item label="Building" name="building">
          <Select
            className={styles.Field}
            placeholder="Select Location Building..."
            disabled={initialLocation.locationType === 'SITE'}
          >
            {parentLocation.locationType === 'BUILDING' && (
              <Option value={parentLocation.name}>{parentLocation.name}</Option>
            )}
          </Select>
        </Item>
        <Item label="Floor" name="floor">
          <Select
            className={styles.Field}
            placeholder="Select Location Floor..."
            disabled={initialLocation.locationType === 'SITE'}
          >
            {initialLocation.locationType === 'FLOOR' && (
              <Option value={initialLocation.name}>{initialLocation.name}</Option>
            )}
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
