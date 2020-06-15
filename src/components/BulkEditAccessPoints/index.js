import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import Button from 'components/Button';
import BulkEditAPTable from './components/BulkEditAPTable';
import styles from './index.module.scss';

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
        <BulkEditAPTable tableColumns={tableColumns} tableData={tableData} />
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
