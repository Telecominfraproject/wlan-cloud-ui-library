import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from 'tests/utils';
import LineChart from '..';

describe('<DeviceStatsCard />', () => {
  it('Should Render LineChart with simple data', async () => {
    const mockProps = {
      title: 'Inservice APs (24 hours)',
      data: {
        key: 'Inservice APs',
        value: [
          [1596653473418, 10],
          [1596653485482, 20],
        ],
      },
      options: { formatter: jest.fn(), tooltipFormatter: jest.fn() },
    };
    const { getByText } = render(<LineChart {...mockProps} />);
    expect(getByText('Inservice APs (24 hours)')).toBeVisible();
  });

  it('Should Render LineChart with object of data', async () => {
    const mockProps = {
      title: 'Client Devices (24 hours)',
      data: {
        first: {
          key: 1,
          value: [
            [1596653473418, 10],
            [1596653485482, 20],
          ],
        },
      },
    };
    const { getByText } = render(<LineChart {...mockProps} />);
    expect(getByText('Client Devices (24 hours)')).toBeVisible();
  });
});
