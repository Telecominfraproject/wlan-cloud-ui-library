import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Form, Select, Skeleton } from 'antd';

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

import { handleOnProfileUpdate, PROFILE_TYPES } from 'utils/profiles';
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
  onCreateChildProfile,
  onUpdateChildProfile,
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
  onFetchChildProfile,
  childProfile,
  loadingChildProfile,
  extraFields,
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
        handleOnProfileUpdate(profileType, details, values, onUpdateProfile);
        setIsFormDirty(false);
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
              <h1>{`Edit ${name}`}</h1>
            </Skeleton>
          </div>
          <WithRoles>
            <div className={styles.HeaderDiv}>
              <div className={styles.HeaderButton}>{extraButtons}</div>
              <Item noStyle>
                <Button type="primary" htmlType="submit" disabled={!isFormDirty}>
                  Save
                </Button>
              </Item>
            </div>
          </WithRoles>
        </Header>
        <Card loading={loadingProfile}>
          <Item label="Type">
            <Select defaultValue={profileType} disabled>
              <Select.Option value={profileType}>{PROFILE_TYPES[profileType]}</Select.Option>
            </Select>
          </Item>
          <Item
            name="name"
            label="Profile Name"
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
            loadingVenueProfiles={loadingVenueProfiles}
            loadingOperatorProfiles={loadingOperatorProfiles}
            loadingIdProviderProfiles={loadingIdProviderProfiles}
            fileUpload={fileUpload}
            onDownloadFile={onDownloadFile}
            venueProfiles={venueProfiles}
            operatorProfiles={operatorProfiles}
            idProviderProfiles={idProviderProfiles}
            handleOnFormChange={handleOnFormChange}
            onUpdateChildProfile={onUpdateChildProfile}
            onCreateChildProfile={onCreateChildProfile}
            onFetchChildProfile={onFetchChildProfile}
            childProfile={childProfile}
            loadingChildProfile={loadingChildProfile}
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
            captiveProfiles={captiveProfiles}
            radiusProfiles={radiusProfiles}
            passpointProfiles={passpointProfiles}
            loadingCaptiveProfiles={loadingCaptiveProfiles}
            loadingRadiusProfiles={loadingRadiusProfiles}
            loadingPasspointProfiles={loadingPasspointProfiles}
            handleOnFormChange={handleOnFormChange}
            onUpdateChildProfile={onUpdateChildProfile}
            onCreateChildProfile={onCreateChildProfile}
            onFetchChildProfile={onFetchChildProfile}
            childProfile={childProfile}
            loadingChildProfile={loadingChildProfile}
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
            onUpdateChildProfile={onUpdateChildProfile}
            onCreateChildProfile={onCreateChildProfile}
            onFetchChildProfile={onFetchChildProfile}
            childProfile={childProfile}
            loadingChildProfile={loadingChildProfile}
          />
        )}
        {profileType === PROFILES.radius && <RadiusForm details={details} form={form} />}
        {profileType === PROFILES.bonjour && <BonjourGatewayForm details={details} form={form} />}
        {profileType === PROFILES.rf && (
          <RFForm details={details} form={form} extraFields={extraFields} />
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
            onUpdateChildProfile={onUpdateChildProfile}
            onCreateChildProfile={onCreateChildProfile}
            onFetchChildProfile={onFetchChildProfile}
            childProfile={childProfile}
            loadingChildProfile={loadingChildProfile}
          />
        )}
        {profileType === PROFILES.providerID && (
          <ProviderIdForm form={form} details={details} handleOnFormChange={handleOnFormChange} />
        )}
        {profileType === PROFILES.operator && (
          <OperatorForm form={form} details={details} handleOnFormChange={handleOnFormChange} />
        )}
        {profileType === PROFILES.venue && (
          <VenueForm form={form} details={details} handleOnFormChange={handleOnFormChange} />
        )}
      </Form>
    </Container>
  );
};

ProfileDetails.propTypes = {
  onUpdateProfile: PropTypes.func.isRequired,
  fileUpload: PropTypes.func.isRequired,
  onDownloadFile: PropTypes.func.isRequired,
  onCreateChildProfile: PropTypes.func.isRequired,
  onUpdateChildProfile: PropTypes.func.isRequired,
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
  childProfile: PropTypes.instanceOf(Object),
  loadingChildProfile: PropTypes.bool,
  onFetchChildProfile: PropTypes.func,
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
  childProfile: {},
  loadingChildProfile: false,
  onFetchChildProfile: () => {},
};

export default ProfileDetails;
