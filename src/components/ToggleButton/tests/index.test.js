import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from 'tests/utils';
import ToggleButton from '..';
import styles from '../index.module.scss';

describe('<ToggleButton />', () => {
  const clientDevices = '/network/client-devices';
  const accessPoints = '/network/access-points';

  it('finds css className for clientDevices', () => {
    const { getByRole } = render(
      <Router>
        <ToggleButton activeTab={clientDevices} />
      </Router>
    );
    expect(getByRole('button', { name: /client devices/i })).toHaveClass(styles.activeBtn);
    expect(getByRole('button', { name: /access points/i })).not.toHaveClass(styles.activeBtn);
  });

  it('finds css className for accessPoints', () => {
    const { getByRole } = render(
      <Router>
        <ToggleButton activeTab={accessPoints} />
      </Router>
    );
    expect(getByRole('button', { name: /client devices/i })).not.toHaveClass(styles.activeBtn);
    expect(getByRole('button', { name: /access points/i })).toHaveClass(styles.activeBtn);
  });

  it('URL changes to /network/access-points on clicking Access Points Link', () => {
    const history = createMemoryHistory();
    const { getByRole } = render(
      <Router history={history}>
        <ToggleButton activeTab={clientDevices} />
      </Router>
    );
    fireEvent.click(getByRole('button', { name: /access points/i }));
    expect(window.location.pathname).toEqual('/network/access-points');
  });

  it('URL changes to /network/client-devices on clicking Client Devices Link', () => {
    const history = createMemoryHistory();
    const { getByRole } = render(
      <Router history={history}>
        <ToggleButton activeTab={clientDevices} />
      </Router>
    );
    fireEvent.click(getByRole('button', { name: /client devices/i }));
    expect(window.location.pathname).toEqual('/network/client-devices');
  });
});
