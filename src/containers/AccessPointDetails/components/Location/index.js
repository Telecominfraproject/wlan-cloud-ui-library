import React, { useEffect, useState } from 'react';
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
  const [locationData, setLocationData]= useState(locationPath);

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
      .then(() => {
        locationId = locationData.slice(-1)[0].id;

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
  
  const handleOnChangeSite = (value, i, site) => {
    const newSite = site.children.find(child => child.id === value);

    const newLocationData = locationData.splice(0, i + 2);
    newLocationData[i+1] = newSite;

    setLocationData(newLocationData);
  };

  useEffect(() => {
    locationData.forEach((site, i) => {
      form.setFieldsValue({
        [`site${i}`]: locationData[i+1]?.name,
      });
    });
  }, [locationData]);

  return (
    <Form {...layout} form={form}>
      <div className={styles.InlineEndDiv}>
        <Button className={styles.saveButton} onClick={handleOnSave} type="primary">
          Save
        </Button>
      </div>

      <Card title="Location">
        {
          locationData.map((site, i) => {
            return site.children &&
              (<Item
                key={site.id}
                label={i === 0 ? 'Country' :`Site ${i}`}
                name={`site${i}`}
                rules={[
                  { required: i === 0 }
                ]}
                >
                <Select
                  className={styles.Field}
                  placeholder="Select Site..."
                  onChange={(value) => handleOnChangeSite(value, i, site)}
                >
                  {site.children.map(child => (
                    <Option key={child.id} value={child.id}>
                      {child.name}
                    </Option>
                  ))}
                </Select>
              </Item>);
          })
        }
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
