import React from 'react';
import PropTypes from 'prop-types';
import { Modal as AntdModal, Button } from 'antd';

import styles from './index.module.scss';

const Modal = ({ onCancel, onSuccess, title, buttonKey, buttonText, buttonType, content }) => {
  return (
    <AntdModal
      className={styles.Modal}
      visible={onSuccess}
      title={title}
      onCancel={onCancel}
      footer={[
        <div className={styles.Buttons}>
          <Button className={styles.Button} key="cancel" onClick={onCancel}>
            CANCEL
          </Button>
          <Button className={styles.Button} key={buttonKey} type={buttonType} onClick={onCancel}>
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
  onCancel: PropTypes.isRequired,
  onSuccess: PropTypes.func.isRequired,
  buttonKey: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonType: PropTypes.string.isRequired,
};

export default Modal;
