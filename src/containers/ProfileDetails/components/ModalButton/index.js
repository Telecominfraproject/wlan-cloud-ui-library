import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Tooltip, Select, Input, Card, Modal as AntdModal, Skeleton } from 'antd';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Modal from 'components/Modal';
import Withroles from 'components/WithRoles';

import { pageLayout } from 'utils/form';
import { handleOnProfileUpdate, handleOnCreateProfile, PROFILE_TYPES } from 'utils/profiles';

import styles from './index.module.scss';

const { Item } = Form;

const ModalButton = ({
  profileType,
  onSubmit,
  title,
  content: Content,
  contentProps,
  icon,
  tooltipTitle,
  form,
  name,
  handleOnFormChange,
  onFetchChildProfile,
  childProfile,
  loadingChildProfile,
  profileId,
}) => {
  const [visible, setVisible] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);

  const [modalForm] = Form.useForm();

  const handleOnModalFormChange = () => {
    if (!isFormDirty) {
      setIsFormDirty(true);
    }
  };

  const handleOnSubmit = () => {
    modalForm
      .validateFields()
      .then(async values => {
        const profile =
          title === 'Add Profile'
            ? await handleOnCreateProfile(profileType, values, onSubmit)
            : await handleOnProfileUpdate(profileType, childProfile?.details, values, onSubmit);

        if (profile.name !== childProfile?.name && name) {
          form.setFieldsValue({
            [name]: {
              label: profile.name,
              value: profile.id,
            },
          });
        }
        if (profile.id !== childProfile?.id) {
          handleOnFormChange();
        }

        modalForm.resetFields();
        setVisible(false);
      })
      .catch(() => {});
  };

  useEffect(() => {
    modalForm.setFieldsValue({
      name: title === 'Add Profile' ? '' : childProfile?.name,
    });
  }, [childProfile, title, visible]);

  const onButtonClick = () => {
    setVisible(true);
    setIsFormDirty(false);

    if (title !== 'Add Profile') {
      onFetchChildProfile(profileId);
    }
  };

  const onCancel = () => {
    if (isFormDirty) {
      AntdModal.confirm({
        title: 'Confirm',
        icon: <ExclamationCircleOutlined />,
        content:
          'You have unsaved changes. Please confirm closing without saving this wireless profile:',
        okText: 'Close',
        cancelText: 'Cancel',
        onOk: () => {
          setVisible(false);
          AntdModal.destroyAll();
        },
      });
    } else {
      setVisible(false);
    }
  };

  return (
    <>
      <Modal
        onCancel={onCancel}
        visible={visible}
        title={
          <Skeleton
            active
            size="small"
            loading={loadingChildProfile}
            paragraph={false}
            className={styles.Skeleton}
            title={{ width: 275 }}
          >
            {title}
          </Skeleton>
        }
        width={1150}
        bodyStyle={{ overflowY: 'scroll', height: '550px' }}
        onSuccess={handleOnSubmit}
        loading={loadingChildProfile}
        content={
          <Form
            {...pageLayout}
            onValuesChange={handleOnModalFormChange}
            form={modalForm}
            className={styles.FormContainer}
            scrollToFirstError={{ block: 'center' }}
          >
            <Skeleton loading={loadingChildProfile} active paragraph={{ rows: 20 }}>
              <Card>
                <Item label="Type">
                  <Select defaultValue={profileType} disabled>
                    <Select.Option value={profileType}>{PROFILE_TYPES[profileType]}</Select.Option>
                  </Select>
                </Item>
                <Item
                  name="name"
                  label="Profile Name"
                  rules={[{ required: true, message: 'Please input your profile name' }]}
                  initialValue={childProfile?.name}
                >
                  <Input placeholder="Enter profile name" />
                </Item>
              </Card>
              <Content form={modalForm} {...childProfile} {...contentProps} isModalProfile />
            </Skeleton>
          </Form>
        }
      />
      <Withroles>
        <Tooltip title={tooltipTitle}>
          <Button
            onClick={onButtonClick}
            disabled={title !== 'Add Profile' && !profileId}
            icon={icon}
            title={`${title}-${profileType}`}
          />
        </Tooltip>
      </Withroles>
    </>
  );
};

ModalButton.propTypes = {
  profileType: PropTypes.string,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
  content: PropTypes.func.isRequired,
  contentProps: PropTypes.instanceOf(Object),
  icon: PropTypes.node,
  tooltipTitle: PropTypes.string,
  form: PropTypes.instanceOf(Object),
  name: PropTypes.string,
  handleOnFormChange: PropTypes.func,
  childProfile: PropTypes.instanceOf(Object),
  loadingChildProfile: PropTypes.bool,
  onFetchChildProfile: PropTypes.func,
  profileId: PropTypes.string,
};

ModalButton.defaultProps = {
  profileType: '',
  onSubmit: () => {},
  title: 'Add Profile',
  contentProps: [],
  icon: <PlusOutlined />,
  tooltipTitle: 'Add Profile',
  form: {},
  name: '',
  handleOnFormChange: () => {},
  childProfile: {},
  loadingChildProfile: false,
  onFetchChildProfile: () => {},
  profileId: null,
};

export default ModalButton;
