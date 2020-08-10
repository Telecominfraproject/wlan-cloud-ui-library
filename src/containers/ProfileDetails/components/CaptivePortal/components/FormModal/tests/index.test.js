import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, waitFor } from '@testing-library/react';
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
  usedUserNames: ['test'],
};

const MISSING_USERNAME = 'Please input your username.';
const MISSING_PASSWORD = 'Please input your password.';
const INVALID_USERNAME = 'Username already used. Please enter a new username.';

describe('<FormModal />', () => {
  afterEach(cleanup);

  it('Invalid model error should show if model form contains invalid model id', async () => {
    const submitSpy = jest.fn();

    const { getByText, getByRole } = render(<FormModal {...mockProps} onSubmit={submitSpy} />);

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(0);
      expect(getByText(MISSING_USERNAME)).toBeVisible();
      expect(getByText(MISSING_PASSWORD)).toBeVisible();
    });
  });

  it('Missing model error should show if model form has missing model', async () => {
    const submitSpy = jest.fn();

    const { getByText, getByRole, getByLabelText } = render(
      <FormModal {...mockProps} onSubmit={submitSpy} />
    );

    fireEvent.change(getByLabelText('Username'), { target: { value: 'test' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.change(getByLabelText('First Name'), { target: { value: 'firstname' } });
    fireEvent.change(getByLabelText('Last Name'), { target: { value: 'lastname' } });

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(0);
      expect(getByText(INVALID_USERNAME)).toBeVisible();
    });
  });

  it('cancel button click should call onCancel', async () => {
    const cancelSpy = jest.fn();

    const { getByRole } = render(<FormModal {...mockProps} onCancel={cancelSpy} />);

    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(cancelSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('onCancel default props', async () => {
    const { getByRole } = render(<FormModal {...mockProps} />);

    fireEvent.click(getByRole('button', { name: 'Cancel' }));
  });

  it('onSubmit default props', async () => {
    const { getByRole, getByLabelText } = render(
      <FormModal {...mockProps} username="username" firstName="firstname" lastName="lastname" />
    );

    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });

    fireEvent.click(getByRole('button', { name: 'Save' }));
  });
});
