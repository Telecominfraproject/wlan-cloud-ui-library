import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Card, notification, Select } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import Button from 'components/Button';
import Container from 'components/Container';
import Header from 'components/Header';
import Modal from 'components/Modal';
import ThemeContext from 'contexts/ThemeContext';

import globalStyles from 'styles/index.scss';

import {
  formatSsidProfileForm,
  formatApProfileForm,
  formatRadiusForm,
  formatCaptiveForm,
  formatBonjourGatewayForm,
  formatRfProfileForm,
  formatPasspointForm,
  formatProviderProfileForm,
  formatOperatorForm,
  profileTypes,
} from 'utils/profiles';

import { PROFILES } from './constants';
import SSIDForm from './components/SSID';
import AccessPointForm from './components/AccessPoint';
import RadiusForm from './components/Radius';
import CaptivePortalForm from './components/CaptivePortal';
import BonjourGatewayForm from './components/BonjourGateway';
import RFForm from './components/RF';
import PasspointProfileForm from './components/PasspointProfile';
import ProviderIdForm from './components/ProviderId';
import OperatorForm from './components/Operator';
import VenueForm from './components/Venue';

import styles from './index.module.scss';

const ProfileDetails = ({
  profileType,
  name,
  details,
  childProfiles,
  onUpdateProfile,
  ssidProfiles,
  rfProfiles,
  radiusProfiles,
  captiveProfiles,
  venueProfiles,
  operatorProfiles,
  idProviderProfiles,
  fileUpload,
  extraButtons,
  onSearchProfile,
  onFetchMoreProfiles,
  loadingSSIDProfiles,
  loadingRadiusProfiles,
  loadingCaptiveProfiles,
  loadingVenueProfiles,
  loadingOperatorProfiles,
  loadingIdProviderProfiles,
  loadingRFProfiles,
}) => {
  const { routes } = useContext(ThemeContext);
  const history = useHistory();
  const [confirmModal, setConfirmModal] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 12 },
  };

  const [form] = Form.useForm();
  const { Item } = Form;

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
        let formattedData = { ...details };

        Object.keys(values).forEach(i => {
          formattedData[i] = values[i];
        });

        if (profileType === PROFILES.ssid) {
          if (
            (values.secureMode === 'wpaRadius' ||
              values.secureMode === 'wpa2Radius' ||
              values.secureMode === 'wpa2OnlyRadius' ||
              values.secureMode === 'wpa3OnlyEAP' ||
              values.secureMode === 'wpa3MixedEAP') &&
            (!values?.radiusServiceName?.value || !values?.radiusServiceName?.label)
          ) {
            notification.error({
              message: 'Error',
              description: 'At least 1 RADIUS Service is required.',
            });
            return;
          }
          formattedData = Object.assign(formattedData, formatSsidProfileForm(values));
        }
        if (profileType === PROFILES.accessPoint) {
          if (!values.rfProfileId) {
            notification.error({
              message: 'Error',
              description: 'A Rf Profile is required.',
            });
            return;
          }
          formattedData.childProfileIds.push(values.rfProfileId);
          formattedData = Object.assign(formattedData, formatApProfileForm(values));
        }
        if (profileType === PROFILES.radius) {
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
          formattedData = Object.assign(formattedData, formatRadiusForm(values));
        }
        if (profileType === PROFILES.captivePortal) {
          formattedData = Object.assign(formattedData, formatCaptiveForm(values, details));
        }

        if (profileType === PROFILES.bonjour) {
          formattedData.model_type = 'BonjourGatewayProfile';
          formattedData = Object.assign(formattedData, formatBonjourGatewayForm(values));
        }
        if (profileType === PROFILES.rf) {
          formattedData.model_type = 'RfConfiguration';
          formattedData = Object.assign(formattedData, formatRfProfileForm(values));
        }

        if (profileType === PROFILES.passpoint) {
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
          if (!values.osuSsidProfileId) {
            notification.error({
              message: 'Error',
              description: 'An SSID Profile is required.',
            });
            return;
          }
          values.associatedAccessSsidProfileIds.forEach(i => formattedData.childProfileIds.push(i));
          formattedData.model_type = 'PasspointProfile';
          formattedData = Object.assign(formattedData, formatPasspointForm(values, details));
        }
        if (profileType === PROFILES.operator) {
          formattedData.model_type = 'PasspointOperatorProfile';
          formattedData = Object.assign(formattedData, formatOperatorForm(values));
        }
        if (profileType === PROFILES.providerID) {
          formattedData.model_type = 'PasspointOsuProviderProfile';
          formattedData = Object.assign(formattedData, formatProviderProfileForm(values));
        }
        onUpdateProfile(values.name, formattedData, formattedData.childProfileIds);
        setIsFormDirty(false);
      })
      .catch(() => {});
  };

  useEffect(() => {
    form.setFieldsValue({
      name,
    });
  }, [name]);

  return (
    <Container>
      <Modal
        onCancel={() => setConfirmModal(false)}
        onSuccess={() => history.push(routes.profiles)}
        visible={confirmModal}
        buttonText="Back"
        title="Leave Form?"
        content={<p>Please confirm exiting without saving this Profile form. </p>}
      />
      <Header>
        <div className={styles.HeaderDiv}>
          <Button icon={<LeftOutlined />} onClick={handleOnBack}>
            Back
          </Button>
          <h1>{`Edit ${name}`}</h1>
        </div>
        <div className={styles.HeaderDiv}>
          <div className={styles.HeaderButton}>{extraButtons}</div>
          <Button type="primary" onClick={handleOnSave}>
            Save
          </Button>
        </div>
      </Header>

      <Form
        {...layout}
        form={form}
        onValuesChange={handleOnFormChange}
        className={styles.ProfileDetails}
      >
        <Card>
          <Item label="Type">
            <Select className={globalStyles.field} defaultValue={profileType} disabled>
              <Select.Option value={profileType}>{profileTypes[profileType]}</Select.Option>
            </Select>
          </Item>
          <Item
            name="name"
            label="Profile Name"
            rules={[{ required: true, message: 'Please input your new profile name' }]}
          >
            <Input className={globalStyles.field} placeholder="Enter profile name" />
          </Item>
        </Card>
        {profileType === PROFILES.ssid && (
          <SSIDForm
            form={form}
            details={details}
            childProfiles={childProfiles}
            radiusProfiles={radiusProfiles}
            captiveProfiles={captiveProfiles}
            onSearchProfile={onSearchProfile}
            onFetchMoreProfiles={onFetchMoreProfiles}
            loadingCaptiveProfiles={loadingCaptiveProfiles}
            loadingRadiusProfiles={loadingRadiusProfiles}
          />
        )}
        {profileType === PROFILES.accessPoint && (
          <AccessPointForm
            form={form}
            details={details}
            childProfiles={childProfiles}
            rfProfiles={rfProfiles}
            ssidProfiles={ssidProfiles}
            onSearchProfile={onSearchProfile}
            onFetchMoreProfiles={onFetchMoreProfiles}
            loadingSSIDProfiles={loadingSSIDProfiles}
            loadingRFProfiles={loadingRFProfiles}
          />
        )}
        {profileType === PROFILES.captivePortal && (
          <CaptivePortalForm
            form={form}
            details={details}
            fileUpload={fileUpload}
            radiusProfiles={radiusProfiles}
            onSearchProfile={onSearchProfile}
            onFetchMoreProfiles={onFetchMoreProfiles}
            loadingRadiusProfiles={loadingRadiusProfiles}
          />
        )}
        {profileType === PROFILES.radius && <RadiusForm details={details} form={form} />}
        {profileType === PROFILES.bonjour && <BonjourGatewayForm details={details} form={form} />}
        {profileType === PROFILES.rf && <RFForm details={details} form={form} />}
        {profileType === PROFILES.passpoint && (
          <PasspointProfileForm
            form={form}
            details={details}
            childProfiles={childProfiles}
            ssidProfiles={ssidProfiles}
            venueProfiles={venueProfiles}
            operatorProfiles={operatorProfiles}
            idProviderProfiles={idProviderProfiles}
            fileUpload={fileUpload}
            onSearchProfile={onSearchProfile}
            onFetchMoreProfiles={onFetchMoreProfiles}
            loadingSSIDProfiles={loadingSSIDProfiles}
            loadingVenueProfiles={loadingVenueProfiles}
            loadingOperatorProfiles={loadingOperatorProfiles}
            loadingIdProviderProfiles={loadingIdProviderProfiles}
          />
        )}
        {profileType === PROFILES.providerID && <ProviderIdForm form={form} details={details} />}
        {profileType === PROFILES.operator && <OperatorForm form={form} details={details} />}
        {profileType === PROFILES.venue && <VenueForm form={form} details={details} />}
      </Form>
    </Container>
  );
};

ProfileDetails.propTypes = {
  onUpdateProfile: PropTypes.func.isRequired,
  fileUpload: PropTypes.func.isRequired,
  name: PropTypes.string,
  profileType: PropTypes.string,
  details: PropTypes.instanceOf(Object),
  ssidProfiles: PropTypes.instanceOf(Array),
  rfProfiles: PropTypes.instanceOf(Array),
  radiusProfiles: PropTypes.instanceOf(Array),
  captiveProfiles: PropTypes.instanceOf(Array),
  venueProfiles: PropTypes.instanceOf(Array),
  operatorProfiles: PropTypes.instanceOf(Array),
  idProviderProfiles: PropTypes.instanceOf(Array),
  childProfiles: PropTypes.instanceOf(Array),
  childProfileIds: PropTypes.instanceOf(Array),
  extraButtons: PropTypes.node,
  onSearchProfile: PropTypes.func,
  onFetchMoreProfiles: PropTypes.func,
  loadingSSIDProfiles: PropTypes.bool,
  loadingRadiusProfiles: PropTypes.bool,
  loadingCaptiveProfiles: PropTypes.bool,
  loadingVenueProfiles: PropTypes.bool,
  loadingOperatorProfiles: PropTypes.bool,
  loadingIdProviderProfiles: PropTypes.bool,
  loadingRFProfiles: PropTypes.bool,
};

ProfileDetails.defaultProps = {
  name: null,
  profileType: null,
  details: {},
  ssidProfiles: [],
  rfProfiles: [],
  radiusProfiles: [],
  captiveProfiles: [],
  venueProfiles: [],
  operatorProfiles: [],
  idProviderProfiles: [],
  childProfileIds: [],
  childProfiles: [],
  extraButtons: null,
  onSearchProfile: null,
  onFetchMoreProfiles: () => {},
  loadingSSIDProfiles: false,
  loadingRadiusProfiles: false,
  loadingCaptiveProfiles: false,
  loadingVenueProfiles: false,
  loadingOperatorProfiles: false,
  loadingIdProviderProfiles: false,
  loadingRFProfiles: false,
};

export default ProfileDetails;
