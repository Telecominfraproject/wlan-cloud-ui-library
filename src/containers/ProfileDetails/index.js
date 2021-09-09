import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Form, notification, Select, Skeleton } from 'antd';
import { Card } from 'components/Skeleton';
import WithRoles, { Input } from 'components/WithRoles';
import { LeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import Button from 'components/Button';
import Container from 'components/Container';
import Header from 'components/Header';
import Modal from 'components/Modal';
import ThemeContext from 'contexts/ThemeContext';
import { pageLayout } from 'utils/form';

import {
  formatSsidProfileForm,
  formatApProfileForm,
  formatRadiusForm,
  formatCaptiveForm,
  formatBonjourGatewayForm,
  formatRfProfileForm,
  formatPasspointForm,
  formatProviderProfileForm,
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
  profileId,
  name,
  loadingProfile,
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
  associatedSsidProfiles,
  osuSsidProfile,
  passpointProfiles,
  fileUpload,
  onDownloadFile,
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
  loadingPasspointProfiles,
  extraFields,
  text,
}) => {
  const { routes } = useContext(ThemeContext);
  const history = useHistory();
  const [confirmModal, setConfirmModal] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);

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
      history.goBack();
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
              values.secureMode === 'wpa3MixedEAP' ||
              values.secureMode === 'wpa3OnlyEAP192') &&
            (!values?.radiusServiceId?.value || !values?.radiusServiceId?.label) &&
            values?.useRadiusProxy === 'false'
          ) {
            notification.error({
              message: 'Error',
              description: 'A RADIUS Profile is required.',
            });
            return;
          }

          if (values.passpointConfig !== 'disabled' && !values.passpointProfileId?.value) {
            notification.error({
              message: 'Error',
              description: 'A Passpoint profile is required.',
            });
            return;
          }

          formattedData = Object.assign(formattedData, formatSsidProfileForm(values));
        }

        if (profileType === PROFILES.accessPoint) {
          if (!values.rfProfileId?.value) {
            notification.error({
              message: 'Error',
              description: 'An RF Profile is required.',
            });
            return;
          }

          if (!values.selectedSsidProfiles?.length) {
            notification.error({
              message: 'Error',
              description: 'A SSID Profile is required.',
            });
            return;
          }

          if (!values.ntpServer.auto && !values.ntpServer.value) {
            notification.error({
              message: 'Error',
              description: 'At least 1 NTP Server is required.',
            });
            return;
          }

          const proxyEnabledProfiles = values.selectedSsidProfiles?.filter(
            profile => profile?.details?.useRadiusProxy
          );

          if (proxyEnabledProfiles.length && !values.radiusProxyConfigurations?.length) {
            notification.error({
              message: 'Error',
              description: (
                <div>
                  The following wireless networks have RADIUS Proxy enabled:
                  <ul>
                    {proxyEnabledProfiles.map(profile => (
                      <li key={profile?.id}>{profile?.name}</li>
                    ))}
                  </ul>
                  Please remove these wireless networks from this profile or configure a RADIUS
                  Proxy.
                </div>
              ),
            });
            return;
          }
          formattedData.childProfileIds.push(values.rfProfileId?.value);
          formattedData = Object.assign(formattedData, formatApProfileForm(values));
        }
        if (profileType === PROFILES.radius) {
          formattedData = Object.assign(formattedData, formatRadiusForm(values));
        }
        if (profileType === PROFILES.captivePortal) {
          if (
            values.authenticationType === 'radius' &&
            (!values?.radiusServiceId?.value || !values?.radiusServiceId?.label)
          ) {
            notification.error({
              message: 'Error',
              description: 'RADIUS Profile is required for authentication.',
            });
            return;
          }
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
          if (!values.passpointVenueProfileId?.value) {
            notification.error({
              message: 'Error',
              description: 'A Venue Profile is required.',
            });
            return;
          }
          if (!values.passpointOperatorProfileId?.value) {
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

          formattedData.model_type = 'PasspointProfile';
          formattedData = Object.assign(formattedData, formatPasspointForm(values, details));
        }
        if (profileType === PROFILES.operator) {
          formattedData.model_type = 'PasspointOperatorProfile';
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
        buttonText="Leave Page"
        title="Leave Page?"
        content={
          <p>
            You have unsaved changes. Please confirm leaving without saving this wireless profile
            page:
          </p>
        }
      />

      <Form
        {...pageLayout}
        form={form}
        onValuesChange={handleOnFormChange}
        className={styles.ProfileDetails}
        scrollToFirstError={{ block: 'center' }}
        onFinish={handleOnSave}
      >
        <Header>
          <div className={styles.HeaderDiv}>
            <Button icon={<LeftOutlined />} onClick={handleOnBack}>
              Back
            </Button>
            <Skeleton loading={loadingProfile || !name} title paragraph={false} active width={220}>
              <h1>{`${text('Edit')} ${name}`}</h1>
            </Skeleton>
          </div>
          <WithRoles>
            <div className={styles.HeaderDiv}>
              <div className={styles.HeaderButton}>{extraButtons}</div>
              <Item noStyle>
                <Button type="primary" htmlType="submit" disabled={!isFormDirty}>
                  {text('Save')}
                </Button>
              </Item>
            </div>
          </WithRoles>
        </Header>
        <Card loading={loadingProfile}>
          <Item label={text('Type')}>
            <Select defaultValue={profileType} disabled>
              <Select.Option value={profileType}>{profileTypes[profileType]}</Select.Option>
            </Select>
          </Item>
          <Item
            name="name"
            label={text('Profile Name')}
            rules={[{ required: true, message: 'Please input your new profile name' }]}
          >
            <Input placeholder="Enter profile name" />
          </Item>
        </Card>
        {profileType === PROFILES.ssid && (
          <SSIDForm
            form={form}
            profileId={profileId}
            details={details}
            childProfiles={childProfiles}
            radiusProfiles={radiusProfiles}
            captiveProfiles={captiveProfiles}
            passpointProfiles={passpointProfiles}
            onSearchProfile={onSearchProfile}
            onFetchMoreProfiles={onFetchMoreProfiles}
            loadingCaptiveProfiles={loadingCaptiveProfiles}
            loadingRadiusProfiles={loadingRadiusProfiles}
            loadingPasspointProfiles={loadingPasspointProfiles}
            text={text}
          />
        )}
        {profileType === PROFILES.accessPoint && (
          <AccessPointForm
            form={form}
            loading={loadingProfile}
            details={details}
            childProfiles={childProfiles}
            rfProfiles={rfProfiles}
            ssidProfiles={ssidProfiles}
            onSearchProfile={onSearchProfile}
            onFetchMoreProfiles={onFetchMoreProfiles}
            loadingSSIDProfiles={loadingSSIDProfiles}
            loadingRFProfiles={loadingRFProfiles}
            fileUpload={fileUpload}
            handleOnFormChange={handleOnFormChange}
            text={text}
          />
        )}
        {profileType === PROFILES.captivePortal && (
          <CaptivePortalForm
            form={form}
            details={details}
            childProfiles={childProfiles}
            fileUpload={fileUpload}
            onDownloadFile={onDownloadFile}
            radiusProfiles={radiusProfiles}
            onSearchProfile={onSearchProfile}
            onFetchMoreProfiles={onFetchMoreProfiles}
            loadingRadiusProfiles={loadingRadiusProfiles}
            handleOnFormChange={handleOnFormChange}
            text={text}
          />
        )}
        {profileType === PROFILES.radius && (
          <RadiusForm details={details} form={form} text={text} />
        )}
        {profileType === PROFILES.bonjour && <BonjourGatewayForm details={details} form={form} />}
        {profileType === PROFILES.rf && (
          <RFForm details={details} form={form} extraFields={extraFields} text={text} />
        )}
        {profileType === PROFILES.passpoint && (
          <PasspointProfileForm
            form={form}
            details={details}
            childProfiles={childProfiles}
            venueProfiles={venueProfiles}
            operatorProfiles={operatorProfiles}
            idProviderProfiles={idProviderProfiles}
            associatedSsidProfiles={associatedSsidProfiles}
            osuSsidProfile={osuSsidProfile}
            fileUpload={fileUpload}
            onSearchProfile={onSearchProfile}
            onFetchMoreProfiles={onFetchMoreProfiles}
            loadingVenueProfiles={loadingVenueProfiles}
            loadingOperatorProfiles={loadingOperatorProfiles}
            loadingIdProviderProfiles={loadingIdProviderProfiles}
            handleOnFormChange={handleOnFormChange}
            text={text}
          />
        )}
        {profileType === PROFILES.providerID && (
          <ProviderIdForm
            form={form}
            details={details}
            handleOnFormChange={handleOnFormChange}
            text={text}
          />
        )}
        {profileType === PROFILES.operator && (
          <OperatorForm
            form={form}
            details={details}
            handleOnFormChange={handleOnFormChange}
            text={text}
          />
        )}
        {profileType === PROFILES.venue && (
          <VenueForm
            form={form}
            details={details}
            handleOnFormChange={handleOnFormChange}
            text={text}
          />
        )}
      </Form>
    </Container>
  );
};

ProfileDetails.propTypes = {
  onUpdateProfile: PropTypes.func.isRequired,
  fileUpload: PropTypes.func.isRequired,
  onDownloadFile: PropTypes.func.isRequired,
  profileId: PropTypes.string,
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
  passpointProfiles: PropTypes.instanceOf(Array),
  childProfiles: PropTypes.instanceOf(Array),
  childProfileIds: PropTypes.instanceOf(Array),
  associatedSsidProfiles: PropTypes.instanceOf(Array),
  osuSsidProfile: PropTypes.instanceOf(Object),
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
  loadingPasspointProfiles: PropTypes.bool,
  extraFields: PropTypes.instanceOf(Array),
  loadingProfile: PropTypes.bool,
  text: PropTypes.func,
};

ProfileDetails.defaultProps = {
  profileId: '',
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
  passpointProfiles: [],
  childProfileIds: [],
  childProfiles: [],
  associatedSsidProfiles: [],
  osuSsidProfile: null,
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
  loadingPasspointProfiles: false,
  extraFields: [],
  loadingProfile: false,
  text: str => str,
};

export default ProfileDetails;
