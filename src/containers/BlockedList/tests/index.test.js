import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, waitFor, within } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'tests/utils';
import BlockedList from '..';

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
  data: [
    {
      customerId: '2',
      macAddress: '00:0a:95:9d:68:16',
      createdTimestamp: '0',
      lastModifiedTimestamp: '1595891230273',
      details: {
        model_type: 'ClientInfoDetails',
        alias: null,
        clientType: 0,
        apFingerprint: null,
        userName: null,
        hostName: null,
        lastUsedCpUsername: null,
        lastUserAgent: null,
        doNotSteer: false,
        blocklistDetails: {
          model_type: 'BlocklistDetails',
          enabled: true,
          startTime: null,
          endTime: null,
        },
      },
      __typename: 'Client',
    },
  ],
};

describe('<AutoProvision />', () => {
  afterEach(cleanup);

  it('Add MAC button press should show Add Client modal', async () => {
    const { getByRole, getByText } = render(
      <Router>
        <BlockedList {...mockProps} />
      </Router>
    );

    fireEvent.click(getByRole('button', { name: 'Add Client' }));

    expect(getByText('Add Client', { selector: 'div' })).toBeVisible();
  });

  it('onUpdateClient should be called on valid MAC Address input', async () => {
    const submitSpy = jest.fn();

    const { getByRole, getByText, getByLabelText } = render(
      <Router>
        <BlockedList {...mockProps} onGetClients={submitSpy} />
      </Router>
    );

    fireEvent.click(getByRole('button', { name: 'Add Client' }));

    expect(getByText('Add Client', { selector: 'div' })).toBeVisible();

    fireEvent.change(getByLabelText('MAC Address'), { target: { value: '00:0a:95:9d:68:11' } });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toBeCalledTimes(1);
    });
  });

  it('Cancel button press should hide ADD Client modal', async () => {
    const { getByRole, getByText } = render(
      <Router>
        <BlockedList {...mockProps} />
      </Router>
    );

    fireEvent.click(getByRole('button', { name: 'Add Client' }));

    const paragraph = getByText('Add Client', { selector: 'div' });
    expect(paragraph).toBeVisible();

    fireEvent.click(getByRole('button', { name: /cancel/i }));

    await waitFor(() => {
      expect(paragraph).not.toBeVisible();
    });
  });

  it('Delete button press should show Delete MAC modal', async () => {
    const { getByRole, getByText } = render(
      <Router>
        <BlockedList {...mockProps} />
      </Router>
    );

    fireEvent.click(
      getByRole('button', {
        name: `delete-mac-${mockProps.data[0].macAddress}`,
      })
    );

    const paragraph = getByText(/Are you sure you want to remove the Client:/i);
    expect(paragraph).toBeVisible();
    expect(within(paragraph).getByText(mockProps.data[0].macAddress)).toBeVisible();
  });

  it('Cancel button press should hide Delete MAC modal', async () => {
    const { getByRole, getByText } = render(
      <Router>
        <BlockedList {...mockProps} />
      </Router>
    );

    fireEvent.click(
      getByRole('button', {
        name: `delete-mac-${mockProps.data[0].macAddress}`,
      })
    );

    const paragraph = getByText(/Are you sure you want to remove the Client:/i);
    expect(paragraph).toBeVisible();
    expect(within(paragraph).getByText(mockProps.data[0].macAddress)).toBeVisible();

    fireEvent.click(getByRole('button', { name: /cancel/i }));

    await waitFor(() => {
      expect(paragraph).not.toBeVisible();
    });
  });

  it('Delete button press on Delete MAC Modal should call onUpdateClient', async () => {
    const submitSpy = jest.fn();
    const { getByRole, getByText } = render(
      <Router>
        <BlockedList {...mockProps} onUpdateClient={submitSpy} />
      </Router>
    );

    fireEvent.click(
      getByRole('button', {
        name: `delete-mac-${mockProps.data[0].macAddress}`,
      })
    );

    const paragraph = getByText(/Are you sure you want to remove the Client:/i);
    expect(paragraph).toBeVisible();

    expect(within(paragraph).getByText(mockProps.data[0].macAddress)).toBeVisible();

    fireEvent.click(getByRole('button', { name: 'Remove' }));

    await waitFor(() => {
      expect(submitSpy).toBeCalledTimes(1);
      expect(paragraph).not.toBeVisible();
    });
  });

  it('onGetClients default prop is passed', async () => {
    const { getByRole, getByLabelText } = render(
      <Router>
        <BlockedList />
      </Router>
    );

    fireEvent.click(getByRole('button', { name: 'Add Client' }));
    fireEvent.change(getByLabelText('MAC Address'), { target: { value: '00:0a:95:9d:68:11' } });
    fireEvent.click(getByRole('button', { name: 'Save' }));
  });

  it('onUpdateClient default prop is passed', async () => {
    const { getByRole } = render(
      <Router>
        <BlockedList {...mockProps} />
      </Router>
    );

    fireEvent.click(
      getByRole('button', {
        name: `delete-mac-${mockProps.data[0].macAddress}`,
      })
    );
    fireEvent.click(getByRole('button', { name: /Remove/i }));
  });
});
