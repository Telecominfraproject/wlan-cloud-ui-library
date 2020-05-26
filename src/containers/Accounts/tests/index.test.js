import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, waitFor, within } from '@testing-library/react';

import { render } from 'tests/utils';
import Accounts from '..';

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
  onCreateUser: () => {},
  onEditUser: () => {},
  onDeleteUser: () => {},
  data: [
    {
      email: 'support@mail.com',
      role: 'SuperUser',
    },
  ],
};

const MISSING_EMAIL = 'Please input your e-mail';
const INVALID_EMAIL = 'The input is not a valid e-mail';
const INVALID_PASSWORD = 'Please input your password';
const INVALID_CONFIRMED_PASSWORD = 'Please input your password';
const INVALID_PASSWORDS = 'The two passwords do not match';

describe('<Accounts />', () => {
  afterEach(cleanup);

  it('delete account button click should show modal', async () => {
    const { getByRole, getByText } = render(<Accounts {...mockProps} />);
    fireEvent.click(getByRole('button', { name: /delete/i }));

    const paragraph = getByText('Are you sure you want to delete the account:');
    expect(paragraph).toBeVisible();
    expect(within(paragraph).getByText(mockProps.data[0].email)).toBeVisible();
  });

  it('edit account button click should show FormModal', async () => {
    const { getByRole, getByText } = render(<Accounts {...mockProps} />);

    fireEvent.click(getByRole('button', { name: /edit/i }));

    expect(getByText('Edit Account')).toBeVisible();
  });

  it('add account button click should show FormModal', async () => {
    const { getByRole, getByText } = render(<Accounts {...mockProps} />);

    fireEvent.click(getByRole('button', { name: /addaccount/i }));

    expect(getByText('Add Account', { selector: 'div' })).toBeVisible();
  });

  it('onDeleteUser should be called when modal is submitted', async () => {
    const submitSpy = jest.fn();
    const { getByRole } = render(<Accounts {...mockProps} onDeleteUser={submitSpy} />);
    fireEvent.click(getByRole('button', { name: /delete/i }));
    expect(getByRole('button', { name: 'Delete' }));
    fireEvent.click(getByRole('button', { name: 'Delete' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('onEditUser should not be called when form is invalid', async () => {
    const submitSpy = jest.fn();
    const { getByText, getByRole } = render(<Accounts {...mockProps} onEditUser={submitSpy} />);
    fireEvent.click(getByRole('button', { name: /edit/i }));

    expect(getByText('Edit Account')).toBeVisible();

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText(INVALID_PASSWORD)).toBeVisible();
      expect(getByText(INVALID_CONFIRMED_PASSWORD)).toBeVisible();
      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

  it('onEditUser should be called when all fields are submitted correctly', async () => {
    const submitSpy = jest.fn();
    const { getByLabelText, getByRole, getByText } = render(
      <Accounts {...mockProps} onEditUser={submitSpy} />
    );
    fireEvent.click(getByRole('button', { name: /edit/i }));
    expect(getByText('Edit Account')).toBeVisible();

    fireEvent.change(getByLabelText('E-mail'), { target: { value: 'test@test.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'password' } });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('cancel account button click should hide FormModal', async () => {
    const { getByRole, getByText } = render(<Accounts {...mockProps} />);

    fireEvent.click(getByRole('button', { name: /addaccount/i }));
    expect(getByText('Add Account', { selector: 'div' })).toBeVisible();
    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(getByText('Add Account', { selector: 'div' })).not.toBeVisible();
    });
  });

  it('onCreateUser should not be called when form is invalid', async () => {
    const submitSpy = jest.fn();
    const { getByText, getByRole } = render(<Accounts {...mockProps} onCreateUser={submitSpy} />);
    fireEvent.click(getByRole('button', { name: /addaccount/i }));
    expect(getByText('Add Account', { selector: 'div' })).toBeVisible();

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText(MISSING_EMAIL)).toBeVisible();
      expect(getByText(INVALID_PASSWORD)).toBeVisible();
      expect(getByText(INVALID_CONFIRMED_PASSWORD)).toBeVisible();
      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

  it('onCreateUser should not be called when email is empty', async () => {
    const submitSpy = jest.fn();
    const { getByLabelText, getByText, getByRole } = render(
      <Accounts {...mockProps} onCreateUser={submitSpy} />
    );
    fireEvent.click(getByRole('button', { name: /addaccount/i }));
    expect(getByText('Add Account', { selector: 'div' })).toBeVisible();

    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'password' } });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText(MISSING_EMAIL)).toBeVisible();
      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

  it('onCreateUser should not be called when email is invalid', async () => {
    const submitSpy = jest.fn();
    const { getByLabelText, getByText, getByRole } = render(
      <Accounts {...mockProps} onCreateUser={submitSpy} />
    );
    fireEvent.click(getByRole('button', { name: /addaccount/i }));
    expect(getByText('Add Account', { selector: 'div' })).toBeVisible();

    fireEvent.change(getByLabelText('E-mail'), { target: { value: 'email' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'password' } });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText(INVALID_EMAIL)).toBeVisible();
      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

  it('onCreateUser should not be called when new password is empty', async () => {
    const submitSpy = jest.fn();
    const { getByLabelText, getByText, getByRole } = render(
      <Accounts {...mockProps} onCreateUser={submitSpy} />
    );
    fireEvent.click(getByRole('button', { name: /addaccount/i }));
    expect(getByText('Add Account', { selector: 'div' })).toBeVisible();

    fireEvent.change(getByLabelText('E-mail'), { target: { value: 'email@test.com' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'password' } });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText(INVALID_PASSWORD)).toBeVisible();
      expect(getByText(INVALID_PASSWORDS)).toBeVisible();
      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

  it('onCreateUser should not be called when both password fields are empty', async () => {
    const submitSpy = jest.fn();
    const { getByLabelText, getByText, getByRole } = render(
      <Accounts {...mockProps} onCreateUser={submitSpy} />
    );
    fireEvent.click(getByRole('button', { name: /addaccount/i }));
    expect(getByText('Add Account', { selector: 'div' })).toBeVisible();

    fireEvent.change(getByLabelText('E-mail'), { target: { value: 'email@test.com' } });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText(INVALID_PASSWORD)).toBeVisible();
      expect(getByText(INVALID_CONFIRMED_PASSWORD)).toBeVisible();
      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

  it('onCreateUser should not be called when passwords do not match', async () => {
    const submitSpy = jest.fn();
    const { getByLabelText, getByText, getByRole } = render(
      <Accounts {...mockProps} onCreateUser={submitSpy} />
    );
    fireEvent.click(getByRole('button', { name: /addaccount/i }));
    expect(getByText('Add Account', { selector: 'div' })).toBeVisible();

    fireEvent.change(getByLabelText('E-mail'), { target: { value: 'email@test.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'password1' } });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText(INVALID_PASSWORDS)).toBeVisible();
      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

  it('onCreateUser should be called when all fields are submitted correctly', async () => {
    const submitSpy = jest.fn();
    const { getByLabelText, getByRole, getByText } = render(
      <Accounts {...mockProps} onCreateUser={submitSpy} />
    );
    fireEvent.click(getByRole('button', { name: /addaccount/i }));
    expect(getByText('Add Account', { selector: 'div' })).toBeVisible();

    fireEvent.change(getByLabelText('E-mail'), { target: { value: 'test@test.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'password' } });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });
});
