import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Form, Input, Card, Select, notification } from 'antd';
import { LeftOutlined, PlusOutlined } from '@ant-design/icons';

import Button from 'components/Button';
import Container from 'components/Container';
import Header from 'components/Header';
import Modal from 'components/Modal';
import ThemeContext from 'contexts/ThemeContext';
import { pageLayout } from 'utils/form';

import {
  formatSsidProfileForm,
  formatApProfileForm,
  formatBonjourGatewayForm,
  formatCaptiveForm,
  formatRadiusForm,
  formatRfProfileForm,
  formatPasspointForm,
  formatProviderProfileForm,
  formatOperatorForm,
  profileTypes,
} from 'utils/profiles';

import globalStyles from 'styles/index.scss';
import styles from './index.module.scss';

import { PROFILES } from '../ProfileDetails/constants';
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
  radiusProfiles,
  captiveProfiles,
  venueProfiles,
  operatorProfiles,
  idProviderProfiles,
  initialValues,
  onSearchProfile,
  onFetchMoreProfiles,
  loadingSSIDProfiles,
  loadingRadiusProfiles,
  loadingCaptiveProfiles,
  loadingVenueProfiles,
  loadingOperatorProfiles,
  loadingIdProviderProfiles,
  loadingRFProfiles,
  extraFields,
}) => {
  const { routes } = useContext(ThemeContext);
  const [form] = Form.useForm();
  const history = useHistory();

  const [profileType, setType] = useState('');
  const [name, setName] = useState('');
  const [confirmModal, setConfirmModal] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      profileType: initialValues?.profileType,
      name: initialValues?.name ? initialValues?.name : '',
    });
    setType(initialValues?.profileType);
    setName(initialValues?.name ? initialValues?.name : '');
  }, [initialValues]);

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

        if (profileType === PROFILES.ssid) {
          formattedData.model_type = 'SsidConfiguration';
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
          formattedData.model_type = 'ApNetworkConfiguration';
          formattedData = Object.assign(formattedData, formatApProfileForm(values));
        }

        if (profileType === PROFILES.bonjour) {
          formattedData.model_type = 'BonjourGatewayProfile';
          formattedData = Object.assign(formattedData, formatBonjourGatewayForm(values));
        }

        if (profileType === PROFILES.captivePortal) {
          formattedData.model_type = 'CaptivePortalConfiguration';
          formattedData = Object.assign(
            formattedData,
            formatCaptiveForm(values, initialValues?.details)
          );
        }

        if (profileType === PROFILES.radius) {
          formattedData.model_type = 'RadiusProfile';
          formattedData = Object.assign(formattedData, formatRadiusForm(values));
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

          values.associatedAccessSsidProfileIds.forEach(i => formattedData.childProfileIds.push(i));
          formattedData.model_type = 'PasspointProfile';
          formattedData = Object.assign(
            formattedData,
            formatPasspointForm(values, initialValues?.details)
          );
        }

        if (profileType === PROFILES.operator) {
          formattedData.model_type = 'PasspointOperatorProfile';
          formattedData = Object.assign(formattedData, formatOperatorForm(values));
        }

        if (profileType === PROFILES.providerID) {
          formattedData.model_type = 'PasspointOsuProviderProfile';
          formattedData = Object.assign(formattedData, formatProviderProfileForm(values));
        }

        if (profileType === PROFILES.venue) {
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
          <div className={styles.HeaderDiv}>
            <Button className={styles.backButton} icon={<LeftOutlined />} onClick={handleOnBack}>
              Back
            </Button>
            <h1>Add Profile</h1>
          </div>
          <div>
            <Button icon={<PlusOutlined />} type="primary" onClick={handleOnSave}>
              Add
            </Button>
          </div>
        </Header>

        <Form {...pageLayout} form={form} onValuesChange={handleOnFormChange}>
          <Card>
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
                {Object.keys(profileTypes).map(type => (
                  <Option key={type} value={type} disabled={type === 'bonjour'}>
                    {profileTypes[type]}
                  </Option>
                ))}
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
          {profileType === PROFILES.ssid && (
            <SSIDForm
              form={form}
              details={initialValues?.details}
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
              details={initialValues?.details}
              childProfiles={initialValues?.childProfiles}
              rfProfiles={rfProfiles}
              ssidProfiles={ssidProfiles}
              onSearchProfile={onSearchProfile}
              onFetchMoreProfiles={onFetchMoreProfiles}
              loadingSSIDProfiles={loadingSSIDProfiles}
              loadingRFProfiles={loadingRFProfiles}
            />
          )}
          {profileType === PROFILES.bonjour && (
            <BonjourGatewayForm form={form} details={initialValues?.details} />
          )}
          {profileType === PROFILES.captivePortal && (
            <CaptivePortalForm
              form={form}
              details={initialValues?.details}
              radiusProfiles={radiusProfiles}
              onSearchProfile={onSearchProfile}
              onFetchMoreProfiles={onFetchMoreProfiles}
              loadingRadiusProfiles={loadingRadiusProfiles}
            />
          )}

          {profileType === PROFILES.radius && (
            <RadiusForm form={form} details={initialValues?.details} />
          )}
          {profileType === PROFILES.rf && (
            <RFForm form={form} details={initialValues?.details} extraFields={extraFields} />
          )}
          {profileType === PROFILES.passpoint && (
            <PasspointProfileForm
              form={form}
              details={initialValues?.details}
              childProfiles={initialValues?.childProfiles}
              ssidProfiles={ssidProfiles}
              venueProfiles={venueProfiles}
              operatorProfiles={operatorProfiles}
              idProviderProfiles={idProviderProfiles}
              onSearchProfile={onSearchProfile}
              onFetchMoreProfiles={onFetchMoreProfiles}
              loadingSSIDProfiles={loadingSSIDProfiles}
              loadingVenueProfiles={loadingVenueProfiles}
              loadingOperatorProfiles={loadingOperatorProfiles}
              loadingIdProviderProfiles={loadingIdProviderProfiles}
            />
          )}
          {profileType === PROFILES.providerID && (
            <ProviderIdForm form={form} details={initialValues?.details} />
          )}
          {profileType === PROFILES.operator && (
            <OperatorForm form={form} details={initialValues?.details} />
          )}
          {profileType === PROFILES.venue && (
            <VenueForm form={form} details={initialValues?.details} />
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
  rfProfiles: PropTypes.instanceOf(Array),
  radiusProfiles: PropTypes.instanceOf(Array),
  captiveProfiles: PropTypes.instanceOf(Array),
  initialValues: PropTypes.instanceOf(Object),
  onSearchProfile: PropTypes.func,
  onFetchMoreProfiles: PropTypes.func,
  loadingSSIDProfiles: PropTypes.bool,
  loadingRadiusProfiles: PropTypes.bool,
  loadingCaptiveProfiles: PropTypes.bool,
  loadingVenueProfiles: PropTypes.bool,
  loadingOperatorProfiles: PropTypes.bool,
  loadingIdProviderProfiles: PropTypes.bool,
  loadingRFProfiles: PropTypes.bool,
  extraFields: PropTypes.instanceOf(Array),
};

AddProfile.defaultProps = {
  ssidProfiles: [],
  venueProfiles: [],
  operatorProfiles: [],
  idProviderProfiles: [],
  rfProfiles: [],
  radiusProfiles: [],
  captiveProfiles: [],
  initialValues: {},
  onSearchProfile: null,
  onFetchMoreProfiles: () => {},
  loadingSSIDProfiles: false,
  loadingRadiusProfiles: false,
  loadingCaptiveProfiles: false,
  loadingVenueProfiles: false,
  loadingOperatorProfiles: false,
  loadingIdProviderProfiles: false,
  loadingRFProfiles: false,
  extraFields: [],
};

export default AddProfile;
