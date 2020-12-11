import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Input, Button, Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Modal from 'components/Modal';
import OsuForm from './components/OsuForm';
import NaiRealm from './components/NaiRealm';

import styles from '../index.module.scss';

const { Item } = Form;

const ProviderIdForm = ({ form, details }) => {
  const [plmnModal, setPlmnModal] = useState(false);
  const [plmnForm] = Form.useForm();
  const [mccMncList, setMccMncList] = useState(details?.mccMncList || []);

  const [naiRealm, setNaiRealm] = useState(details?.naiRealmList?.[0]);
  const [naiForm] = Form.useForm();

  const [osuDetails, setOsuDetails] = useState({
    osuServerUri: details?.osuServerUri || '',
    osuFriendlyName: details?.osuFriendlyName || [],
    osuServiceDescription: details?.osuServiceDescription || [],
    osuIconList: details?.osuIconList || [],
  });
  const [osuForm] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      domainName: details?.domainName || '',
      roamingOi: details?.roamingOi?.join(', ') || '',
      mccMncList: mccMncList || [],
      encoding: naiRealm?.encoding || 0,
      eapMap: naiRealm?.eapMap || {},
      osuServerUri: osuDetails?.osuServerUri || '',
      osuFriendlyName: osuDetails?.osuFriendlyName || [],
      osuServiceDescription: osuDetails?.osuServiceDescription || [],
      osuIconList: osuDetails?.osuIconList || [],
    });
  }, [form, details, mccMncList, naiRealm, osuDetails]);

  useEffect(() => {
    setOsuDetails({
      ...osuDetails,
      osuServerUri: details?.osuServerUri || '',
      osuFriendlyName: details?.osuFriendlyName || [],
      osuServiceDescription: details?.osuServiceDescription || [],
      osuIconList: details?.osuIconList || [],
    });
  }, [
    details?.osuServerUri,
    details?.osuFriendlyName,
    details?.osuServiceDescription,
    details?.osuIconList,
  ]);

  useEffect(() => {
    setNaiRealm(details?.naiRealmList?.[0]);
  }, [details?.naiRealmList?.[0]]);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 15 },
  };

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
      render: item => (
        <Button
          title="removePlmn"
          icon={<DeleteOutlined />}
          className={styles.iconButton}
          onClick={() => {
            setMccMncList([...mccMncList.filter(i => i !== item)]);
          }}
        />
      ),
    },
  ];

  const handleAddPlmnItem = () => {
    plmnForm
      .validateFields()
      .then(values => {
        setMccMncList([...mccMncList, values]);
        setPlmnModal(false);
        plmnForm.resetFields();
      })
      .catch(() => {});
  };

  const handleClosePlmnModal = () => {
    setPlmnModal(false);
    plmnForm.resetFields();
  };

  const handleAddOsuItem = (obj, dataIndex) => {
    if (dataIndex in osuDetails) {
      setOsuDetails({
        ...osuDetails,
        [dataIndex]: [...osuDetails[dataIndex], obj],
      });
    } else {
      setOsuDetails({
        ...osuDetails,
        [dataIndex]: [obj],
      });
    }
  };

  const handleRemoveOsuItem = (obj, dataIndex) => {
    setOsuDetails({
      ...osuDetails,
      [dataIndex]: osuDetails[dataIndex].filter(i => i !== obj),
    });
  };

  const handleAddEapMethod = obj => {
    setNaiRealm({
      ...naiRealm,
      eapMap: obj,
    });
  };

  const handleRemoveEapMethod = obj => {
    const field = obj.method;
    const cloneEap = { ...naiRealm?.eapMap };
    cloneEap[field] = [];

    setNaiRealm({
      ...naiRealm,
      eapMap: cloneEap,
    });
  };

  return (
    <div className={styles.ProfilePage}>
      <Card title="Network Identifier">
        <Item
          label="Roaming OI:"
          name="roamingOi"
          rules={[
            ({ getFieldValue }) => ({
              validator(_rule, value) {
                if (
                  !value ||
                  getFieldValue('roamingOi').match(/^([a-z0-9\s]+,)*([a-z0-9\s]+){1}$/i)
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Please enter a comma separated list of strings'));
              },
            }),
          ]}
        >
          <Input placeholder="Enter Roaming Oi" />
        </Item>
      </Card>

      <Card
        title="Public Land Mobile Networks (PLMN)"
        extra={
          <Button type="solid" onClick={() => setPlmnModal(true)} data-testid="addPlmn">
            Add
          </Button>
        }
      >
        <Table dataSource={mccMncList} columns={columnsPlmn} pagination={false} rowKey="mcc" />
        <Item name="mccMncList" noStyle>
          <Modal
            visible={plmnModal}
            onSuccess={handleAddPlmnItem}
            onCancel={handleClosePlmnModal}
            title="Add Public Land Mobile Network (PLMN)"
            content={
              <Form {...layout} form={plmnForm}>
                <Item
                  name="mcc"
                  label="Mcc:"
                  rules={[
                    {
                      required: true,
                      message: 'Mcc field cannot be empty',
                    },
                  ]}
                >
                  <Input placeholder="Enter a value for mcc" type="number" />
                </Item>
                <Item
                  name="mnc"
                  label="Mnc:"
                  rules={[
                    {
                      required: true,
                      message: 'Mnc field cannot be empty',
                    },
                  ]}
                >
                  <Input placeholder="Enter a value for mnc" type="number" />
                </Item>
              </Form>
            }
          />
        </Item>
      </Card>

      <NaiRealm
        eapMap={naiRealm?.eapMap}
        form={naiForm}
        addEap={handleAddEapMethod}
        removeEap={handleRemoveEapMethod}
      />

      <OsuForm
        osuDetails={osuDetails}
        osuForm={osuForm}
        layout={layout}
        onSubmit={handleAddOsuItem}
        removeItem={handleRemoveOsuItem}
      />
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
