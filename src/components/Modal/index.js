import React from 'react';
import PropTypes from 'prop-types';
import { Modal as AntdModal, Button } from 'antd';
import { useRoles } from 'contexts/RolesContext';

import styles from './index.module.scss';

const Modal = ({
  onCancel,
  onSuccess,
  visible,
  title,
  buttonText,
  buttonType,
  content,
  isSubmitable,
  loading,
  ...restProps
}) => {
  const { isReadOnly } = useRoles();
  return (
    <AntdModal
      className={styles.Modal}
      visible={visible}
      title={title}
      onCancel={onCancel}
      footer={
        <div className={styles.Buttons}>
          {!isReadOnly || isSubmitable ? (
            <>
              <Button className={styles.Button} onClick={onCancel} data-testid="modal-cancel">
                Cancel
              </Button>
              <Button
                className={styles.Button}
                type={buttonType}
                onClick={onSuccess}
                loading={loading}
                data-testid={`modal-${buttonText}`}
              >
                {buttonText}
              </Button>
            </>
          ) : (
            <Button
              className={styles.Button}
              type="primary"
              onClick={onCancel}
              data-testid="modal-close"
            >
              Close
            </Button>
          )}
        </div>
      }
      destroyOnClose
      {...restProps}
    >
      {content}
    </AntdModal>
  );
};

Modal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  buttonText: PropTypes.string,
  buttonType: PropTypes.string,
  isSubmitable: PropTypes.bool,
  loading: PropTypes.bool,
};

Modal.defaultProps = {
  title: null,
  content: null,
  buttonType: 'primary',
  buttonText: 'Save',
  isSubmitable: false,
  loading: false,
};

export default Modal;
