import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NetworkTable from '..';
configure({ adapter: new Adapter() });

describe('<NetworkTable />', () => {
  afterEach(cleanup);

  it('renders table data for client devices', () => {
    const clientDevicesTableColumns = [
      {
        title: '',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'MAC',
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

    const CLIENT_DEVICES_TABLE_DATA = [
      {
        key: 0,
        name: 'Laptop',
        mac: 'DO:C6:37:69:3E:FD',
        osModelMfr: 'Linux',
        ip: '100.115.92.2',
        hostName: 'LAPTOP-714LRTP6',
        accessPoint: 'AP100',
        ssid: 'TestUs',
        band: '5Ghz',
        signal: '-43 dBm',
        status: '39h 41m 25s Connected',
        locationId: 3,
      },
      {
        key: 1,
        name: 'Laptop',
        mac: 'DO:C6:37:69:3E:FD',
        osModelMfr: 'Linux',
        ip: '100.115.92.2',
        hostName: 'LAPTOP-714LRTP6',
        accessPoint: 'AP100',
        ssid: 'TestUs',
        band: '5Ghz',
        signal: '-43 dBm',
        status: '39h 41m 25s Connected',
        locationId: 7,
      },
    ];
    const container = mount(
      <NetworkTable
        tableColumns={clientDevicesTableColumns}
        tableData={CLIENT_DEVICES_TABLE_DATA}
      />
    );

    const table = container.find('table');
    expect(table).toHaveLength(1);

    // The table should have ONLY 1 thead element
    const thead = table.find('thead');
    expect(thead).toHaveLength(1);

    // The number of th tags should be equal to number of columns
    const headers = thead.find('th');
    expect(headers).toHaveLength(clientDevicesTableColumns.length);

    // Each th tag text should equal to column header
    headers.forEach((th, idx) => {
      expect(th.text()).toEqual(clientDevicesTableColumns[idx].title);
    });

    // The table should have ONLY 1 tbody tag
    const tbody = table.find('tbody');
    expect(tbody).toHaveLength(1);

    // tbody tag should have the same number of tr tags as data rows
    const rows = tbody.find('tr');
    expect(rows).toHaveLength(CLIENT_DEVICES_TABLE_DATA.length + 1);
  });
});
