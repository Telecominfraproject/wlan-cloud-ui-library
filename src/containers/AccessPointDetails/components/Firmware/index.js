import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Input, Tag, Select } from 'antd';
import moment from 'moment';
import { DownloadOutlined } from '@ant-design/icons';
import Button from 'components/Button';
import Modal from 'components/Modal';
import styles from '../../index.module.scss';

const { Option } = Select;
const { TextArea } = Input;
const { Item } = Form;

const Firmware = ({ firmware, data, onUpdateEquipmentFirmware }) => {
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
    onUpdateEquipmentFirmware(data.id, version.id);
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

  return (
    <>
      <Modal
        onCancel={() => setRebootModal(false)}
        onSuccess={handleUpdateFirmware}
        visible={rebootModal}
        title="Confirm"
        content={<p>Confirm downloading, flashing, rebooting? </p>}
      />
      <Form {...layout} form={form}>
        <Card title="Firmware">
          <Item label="Active Version">
            <div className={styles.InlineBetweenDiv}>
              {status.activeSwVersion}
              <Tag color={alertColor(status.upgradeState)}>{alertText(status.upgradeState)}</Tag>
            </div>
          </Item>

          <Item label="Inactive Version">{status.alternateSwVersion}</Item>
        </Card>
        <Card title="Upgrade">
          <Item label="Target Version">
            <div className={styles.InlineDiv}>
              <Item>
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
                  disabled={
                    !version ||
                    version.id === (data.status && data.status.firmware && data.status.firmware.id)
                  }
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
  onUpdateEquipmentFirmware: PropTypes.func,
};

Firmware.defaultProps = {
  data: {},
  firmware: {},
  onUpdateEquipmentFirmware: () => {},
};
export default Firmware;
