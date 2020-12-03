import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Card, notification } from 'antd';
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
  formatProviderProfileForm,
} from 'utils/profiles';

import SSIDForm from './components/SSID';
import AccessPointForm from './components/AccessPoint';
import RadiusForm from './components/Radius';
import CaptivePortalForm from './components/CaptivePortal';
import BonjourGatewayForm from './components/BonjourGateway';
import RFForm from './components/RF';
import ProviderIdForm from './components/ProviderId';
import OperatorForm from './components/Operator';

import styles from './index.module.scss';

const ProfileDetails = ({
  profileType,
  name,
  details,
  childProfiles,
  childProfileIds,
  onUpdateProfile,
  ssidProfiles,
  rfProfiles,
  radiusProfiles,
  captiveProfiles,
  fileUpload,
  onFetchMoreProfiles,
  onFetchMoreRfProfiles,
  onFetchMoreRadiusProfiles,
  onFetchMoreCaptiveProfiles,
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

        if (profileType === 'ssid') {
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
          formattedData = Object.assign(formattedData, formatApProfileForm(values));
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
          formattedData = Object.assign(formattedData, formatRadiusForm(values));
        }
        if (profileType === 'captive_portal') {
          formattedData = Object.assign(formattedData, formatCaptiveForm(values, details));
        }

        if (profileType === 'bonjour') {
          formattedData.model_type = 'BonjourGatewayProfile';
          formattedData = Object.assign(formattedData, formatBonjourGatewayForm(values));
        }
        if (profileType === 'rf') {
          formattedData.model_type = 'RfConfiguration';
          formattedData = Object.assign(formattedData, formatRfProfileForm(values));
        }
        if (profileType === 'passpoint_osu_id_provider') {
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
        <Button icon={<LeftOutlined />} onClick={handleOnBack}>
          Back
        </Button>
        <div>
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
        <Card title={`Edit ${name}`}>
          <Item
            name="name"
            label="Profile Name"
            rules={[{ required: true, message: 'Please input your new profile name' }]}
          >
            <Input className={globalStyles.field} placeholder="Enter profile name" />
          </Item>
        </Card>
        {profileType === 'ssid' && (
          <SSIDForm
            form={form}
            details={details}
            captiveProfiles={captiveProfiles}
            radiusProfiles={radiusProfiles}
            onFetchMoreCaptiveProfiles={onFetchMoreCaptiveProfiles}
            onFetchMoreRadiusProfiles={onFetchMoreRadiusProfiles}
          />
        )}
        {profileType === 'equipment_ap' && (
          <AccessPointForm
            form={form}
            details={details}
            ssidProfiles={ssidProfiles}
            rfProfiles={rfProfiles}
            childProfiles={childProfiles}
            childProfileIds={childProfileIds}
            onFetchMoreProfiles={onFetchMoreProfiles}
            onFetchMoreRfProfiles={onFetchMoreRfProfiles}
          />
        )}
        {profileType === 'captive_portal' && (
          <CaptivePortalForm
            form={form}
            details={details}
            radiusProfiles={radiusProfiles}
            fileUpload={fileUpload}
            onFetchMoreRadiusProfiles={onFetchMoreRadiusProfiles}
          />
        )}
        {profileType === 'radius' && <RadiusForm details={details} form={form} />}
        {profileType === 'bonjour' && <BonjourGatewayForm details={details} form={form} />}
        {profileType === 'rf' && <RFForm details={details} form={form} />}
        {profileType === 'passpoint_osu_id_provider' && (
          <ProviderIdForm form={form} details={details} />
        )}
        {profileType === 'passpoint_operator' && <OperatorForm form={form} details={details} />}
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
  childProfiles: PropTypes.instanceOf(Array),
  childProfileIds: PropTypes.instanceOf(Array),
  onFetchMoreProfiles: PropTypes.func,
  onFetchMoreRfProfiles: PropTypes.func,
  onFetchMoreRadiusProfiles: PropTypes.func,
  onFetchMoreCaptiveProfiles: PropTypes.func,
};

ProfileDetails.defaultProps = {
  name: null,
  profileType: null,
  details: {},
  ssidProfiles: [],
  rfProfiles: [],
  radiusProfiles: [],
  captiveProfiles: [],
  childProfiles: [],
  childProfileIds: [],
  onFetchMoreProfiles: () => {},
  onFetchMoreRfProfiles: () => {},
  onFetchMoreRadiusProfiles: () => {},
  onFetchMoreCaptiveProfiles: () => {},
};

export default ProfileDetails;
