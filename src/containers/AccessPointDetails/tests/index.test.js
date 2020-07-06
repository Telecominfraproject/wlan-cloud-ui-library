import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from 'tests/utils';
import { defaultProps, firmware } from './constants';
import AccessPointDetails from '..';

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

describe('<AccessPointDetails />', () => {
  afterEach(() => {
    cleanup();
  });

  it('general tab should show the general form', async () => {
    const history = createMemoryHistory();

    const { getByRole, getByText } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} />
      </Router>
    );

    fireEvent.click(getByRole('tab', { name: /general/i }));

    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
  });

  it('status tab should show the status form', async () => {
    const history = createMemoryHistory();

    const { getByRole, getByText } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} />
      </Router>
    );

    fireEvent.click(getByRole('tab', { name: /status/i }));

    const paragraph = getByText('Noise Floor');
    expect(paragraph).toBeVisible();
  });

  it('os tab should show the os form', async () => {
    const history = createMemoryHistory();

    const { getByRole, getByText } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} />
      </Router>
    );

    fireEvent.click(getByRole('tab', { name: /os/i }));

    const paragraph = getByText('Operating System Statistics');
    expect(paragraph).toBeVisible();
  });

  it('handleSubmit should  be called on location tab', async () => {
    const history = createMemoryHistory();
    const { getByRole, getByText } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} />
      </Router>
    );

    fireEvent.click(getByRole('tab', { name: /location/i }));
    const paragraph = getByText('City');
    expect(paragraph).toBeVisible();
  });

  it('handleSubmit should not be called if city is empty in location tab', async () => {
    const history = createMemoryHistory();
    const submitSpy = jest.fn();
    const { getByRole, getByText } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} onUpdateEquipment={submitSpy} />
      </Router>
    );

    fireEvent.click(getByRole('tab', { name: /location/i }));

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('Please select your location city.')).toBeVisible();
    });
  });

  it('handleSubmit should  be called on location tab', async () => {
    const history = createMemoryHistory();
    const submitSpy = jest.fn();
    const { getByRole, getByLabelText } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} onUpdateEquipment={submitSpy} />
      </Router>
    );

    fireEvent.click(getByRole('tab', { name: /location/i }));

    fireEvent.change(getByLabelText('City'), {
      target: { value: defaultProps.locations[0].children[1].id },
    });

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('firmware tab should show the firmware form', async () => {
    const history = createMemoryHistory();

    const { getByRole, getByText } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} firmware={firmware} />
      </Router>
    );

    fireEvent.click(getByRole('tab', { name: /firmware/i }));

    const paragraph = getByText('Upgrade');
    expect(paragraph).toBeVisible();
  });

  it('firmware tab should show the change the target version on user input', async () => {
    const history = createMemoryHistory();
    const { getByRole, getByText, getByLabelText } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} firmware={firmware} />
      </Router>
    );

    fireEvent.click(getByRole('tab', { name: /firmware/i }));

    const paragraph = getByText('Upgrade');
    expect(paragraph).toBeVisible();

    const targetVersion = getByLabelText('Target Version');
    fireEvent.change(targetVersion, firmware[0].id);

    expect(targetVersion.value).toEqual(firmware[0].id);
  });

  it('URL changes to /network/access-points on clicking the back button', () => {
    const history = createMemoryHistory();
    const { getByRole } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} />
      </Router>
    );
    fireEvent.click(getByRole('button', { name: /back/i }));
    expect(window.location.pathname).toEqual('/network/access-points');
  });

  it('handleSubmit should not be called if access point name is empty on general tab', async () => {
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();

    fireEvent.change(getByPlaceholderText('Enter Access Point Name'), {
      target: { value: null },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('Enter the Access Point name')).toBeVisible();
    });
  });

  it('handleSubmit should  be called if access point name is entered on general tab', async () => {
    const history = createMemoryHistory();
    const submitSpy = jest.fn();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} onUpdateEquipment={submitSpy} />
      </Router>
    );

    fireEvent.click(getByRole('tab', { name: /general/i }));
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
    const history = createMemoryHistory();
    const { getByText, getByRole } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
    fireEvent.click(getByRole('button', { name: /settings/i }));
  });

  it(' handleSubmit should  be called if advanced settings are filled', async () => {
    const history = createMemoryHistory();
    const submitSpy = jest.fn();
    const { getByText, getByRole } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} onUpdateEquipment={submitSpy} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
    fireEvent.click(getByRole('button', { name: /settings/i }));
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('RTS/CTS threshold value must be positive for the is2dot4GHz setting', async () => {
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
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
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
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
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
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
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
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
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
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
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
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
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
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
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
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
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
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
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
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
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
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
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
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
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
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
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
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
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
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
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
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
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
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
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
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
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
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
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
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
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
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
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
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
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
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
    const history = createMemoryHistory();
    const { getByText, getByRole, getByPlaceholderText } = render(
      <Router history={history}>
        <AccessPointDetails {...defaultProps} />
      </Router>
    );
    fireEvent.click(getByRole('tab', { name: /general/i }));
    const paragraph = getByText('Identity');
    expect(paragraph).toBeVisible();
    fireEvent.click(getByRole('button', { name: /settings/i }));

    fireEvent.change(getByPlaceholderText('Enter Min Load (%) for is5GHzL'), {
      target: { value: 101 },
    });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('0 - 100%')).toBeVisible();
    });
  });
});
