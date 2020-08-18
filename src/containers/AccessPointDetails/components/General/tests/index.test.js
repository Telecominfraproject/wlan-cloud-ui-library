import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, waitForElement, waitFor } from '@testing-library/react';
import { render } from 'tests/utils';
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

const DOWN_ARROW = { keyCode: 40 };

describe('<General />', () => {
  afterEach(() => {
    cleanup();
  });

  it('changing the access point profile should update table', async () => {
    const { getByText, getByLabelText } = render(<General {...defaultProps} />);

    const apProfile = getByLabelText('Access Point Profile');

    fireEvent.keyDown(apProfile, DOWN_ARROW);
    await waitForElement(() => getByText('EnterpriseApProfile'));
    fireEvent.click(getByText('EnterpriseApProfile'));

    await waitFor(() => {
      expect(getByText('TipWlan-cloud-Enterprise')).toBeVisible();
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

  it('handleSubmit should  be called if access point name is entered on general tab', async () => {
    const submitSpy = jest.fn();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <General {...defaultProps} onUpdateEquipment={submitSpy} />
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

  it(' handleSubmit should  be called if advanced settings are filled', async () => {
    const submitSpy = jest.fn();
    const { getByRole } = render(<General {...defaultProps} onUpdateEquipment={submitSpy} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('RTS/CTS threshold value must be positive for the is2dot4GHz setting', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter RTS/CTS threshold for is2dot4GHz'), {
      target: { value: -101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('0 - 65535 (Bytes)')).toBeVisible();
    });
  });

  it('RTS/CTS threshold value must be positive for the is5GHzU setting', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter RTS/CTS threshold for is5GHzU'), {
      target: { value: -101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('0 - 65535 (Bytes)')).toBeVisible();
    });
  });

  it('RTS/CTS threshold value must be positive for the is5GHzL setting', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter RTS/CTS threshold for is5GHzL'), {
      target: { value: -101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('0 - 65535 (Bytes)')).toBeVisible();
    });
  });

  it('error if the maximum device exceeds 100 for the is2dot4GHz setting ', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Maximum Devices for is2dot4GHz'), {
      target: { value: -1 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('0 - 100')).toBeVisible();
    });
  });

  it('error if the maximum device exceeds 100 for the is5GHzU setting ', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Maximum Devices for is5GHzU'), {
      target: { value: 101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('0 - 100')).toBeVisible();
    });
  });

  it('error if the maximum device exceeds 100 for the is5GHzL setting ', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Maximum Devices for is5GHzL'), {
      target: { value: 101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('0 - 100')).toBeVisible();
    });
  });

  it('error if the minimum signal exceeds bounds for the is2dot4GHz setting ', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Minimum Signal for is2dot4GHz'), {
      target: { value: 101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('-90 - -50 dB')).toBeVisible();
    });
  });

  it('error if the minimum signal exceeds bounds for the is5GHzU setting ', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Minimum Signal for is5GHzU'), {
      target: { value: 101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('-90 - -50 dB')).toBeVisible();
    });
  });

  it('error if the minimum signal exceeds bounds for the is5GHzL setting ', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Minimum Signal for is5GHzL'), {
      target: { value: 101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('-90 - -50 dB')).toBeVisible();
    });
  });

  it('error if the maximum number of neighbours exceeds 512 for the is2dot4GHz setting ', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Maximum APs for is2dot4GHz'), {
      target: { value: 513 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('0 - 512 APs')).toBeVisible();
    });
  });

  it('error if the maximum number of neighbours exceeds 512 for the is5GHzL setting ', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Maximum APs for is5GHzL'), {
      target: { value: 513 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('0 - 512 APs')).toBeVisible();
    });
  });

  it('error if the maximum number of neighbours exceeds 512 for the is5GHzU setting ', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Maximum APs for is5GHzU'), {
      target: { value: 513 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('0 - 512 APs')).toBeVisible();
    });
  });

  it('error if the noise floorl exceeds bounds for the is2dot4GHz setting ', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Noise Floor (db) for is2dot4GHz'), {
      target: { value: 101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('-90 - -10 dB')).toBeVisible();
    });
  });

  it('error if the noise floor exceeds bounds for the is5GHzU setting ', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Noise Floor (db) for is5GHzU'), {
      target: { value: 101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('-90 - -10 dB')).toBeVisible();
    });
  });

  it('error if the noise floor exceeds bounds for the is5GHzL setting ', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Noise Floor (db) for is5GHzL'), {
      target: { value: 650 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('-90 - -10 dB')).toBeVisible();
    });
  });

  it('error if the noise floor time exceeds bounds for the is2dot4GHz setting ', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Noise Floor Time (secs) for is2dot4GHz'), {
      target: { value: 650 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('120 - 600 seconds')).toBeVisible();
    });
  });

  it('error if the noise floor time exceeds bounds for the is5GHzU setting ', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Noise Floor Time (secs) for is5GHzU'), {
      target: { value: 119 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('120 - 600 seconds')).toBeVisible();
    });
  });

  it('error if the noise floor time exceeds bounds for the is5GHzL setting ', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Noise Floor Time (secs) for is5GHzL'), {
      target: { value: 601 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('120 - 600 seconds')).toBeVisible();
    });
  });

  it('error if the steering threshold exceeds bounds for the is2dot4GHz setting ', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter SNR (% Drop) for is2dot4GHz'), {
      target: { value: -1 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('0 - 100%')).toBeVisible();
    });
  });

  it('error if the steering threshold exceeds bounds for the is5GHzU setting ', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter SNR (% Drop) for is5GHzU'), {
      target: { value: 101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('0 - 100%')).toBeVisible();
    });
  });

  it('error if the steering threshold exceeds bounds for the is5GHzL setting ', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter SNR (% Drop) for is5GHzL'), {
      target: { value: 101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('0 - 100%')).toBeVisible();
    });
  });

  it('error if the minimum load percentage exceeds bounds for the is2dot4GHz setting ', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Min Load (%) for is2dot4GHz'), {
      target: { value: -1 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('0 - 100%')).toBeVisible();
    });
  });

  it('error if the minimum load percentage exceeds bounds for the is5GHzU setting ', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Min Load (%) for is5GHzU'), {
      target: { value: 101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('0 - 100%')).toBeVisible();
    });
  });

  it('error if the minimum load percentage exceeds bounds for the is5GHzL setting ', async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(<General {...defaultProps} />);

    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Min Load (%) for is5GHzL'), {
      target: { value: 101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('0 - 100%')).toBeVisible();
    });
  });
  it('loadingProfiles should show loading spinner', async () => {
    const { getByTestId } = render(<General loadingProfiles />);

    await waitFor(() => {
      expect(getByTestId('loadingProfiles')).toBeInTheDocument();
    });
  });

  it('errorProfiles should show error alert', async () => {
    const { getByTestId } = render(<General loadingProfiles={false} errorProfiles />);

    await waitFor(() => {
      expect(getByTestId('errorProfiles')).toBeInTheDocument();
    });
  });
});
