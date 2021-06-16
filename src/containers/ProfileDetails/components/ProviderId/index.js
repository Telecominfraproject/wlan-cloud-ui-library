import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Table } from 'antd';
import { DeleteOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import Modal from 'components/Modal';
import { Input, RoleProtectedBtn } from 'components/WithRoles';
import { modalLayout } from 'utils/form';

import OsuForm from './components/OsuForm';
import NaiRealm from './components/NaiRealm';

import styles from '../index.module.scss';

const { Item } = Form;

const ProviderIdForm = ({ form, details, handleOnFormChange }) => {
  const [modalForm] = Form.useForm();
  const [plmnModal, setPlmnModal] = useState(false);
  const [mccMncList, setMccMncList] = useState(details?.mccMncList || []);

  const [naiRealmList, setNaiRealmList] = useState(details?.naiRealmList?.[0]);

  const [osuDetails, setOsuDetails] = useState({
    osuServerUri: details?.osuServerUri || '',
    osuFriendlyName: details?.osuFriendlyName || [],
    osuServiceDescription: details?.osuServiceDescription || [],
    osuIconList: details?.osuIconList || [],
  });

  useEffect(() => {
    form.setFieldsValue({
      roamingOi: details?.roamingOi,
      osuServerUri: details?.osuServerUri || '',
      naiRealms: details?.naiRealmList?.[0].naiRealms?.join(', ') || '',
    });
  }, [details]);

  useEffect(() => {
    form.setFieldsValue({
      mccMncList: mccMncList || [],
    });
  }, [mccMncList]);

  useEffect(() => {
    form.setFieldsValue({
      encoding: naiRealmList?.encoding || 0,
      eapMap: naiRealmList?.eapMap || {},
    });
  }, [naiRealmList]);

  useEffect(() => {
    form.setFieldsValue({
      osuFriendlyName: osuDetails?.osuFriendlyName || [],
      osuServiceDescription: osuDetails?.osuServiceDescription || [],
      osuIconList: osuDetails?.osuIconList || [],
    });
  }, [osuDetails]);

  useEffect(() => {
    setNaiRealmList(details?.naiRealmList?.[0]);
  }, [details?.naiRealmList?.[0]]);

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
        <RoleProtectedBtn
          title="removePlmn"
          icon={<DeleteOutlined />}
          className={styles.iconButton}
          onClick={() => {
            setMccMncList([...mccMncList.filter(i => i !== item)]);
            handleOnFormChange();
          }}
        />
      ),
    },
  ];

  const handleAddPlmnItem = () => {
    modalForm
      .validateFields()
      .then(values => {
        setMccMncList([...mccMncList, values]);
        setPlmnModal(false);
        modalForm.resetFields();
      })
      .catch(() => {});
    handleOnFormChange();
  };

  const handleClosePlmnModal = () => {
    setPlmnModal(false);
    modalForm.resetFields();
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
    handleOnFormChange();
  };

  const handleRemoveOsuItem = (obj, dataIndex) => {
    setOsuDetails(prevValues => ({
      ...prevValues,
      [dataIndex]: prevValues[dataIndex].filter(i => i !== obj),
    }));
  };

  const handleAddEapMethod = obj => {
    setNaiRealmList({
      ...naiRealmList,
      eapMap: obj,
    });
    handleOnFormChange();
  };

  const handleRemoveEapMethod = obj => {
    const field = obj.method;
    const cloneEap = { ...naiRealmList?.eapMap };
    cloneEap[field] = [];

    setNaiRealmList({
      ...naiRealmList,
      eapMap: cloneEap,
    });
    handleOnFormChange();
  };

  return (
    <div className={styles.ProfilePage}>
      <Card title="Network Identifier">
        <Item label="Roaming OI">
          <Form.List name="roamingOi">
            {(fields, { add: addRoamingOI, remove: removeRoamingOI }) => {
              return (
                <>
                  {fields.map(field => (
                    <div key={field.name}>
                      <Item
                        name={field.name}
                        rules={[
                          {
                            required: true,
                            message: 'OI is required',
                          },
                          {
                            pattern: /^(([A-F]|[a-f]|[0-9]){2}){3,15}$/,
                            message:
                              'Each OI must be between 3 and 15 octets and configured as a hexstring',
                          },
                          () => ({
                            validator(_rule, value) {
                              const OIs = fields.map(item =>
                                form.getFieldValue(['roamingOi', item.name])
                              );

                              const occurence = OIs.filter(item => item === value).length;

                              if (!value || occurence <= 1) {
                                return Promise.resolve();
                              }
                              return Promise.reject(new Error('Enter a unique OI'));
                            },
                          }),
                        ]}
                      >
                        <Input
                          placeholder={`Enter OI ${field.name + 1}`}
                          addonAfter={
                            <MinusCircleOutlined
                              data-testid={`removeRoamingOI${field.name}`}
                              onClick={() => removeRoamingOI(field.name)}
                            />
                          }
                        />
                      </Item>
                    </div>
                  ))}
                  <RoleProtectedBtn type="dashed" onClick={() => addRoamingOI()}>
                    <PlusOutlined /> Add Roaming OI
                  </RoleProtectedBtn>
                </>
              );
            }}
          </Form.List>
        </Item>
      </Card>

      <Card
        title="Public Land Mobile Networks (PLMN)"
        extra={
          <RoleProtectedBtn type="solid" onClick={() => setPlmnModal(true)} data-testid="addPlmn">
            Add
          </RoleProtectedBtn>
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
              <Form {...modalLayout} form={modalForm}>
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
        eapMap={naiRealmList?.eapMap}
        form={modalForm}
        addEap={handleAddEapMethod}
        removeEap={handleRemoveEapMethod}
      />

      <OsuForm
        osuDetails={osuDetails}
        osuForm={modalForm}
        layout={modalLayout}
        onSubmit={handleAddOsuItem}
        removeItem={handleRemoveOsuItem}
        handleOnFormChange={handleOnFormChange}
      />
    </div>
  );
};

ProviderIdForm.propTypes = {
  details: PropTypes.instanceOf(Object),
  form: PropTypes.instanceOf(Object),
  handleOnFormChange: PropTypes.func,
};

ProviderIdForm.defaultProps = {
  form: null,
  details: {},
  handleOnFormChange: () => {},
};

export default ProviderIdForm;
