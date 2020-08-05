import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from 'tests/utils';
import Dashboard from '..';

const mockProps = {
  statsCardDetails: [
    { title: 'Access Point', 'Total Provisioned': 50, 'In Service': 2, 'With Clients': 2 },
    { title: 'Client Devices', 'Total Associated': 1750, '2.4GHz': 500, ' 5GHz': 1250 },
    {
      title: 'Usage Information',
      'Total Traffic (US)': '57.86 MB',
      'Total Traffic (DS)': '72.72 MB',
    },
  ],
  pieChartDetails: [
    { title: 'AP Vendors', 'KodaCloud Canada Inc.': 50, 'Edgecore Networks Corporation': 2 },
    { title: 'Client Vendors', 'Xerox Corporation': 38, '0F0F0F': 42 },
  ],
  lineChartData: {
    clientDevices: {
      is2dot4GHz: { key: '2.4GHz', value: Array(0) },
      is5GHz: { key: '5GHz', value: Array(0) },
    },
    inservicesAPs: { key: 'Inservice APs', value: Array(0) },
    traffic: {
      trafficBytesDownstream: { key: 'Down Stream', value: Array(0) },
      trafficBytesUpstream: { key: 'Up Stream', value: Array(0) },
    },
  },
  lineChartConfig: [
    { key: 'inservicesAPs', title: 'Inservice APs (24 hours)' },
    { key: 'clientDevices', title: 'Client Devices (24 hours)' },
    {
      key: 'traffic',
      title: 'Traffic (24 hours)',
      options: { formatter: jest.fn(), tooltipFormatter: jest.fn() },
    },
  ],
  lineChartLoading: false,
};

describe('<Dashboard />', () => {
  it('Should render stats cards, line charts and pie charts', async () => {
    const { getByText } = render(<Dashboard {...mockProps} />);
    expect(getByText('Access Point')).toBeVisible();
    expect(getByText('Client Devices')).toBeVisible();
    expect(getByText('Inservice APs (24 hours)')).toBeVisible();
    expect(getByText('Client Devices (24 hours)')).toBeVisible();
    expect(getByText('AP Vendors')).toBeVisible();
    expect(getByText('Client Vendors')).toBeVisible();
  });

  it('should not render line charts when loading is true', async () => {
    const { queryByText, getByText } = render(<Dashboard {...mockProps} lineChartLoading />);
    expect(getByText('Access Point')).toBeVisible();
    expect(getByText('Client Devices')).toBeVisible();
    expect(queryByText('Inservice APs (24 hours)')).not.toBeInTheDocument();
    expect(queryByText('Client Devices (24 hours)')).not.toBeInTheDocument();
    expect(getByText('AP Vendors')).toBeVisible();
    expect(getByText('Client Vendors')).toBeVisible();
  });
});
