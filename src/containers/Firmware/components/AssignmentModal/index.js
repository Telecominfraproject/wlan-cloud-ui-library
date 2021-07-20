import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Select, Spin, Alert } from 'antd';

import Modal from 'components/Modal';
import ContainedSelect from 'components/ContainedSelect';
import { modalLayout } from 'utils/form';
import styles from '../../index.module.scss';

const { Item } = Form;
const { Option } = Select;

const AssignmentModal = ({
  onCancel,
  onSubmit,
  visible,
  title,
  firmwareVersionRecordId,
  modelId,
  filteredModels,
  handleSearchFirmware,
  firmwareVersionData,
  firmwareVersionLoading,
  firmwareModelError,
  firmwareModelLoading,
  firmwareTrackError,
  firmwareTrackLoading,
}) => {
  const [form] = Form.useForm();
  const [model, setModel] = useState();
  useEffect(() => {
    if (visible) {
      form.resetFields();
      form.setFieldsValue({ modelId, firmwareVersionRecordId });
    }
    handleSearchFirmware(modelId);
    setModel(modelId);
  }, [visible]);

  const onModelChange = value => {
    handleSearchFirmware(value);
    setModel(value);
    form.setFieldsValue({ firmwareVersionRecordId: '' });
  };

  const content = (
    <Form {...modalLayout} form={form}>
      {filteredModels.length === 0 && !model && (
        <Alert
          className={styles.alertMessage}
          showIcon
          message="All Model IDs are in use."
          type="warning"
        />
      )}
      <Item
        label="Model ID"
        name="modelId"
        rules={[
          {
            required: true,
            message: 'Please input your Model ID',
          },
        ]}
      >
        <ContainedSelect
          placeholder="Select Model ID"
          onChange={onModelChange}
          disabled={modelId || filteredModels.length === 0}
        >
          {Object.keys(filteredModels).map(i => (
            <Option key={filteredModels[i]} value={filteredModels[i]}>
              {filteredModels[i]}
            </Option>
          ))}
        </ContainedSelect>
      </Item>

      <Item
        label="Firmware Version"
        name="firmwareVersionRecordId"
        rules={[
          {
            required: true,
            message: 'Please select your firmware version',
          },
        ]}
      >
        {firmwareVersionLoading ? (
          <Spin data-testid="firmwareVersionLoading" className={styles.spinner} size="large" />
        ) : (
          <ContainedSelect
            placeholder="Select Firmware Version"
            disabled={title === 'Add Model Target Version' && !model}
          >
            {Object.keys(firmwareVersionData).map(i => (
              <Option key={firmwareVersionData[i].id} value={firmwareVersionData[i].id}>
                {firmwareVersionData[i].versionName}
              </Option>
            ))}
          </ContainedSelect>
        )}
      </Item>
    </Form>
  );

  const handleOnSuccess = () => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        onSubmit(values);
      })
      .catch(() => {});
  };

  const returnContent = () => {
    if (firmwareModelLoading || firmwareTrackLoading)
      return <Spin data-testid="firmwareLoading" className={styles.spinner} size="large" />;
    if (firmwareModelError)
      return (
        <Alert
          data-testid="firmwareModelError"
          message="Error"
          description="Failed to Firmware Model data."
          type="error"
          showIcon
        />
      );
    if (firmwareTrackError)
      return (
        <Alert
          data-testid="firmwareTrackError"
          message="Error"
          description="Failed to Model Target Version data."
          type="error"
          showIcon
        />
      );
    return content;
  };

  return (
    <Modal
      onCancel={onCancel}
      visible={visible}
      onSuccess={handleOnSuccess}
      title={title}
      content={returnContent()}
    />
  );
};

AssignmentModal.propTypes = {
  onCancel: PropTypes.func,
  visible: PropTypes.bool,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
  firmwareVersionRecordId: PropTypes.string,
  modelId: PropTypes.string,
  filteredModels: PropTypes.instanceOf(Array),
  handleSearchFirmware: PropTypes.func,
  firmwareVersionData: PropTypes.instanceOf(Array),
  firmwareVersionLoading: PropTypes.bool,
  firmwareModelError: PropTypes.instanceOf(Object),
  firmwareModelLoading: PropTypes.bool,
  firmwareTrackError: PropTypes.instanceOf(Object),
  firmwareTrackLoading: PropTypes.bool,
};

AssignmentModal.defaultProps = {
  onCancel: () => {},
  visible: false,
  onSubmit: () => {},
  handleSearchFirmware: () => {},
  title: '',
  firmwareVersionRecordId: '',
  modelId: '',
  filteredModels: [],
  firmwareVersionData: [],
  firmwareModelError: null,
  firmwareTrackError: null,
  firmwareModelLoading: false,
  firmwareVersionLoading: true,
  firmwareTrackLoading: true,
};

export default AssignmentModal;
