import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, waitFor, waitForElement } from '@testing-library/react';
import { render, DOWN_ARROW } from 'tests/utils';
import FormModal from '..';

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
  visible: true,
  currentPortList: [
    {
      connectionCapabilitiesIpProtocol: 'TCP',
      connectionCapabilitiesPortNumber: 9000,
      connectionCapabilitiesStatus: 'open',
    },
  ],
};

const MISSING_STATUS = 'Status field cannot be empty';
const MISSING_PROTOCOL = 'Protocol field cannot be empty';
const MISSING_PORT = 'Port field cannot be empty';
const INVALID_PORT = 'Port expected between 1 - 6553';
const USED_PORT = 'Port is already used';

describe('<FormModal />', () => {
  it('Missing model error should show if model form has missing model', async () => {
    const submitSpy = jest.fn();

    const { getByText, getByRole } = render(<FormModal {...mockProps} onSubmit={submitSpy} />);

    fireEvent.click(getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(0);
      expect(getByText(MISSING_STATUS)).toBeVisible();
      expect(getByText(MISSING_PROTOCOL)).toBeVisible();
      expect(getByText(MISSING_PORT)).toBeVisible();
    });
  });

  it('Invalid port error should show when invalid port is entered', async () => {
    const submitSpy = jest.fn();

    const { getByText, getByRole, getByLabelText } = render(
      <FormModal {...mockProps} onSubmit={submitSpy} />
    );

    fireEvent.change(getByLabelText('Port'), { target: { value: -1000 } });
    fireEvent.click(getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(0);
      expect(getByText(INVALID_PORT)).toBeVisible();
    });
  });

  it('Used port error should show when port entered is used', async () => {
    const submitSpy = jest.fn();

    const { getByText, getByRole, getByLabelText } = render(
      <FormModal {...mockProps} onSubmit={submitSpy} />
    );

    fireEvent.change(getByLabelText('Port'), { target: { value: 9000 } });
    fireEvent.click(getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(0);
      expect(getByText(USED_PORT)).toBeVisible();
    });
  });

  it('cancel button click should call onCancel', async () => {
    const cancelSpy = jest.fn();

    const { getByRole } = render(<FormModal {...mockProps} onCancel={cancelSpy} />);

    fireEvent.click(getByRole('button', { name: /cancel/i }));

    await waitFor(() => {
      expect(cancelSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('save button should call onSubmit', async () => {
    const submitSpy = jest.fn();

    const { getByText, getByRole, getByLabelText } = render(
      <FormModal {...mockProps} onSubmit={submitSpy} />
    );

    const selectedStatus = getByLabelText('Status');
    const selectedProtocol = getByLabelText('Protocol');

    fireEvent.keyDown(selectedStatus, DOWN_ARROW);
    await waitForElement(() => getByText('Open'));
    fireEvent.click(getByText('Open'));

    fireEvent.keyDown(selectedProtocol, DOWN_ARROW);
    await waitForElement(() => getByText('UDP'));
    fireEvent.click(getByText('UDP'));

    fireEvent.change(getByLabelText('Port'), { target: { value: 8000 } });
    fireEvent.click(getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });
});
