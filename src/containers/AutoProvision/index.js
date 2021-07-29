import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Select as AntdSelect, Alert } from 'antd';
import { Table, Card } from 'components/Skeleton';
import WithRoles, { Switch, Select, RoleProtectedBtn } from 'components/WithRoles';
import { FormOutlined } from '@ant-design/icons';

import Button from 'components/Button';
import DeleteButton from 'components/DeleteButton';

import FormModal from './components/FormModal';
import styles from './index.module.scss';

const { Item } = Form;
const { Option } = AntdSelect;

const AutoProvision = ({
  data,
  dataLocation,
  dataProfile,
  loadingLocation,
  loadingProfile,
  errorLocation,
  errorProfile,
  onUpdateCustomer,
  onFetchMoreProfiles,
  loading,
}) => {
  const [form] = Form.useForm();
  const [enabled, setEnabled] = useState(data?.details?.autoProvisioning?.enabled || false);
  const [equipmentProfileIdPerModel, setEquipmentProfileIdPerModel] = useState(
    data?.details?.autoProvisioning?.equipmentProfileIdPerModel || {}
  );
  const [activeModel, setActiveModel] = useState({});
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    setEnabled(data?.details?.autoProvisioning?.enabled || false);
    setEquipmentProfileIdPerModel(
      data?.details?.autoProvisioning?.equipmentProfileIdPerModel || {}
    );
  }, [data]);

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 12 },
  };

  const profilesById = useMemo(() => {
    const map = {};
    if (dataProfile.length) {
      dataProfile.forEach(i => {
        map[i.id] = i;
      });
    }

    return map;
  }, [dataProfile]);

  const tableData = useMemo(() => {
    return Object.keys(equipmentProfileIdPerModel).map(item => {
      return {
        model: item,
        profileId: equipmentProfileIdPerModel[item],
      };
    });
  }, [equipmentProfileIdPerModel]);

  const usedModels = useMemo(() => {
    return Object.keys(data?.details?.autoProvisioning?.equipmentProfileIdPerModel || {});
  }, [data]);

  const { id, email, name, createdTimestamp, lastModifiedTimestamp } = data;

  const addModel = ({ model, profileId }) => {
    const formattedData = { ...equipmentProfileIdPerModel };
    formattedData[model] = profileId;

    setEquipmentProfileIdPerModel(formattedData);
    setAddModal(false);
  };

  const editModel = ({ model, profileId }) => {
    const formattedData = { ...equipmentProfileIdPerModel };
    if (activeModel.model !== model) {
      delete formattedData[activeModel.model];
    }
    formattedData[model] = profileId;

    setEquipmentProfileIdPerModel(formattedData);
    setEditModal(false);
  };

  const deleteModel = () => {
    const formattedData = { ...equipmentProfileIdPerModel };
    delete formattedData[activeModel.model];

    setEquipmentProfileIdPerModel(formattedData);
  };

  const onSubmit = () => {
    const formattedData = {
      ...data.details,
      autoProvisioning: { ...data.details.autoProvisioning },
    };

    form
      .validateFields()
      .then(values => {
        formattedData.autoProvisioning.enabled = values.enabled;
        formattedData.autoProvisioning.locationId = values.locationId;
        formattedData.autoProvisioning.equipmentProfileIdPerModel = equipmentProfileIdPerModel;
        onUpdateCustomer(id, email, name, formattedData, createdTimestamp, lastModifiedTimestamp);
      })
      .catch(() => {});
  };

  const columns = [
    {
      title: 'MODEL',
      dataIndex: 'model',
      key: 'model',
      width: 150,
    },
    {
      title: 'PROFILE',
      dataIndex: 'profileId',
      key: 'profileId',
      width: 800,
      render: i => profilesById[i]?.name || i,
    },
    {
      title: '',
      key: 'editModel',
      width: 60,
      render: (_, record) => (
        <RoleProtectedBtn
          title={`edit-model-${record.model}`}
          className={styles.InfoButton}
          type="primary"
          icon={<FormOutlined />}
          onClick={() => {
            setActiveModel({ ...record });
            setEditModal(true);
          }}
        />
      ),
    },

    {
      title: '',
      key: 'deleteModel',
      width: 60,
      render: (_, record) => {
        return record.model !== 'default' ? (
          <WithRoles>
            <DeleteButton
              className={styles.InfoButton}
              title={`delete-model-${record.model}`}
              extraOnClick={() => {
                setActiveModel({ ...record });
              }}
              onSuccess={deleteModel}
              content={
                <p>
                  Are you sure you want to delete the model: <strong>{activeModel.model}</strong>?
                </p>
              }
            />
          </WithRoles>
        ) : null;
      },
    },
  ];

  useEffect(() => {
    form.setFieldsValue({
      enabled,
      locationId: data?.details?.autoProvisioning?.locationId
        ? data?.details?.autoProvisioning?.locationId?.toString()
        : '',
    });
  }, [data, enabled]);

  return (
    <>
      <FormModal
        onCancel={() => setAddModal(false)}
        visible={addModal}
        onSubmit={addModel}
        title="Add Model"
        profiles={dataProfile}
        loadingProfile={loadingProfile}
        errorProfile={errorProfile}
        usedModels={usedModels}
        onFetchMoreProfiles={onFetchMoreProfiles}
      />

      <FormModal
        onCancel={() => setEditModal(false)}
        visible={editModal}
        onSubmit={editModel}
        title="Edit Model"
        profiles={dataProfile}
        {...activeModel}
        loadingProfile={loadingProfile}
        errorProfile={errorProfile}
        usedModels={usedModels}
        onFetchMoreProfiles={onFetchMoreProfiles}
      />
      <Form {...layout} form={form}>
        <div className={styles.Header}>
          <h1>Auto-Provisioning</h1>
          <Item name="enabled" valuePropName="checked" noStyle>
            <Switch
              className={styles.Toggle}
              defaultChecked={enabled}
              onChange={() => setEnabled(!enabled)}
              checkedChildren="Enabled"
              unCheckedChildren="Disabled"
            />
          </Item>
          <WithRoles>
            <div>
              <Button type="primary" onClick={onSubmit}>
                Save
              </Button>
            </div>
          </WithRoles>
        </div>

        {enabled && (
          <div className={styles.Content}>
            <Card title="Target Location" loading={loading || loadingLocation}>
              {errorLocation ? (
                <Alert
                  data-testid="errorLocation"
                  message="Error"
                  description="Failed to load location."
                  type="error"
                  showIcon
                />
              ) : (
                <Item
                  label="Auto-Provisioning Location"
                  name="locationId"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Auto Provision Location',
                    },
                  ]}
                >
                  <Select placeholder="Select Location">
                    {dataLocation.map(i => (
                      <Option key={i.id} value={i.id}>
                        {i.name}
                      </Option>
                    ))}
                  </Select>
                </Item>
              )}
            </Card>

            <Card
              title="Target Equipment Profiles"
              extra={
                <RoleProtectedBtn onClick={() => setAddModal(true)}>Add Model</RoleProtectedBtn>
              }
            >
              <div className={styles.Content}>
                <Table
                  scroll={{ x: 'max-content' }}
                  rowKey="model"
                  columns={columns}
                  dataSource={tableData}
                  pagination={false}
                  loading={loadingProfile || (!errorProfile && !tableData.length)}
                />
              </div>
            </Card>
          </div>
        )}
      </Form>
    </>
  );
};

AutoProvision.propTypes = {
  data: PropTypes.instanceOf(Object),
  dataLocation: PropTypes.instanceOf(Array),
  dataProfile: PropTypes.instanceOf(Array),
  loadingLocation: PropTypes.bool,
  loadingProfile: PropTypes.bool,
  errorLocation: PropTypes.instanceOf(Object),
  errorProfile: PropTypes.instanceOf(Object),
  onUpdateCustomer: PropTypes.func,
  onFetchMoreProfiles: PropTypes.func,
  loading: PropTypes.bool,
};

AutoProvision.defaultProps = {
  data: {},
  dataLocation: [],
  dataProfile: [],
  loadingLocation: true,
  loadingProfile: true,
  errorLocation: null,
  errorProfile: null,
  onUpdateCustomer: () => {},
  onFetchMoreProfiles: () => {},
  loading: false,
};

export default AutoProvision;
