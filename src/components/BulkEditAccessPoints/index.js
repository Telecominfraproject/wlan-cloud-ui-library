import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import Button from 'components/Button';
import BulkEditAPTable from './components/BulkEditAPTable';
import styles from './index.module.scss';

const BulkEditAccessPoints = ({
  tableColumns,
  tableData,
  onSaveChanges,
  onLoadMore,
  isLastPage,
}) => {
  const history = useHistory();
  const [editedRows, setEditedRows] = useState([]);

  const handleBackClick = () => {
    history.push('/network/access-points');
  };

  const handleEditedRows = rows => {
    setEditedRows(rows);
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
          <Button
            onClick={() => {
              onSaveChanges(editedRows);
            }}
            className={styles.saveBtn}
          >
            SAVE CHANGES
          </Button>
        </div>
        <BulkEditAPTable
          tableColumns={tableColumns}
          tableData={tableData}
          onEditedRows={handleEditedRows}
          onLoadMore={onLoadMore}
          isLastPage={isLastPage}
        />
      </div>
    </div>
  );
};

BulkEditAccessPoints.propTypes = {
  tableColumns: PropTypes.instanceOf(Array).isRequired,
  tableData: PropTypes.instanceOf(Array),
  onSaveChanges: PropTypes.func.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  isLastPage: PropTypes.bool.isRequired,
};

BulkEditAccessPoints.defaultProps = {
  tableData: [],
};

export default BulkEditAccessPoints;
