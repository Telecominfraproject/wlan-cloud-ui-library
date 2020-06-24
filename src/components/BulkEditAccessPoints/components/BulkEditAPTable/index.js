import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import Button from 'components/Button';
import { EditableRow } from './components/EditableRow';
import { EditableCell } from './components/EditableCell';
import styles from './index.module.scss';

const BulkEditAPTable = ({
  tableColumns,
  tableData,
  onEditedRows,
  onLoadMore,
  isLastPage,
  resetEditedRows,
}) => {
  const [bulkEditTableData, setTableData] = useState([]);
  const [editedRows, setEditedRows] = useState([]);
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  useEffect(() => {
    setTableData(tableData);
  }, [tableData]);

  let tempEditedRows = [];

  const handleSave = row => {
    const newData = [...bulkEditTableData];
    const channel = JSON.parse(`[${row.channel}]`);
    const cellSize = JSON.parse(`[${row.cellSize}]`);
    const probeResponseThreshold = JSON.parse(`[${row.probeResponseThreshold}]`);
    const clientDisconnectThreshold = JSON.parse(`[${row.clientDisconnectThreshold}]`);
    const snrDrop = JSON.parse(`[${row.snrDrop}]`);
    const minLoad = JSON.parse(`[${row.minLoad}]`);
    const updatedRow = {
      ...row,
      channel,
      cellSize,
      probeResponseThreshold,
      clientDisconnectThreshold,
      snrDrop,
      minLoad,
    };
    const itemIndex = editedRows.findIndex(a => row.key === a.key);
    const tempRows = [...editedRows];

    if (itemIndex === -1) {
      tempRows.push(updatedRow);
      setEditedRows(tempRows);
    } else {
      const preRow = editedRows[itemIndex];
      tempEditedRows = [...editedRows];
      tempEditedRows.splice(itemIndex, 1, { ...preRow, ...updatedRow });
      setEditedRows(tempEditedRows);
    }

    tempEditedRows.push(updatedRow);
    const index = newData.findIndex(b => row.key === b.key);
    const element = newData[index];
    newData.splice(index, 1, { ...element, ...updatedRow });
    setTableData(newData);
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

  useEffect(() => {
    setEditedRows([]);
  }, [resetEditedRows]);

  return (
    <>
      <Table
        components={components}
        rowClassName={() => {
          return styles.editableRow;
        }}
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
  resetEditedRows: PropTypes.bool.isRequired,
};

BulkEditAPTable.defaultProps = {
  tableData: [],
  isLastPage: true,
};

export default BulkEditAPTable;
