import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, waitForElement, waitFor } from '@testing-library/react';
import { render, DOWN_ARROW } from 'tests/utils';
import { defaultProps } from '../../../tests/constants';
import General from '..';

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

describe('<General />', () => {
  it('changing the access point profile should update table', async () => {
    const { getByText, getByLabelText, getAllByText } = render(<General {...defaultProps} />);

    const apProfile = getByLabelText('Access Point Profile');

    const profileName = defaultProps.profiles[0].name;

    fireEvent.keyDown(apProfile, DOWN_ARROW);
    await waitForElement(() => getByText(profileName));
    fireEvent.click(getByText(profileName));

    await waitFor(() => {
      expect(getAllByText(profileName)[0]).toBeVisible();
    });
  });

  it('handleSubmit should not be called if access point name is empty on general tab', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.change(getByPlaceholderText('Enter Access Point Name'), {
      target: { value: null },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('Enter the Access Point name')).toBeVisible();
    });
  });

  it('handleSubmit should be called if access point name is entered on general tab', async () => {
    const submitSpy = jest.fn();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <General {...defaultProps} handleOnEquipmentSave={submitSpy} />
    );

    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();

    fireEvent.change(getByPlaceholderText('Enter Access Point Name'), {
      target: { value: 'testName' },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('advanced setting tab should load on clicking the dropdown ', async () => {
    const { getByText, getByRole } = render(<General {...defaultProps} />);

    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
    fireEvent.click(getByRole('button', { name: /settings/i }));
  });

  it('handleSubmit should be called if advanced settings are filled', async () => {
    const submitSpy = jest.fn();
    const { getByRole } = render(<General {...defaultProps} handleOnEquipmentSave={submitSpy} />);

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('errorProfiles should show error alert', async () => {
    const { getByTestId } = render(<General loadingProfiles={false} errorProfiles />);

    await waitFor(() => {
      expect(getByTestId('errorProfiles')).toBeInTheDocument();
    });
  });

  // Rx Cell Size
  it('error if the rx cell size exceeds bounds for the 2.4GHz setting', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Rx Cell Size for 2.4GHz'), {
      target: { value: 101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('-100 - 100 dBm')).toBeVisible();
    });
  });
  it('error if the rx cell size exceeds bounds for the 5GHz (U) setting', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Rx Cell Size for 5GHz (U)'), {
      target: { value: -101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('-100 - 100 dBm')).toBeVisible();
    });
  });
  it('error if the rx cell size exceeds bounds for the 5GHz (L) setting', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Rx Cell Size for 5GHz (L)'), {
      target: { value: 101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('-100 - 100 dBm')).toBeVisible();
    });
  });

  // Probe response threshold
  it('error if the probe response threshold exceeds bounds for the 2.4GHz setting', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Probe Response Threshold for 2.4GHz'), {
      target: { value: 101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('-100 - 100 dBm')).toBeVisible();
    });
  });
  it('error if the probe response threshold exceeds bounds for the 5GHz (U) setting', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Probe Response Threshold for 5GHz (U)'), {
      target: { value: -101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('-100 - 100 dBm')).toBeVisible();
    });
  });
  it('error if the probe response threshold exceeds bounds for the 5GHz (L) setting', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Probe Response Threshold for 5GHz (L)'), {
      target: { value: 101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('-100 - 100 dBm')).toBeVisible();
    });
  });

  // Client disconnect threshold
  it('error if the client disconnect threshold exceeds bounds for the 2.4GHz setting', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Client Disconnect Threshold for 2.4GHz'), {
      target: { value: 101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('-100 - 0 dBm')).toBeVisible();
    });
  });
  it('error if the client disconnect threshold exceeds bounds for the 5GHz (U) setting', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Client Disconnect Threshold for 5GHz (U)'), {
      target: { value: -101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('-100 - 0 dBm')).toBeVisible();
    });
  });
  it('error if the client disconnect threshold exceeds bounds for the 5GHz (L) setting', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Client Disconnect Threshold for 5GHz (L)'), {
      target: { value: 101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('-100 - 0 dBm')).toBeVisible();
    });
  });

  // Eirp TX power
  it('error if the eirp tx power exceeds bounds for the 2.4GHz setting', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter EIRP Tx Power for 2.4GHz'), {
      target: { value: 101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('1 - 32 dBm')).toBeVisible();
    });
  });
  it('error if the eirp tx power exceeds bounds for the 5GHz (U) setting', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter EIRP Tx Power for 5GHz (U)'), {
      target: { value: -101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('1 - 32 dBm')).toBeVisible();
    });
  });
  it('error if the eirp tx power exceeds bounds for the 5GHz (L) setting', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter EIRP Tx Power for 5GHz (L)'), {
      target: { value: 101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('1 - 32 dBm')).toBeVisible();
    });
  });

  // Min load
  it('error if the minimum load percentage exceeds bounds for the 2.4GHz setting', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Min Load for 2.4GHz'), {
      target: { value: -1 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('0 - 100%')).toBeVisible();
    });
  });
  it('error if the minimum load percentage exceeds bounds for the 5GHz (U) setting', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Min Load for 5GHz (U)'), {
      target: { value: 101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('0 - 100%')).toBeVisible();
    });
  });
  it('error if the minimum load percentage exceeds bounds for the 5GHz (L) setting', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Min Load for 5GHz (L)'), {
      target: { value: 101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('0 - 100%')).toBeVisible();
    });
  });

  // Snr
  it('error if the snr percentage drop exceeds bounds for the 2.4GHz setting', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter SNR for 2.4GHz'), {
      target: { value: -1 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('0 - 100%')).toBeVisible();
    });
  });
  it('error if the snr percentage drop exceeds bounds for the 5GHz (U) setting', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter SNR for 5GHz (U)'), {
      target: { value: 101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('0 - 100%')).toBeVisible();
    });
  });

  it('error if the snr percentage drop exceeds bounds for the 5GHz (L) setting', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter SNR for 5GHz (L)'), {
      target: { value: 101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('0 - 100%')).toBeVisible();
    });
  });

  it('Active channel field should be disabled if autoChannelSelection setting is enabled', async () => {
    const { getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    const input = getByPlaceholderText('Enter Active Channel for 2.4GHz');
    expect(input).toBeDisabled();
  });

  it('Backup channel field should be disabled if autoChannelSelection setting is enabled', async () => {
    const { getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    const input = getByPlaceholderText('Enter Backup Channel for 2.4GHz');
    expect(input).toBeDisabled();
  });

  it('error if active channel input exceends bounds', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Active Channel for 5GHz (L)'), {
      target: { value: 166 },
    });

    await waitFor(() => {
      expect(getByText('1 - 165')).toBeVisible();
    });
  });

  it('error if backup channel input exceends bounds', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Backup Channel for 5GHz (U)'), {
      target: { value: 166 },
    });

    await waitFor(() => {
      expect(getByText('1 - 165')).toBeVisible();
    });
  });

  it('error if active and backup channel inputs are the same', async () => {
    const { getByText, getByRole, getByPlaceholderText, queryByText } = render(
      <General {...defaultProps} />
    );

    fireEvent.click(getByRole('button', { name: /settings/i }));

    const input = getByPlaceholderText('Enter Backup Channel for 5GHz (L)');
    fireEvent.change(input, {
      target: { value: defaultProps.data.details.radioMap.is5GHzL.manualChannelNumber },
    });

    await waitFor(() => {
      expect(getByText('Active and backup channels must be different')).toBeVisible();
    });

    fireEvent.change(input, {
      target: { value: 39 },
    });

    await waitFor(() => {
      expect(queryByText('Active and backup channels must be different')).not.toBeInTheDocument();
    });
  });
});
