import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Input, Form, Button, Collapse, Switch, Table, Select } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import styles from '../index.module.scss';

const { Item } = Form;
const { Option } = Select;
const { Panel } = Collapse;

const ProviderIdForm = ({ form, details }) => {
  const columnsPlmn = [
    {
      title: 'MCC',
      dataIndex: 'mcc',
    },
    {
      title: 'MNC',
      dataIndex: 'mnc',
    },
    {
      title: 'Country',
      dataIndex: 'country',
    },
    {
      title: 'Network',
      dataIndex: 'network',
    },
    {
      title: '',
      width: 80,
      render: () => (
        <Button
          title="removePlmn"
          icon={<DeleteOutlined />}
          className={styles.iconButton}
          // onClick={() => handleRemove(row id)}
        />
      ),
    },
  ];

  const columnsRealm = [
    {
      title: 'Method',
      dataIndex: 'mcc',
    },
    {
      title: 'Authentication',
      dataIndex: 'mnc',
    },
    {
      title: '',
      width: 80,
      render: () => (
        <Button
          title="removeRealm"
          icon={<DeleteOutlined />}
          className={styles.iconButton}
          // onClick={() => handleRemove(row id)}
        />
      ),
    },
  ];

  const [activeKey, setActiveKey] = useState('2');

  useEffect(() => {
    form.resetFields(['domainName', 'osuServerUri'], []);
    form.setFieldsValue({
      domainName: details.domainName || '',
    });

    if (activeKey === '1') {
      form.setFieldsValue({
        osuServerUri: details.osuServerUri || '',
      });
    }
  }, [form, details, activeKey]);

  // Obj is the data being sent, option is the column keys
  const renderTable = (arr, columns) => {
    return <Table dataSource={arr} columns={columns} pagination={false} />;
  };

  return (
    <div className={styles.ProfilePage}>
      <Card title="Network Identifier">
        <Item label="Domain Name:" name="domainName" placeholder="Enter a domain name">
          <Input />
        </Item>
        <Item label="Roaming OI:" placeholder="Enter roaming oi">
          <Input />
        </Item>
      </Card>

      <Card
        title="Public Land Mobile Networks (PLMN)"
        extra={
          <Button
            type="solid"
            // onClick={() => ()}
          >
            Add
          </Button>
        }
      >
        <Table
          dataSource={details?.mccMncList}
          columns={columnsPlmn}
          pagination={false}
          rowKey={details?.mccMncList}
        />
      </Card>

      <Card title="Network Access Identifier (NAI) Realm">
        <Item label="Encoding:" name="serverOnlyAuthenticatedL2EncryptionNetwork">
          <Select>
            <Option value="true">Enabled</Option>
            <Option value="false">Disabled</Option>
          </Select>
        </Item>
        <Table
          dataSource={details?.mccMncList}
          columns={columnsRealm}
          pagination={false}
          rowKey={details?.naiRealmList}
        />
      </Card>

      {/* <Card
        title="Online Sign Up (OSU)"
        extra={<Switch onChange={() => setToggleOsu(() => !toggleOsu)} />}
      >

        {toggleOsu && <Collapse.Panel>Hi</Collapse.Panel>}
      </Card> */}
      <Collapse accordion activeKey={[activeKey]}>
        <Panel
          header={
            <>
              <p>
                Online Sign Up (OSU){' '}
                <Switch
                  onChange={() => {
                    setActiveKey(prev => {
                      if (prev === '1') {
                        return '2';
                      }
                      return '1';
                    });
                  }}
                />
              </p>
            </>
          }
          showArrow={false}
          key="1"
        >
          <Item label="Server URI:" name="osuServerUri" placeholder="Enter a server uri">
            <Input />
          </Item>

          <Card
            title="Name:"
            bordered={false}
            extra={
              <Button
                type="solid"
                // onClick={() => console.log('')}
              >
                Add
              </Button>
            }
          >
            {renderTable(details?.osuFriendlyName, [
              {
                title: 'Name',
                dataIndex: 'dupleName',
                width: 415,
              },
              {
                title: 'Locale',
                dataIndex: 'locale',
              },
              {
                title: '',
                width: 80,
                render: () => (
                  <Button
                    title="removeSsid"
                    icon={<DeleteOutlined />}
                    className={styles.iconButton}
                    // onClick={() => handleRemove(row id)}
                  />
                ),
              },
            ])}
          </Card>

          <Card
            title="Description:"
            bordered={false}
            extra={
              <Button
                type="solid"
                // onClick={() => console.log('')}
              >
                Add
              </Button>
            }
          >
            {renderTable(details?.osuServiceDescription, [
              {
                title: 'Name',
                dataIndex: 'dupleName',
                width: 415,
              },
              {
                title: 'Locale',
                dataIndex: 'locale',
              },
              {
                title: '',
                width: 80,
                render: () => (
                  <Button
                    title="removeDesc"
                    icon={<DeleteOutlined />}
                    className={styles.iconButton}
                    // onClick={() => handleRemove(row id)}
                  />
                ),
              },
            ])}
          </Card>

          <Card
            title="Icons:"
            bordered={false}
            extra={
              <Button
                type="solid"
                // onClick={() => console.log('h')}
              >
                Add
              </Button>
            }
          >
            {renderTable(details?.osuIconList, [
              {
                title: 'URL',
                dataIndex: 'imageUrl',
                width: 415,
              },
              {
                title: 'Locale',
                dataIndex: 'iconLocale',
              },
              {
                title: '',
                width: 80,
                render: () => (
                  <Button
                    title="removeIcon"
                    icon={<DeleteOutlined />}
                    className={styles.iconButton}
                    // onClick={() => handleRemove(row id)}
                  />
                ),
              },
            ])}
          </Card>
        </Panel>
      </Collapse>
    </div>
  );
};

ProviderIdForm.propTypes = {
  details: PropTypes.instanceOf(Object),
  form: PropTypes.instanceOf(Object),
};

ProviderIdForm.defaultProps = {
  form: null,
  details: {},
};

export default ProviderIdForm;
