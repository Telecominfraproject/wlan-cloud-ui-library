import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Form, Input, Select, Table, Upload, message } from 'antd';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';

import Modal from 'components/Modal';
import globalStyles from 'styles/index.scss';

import styles from '../index.module.scss';

const { Item } = Form;
const { Option } = Select;

const formatFile = file => {
  return {
    uid: file.apExportUrl,
    name: file.apExportUrl,
    type: file.fileType,
  };
};

const PasspointProfileForm = ({
  form,
  details,
  childProfileIds,
  venueProfiles,
  operatorProfiles,
  idProviderProfiles,
  fileUpload,
  onFetchMoreVenueProfiles,
  onFetchMoreOperatorProfiles,
  onFetchMoreIdProviderProfiles,
}) => {
  const [termsAndConditionsFileList, setTermsAndConditionsFileList] = useState(
    (details?.termsAndConditionsFile && [formatFile(details.termsAndConditionsFile)]) || []
  );
  const [selectedChildProfiles, setSelectdChildProfiles] = useState(childProfileIds);
  const [modalVisible, setModalVisible] = useState(false);
  const [connectionCapabilitySetList, setConnectionCapabilitySetList] = useState(
    details?.connectionCapabilitySet || []
  );
  const [connectionForm] = Form.useForm();

  useEffect(() => {
    setSelectdChildProfiles(childProfileIds);
    form.setFieldsValue({
      passpointVenueProfileName: details?.passpointVenueProfileName || null,
      passpointOperatorProfileName: details?.passpointOperatorProfileName || null,
      idProviderProfileNames: details?.idProviderProfileNames || [],
      enableInterworkingAndHs20: details?.enableInterworkingAndHs20 || 'true',
      hessid: {
        addressAsString: details?.hessid?.addressAsString || null,
      },
      accessNetworkType: details?.accessNetworkType || 'private_network',
      networkAuthenticationType:
        details?.networkAuthenticationType || 'acceptance_of_terms_and_conditions',
      termsAndConditionsFile: 
        details?.termsAndConditionsFile && formatFile(details?.termsAndConditionsFile),
      emergencyServicesReachable: details?.emergencyServicesReachable || 'true',
      unauthenticatedEmergencyServiceAccessible:
        details?.unauthenticatedEmergencyServiceAccessible || 'true',
      internetConnectivity: details?.internetConnectivity || 'true',
      ipAddressTypeAvailability: details?.ipAddressTypeAvailability || 'address_type_not_available',
      qosMapSetConfiguration: details?.qosMapSetConfiguration || [],
      anqpDomainId: details?.anqpDomainId || 0,
      gasAddr3Behaviour: details?.gasAddr3Behaviour || 'p2pSpecWorkaroundFromRequest',
      disableDownstreamGroupAddressedForwarding:
        details?.disableDownstreamGroupAddressedForwarding || 'true',
      childProfileIds,
    });
  }, [form, details, childProfileIds]);

  useEffect(() => {
    form.setFieldsValue({ connectionCapabilitySet: connectionCapabilitySetList });
  }, [connectionCapabilitySetList]);

  const handleOnChangeVenue = (_selectedItem, option) => {
    form.setFieldsValue({
      childProfileIds: [...selectedChildProfiles, option.key],
    });
    setSelectdChildProfiles([...selectedChildProfiles, option.key]);
  };

  // const handleRemoveVenue = id => {
  //   form.setFieldsValue({
  //     childProfileIds: selectedChildProfiles.filter(i => i !== id),
  //   });
  //   setSelectdChildProfiles(selectedChildProfiles.filter(i => i !== id));
  // };

  const handleOnChangeOperator = (_selectedItem, option) => {
    form.setFieldsValue({
      childProfileIds: [...selectedChildProfiles, option.key],
    });
    setSelectdChildProfiles([...selectedChildProfiles, option.key]);
  };

  // const handleRemoveOperator = id => {
  //   form.setFieldsValue({
  //     childProfileIds: selectedChildProfiles.filter(i => i !== id),
  //   });
  //   setSelectdChildProfiles(selectedChildProfiles.filter(i => i !== id));
  // };

  const handleOnChangeIdProvider = (_selectedItem, option) => {
    form.setFieldsValue({
      childProfileIds: [...selectedChildProfiles, option.key],
    });
    setSelectdChildProfiles([...selectedChildProfiles, option.key]);
  };

  const handleRemoveIdProvider = (_selectedItem, option) => {
    form.setFieldsValue({
      childProfileIds: selectedChildProfiles.filter(i => i !== option.key),
    });
    setSelectdChildProfiles(selectedChildProfiles.filter(i => i !== option.key));
  };

  const validateFile = (file, showMessages = false) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
    if (!isJpgOrPng) {
      if (showMessages) message.error('You can only upload JPG/PNG file!');
      return false;
    }

    const isValidSize = file.size / 1024 < 400;

    if (!isValidSize) {
      if (showMessages) message.error('Image must smaller than 400KB!');
      return false;
    }

    return true;
  };

  const handleOnFileChange = (file, fileList) => {
    if (validateFile(file)) {
      let list = [...fileList];

      list = list.slice(-1);
      list = list.map(i => ({ ...i, url: i.response && i.response.url }));

      return list;
    }
    return false;
  };

  const handleOnChangeTermsAndConditions = ({ file, fileList }) => {
    if (fileList.length === 0) {
      setTermsAndConditionsFileList([]);
    }
    const list = handleOnFileChange(file, fileList);
    if (list) setTermsAndConditionsFileList(list);
  };

  const handleFileUpload = file => {
    if (validateFile(file, true)) {
      fileUpload(file.name, file);
    }
    return false;
  };

  const handleConnectionSave = () => {
    connectionForm
      .validateFields()
      .then(newConnection => {
        setConnectionCapabilitySetList([...connectionCapabilitySetList, newConnection]);
        connectionForm.resetFields();
        setModalVisible(false);
      })
      .catch(() => {});
  };

  const handleConnectionRemove = item => {
    setConnectionCapabilitySetList(
      connectionCapabilitySetList.filter(
        i => i.connectionCapabilitiesPortNumber !== item.connectionCapabilitiesPortNumber
      )
    );
  };

  const columns = [
    {
      title: 'Status',
      dataIndex: 'connectionCapabilitiesStatus',
    },
    {
      title: 'Protocol',
      dataIndex: 'connectionCapabilitiesIpProtocol',
    },
    {
      title: 'Port',
      dataIndex: 'connectionCapabilitiesPortNumber',
    },
    {
      title: '',
      width: 80,
      render: (_, record) => (
        <Button
          title="remove"
          icon={<DeleteOutlined />}
          className={styles.iconButton}
          type="danger"
          onClick={() => handleConnectionRemove(record)}
        />
      ),
    },
  ];

  const defaultOptions = (
    <Select className={styles.Field}>
      <Option value="true">Enabled</Option>
      <Option value="false">Disabled</Option>
    </Select>
  );

  const qosMapSetOptions = [];
  for (let i = 1; i < 65; i+=1) {
    qosMapSetOptions.push(<Option key={i}>{i}</Option>);
  }

  return (
    <div className={styles.ProfilePage}>
      <Card title="General">
        <Item label="Venue" name="passpointVenueProfileName">
          <Select
            onPopupScroll={onFetchMoreVenueProfiles}
            data-testid="venueProfile"
            showSearch
            placeholder="Select a Venue Profile"
            onChange={handleOnChangeVenue}
            // TODO when profile changed removed previous profile from childProfile list
          >
            {venueProfiles.map(i => (
              <Option key={i.id} value={i.name}>
                {i.name}
              </Option>
            ))}
          </Select>
        </Item>
        <Item label="Operator" name="passpointOperatorProfileName">
          <Select
            onPopupScroll={onFetchMoreOperatorProfiles}
            data-testid="operatorProfile"
            showSearch
            placeholder="Select an Operator Profile"
            onChange={handleOnChangeOperator}
            // TODO when profile changed removed previous profile from childProfile list
          >
            {operatorProfiles.map(i => (
              <Option key={i.id} value={i.name}>
                {i.name}
              </Option>
            ))}
          </Select>
        </Item>
        <Item label="ID Provider" name="idProviderProfileNames">
          <Select
            onPopupScroll={onFetchMoreIdProviderProfiles}
            data-testid="idProviderProfile"
            showSearch
            showArrow
            mode="multiple"
            allowClear
            placeholder="Select ID Providers (check to select)"
            onChange={handleOnChangeIdProvider}
            onDeselect={handleRemoveIdProvider}
          >
            {idProviderProfiles.map(i => (
              <Option key={i.id} value={i.name}>
                {i.name}
              </Option>
            ))}
          </Select>
        </Item>
        <Item label="Interworking Hot 2.0" name="enableInterworkingAndHs20">
          {defaultOptions}
        </Item>
        <Item
          label="HESSID"
          name={['hessid', 'addressAsString']}
          rules={[
            {
              pattern: new RegExp(/^([0-9A-Fa-f]{2}[:]){5}([0-9A-Fa-f]{2})$/),
              message: 'Incorrect MAC Address format e.g. 0A:0B:0C:0D:0E:0F',
            },
          ]}
        >
          <Input placeholder="Enter MAC Address" className={globalStyles.field} />
        </Item>
        <Item name="childProfileIds" style={{ display: 'none' }}>
          <Input />
        </Item>
      </Card>
      <Card title="Access Network">
        <Item label="Access Network Type" name="accessNetworkType">
          <Select>
            <Option value="private_network">Private Network</Option>
            <Option value="private_network_guest_access">Private Network Guest Access</Option>
            <Option value="changeable_public_network">Changeable Public Network</Option>
            <Option value="free_public_network">Free Public Network</Option>
            <Option value="person_device_network">Personal Device Network</Option>
            <Option value="emergency_services_only_network">Emergency Services Only Network</Option>
            <Option value="test_or_experimental">Test or Experimental</Option>
            <Option value="wildcard">Wildcard</Option>
          </Select>
        </Item>
        <Item label="Authentication Type" name="networkAuthenticationType">
          <Select>
            <Option value="acceptance_of_terms_and_conditions">
              Acceptance of Terms & Conditions
            </Option>
            <Option value="online_enrollment_supported">Online Enrollment Supported</Option>
            <Option value="http_https_redirection">HTTP HTTPS Redirection</Option>
            <Option value="dns_redirection">DNS Redirection</Option>
          </Select>
        </Item>
        <Item label="Terms & Conditions" name='termsAndConditionsFile'>
          {/* TODO: check type and set for this upload ! */}
          <Upload
            accept="image/*"
            data-testid="termsAndConditionsUpload"
            fileList={termsAndConditionsFileList}
            beforeUpload={handleFileUpload}
            onChange={handleOnChangeTermsAndConditions}
          >
            <Button icon={<UploadOutlined />}>File Upload</Button>
          </Upload>
        </Item>
        <Item label="Emergency Services Reachable" name="emergencyServicesReachable">
          {defaultOptions}
        </Item>
        <Item
          label="Unauthenticated Emergency Service Accessible"
          name="unauthenticatedEmergencyServiceAccessible"
        >
          {defaultOptions}
        </Item>
      </Card>
      <Card title="IP Connectivity">
        <Item label="Internet Connectivity" name="internetConnectivity">
          {defaultOptions}
        </Item>
        <Item label="IP Address Type" name="ipAddressTypeAvailability">
          <Select>
            <Option value="address_type_not_available">Address Type Not Available</Option>
            <Option value="address_type_available">Address Type Available</Option>
            <Option value="public_IPv4_address_available">Public IPv4 Address Available</Option>
            <Option value="port_restricted_IPv4_address_available">
              Port Restricted IPv4 Address Available
            </Option>
            <Option value="single_NATed_private_IPv4_address_available">
              Single NATed private IPv4 Address Available
            </Option>
            <Option value="double_NATed_private_IPv4_address_available">
              Double NATed private IPv4 Address Available
            </Option>
            <Option value="port_restricted_IPv4_address_and_single_NATed_IPv4_address_available">
              Port Restricted IPv4 Address and Single NATed IPv4 Address Available
            </Option>
            <Option value="port_restricted_IPv4_address_and_double_NATed_IPv4_address_available">
              Port Restricted IPv4 Address and Double NATed IPv4 Address Available
            </Option>
            <Option value="availability_of_the_address_type_is_unknown">
              Availablity of the Address Type is Unknown
            </Option>
          </Select>
        </Item>
        <Item label="Connection Capability">
          <Button type="solid" onClick={() => setModalVisible(true)}>
            Add Name
          </Button>
        </Item>
        <Item noStyle name="connectionCapabilitySet">
          <Table
            dataSource={connectionCapabilitySetList}
            columns={columns}
            pagination={false}
            rowKey="connectionCapabilitiesPortNumber"
          />
        </Item>
        <Item label="QOS Map Set" name="qosMapSetConfiguration">
            <Select 
              showArrow
              mode="multiple"
              allowClear
              placeholder="Select QOS Map Set (check to select)"
            >
              {qosMapSetOptions}
            </Select>
            {/* TODO confirm the options of qosMapSet */}
        </Item>
      </Card>
      <Card title="Advanced">
        <Item
          label="ANQP Domain ID"
          name="anqpDomainId"
          rules={[
            {},
            ({ getFieldValue }) => ({
              validator(_rule, value) {
                if (
                  !value ||
                  (getFieldValue('anqpDomainId') <= 65535 && getFieldValue('anqpDomainId') >= 0)
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Enter an ANQP Domain ID between 0 and 65535'));
              },
            }),
          ]}
        >
          <Input type="number" min={0} max={65535} />
        </Item>
        <Item label="GAS Address 3 Behaviour" name="gasAddr3Behaviour">
          <Select>
            <Option value="p2pSpecWorkaroundFromRequest">P2P Spec Workaround From Request</Option>
            <Option value="ieee80211StandardCompliantOnly">
              IEEE 80211 Standard Compliant Only
            </Option>
            <Option value="forceNonCompliantBehaviourFromRequest">
              Force Non-Compliant Behaviour From Request
            </Option>
          </Select>
        </Item>
        <Item label="Disable DGAF" name="disableDownstreamGroupAddressedForwarding">
          <Select>
            <Option value="true">True</Option>
            <Option value="false">False</Option>
          </Select>
        </Item>
      </Card>

      <Modal
        onCancel={() => setModalVisible(false)}
        onSuccess={() => handleConnectionSave()}
        visible={modalVisible}
        title="Add Connection Capability"
        content={
          <Form form={connectionForm} layout="vertical">
            <Item
              label="Status"
              name="connectionCapabilitiesStatus"
              rules={[{ required: true, message: 'Status field cannot be empty' }]}
            >
              <Select placeholder="Select a status">
                <Option value="open">Open</Option>
                <Option value="closed">Closed</Option>
                <Option value="unknown">Unknown</Option>
              </Select>
            </Item>
            <Item
              label="Protocol"
              name="connectionCapabilitiesIpProtocol"
              rules={[{ required: true, message: 'Protocol field cannot be empty' }]}
            >
              <Select placeholder="Select a protocol">
                <Option value="ICMP">ICMP</Option>
                <Option value="TCP">TCP</Option>
                <Option value="UDP">UDP</Option>
              </Select>
            </Item>
            <Item
              label="Port"
              name="connectionCapabilitiesPortNumber"
              rules={[
                {
                  required: true,
                  message: 'Port field cannot be empty',
                },
                ({ getFieldValue }) => ({
                  validator(_rule, value) {
                    if (
                      connectionCapabilitySetList.filter(i => i.connectionCapabilitiesPortNumber === value.toString()).length > 0
                    ) {
                      return Promise.reject(new Error('Port number is already used'));
                    } 
                    if (
                      !value ||
                      (getFieldValue('connectionCapabilitiesPortNumber') <= 65535 &&
                        getFieldValue('connectionCapabilitiesPortNumber') >= 0)
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Enter a port number between 0 - 65535'));
                  },
                }),
              ]}
            >
              <Input type="number" min={0} max={65535} />
            </Item>
          </Form>
        }
      />
    </div>
  );
};

PasspointProfileForm.propTypes = {
  form: PropTypes.instanceOf(Object),
  details: PropTypes.instanceOf(Object),
  childProfileIds: PropTypes.instanceOf(Array),
  venueProfiles: PropTypes.instanceOf(Array),
  operatorProfiles: PropTypes.instanceOf(Array),
  idProviderProfiles: PropTypes.instanceOf(Array),
  fileUpload: PropTypes.func,
  onFetchMoreVenueProfiles: PropTypes.func,
  onFetchMoreOperatorProfiles: PropTypes.func,
  onFetchMoreIdProviderProfiles: PropTypes.func,
};

PasspointProfileForm.defaultProps = {
  form: {},
  details: {},
  childProfileIds: [],
  venueProfiles: [],
  operatorProfiles: [],
  idProviderProfiles: [],
  fileUpload: () => {},
  onFetchMoreVenueProfiles: () => {},
  onFetchMoreOperatorProfiles: () => {},
  onFetchMoreIdProviderProfiles: () => {},
};

export default PasspointProfileForm;
