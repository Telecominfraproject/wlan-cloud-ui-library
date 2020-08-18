import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from 'tests/utils';
import DeviceStatsCard from '..';

const mockProps = {
  title: 'Access Point',
  cardData: { 'In Service': 2, 'Total Provisioned': 50, 'With Clients': 2 },
};

describe('<DeviceStatsCard />', () => {
  it('Should Render DeviceStatsCard', async () => {
    const { getByText } = render(<DeviceStatsCard {...mockProps} />);
    expect(getByText('Access Point')).toBeVisible();
  });
});
