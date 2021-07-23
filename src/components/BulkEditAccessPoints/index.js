import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { LeftOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';

import ThemeContext from 'contexts/ThemeContext';
import Button from 'components/Button';
import { RoleProtectedBtn } from 'components/WithRoles';
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
  loading,
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
    <>
      <Button
        title="back"
        onClick={handleBackClick}
        className={styles.backButton}
        icon={<LeftOutlined />}
      >
        Back
      </Button>

      <div className={styles.innerContainer}>
        <div>
          <h1>Bulk Edit Access Points</h1>
          <Breadcrumb separator=">">{breadCrumbs}</Breadcrumb>
        </div>
        <RoleProtectedBtn
          onClick={() => {
            onSaveChanges(editedRows);
            setEditedRows(null);
          }}
          disabled={!editedRows}
          className={styles.saveBtn}
          type="primary"
        >
          Save
        </RoleProtectedBtn>
      </div>
      <BulkEditAPTable
        tableColumns={tableColumns}
        tableData={tableData}
        setEditedRows={setEditedRows}
        onLoadMore={onLoadMore}
        isLastPage={isLastPage}
        loading={loading}
        onSaveChanges={onSaveChanges}
      />
    </>
  );
};

BulkEditAccessPoints.propTypes = {
  tableColumns: PropTypes.instanceOf(Array).isRequired,
  tableData: PropTypes.instanceOf(Array),
  onSaveChanges: PropTypes.func.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  isLastPage: PropTypes.bool,
  breadcrumbPath: PropTypes.instanceOf(Array),
  loading: PropTypes.bool,
};

BulkEditAccessPoints.defaultProps = {
  tableData: [],
  isLastPage: true,
  breadcrumbPath: [],
  loading: true,
};

export default BulkEditAccessPoints;
