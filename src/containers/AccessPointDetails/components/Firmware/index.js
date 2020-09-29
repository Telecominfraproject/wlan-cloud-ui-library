import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Input, Tag, Select, Alert } from 'antd';
import moment from 'moment';
import { DownloadOutlined, LoginOutlined } from '@ant-design/icons';

import Button from 'components/Button';
import Loading from 'components/Loading';
import Modal from 'components/Modal';

import styles from '../../index.module.scss';

const { Option } = Select;
const { TextArea } = Input;
const { Item } = Form;

const Firmware = ({
  firmware,
  data,
  handleOnFirmwareSave,
  handleOnFormChange,
  loadingFirmware,
  errorFirmware,
}) => {
  const [form] = Form.useForm();

  const [version, setVersion] = useState(null);
  const [rebootModal, setRebootModal] = useState(false);

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 12 },
  };

  const handleOnChangeVersion = value => {
    setVersion(
      Object.values(firmware).find(o => {
        return o.id === value;
      })
    );
  };

  const handleUpdateFirmware = () => {
    handleOnFirmwareSave(data.id, version.id);
    setRebootModal(false);
  };

  const alertText = (value = '') => {
    if (value === 'download_initiated') return 'initiated download';
    if (value === 'download_complete') return 'download completed';
    if (value === 'apply_initiated') return 'initiated firmware flash';
    if (value === 'apply_complete') return 'flashed to inactive bank';
    if (value === 'applying') return 'flashing firmware';
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
        onCancel={() => setRebootModal(false)}
        onSuccess={handleUpdateFirmware}
        visible={rebootModal}
        title="Confirm"
        content={<p>Confirm downloading, flashing, rebooting? </p>}
      />
      <Form {...layout} form={form} onValuesChange={handleOnFormChange}>
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
              onClick={() => setRebootModal(true)}
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
                  onClick={() => setRebootModal(true)}
                >
                  Download, Flash, and Reboot
                </Button>
              </Item>
            </div>
          </Item>

          {version && (
            <Item label=" " colon={false}>
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
  loadingFirmware: PropTypes.bool,
  errorFirmware: PropTypes.instanceOf(Object),
};

Firmware.defaultProps = {
  data: {},
  firmware: {},
  handleOnFirmwareSave: () => {},
  handleOnFormChange: () => {},
  loadingFirmware: true,
  errorFirmware: null,
};
export default Firmware;
