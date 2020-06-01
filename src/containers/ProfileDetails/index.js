import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Card } from 'antd';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import Container from 'components/Container';
import Header from 'components/Header';
import Modal from 'components/Modal';
import SSIDForm from './components/SSID';
import styles from './index.module.scss';

const ProfileDetails = ({ name, profileType, onDeleteProfile }) => {
  const [deleteModal, setDeleteModal] = useState(false);

  const deleteProfile = () => {
    onDeleteProfile();
    setDeleteModal(false);
  };

  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 10 },
  };

  const [form] = Form.useForm();
  const { Item } = Form;

  return (
    <Container>
      <Modal
        onCancel={() => setDeleteModal(false)}
        onSuccess={deleteProfile}
        visible={deleteModal}
        title="Are you sure?"
        buttonText="Delete"
        buttonType="danger"
        content={
          <p>
            Are you sure you want to delete the account: <strong> {name}</strong>
          </p>
        }
      />
      <Header>
        <Link to="/profiles">
          <Button className={styles.backButton}> BACK </Button>
        </Link>
        <div>
          <Button type="danger" onClick={() => setDeleteModal(true)}>
            Delete
          </Button>
          <Button onClick={() => {}}>Save</Button>
        </div>
      </Header>

      <Form {...layout} form={form}>
        <Card title={`Edit ${name}`}>
          <Item
            name="name"
            label="Profile Name"
            rules={[{ required: true, message: 'Please input your new profile name' }]}
          >
            <Input className={styles.Field} defaultValue={name} />
          </Item>
        </Card>
        {profileType === 'ssid' && <SSIDForm />}
      </Form>
    </Container>
  );
};

ProfileDetails.propTypes = {
  name: PropTypes.string,
  profileType: PropTypes.string,

  onDeleteProfile: PropTypes.func.isRequired,
};

ProfileDetails.defaultProps = {
  name: null,
  profileType: null,
};

export default ProfileDetails;
