import React, { useContext, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Form } from 'antd';
import Button from 'components/Button';
import styles from './index.module.scss';

const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      // console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} IS REQUIRED.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className={styles.editableCellValueWrap}
        role="button"
        tabIndex={0}
        onKeyDown={() => {}}
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const BulkEditAPTable = ({ tableColumns, tableData, onEditedRows, onLoadMore, isLastPage }) => {
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
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...updatedRow });
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

  return (
    <>
      <Table
        components={components}
        rowClassName={() => {
          return styles.editableRow;
        }}
        columns={columns}
        dataSource={bulkEditTableData}
        scroll={{ x: 2000 }}
        pagination={false}
      />
      {!isLastPage && (
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
  isLastPage: PropTypes.bool.isRequired,
};

EditableRow.propTypes = {
  index: PropTypes.number.isRequired,
};

EditableCell.propTypes = {
  title: PropTypes.string.isRequired,
  editable: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  dataIndex: PropTypes.number.isRequired,
  record: PropTypes.shape({
    key: PropTypes.number,
    name: PropTypes.string,
    cellSize: PropTypes.instanceOf(Array),
    channel: PropTypes.instanceOf(Array),
    clientDisconnectThreshold: PropTypes.instanceOf(Array),
    probeResponseThreshold: PropTypes.instanceOf(Array),
    snrDrop: PropTypes.instanceOf(Array),
    minLoad: PropTypes.instanceOf(Array),
  }).isRequired,
  handleSave: PropTypes.func.isRequired,
};

BulkEditAPTable.defaultProps = {
  tableData: [],
};

export default BulkEditAPTable;
