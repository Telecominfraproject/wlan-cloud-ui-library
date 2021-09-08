import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Form, Input, Card, Select } from 'antd';
import { LeftOutlined, PlusOutlined } from '@ant-design/icons';

import Button from 'components/Button';
import Container from 'components/Container';
import Header from 'components/Header';
import Modal from 'components/Modal';
import ThemeContext from 'contexts/ThemeContext';
import { pageLayout } from 'utils/form';

import { handleOnCreateProfile, PROFILE_TYPES } from 'utils/profiles';

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
  passpointProfiles,
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
  fileUpload,
  onCreateChildProfile,
  onUpdateChildProfile,
  onFetchChildProfile,
  childProfile,
  loadingChildProfile,
  extraFields,
}) => {
  const { routes } = useContext(ThemeContext);
  const [form] = Form.useForm();
  const history = useHistory();

  const [profileType, setType] = useState('');
  const [confirmModal, setConfirmModal] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);

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
        handleOnCreateProfile(profileType, values, onCreateProfile);
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
          scrollToFirstError={{ block: 'center' }}
          onFinish={handleOnSave}
        >
          <Header>
            <div className={styles.HeaderDiv}>
              <Button className={styles.backButton} icon={<LeftOutlined />} onClick={handleOnBack}>
                Back
              </Button>
              <h1>Add Profile</h1>
            </div>
            <div>
              <Item noStyle>
                <Button icon={<PlusOutlined />} type="primary" htmlType="submit">
                  Add
                </Button>
              </Item>
            </div>
          </Header>
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
              <Select onChange={value => setType(value)} placeholder="Select Profile Type">
                {Object.keys(PROFILE_TYPES).map(type => (
                  <Option key={type} value={type} disabled={type === 'bonjour'}>
                    {PROFILE_TYPES[type]}
                  </Option>
                ))}
              </Select>
            </Item>
            <Item
              id="name"
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please input your profile name' }]}
            >
              <Input id="profileName" placeholder="Enter profile name" />
            </Item>
          </Card>
          {profileType === PROFILES.ssid && (
            <SSIDForm
              form={form}
              radiusProfiles={radiusProfiles}
              captiveProfiles={captiveProfiles}
              passpointProfiles={passpointProfiles}
              onSearchProfile={onSearchProfile}
              onFetchMoreProfiles={onFetchMoreProfiles}
              loadingCaptiveProfiles={loadingCaptiveProfiles}
              loadingRadiusProfiles={loadingRadiusProfiles}
              loadingPasspointProfiles={loadingPasspointProfiles}
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
              rfProfiles={rfProfiles}
              ssidProfiles={ssidProfiles}
              radiusProfiles={radiusProfiles}
              captiveProfiles={captiveProfiles}
              passpointProfiles={passpointProfiles}
              onSearchProfile={onSearchProfile}
              onFetchMoreProfiles={onFetchMoreProfiles}
              loadingSSIDProfiles={loadingSSIDProfiles}
              loadingRFProfiles={loadingRFProfiles}
              loadingCaptiveProfiles={loadingCaptiveProfiles}
              loadingRadiusProfiles={loadingRadiusProfiles}
              loadingPasspointProfiles={loadingPasspointProfiles}
              fileUpload={fileUpload}
              onUpdateChildProfile={onUpdateChildProfile}
              onCreateChildProfile={onCreateChildProfile}
              onFetchChildProfile={onFetchChildProfile}
              childProfile={childProfile}
              loadingChildProfile={loadingChildProfile}
            />
          )}
          {profileType === PROFILES.bonjour && <BonjourGatewayForm form={form} />}
          {profileType === PROFILES.captivePortal && (
            <CaptivePortalForm
              form={form}
              radiusProfiles={radiusProfiles}
              onSearchProfile={onSearchProfile}
              onFetchMoreProfiles={onFetchMoreProfiles}
              loadingRadiusProfiles={loadingRadiusProfiles}
              fileUpload={fileUpload}
              onUpdateChildProfile={onUpdateChildProfile}
              onCreateChildProfile={onCreateChildProfile}
              onFetchChildProfile={onFetchChildProfile}
              childProfile={childProfile}
              loadingChildProfile={loadingChildProfile}
            />
          )}

          {profileType === PROFILES.radius && <RadiusForm form={form} />}
          {profileType === PROFILES.rf && <RFForm form={form} extraFields={extraFields} />}
          {profileType === PROFILES.passpoint && (
            <PasspointProfileForm
              form={form}
              venueProfiles={venueProfiles}
              operatorProfiles={operatorProfiles}
              idProviderProfiles={idProviderProfiles}
              onSearchProfile={onSearchProfile}
              onFetchMoreProfiles={onFetchMoreProfiles}
              loadingVenueProfiles={loadingVenueProfiles}
              loadingOperatorProfiles={loadingOperatorProfiles}
              loadingIdProviderProfiles={loadingIdProviderProfiles}
              fileUpload={fileUpload}
              onUpdateChildProfile={onUpdateChildProfile}
              onCreateChildProfile={onCreateChildProfile}
              onFetchChildProfile={onFetchChildProfile}
              childProfile={childProfile}
              loadingChildProfile={loadingChildProfile}
            />
          )}
          {profileType === PROFILES.providerID && <ProviderIdForm form={form} />}
          {profileType === PROFILES.operator && <OperatorForm form={form} />}
          {profileType === PROFILES.venue && <VenueForm form={form} />}
        </Form>
      </div>
    </Container>
  );
};

AddProfile.propTypes = {
  onCreateProfile: PropTypes.func.isRequired,
  onCreateChildProfile: PropTypes.func.isRequired,
  onUpdateChildProfile: PropTypes.func.isRequired,
  ssidProfiles: PropTypes.instanceOf(Array),
  venueProfiles: PropTypes.instanceOf(Array),
  operatorProfiles: PropTypes.instanceOf(Array),
  idProviderProfiles: PropTypes.instanceOf(Array),
  rfProfiles: PropTypes.instanceOf(Array),
  radiusProfiles: PropTypes.instanceOf(Array),
  captiveProfiles: PropTypes.instanceOf(Array),
  passpointProfiles: PropTypes.instanceOf(Array),
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
  fileUpload: PropTypes.func,
  childProfile: PropTypes.instanceOf(Object),
  loadingChildProfile: PropTypes.bool,
  onFetchChildProfile: PropTypes.func,
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
  passpointProfiles: [],
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
  fileUpload: () => {},
  childProfile: {},
  loadingChildProfile: false,
  onFetchChildProfile: () => {},
  extraFields: [],
};

export default AddProfile;
