import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'tests/utils';
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
  isLastPage: false,
};
describe('<BulkEditAccessPoints />', () => {
  afterEach(cleanup);
  const URL = '/network/access-points';

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
});
