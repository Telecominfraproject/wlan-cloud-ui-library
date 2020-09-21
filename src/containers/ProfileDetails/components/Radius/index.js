import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Input, List, Collapse, Table } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

import Button from 'components/Button';
import Tooltip from 'components/Tooltip';
import globalStyles from 'styles/index.scss';
import styles from '../index.module.scss';
import RadiusServiceModal from './components/RadiusService';
import RadiusZoneModal from './components/RadiusZone';
import ManagementSubnetModal from './components/ManagementSubnet';

const MAX_RADIUS = 2;

const { Item } = Form;
const { Panel } = Collapse;

const formatServices = details => {
  const result = [];

  if (details && details.serviceRegionMap) {
    const keys = Object.keys(details.serviceRegionMap);

    if (keys.length > 0) {
      Object.keys(details.serviceRegionMap[keys[0]].serverMap).forEach(j => {
        result.push({
          name: j,
          ips: details.serviceRegionMap[keys[0]].serverMap[j],
        });
      });
    }
  }
  return result;
};

const formatZones = details => {
  const result = [];
  if (details && details.serviceRegionMap) {
    Object.keys(details.serviceRegionMap).forEach(i => {
      const zone = {
        name: i,
        subnets: [],
      };

      if (details.subnetConfiguration) {
        Object.keys(details.subnetConfiguration).forEach(j => {
          if (details.subnetConfiguration[j].serviceRegionName === i) {
            zone.subnets.push(details.subnetConfiguration[j]);
          }
        });
      }

      result.push(zone);
    });
  }
  return result;
};

const RadiusForm = ({ form, details }) => {
  const [addService, setAddService] = useState(false);
  const [editService, setEditService] = useState(false);
  const [addZone, setAddZone] = useState(false);
  const [editZone, setEditZone] = useState(false);
  const [addSubnet, setAddSubnet] = useState(false);
  const [editSubnet, setEditSubnet] = useState(false);

  const [services, setServices] = useState(formatServices(details));
  const [zones, setZones] = useState(formatZones(details));

  const [selectedService, setSelectedService] = useState();
  const [selectedZone, setSelectedZone] = useState();
  const [selectedSubnet, setSelectedSubnet] = useState();

  const handleAddServiceSuccess = item => {
    setServices([...services, item]);
    setAddService(false);
  };

  const handleEditService = item => {
    setSelectedService(item);
    setEditService(true);
  };

  const handleEditServiceSuccess = item => {
    setServices(
      services.map(i => {
        if (i.name === item.name) {
          return item;
        }
        return i;
      })
    );
    setEditService(false);
  };

  const handleDeleteService = item => {
    setServices(services.filter(i => i.name !== item.name));
  };

  const handleAddZoneSuccess = item => {
    setZones([...zones, item]);
    setAddZone(false);
  };

  const handleEditZone = item => {
    setSelectedZone(item);
    setEditZone(true);
  };

  const handleEditZoneSuccess = item => {
    setZones(
      zones.map(i => {
        if (i.name === item.name) {
          return item;
        }
        return i;
      })
    );
    setEditZone(false);
  };

  const handleDeleteZone = item => {
    setZones(zones.filter(i => i.name !== item.name));
  };

  const handleAddSubnet = item => {
    setSelectedSubnet(item);
    setAddSubnet(true);
  };

  const handleAddSubnetSuccess = item => {
    setZones(
      zones.map(i => {
        if (i.name === item.serviceRegionName) {
          return {
            subnets: i?.subnets ? [...i.subnets, item] : [item],
          };
        }  
        return i;
      })
    );
    setAddSubnet(false);
  };

  const handleEditSubnet = item => {
    setSelectedSubnet(item);
    setEditSubnet(true);
  };

  const handleEditSubnetSuccess = item => {
    setZones(
      zones.map(i => {
        if (i.name === item.serviceRegionName) {
          return {
            ...i,
            subnets: i.subnets.map(j => {
              if (j.subnetName === selectedSubnet.subnetName) {
                return item;
              }
              return j;
            }),
          };
        }
        return i;
      })
    );
    setEditSubnet(false);
  };

  const handleDeleteSubnet = item => {
    setZones(
      zones.map(i => {
        if (i.name === item.serviceRegionName) {
          return {
            ...i,
            subnets: i.subnets.filter(j => j.subnetName !== item.subnetName),
          };
        }
        return i;
      })
    );
  };

  useEffect(() => {
    setServices(formatServices(details));
    setZones(formatZones(details));
    form.setFieldsValue({
      services,
      zones,
      probeInterval:
        (zones.length > 0 && zones[0].subnets.length > 0 && zones[0].subnets[0].probeInterval) || 0,
    });
  }, [details]);

  useEffect(() => {
    form.setFieldsValue({
      zones,
    });
  }, [zones]);

  useEffect(() => {
    form.setFieldsValue({
      services,
    });
  }, [services]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Server List',
      dataIndex: 'ips',
      render: ips => ips.map(i => <div key={i.ipAddress}>{i.ipAddress}</div>),
    },
  ];

  const managementColumn = [
    {
      title: 'Name',
      dataIndex: 'subnetName',
    },
    {
      title: 'Subnet',
      dataIndex: 'subnetAddress',
    },
    {
      title: '',
      width: 80,
      render: (_, record) => (
        <Button
          title="editSubnet"
          icon={<EditOutlined />}
          onClick={() => handleEditSubnet(record)}
        />
      ),
    },
    {
      title: '',
      width: 80,
      render: (_, record) => (
        <Button
          title="deleteSubnet"
          type="danger"
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteSubnet(record)}
        />
      ),
    },
  ];

  return (
    <div className={styles.ProfilePage}>
      <RadiusServiceModal
        onCancel={() => setAddService(false)}
        visible={addService}
        title="Add RADIUS Service"
        onSuccess={handleAddServiceSuccess}
      />
      <RadiusServiceModal
        onCancel={() => setEditService(false)}
        visible={editService}
        title="Edit RADIUS Service"
        disabled
        service={selectedService}
        onSuccess={handleEditServiceSuccess}
      />
      <RadiusZoneModal
        onCancel={() => setAddZone(false)}
        visible={addZone}
        title="Add Service Zone Configuration"
        onSuccess={handleAddZoneSuccess}
      />
      <RadiusZoneModal
        onCancel={() => setEditZone(false)}
        visible={editZone}
        title="Edit Service Zone Configuration"
        zone={selectedZone}
        onSuccess={handleEditZoneSuccess}
      />
      <ManagementSubnetModal
        title="Add Subnet Configuration"
        visible={addSubnet}
        subnet={selectedSubnet}
        onSuccess={handleAddSubnetSuccess}
        onCancel={() => setAddSubnet(false)}
      />
      <ManagementSubnetModal
        title="Edit Subnet Configuration"
        visible={editSubnet}
        subnet={selectedSubnet}
        onSuccess={handleEditSubnetSuccess}
        onCancel={() => setEditSubnet(false)}
      />

      <Card title="Radius Probe Configuration">
        <Item
          name="probeInterval"
          label="RADIUS Probe Interval"
          rules={[
            {
              required: true,
              message: 'Please input Radius Probe Interval',
            },
            ({ getFieldValue }) => ({
              validator(_rule, value) {
                if (
                  !value ||
                  (getFieldValue('probeInterval') >= 60 && getFieldValue('probeInterval') <= 100) ||
                  // eslint-disable-next-line eqeqeq
                  getFieldValue('probeInterval') == 0
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('Radius Probe Interval expected between 60 and 100 or 0')
                );
              },
            }),
          ]}
        >
          <Input
            className={globalStyles.field}
            placeholder="0 or 60 - 100"
            type="number"
            min={0}
            max={100}
            addonAfter={
              <Tooltip title="Probe range interval is 60 - 100 (0 means disabled)" text="Seconds" />
            }
          />
        </Item>
      </Card>
      <Collapse defaultActiveKey={['services']}>
        <Panel
          key="services"
          header="RADIUS Services"
          extra={
            <Button
              onClick={event => {
                event.stopPropagation();
                setAddService(true);
              }}
              disabled={services.length >= MAX_RADIUS}
            >
              Add Radius Service
            </Button>
          }
        >
          <List
            itemLayout="horizontal"
            dataSource={services}
            renderItem={item => (
              <List.Item
                aria-label={`serviceItem-${item.name}`}
                extra={
                  <Button type="danger" onClick={() => handleDeleteService(item)}>
                    Remove
                  </Button>
                }
              >
                <List.Item.Meta
                  avatar={
                    <Button
                      title="editService"
                      icon={<EditOutlined />}
                      onClick={() => handleEditService(item)}
                    />
                  }
                  title={item.name}
                />
              </List.Item>
            )}
          />
        </Panel>
      </Collapse>
      <Collapse defaultActiveKey={['zones']}>
        <Panel
          key="zones"
          header="Service Zone"
          className={styles.ServiceZones}
          extra={
            <Button
              onClick={event => {
                event.stopPropagation();
                setAddZone(true);
              }}
            >
              Add Service Zone
            </Button>
          }
        >
          <List
            itemLayout="horizontal"
            dataSource={zones}
            rowKey="name"
            renderItem={item => (
              <List.Item
                aria-label={`serviceZoneItem-${item.name}`}
                extra={
                  <>
                    <div className={styles.RadiusInline}>
                      <Card className={styles.infoCard} title=" Radius Services" bordered={false}>
                        <Table
                          dataSource={services}
                          columns={columns}
                          pagination={false}
                          size="small"
                          rowKey="name"
                        />
                      </Card>

                      <Card className={styles.infoCard} title=" Management Subset" bordered={false}>
                        <Table
                          dataSource={item.subnets}
                          columns={managementColumn}
                          pagination={false}
                          size="small"
                          rowKey="subnetName"
                        />
                        <>
                          <Button
                            onClick={() => handleAddSubnet({ serviceRegionName: item.name })}
                            icon={<PlusOutlined />}
                          >
                            Add Subnet
                          </Button>
                        </>
                      </Card>
                    </div>
                  </>
                }
              >
                <List.Item.Meta
                  title={
                    <>
                      <b className={styles.iconButton}>{item.name}</b>
                      <Button
                        title="editRadiusServiceZone"
                        onClick={() => handleEditZone(item)}
                        className={styles.iconButton}
                        icon={<EditOutlined />}
                      />
                      <Button
                        title="deleteRadiusServiceZone"
                        onClick={() => handleDeleteZone(item)}
                        className={styles.iconButton}
                        icon={<DeleteOutlined />}
                        type="danger"
                      />
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Panel>
      </Collapse>
      <Item name="services" style={{ display: 'none' }}>
        <Input />
      </Item>
      <Item name="zones" style={{ display: 'none' }}>
        <Input />
      </Item>
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
