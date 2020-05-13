import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';

import styles from './index.module.scss';

const DeleteModal = ({ hideDeleteModal, showDeleteModal }) => {
  return (
    <div className={styles.Container}>
      <Modal
        className={styles.Modal}
        visible={showDeleteModal}
        title="Are you sure?"
        onCancel={hideDeleteModal}
        onOk={hideDeleteModal}
        footer={[
          <div className={styles.Buttons}>
            <Button id={styles.cancelButton} key="back" onClick={hideDeleteModal}>
              CANCEL
            </Button>
            <Button id={styles.deleteButton} key="submit" type="primary" onClick={hideDeleteModal}>
              DELETE
            </Button>
          </div>,
        ]}
      >
        <p>
          Are you sure you want to delete the account: <strong> support@example.com</strong>
        </p>
      </Modal>
    </div>
  );
};

DeleteModal.propTypes = {
  hideDeleteModal: PropTypes.isRequired,
  showDeleteModal: PropTypes.func.isRequired,
};

export default DeleteModal;
