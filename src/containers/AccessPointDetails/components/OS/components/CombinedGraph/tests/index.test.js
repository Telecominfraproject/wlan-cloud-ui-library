import React from 'react';
import '@testing-library/jest-dom/extend-expect';
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

const osData = {
  loading: false,
  data: [
    {
      details: {
        apPerformance: {
          freeMemory: 0,
          cpuTemperature: 0,
          cpuUtilized: [0],
        },
      },
    },
  ],
};

describe('<HighChartGraph />', () => {
  it('Render HighChartGraph', async () => {
    render(<HighChartGraph osData={osData} />);
  });

  it('should work with deatils object null', async () => {
    const data = {
      loading: false,
      data: [{ details: null }],
    };
    render(<HighChartGraph osData={data} />);
  });

  it('should work with deatils object null', async () => {
    render(<HighChartGraph osData={osData} />);
  });

  it('should work with loading true', async () => {
    render(<HighChartGraph osData={{ loading: true }} />);
  });
});
