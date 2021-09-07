import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal as AntdModal, Form } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { modalLayout } from 'utils/form';
import Modal from 'components/Modal';

const FormModal = ({
  onSuccess,
  title,
  buttonText,
  buttonType,
  content,
  visible,
  onCancel,
  form,
  layout,
}) => {
  const [isFormDirty, setIsFormDirty] = useState(false);

  const handleOnFormChange = () => {
    if (!isFormDirty) {
      setIsFormDirty(true);
    }
  };

  const onModalCancel = () => {
    if (isFormDirty) {
      AntdModal.confirm({
        title: 'Confirm',
        icon: <ExclamationCircleOutlined />,
        content: 'You have unsaved changes. Please confirm closing without saving:',
        okText: 'Close',
        cancelText: 'Cancel',
        onOk: () => {
          onCancel();
          AntdModal.destroyAll();
        },
      });
    } else {
      onCancel();
    }
  };

  return (
    <Modal
      onCancel={onModalCancel}
      visible={visible}
      title={title}
      onSuccess={onSuccess}
      buttonText={buttonText}
      buttonType={buttonType}
      content={
        <Form {...layout} form={form} onValuesChange={handleOnFormChange}>
          {content}
        </Form>
      }
    />
  );
};

FormModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  buttonText: PropTypes.string,
  buttonType: PropTypes.string,
  form: PropTypes.instanceOf(Object),
  layout: PropTypes.instanceOf(Object),
};

FormModal.defaultProps = {
  title: null,
  content: null,
  buttonType: 'primary',
  buttonText: 'Save',
  form: null,
  layout: modalLayout,
};

export default FormModal;
