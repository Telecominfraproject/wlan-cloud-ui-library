import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, waitFor, waitForElement } from '@testing-library/react';
import { render, DOWN_ARROW } from 'tests/utils';
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

const defaultProps = {
  loadingFirmware: false,
};

describe('<Firmware />', () => {
  it('firmware should Render Without Data', async () => {
    const { getByText } = render(<Firmware firmware={firmware} {...defaultProps} />);

    const paragraph = getByText('Upgrade');
    expect(paragraph).toBeVisible();
  });
  it('firmware should Render with Data and upgradeState is out_of_date', async () => {
    const data = {
      status: {
        firmware: { detailsJSON: { id: 1, upgradeState: 'out_of_date' } },
      },
    };
    const { getByText } = render(<Firmware data={data} firmware={firmware} {...defaultProps} />);

    const paragraph = getByText('Upgrade');
    expect(paragraph).toBeVisible();
  });
  it('firmware should Render with Data and upgradeState is up_to_date', async () => {
    const data = {
      status: {
        firmware: { detailsJSON: { id: 1, upgradeState: 'up_to_date' } },
      },
    };
    const { getByText } = render(<Firmware data={data} firmware={firmware} {...defaultProps} />);

    const paragraph = getByText('Upgrade');
    expect(paragraph).toBeVisible();
  });

  it('firmware should Render with Data and upgradeState is apply_complete', async () => {
    const data = {
      status: {
        firmware: { detailsJSON: { id: 1, upgradeState: 'apply_complete' } },
      },
    };
    const { getByText } = render(<Firmware data={data} firmware={firmware} {...defaultProps} />);

    const paragraph = getByText('Upgrade');
    expect(paragraph).toBeVisible();
  });
  it('firmware tab should show the change the target version on user input', async () => {
    const data = {
      status: {
        firmware: { detailsJSON: { id: 1 } },
      },
    };
    const { getByText, getByRole } = render(
      <Firmware data={data} firmware={firmware} {...defaultProps} />
    );

    const paragraph = getByText('Upgrade');
    expect(paragraph).toBeVisible();

    const targetVersion = getByRole('combobox');

    fireEvent.keyDown(targetVersion, DOWN_ARROW);

    await waitForElement(() => getByText(firmware[0].versionName));
    fireEvent.click(getByText(firmware[0].versionName));
  });

  it('cancel button should hide the reboot model', async () => {
    const data = {
      status: {
        firmware: { detailsJSON: { id: 1 } },
      },
    };
    const { getByText, getByRole, queryByText } = render(
      <Firmware data={data} firmware={firmware} {...defaultProps} />
    );

    const paragraph = getByText('Upgrade');
    expect(paragraph).toBeVisible();

    const targetVersion = getByRole('combobox');

    fireEvent.keyDown(targetVersion, DOWN_ARROW);
    await waitForElement(() => getByText(firmware[0].versionName));
    fireEvent.click(getByText(firmware[0].versionName));

    fireEvent.click(getByRole('button', { name: /download Download, Flash, and Reboot/i }));
    expect(getByText('Confirm downloading, flashing, rebooting?')).toBeVisible();

    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(queryByText('Confirm downloading, flashing, rebooting?')).not.toBeInTheDocument();
    });
  });

  it('reboot button should show the reboot model', async () => {
    const submitSpy = jest.fn();
    const data = {
      status: {
        firmware: { detailsJSON: { id: 1 } },
      },
    };
    const { getByText, getByRole } = render(
      <Firmware
        firmware={firmware}
        data={data}
        handleOnFirmwareSave={submitSpy}
        {...defaultProps}
      />
    );

    const targetVersion = getByRole('combobox');

    fireEvent.keyDown(targetVersion, DOWN_ARROW);
    await waitForElement(() => getByText(firmware[0].versionName));
    fireEvent.click(getByText(firmware[0].versionName));

    fireEvent.click(getByRole('button', { name: /download Download, Flash, and Reboot/i }));

    expect(getByText('Confirm downloading, flashing, rebooting?')).toBeVisible();

    fireEvent.click(getByRole('button', { name: 'Confirm' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalled();
    });
  });
  it('reboot button should show the reboot model with default function ', async () => {
    const data = {
      status: {
        firmware: { detailsJSON: { id: 1 } },
      },
    };
    const { getByText, getByRole } = render(
      <Firmware data={data} firmware={firmware} {...defaultProps} />
    );

    const paragraph = getByText('Upgrade');
    expect(paragraph).toBeVisible();

    const targetVersion = getByRole('combobox');

    fireEvent.keyDown(targetVersion, DOWN_ARROW);
    await waitForElement(() => getByText(firmware[0].versionName));
    fireEvent.click(getByText(firmware[0].versionName));

    fireEvent.click(getByRole('button', { name: /download Download, Flash, and Reboot/i }));

    expect(getByText('Confirm downloading, flashing, rebooting?')).toBeVisible();

    fireEvent.click(getByRole('button', { name: 'Confirm' }));
  });

  it('errorFirmware should show error alert', async () => {
    const { getByTestId } = render(
      <Firmware firmware={firmware} loadingFirmware={false} errorFirmware={{ test: 'test' }} />
    );

    await waitFor(() => {
      expect(getByTestId('errorFirmware')).toBeInTheDocument();
    });
  });
});
