import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';
import { render } from 'tests/utils';
import Timer from '..';

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

jest.useFakeTimers();

describe('<Timer />', () => {
  afterEach(cleanup);

  it('timer refreshes after 59 seconds', async () => {
    const refreshSpy = jest.fn();
    render(<Timer handleRefresh={refreshSpy} />);

    expect(refreshSpy).not.toBeCalled();

    jest.advanceTimersByTime(60000);

    expect(refreshSpy).toBeCalled();
    expect(refreshSpy).toHaveBeenCalledTimes(1);
  });
});
