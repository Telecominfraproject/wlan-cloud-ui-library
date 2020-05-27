import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
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
    const clientDevicesElement = getByTestId('clientDevices');
    const accessPointsElement = getByTestId('accessPoints');
    expect(clientDevicesElement).toHaveClass(styles.activeBtn, { exact: true });
    expect(accessPointsElement).toHaveClass('', { exact: true });
  });

  it('finds css className for accessPoints', () => {
    const { getByTestId } = render(
      <Router>
        <ToggleButton activeTab={accessPoints} />
      </Router>
    );
    const clientDevicesElement = getByTestId('clientDevices');
    const accessPointsElement = getByTestId('accessPoints');
    expect(clientDevicesElement).toHaveClass('', { exact: true });
    expect(accessPointsElement).toHaveClass(styles.activeBtn, { exact: true });
  });
});
