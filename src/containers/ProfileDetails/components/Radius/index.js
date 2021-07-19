import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Button from 'components/Button';
import Tooltip from 'components/Tooltip';
import { Input, Password, RoleProtectedBtn } from 'components/WithRoles';

import { IP_REGEX } from 'containers/ProfileDetails/constants';
import styles from '../index.module.scss';

const MAX_RADIUS = 1;

const { Item, List } = Form;

const RadiusForm = ({ form, details }) => {
  const formatInitialAuthenticationValues = () => {
    const values = [details?.primaryRadiusAuthServer];
    if (details?.secondaryRadiusAuthServer) {
      values.push(details?.secondaryRadiusAuthServer);
    }
    return values;
  };

  const formatInitialAccountingnValues = () => {
    const values = [];
    if (details?.primaryRadiusAccountingServer) {
      values.push(details?.primaryRadiusAccountingServer);
    }
    if (details?.secondaryRadiusAccountingServer) {
      values.push(details?.secondaryRadiusAccountingServer);
    }
    return values;
  };

  useEffect(() => {
    form.setFieldsValue({
      authenticationServer: formatInitialAuthenticationValues(),
      accountingServer: formatInitialAccountingnValues(),
    });
  }, [details]);

  return (
    <div className={styles.ProfilePage}>
      <List name="authenticationServer">
        {(fields, { add, remove }) => {
          return (
            <Card
              title="RADIUS Authentication Server"
              extra={
                <>
                  {fields.length >= MAX_RADIUS && (
                    <Tooltip
                      className={styles.ToolTip}
                      title={`Maximum ${MAX_RADIUS} Authentication Server`}
                    />
                  )}
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    disabled={fields.length >= MAX_RADIUS}
                  >
                    <PlusOutlined /> Add Authentication Server
                  </Button>
                </>
              }
            >
              {fields.map((field, index) => (
                <div key={field.name}>
                  <span>{index === 0 ? 'Primary' : 'Secondary'} Authentication Server</span>
                  <Item
                    name={[field.name, 'ipAddress']}
                    label="IP"
                    rules={[
                      {
                        required: true,
                        pattern: IP_REGEX,
                        message: 'Enter in the format [0-255].[0-255].[0-255].[0-255]',
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter IP address"
                      data-testid={`authenticationIpAddress${field.name}`}
                    />
                  </Item>

                  <Item
                    name={[field.name, 'secret']}
                    label="Shared Secret"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter a shared secret',
                      },
                    ]}
                  >
                    <Password
                      placeholder="Enter Shared Secret"
                      data-testid={`authenticationSecret${field.name}`}
                    />
                  </Item>

                  <Item
                    name={[field.name, 'port']}
                    label="Port"
                    initialValue={1812}
                    rules={[
                      {
                        required: true,
                        message: 'Port can be a number between 1 and 65535',
                      },
                      () => ({
                        validator(_rule, value) {
                          if (!value || (value > 0 && value < 65535)) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error('Port can be a number between 1 and 65535')
                          );
                        },
                      }),
                    ]}
                  >
                    <Input
                      placeholder="Enter Port"
                      type="number"
                      min={1}
                      max={65535}
                      data-testid={`authenticationPort${field.name}`}
                    />
                  </Item>

                  <Item
                    name={[field.name, 'timeout']}
                    label="Session Timeout"
                    initialValue={1812}
                    rules={[
                      {
                        required: true,
                        message: 'Session timeout can be a number between 1 and 1440',
                      },
                      () => ({
                        validator(_rule, value) {
                          if (!value || (value > 0 && value < 1440)) {
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
                      placeholder="Enter Session Timeout"
                      type="number"
                      min={1}
                      max={1440}
                      data-testid={`authenticationTimeout${field.name}`}
                      addonAfter={
                        <Tooltip title="Timeout range is 1-1440 (one day max)" text="Minutes" />
                      }
                    />
                  </Item>

                  {index !== 0 && (
                    <Button
                      className={styles.RadiusDelete}
                      type="danger"
                      disabled={fields.length === 1}
                      onClick={() => {
                        remove(field.name);
                      }}
                      data-testid={`authenticationDelete${field.name}`}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
            </Card>
          );
        }}
      </List>
      <List name="accountingServer">
        {(fields, { add, remove }) => {
          return (
            <Card
              title="RADIUS Accounting Server"
              bodyStyle={{ padding: fields.length <= 0 && '0' }}
              extra={
                <>
                  {fields.length >= MAX_RADIUS && (
                    <Tooltip
                      className={styles.ToolTip}
                      title={`Maximum ${MAX_RADIUS} Accounting Server`}
                    />
                  )}
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    disabled={fields.length >= MAX_RADIUS}
                  >
                    <PlusOutlined /> Add Accounting Server
                  </Button>
                </>
              }
            >
              {fields.map((field, index) => (
                <div key={field.name}>
                  <span>{index === 0 ? 'Primary' : 'Secondary'} Accounting Server</span>
                  <Item
                    name={[field.name, 'ipAddress']}
                    label="IP"
                    rules={[
                      {
                        required: true,
                        pattern: IP_REGEX,
                        message: 'Enter in the format [0-255].[0-255].[0-255].[0-255]',
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter IP address"
                      data-testid={`accountingIpAddress${field.name}`}
                    />
                  </Item>

                  <Item
                    name={[field.name, 'secret']}
                    label="Shared Secret"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter a shared secret.',
                      },
                    ]}
                  >
                    <Password
                      placeholder="Enter Shared Secret"
                      data-testid={`accountingSecret${field.name}`}
                    />
                  </Item>

                  <Item
                    name={[field.name, 'port']}
                    label="Port"
                    initialValue={1813}
                    rules={[
                      {
                        required: true,
                        message: 'Port can be a number between 1 and 65535',
                      },
                      () => ({
                        validator(_rule, value) {
                          if (!value || (value > 0 && value < 65535)) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error('Port can be a number between 1 and 65535')
                          );
                        },
                      }),
                    ]}
                  >
                    <Input
                      placeholder="Enter Port"
                      type="number"
                      min={1}
                      max={65535}
                      data-testid={`accountingPort${field.name}`}
                    />
                  </Item>

                  <Item
                    name={[field.name, 'timeout']}
                    label="Session Timeout"
                    initialValue={1812}
                    rules={[
                      {
                        required: true,
                        message: 'Session timeout can be a number between 1 and 1440',
                      },
                      () => ({
                        validator(_rule, value) {
                          if (!value || (value > 0 && value < 1440)) {
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
                      placeholder="Enter Session Timeout"
                      type="number"
                      min={1}
                      max={1440}
                      data-testid={`accountingTimeout${field.name}`}
                      addonAfter={
                        <Tooltip title="Timeout range is 1-1440 (one day max)" text="Minutes" />
                      }
                    />
                  </Item>

                  <RoleProtectedBtn
                    className={styles.RadiusDelete}
                    type="danger"
                    onClick={() => {
                      remove(field.name);
                    }}
                    data-testid={`accountingDelete${field.name}`}
                  >
                    Remove
                  </RoleProtectedBtn>
                </div>
              ))}
            </Card>
          );
        }}
      </List>
    </div>
  );
};

RadiusForm.propTypes = {
  form: PropTypes.instanceOf(Object),
  details: PropTypes.instanceOf(Object),
};

RadiusForm.defaultProps = {
  form: null,
  details: {},
};

export default RadiusForm;
