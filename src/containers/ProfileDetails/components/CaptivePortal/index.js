import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Form,
  Input,
  Radio,
  Select,
  Upload,
  Alert,
  Collapse,
  message,
  List,
  Empty,
  Modal,
} from 'antd';
import { QuestionCircleFilled } from '@ant-design/icons';
import { PROFILES } from 'containers/ProfileDetails/constants';
import Button from 'components/Button';
import Tooltip from 'components/Tooltip';
import globalStyles from 'styles/index.scss';
import Users from './components/Users';
import styles from '../index.module.scss';

const { Item } = Form;
const { Option } = Select;
const { Panel } = Collapse;
const { TextArea } = Input;

const validateIPv4 = inputString => {
  // allow spaces in place of dots
  const inputStr = inputString.replace(' ', '.');
  // from http://www.regextester.com/22
  if (
    inputStr.match(
      /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gm
    )
  ) {
    // blacklist certain IPs
    const disallowed = ['0.0.0.0', '255.255.255.255', '127.0.0.1', '256.1.1.1'];
    return disallowed.indexOf(inputStr) < 0;
  }
  return false;
};

const CaptivePortalForm = ({
  details,
  childProfiles,
  form,
  fileUpload,
  onDownloadFile,
  radiusProfiles,
  onSearchProfile,
  onFetchMoreProfiles,
  loadingRadiusProfiles,
  handleOnFormChange,
}) => {
  const formatFile = async file => {
    const src = await onDownloadFile(file.apExportUrl);
    return [
      {
        uid: file.apExportUrl,
        name: file.apExportUrl,
        type: file.fileType,
        thumbUrl: src,
      },
    ];
  };

  const [showTips, setShowTips] = useState(false);

  const [authentication, setAuthentication] = useState(details.authenticationType);

  const [externalSplash, setExternalSplash] = useState(!!details.externalCaptivePortalURL);
  const [isLoginText, setContentText] = useState(false);

  const [logoFileList, setLogoFileList] = useState([]);
  const [bgFileList, setBgFileList] = useState([]);
  const [whitelist, setWhitelist] = useState(details.walledGardenAllowlist || []);
  const [whitelistSearch, setWhitelistSearch] = useState();
  const [whitelistValidation, setWhitelistValidation] = useState({});

  const [userList, setUserList] = useState(details.userList || []);

  const [previewModal, setPreviewModal] = useState(false);

  const [previewImage, setPreviewImage] = useState({});

  const disableExternalSplashChange = () => {
    form.setFieldsValue({
      authenticationType: 'guest',
    });
    setExternalSplash(false);
  };

  useEffect(() => {
    if (details.backgroundFile) {
      formatFile(details.backgroundFile).then(obj => setBgFileList(obj));
    }
    if (details.logoFile) {
      formatFile(details.logoFile).then(obj => setLogoFileList(obj));
    }
  }, [details]);

  const validateFile = (file, showMessages = false) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
    if (!isJpgOrPng) {
      if (showMessages) message.error('You can only upload a JPG/PNG file!');
      return false;
    }

    const isValidSize = file.size / 1024 < 400;

    if (!isValidSize) {
      if (showMessages) message.error('Image must be smaller than 400KB!');
      return false;
    }

    return true;
  };

  const handleOnChange = (file, fileList) => {
    if (validateFile(file)) {
      let list = [...fileList];

      list = list.slice(-1);
      list = list.map(i => ({ ...i, url: i.response && i.response.url }));

      return list;
    }
    return false;
  };

  const handleOnChangeLogo = ({ file, fileList }) => {
    if (fileList.length === 0) {
      setLogoFileList([]);
    }
    const list = handleOnChange(file, fileList);
    if (list) setLogoFileList(list);
  };

  const handleOnChangeBg = ({ file, fileList }) => {
    if (fileList.length === 0) {
      setBgFileList([]);
    }
    const list = handleOnChange(file, fileList);
    if (list) setBgFileList(list);
  };

  const toBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  const handleFileUpload = file => {
    toBase64(file).then(res => {
      if (validateFile(file, true)) {
        fileUpload(file.name, res);
      }
    });

    return false;
  };

  const onPreview = file => {
    setPreviewImage({ ...file });
    setPreviewModal(true);
  };

  const validateWhitelist = (_rule, value) => {
    let inputString = value.toLowerCase().trim();

    if (inputString.match(/[a-z]/i)) {
      // contains letters, so validate as hostname

      // remove all spaces
      inputString = inputString.replace(' ', '');

      const hostnameParts = inputString.split('.').reverse();

      // hostname must contain at least two parts (e.g. google.com)
      if (hostnameParts.length < 2) {
        return Promise.reject(
          new Error('Hostnames must have at least 1 subdomain label. e.g. mycompany.com')
        );
      }

      // hostname labels must be between 1 and 63 characters
      let isValidLabelLengths = true;
      hostnameParts.some(part => {
        if (part.length < 1 || part.length > 63) {
          isValidLabelLengths = false;
          return true;
        }
        return false;
      });
      if (!isValidLabelLengths) {
        return Promise.reject(
          new Error('Hostname labels must be between 1 and 63 characters long.')
        );
      }

      // second-level domain cannot be a wildcard
      if (hostnameParts[1].indexOf('*') >= 0) {
        return Promise.reject(
          new Error('Second-level domain labels may not contain a * wildcard.')
        );
      }

      // the * wildcard cannot be combined with any other characters
      if (inputString.indexOf('*')) {
        let isValid = true;
        hostnameParts.some(part => {
          if (part.indexOf('*') >= 0 && part !== '*') {
            isValid = false;
            return true;
          }
          return false;
        });
        if (!isValid) {
          return Promise.reject(
            new Error(
              'The * wildcard may not be combined with other characters in a hostname label.'
            )
          );
        }
      }

      // validate the hostname format & characters
      if (
        !inputString.match(
          /^((\*\.)|([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*(\*|[A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$/gm
        )
      ) {
        return Promise.reject(new Error('Unrecognized hostname, IPv4 address, or IP range.'));
      }

      // overall hostname length must be <= 253 characters
      if (inputString.length > 253) {
        return Promise.reject(new Error('Hostnames may not exceed 253 characters in length.'));
      }
    } else {
      const ipAddrs = inputString.split('-');
      if (ipAddrs.length === 2) {
        // validate as IP Range
        ipAddrs[0] = ipAddrs[0].trim();
        ipAddrs[1] = ipAddrs[1].trim();

        if (!validateIPv4(ipAddrs[0]) || !validateIPv4(ipAddrs[1])) {
          return Promise.reject(new Error('Unrecognized hostname, IPv4 address, or IP range.'));
        }
      } else if (!validateIPv4(inputString)) {
        return Promise.reject(new Error('Unrecognized hostname, IPv4 address, or IP range.'));
      }
    }

    // limit whitelist to 32 items
    if (whitelist.length >= 32) {
      return Promise.reject(new Error('Unable to add more than 32 items to the whitelist.'));
    }

    // limit whitelist to 2000 characters
    if (whitelist.join(' ').length > 2000) {
      return Promise.reject(
        new Error('Unable to exceed 2,000 characters for all combined whitelist items.')
      );
    }

    // prevent duplicate items
    if (whitelist.indexOf(inputString) >= 0) {
      return Promise.reject(new Error('This item already exists in the whitelist.'));
    }

    return Promise.resolve();
  };

  const handleOnWhitelist = value => {
    validateWhitelist(null, value).then(() => {
      setWhitelist([...whitelist, value.toLowerCase().trim()]);
      setWhitelistSearch('');
      setWhitelistValidation({
        status: null,
        help: null,
      });
    });
  };

  const handleOnChangeWhitelist = event => {
    setWhitelistSearch(event.target.value);
    validateWhitelist(null, event.target.value)
      .then(() => {
        setWhitelistValidation({
          status: null,
          help: null,
        });
        handleOnFormChange();
      })
      .catch(e => {
        setWhitelistValidation({
          status: 'error',
          help: e.message,
        });
      });
  };

  const handleDeleteWhitelist = item => {
    setWhitelist(whitelist.filter(i => i !== item));
    handleOnFormChange();
  };

  const handleAddUser = newUser => {
    setUserList([...userList, newUser]);
    handleOnFormChange();
  };
  const handleUpdateUser = (activeUser, newUser) => {
    setUserList(userList.map(user => (user.username === activeUser ? newUser : user)));
    handleOnFormChange();
  };

  const handleDeleteUser = activeUser => {
    setUserList(userList.filter(user => user.username !== activeUser));
    handleOnFormChange();
  };

  useEffect(() => {
    form.setFieldsValue({
      authenticationType: details.authenticationType,
      sessionTimeoutInMinutes: details.sessionTimeoutInMinutes,
      browserTitle: details.browserTitle,
      headerContent: details.headerContent,
      userAcceptancePolicy: details.userAcceptancePolicy,
      successPageMarkdownText: details.successPageMarkdownText,
      redirectURL: details.redirectURL,
      externalCaptivePortalURL: details.externalCaptivePortalURL,
      externalSplashPage: details.externalCaptivePortalURL ? 'true' : 'false',
      walledGardenAllowlist: details.walledGardenAllowlist || [],
      logoFile: details.logoFile && formatFile(details.logoFile),
      backgroundFile: details.backgroundFile && formatFile(details.backgroundFile),
      backgroundRepeat: details.backgroundRepeat || 'no_repeat',
      backgroundPosition: details.backgroundPosition || 'left_top',
      radiusAuthMethod: details.radiusAuthMethod,
      radiusServiceId: {
        value: childProfiles?.[0]?.id || null,
        label: childProfiles?.[0]?.name || null,
      },
      childProfileIds: [],
      userList: details.userList,
    });
  }, [form, details]);

  useEffect(() => {
    form.setFieldsValue({
      walledGardenAllowlist: whitelist,
    });
  }, [whitelist]);

  useEffect(() => {
    form.setFieldsValue({
      userList,
    });
  }, [userList]);

  return (
    <div className={styles.ProfilePage}>
      <Modal
        visible={previewModal}
        title={previewImage.name}
        footer={null}
        onCancel={() => setPreviewModal(false)}
      >
        <img alt="Loading..." src={previewImage.thumbUrl} />
      </Modal>

      <Card title="General Settings ">
        <Item
          label="Authentication"
          name="authenticationType"
          rules={[
            {
              required: true,
              message: 'Please select an authentication mode',
            },
          ]}
        >
          <Select
            className={globalStyles.field}
            placeholder="Select authentication mode"
            onChange={setAuthentication}
          >
            <Option value="guest">None</Option>
            <Option value="radius">RADIUS</Option>
            <Option value="username">Captive Portal User List</Option>
            {externalSplash && <Option value="external">Externally Hosted API</Option>}
          </Select>
        </Item>

        <Item
          name="sessionTimeoutInMinutes"
          label="Session Timeout "
          rules={[
            {
              required: true,
              message: 'Session timeout can be a number between 1 and 1440',
            },
            () => ({
              validator(_rule, value) {
                if (!value || (value >= 1 && value <= 1440)) {
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
            placeholder="1-1440"
            type="number"
            min={1}
            max={1440}
            addonAfter={<Tooltip title="Timeout range is 1-1440 (one day max)" text="Minutes" />}
          />
        </Item>
        <Item
          name="redirectURL"
          label="Redirect URL"
          rules={[
            {
              type: 'url',
              message: 'Please enter URL in the format http://... or https://...',
            },
          ]}
        >
          <Input className={globalStyles.field} placeholder="http://... or https://..." />
        </Item>
        <Item label="Splash Page" name="externalSplashPage">
          <Radio.Group>
            <Radio value="false" onChange={disableExternalSplashChange}>
              Access Point Hosted
            </Radio>
            <Radio value="true" onChange={() => setExternalSplash(true)}>
              Externally Hosted
            </Radio>
          </Radio.Group>
        </Item>
      </Card>

      {authentication === 'username' && (
        <>
          <Users
            userList={userList}
            handleAddUser={handleAddUser}
            handleUpdateUser={handleUpdateUser}
            handleDeleteUser={handleDeleteUser}
          />
          <Item name="userList" hidden>
            <Input />
          </Item>
        </>
      )}
      {authentication === 'radius' && (
        <Card title="RADIUS">
          <Item
            name="radiusAuthMethod"
            label="Authentication"
            rules={[
              {
                required: true,
                message: 'Please select a RADIUS authentication mode',
              },
            ]}
          >
            <Select className={globalStyles.field} placeholder="Select RADIUS authentication mode">
              <Option value="CHAP">Challenge-Handshake (CHAP)</Option>
              <Option value="PAP">Password (PAP)</Option>
              <Option value="MSCHAPv2">EAP/MSCHAP v2</Option>
            </Select>
          </Item>
          <Item
            name="radiusServiceId"
            label="Service"
            rules={[
              {
                required: true,
                message: 'Please select a RADIUS profile',
              },
            ]}
          >
            <Select
              className={globalStyles.field}
              placeholder="RADIUS Profiles"
              onPopupScroll={e => onFetchMoreProfiles(e, PROFILES.radius)}
              showSearch={onSearchProfile}
              filterOption={false}
              onSearch={name => onSearchProfile(name, PROFILES.radius)}
              loading={loadingRadiusProfiles}
              notFoundContent={!loadingRadiusProfiles && <Empty />}
              labelInValue
            >
              {radiusProfiles.map(profile => (
                <Option key={profile.id} value={profile.id}>
                  {profile.name}
                </Option>
              ))}
            </Select>
          </Item>
        </Card>
      )}
      {externalSplash && (
        <Card title="External Splash Page">
          <Item label="URL">
            <div className={styles.InlineDiv}>
              <Item
                noStyle
                name="externalCaptivePortalURL"
                rules={[
                  {
                    required: externalSplash,
                    type: 'url',
                    message: 'Please enter URL in the format http://... or https://...',
                  },
                ]}
              >
                <Input className={globalStyles.field} placeholder="http://... or https://..." />
              </Item>
              <Button onClick={() => setShowTips(!showTips)} icon={<QuestionCircleFilled />}>
                {!showTips ? 'Show Splash Page Tips' : 'Hide Splash Page Tips'}
              </Button>
            </div>
          </Item>
          {showTips && (
            <Alert
              className={globalStyles.field}
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
      <Collapse expandIconPosition="right" defaultActiveKey={['splashcontent']}>
        <Panel header="Splash Page Content" key="splashcontent" forceRender>
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
            <Input className={globalStyles.field} placeholder="Browser title" />
          </Item>
          <Item
            name="headerContent"
            label="Page Title"
            rules={[
              {
                message: 'Please enter the page title',
              },
            ]}
          >
            <Input className={globalStyles.field} placeholder="Page title" />
          </Item>
          <Item label="Body Content">
            <div className={styles.InlineDiv}>
              <Button
                onClick={() => setContentText(false)}
                type={!isLoginText ? 'primary ' : 'ghost'}
              >
                User Acceptance Policy Text
              </Button>
              <Button
                onClick={() => setContentText(true)}
                type={isLoginText ? 'primary ' : 'ghost'}
              >
                Login Success Text
              </Button>
            </div>
            {!isLoginText && (
              <Item name="userAcceptancePolicy">
                <TextArea data-testid="bodyContent" className={globalStyles.field} rows={4} />
              </Item>
            )}
            {isLoginText && (
              <Item name="successPageMarkdownText">
                <TextArea data-testid="bodyContent" className={globalStyles.field} rows={4} />
              </Item>
            )}
            &nbsp; Markdown and plain text supported.
          </Item>
        </Panel>
      </Collapse>
      <Collapse expandIconPosition="right">
        <Panel header="Splash Page Images" forceRender>
          <Item label="Configure">
            <div className={styles.InlineDiv}>
              <Tooltip
                title="Max dimensions recommended are: 1000px by 250px with a max file size of 180KB"
                text="Logo"
              />
              <Tooltip title="Max file size of 400KB" text="Background" />
            </div>
          </Item>

          <Item wrapperCol={{ offset: 5, span: 15 }}>
            <div className={styles.InlineDiv}>
              <Item name="logoFile" className={styles.Upload}>
                <Upload
                  data-testid="logoFile"
                  accept="image/*"
                  fileList={logoFileList}
                  beforeUpload={handleFileUpload}
                  listType="picture-card"
                  onChange={handleOnChangeLogo}
                  onPreview={onPreview}
                >
                  Drop an image here, or click to upload (JPG or PNG)
                </Upload>
              </Item>
              <Item name="backgroundFile" className={styles.Upload}>
                <Upload
                  data-testid="backgroundFile"
                  accept="image/*"
                  fileList={bgFileList}
                  beforeUpload={handleFileUpload}
                  listType="picture-card"
                  onChange={handleOnChangeBg}
                  s
                  onPreview={onPreview}
                >
                  Drop an image here, or click to upload (JPG or PNG)
                </Upload>
              </Item>
            </div>
          </Item>
          {bgFileList.length > 0 && (
            <Item label="Background Styles">
              <div className={styles.InlineDiv}>
                <Item name="backgroundRepeat">
                  <Select className={globalStyles.field} placeholder="Select Background Repeat">
                    <Option value="no_repeat">No Repeat</Option>
                    <Option value="repeat">Repeat</Option>
                    <Option value="cover">Cover</Option>
                  </Select>
                </Item>
                <Item name="backgroundPosition">
                  <Select className={globalStyles.field} placeholder="Select Background Position">
                    <Option value="left_top">Top Left</Option>
                    <Option value="center_top">Top Center</Option>
                    <Option value="right_top">Top Right</Option>
                    <Option value="left_center">Center Left</Option>
                    <Option value="center_center">Center Center</Option>
                    <Option value="right_center">Center Right</Option>
                    <Option value="left_bottom">Bottom Left</Option>
                    <Option value="center_bottom">Bottom Center</Option>
                    <Option value="right_bottom">Bottom Right</Option>
                  </Select>
                </Item>
              </div>
            </Item>
          )}
        </Panel>
      </Collapse>
      <Collapse expandIconPosition="right">
        <Panel header="Allow List" forceRender>
          <Item
            label="Configure"
            rules={[{ validator: validateWhitelist }]}
            validateStatus={whitelistValidation.status}
            help={whitelistValidation.help}
          >
            <Input.Search
              placeholder="Hostname, IP, or IP range..."
              enterButton="Add"
              value={whitelistSearch}
              onSearch={handleOnWhitelist}
              onChange={handleOnChangeWhitelist}
            />
          </Item>

          {whitelist.length > 0 && (
            <List
              className={styles.Whitelist}
              itemLayout="horizontal"
              dataSource={whitelist}
              renderItem={item => (
                <List.Item
                  extra={
                    <Button type="danger" onClick={() => handleDeleteWhitelist(item)}>
                      Remove
                    </Button>
                  }
                >
                  <List.Item.Meta title={item} />
                </List.Item>
              )}
            />
          )}

          <Item name="walledGardenAllowlist" hidden>
            <Input />
          </Item>

          <Item name="childProfileIds" hidden>
            <Input />
          </Item>
        </Panel>
      </Collapse>
    </div>
  );
};

CaptivePortalForm.propTypes = {
  form: PropTypes.instanceOf(Object),
  details: PropTypes.instanceOf(Object),
  childProfiles: PropTypes.instanceOf(Array),
  radiusProfiles: PropTypes.instanceOf(Array),
  fileUpload: PropTypes.func,
  onDownloadFile: PropTypes.func,
  onSearchProfile: PropTypes.func,
  onFetchMoreProfiles: PropTypes.func,
  loadingRadiusProfiles: PropTypes.bool,
  handleOnFormChange: PropTypes.func,
};

CaptivePortalForm.defaultProps = {
  form: null,
  details: {},
  childProfiles: [],
  radiusProfiles: [],
  fileUpload: () => {},
  onDownloadFile: () => {},
  onSearchProfile: null,
  onFetchMoreProfiles: () => {},
  loadingRadiusProfiles: false,
  handleOnFormChange: () => {},
};

export default CaptivePortalForm;
