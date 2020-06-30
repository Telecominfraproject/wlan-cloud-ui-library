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

  const getLocationPath = () => {
    const locationsPath = [];
    const treeRecurse = (parentNodeId, node) => {
      if (node.id === parentNodeId) {
        locationsPath.unshift(node);
        return node;
      }
      if (node.children) {
        let parent;
        node.children.some(i => {
          parent = treeRecurse(parentNodeId, i);
          return parent;
        });
        if (parent) {
          locationsPath.unshift(node);
        }
        return parent;
      }
      return null;
    };

    treeRecurse(data.locationId, {
      id: 0,
      children: locations,
    });

    locationsPath.shift();
    return locationsPath;
  };

  const locationPath = getLocationPath();

  const [city, setCity] = useState(locationPath[0]);
  const [building, setBuilding] = useState(locationPath.length > 1 ? locationPath[1] : null);
  const [floor, setFloor] = useState(locationPath.length > 2 ? locationPath[2] : null);

  const handleOnSave = () => {
    const {
      id,
      equipmentType,
      inventoryId,
      customerId,
      profileId,
      name,
      latitude,
      longitude,
      serial,
      lastModifiedTimestamp,
      details,
    } = data;
    let { locationId } = data;

    form
      .validateFields()
      .then(newValues => {
        if ('floor' in newValues) {
          locationId = newValues.floor;
        } else if ('building' in newValues) {
          locationId = newValues.building;
        } else if ('city' in newValues) {
          locationId = newValues.city;
        }

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
          details
        );
      })
      .catch(() => {});
  };

  const handleOnChangeCity = value => {
    form.setFieldsValue({ city: value, building: null, floor: null });
    setCity(locations.find(i => i.id === value));
    setBuilding(null);
    setFloor(null);
  };

  const handleOnChangeBuilding = value => {
    form.setFieldsValue({ building: value, floor: null });
    setBuilding(city.children.find(i => i.id === value));
    setFloor(null);
  };

  const handleOnChangeFloor = value => {
    form.setFieldsValue({ floor: value });
    setFloor(building.children.find(i => i.id === value));
  };

  form.setFieldsValue({
    city: city.id,
    building: building && building.id,
    floor: floor && floor.id,
  });

  return (
    <Form {...layout} form={form}>
      <div className={styles.InlineEndDiv}>
        <Button className={styles.saveButton} onClick={handleOnSave} type="primary">
          Save
        </Button>
      </div>

      <Card title="Location">
        {locationPath.length > 0 && (
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
              placeholder="Select Location City..."
              onChange={handleOnChangeCity}
            >
              {Object.keys(locations).map(i => (
                <Option key={locations[i].id} value={locations[i].id}>
                  {locations[i].name}
                </Option>
              ))}
            </Select>
          </Item>
        )}

        {city && city.children && (
          <Item label="Building" name="building">
            <Select
              className={styles.Field}
              placeholder="Select Location Building..."
              onChange={handleOnChangeBuilding}
            >
              {Object.keys(city.children).map(i => (
                <Option key={city.children[i].id} value={city.children[i].id}>
                  {city.children[i].name}
                </Option>
              ))}
            </Select>
          </Item>
        )}
        {building && building.children && (
          <Item label="Floor" name="floor">
            <Select
              className={styles.Field}
              placeholder="Select Location Floor..."
              onChange={handleOnChangeFloor}
            >
              {Object.keys(building.children).map(i => (
                <Option key={building.children[i].id} value={building.children[i].id}>
                  {building.children[i].name}
                </Option>
              ))}
            </Select>
          </Item>
        )}
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
