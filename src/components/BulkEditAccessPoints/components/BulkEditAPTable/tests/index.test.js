import '@testing-library/jest-dom/extend-expect';

import { fireEvent, waitFor } from '@testing-library/react';

import React from 'react';
import { render } from 'tests/utils';
import BulkEditAPTable from '..';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const mockProps = {
  tableColumns: [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Manual Active Channel',
      dataIndex: 'manualChannelNumber',
      key: 'manualChannelNumber',
      editable: true,
    },
    {
      title: 'Manual Backup Channel',
      dataIndex: 'manualBackupChannelNumber',
      key: 'manualBackupChannelNumber',
      editable: true,
    },
    {
      title: 'Cell Size',
      dataIndex: 'cellSize',
      key: 'cellSize',
      editable: true,
    },
    {
      title: 'Probe Response Threshold',
      dataIndex: 'probeResponseThreshold',
      key: 'probeResponseThreshold',
      editable: true,
    },
    {
      title: 'Client Disconnect Threshold',
      dataIndex: 'clientDisconnectThreshold',
      key: 'clientDisconnectThreshold',
      editable: true,
    },
    {
      title: 'SNR (% Drop)',
      dataIndex: 'snrDrop',
      key: 'snrDrop',
      editable: true,
    },
    {
      title: 'Min Load',
      dataIndex: 'minLoad',
      key: 'minLoad',
      editable: true,
    },
  ],
  tableData: [
    {
      cellSize: [-90, -90, -90],
      manualChannelNumber: [6, 36, 149],
      manualBackupChannelNumber: [11, 52, 153],
      clientDisconnectThreshold: [-90, -90, -90],
      id: '1',
      key: '1',
      minLoad: [40, 40, 50],
      name: 'AP 1',
      probeResponseThreshold: [-90, -90, -90],
      snrDrop: [30, 30, 20],
      radioMap: ['2.4GHz', '5GHz (L)', '5GHz (U)'],
      allowedChannels: [
        [
          {
            model_type: 'ChannelPowerLevel',
            channelNumber: 11,
            powerLevel: 18,
            dfs: false,
            channelWidth: 20,
          },
          {
            model_type: 'ChannelPowerLevel',
            channelNumber: 6,
            powerLevel: 18,
            dfs: false,
            channelWidth: 20,
          },
        ],
        [
          {
            model_type: 'ChannelPowerLevel',
            channelNumber: 153,
            powerLevel: 18,
            dfs: false,
            channelWidth: 80,
          },

          {
            model_type: 'ChannelPowerLevel',
            channelNumber: 149,
            powerLevel: 18,
            dfs: false,
            channelWidth: 80,
          },
        ],
        [
          {
            model_type: 'ChannelPowerLevel',
            channelNumber: 36,
            powerLevel: 18,
            dfs: false,
            channelWidth: 80,
          },
          {
            model_type: 'ChannelPowerLevel',
            channelNumber: 52,
            powerLevel: 18,
            dfs: true,
            channelWidth: 80,
          },
        ],
      ],
    },
  ],
  onLoadMore: jest.fn(),
  isLastPage: false,
  loading: false,
};

describe('<BulkEditAPTableComp />', () => {
  it('Should work with default props', () => {
    const BulkEditAPTableComp = () => {
      return <BulkEditAPTable {...mockProps} />;
    };
    render(<BulkEditAPTableComp />);
  });

  it('Should work when a single table cell is edited multiple times', async () => {
    const BulkEditAPTableComp = () => {
      return <BulkEditAPTable {...mockProps} />;
    };
    const { getByTestId } = render(<BulkEditAPTableComp />);
    const ENTER = { keyCode: 13 };

    const tableCell = getByTestId(
      `bulkEditTableCell-${mockProps.tableData[0].name}-manualChannelNumber`
    );
    fireEvent.click(tableCell);

    await waitFor(() =>
      getByTestId(`bulkEditFormInput-${mockProps.tableData[0].name}-manualChannelNumber`)
    );
    const input = getByTestId(
      `bulkEditFormInput-${mockProps.tableData[0].name}-manualChannelNumber`
    );
    fireEvent.click(input);
    fireEvent.change(input, { target: { value: '37, 8, 157' } });
    fireEvent.keyDown(input, ENTER);

    expect(input.value).toBe('37, 8, 157');

    fireEvent.click(tableCell);
    fireEvent.click(input);
    fireEvent.change(input, { target: { value: '36, 6, 149' } });
    fireEvent.keyDown(input, ENTER);

    expect(input.value).toBe('36, 6, 149');
  });
});
