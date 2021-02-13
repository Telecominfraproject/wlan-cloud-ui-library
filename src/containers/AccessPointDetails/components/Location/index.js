import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Select } from 'antd';
import Button from 'components/Button';
import { pageLayout } from 'utils/form';
import styles from '../../index.module.scss';

const { Option } = Select;
const { Item } = Form;

const Location = ({ locations, data, handleOnEquipmentSave, handleOnFormChange }) => {
  const [form] = Form.useForm();

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
        locationId = form.getFieldValue('locations').slice(-1)[0].id;

        handleOnEquipmentSave({
          id,
          equipmentType,
          inventoryId,
          customerId,
          profileId,
          locationId,
          name,
          baseMacAddress: data?.baseMacAddress,
          latitude,
          longitude,
          serial,
          lastModifiedTimestamp,
          details,
        });
      })
      .catch(() => {});
  };

  const handleOnChangeSite = (value, i, sites) => {
    const newSite = sites[i].children.find(child => child.id === value);
    newSite.level = null;

    const newLocationData = sites.splice(0, i + 2);
    newLocationData[i].level = newSite.name;
    newLocationData[i + 1] = newSite;

    form.setFieldsValue({
      locations: newLocationData,
    });
  };

  useEffect(() => {
    form.setFieldsValue({
      locations: locationPath.map((location, i) => {
        return {
          level: locationPath[i + 1]?.name,
          children: location.children,
        };
      }),
    });
  }, []);

  return (
    <Form {...pageLayout} form={form} onValuesChange={handleOnFormChange}>
      <div className={styles.InlineEndDiv}>
        <Button className={styles.saveButton} onClick={handleOnSave} type="primary">
          Save
        </Button>
      </div>

      <Card title="Location">
        <Form.List name="locations">
          {fields => (
            <>
              {fields.map((field, i) => {
                const sites = form.getFieldValue('locations');
                return (
                  sites[i].children && (
                    <Item
                      key={field.key}
                      label={`Level ${i}`}
                      name={[field.name, `level`]}
                      rules={[{ required: i === 0 }]}
                    >
                      <Select
                        className={styles.Field}
                        placeholder="Select Location..."
                        onChange={value => handleOnChangeSite(value, i, sites)}
                      >
                        {sites[i].children?.map(child => (
                          <Option key={child.id} value={child.id}>
                            {child.name}
                          </Option>
                        ))}
                      </Select>
                    </Item>
                  )
                );
              })}
            </>
          )}
        </Form.List>
      </Card>
    </Form>
  );
};

Location.propTypes = {
  data: PropTypes.instanceOf(Object),
  locations: PropTypes.instanceOf(Array).isRequired,
  handleOnEquipmentSave: PropTypes.func,
  handleOnFormChange: PropTypes.func,
};

Location.defaultProps = {
  data: {},
  handleOnFormChange: () => {},
  handleOnEquipmentSave: () => {},
};

export default Location;
