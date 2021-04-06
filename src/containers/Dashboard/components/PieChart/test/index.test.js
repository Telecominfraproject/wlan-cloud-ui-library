import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from 'tests/utils';
import PieChart from '..';

describe('<PieChart />', () => {
  it('Should Render PieChart with valid data', async () => {
    const mockProps = {
      title: 'AP Vendors',
      chartData: { 'Edgecore Networks Corporation': 2, 'KodaCloud Canada Inc.': 50 },
    };
    const { getByText } = render(<PieChart {...mockProps} />);
    expect(getByText('AP Vendors')).toBeVisible();
  });

  it('Should not Render PieChart without data', async () => {
    const mockProps = {
      title: 'Pie Chart',
      chartData: {},
    };
    const { getByText } = render(<PieChart {...mockProps} />);
    expect(getByText('No Data')).toBeVisible();
  });
});
