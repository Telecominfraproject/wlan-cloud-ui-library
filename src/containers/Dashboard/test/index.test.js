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
  lineChartData: [
    {
      timestamp: 0,
    },
  ],
  lineChartConfig: [
    {
      key: 'service',
      title: 'Inservice APs (24 hours)',
      lines: [{ key: 'inServiceAps', name: 'Inservice APs' }],
    },
    {
      key: 'clientDevices',
      title: 'Client Devices (24 hours)',
      lines: [
        { key: 'clientDevices2dot4GHz', name: '2.4GHz' },
        { key: 'clientDevices5GHz', name: '5GHz' },
      ],
    },
    {
      key: 'traffic',
      title: 'Traffic - 5 min intervals (24 hours)',
      lines: [
        { key: 'trafficBytesDownstreamData', name: 'Downstream' },
        { key: 'trafficBytesUpstreamData', name: 'Upstream' },
      ],
      options: { formatter: jest.fn(), trafficTooltipFormatter: jest.fn() },
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
});
