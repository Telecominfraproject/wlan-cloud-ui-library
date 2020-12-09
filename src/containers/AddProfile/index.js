import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Form, Input, Card, Select, notification } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

import Button from 'components/Button';
import Container from 'components/Container';
import Header from 'components/Header';
import Modal from 'components/Modal';
import ThemeContext from 'contexts/ThemeContext';

import {
  formatSsidProfileForm,
  formatApProfileForm,
  formatBonjourGatewayForm,
  formatCaptiveForm,
  formatRadiusForm,
  formatRfProfileForm,
  formatPasspointForm,
  formatProviderProfileForm,
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
import ProviderIdForm from '../ProfileDetails/components/ProviderId';
import OperatorForm from '../ProfileDetails/components/Operator';
import VenueForm from '../ProfileDetails/components/Venue';

const { Item } = Form;
const { Option } = Select;

const AddProfile = ({
  onCreateProfile,
  ssidProfiles,
  rfProfiles,
  venueProfiles,
  operatorProfiles,
  idProviderProfiles,
  onFetchMoreProfiles,
  onFetchMoreRfProfiles,
  onFetchMoreVenueProfiles,
  onFetchMoreOperatorProfiles,
  onFetchMoreIdProviderProfiles,
}) => {
  const { routes } = useContext(ThemeContext);
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
      history.push(routes.profiles);
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
          if (!values.rfProfileId) {
            notification.error({
              message: 'Error',
              description: 'A Rf Profile is required.',
            });
            return;
          }
          formattedData.childProfileIds.push(values.rfProfileId);
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

        if (profileType === 'passpoint_operator') {
          formattedData.model_type = 'PasspointOperatorProfile';
          formattedData = Object.assign(formattedData, values);
        }

        if (profileType === 'passpoint_osu_id_provider') {
          formattedData.model_type = 'PasspointOsuProviderProfile';
          formattedData = Object.assign(formattedData, formatProviderProfileForm(values));
        }

        if (profileType === 'passpoint_venue') {
          formattedData.model_type = 'PasspointVenueProfile';
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
          onSuccess={() => history.push(routes.profiles)}
          visible={confirmModal}
          buttonText="Back"
          title="Leave Form?"
          content={<p>Please confirm exiting without saving this Wireless Profile form. </p>}
        />
        <Header>
          <Button className={styles.backButton} icon={<LeftOutlined />} onClick={handleOnBack}>
            Back
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
                <Option value="bonjour" disabled>
                  Bonjour Gateway
                </Option>
                <Option value="captive_portal">Captive Portal</Option>
                <Option value="radius">Radius</Option>
                <Option value="rf">RF</Option>
                <Option value="passpoint">Passpoint </Option>
                <Option value="passpoint_osu_id_provider">Passpoint ID Provider</Option>
                <Option value="passpoint_operator">Passpoint Operator</Option>
                <Option value="passpoint_venue">Passpoint Venue</Option>
              </Select>
            </Item>
            <Item
              name="name"
              label="Name"
              onChange={e => setName(e.target.value)}
              rules={[{ required: true, message: 'Please input your new profile name' }]}
            >
              <Input
                id="profileName"
                className={globalStyles.field}
                placeholder="Enter profile name"
              />
            </Item>
          </Card>
          {profileType === 'ssid' && <SSIDForm form={form} />}
          {profileType === 'equipment_ap' && (
            <AccessPointForm
              form={form}
              ssidProfiles={ssidProfiles}
              rfProfiles={rfProfiles}
              onFetchMoreProfiles={onFetchMoreProfiles}
              onFetchMoreRfProfiles={onFetchMoreRfProfiles}
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
          {profileType === 'passpoint_osu_id_provider' && <ProviderIdForm form={form} />}
          {profileType === 'passpoint_operator' && <OperatorForm form={form} />}
          {profileType === 'passpoint_venue' && <VenueForm form={form} />}
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
  rfProfiles: PropTypes.instanceOf(Array),
  onFetchMoreProfiles: PropTypes.func,
  onFetchMoreVenueProfiles: PropTypes.func,
  onFetchMoreOperatorProfiles: PropTypes.func,
  onFetchMoreIdProviderProfiles: PropTypes.func,
  onFetchMoreRfProfiles: PropTypes.func,
};

AddProfile.defaultProps = {
  ssidProfiles: [],
  venueProfiles: [],
  operatorProfiles: [],
  idProviderProfiles: [],
  rfProfiles: [],
  onFetchMoreProfiles: () => {},
  onFetchMoreVenueProfiles: () => {},
  onFetchMoreOperatorProfiles: () => {},
  onFetchMoreIdProviderProfiles: () => {},
  onFetchMoreRfProfiles: () => {},
};

export default AddProfile;
