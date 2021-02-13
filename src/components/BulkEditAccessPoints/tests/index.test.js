import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, ROUTES } from 'tests/utils';
import BulkEditAccessPoints from '..';

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
      cellSize: [-90, -90, -90],
      channel: [36, 6, 149],
      clientDisconnectThreshold: [-90, -90, -90],
      id: '1',
      key: '1',
      minLoad: [40, 40, 50],
      name: 'AP 1',
      probeResponseThreshold: [-90, -90, -90],
      snrDrop: [30, 30, 20],
    },
  ],
  onSaveChanges: () => {},
  onLoadMore: () => {},
  isLastPage: true,
  breadcrumbPath: [
    { id: 2, name: 'Menlo Park' },
    { id: 8, name: 'Ottawa' },
  ],
};
describe('<BulkEditAccessPoints />', () => {
  afterEach(cleanup);
  const URL = ROUTES.accessPoints;

  it('URL should change back to /network/access-points when Back button is clicked', () => {
    const { getByRole } = render(
      <Router>
        <BulkEditAccessPoints {...mockProps} />
      </Router>
    );
    fireEvent.click(getByRole('button', { name: /back/i }));
    expect(window.location.pathname).toEqual(URL);
  });

  it('onSaveChanges should not be called when Save Changes button is clicked on an unedited table', () => {
    const onSaveChangesSpy = jest.fn();
    const { getByRole } = render(
      <Router>
        <BulkEditAccessPoints {...mockProps} onSaveChanges={onSaveChangesSpy} />
      </Router>
    );
    const button = getByRole('button', { name: /save changes/i });
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(onSaveChangesSpy).toHaveBeenCalledTimes(0);
  });

  it('onSaveChanges should be called when Save Changes button is clicked on an edited table', async () => {
    const onSaveChangesSpy = jest.fn();
    const { getByRole, getByTestId } = render(
      <Router>
        <BulkEditAccessPoints {...mockProps} onSaveChanges={onSaveChangesSpy} />
      </Router>
    );

    const button = getByRole('button', { name: /save changes/i });
    expect(button).toBeDisabled();
    const ENTER = { keyCode: 13 };
    const tableCell = getByTestId(`bulkEditTableCell-${mockProps.tableData[0].name}-channel`);
    fireEvent.click(tableCell);
    const input = getByTestId(`bulkEditFormInput-${mockProps.tableData[0].name}-channel`);
    fireEvent.change(input, { target: { value: 1 } });
    fireEvent.keyDown(input, ENTER);
    await waitFor(() => expect(button).not.toBeDisabled());
    fireEvent.click(button);
    expect(onSaveChangesSpy).toHaveBeenCalledTimes(1);
  });

  it('if isLastPage is true Load More button should not be visible', async () => {
    const { queryByRole } = render(
      <Router>
        <BulkEditAccessPoints {...mockProps} />
      </Router>
    );
    expect(queryByRole('button', { name: 'Load More' })).toBeNull();
  });

  it('if isLastPage is false Load More button should be visible', async () => {
    const { getByRole } = render(
      <Router>
        <BulkEditAccessPoints {...mockProps} isLastPage={false} />
      </Router>
    );
    expect(getByRole('button', { name: 'Load More' })).toBeVisible();
  });

  it('onLoadMore should be called when Load More button is clicked', async () => {
    const submitSpy = jest.fn();
    const { getByRole } = render(
      <Router>
        <BulkEditAccessPoints {...mockProps} isLastPage={false} onLoadMore={submitSpy} />
      </Router>
    );

    fireEvent.click(getByRole('button', { name: 'Load More' }));

    expect(submitSpy).toHaveBeenCalledTimes(1);
  });
});
