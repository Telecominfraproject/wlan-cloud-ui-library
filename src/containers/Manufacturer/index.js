import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Alert, Upload, Input, Form, message } from 'antd';
import Button from 'components/Button';
import Container from 'components/Container';
import globalStyles from 'styles/index.scss';
import styles from './index.module.scss';

const Manufacturer = ({ onSearchOUI, onUpdateOUI, returnedOUI, fileUpload }) => {
  const { Item } = Form;
  const [form] = Form.useForm();
  const [cancel, setCancel] = useState(false);
  const [ouiFileList, setOUIileList] = useState([]);

  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 12 },
  };

  const onSubmit = () => {
    form
      .validateFields()
      .then(values => {
        onUpdateOUI(returnedOUI.oui.toLowerCase(), values.alias, returnedOUI.manufacturerName);
      })
      .catch(() => {});
  };

  const handleOnSearch = value => {
    onSearchOUI(value.replace(/:/g, ''));
    setCancel(false);
  };

  const validateFile = (file, showMessages = false) => {
    const isTxtOrGz = file.type === 'application/x-gzip';
    if (!isTxtOrGz) {
      if (showMessages) message.error('You can only upload .gz files!');
      return false;
    }

    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      if (showMessages) message.error('File must smaller than 5MB!');
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
    if (fileList.length === 0) {
      setOUIileList([]);
    }
    const list = handleOnChange(file, fileList);
    if (list) setOUIileList(list);
  };

  const handleFileUpload = file => {
    if (validateFile(file, true)) {
      fileUpload(file.name, file);
    }
    return false;
  };

  return (
    <Container>
      <div className={styles.Manufacturer}>
        <h1>Device Manufacturers</h1>
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

            <Item name="backgroundFile" className={styles.Image}>
              <Upload
                accept=".gz"
                fileList={ouiFileList}
                beforeUpload={handleFileUpload}
                listType="picture-card"
                onChange={handleOnChangeOUI}
              >
                Select File to Import...
              </Upload>
            </Item>
          </Card>
          <Card title="Set a Manufacturer Alias">
            <Item name="oui" label="OUI">
              <Input.Search
                placeholder="OUI String"
                enterButton="Find"
                maxLength={8}
                className={globalStyles.field}
                onSearch={handleOnSearch}
              />
            </Item>
            {returnedOUI && !cancel && (
              <>
                <Item label="Manufacturer">{returnedOUI.manufacturerName}</Item>
                <Item
                  label="Alias"
                  name="alias"
                  rules={[{ required: true, message: 'Please enter the Alias name' }]}
                  initialValue={returnedOUI.manufacturerAlias}
                >
                  <Input
                    className={globalStyles.field}
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
    </Container>
  );
};

Manufacturer.propTypes = {
  onSearchOUI: PropTypes.func.isRequired,
  onUpdateOUI: PropTypes.func.isRequired,
  fileUpload: PropTypes.func.isRequired,
  returnedOUI: PropTypes.instanceOf(Object),
};

Manufacturer.defaultProps = {
  returnedOUI: null,
};

export default Manufacturer;
