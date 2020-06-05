import React, { useState } from 'react';
import { Card, Form, Input, List, Collapse, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';
import Button from 'components/Button';
import styles from '../index.module.scss';
import RadiusServiceModal from './components/RadiusService';
import RadiusZoneModal from './components/RadiusZone';
import ManagementSubnetModal from './components/ManagementSubnet';

const RadiusForm = () => {
  const { Item } = Form;
  const { Panel } = Collapse;

  const [addService, setAddService] = useState(false);
  const [editService, setEditService] = useState(false);
  const [addZone, setAddZone] = useState(false);
  const [editZone, setEditZone] = useState(false);
  const [addSubset, setAddSubset] = useState(false);

  const data = [
    {
      title: 'test1@connectus.ai',
      region: 'region',
    },
  ];

  return (
    <>
      <RadiusServiceModal
        onCancel={() => setAddService(false)}
        visible={addService}
        title="Add RADIUS Service"
      />
      <ManagementSubnetModal
        onCancel={() => setAddSubset(false)}
        visible={addSubset}
        title="Add Subnet Configuration"
      />
      <RadiusServiceModal
        onCancel={() => setEditService(false)}
        visible={editService}
        title="Edit RADIUS Service"
        disabled
        service="test service"
      />
      <RadiusZoneModal
        onCancel={() => setAddZone(false)}
        visible={addZone}
        title="Add Service Zone Configuration"
      />
      <RadiusZoneModal
        onCancel={() => setEditZone(false)}
        visible={editZone}
        title="Edit Service Zone Configuration"
        region="test region"
      />

      <Card title="Radius Probe Configuration">
        <Item
          name="probe"
          label="RADIUS Probe Interval"
          rules={[{ required: true, message: 'Please input the probe interval' }]}
        >
          <Input
            className={styles.Field}
            placeholder="0 or 60 - 100"
            addonBefore={
              <Tooltip title="Probe range interval is 60 - 100 (0 means disabled)">
                <InfoCircleOutlined />
              </Tooltip>
            }
            addonAfter="Seconds"
          />
        </Item>
      </Card>
      <Collapse>
        <Panel
          header="RADIUS Services"
          extra={
            <Button
              onClick={event => {
                event.stopPropagation();
                setAddService(true);
              }}
            >
              Add Radius Service
            </Button>
          }
        >
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item extra={<Button type="danger">Remove</Button>}>
                <List.Item.Meta
                  avatar={<Button icon={<EditOutlined />} onClick={() => setEditService(true)} />}
                  title={item.title}
                />
              </List.Item>
            )}
          />
        </Panel>
      </Collapse>
      <Collapse>
        <Panel
          header="Service Zone"
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
            dataSource={data}
            renderItem={item => (
              <List.Item
                extra={
                  <>
                    <div className={styles.InlineDiv}>
                      <Card className={styles.infoCard} title=" Radius Services" bordered={false}>
                        <Card.Meta
                          description={
                            <>
                              <Button
                                onClick={() => setEditService(true)}
                                icon={<EditOutlined />}
                              />
                              &nbsp;{item.title}
                            </>
                          }
                        />
                      </Card>
                      <Card className={styles.infoCard} title=" Management Subset" bordered={false}>
                        <Card.Meta
                          description={
                            <>
                              <span className={styles.Disclaimer}>
                                A region must include at least 1 Management Subset
                              </span>
                              <Button onClick={() => setAddSubset(true)} icon={<PlusOutlined />} />
                            </>
                          }
                        />
                      </Card>
                    </div>
                  </>
                }
              >
                <List.Item.Meta
                  avatar={
                    <>
                      <Button onClick={() => setEditZone(true)} icon={<EditOutlined />} />
                      <Button icon={<DeleteOutlined />} type="danger" />
                    </>
                  }
                  title={item.region}
                />
              </List.Item>
            )}
          />
        </Panel>
      </Collapse>
    </>
  );
};

export default RadiusForm;
