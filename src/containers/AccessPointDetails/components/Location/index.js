import React from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Select } from 'antd';
import Button from 'components/Button';
import styles from '../../index.module.scss';

const { Option } = Select;
const { Item } = Form;

const Location = ({ locations, data, onUpdateEquipment }) => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 12 },
  };

  const handleOnSave = () => {
    form
      .validateFields()
      .then(values => onUpdateEquipment(values))
      .catch(() => {});
  };

  const findLocation = (objects, id) => {
    const arr = [...objects];
    while (arr.length) {
      const obj = arr.shift();
      if (obj.id === id) return obj;
      arr.push(...(obj.children || []));
    }
    return null;
  };

  const selectedLocation = findLocation(locations, data.locationId);

  const getLocationPath = () => {
    const locationsPath = [];
    const treeRecurse = (parentNodeId, node) => {
      if (node.id === parentNodeId) {
        locationsPath.unshift({
          id: node.id,
          parentId: node.parentId,
          name: node.name,
        });
        return node;
      }
      if (node.children) {
        let parent;
        node.children.some(i => {
          parent = treeRecurse(parentNodeId, i);
          return parent;
        });
        if (parent) {
          locationsPath.unshift({ id: node.id, parentId: node.parentId, name: node.name });
        }
        return parent;
      }
      return null;
    };
    if (selectedLocation) {
      locationsPath.unshift({ ...selectedLocation });
      treeRecurse(selectedLocation.parentId, locations[0]);
    }
    return locationsPath;
  };

  const locationPath = getLocationPath();

  const validate = num => {
    if (typeof locationPath[num] !== 'undefined') {
      return <Option value={locationPath[num].name}>{locationPath[num].name}</Option>;
    }
    return null;
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
          <Select className={styles.Field} placeholder="Select Location City...">
            <Option value={locationPath[0].name}>{locationPath[0].name}</Option>
          </Select>
        </Item>

        <Item
          label="Building"
          name="building"
          rules={[
            {
              required: locationPath.length >= 2,
              message: 'Please select your location building.',
            },
          ]}
        >
          <Select
            className={styles.Field}
            placeholder="Select Location Building..."
            disabled={selectedLocation.locationType === 'SITE'}
          >
            {validate(1)}
          </Select>
        </Item>
        <Item
          label="Floor"
          name="floor"
          rules={[
            {
              required: locationPath.length === 3,
              message: 'Please select your location building.',
            },
          ]}
        >
          <Select
            className={styles.Field}
            placeholder="Select Location Floor..."
            disabled={selectedLocation.locationType === 'SITE'}
          >
            {validate(2)}
          </Select>
        </Item>
      </Card>
    </Form>
  );
};

Location.propTypes = {
  data: PropTypes.instanceOf(Object),
  locations: PropTypes.instanceOf(Array).isRequired,
  onUpdateEquipment: PropTypes.func.isRequired,
};

Location.defaultProps = {
  data: {},
};

export default Location;
