import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { tableData } from 'utilities/constants';

const columns = [
  {
    title: '',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Mac',
    dataIndex: 'mac',
    key: 'mac',
  },
  { title: 'OS/MODEL/MFR', dataIndex: 'osModelMfr', key: '1' },
  { title: 'IP', dataIndex: 'ip', key: '2' },
  { title: 'HOST NAME', dataIndex: 'hostName', key: '3' },
  { title: 'ACCESS POINT', dataIndex: 'accessPoint', key: '4' },
  { title: 'SSID', dataIndex: 'ssid', key: '5' },
  { title: 'BAND', dataIndex: 'band', key: '6' },
  { title: 'SIGNAL', dataIndex: 'signal', key: '7' },
  { title: 'STATUS', dataIndex: 'status', key: '8' },
];

const DeviceTable = props => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filterData = [];
    props.SelectedLocations.map((location, index) => {
      tableData.forEach((data, index) => {
        location == data.locationId ? filterData.push(data) : '';
      });
    });
    setFilteredData(filterData);
  }, [props.SelectedLocations]);

  return (
    <Table
      columns={columns}
      dataSource={props.SelectedLocations.length > 0 ? filteredData : tableData}
    />
  );
};

DeviceTable.propTypes = {
  SelectedLocations: PropTypes.array.isRequired,
};

export default DeviceTable;
