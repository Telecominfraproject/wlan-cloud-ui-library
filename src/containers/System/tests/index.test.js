import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup } from '@testing-library/react';
import { render } from 'tests/utils';
import System from '..';

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

const mockProps = {
  returnedOUI: {},
  onSearchOUI: () => {},
  onUpdateOUI: () => {},
};

describe('<System />', () => {
  afterEach(() => {
    cleanup();
  });

  it('Device Manufacturers tab should show the Device Manufacturers form  ', async () => {
    const { getByRole, getByText } = render(<System {...mockProps} />);

    fireEvent.click(getByRole('tab', { name: /Device Manufacturer/i }));

    const paragraph = getByText('Upload Manufacturer OUI Data');
    expect(paragraph).toBeVisible();
  });

  it('Firmware tab should show the Firmware form', async () => {
    const { getByRole, getByText } = render(<System {...mockProps} />);

    fireEvent.click(getByRole('tab', { name: /firmware/i }));

    const paragraph = getByText('Firmware Page');
    expect(paragraph).toBeVisible();
  });
});
