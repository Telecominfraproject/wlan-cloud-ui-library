import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from 'tests/utils';
import { defaultProps as mockProps } from '../../../tests/constants';
import OS from '..';

describe('<OS />', () => {
  it('should work with default props', async () => {
    render(<OS {...mockProps} />);
  });

  it('should work when detailsJSON object have few null values ', async () => {
    const mockDetails = {
      ...mockProps,
      data: {
        ...mockProps.data,
        status: {
          ...mockProps.data.status,
          osPerformance: {
            ...mockProps.data.status.osPerformance,
            detailsJSON: {
              ...mockProps.data.status.osPerformance.detailsJSON,
              avgFreeMemoryKb: null,
              totalAvailableMemoryKb: null,
              avgCpuUtilization: null,
              avgCpuTemperature: null,
              uptimeInSeconds: 3661,
            },
          },
        },
      },
    };
    render(<OS {...mockDetails} />);
  });

  it('should work with different time for uptimeInSeconds', async () => {
    const mockDetails = {
      ...mockProps,
      data: {
        ...mockProps.data,
        status: {
          ...mockProps.data.status,
          osPerformance: {
            ...mockProps.data.status.osPerformance,
            detailsJSON: {
              ...mockProps.data.status.osPerformance.detailsJSON,
              avgFreeMemoryKb: null,
              totalAvailableMemoryKb: null,
              avgCpuUtilization: null,
              avgCpuTemperature: null,
              uptimeInSeconds: 2 * 3600,
            },
          },
        },
      },
    };
    render(<OS {...mockDetails} />);
  });

  it('should work when data object is empty', async () => {
    const mockDetails = {
      ...mockProps,
      data: {},
    };
    render(<OS {...mockDetails} />);
  });
});
