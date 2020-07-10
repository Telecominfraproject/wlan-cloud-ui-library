import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Input, Radio, Select, Tooltip, Upload, Alert, Collapse } from 'antd';
import { InfoCircleOutlined, QuestionCircleFilled } from '@ant-design/icons';
import Button from 'components/Button';
import styles from '../index.module.scss';

const CaptivePortalForm = ({ details, form }) => {
  const { Item } = Form;
  const { Option } = Select;
  const { Panel } = Collapse;
  const { TextArea } = Input;

  const [authentication, setAuthentication] = useState('');

  const [showTips, setShowTips] = useState(false);

  const [splash, setSplash] = useState(false);
  const [contentText, setContentText] = useState('user');

  useEffect(() => {
    form.setFieldsValue({
      authenticationType: details.authenticationType,
      sessionTimeoutInMinutes: details.sessionTimeoutInMinutes,
      browserTitle: details.browserTitle,
      headerContent: details.headerContent,
      userAcceptancePolicy: details.userAcceptancePolicy,
      successPageMarkdownText: details.successPageMarkdownText,
      redirectURL: details.redirectURL,
      radiusServiceName: details.radiusServiceName,
      radiusAuthMethod: details.radiusAuthMethod,
      externalCaptivePortalURL: details.externalCaptivePortalURL,
      logoFile: details.logoFile,
      backgroundFile: details.backgroundFile,
      splashPage: 'hosted',
    });
  }, [form, details]);

  return (
    <div className={styles.ProfilePage}>
      <Card title="General Settings ">
        <Item
          name="authenticationType"
          label="Authentication"
          rules={[
            {
              required: true,
              message: 'Please select an authentication mode',
            },
          ]}
        >
          <Select
            className={styles.Field}
            onChange={value => setAuthentication(value)}
            placeholder="Select authentication mode "
          >
            <Option value="guest">Guest</Option>
            <Option value="username">Captive Portal User List</Option>
            <Option value="radius">RADIUS</Option>
            <Option value="external">External</Option>
          </Select>
        </Item>

        {authentication === 'username' && (
          <div className={styles.InlineCenterDiv}>
            <Tooltip title="If this is enabled, session timeouts don't affect signed in users. They are signed in as long as their user is valid.">
              <div className={styles.InlineDiv}>
                Go to &quot;Remember user Devices&quot; page
                <InfoCircleOutlined style={{ marginLeft: '6px' }} />
              </div>
            </Tooltip>
            <Button> Manage Captive Portal Users</Button>
          </div>
        )}
        <Item
          name="sessionTimeoutInMinutes"
          label="Session Timeout "
          rules={[
            {
              required: true,
              message: 'Session timeout can be a number between 1 and 1440',
            },
            ({ getFieldValue }) => ({
              validator(_rule, value) {
                if (!value || getFieldValue('sessionTimeoutInMinutes') <= 1440) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('Session timeout can be a number between 1 and 1440')
                );
              },
            }),
          ]}
        >
          <Input
            className={styles.Field}
            placeholder="1-1440"
            type="number"
            min={1}
            max={1440}
            addonBefore={
              <Tooltip title="Timeout range is 1 - 1440 (one day max) ">
                <InfoCircleOutlined />
              </Tooltip>
            }
            addonAfter="Minutes"
          />
        </Item>
        <Item
          name="redirectURL"
          label="Redirect URL"
          rules={[
            {
              required: true,
              type: 'url',
              message: 'Please enter URL in the format http://... or https://...',
            },
          ]}
        >
          <Input className={styles.Field} placeholder="http://... or https://..." />
        </Item>
        <Item label="Splash Page" name="splashPage">
          <Radio.Group>
            <Radio value="hosted" onChange={() => setSplash(false)}>
              Access Point Hosted
            </Radio>
            <Radio value="external" onChange={() => setSplash(true)}>
              Externally Hosted
            </Radio>
          </Radio.Group>
        </Item>
      </Card>
      {authentication === 'radius' && (
        <Card title="RADIUS">
          <Item
            label="Authentication"
            name="radiusAuthMethod"
            rules={[
              {
                required: true,
                message: 'Please select authentication type',
              },
            ]}
          >
            <Select className={styles.Field}>
              <Option value="CHAP">Challenge-Handshake (CHAP)</Option>
              <Option value="PAP">Password (PAP)</Option>
              <Option value="MSCHAPv2">EAP/MSCHAP v2</Option>
            </Select>
          </Item>
          <Item
            name="radiusServiceName"
            label="Service"
            rules={[
              {
                required: true,
                message: 'Please select RADIUS service',
              },
            ]}
          >
            <div className={styles.InlineDiv}>
              <Select className={styles.Field}>
                <Option value="default">default</Option>
              </Select>
            </div>
          </Item>
        </Card>
      )}
      {splash && (
        <Card title="External Splash Page">
          <Item
            name="splashURL"
            label="URL"
            rules={[
              {
                required: splash,
                type: 'url',
                message: 'Please enter URL in the format http://... or https://...',
              },
            ]}
          >
            <div className={styles.InlineDiv}>
              <Input className={styles.Field} placeholder="http://... or https://..." />
              <Button onClick={() => setShowTips(!showTips)} icon={<QuestionCircleFilled />}>
                {!showTips ? 'Show Splash Page Tips' : 'Hide Splash Page Tips'}
              </Button>
            </div>
          </Item>
          {showTips && (
            <Alert
              className={styles.Field}
              description={
                <ol>
                  <li>
                    Add your external Splash Page URL into the field above. Save your configuration
                    once satisfied.
                  </li>
                  <li>
                    In your external Splash Page code retrieve the URL encoded
                    <code>login_url</code> parameter (this is automatically attached to the URL).
                  </li>
                  <li>
                    Use the URL encoded <code>login_url</code> parameter value as the POST action
                    for a form on the external Splash Page. This form must contain the following
                    fields:
                    <ul>
                      <li>
                        <code>username:</code> username to be authenticated.
                      </li>
                      <li>
                        <code>password:</code> password to be authenticated.
                      </li>
                      <li>
                        <code>a2w_external:</code> set to string &quot;true&quot; always.
                      </li>
                    </ul>
                  </li>
                  <li>
                    On failed authentication attempts, <code>a2w_authenticated</code> is returned
                    with a value of string &quot;false&quot; as a query parameter.
                  </li>
                  <li>
                    Make sure all HTML assets use the External Splash Page domain or are from a
                    whitelisted domain which can be configured below.
                  </li>
                </ol>
              }
            />
          )}
        </Card>
      )}
      <Collapse expandIconPosition="right">
        <Panel header="Splash Page Content">
          <Item
            name="browserTitle"
            label="Browser Title"
            rules={[
              {
                required: true,
                message: 'Please enter the browser title',
              },
            ]}
          >
            <Input className={styles.Field} placeholder="Browser title" />
          </Item>
          <Item
            name="headerContent"
            label="Page Title"
            rules={[
              {
                required: true,
                message: 'Please enter the page title',
              },
            ]}
          >
            <Input className={styles.Field} placeholder="Page title" />
          </Item>
          <Item label="Body Content">
            <div className={styles.InlineDiv}>
              <Button
                onClick={() => setContentText('user')}
                type={contentText === 'user' ? 'primary ' : 'ghost'}
              >
                User Acceptance Policy Text
              </Button>
              <Button
                onClick={() => setContentText('login')}
                type={contentText === 'login' ? 'primary ' : 'ghost'}
              >
                Login Success Text
              </Button>
            </div>
            {contentText === 'user' && (
              <Item name="userAcceptancePolicy">
                <TextArea data-testid="bodyContent" className={styles.Field} rows={4} />
              </Item>
            )}
            {contentText !== 'user' && (
              <Item name="successPageMarkdownText">
                <TextArea data-testid="bodyContent" className={styles.Field} rows={4} />
              </Item>
            )}
            &nbsp; Markdown and plain text supported.
          </Item>
        </Panel>
      </Collapse>

      <Collapse expandIconPosition="right">
        <Panel header="Splash Page Images">
          <Item label="Advanced Settings">
            <div className={styles.InlineDiv}>
              <Tooltip title="Max dimensions recommended are: 1000px by 250px with a max file size of 180KB">
                <div className={styles.InlineDiv}>
                  Logo
                  <InfoCircleOutlined style={{ marginLeft: '6px' }} />
                </div>
              </Tooltip>
              <Tooltip title="Max file size of 400KB">
                <div className={styles.InlineDiv}>
                  Background
                  <InfoCircleOutlined style={{ marginLeft: '6px' }} />
                </div>
              </Tooltip>
            </div>

            <div className={styles.InlineDiv}>
              <Item name="logoFile" className={styles.Image}>
                <Upload>Drop an image here, or click to upload. (jpg, jpeg or png)</Upload>
              </Item>
              <Item name="backgroundFile" className={styles.Image}>
                <Upload>Drop an image here, or click to upload. (jpg, jpeg or png)</Upload>
              </Item>
            </div>
          </Item>
        </Panel>
      </Collapse>

      <Collapse expandIconPosition="right">
        <Panel header="Whitelist">
          <Item
            name="configure"
            label="Configure"
            rules={[
              {
                type: 'url',
                message: 'Hostnames must have at least 1 subdomain label. e.g. mycompany.com',
              },
            ]}
          >
            <Input.Search placeholder="Hostname, IP, or IP range..." enterButton="Add" />
          </Item>
        </Panel>
      </Collapse>
    </div>
  );
};

CaptivePortalForm.propTypes = {
  form: PropTypes.instanceOf(Object),
  details: PropTypes.instanceOf(Object),
};

CaptivePortalForm.defaultProps = {
  form: null,
  details: {},
};

export default CaptivePortalForm;
