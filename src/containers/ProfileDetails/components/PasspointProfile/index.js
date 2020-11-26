import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Input, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import Button from 'components/Button';
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
  onFetchMoreVenueProfiles,
  onFetchMoreOperatorProfiles,
  onFetchMoreIdProviderProfiles,
}) => {
  const [termsAndConditionsFileList, setTermsAndConditionsFileList] = useState(
    (details?.termsAndConditionsFile && [formatFile(details.termsAndConditionsFile)]) || []
  );
  const [selectedChildProfiles, setSelectdChildProfiles] = useState(childProfileIds);

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
      networkAuthenticationType: details?.networkAuthenticationType || 'acceptance_of_terms_and_conditions',

      emergencyServicesReachable: details?.emergencyServicesReachable || 'true',
      unauthenticatedEmergencyServiceAccessible: details?.unauthenticatedEmergencyServiceAccessible || 'true',

      anqpDomainId: details?.anqpDomainId || 0,
      gasAddr3Behaviour: details?.gasAddr3Behaviour || 'p2pSpecWorkaroundFromRequest',
      disableDownstreamGroupAddressedForwarding: details?.disableDownstreamGroupAddressedForwarding || 'true',
      childProfileIds,
    });
  }, [form, details, childProfileIds]);

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

  const defaultOptions = (
    <Select className={styles.Field}>
      <Option value="true">Enabled</Option>
      <Option value="false">Disabled</Option>
    </Select>
  );

  return (
    <div className={styles.ProfilePage}>
      <Card title="General">
        <Item label="Venue" name="passpointVenueProfileName">
        <Select
            onPopupScroll={onFetchMoreVenueProfiles}
            data-testid="venueProfile"
            showSearch
            placeholder="Select a Venue Profile"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
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
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
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
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
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
              message: "Incorrect MAC Address format e.g. 0A:0B:0C:0D:0E:0F"
            }
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
        <Item label="Terms & Conditions" name={['termsAndConditionsFile']}>
          {/* TODO: check type and set for this upload ! */}
          <Upload
            accept="image/*"
            data-testid="termsAndConditionsUpload"
            fileList={termsAndConditionsFileList}
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
          {defaultOptions}
          {/* TODO there are two arrays */}
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
                  (getFieldValue('anqpDomainId') <= 65535 &&
                    getFieldValue('anqpDomainId') >= 0)
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Enter an ANQP Domain ID between 0 and 65535'));
              },
            }),
          ]}
        >
          <Input type='number' min={0} max={65535} />
        </Item>
        <Item label="GAS Address 3 Behaviour" name="gasAddr3Behaviour">
          <Select>
            <Option value="p2pSpecWorkaroundFromRequest">
                P2P Spec Workaround From Request
            </Option>
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
  onFetchMoreVenueProfiles: () => {},
  onFetchMoreOperatorProfiles: () => {},
  onFetchMoreIdProviderProfiles: () => {},
};

export default PasspointProfileForm;
