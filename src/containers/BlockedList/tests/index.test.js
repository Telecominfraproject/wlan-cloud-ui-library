import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, waitFor, within } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'tests/utils';

import { mockProps } from './constants';
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

describe('<BlockedList />', () => {
  it('Add MAC button press should show Add Client modal', async () => {
    const { getByRole, getByText } = render(
      <Router>
        <BlockedList {...mockProps} />
      </Router>
    );

    fireEvent.click(getByRole('button', { name: 'Add Client' }));

    expect(getByText('Add Client', { selector: 'div' })).toBeVisible();
  });

  it('onAddClient should be called on valid MAC Address input', async () => {
    const submitSpy = jest.fn();

    const { getByRole, getByText, getByLabelText } = render(
      <Router>
        <BlockedList {...mockProps} onAddClient={submitSpy} />
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
    const { getByRole, getByText, queryByText } = render(
      <Router>
        <BlockedList {...mockProps} />
      </Router>
    );

    fireEvent.click(getByRole('button', { name: 'Add Client' }));

    expect(getByText('Add Client', { selector: 'div' })).toBeVisible();

    fireEvent.click(getByRole('button', { name: /cancel/i }));

    await waitFor(() => {
      expect(queryByText('Add Client', { selector: 'div' })).not.toBeInTheDocument();
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
    const { getByRole, getByText, queryByText } = render(
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
      expect(queryByText(/Are you sure you want to remove the Client:/i)).not.toBeInTheDocument();
    });
  });

  it('Delete button press on Delete MAC Modal should call onUpdateClient', async () => {
    const submitSpy = jest.fn();
    const { getByRole, getByText, queryByText } = render(
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
      expect(queryByText(/Are you sure you want to remove the Client:/i)).not.toBeInTheDocument();
    });
  });

  it('onAddClient default prop is passed', async () => {
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

  it('onUpdateClient formatted details check', async () => {
    const submitSpy = jest.fn();
    const { getByRole } = render(
      <Router>
        <BlockedList {...mockProps} onUpdateClient={submitSpy} />
      </Router>
    );

    fireEvent.click(
      getByRole('button', {
        name: `delete-mac-${mockProps.data[1].macAddress}`,
      })
    );
    fireEvent.click(getByRole('button', { name: /Remove/i }));
  });
});
