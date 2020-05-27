import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import HeaderButton from 'components/HeaderButton';
import ContainerDiv from 'components/ContainerDiv';
import HeaderDiv from 'components/HeaderDiv';

import styles from './index.module.scss';

const ProfileDetails = ({ name }) => {
  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 8 },
  };

  const [form] = Form.useForm();
  const { Item } = Form;

  return (
    <ContainerDiv>
      <HeaderDiv>
        <Link to="/profiles">
          <Button className={styles.backButton} type="button">
            Back
          </Button>
        </Link>
        <div>
          <HeaderButton title="Delete" buttonType="danger" onClick={() => {}} />
          <HeaderButton title="Save" onClick={() => {}} />
        </div>
      </HeaderDiv>
      <Form {...layout} form={form}>
        <Item
          name="name"
          label="Profile Name"
          rules={[{ required: true, message: 'Please input your new profile name' }]}
        >
          <Input className={styles.Field} defaultValue={name} />
        </Item>
      </Form>
    </ContainerDiv>
  );
};

ProfileDetails.propTypes = {
  name: PropTypes.string,
};

ProfileDetails.defaultProps = {
  name: null,
};

export default ProfileDetails;
