import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';

import styles from './index.module.scss';

const GlobalModal = ({
  onCancel,
  onSuccess,
  title,
  buttonKey,
  buttonText,
  buttonType,
  content,
}) => {
  return (
    <Modal
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
    </Modal>
  );
};

GlobalModal.propTypes = {
  onCancel: PropTypes.isRequired,
  onSuccess: PropTypes.func.isRequired,
  buttonKey: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonType: PropTypes.string.isRequired,
};

export default GlobalModal;
