import React, { useState } from 'react';
import { Card, Form, Input, Radio, Select, Tooltip, Upload, Alert, Collapse } from 'antd';
import {
  InfoCircleOutlined,
  PlusOutlined,
  EditOutlined,
  QuestionCircleFilled,
} from '@ant-design/icons';
import Button from 'components/Button';
import styles from '../index.module.scss';

const CaptivePortalForm = () => {
  const { Item } = Form;
  const { Option } = Select;
  const { Panel } = Collapse;
  const { TextArea } = Input;

  const [authentication, setAuthentication] = useState('');
  const [showTips, setShowTips] = useState(false);

  const [splash, setSplash] = useState(false);
  const [contentText, setContentText] = useState('user');

  return (
    <>
      <Card title="General Settings ">
        <Item
          name="authentication"
          label="Authentication"
          rules={[{ required: true, message: ' Please select an authentication mode' }]}
        >
          <Select
            className={styles.Field}
            onChange={value => setAuthentication(value)}
            placeholder="Select authentication mode "
          >
            <Option value="none">None</Option>
            <Option value="portalUser">Captive Portal User List</Option>
            <Option value="radius">RADIUS</Option>
          </Select>
          {authentication === 'portalUser' && (
            <div className={styles.InlineDiv}>
              <Tooltip title="If this is enabled, session timeouts don't affect signed in users. They are signed in as long as their user is valid.">
                <div className={styles.InlineDiv}>
                  Go to &quot;Remember user Devices&quot; page
                  <InfoCircleOutlined style={{ marginLeft: '6px' }} />
                </div>
              </Tooltip>
              <Button> Manage Captive Portal Users</Button>
            </div>
          )}
        </Item>

        <Item
          name="timeout"
          label="Session Timeout "
          rules={[
            { required: true, message: ' Session Timeout can be a number between 1 and 1440' },
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
          name="url"
          label="Redirect URL"
          rules={[
            { required: true, message: 'Please enter URL in the format http://... or https://...' },
          ]}
        >
          <Input className={styles.Field} placeholder="http://... or https://..." />
        </Item>
        <Item label="Splash Page">
          <Radio.Group defaultValue="hosted">
            <Radio value="hosted" onChange={() => setSplash(false)}>
              Access Point Hosted
            </Radio>
            <Radio value="externallyHosted" onChange={() => setSplash(true)}>
              Externally Hosted
            </Radio>
          </Radio.Group>
        </Item>
      </Card>
      {authentication === 'radius' && (
        <Card title="RADIUS">
          <Item
            label="Authentication"
            rules={[
              {
                required: true,
                message: 'Please select authentication type',
              },
            ]}
          >
            <Select className={styles.Field}>
              <Option value="chap">Challenge-Handshake (CHAP)</Option>
              <Option value="pap">Password (PAP)</Option>
              <Option value="mschap">EAP/MSCHAP v2</Option>
            </Select>
          </Item>
          <Item
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
              <Button icon={<PlusOutlined />} />
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
                required: true,
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
            name="browser"
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
            name="page"
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
          <Item name="page" label="Body Content">
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
                {' '}
                Login Success Text
              </Button>
            </div>
            <TextArea
              className={styles.Field}
              rows={4}
              disabled
              value={
                contentText === 'user'
                  ? 'Please agree to the following terms for using this network:'
                  : 'You are now authorized and connected to the network.'
              }
            />
            <Button icon={<EditOutlined />}> Edit Content</Button>
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
              <Upload className={styles.Image}>
                Drop an image here, or click to upload. (jpg, jpeg or png)
              </Upload>
              <Upload className={styles.Image}>
                Drop an image here, or click to upload. (jpg, jpeg or png)
              </Upload>
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
                required: true,
                message: 'Unrecognized hostname, IPv4 address, or IP range.',
              },
            ]}
          >
            <Input.Search placeholder="Hostname, IP, or IP range..." enterButton="Add" />
          </Item>
        </Panel>
      </Collapse>
    </>
  );
};

export default CaptivePortalForm;
