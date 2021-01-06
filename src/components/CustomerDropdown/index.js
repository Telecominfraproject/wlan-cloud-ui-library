import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Form, Menu } from 'antd';

import styles from './index.module.scss';

const { Item } = Form;

const CustomerDropdown = ({ customers }) => {
  const [selectedCustomer, setSelectedCustomers] = useState(customers?.[0]);

  const customerSelected = e => {
    setSelectedCustomers(customers.find(o => o.id === parseInt(e.key, 10)));
  };

  const menu = (
    <Menu onClick={customerSelected}>
      {customers.map(i => (
        <Menu.Item key={i.id}>{i.name}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Form className={styles.dropdownContainer} layout="vertical">
        <Item label={<div style={{ marginTop: '8px', fontSize: '12px' }}>Target Customer:</div>}>
          <div style={{ fontWeight: 600 }}>{selectedCustomer.name}</div>
        </Item>
      </Form>
    </Dropdown>
  );
};

CustomerDropdown.propTypes = {
  customers: PropTypes.instanceOf(Array),
};

CustomerDropdown.defaultProps = {
  customers: [],
};

export default CustomerDropdown;
