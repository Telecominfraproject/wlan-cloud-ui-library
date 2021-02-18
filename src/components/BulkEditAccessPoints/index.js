import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';

import ThemeContext from 'contexts/ThemeContext';
import Button from 'components/Button';

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
  const history = useHistory();
  const [editedRows, setEditedRows] = useState(null);

  const handleBackClick = () => {
    history.push(routes.accessPoints);
  };

  const breadCrumbs = breadcrumbPath.map(location => (
    <Breadcrumb.Item key={location.id}>{location.name}</Breadcrumb.Item>
  ));

  const handleOnSave = () => {
    const editedRowsArr = [];
    Object.keys(editedRows).forEach(key => {
      editedRowsArr.push(editedRows[key]);
    });

    return editedRowsArr;
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

      <div className={styles.innerContainer}>
        <div className={styles.innerText}>
          Bulk Edit Access Points:
          <Breadcrumb separator=">">{breadCrumbs}</Breadcrumb>
        </div>
        <Button
          onClick={() => {
            onSaveChanges(handleOnSave());
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
