import '@testing-library/jest-dom/extend-expect';

import { cleanup, fireEvent, waitFor } from '@testing-library/react';

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
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'CHANNEL',
      dataIndex: 'channel',
      key: 'channel',
      editable: true,
    },
    {
      title: 'CELL SIZE',
      dataIndex: 'cellSize',
      key: 'cellSize',
      editable: true,
    },
    {
      title: 'PROB RESPONSE THRESHOLD',
      dataIndex: 'probeResponseThreshold',
      key: 'probeResponseThreshold',
      editable: true,
    },
    {
      title: 'CLIENT DISCONNECT THRESHOLD',
      dataIndex: 'clientDisconnectThreshold',
      key: 'clientDisconnectThreshold',
      editable: true,
    },
    {
      title: 'SNR (% DROP)',
      dataIndex: 'snrDrop',
      key: 'snrDrop',
      editable: true,
    },
    {
      title: 'MIN LOAD',
      dataIndex: 'minLoad',
      key: 'minLoad',
      editable: true,
    },
  ],
  tableData: [
    {
      key: '1',
      id: '1',
      name: 'AP 1',
      channel: [25, 23, 61],
      cellSize: [-90, -90, -90],
      clientDisconnectThreshold: [-90, -90, -90],
      probeResponseThreshold: [-90, -90, -90],
      minLoad: [50, 40, 40],
      snrDrop: [20, 30, 30],
    },
    {
      key: '2',
      id: '2',
      name: 'AP 2',
      channel: [25, 23, 61],
      cellSize: [-90, -90, -90],
      clientDisconnectThreshold: [-90, -90, -90],
      probeResponseThreshold: [-90, -90, -90],
      minLoad: [50, 40, 40],
      snrDrop: [20, 30, 30],
    },
  ],
  onEditedRows: jest.fn(),
  onLoadMore: jest.fn(),
  isLastPage: false,
  resetEditedRows: false,
};

describe('<BulkEditAPTableComp />', () => {
  afterEach(cleanup);
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
    const tableCell = getByTestId(`bulkEditTableCell-${mockProps.tableData[0].name}-channel`);
    fireEvent.click(tableCell);
    const input = getByTestId(`bulkEditFormInput-${mockProps.tableData[0].name}-channel`);
    fireEvent.click(input);
    fireEvent.change(input, { target: { value: 1 } });
    fireEvent.keyDown(input, ENTER);
    fireEvent.click(input);
    await waitFor(() => expect(input).toBeInTheDocument());
  });
});
