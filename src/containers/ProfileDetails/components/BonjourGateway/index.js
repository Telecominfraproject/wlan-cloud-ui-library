import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Card, Input, Col, Tooltip, Select, Radio } from 'antd';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Button from 'components/Button';
import globalStyles from 'styles/index.scss';
import styles from '../index.module.scss';

const { Item, List } = Form;
const { TextArea } = Input;
const { Option } = Select;

const BonjourGateway = ({ form, details }) => {
  const [vlanIndex, setVlanIndex] = useState(
    details?.bonjourServices?.findIndex(i => i.vlanId === null)
  );

  const bonjourServices = useMemo(() => {
    const arr = [];
    if (details?.bonjourServices?.length) {
      details.bonjourServices.forEach(i => {
        arr.push({
          vlanId: i.vlanId,
          vlanIdConfiguration: i.vlanId ? 'custom' : 'default',
          supportAllServices: i.supportAllServices.toString(),
          serviceNames: i.serviceNames?.filter(service => service != null),
        });
      });
    }
    return arr;
  }, [details]);

  useEffect(() => {
    form.setFieldsValue({
      profileDescription: details.profileDescription,
      bonjourServices: bonjourServices.length ? [...bonjourServices] : [''],
    });
  }, [form]);

  const onRadioChange = index => {
    if (form.getFieldValue(['bonjourServices', index, 'vlanIdConfiguration']) === 'default') {
      setVlanIndex(index);
    } else {
      setVlanIndex(-1);
    }
  };

  const onRadioDelete = index => {
    if (form.getFieldValue(['bonjourServices', index, 'vlanIdConfiguration']) === 'default') {
      setVlanIndex(-1);
    }
  };

  return (
    <div className={styles.ProfileDetails}>
      <Card title="Bonjour Gateway">
        <Item name="profileDescription" label="Description">
          <TextArea className={globalStyles.field} rows={2} allowClear />
        </Item>
      </Card>
      <List name="bonjourServices">
        {(fields, { add, remove }) => {
          return (
            <Card
              title="VLANs and Services"
              extra={
                <>
                  {fields.length === 5 && (
                    <Tooltip className={styles.ToolTip} title="Maximum 5 VLAN services">
                      <InfoCircleOutlined />
                    </Tooltip>
                  )}
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    disabled={fields.length === 5}
                  >
                    <PlusOutlined /> Add Service Set
                  </Button>
                </>
              }
            >
              {fields.map(field => (
                <div className={styles.FlexDiv} key={field.name}>
                  {fields[0] === field && (
                    <>
                      <Col flex="1 1 330px">
                        <strong>Unique VLANs</strong>
                      </Col>
                      <Col flex="1 1 700px">
                        <strong>Services</strong>
                      </Col>
                    </>
                  )}

                  <Col flex="1 1 350px">
                    {fields[vlanIndex] === field || vlanIndex === -1 || vlanIndex === undefined ? (
                      <Item
                        noStyle
                        name={[field.name, 'vlanIdConfiguration']}
                        initialValue="custom"
                      >
                        <Radio.Group size="small" onChange={() => onRadioChange(field.name)}>
                          <Radio value="custom" data-testid={`vlanCustomConfig${field.name}`}>
                            Use Custom VLAN
                          </Radio>
                          <Radio value="default" data-testid={`vlanDefaultConfig${field.name}`}>
                            Use Default VLAN
                          </Radio>
                        </Radio.Group>
                      </Item>
                    ) : (
                      <div>Use Custom VLAN</div>
                    )}

                    <Item noStyle shouldUpdate>
                      {({ getFieldValue }) => {
                        return getFieldValue([
                          'bonjourServices',
                          field.name,
                          'vlanIdConfiguration',
                        ]) !== 'default' ? (
                          <Item
                            name={[field.name, 'vlanId']}
                            preserve={false}
                            rules={[
                              {
                                required: true,
                                message: 'Unique VLAN expected between 2 - 4095.',
                              },
                              () => ({
                                validator(_rule, value) {
                                  const currentId = parseInt(
                                    getFieldValue(['bonjourServices', field.name, 'vlanId']),
                                    10
                                  );

                                  const ids = fields.map(i =>
                                    parseInt(
                                      getFieldValue(['bonjourServices', i.name, 'vlanId']),
                                      10
                                    )
                                  );

                                  const index = ids.findIndex(id => id === currentId);

                                  ids.splice(index, 1);

                                  if (
                                    !value ||
                                    (currentId <= 4095 &&
                                      currentId > 1 &&
                                      ids.indexOf(currentId) === -1)
                                  ) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(
                                    new Error('Unique VLAN expected between 2 - 4095.')
                                  );
                                },
                              }),
                            ]}
                            hasFeedback
                            wrapperCol={{ span: 35 }}
                          >
                            <Input
                              placeholder="2-4095"
                              className={globalStyles.field}
                              data-testid={`vlanInput${field.name}`}
                            />
                          </Item>
                        ) : (
                          <Item wrapperCol={{ span: 35 }}>
                            <Input className={globalStyles.field} disabled placeholder="Default" />
                          </Item>
                        );
                      }}
                    </Item>
                  </Col>
                  <Col flex="1 1 600px">
                    <Item noStyle name={[field.name, 'supportAllServices']} initialValue="false">
                      <Radio.Group size="small">
                        <Radio value="false">Selected Services</Radio>
                        <Radio value="true">All Services</Radio>
                      </Radio.Group>
                    </Item>
                    <Item noStyle shouldUpdate>
                      {({ getFieldValue }) => {
                        return getFieldValue([
                          'bonjourServices',
                          field.name,
                          'supportAllServices',
                        ]) === 'false' ? (
                          <Item
                            name={[field.name, 'serviceNames']}
                            rules={[
                              {
                                required: true,
                                message: 'Please select your predefined services.',
                              },
                            ]}
                            wrapperCol={{ span: 35 }}
                            preserve={false}
                          >
                            <Select
                              className={globalStyles.field}
                              placeholder="Select predefined services (check to select all)"
                              mode="multiple"
                              allowClear
                              showArrow
                              listHeight={350}
                              data-testid={`serviceSelect${field.name}`}
                            >
                              <Option key="AFP" value="AFP">
                                <Tooltip title="Apple File Sharing">
                                  <InfoCircleOutlined />
                                </Tooltip>
                                &nbsp;AFP
                              </Option>
                              <Option key="AirPlay" value="AirPlay">
                                <Tooltip title="AirPlay">
                                  <InfoCircleOutlined />
                                </Tooltip>
                                &nbsp;AirPlay
                              </Option>
                              <Option key="AirPort" value="AirPort">
                                <Tooltip title="AirPort Base Station">
                                  <InfoCircleOutlined />
                                </Tooltip>
                                &nbsp;AirPort
                              </Option>
                              <Option key="AirPrint" value="AirPrint">
                                <Tooltip title="Bonjour Printing">
                                  <InfoCircleOutlined />
                                </Tooltip>
                                &nbsp;AirPrint
                              </Option>
                              <Option key="AirTunes" value="AirTunes">
                                <Tooltip title="Remote Audio Output Protocol (RAOP)">
                                  <InfoCircleOutlined />
                                </Tooltip>
                                &nbsp;AirTunes
                              </Option>
                              <Option key="GoogleCast" value="GoogleCast">
                                <Tooltip title="Google Cast">
                                  <InfoCircleOutlined />
                                </Tooltip>
                                &nbsp;GoogleCast
                              </Option>
                              <Option key="RDP" value="RDP">
                                <Tooltip title="Windows Remote Desktop">
                                  <InfoCircleOutlined />
                                </Tooltip>
                                &nbsp;RDP
                              </Option>
                              <Option key="SFTP" value="SFTP">
                                <Tooltip title="Secure File Transfer Protocol over SSH">
                                  <InfoCircleOutlined />
                                </Tooltip>
                                &nbsp;SFTP
                              </Option>
                              <Option key="SSH" value="SSH">
                                <Tooltip title="SSH Remote Login">
                                  <InfoCircleOutlined />
                                </Tooltip>
                                &nbsp;SSH
                              </Option>
                              <Option key="SAMBA" value="SAMBA">
                                <Tooltip title="Server Message Block over TCP/IP">
                                  <InfoCircleOutlined />
                                </Tooltip>
                                &nbsp;Samba
                              </Option>
                            </Select>
                          </Item>
                        ) : (
                          <Item wrapperCol={{ span: 35 }}>
                            <Select
                              className={globalStyles.field}
                              disabled
                              placeholder="All Services"
                            />
                          </Item>
                        );
                      }}
                    </Item>
                  </Col>

                  <Col flex="118px">
                    <Item>
                      <Button
                        className={styles.DeleteButton}
                        type="danger"
                        disabled={fields.length === 1}
                        data-testid={`removeButton${field.name}`}
                        onClick={() => {
                          onRadioDelete(field.name);
                          remove(field.name);
                        }}
                      >
                        Remove
                      </Button>
                    </Item>
                  </Col>
                </div>
              ))}
            </Card>
          );
        }}
      </List>
    </div>
  );
};

BonjourGateway.propTypes = {
  form: PropTypes.instanceOf(Object),
  details: PropTypes.instanceOf(Object),
};

BonjourGateway.defaultProps = {
  form: null,
  details: {},
};

export default BonjourGateway;
