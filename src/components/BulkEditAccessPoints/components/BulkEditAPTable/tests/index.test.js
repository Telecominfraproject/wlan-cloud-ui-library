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
    { dataIndex: 'name', editable: true, key: 'name', title: 'NAME' },
    { dataIndex: 'name', editable: false, key: 'name', title: 'NAME-1' },
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

  it('Should work with default props', async () => {
    const BulkEditAPTableComp = () => {
      return <BulkEditAPTable {...mockProps} />;
    };
    const { getByTestId } = render(<BulkEditAPTableComp />);
    const tableCell = getByTestId('bulkEditTableCell');
    fireEvent.click(tableCell);
    const input = getByTestId('bulkEditFormInput');
    fireEvent.click(input);

    const ENTER = { keyCode: 13 };
    fireEvent.keyDown(input, ENTER);

    await waitFor(() => expect(getByTestId('bulkEditTableCell')).toBeInTheDocument());
    const newTableCell = getByTestId('bulkEditTableCell');
    fireEvent.click(newTableCell);
    const newInput = getByTestId('bulkEditFormInput');
    fireEvent.click(newInput);

    fireEvent.keyDown(newInput, ENTER);
    await waitFor(() => expect(getByTestId('bulkEditTableCell')).toBeInTheDocument());
  });
});
