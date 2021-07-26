import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'components/Skeleton';
import Button from 'components/Button';
import { EditableRow } from './components/EditableRow';
import { EditableCell } from './components/EditableCell';
import styles from './index.module.scss';

const BulkEditAPTable = ({
  tableColumns,
  tableData,
  onLoadMore,
  isLastPage,
  setEditedRows,
  loading,
}) => {
  const [bulkEditTableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(tableData);
  }, [tableData]);

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const handleSave = (row, values) => {
    const updatedRow = { ...row };
    const key = Object.keys(values)[0];
    updatedRow[key] = JSON.parse(`[${values[key]}]`);
    setEditedRows(editedRows => ({ ...editedRows, [updatedRow.key]: updatedRow }));

    setTableData(bulkEditTableData.map(obj => (obj.id === updatedRow.id ? updatedRow : obj)));
  };

  const columns = tableColumns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <>
      <Table
        data-testid="bulkEditTable"
        components={components}
        rowClassName={styles.editableRow}
        columns={columns}
        dataSource={bulkEditTableData}
        scroll={{ x: 'max-content' }}
        pagination={false}
        loading={loading}
        rowKey="key"
      />
      {isLastPage === false && (
        <div className={styles.LoadMore}>
          <Button onClick={onLoadMore}>Load More</Button>
        </div>
      )}
    </>
  );
};

BulkEditAPTable.propTypes = {
  tableColumns: PropTypes.instanceOf(Array).isRequired,
  tableData: PropTypes.instanceOf(Array),
  onLoadMore: PropTypes.func.isRequired,
  isLastPage: PropTypes.bool,
  setEditedRows: PropTypes.func,
  loading: PropTypes.bool,
};

BulkEditAPTable.defaultProps = {
  tableData: [],
  isLastPage: true,
  setEditedRows: () => {},
  loading: true,
};

export default BulkEditAPTable;
