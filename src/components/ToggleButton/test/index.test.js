import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from 'tests/utils';
import ToggleButton from '..';
import styles from '../index.module.scss';

describe('<ToggleButton />', () => {
  afterEach(cleanup);

  const clientDevices = '/network/client-devices';
  const accessPoints = '/network/access-points';

  it('finds css className for clientDevices', () => {
    const { getByTestId } = render(
      <Router>
        <ToggleButton activeTab={clientDevices} />
      </Router>
    );
    expect(getByTestId('clientDevices')).toHaveClass(styles.activeBtn, { exact: true });
    expect(getByTestId('accessPoints')).toHaveClass('', { exact: true });
  });

  it('finds css className for accessPoints', () => {
    const { getByTestId } = render(
      <Router>
        <ToggleButton activeTab={accessPoints} />
      </Router>
    );
    expect(getByTestId('clientDevices')).toHaveClass('', { exact: true });
    expect(getByTestId('accessPoints')).toHaveClass(styles.activeBtn, { exact: true });
  });

  it('URL changes to /network/access-points on clicking Access Points Link', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <ToggleButton activeTab={clientDevices} />
      </Router>
    );
    fireEvent.click(getByText(/access points/i));
    expect(window.location.pathname).toEqual('/network/access-points');
  });

  it('URL changes to /network/client-devices on clicking Client Devices Link', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <ToggleButton activeTab={clientDevices} />
      </Router>
    );
    fireEvent.click(getByText(/client devices/i));
    expect(window.location.pathname).toEqual('/network/client-devices');
  });
});
