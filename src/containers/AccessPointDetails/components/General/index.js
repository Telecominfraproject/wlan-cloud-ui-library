import React, { useEffect, useState, useContext, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Form,
  Table,
  Collapse,
  Select as AntdSelect,
  notification,
  Alert,
  Empty,
  Typography,
} from 'antd';
import { Card } from 'components/Skeleton';
import { Input, Select, RoleProtectedBtn } from 'components/WithRoles';
import _ from 'lodash';
import ThemeContext from 'contexts/ThemeContext';

import Advanced from './components/Advanced';

import styles from '../../index.module.scss';

const { Item } = Form;
const { Panel } = Collapse;
const { Text } = Typography;

const { Option } = AntdSelect;

const General = ({
  data,
  profiles,
  handleOnEquipmentSave,
  handleOnFormChange,
  loadingProfiles,
  errorProfiles,
  onFetchMoreProfiles,
  onSearchProfile,
  extraFields,
  extraGeneralCards,
  loading,
  isFormDirty,
}) => {
  const { radioTypes, routes } = useContext(ThemeContext);
  const history = useHistory();

  const [form] = Form.useForm();
  const columns = [
    {
      title: 'Wireless Network',
      dataIndex: 'name',
      key: 'network',
    },
    {
      title: 'SSID',
      dataIndex: ['details', 'ssid'],
      key: 'ssid',
    },
    {
      title: 'Security Mode',
      dataIndex: ['details', 'secureMode'],
      key: 'security',
    },
    {
      title: 'Radio(s)',
      dataIndex: ['details', 'appliedRadios'],
      key: 'radios',
      render: appliedRadios => appliedRadios?.map(i => radioTypes?.[i])?.join(',  '),
    },
  ];

  const [selectedProfile, setSelectedProfile] = useState(data.profile);

  const childProfiles = useMemo(() => {
    const result = {
      rf: [],
      ssid: [],
    };
    if (selectedProfile?.childProfiles) {
      selectedProfile.childProfiles.forEach(profile => {
        if (profile?.details?.profileType === 'rf') {
          result.rf.push(profile);
        } else if (profile?.details?.profileType === 'ssid') {
          result.ssid.push(profile);
        }
      });
    }
    return result;
  }, [selectedProfile]);

  useEffect(() => {
    setSelectedProfile(data?.profile);
  }, [data.profile]);

  const handleProfileChange = value => {
    const i = profiles.find(o => {
      return o.id === value;
    });
    setSelectedProfile(i);
  };

  const {
    id,
    equipmentType,
    inventoryId,
    customerId,
    locationId,
    latitude,
    longitude,
    serial,
    lastModifiedTimestamp,
  } = data;

  const handleOnSave = () => {
    form
      .validateFields()
      .then(values => {
        const formattedData = _.merge({}, data.details, values);

        const formatSourceSelection = radioMapKey =>
          Object.keys(formattedData?.[radioMapKey]).forEach(i =>
            Object.keys(formattedData?.[radioMapKey][i]).forEach(j => {
              if (
                formattedData?.[radioMapKey][i][j]?.source &&
                !_.isEqual(
                  formattedData?.[radioMapKey][i][j]?.value,
                  data?.details?.[radioMapKey]?.[i]?.[j]?.value
                )
              ) {
                // eslint-disable-next-line no-param-reassign
                formattedData[radioMapKey][i][j].source = 'manual';
              }
            })
          );

        formatSourceSelection('advancedRadioMap');
        formatSourceSelection('radioMap');

        handleOnEquipmentSave({
          id,
          equipmentType,
          inventoryId,
          customerId,
          profileId: selectedProfile?.id,
          locationId,
          name: values.access,
          baseMacAddress: data?.baseMacAddress,
          latitude,
          longitude,
          serial,
          lastModifiedTimestamp,
          formattedData,
        });
      })
      .catch(() => {
        notification.error({
          message: 'Error',
          description: 'Equipment settings could not be updated.',
        });
      });
  };

  if (errorProfiles) {
    return (
      <Alert
        message="Error"
        description="Failed to load Access Point profiles."
        type="error"
        showIcon
        data-testid="errorProfiles"
      />
    );
  }

  return (
    <Form {...pageLayout} form={form} onValuesChange={handleOnFormChange}>
      <div className={styles.InlineEndDiv}>
        <RoleProtectedBtn
          className={styles.saveButton}
          onClick={handleOnSave}
          type="primary"
          name="save"
          disabled={!isFormDirty}
        >
          Save
        </RoleProtectedBtn>
      </div>

      <Card title="Identity" loading={loading}>
        <Item
          label="Access Point Name"
          name="access"
          initialValue={data.name}
          rules={[
            {
              required: true,
              message: 'Enter the Access Point name',
            },
          ]}
        >
          <Input className={styles.Field} placeholder="Enter Access Point Name" />
        </Item>
        <Item label="Model"> {data?.model}</Item>
        <Item label="Serial Number">{data?.serial} </Item>
        <Item label="SKU"> {data?.status?.protocol?.detailsJSON?.reportedSku}</Item>
        <Item label="Country Code"> {data?.status?.protocol?.detailsJSON?.countryCode}</Item>
        <Item label="Ethernet MAC Address">{data?.baseMacAddress}</Item>
        <Item label="Manufacturer"> {data?.manufacturer}</Item>
        <Item label="Asset ID"> {data?.inventoryId}</Item>
      </Card>

      <Card title="Profile" loading={loading}>
        <Item
          label="Access Point Profile"
          name="apProfile"
          initialValue={data?.profile?.name}
          rules={[
            {
              required: true,
              message: 'Please select your Access Point Profile.',
            },
          ]}
        >
          <Select
            className={styles.Field}
            onChange={handleProfileChange}
            placeholder="Select Access Point profile..."
            onPopupScroll={onFetchMoreProfiles}
            showSearch={onSearchProfile}
            filterOption={false}
            onSearch={onSearchProfile}
            onSelect={() => onSearchProfile && onSearchProfile()}
            loading={loadingProfiles}
            notFoundContent={!loadingProfiles && <Empty />}
          >
            {profiles.map(i => (
              <Option key={i.id} value={i.id}>
                {i.name}
              </Option>
            ))}
          </Select>
        </Item>

        <Item label="RF Profile">
          {childProfiles.rf?.[0]?.name ? (
            <Link to={`${routes.profiles}/${childProfiles.rf?.[0]?.id}`}>
              <Text type="secondary">{childProfiles.rf?.[0]?.name}</Text>
            </Link>
          ) : (
            'N/A'
          )}
        </Item>
        <Item label="Summary">
          <Item>
            <Table
              rowKey="id"
              scroll={{ x: 'max-content' }}
              dataSource={childProfiles.ssid}
              columns={columns}
              pagination={false}
              rowClassName={styles.Row}
              onRow={record => ({
                onClick: () => {
                  history.push(`${routes.profiles}/${record.id}`);
                },
              })}
            />
          </Item>
        </Item>
      </Card>

      {extraGeneralCards}
      <Collapse expandIconPosition="right">
        <Panel header="Advanced Settings" name="settings">
          <Advanced
            extraFields={extraFields}
            childProfiles={childProfiles}
            data={data}
            radioTypes={radioTypes}
            form={form}
          />
        </Panel>
      </Collapse>
    </Form>
  );
};

General.propTypes = {
  data: PropTypes.instanceOf(Object),
  profiles: PropTypes.instanceOf(Array),
  handleOnEquipmentSave: PropTypes.func,
  handleOnFormChange: PropTypes.func,
  loadingProfiles: PropTypes.bool,
  errorProfiles: PropTypes.instanceOf(Object),
  onFetchMoreProfiles: PropTypes.func,
  onSearchProfile: PropTypes.func,
  extraFields: PropTypes.instanceOf(Array),
  extraGeneralCards: PropTypes.node,
  loading: PropTypes.bool,
  isFormDirty: PropTypes.bool,
};

General.defaultProps = {
  data: {},
  profiles: [],
  handleOnFormChange: () => {},
  handleOnEquipmentSave: () => {},
  loadingProfiles: true,
  errorProfiles: null,
  onFetchMoreProfiles: () => {},
  onSearchProfile: null,
  extraFields: [],
  extraGeneralCards: null,
  loading: false,
  isFormDirty: false,
};

export default General;
