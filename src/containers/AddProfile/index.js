import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Form, Input, Card, Select, notification } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

import Button from 'components/Button';
import Container from 'components/Container';
import Header from 'components/Header';
import Modal from 'components/Modal';

import {
  formatSsidProfileForm,
  formatApProfileForm,
  formatBonjourGatewayForm,
  formatCaptiveForm,
  formatRadiusForm,
  formatRfProfileForm,
  formatPasspointForm,
} from 'utils/profiles';

import globalStyles from 'styles/index.scss';
import styles from './index.module.scss';

import SSIDForm from '../ProfileDetails/components/SSID';
import AccessPointForm from '../ProfileDetails/components/AccessPoint';
import BonjourGatewayForm from '../ProfileDetails/components/BonjourGateway';
import CaptivePortalForm from '../ProfileDetails/components/CaptivePortal';
import RadiusForm from '../ProfileDetails/components/Radius';
import RFForm from '../ProfileDetails/components/RF';
import PasspointProfileForm from '../ProfileDetails/components/PasspointProfile';

const { Item } = Form;
const { Option } = Select;

const AddProfile = ({
  onCreateProfile,
  ssidProfiles,
  venueProfiles,
  operatorProfiles,
  idProviderProfiles,
  onFetchMoreProfiles,
  onFetchMoreVenueProfiles,
  onFetchMoreOperatorProfiles,
  onFetchMoreIdProviderProfiles,
}) => {
  const [form] = Form.useForm();
  const history = useHistory();

  const [profileType, setType] = useState('');
  const [name, setName] = useState('');
  const [confirmModal, setConfirmModal] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 12 },
  };

  const handleOnFormChange = () => {
    if (!isFormDirty) {
      setIsFormDirty(true);
    }
  };

  const handleOnBack = () => {
    if (isFormDirty) {
      setConfirmModal(true);
    } else {
      history.push(`/profiles`);
    }
  };

  const handleOnSave = () => {
    form
      .validateFields()
      .then(values => {
        let formattedData = { ...values };

        if (profileType === 'ssid') {
          formattedData.model_type = 'SsidConfiguration';
          formattedData = Object.assign(formattedData, formatSsidProfileForm(values));
        }

        if (profileType === 'equipment_ap') {
          formattedData.model_type = 'ApNetworkConfiguration';
          formattedData = Object.assign(formattedData, formatApProfileForm(values));
        }

        if (profileType === 'bonjour') {
          formattedData.model_type = 'BonjourGatewayProfile';
          formattedData = Object.assign(formattedData, formatBonjourGatewayForm(values));
        }

        if (profileType === 'captive_portal') {
          formattedData.model_type = 'CaptivePortalConfiguration';
          formattedData = Object.assign(formattedData, formatCaptiveForm(values));
        }

        if (profileType === 'radius') {
          if (values.services.length === 0) {
            notification.error({
              message: 'Error',
              description: 'At least 1 RADIUS Service is required.',
            });
            return;
          }
          if (values.zones.length === 0) {
            notification.error({
              message: 'Error',
              description: 'At least 1 RADIUS Service Zone is required.',
            });
            return;
          }

          formattedData.model_type = 'RadiusProfile';
          formattedData = Object.assign(formattedData, formatRadiusForm(values));
        }

        if (profileType === 'rf') {
          formattedData.model_type = 'RfConfiguration';
          formattedData = Object.assign(formattedData, formatRfProfileForm(values));
        }

        if (profileType === 'passpoint') {
          if (!values.passpointVenueProfileId) {
            notification.error({
              message: 'Error',
              description: 'A Venue Profile is required.',
            });
            return;
          }
          if (!values.passpointOperatorProfileId) {
            notification.error({
              message: 'Error',
              description: 'A Operator Profile is required.',
            });
            return;
          }
          if (values.passpointOsuProviderProfileIds.length === 0) {
            notification.error({
              message: 'Error',
              description: 'At least 1 ID Provider Profile is required.',
            });
            return;
          }

          formattedData.childProfileIds.push(values.passpointVenueProfileId);
          formattedData.childProfileIds.push(values.passpointOperatorProfileId);
          values.passpointOsuProviderProfileIds.forEach(i => formattedData.childProfileIds.push(i));
          values.associatedAccessSsidProfileIds.forEach(i => formattedData.childProfileIds.push(i));
          formattedData.model_type = 'PasspointProfile';
          formattedData = Object.assign(formattedData, formatPasspointForm(values));
        }
        onCreateProfile(profileType, name, formattedData, formattedData.childProfileIds);
        setIsFormDirty(false);
      })
      .catch(() => {});
  };

  return (
    <Container>
      <div className={styles.AddProfile}>
        <Modal
          onCancel={() => setConfirmModal(false)}
          onSuccess={() => history.push(`/profiles`)}
          visible={confirmModal}
          buttonText="Back"
          title="Leave Form?"
          content={<p>Please confirm exiting without saving this Wireless Profile form. </p>}
        />
        <Header>
          <Button className={styles.backButton} icon={<LeftOutlined />} onClick={handleOnBack}>
            BACK
          </Button>
          <div>
            <Button type="primary" onClick={handleOnSave}>
              Save
            </Button>
          </div>
        </Header>

        <Form {...layout} form={form} onValuesChange={handleOnFormChange}>
          <Card title="Profile Settings">
            <Item
              label="Type"
              name="profileType"
              rules={[
                {
                  required: true,
                  message: 'Please select your profile type',
                },
              ]}
            >
              <Select
                className={globalStyles.field}
                onChange={value => setType(value)}
                placeholder="Select Profile Type"
              >
                <Option value="ssid">SSID</Option>
                <Option value="equipment_ap">Access Point</Option>
                <Option value="bonjour">Bonjour Gateway</Option>
                <Option value="captive_portal">Captive Portal</Option>
                <Option value="radius">Radius</Option>
                <Option value="rf">RF</Option>
                <Option value="passpoint">Passpoint </Option>
              </Select>
            </Item>
            <Item
              name="name"
              label="Name"
              onChange={e => setName(e.target.value)}
              rules={[{ required: true, message: 'Please input your new profile name' }]}
            >
              <Input className={globalStyles.field} placeholder="Enter profile name" />
            </Item>
          </Card>
          {profileType === 'ssid' && <SSIDForm form={form} />}
          {profileType === 'equipment_ap' && (
            <AccessPointForm
              form={form}
              ssidProfiles={ssidProfiles}
              onFetchMoreProfiles={onFetchMoreProfiles}
            />
          )}
          {profileType === 'bonjour' && <BonjourGatewayForm form={form} />}
          {profileType === 'captive_portal' && <CaptivePortalForm form={form} />}
          {profileType === 'radius' && <RadiusForm form={form} />}
          {profileType === 'rf' && <RFForm form={form} />}
          {profileType === 'passpoint' && (
            <PasspointProfileForm
              form={form}
              venueProfiles={venueProfiles}
              operatorProfiles={operatorProfiles}
              idProviderProfiles={idProviderProfiles}
              ssidProfiles={ssidProfiles}
              onFetchMoreProfiles={onFetchMoreProfiles}
              onFetchMoreVenueProfiles={onFetchMoreVenueProfiles}
              onFetchMoreOperatorProfiles={onFetchMoreOperatorProfiles}
              onFetchMoreIdProviderProfiles={onFetchMoreIdProviderProfiles}
            />
          )}
        </Form>
      </div>
    </Container>
  );
};

AddProfile.propTypes = {
  onCreateProfile: PropTypes.func.isRequired,
  ssidProfiles: PropTypes.instanceOf(Array),
  venueProfiles: PropTypes.instanceOf(Array),
  operatorProfiles: PropTypes.instanceOf(Array),
  idProviderProfiles: PropTypes.instanceOf(Array),
  onFetchMoreProfiles: PropTypes.func,
  onFetchMoreVenueProfiles: PropTypes.func,
  onFetchMoreOperatorProfiles: PropTypes.func,
  onFetchMoreIdProviderProfiles: PropTypes.func,
};

AddProfile.defaultProps = {
  ssidProfiles: [],
  venueProfiles: [],
  operatorProfiles: [],
  idProviderProfiles: [],
  onFetchMoreProfiles: () => {},
  onFetchMoreVenueProfiles: () => {},
  onFetchMoreOperatorProfiles: () => {},
  onFetchMoreIdProviderProfiles: () => {},
};

export default AddProfile;
