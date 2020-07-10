import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Alert, Upload, Input, Form } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Button from 'components/Button';
import Container from 'components/Container';
import globalStyles from 'styles/index.scss';
import styles from './index.module.scss';

const Manufacturer = ({ onSearchOUI, onUpdateOUI, returnedOUI }) => {
  const { Item } = Form;
  const [form] = Form.useForm();
  const [cancel, setCancel] = useState(false);

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

            <Upload>
              <Button className={styles.fileButton} icon={<UploadOutlined />}>
                Select File to Import...
              </Button>
            </Upload>
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
  returnedOUI: PropTypes.instanceOf(Object),
};

Manufacturer.defaultProps = {
  returnedOUI: null,
};

export default Manufacturer;
