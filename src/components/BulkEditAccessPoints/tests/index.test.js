import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent } from '@testing-library/react';
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
  tableColumns: [],
  tableData: [],
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

  it('onSaveChanges should be called when Save Changes button is clicked', () => {
    const onSaveChangesSpy = jest.fn();
    const { getByRole } = render(
      <Router>
        <BulkEditAccessPoints {...mockProps} onSaveChanges={onSaveChangesSpy} />
      </Router>
    );
    fireEvent.click(getByRole('button', { name: /save changes/i }));
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
