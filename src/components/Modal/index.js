import React from 'react';
import PropTypes from 'prop-types';
import { Modal as AntdModal, Button } from 'antd';

import styles from './index.module.scss';

const Modal = ({ onCancel, onSuccess, visible, title, buttonText, buttonType, content }) => {
  return (
    <AntdModal
      className={styles.Modal}
      visible={visible}
      title={title}
      onCancel={onCancel}
      footer={[
        <div className={styles.Buttons}>
          <Button className={styles.Button} onClick={onCancel}>
            CANCEL
          </Button>
          <Button className={styles.Button} type={buttonType} onClick={onSuccess}>
            {buttonText}
          </Button>
        </div>,
      ]}
    >
      {content}
    </AntdModal>
  );
};

Modal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSuccess: PropTypes.isRequired,
  visible: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonType: PropTypes.string.isRequired,
};

export default Modal;
