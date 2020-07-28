import React from 'react';
import '@testing-library/jest-dom/extend-expect';
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
    { dataIndex: 'name', editable: false, key: 'name', title: 'NAME' },
  ],
  tableData: [{ key: '1', id: '1', name: 'AP 1', channel: [25, 23, 61] }],
  onEditedRows: jest.fn(),
  onLoadMore: jest.fn(),
  isLastPage: false,
  resetEditedRows: jest.fn(),
};

describe('<BulkEditAPTableComp />', () => {
  it('Should work with default props', () => {
    const BulkEditAPTableComp = () => {
      return <BulkEditAPTable {...mockProps} />;
    };
    render(<BulkEditAPTableComp />);
  });
  // it('Should work with default props', () => {
  //   const BulkEditAPTableComp = () => {
  //     return <BulkEditAPTable {...mockProps} />;
  //   };
  //   const {}= render(<BulkEditAPTableComp />);
  // });
});
