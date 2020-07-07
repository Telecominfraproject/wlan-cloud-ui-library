import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';
import { render } from 'tests/utils';
import HighChartGraph from '..';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const osData = [
  {
    details: {
      apPerformance: {
        freeMemory: 0,
        cpuTemperature: 0,
        cpuUtilized: [0],
      },
    },
  },
];
describe('<HighChartGraph />', () => {
  afterEach(cleanup);

  it('HighChartGraph', async () => {
    const div = document.createElement('div');
    render(<HighChartGraph osData={osData} />, div);
  });
});
