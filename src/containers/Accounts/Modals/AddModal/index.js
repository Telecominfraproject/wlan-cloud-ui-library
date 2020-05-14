import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button, Input } from 'antd';

import styles from './index.module.scss';

const AddModal = ({ hideAddModal, showAddModal }) => {
  const { Item } = Form;

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };
  return (
    <div className={styles.Container}>
      <Modal
        className={styles.Modal}
        visible={showAddModal}
        title="Add Account"
        onCancel={hideAddModal}
        onOk={hideAddModal}
        footer={[
          <div className={styles.Buttons}>
            <Button className={styles.Button} key="back" onClick={hideAddModal}>
              CANCEL
            </Button>
            <Button className={styles.Button} key="submit" type="primary" onClick={hideAddModal}>
              SAVE
            </Button>
          </div>,
        ]}
      >
        <div className={styles.Form}>
          <Form {...layout} name="login" data-testid="login">
            <Item
              label="E-mail"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your e-mail',
                },
                {
                  type: 'email',
                  message: 'The input is not a valid e-mail',
                },
              ]}
            >
              <Input className={styles.Field} />
            </Item>

            <Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password',
                },
              ]}
            >
              <Input.Password visibilityToggle className={styles.Field} />
            </Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

AddModal.propTypes = {
  hideAddModal: PropTypes.isRequired,
  showAddModal: PropTypes.func.isRequired,
};

export default AddModal;
