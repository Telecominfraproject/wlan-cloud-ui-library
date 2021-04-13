import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { LeftOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';

import ThemeContext from 'contexts/ThemeContext';
import Button from 'components/Button';
import { useHistory } from 'hooks';

import BulkEditAPTable from './components/BulkEditAPTable';
import styles from './index.module.scss';

const BulkEditAccessPoints = ({
  tableColumns,
  tableData,
  onSaveChanges,
  onLoadMore,
  isLastPage,
  breadcrumbPath,
}) => {
  const { routes } = useContext(ThemeContext);
  const { pushWithSearch } = useHistory();
  const [editedRows, setEditedRows] = useState(null);

  const handleBackClick = () => {
    pushWithSearch(routes.accessPoints);
  };

  const breadCrumbs = breadcrumbPath.map(location => (
    <Breadcrumb.Item key={location.id}>{location.name}</Breadcrumb.Item>
  ));

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

      <div className={styles.innerContainer}>
        <div className={styles.innerText}>
          Bulk Edit Access Points:
          <Breadcrumb separator=">">{breadCrumbs}</Breadcrumb>
        </div>
        <Button
          onClick={() => {
            onSaveChanges(editedRows);
            setEditedRows(null);
          }}
          disabled={!editedRows}
          className={styles.saveBtn}
          type="primary"
        >
          Save
        </Button>
      </div>
      <BulkEditAPTable
        tableColumns={tableColumns}
        tableData={tableData}
        setEditedRows={setEditedRows}
        onLoadMore={onLoadMore}
        isLastPage={isLastPage}
      />
    </div>
  );
};

BulkEditAccessPoints.propTypes = {
  tableColumns: PropTypes.instanceOf(Array).isRequired,
  tableData: PropTypes.instanceOf(Array),
  onSaveChanges: PropTypes.func.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  isLastPage: PropTypes.bool,
  breadcrumbPath: PropTypes.instanceOf(Array),
};

BulkEditAccessPoints.defaultProps = {
  tableData: [],
  isLastPage: true,
  breadcrumbPath: [],
};

export default BulkEditAccessPoints;
