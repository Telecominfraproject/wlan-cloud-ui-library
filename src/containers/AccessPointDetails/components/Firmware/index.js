import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Tag, Select, Alert, Progress } from 'antd';
import { Card } from 'components/Skeleton';
import moment from 'moment';
import { DownloadOutlined, LoginOutlined } from '@ant-design/icons';

import Button from 'components/Button';
import Modal from 'components/Modal';
import WithRoles, { RoleProtectedBtn } from 'components/WithRoles';

import { pageLayout } from 'utils/form';
import styles from '../../index.module.scss';

const { Option } = Select;
const { TextArea } = Input;
const { Item } = Form;

const MODAL_REBOOT = 'reboot';
const MODAL_INACTIVE = 'inactive';
const MODAL_DOWNLOAD = 'download';

const updateInProgressStates = new Set([
  'download_initiated',
  'downloading',
  'download_complete',
  'apply_initiated',
  'applying',
  'apply_complete',
  'reboot_initiated',
  'rebooting',
]);

const Firmware = ({
  firmware,
  data,
  handleOnFirmwareSave,
  handleOnFormChange,
  onRequestEquipmentSwitchBank,
  onRequestEquipmentReboot,
  loadingFirmware,
  errorFirmware,
  loading,
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
      return 'Confirm reboot access point?';
    }
    if (confirmModal === MODAL_INACTIVE) {
      return 'Confirm switch to inactive bank and reboot?';
    }
    if (confirmModal === MODAL_DOWNLOAD) {
      return 'Confirm downloading, flashing, and rebooting?';
    }
    return null;
  };

  const alertText = (value = '') => {
    if (value === 'download_initiated') return 'Initiated Download';
    if (value === 'download_complete') return 'Download Completed';
    if (value === 'apply_initiated') return 'Initiated Firmware Flash';
    if (value === 'apply_complete') return 'Flashed to Inactive Bank';
    if (value === 'apply_failed') return 'Upgrade Failed';
    if (value === 'applying') return 'Flashing Firmware';
    if (value === 'undefined') return 'Stable';
    return value.toUpperCase().replace(/_/g, ' ');
  };

  const alertColor = value => {
    if (value === 'out_of_date') return 'warning';
    if (value === 'apply_failed') return 'error';
    if (value === null || value === 'up_to_date') return 'success';
    if (value === 'download_complete') return 'processing';
    return 'default';
  };

  const status = data?.status?.firmware?.detailsJSON || {};

  const getRebootStatus = () => updateInProgressStates.has(status?.upgradeState);

  const getUpgradePercentage = value => {
    // In testing, only download_initiated, download_complete, and apply_initiated actually return, the rest are just in case
    if (value.includes('download_initiated')) return 20;
    if (value.includes('download_complete')) return 40;
    if (value.includes('download')) return 70;
    if (value.includes('apply_initiated')) return 80;
    if (value.includes('apply_complete')) return 90;
    if (value.includes('apply')) return 90;
    if (value.includes('reboot')) return 95;
    return 100;
  };

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
        visible={Boolean(confirmModal)}
        title="Confirm?"
        content={renderModalContent()}
        buttonText="Confirm"
      />
      <Form {...pageLayout} form={form} onValuesChange={handleOnFormChange}>
        <WithRoles>
          <div className={styles.InlineEndDiv}>
            <Button
              className={styles.saveButton}
              onClick={handleOnReboot}
              name="reboot"
              disabled={getRebootStatus()}
            >
              Reboot Access Point
            </Button>
          </div>
        </WithRoles>

        <Card title="Firmware" loading={loadingFirmware || loading}>
          <Item label="Active Version">{status.activeSwVersion}</Item>

          <Item label="Inactive Version">
            {status.alternateSwVersion}
            <RoleProtectedBtn
              className={styles.UpgradeState}
              icon={<LoginOutlined />}
              onClick={handleOnSwitchInactiveBank}
              disabled={status.alternateSwVersion === status.activeSwVersion || getRebootStatus()}
            >
              Switch to Inactive Bank and Reboot
            </RoleProtectedBtn>
          </Item>
        </Card>
        <WithRoles>
          <Card
            loading={loadingFirmware || loading}
            title={
              <>
                Upgrade
                <Tag className={styles.UpgradeState} color={alertColor(status.upgradeState)}>
                  {alertText(status.upgradeState)}
                </Tag>
              </>
            }
          >
            {getRebootStatus() ? (
              <>
                <div>
                  Upgrade {status?.targetSwVersion && `to ${status?.targetSwVersion}`} in progress
                </div>
                <Progress percent={getUpgradePercentage(status?.upgradeState)} />
              </>
            ) : (
              <>
                <Item label="Target Version">
                  <div className={styles.InlineDiv}>
                    <Item name="targetVersion">
                      <Select
                        className={styles.Field}
                        onChange={handleOnChangeVersion}
                        placeholder="Select a version to apply..."
                      >
                        {Object.keys(firmware).map(i => (
                          <>
                            {status?.activeSwVersion !== firmware[i].versionName && (
                              <Option key={firmware[i].id} value={firmware[i].id}>
                                {firmware[i].versionName}
                              </Option>
                            )}
                          </>
                        ))}
                      </Select>
                    </Item>
                    <Item noStyle>
                      <Button
                        icon={<DownloadOutlined />}
                        disabled={!version || version?.versionName === status?.activeSwVersion}
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
              </>
            )}
          </Card>
        </WithRoles>
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
  loading: PropTypes.bool,
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
  loading: false,
};
export default Firmware;
