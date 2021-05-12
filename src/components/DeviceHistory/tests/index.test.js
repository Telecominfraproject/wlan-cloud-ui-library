import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import moment from 'moment';
import { fireEvent } from '@testing-library/react';
import { render } from 'tests/utils';
import DeviceHistoryChart from '..';

const mockProp = {
  width: 700,
  data: [
    {
      createdTimestamp: moment()
        .subtract(3, 'hour')
        .utc()
        .subtract(3, 'hour')
        .valueOf()
        .toString(),
      detailsJSON: { averageRxRate: 10, averageTxRate: 20 },
    },
    {
      createdTimestamp: moment()
        .subtract(3, 'hour')
        .utc()
        .subtract(3, 'hour')
        .valueOf()
        .toString(),
      detailsJSON: { averageRxRate: 10, averageTxRate: 20 },
    },
  ],
};

describe('<DeviceHistoryChart />', () => {
  it('tooltip should be visible on mouse-hover over chart', () => {
    const { container } = render(<DeviceHistoryChart {...mockProp} />);
    const chart = container.querySelector('.recharts-surface');
    fireEvent.mouseOver(chart);
  });
});
