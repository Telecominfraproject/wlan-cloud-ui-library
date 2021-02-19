import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Input, Tag, Select, Alert } from 'antd';
import moment from 'moment';
import { DownloadOutlined, LoginOutlined } from '@ant-design/icons';

import Button from 'components/Button';
import Loading from 'components/Loading';
import Modal from 'components/Modal';

import { pageLayout } from 'utils/form';
import styles from '../../index.module.scss';

const { Option } = Select;
const { TextArea } = Input;
const { Item } = Form;

const MODAL_REBOOT = 'reboot';
const MODAL_INACTIVE = 'inactive';
const MODAL_DOWNLOAD = 'download';

const Firmware = ({
  firmware,
  data,
  handleOnFirmwareSave,
  handleOnFormChange,
  onRequestEquipmentSwitchBank,
  onRequestEquipmentReboot,
  loadingFirmware,
  errorFirmware,
}) => {
  const [form] = Form.useForm();

  const [version, setVersion] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);

  const handleOnChangeVersion = value => {
    setVersion(
      Object.values(firmware).find(o => {
        return o.id === value;
      })
    );
  };

  const handleOnReboot = () => setConfirmModal(MODAL_REBOOT);
  const handleOnSwitchInactiveBank = () => setConfirmModal(MODAL_INACTIVE);
  const handleOnDownload = () => setConfirmModal(MODAL_DOWNLOAD);

  const handleOnSuccessModal = () => {
    if (confirmModal === MODAL_REBOOT) {
      onRequestEquipmentReboot(data.id);
    }
    if (confirmModal === MODAL_INACTIVE) {
      onRequestEquipmentSwitchBank(data.id);
    }
    if (confirmModal === MODAL_DOWNLOAD) {
      handleOnFirmwareSave(data.id, version.id);
    }
    setConfirmModal(false);
  };

  const renderModalContent = () => {
    if (confirmModal === MODAL_REBOOT) {
      return 'Confirm Reboot AP?';
    }
    if (confirmModal === MODAL_INACTIVE) {
      return 'Confirm Switch to Inactive Bank and Reboot?';
    }
    if (confirmModal === MODAL_DOWNLOAD) {
      return 'Confirm downloading, flashing, rebooting?';
    }
    return null;
  };

  const alertText = (value = '') => {
    if (value === 'download_initiated') return 'Initiated Download';
    if (value === 'download_complete') return 'Download Completed';
    if (value === 'apply_initiated') return 'Initiated Firmware Flash';
    if (value === 'apply_complete') return 'Flashed to Inactive Bank';
    if (value === 'applying') return 'Flashing Firmware';
    return value.toUpperCase().replace(/_/g, ' ');
  };

  const alertColor = value => {
    if (value === 'out_of_date') return 'warning';
    if (value === null || value === 'up_to_date') return 'success';
    if (value === 'download_complete' || value === 'apply_failed') return 'processing';
    return 'default';
  };

  const status = data?.status?.firmware?.detailsJSON || {};

  if (loadingFirmware) {
    return <Loading data-testid="loadingFirmware" />;
  }

  if (errorFirmware) {
    return (
      <Alert
        message="Error"
        description="Failed to load Access Point firmware."
        type="error"
        showIcon
        data-testid="errorFirmware"
      />
    );
  }
  return (
    <>
      <Modal
        onCancel={() => setConfirmModal(false)}
        onSuccess={handleOnSuccessModal}
        visible={confirmModal}
        title="Confirm"
        content={renderModalContent()}
        buttonText="Confirm"
      />
      <Form {...pageLayout} form={form} onValuesChange={handleOnFormChange}>
        <div className={styles.InlineEndDiv}>
          <Button className={styles.saveButton} onClick={handleOnReboot} name="reboot">
            Reboot AP
          </Button>
        </div>
        <Card title="Firmware">
          <Item label="Active Version">
            {status.activeSwVersion}
            <Tag className={styles.UpgradeState} color={alertColor(status.upgradeState)}>
              {alertText(status.upgradeState)}
            </Tag>
          </Item>

          <Item label="Inactive Version">
            {status.alternateSwVersion}
            <Button
              className={styles.UpgradeState}
              icon={<LoginOutlined />}
              onClick={handleOnSwitchInactiveBank}
              disabled={status.alternateSwVersion === status.activeSwVersion}
            >
              Switch to Inactive Bank and Reboot
            </Button>
          </Item>
        </Card>
        <Card title="Upgrade">
          <Item label="Target Version">
            <div className={styles.InlineDiv}>
              <Item name="targetVersion">
                <Select
                  className={styles.Field}
                  onChange={handleOnChangeVersion}
                  placeholder="Select a version to apply..."
                >
                  {Object.keys(firmware).map(i => (
                    <Option key={firmware[i].id} value={firmware[i].id}>
                      {firmware[i].versionName}
                    </Option>
                  ))}
                </Select>
              </Item>
              <Item noStyle>
                <Button
                  icon={<DownloadOutlined />}
                  disabled={!version || version.id === data?.status?.firmware?.id}
                  onClick={handleOnDownload}
                >
                  Download, Flash, and Reboot
                </Button>
              </Item>
            </div>
          </Item>

          {version && (
            <Item wrapperCol={{ offset: 5, span: 15 }}>
              <TextArea
                readOnly
                rows={6}
                value={
                  `Version:  ${`${version.versionName.replace(/-([^-]*)$/, '($1')})`}  \n` +
                  `Release Date:  ${moment(version.releaseDate, 'x').format(
                    'DD MMM YYYY, hh:mm a'
                  )} \n` +
                  `Device:  ${version.modelId} \n` +
                  `\n` +
                  `Release Notes:  ${version.description}`
                }
              />
            </Item>
          )}
        </Card>
      </Form>
    </>
  );
};

Firmware.propTypes = {
  data: PropTypes.instanceOf(Object),
  firmware: PropTypes.instanceOf(Object),
  handleOnFirmwareSave: PropTypes.func,
  handleOnFormChange: PropTypes.func,
  onRequestEquipmentSwitchBank: PropTypes.func,
  onRequestEquipmentReboot: PropTypes.func,
  loadingFirmware: PropTypes.bool,
  errorFirmware: PropTypes.instanceOf(Object),
};

Firmware.defaultProps = {
  data: {},
  firmware: {},
  handleOnFirmwareSave: () => {},
  handleOnFormChange: () => {},
  onRequestEquipmentSwitchBank: () => {},
  onRequestEquipmentReboot: () => {},
  loadingFirmware: true,
  errorFirmware: null,
};
export default Firmware;
