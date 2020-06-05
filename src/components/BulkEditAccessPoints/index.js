import React from 'react';
import PropTypes from 'prop-types';
import { Table, Tabs } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import Button from 'components/Button';
import styles from './index.module.scss';

const { TabPane } = Tabs;

const tabBarStyle = {
  backgroundColor: '#131313',
  paddingLeft: 15,
};

const BulkEditAccessPoints = ({ tableColumns, tableData, onBackBtnClick }) => {
  const callback = key => {
    // console.log(key);
  };
  console.log('in bulk edit');
  return (
    <div>
      <Button
        title="back"
        onClick={onBackBtnClick}
        className={styles.backButton}
        icon={<LeftOutlined />}
      >
        Back
      </Button>
      <div>
        <div className={styles.innerContainer}>
          <p className={styles.innerText}>Bulk Edit Access Points</p>
          <Button>Save Changes</Button>
        </div>
        <Tabs tabBarStyle={tabBarStyle} defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Channel" key="1">
            <Table
              columns={tableColumns}
              dataSource={tableData}
              scroll={{ x: 2000 }}
              pagination={false}
            />
          </TabPane>
          <TabPane tab="Cell Size" key="2">
            <Table
              columns={tableColumns}
              dataSource={tableData}
              scroll={{ x: 2000 }}
              pagination={false}
            />
          </TabPane>
          <TabPane tab="Steering Thresholds" key="3">
            <Table
              columns={tableColumns}
              dataSource={tableData}
              scroll={{ x: 2000 }}
              pagination={false}
            />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

BulkEditAccessPoints.propTypes = {
  tableColumns: PropTypes.instanceOf(Array).isRequired,
  tableData: PropTypes.instanceOf(Array),
  onBackBtnClick: PropTypes.func.isRequired,
};

BulkEditAccessPoints.defaultProps = {
  tableData: [],
};

export default BulkEditAccessPoints;
