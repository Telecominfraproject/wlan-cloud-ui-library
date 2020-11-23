import React from 'react';
import PropTypes from 'prop-types';
import { Modal as AntdModal, Button } from 'antd';

import styles from '../Modal/index.module.scss';

const Modal = ({
  onCancel,
  onSuccess,
  visible,
  title,
  buttonText,
  buttonType,
  content,

  ...restProps
}) => {
  return (
    <AntdModal
      className={styles.Modal}
      visible={visible}
      title={title}
      onCancel={onCancel}
      footer={
        <>
          <div className={styles.Buttons}>
            <Button className={styles.Button} onClick={onCancel}>
              Cancel
            </Button>
            <Button className={styles.Button} type={buttonType} onClick={onSuccess}>
              {buttonText}
            </Button>
          </div>
        </>
      }
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
  title: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  buttonText: PropTypes.string,
  buttonType: PropTypes.string,
};

Modal.defaultProps = {
  title: null,
  content: null,
  buttonType: 'primary',
  buttonText: 'Save',
};

export default Modal;
