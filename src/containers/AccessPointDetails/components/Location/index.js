import React, { useState } from 'react';
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
  const {
    id,
    equipmentType,
    inventoryId,
    customerId,
    profileId,
    locationId,
    name,
    latitude,
    longitude,
    serial,
    lastModifiedTimestamp,
  } = data;

  const handleOnSave = () => {
    form.validateFields().then(details => {
      onUpdateEquipment(
        id,
        equipmentType,
        inventoryId,
        customerId,
        profileId,
        locationId,
        name,
        latitude,
        longitude,
        serial,
        lastModifiedTimestamp,
        Object.assign(data.details, details)
      );
    });
  };

  const findLocation = (objects, idKey) => {
    const arr = [...objects];
    while (arr.length) {
      const obj = arr.shift();
      if (obj.id === idKey) return obj;
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
  const [city, setCity] = useState(locationPath[0].name);

  const validate = num => {
    if (typeof locationPath[num] !== 'undefined') {
      return <Option value={locationPath[num].name}>{locationPath[num].name}</Option>;
    }
    return null;
  };

  return (
    <Form {...layout} form={form} initialValues={{ city: locationPath[0].name }}>
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
          <Select
            className={styles.Field}
            onChange={value => setCity(value)}
            placeholder="Select Location City..."
          >
            {Object.keys(locations).map(i => (
              <Option value={locations[i].name}>{locations[i].name}</Option>
            ))}
          </Select>
        </Item>

        <Item label="Building" name="building">
          <Select className={styles.Field} placeholder="Select Location Building...">
            {validate(1)}
          </Select>
        </Item>
        <Item label="Floor" name="floor">
          <Select className={styles.Field} placeholder="Select Location Floor...">
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
