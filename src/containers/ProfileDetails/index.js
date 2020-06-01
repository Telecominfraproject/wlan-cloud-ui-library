import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
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
  const [redirect, setRedirect] = useState(false);

  const deleteProfile = () => {
    onDeleteProfile();
    setDeleteModal(false);
    setTimeout(() => {
      setRedirect(true);
    }, 100);
  };

  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 10 },
  };

  const [form] = Form.useForm();
  const { Item } = Form;

  return (
    <Container>
      {redirect && <Redirect to="/profiles" />}
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

      <Card className={styles.Card} title={`Edit ${name}`}>
        <Form {...layout} form={form}>
          <Item
            name="name"
            label="Profile Name"
            rules={[{ required: true, message: 'Please input your new profile name' }]}
          >
            <Input className={styles.Field} defaultValue={name} />
          </Item>
        </Form>
      </Card>
      {profileType === 'ssid' && <SSIDForm />}
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
