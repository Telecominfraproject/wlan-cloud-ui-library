import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button, Input } from 'antd';

import styles from './index.module.scss';

const EditModal = ({ hideEditModal, showEditModal }) => {
  const { Item } = Form;

  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 14 },
  };
  return (
    <div className={styles.Container}>
      <Modal
        className={styles.Modal}
        visible={showEditModal}
        title="Edit Account"
        onCancel={hideEditModal}
        onOk={hideEditModal}
        footer={[
          <div className={styles.Buttons}>
            <Button className={styles.Button} key="back" onClick={hideEditModal}>
              CANCEL
            </Button>
            <Button className={styles.Button} key="submit" type="primary" onClick={hideEditModal}>
              SAVE
            </Button>
          </div>,
        ]}
      >
        <Form {...layout} name="login" data-testid="login">
          <div className={styles.Form}>
            <Item label="E-mail">support@example.com</Item>
            <Item label="Role">Admin</Item>

            <Item
              label="New Password"
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: 'Please input your new password',
                },
              ]}
            >
              <Input.Password className={styles.Field} />
            </Item>

            <Item
              label="Confirm Password"
              name="confirmedPassword"
              dependencies={['newPassword']}
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password',
                },
                ({ getFieldValue }) => ({
                  validator(_rule, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match'));
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password className={styles.Field} />
            </Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

EditModal.propTypes = {
  hideEditModal: PropTypes.isRequired,
  showEditModal: PropTypes.func.isRequired,
};

export default EditModal;
