import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Alert, Upload, Input, Form, message, Spin } from 'antd';
import { Search } from 'components/WithRoles';
import { UploadOutlined } from '@ant-design/icons';

import Button from 'components/Button';
import Header from 'components/Header';

import { useRoles } from 'contexts/RolesContext';

import styles from './index.module.scss';

const { Item } = Form;

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 12 },
};

const Manufacturer = ({ onSearchOUI, onUpdateOUI, returnedOUI, fileUpload, loadingFileUpload }) => {
  const { isReadOnly } = useRoles();
  const [form] = Form.useForm();
  const [cancel, setCancel] = useState(false);
  const [ouiFileList, setOUIFileList] = useState([]);

  const onSubmit = () => {
    form
      .validateFields()
      .then(values => {
        onUpdateOUI(returnedOUI.oui.toLowerCase(), values.alias, returnedOUI.manufacturerName);
      })
      .catch(() => {});
  };

  const validateFile = (file, showMessages = false) => {
    const isTxtOrGz = file.type === 'application/x-gzip';
    if (!isTxtOrGz) {
      if (showMessages) message.error('You can only upload .gz files!');
      return false;
    }

    const validSize = file.size / 1024 / 1024 < 5;
    if (!validSize) {
      if (showMessages) message.error('File must be smaller than 5MB!');
      return false;
    }

    return true;
  };

  const handleOnChange = (file, fileList) => {
    if (validateFile(file)) {
      let list = [...fileList];

      list = list.slice(-1);
      list = list.map(i => {
        return { ...i, url: i.response && i.response.url };
      });

      return list;
    }
    return false;
  };

  const handleOnChangeOUI = ({ file, fileList }) => {
    const list = handleOnChange(file, fileList);
    if (list) setOUIFileList(list);
  };

  const handleFileUpload = file => {
    if (validateFile(file, true)) {
      fileUpload(file.name, file);
    }
    return false;
  };

  const handleOnSearch = value => {
    onSearchOUI(value.replace(/[:-]/g, ''));
    setCancel(false);
  };

  return (
    <div className={styles.Manufacturer}>
      <Header>
        <h1>Device Manufacturers</h1>
      </Header>
      <Form form={form} {...layout}>
        <Card title="Upload Manufacturer OUI Data">
          <Alert
            message={
              <div>
                Latest sanitized IEEE OUI data file (oui.txt.gz) can be obtained from &nbsp;
                <a
                  style={{ textDecoration: 'underline' }}
                  target="_blank"
                  href="https://www.linuxnet.ca/ieee/oui/"
                  rel="noopener noreferrer"
                >
                  linuxnet.ca.
                </a>
              </div>
            }
            type="info"
          />
          <Item className={styles.FileButton}>
            <Upload
              accept="application/x-gzip"
              fileList={ouiFileList}
              beforeUpload={handleFileUpload}
              onChange={handleOnChangeOUI}
              showUploadList={false}
              data-testid="ouiUpload"
              disabled={loadingFileUpload}
            >
              <Button disabled={loadingFileUpload || isReadOnly} icon={<UploadOutlined />}>
                Select File to Import...
              </Button>
            </Upload>
            {loadingFileUpload && <Spin style={{ marginLeft: '10px' }} />}
          </Item>
        </Card>
        <Card title="Set a Manufacturer Alias">
          <Item name="oui" label="OUI">
            <Search
              placeholder="OUI String"
              enterButton="Find"
              maxLength={8}
              onSearch={handleOnSearch}
            />
          </Item>
          {returnedOUI?.oui && !cancel && (
            <>
              <Item label="Manufacturer">{returnedOUI.manufacturerName}</Item>
              <Item
                label="Alias"
                name="alias"
                rules={[{ required: true, message: 'Please enter the Alias name' }]}
                initialValue={returnedOUI.manufacturerAlias}
              >
                <Input
                  placeholder="Please enter a concise and widely recognized brand name."
                  maxLength={20}
                />
              </Item>
              <div className={styles.FlexDiv}>
                <Button onClick={() => setCancel(true)}>Cancel</Button>
                <Button type="primary" onClick={onSubmit}>
                  Save
                </Button>
              </div>
            </>
          )}
        </Card>
      </Form>
    </div>
  );
};

Manufacturer.propTypes = {
  onSearchOUI: PropTypes.func.isRequired,
  onUpdateOUI: PropTypes.func.isRequired,
  fileUpload: PropTypes.func.isRequired,
  loadingFileUpload: PropTypes.bool,
  returnedOUI: PropTypes.instanceOf(Object),
};

Manufacturer.defaultProps = {
  loadingFileUpload: false,
  returnedOUI: null,
};

export default Manufacturer;
