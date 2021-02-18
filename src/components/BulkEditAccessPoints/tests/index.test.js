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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Channel',
      dataIndex: 'channel',
      key: 'channel',
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

const ENTER = { keyCode: 13 };

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

  it('onSaveChanges should not be called when Save button is clicked on an unedited table', () => {
    const onSaveChangesSpy = jest.fn();
    const { getByRole } = render(
      <Router>
        <BulkEditAccessPoints {...mockProps} onSaveChanges={onSaveChangesSpy} />
      </Router>
    );
    const button = getByRole('button', { name: /save/i });
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(onSaveChangesSpy).toHaveBeenCalledTimes(0);
  });

  it('onSaveChanges should be called when Save button is clicked on an edited table', async () => {
    const onSaveChangesSpy = jest.fn();
    const { getByRole, getByTestId } = render(
      <Router>
        <BulkEditAccessPoints {...mockProps} onSaveChanges={onSaveChangesSpy} />
      </Router>
    );

    const button = getByRole('button', { name: /save/i });
    expect(button).toBeDisabled();
    const tableCell = getByTestId(`bulkEditTableCell-${mockProps.tableData[0].name}-channel`);
    fireEvent.click(tableCell);
    const input = getByTestId(`bulkEditFormInput-${mockProps.tableData[0].name}-channel`);
    fireEvent.click(input);
    fireEvent.keyDown(input, ENTER);
    await waitFor(() => expect(button).not.toBeDisabled());
    fireEvent.click(button);
    expect(onSaveChangesSpy).toHaveBeenCalledTimes(1);
  });

  it('error should be shown if Channel input is outside range', async () => {
    const { getByText, getByTestId } = render(
      <Router>
        <BulkEditAccessPoints {...mockProps} />
      </Router>
    );

    const tableCell = getByTestId(`bulkEditTableCell-${mockProps.tableData[0].name}-channel`);
    fireEvent.click(tableCell);
    const input = getByTestId(`bulkEditFormInput-${mockProps.tableData[0].name}-channel`);
    fireEvent.change(input, { target: { value: 166 } });
    fireEvent.keyDown(input, ENTER);

    await waitFor(() => {
      expect(getByText('Channel can be a number between 1 and 165')).toBeVisible();
    });
  });

  it('error should be shown if Cell Size input is outside range', async () => {
    const { getByText, getByTestId } = render(
      <Router>
        <BulkEditAccessPoints {...mockProps} />
      </Router>
    );

    const tableCell = getByTestId(`bulkEditTableCell-${mockProps.tableData[0].name}-cellSize`);
    fireEvent.click(tableCell);
    const input = getByTestId(`bulkEditFormInput-${mockProps.tableData[0].name}-cellSize`);
    fireEvent.change(input, { target: { value: 101 } });
    fireEvent.keyDown(input, ENTER);

    await waitFor(() => {
      expect(getByText('Cell Size can be a number between -100 and 100')).toBeVisible();
    });
  });

  it('error should be shown if Probe Response Threshold  input is outside range', async () => {
    const { getByText, getByTestId } = render(
      <Router>
        <BulkEditAccessPoints {...mockProps} />
      </Router>
    );

    const tableCell = getByTestId(
      `bulkEditTableCell-${mockProps.tableData[0].name}-probeResponseThreshold`
    );
    fireEvent.click(tableCell);
    const input = getByTestId(
      `bulkEditFormInput-${mockProps.tableData[0].name}-probeResponseThreshold`
    );
    fireEvent.change(input, { target: { value: 101 } });
    fireEvent.keyDown(input, ENTER);

    await waitFor(() => {
      expect(
        getByText('Probe Response Threshold can be a number between -100 and 100')
      ).toBeVisible();
    });
  });

  it('error should be shown if Client Disconnect Threshold input is outside range', async () => {
    const { getByText, getByTestId } = render(
      <Router>
        <BulkEditAccessPoints {...mockProps} />
      </Router>
    );

    const tableCell = getByTestId(
      `bulkEditTableCell-${mockProps.tableData[0].name}-clientDisconnectThreshold`
    );
    fireEvent.click(tableCell);
    const input = getByTestId(
      `bulkEditFormInput-${mockProps.tableData[0].name}-clientDisconnectThreshold`
    );
    fireEvent.change(input, { target: { value: 101 } });
    fireEvent.keyDown(input, ENTER);

    await waitFor(() => {
      expect(
        getByText('Client Disconnect Threshold can be a number between -100 and 100')
      ).toBeVisible();
    });
  });

  it('error should be shown if SNR (% Drop) input is outside range', async () => {
    const { getByText, getByTestId } = render(
      <Router>
        <BulkEditAccessPoints {...mockProps} />
      </Router>
    );

    const tableCell = getByTestId(`bulkEditTableCell-${mockProps.tableData[0].name}-snrDrop`);
    fireEvent.click(tableCell);
    const input = getByTestId(`bulkEditFormInput-${mockProps.tableData[0].name}-snrDrop`);
    fireEvent.change(input, { target: { value: 101 } });
    fireEvent.keyDown(input, ENTER);

    await waitFor(() => {
      expect(getByText('SNR (% Drop) can be a number between 1 and 100')).toBeVisible();
    });
  });

  it('error should be shown if Min Load input is outside range', async () => {
    const { getByText, getByTestId } = render(
      <Router>
        <BulkEditAccessPoints {...mockProps} />
      </Router>
    );

    const tableCell = getByTestId(`bulkEditTableCell-${mockProps.tableData[0].name}-minLoad`);
    fireEvent.click(tableCell);
    const input = getByTestId(`bulkEditFormInput-${mockProps.tableData[0].name}-minLoad`);
    fireEvent.change(input, { target: { value: 101 } });
    fireEvent.keyDown(input, ENTER);

    await waitFor(() => {
      expect(getByText('Min Load can be a number between 1 and 100')).toBeVisible();
    });
  });

  it('error should be shown if any input has an invalid configuration', async () => {
    const { getByText, getByTestId } = render(
      <Router>
        <BulkEditAccessPoints {...mockProps} />
      </Router>
    );

    const tableCell = getByTestId(`bulkEditTableCell-${mockProps.tableData[0].name}-minLoad`);
    fireEvent.click(tableCell);
    const input = getByTestId(`bulkEditFormInput-${mockProps.tableData[0].name}-minLoad`);
    fireEvent.change(input, { target: { value: '1,1,1,1,1' } });
    fireEvent.keyDown(input, ENTER);

    await waitFor(() => {
      expect(getByText('Please enter a valid configuration')).toBeVisible();
    });
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
