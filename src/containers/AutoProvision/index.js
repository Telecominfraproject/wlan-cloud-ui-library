import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, TreeSelect, Alert, Skeleton, Card } from 'antd';
import { Table } from 'components/Skeleton';
import WithRoles, { Switch, RoleProtectedBtn } from 'components/WithRoles';
import { FormOutlined } from '@ant-design/icons';

import Button from 'components/Button';
import DeleteButton from 'components/DeleteButton';

import { pageLayout } from 'utils/form';

import FormModal from './components/FormModal';
import styles from './index.module.scss';

const { Item } = Form;

const AutoProvision = ({
  data,
  locationsTree,
  dataProfile,
  loadingLocation,
  loadingProfile,
  errorLocation,
  errorProfile,
  onUpdateCustomer,
  onFetchMoreProfiles,
  loading,
  isLightIcon,
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
      key: 'model-1',
      width: 150,
    },
    {
      title: 'PROFILE',
      dataIndex: 'profileId',
      key: 'profileId',
      render: i => profilesById[i]?.name || i,
    },
    {
      key: 'editModel',
      width: 60,
      render: (_, record) => (
        <RoleProtectedBtn
          title={`edit-model-${record.model}`}
          className={`${styles.InfoButton} ${isLightIcon ? styles.light : styles.dark}`}
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
      key: 'deleteModel',
      width: 60,
      render: (_, record) => {
        return record.model !== 'default' ? (
          <WithRoles>
            <DeleteButton
              className={`${styles.InfoButton} ${isLightIcon ? styles.light : styles.dark}`}
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
      <Form {...pageLayout} form={form}>
        <div className={styles.Header}>
          <h1>Auto-Provisioning</h1>
          <Item name="enabled" valuePropName="checked" noStyle>
            <Switch
              className={styles.Toggle}
              defaultChecked={enabled}
              onChange={() => setEnabled(!enabled)}
              checkedChildren="Enabled"
              unCheckedChildren="Disabled"
              loading={loading}
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

        <Skeleton loading={loading}>
          {enabled && (
            <div className={styles.Content}>
              <Card title="Target Location">
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
                        message: 'Please select your Auto Provision Location',
                      },
                    ]}
                  >
                    <TreeSelect
                      treeData={locationsTree}
                      placeholder="Select location..."
                      loading={loadingLocation}
                      showSearch
                      treeDefaultExpandAll
                      filterTreeNode={(input, treeNode) =>
                        treeNode.title.toLowerCase().includes(input.toLowerCase())
                      }
                    />
                  </Item>
                )}
              </Card>

              <Card
                title="Target Equipment Profiles"
                extra={
                  <RoleProtectedBtn onClick={() => setAddModal(true)}>Add Model</RoleProtectedBtn>
                }
              >
                <Table
                  scroll={{ x: 'max-content' }}
                  rowKey="model"
                  columns={columns}
                  dataSource={tableData}
                  pagination={false}
                  loading={loadingProfile}
                />
              </Card>
            </div>
          )}
        </Skeleton>
      </Form>
    </>
  );
};

AutoProvision.propTypes = {
  data: PropTypes.instanceOf(Object),
  locationsTree: PropTypes.instanceOf(Array),
  dataProfile: PropTypes.instanceOf(Array),
  loadingLocation: PropTypes.bool,
  loadingProfile: PropTypes.bool,
  errorLocation: PropTypes.instanceOf(Object),
  errorProfile: PropTypes.instanceOf(Object),
  onUpdateCustomer: PropTypes.func,
  onFetchMoreProfiles: PropTypes.func,
  loading: PropTypes.bool,
  isLightIcon: PropTypes.bool,
};

AutoProvision.defaultProps = {
  data: {},
  locationsTree: [],
  dataProfile: [],
  loadingLocation: true,
  loadingProfile: true,
  errorLocation: null,
  errorProfile: null,
  onUpdateCustomer: () => {},
  onFetchMoreProfiles: () => {},
  loading: false,
  isLightIcon: true,
};

export default AutoProvision;
