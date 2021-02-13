import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import Button from 'components/Button';
import { EditableRow } from './components/EditableRow';
import { EditableCell } from './components/EditableCell';
import styles from './index.module.scss';

const BulkEditAPTable = ({ tableColumns, tableData, onEditedRows, onLoadMore, isLastPage }) => {
  const [bulkEditTableData, setTableData] = useState(tableData);
  const [editedRows, setEditedRows] = useState([]);
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

    if (!editedRows.some(a => row.key === a.key)) {
      setEditedRows([...editedRows, updatedRow]);
    } else {
      setEditedRows(editedRows.map(obj => (obj.id === updatedRow.id ? updatedRow : obj)));
    }
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

  useEffect(() => {
    onEditedRows(editedRows);
  }, [editedRows]);

  return (
    <>
      <Table
        data-testid="bulkEditTable"
        components={components}
        rowClassName={styles.editableRow}
        columns={columns}
        dataSource={bulkEditTableData}
        scroll={{ x: 1000 }}
        pagination={false}
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
  onEditedRows: PropTypes.func.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  isLastPage: PropTypes.bool,
};

BulkEditAPTable.defaultProps = {
  tableData: [],
  isLastPage: true,
};

export default BulkEditAPTable;
