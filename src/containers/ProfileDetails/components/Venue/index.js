import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Table, Select as AntdSelect } from 'antd';
import { Select, RoleProtectedBtn } from 'components/WithRoles';
import { DeleteOutlined } from '@ant-design/icons';
import globalStyles from 'styles/index.scss';
import styles from '../index.module.scss';
import FormModal from './components/FormModal';

const { Item } = Form;
const { Option } = AntdSelect;

const VenueForm = ({ form, details, handleOnFormChange }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentVenueGroupId, setCurrentVenueGroupId] = useState(
    details?.venueTypeAssignment?.venueGroupId || 0
  );
  const [venueNameList, setVenueNameList] = useState(details?.venueNameSet || []);

  useEffect(() => {
    const formData = {
      venueTypeAssignment: {
        venueGroupId: details?.venueTypeAssignment?.venueGroupId || 0,
        venueTypeId: details?.venueTypeAssignment?.venueTypeId || 0,
      },
    };

    form.setFieldsValue({ ...formData });
  }, [form, details]);

  useEffect(() => {
    form.setFieldsValue({ venueNameSet: venueNameList });
  }, [venueNameList]);

  const handleNameSave = values => {
    const newVenue = { ...values, venueUrl: values.venueUrl.toLowerCase() };
    setVenueNameList([...venueNameList, newVenue]);
    handleOnFormChange();
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleRemove = item => {
    setVenueNameList(venueNameList.filter(i => i.dupleName !== item.dupleName));
    handleOnFormChange();
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'dupleName',
    },
    {
      title: 'Locale',
      dataIndex: 'locale',
    },
    {
      title: 'URL',
      dataIndex: 'venueUrl',
    },
    {
      title: '',
      width: 80,
      render: (_, record) => (
        <RoleProtectedBtn
          title="remove"
          icon={<DeleteOutlined />}
          className={styles.iconButton}
          onClick={() => handleRemove(record)}
        />
      ),
    },
  ];

  return (
    <div className={styles.ProfilePage}>
      <Card title="Venue Type">
        <Item label="Group:" name={['venueTypeAssignment', 'venueGroupId']}>
          <Select
            data-testid="venueGroup"
            className={globalStyles.field}
            placeholder="Select Venue Group"
            onChange={value => {
              setCurrentVenueGroupId(value);
              form.setFieldsValue({ venueTypeAssignment: { venueTypeId: 0 } });
            }}
          >
            <Option value={0}>Unspecified</Option>
            <Option value={1}>Assembly</Option>
            <Option value={2}>Business</Option>
            <Option value={3}>Educational</Option>
            <Option value={4}>Factory and Industrial</Option>
            <Option value={5}>Institutional</Option>
            <Option value={6}>Mercantile</Option>
            <Option value={7}>Residential</Option>
            <Option value={8}>Storage</Option>
            <Option value={9}>Utility and Miscellaneous</Option>
            <Option value={10}>Vehicular</Option>
            <Option value={11}>Outdoor</Option>
          </Select>
        </Item>
        <Item label="Type:" name={['venueTypeAssignment', 'venueTypeId']}>
          {(currentVenueGroupId === 0 && (
            <Select className={globalStyles.field} placeholder="Select Venue Type">
              <Option value={0}>Unspecified</Option>
            </Select>
          )) ||
            (currentVenueGroupId === 1 && (
              <Select className={globalStyles.field} placeholder="Select Venue Type">
                <Option value={0}>Unspecified Assembly</Option>
                <Option value={1}>Areana</Option>
                <Option value={2}>Stadium</Option>
                <Option value={3}>Passenger Terminal</Option>
                <Option value={4}>Amphitheatre</Option>
                <Option value={5}>Amusement Park</Option>
                <Option value={6}>Place of Worship</Option>
                <Option value={7}>Convention Center</Option>
                <Option value={8}>Library</Option>
                <Option value={9}>Museum</Option>
                <Option value={10}>Restaurant</Option>
                <Option value={11}>Theatre</Option>
                <Option value={12}>Bar</Option>
                <Option value={13}>Coffee Shop</Option>
                <Option value={14}>Zoo or Aquarium</Option>
                <Option value={15}>Emergency Coordination Center</Option>
              </Select>
            )) ||
            (currentVenueGroupId === 2 && (
              <Select className={globalStyles.field} placeholder="Select Venue Type">
                <Option value={0}>Unspecified Business</Option>
                <Option value={1}>Doctor or Dentist office</Option>
                <Option value={2}>Bank</Option>
                <Option value={3}>Fire Station</Option>
                <Option value={4}>Police Station</Option>
                {/* <Option value={5}></Option> */}
                <Option value={6}>Post Office</Option>
                <Option value={7}>Professional Office</Option>
                <Option value={8}>Research and Development Facility</Option>
                <Option value={9}>Attorney Office</Option>
              </Select>
            )) ||
            (currentVenueGroupId === 3 && (
              <Select className={globalStyles.field} placeholder="Select Venue Type">
                <Option value={0}>Unspecified Educational</Option>
                <Option value={1}>School, Primary</Option>
                <Option value={2}>School, Secondary</Option>
                <Option value={3}>University or College</Option>
              </Select>
            )) ||
            (currentVenueGroupId === 4 && (
              <Select className={globalStyles.field} placeholder="Select Venue Type">
                <Option value={0}>Unspecified Factory and Industrial</Option>
                <Option value={1}>Factory</Option>
              </Select>
            )) ||
            (currentVenueGroupId === 5 && (
              <Select className={globalStyles.field} placeholder="Select Venue Type">
                <Option value={0}>Unspecified Institutional</Option>
                <Option value={1}>Hospital</Option>
                <Option value={2}>Long-Term Care Facility</Option>
                <Option value={3}>Alcohol and Drug Re-habilitation Center</Option>
                <Option value={4}>Group Home</Option>
                <Option value={5}>Prison or Jail</Option>
              </Select>
            )) ||
            (currentVenueGroupId === 6 && (
              <Select className={globalStyles.field} placeholder="Select Venue Type">
                <Option value={0}>Unspecified Mercantile</Option>
                <Option value={1}>Retail Store</Option>
                <Option value={2}>Grocery Market</Option>
                <Option value={3}>Automotive Service Station</Option>
                <Option value={4}>Shopping Mall</Option>
                <Option value={5}>Gas Station</Option>
              </Select>
            )) ||
            (currentVenueGroupId === 7 && (
              <Select className={globalStyles.field} placeholder="Select Venue Type">
                <Option value={0}>Unspecified Residential</Option>
                <Option value={1}>Pivate Residence</Option>
                <Option value={2}>Hotel or Model</Option>
                <Option value={3}>Dormitory</Option>
                <Option value={4}>Boarding House</Option>
              </Select>
            )) ||
            (currentVenueGroupId === 8 && (
              <Select className={globalStyles.field} placeholder="Select Venue Type">
                <Option value={0}>Unspecified Storage</Option>
              </Select>
            )) ||
            (currentVenueGroupId === 9 && (
              <Select className={globalStyles.field} placeholder="Select Venue Type">
                <Option value={0}>Unspecified Utility and Miscellaneous</Option>
              </Select>
            )) ||
            (currentVenueGroupId === 10 && (
              <Select className={globalStyles.field} placeholder="Select Venue Type">
                <Option value={0}>Unspecified Vehicular</Option>
                <Option value={1}>Automobile or Truck</Option>
                <Option value={2}>Airplane</Option>
                <Option value={3}>Bus</Option>
                <Option value={4}>Ferry</Option>
                <Option value={5}>Ship or Boat</Option>
                <Option value={6}>Train</Option>
                <Option value={7}>Motor Bike</Option>
              </Select>
            )) ||
            (currentVenueGroupId === 11 && (
              <Select className={globalStyles.field} placeholder="Select Venue Type">
                <Option value={0}>Unspecified Outdoor</Option>
                <Option value={1}>Muni-mesh Network</Option>
                <Option value={2}>City Park</Option>
                <Option value={3}>Rest Area</Option>
                <Option value={4}>Traffic Control</Option>
                <Option value={5}>Bus Stop</Option>
                <Option value={6}>Kiosk</Option>
              </Select>
            ))}
        </Item>
      </Card>

      <Card
        title="Venue Name"
        extra={
          <RoleProtectedBtn type="solid" onClick={() => setModalVisible(true)}>
            Add Name
          </RoleProtectedBtn>
        }
      >
        <Item noStyle name="venueNameSet">
          <Table
            dataSource={venueNameList}
            columns={columns}
            pagination={false}
            rowKey="dupleName"
          />
        </Item>
      </Card>

      <FormModal
        visible={modalVisible}
        closeModal={handleCloseModal}
        onSubmit={handleNameSave}
        title="Add name"
      />
    </div>
  );
};

VenueForm.propTypes = {
  details: PropTypes.instanceOf(Object),
  form: PropTypes.instanceOf(Object),
  handleOnFormChange: PropTypes.func,
};

VenueForm.defaultProps = {
  form: null,
  details: {},
  handleOnFormChange: () => {},
};

export default VenueForm;
