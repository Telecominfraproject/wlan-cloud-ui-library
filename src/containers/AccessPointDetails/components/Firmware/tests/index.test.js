import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, waitForElement, waitFor } from '@testing-library/react';
import { render } from 'tests/utils';
import { firmware } from '../../../tests/constants';
import Firmware from '..';

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

const DOWN_ARROW = { keyCode: 40 };

describe('<Firmware />', () => {
  afterEach(() => {
    cleanup();
  });

  it('firmware tab should show the change the target version on user input', async () => {
    const { getByText, getByRole } = render(<Firmware firmware={firmware} />);

    const paragraph = getByText('Upgrade');
    expect(paragraph).toBeVisible();

    const targetVersion = getByRole('combobox');

    fireEvent.keyDown(targetVersion, DOWN_ARROW);
    await waitForElement(() => getByText('ap2220-2020-06-25-ce03472'));
    fireEvent.click(getByText('ap2220-2020-06-25-ce03472'));
  });

  it('reboot button should show the reboot model', async () => {
    const { getByText, getByRole } = render(<Firmware firmware={firmware} />);

    const paragraph = getByText('Upgrade');
    expect(paragraph).toBeVisible();

    const targetVersion = getByRole('combobox');

    fireEvent.keyDown(targetVersion, DOWN_ARROW);
    await waitForElement(() => getByText('ap2220-2020-06-25-ce03472'));
    fireEvent.click(getByText('ap2220-2020-06-25-ce03472'));

    fireEvent.click(getByRole('button', { name: /download Download, Flash, and Reboot/i }));

    expect(getByText('Confirm')).toBeVisible();
  });

  it('cancel button should hide the reboot model', async () => {
    const { getByText, getByRole } = render(<Firmware firmware={firmware} />);

    const paragraph = getByText('Upgrade');
    expect(paragraph).toBeVisible();

    const targetVersion = getByRole('combobox');

    fireEvent.keyDown(targetVersion, DOWN_ARROW);
    await waitForElement(() => getByText('ap2220-2020-06-25-ce03472'));
    fireEvent.click(getByText('ap2220-2020-06-25-ce03472'));

    fireEvent.click(getByRole('button', { name: /download Download, Flash, and Reboot/i }));
    expect(getByText('Confirm')).toBeVisible();

    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(getByText('Confirm')).not.toBeVisible();
    });
  });

  it('reboot button should show the reboot model', async () => {
    const submitSpy = jest.fn();
    const { getByText, getByRole } = render(
      <Firmware firmware={firmware} onUpdateEquipmentFirmware={submitSpy} />
    );

    const paragraph = getByText('Upgrade');
    expect(paragraph).toBeVisible();

    const targetVersion = getByRole('combobox');

    fireEvent.keyDown(targetVersion, DOWN_ARROW);
    await waitForElement(() => getByText('ap2220-2020-06-25-ce03472'));
    fireEvent.click(getByText('ap2220-2020-06-25-ce03472'));

    fireEvent.click(getByRole('button', { name: /download Download, Flash, and Reboot/i }));

    expect(getByText('Confirm')).toBeVisible();

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalled();
    });
  });
});
