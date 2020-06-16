import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen } from '@testing-library/dom';

import { render } from 'tests/utils';

import DeviceDetailCard from '..';

describe('<DeviceDetailCard />', () => {
  it('should show Status when passed', () => {
    render(<DeviceDetailCard status="test" />);
    expect(screen.getByText('test')).toBeVisible();
  });
});
