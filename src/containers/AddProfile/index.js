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
  onFetchMoreProfiles,
  onFetchMoreRfProfiles,
  onFetchMoreRadiusProfiles,
  onFetchMoreCaptiveProfiles,
  onFetchMoreVenueProfiles,
  onFetchMoreOperatorProfiles,
  onFetchMoreIdProviderProfiles,
  initialValues,
  onSearchSSIDProfile,
  loadingSSIDProfiles,
  onSearchRadiusProfile,
  loadingRadiusProfiles,
  onSearchCaptiveProfile,
  loadingCaptiveProfiles,
  onSearchRFProfile,
  loadingRFProfiles,
  onSearchVenueProfile,
  loadingVenueProfiles,
  onSearchOperatorProfile,
  loadingOperatorProfiles,
  onSearchIdProviderProfiles,
  loadingIdProviderProfiles,
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
          formattedData = Object.assign(
            formattedData,
            formatCaptiveForm(values, initialValues?.details)
          );
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

          values.associatedAccessSsidProfileIds.forEach(i => formattedData.childProfileIds.push(i));
          formattedData.model_type = 'PasspointProfile';
          formattedData = Object.assign(
            formattedData,
            formatPasspointForm(values, initialValues?.details)
          );
        }

        if (profileType === 'passpoint_operator') {
          formattedData.model_type = 'PasspointOperatorProfile';
          formattedData = Object.assign(formattedData, formatOperatorForm(values));
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

        <Form {...layout} form={form} onValuesChange={handleOnFormChange}>
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
          {profileType === 'ssid' && (
            <SSIDForm
              form={form}
              details={initialValues?.details}
              radiusProfiles={radiusProfiles}
              onFetchMoreRadiusProfiles={onFetchMoreRadiusProfiles}
              onSearchRadiusProfile={onSearchRadiusProfile}
              loadingRadiusProfiles={loadingRadiusProfiles}
              captiveProfiles={captiveProfiles}
              onFetchMoreCaptiveProfiles={onFetchMoreCaptiveProfiles}
              onSearchCaptiveProfile={onSearchCaptiveProfile}
              loadingCaptiveProfiles={loadingCaptiveProfiles}
            />
          )}
          {profileType === 'equipment_ap' && (
            <AccessPointForm
              form={form}
              details={initialValues?.details}
              childProfiles={initialValues?.childProfiles}
              rfProfiles={rfProfiles}
              onFetchMoreRfProfiles={onFetchMoreRfProfiles}
              onSearchRFProfile={onSearchRFProfile}
              loadingRFProfiles={loadingRFProfiles}
              ssidProfiles={ssidProfiles}
              onSearchSSIDProfile={onSearchSSIDProfile}
              loadingSSIDProfiles={loadingSSIDProfiles}
              onFetchMoreProfiles={onFetchMoreProfiles}
            />
          )}
          {profileType === 'bonjour' && (
            <BonjourGatewayForm form={form} details={initialValues?.details} />
          )}
          {profileType === 'captive_portal' && (
            <CaptivePortalForm
              form={form}
              details={initialValues?.details}
              radiusProfiles={radiusProfiles}
              onFetchMoreRadiusProfiles={onFetchMoreRadiusProfiles}
              onSearchRadiusProfile={onSearchRadiusProfile}
              loadingRadiusProfiles={loadingRadiusProfiles}
            />
          )}

          {profileType === 'radius' && <RadiusForm form={form} details={initialValues?.details} />}
          {profileType === 'rf' && <RFForm form={form} details={initialValues?.details} />}
          {profileType === 'passpoint' && (
            <PasspointProfileForm
              form={form}
              details={initialValues?.details}
              childProfiles={initialValues?.childProfiles}
              ssidProfiles={ssidProfiles}
              onFetchMoreProfiles={onFetchMoreProfiles}
              onSearchSSIDProfile={onSearchSSIDProfile}
              loadingSSIDProfiles={loadingSSIDProfiles}
              venueProfiles={venueProfiles}
              onFetchMoreVenueProfiles={onFetchMoreVenueProfiles}
              onSearchVenueProfile={onSearchVenueProfile}
              loadingVenueProfiles={loadingVenueProfiles}
              operatorProfiles={operatorProfiles}
              onFetchMoreOperatorProfiles={onFetchMoreOperatorProfiles}
              onSearchOperatorProfile={onSearchOperatorProfile}
              loadingOperatorProfiles={loadingOperatorProfiles}
              idProviderProfiles={idProviderProfiles}
              onFetchMoreIdProviderProfiles={onFetchMoreIdProviderProfiles}
              onSearchIdProviderProfiles={onSearchIdProviderProfiles}
              loadingIdProviderProfiles={loadingIdProviderProfiles}
            />
          )}
          {profileType === 'passpoint_osu_id_provider' && (
            <ProviderIdForm form={form} details={initialValues?.details} />
          )}
          {profileType === 'passpoint_operator' && (
            <OperatorForm form={form} details={initialValues?.details} />
          )}
          {profileType === 'passpoint_venue' && (
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
  onFetchMoreProfiles: PropTypes.func,
  onFetchMoreVenueProfiles: PropTypes.func,
  onFetchMoreOperatorProfiles: PropTypes.func,
  onFetchMoreIdProviderProfiles: PropTypes.func,
  onFetchMoreRfProfiles: PropTypes.func,
  onFetchMoreRadiusProfiles: PropTypes.func,
  onFetchMoreCaptiveProfiles: PropTypes.func,
  initialValues: PropTypes.instanceOf(Object),
  onSearchSSIDProfile: PropTypes.func,
  loadingSSIDProfiles: PropTypes.bool,
  onSearchRadiusProfile: PropTypes.func,
  loadingRadiusProfiles: PropTypes.bool,
  onSearchCaptiveProfile: PropTypes.func,
  loadingCaptiveProfiles: PropTypes.bool,
  onSearchRFProfile: PropTypes.func,
  loadingRFProfiles: PropTypes.bool,
  onSearchVenueProfile: PropTypes.func,
  loadingVenueProfiles: PropTypes.bool,
  onSearchOperatorProfile: PropTypes.func,
  loadingOperatorProfiles: PropTypes.bool,
  onSearchIdProviderProfiles: PropTypes.func,
  loadingIdProviderProfiles: PropTypes.bool,
};

AddProfile.defaultProps = {
  ssidProfiles: [],
  venueProfiles: [],
  operatorProfiles: [],
  idProviderProfiles: [],
  rfProfiles: [],
  radiusProfiles: [],
  captiveProfiles: [],
  onFetchMoreProfiles: () => {},
  onFetchMoreVenueProfiles: () => {},
  onFetchMoreOperatorProfiles: () => {},
  onFetchMoreIdProviderProfiles: () => {},
  onFetchMoreRfProfiles: () => {},
  onFetchMoreRadiusProfiles: () => {},
  onFetchMoreCaptiveProfiles: () => {},
  initialValues: {},
  onSearchSSIDProfile: () => {},
  loadingSSIDProfiles: true,
  onSearchRadiusProfile: () => {},
  loadingRadiusProfiles: true,
  onSearchCaptiveProfile: () => {},
  loadingCaptiveProfiles: true,
  onSearchRFProfile: () => {},
  loadingRFProfiles: true,
  onSearchVenueProfile: () => {},
  loadingVenueProfiles: true,
  onSearchOperatorProfile: () => {},
  loadingOperatorProfiles: true,
  onSearchIdProviderProfiles: () => {},
  loadingIdProviderProfiles: true,
};

export default AddProfile;
