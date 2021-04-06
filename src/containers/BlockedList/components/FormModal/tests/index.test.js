import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, waitFor } from '@testing-library/react';
import { render } from 'tests/utils';
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
};

describe('<FormModal />', () => {
  it('Invalid MAC address show show on invalid Client input', async () => {
    const submitSpy = jest.fn();

    const { getByRole, getByText, getByLabelText } = render(
      <FormModal {...mockProps} onSubmit={submitSpy} />
    );

    fireEvent.change(getByLabelText('MAC Address'), { target: { value: 'test' } });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toBeCalledTimes(0);
      expect(getByText('Please enter a valid MAC Address.')).toBeVisible();
    });
  });

  it('Empty MAC address show show on missing Client input', async () => {
    const submitSpy = jest.fn();

    const { getByRole, getByText, getByLabelText } = render(
      <FormModal {...mockProps} onSubmit={submitSpy} />
    );

    fireEvent.change(getByLabelText('MAC Address'), { target: { value: '' } });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toBeCalledTimes(0);
      expect(getByText('Please enter MAC Address.')).toBeVisible();
    });
  });

  it('onUpdateClient should be called on valid MAC Address input', async () => {
    const submitSpy = jest.fn();

    const { getByRole, getByLabelText } = render(<FormModal {...mockProps} onSubmit={submitSpy} />);

    fireEvent.change(getByLabelText('MAC Address'), { target: { value: '00:0a:95:9d:68:11' } });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toBeCalledTimes(1);
    });
  });

  it('Cancel button press should hide ADD Client modal', async () => {
    const submitSpy = jest.fn();

    const { getByRole } = render(<FormModal {...mockProps} onCancel={submitSpy} />);

    fireEvent.click(getByRole('button', { name: /cancel/i }));

    await waitFor(() => {
      expect(submitSpy).toBeCalledTimes(1);
    });
  });

  it('onSubmit default prop is passed', async () => {
    const { getByRole, getByLabelText } = render(<FormModal {...mockProps} />);

    fireEvent.change(getByLabelText('MAC Address'), { target: { value: '00:0a:95:9d:68:11' } });
    fireEvent.click(getByRole('button', { name: 'Save' }));
  });

  it('onCancel default prop is passed', async () => {
    const { getByRole } = render(<FormModal {...mockProps} />);

    fireEvent.click(getByRole('button', { name: /cancel/i }));
  });
});
