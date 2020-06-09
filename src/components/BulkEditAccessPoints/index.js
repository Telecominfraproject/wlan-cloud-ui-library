import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import { useHistory } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import Button from 'components/Button';
import BulkEditAPTable from './components/BulkEditAPTables';
import styles from './index.module.scss';

const { TabPane } = Tabs;

const tabBarStyle = {
  backgroundColor: '#131313',
  paddingLeft: 15,
};

const BulkEditAccessPoints = ({ tableColumns, tableData }) => {
  const history = useHistory();
  const callback = () => {
    // console.log(key);
  };
  const handleBackClick = () => {
    history.push('/network/access-points');
  };
  return (
    <div>
      <Button
        title="back"
        onClick={handleBackClick}
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
            <BulkEditAPTable tableColumns={tableColumns} tableData={tableData} />
          </TabPane>
          <TabPane tab="Cell Size" key="2">
            <BulkEditAPTable tableColumns={tableColumns} tableData={tableData} />
          </TabPane>
          <TabPane tab="Steering Thresholds" key="3">
            <BulkEditAPTable tableColumns={tableColumns} tableData={tableData} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

BulkEditAccessPoints.propTypes = {
  tableColumns: PropTypes.instanceOf(Array).isRequired,
  tableData: PropTypes.instanceOf(Array),
};

BulkEditAccessPoints.defaultProps = {
  tableData: [],
};

export default BulkEditAccessPoints;
