import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, waitFor } from '@testing-library/react';

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

describe('<Accounts />', () => {
  afterEach(cleanup);

  it('delete account button click should show modal', async () => {
    const { getByRole, getByText } = render(<Accounts {...mockProps} />);
    fireEvent.click(getByRole('button', { name: /delete/i }));

    expect(getByText('Are you sure you want to delete the account:')).toBeVisible();
  });

  it('edit account button click should show FormModal', async () => {
    const { getByRole, getByTitle } = render(<Accounts {...mockProps} />);

    fireEvent.click(getByRole('button', { name: /edit/i }));

    expect(getByTitle('formmodal')).toBeVisible();
  });

  it('add account button click should show FormModal', async () => {
    const { getByRole, getByTitle } = render(<Accounts {...mockProps} />);

    fireEvent.click(getByRole('button', { name: /addaccount/i }));

    expect(getByTitle('formmodal')).toBeVisible();
  });

  it('onDeleteUser should be called when modal is submitted', async () => {
    const submitSpy = jest.fn();
    const { getByRole } = render(<Accounts {...mockProps} onDeleteUser={submitSpy} />);
    fireEvent.click(getByRole('button', { name: /delete/i }));
    expect(getByRole('button', { name: /modalsubmit/i })).toBeVisible();

    fireEvent.click(getByRole('button', { name: /modalsubmit/i }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('onEditUser should not be called when form is invalid', async () => {
    const submitSpy = jest.fn();
    const { getByText, getByRole, getByTitle } = render(
      <Accounts {...mockProps} onEditUser={submitSpy} />
    );
    fireEvent.click(getByRole('button', { name: /edit/i }));
    expect(getByTitle('formmodal')).toBeVisible();

    fireEvent.click(getByRole('button', { name: /modalsubmit/i }));

    await waitFor(() => {
      expect(getByText('Please input your password')).toBeVisible();
      expect(getByText('Please confirm your password')).toBeVisible();
      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

  it('onEditUser should be called when all fields are submitted correctly', async () => {
    const submitSpy = jest.fn();
    const { getByLabelText, getByRole, getByTitle } = render(
      <Accounts {...mockProps} onEditUser={submitSpy} />
    );
    fireEvent.click(getByRole('button', { name: /edit/i }));
    expect(getByTitle('formmodal')).toBeVisible();

    fireEvent.change(getByLabelText('E-mail'), { target: { value: 'test@test.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'password' } });
    fireEvent.click(getByRole('button', { name: /modalsubmit/i }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('cancel account button click should hide FormModal', async () => {
    const { getByRole, getByTitle } = render(<Accounts {...mockProps} />);

    fireEvent.click(getByRole('button', { name: /addaccount/i }));
    expect(getByTitle('formmodal')).toBeVisible();
    fireEvent.click(getByRole('button', { name: /modalcancel/i }));

    await waitFor(() => {
      expect(getByTitle('formmodal')).not.toBeVisible();
    });
  });

  it('onCreateUser should not be called when form is invalid', async () => {
    const submitSpy = jest.fn();
    const { getByText, getByRole, getByTitle } = render(
      <Accounts {...mockProps} onCreateUser={submitSpy} />
    );
    fireEvent.click(getByRole('button', { name: /addaccount/i }));
    expect(getByTitle('formmodal')).toBeVisible();

    fireEvent.click(getByRole('button', { name: /modalsubmit/i }));

    await waitFor(() => {
      expect(getByText('Please input your e-mail')).toBeVisible();
      expect(getByText('Please input your password')).toBeVisible();
      expect(getByText('Please confirm your password')).toBeVisible();
      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

  it('onCreateUser should not be called when email is empty', async () => {
    const submitSpy = jest.fn();
    const { getByLabelText, getByText, getByRole, getByTitle } = render(
      <Accounts {...mockProps} onCreateUser={submitSpy} />
    );
    fireEvent.click(getByRole('button', { name: /addaccount/i }));
    expect(getByTitle('formmodal')).toBeVisible();

    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'password' } });
    fireEvent.click(getByRole('button', { name: /modalsubmit/i }));

    await waitFor(() => {
      expect(getByText('Please input your e-mail')).toBeVisible();
      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

  it('onCreateUser should not be called when email is invalid', async () => {
    const submitSpy = jest.fn();
    const { getByLabelText, getByText, getByRole, getByTitle } = render(
      <Accounts {...mockProps} onCreateUser={submitSpy} />
    );
    fireEvent.click(getByRole('button', { name: /addaccount/i }));
    expect(getByTitle('formmodal')).toBeVisible();

    fireEvent.change(getByLabelText('E-mail'), { target: { value: 'email' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'password' } });
    fireEvent.click(getByRole('button', { name: /modalsubmit/i }));

    await waitFor(() => {
      expect(getByText('The input is not a valid e-mail')).toBeVisible();
      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

  it('onCreateUser should not be called when new password is empty', async () => {
    const submitSpy = jest.fn();
    const { getByLabelText, getByText, getByRole, getByTitle } = render(
      <Accounts {...mockProps} onCreateUser={submitSpy} />
    );
    fireEvent.click(getByRole('button', { name: /addaccount/i }));
    expect(getByTitle('formmodal')).toBeVisible();

    fireEvent.change(getByLabelText('E-mail'), { target: { value: 'email@test.com' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'password' } });
    fireEvent.click(getByRole('button', { name: /modalsubmit/i }));

    await waitFor(() => {
      expect(getByText('Please input your password')).toBeVisible();
      expect(getByText('The two passwords do not match')).toBeVisible();
      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

  it('onCreateUser should not be called when both password fields are empty', async () => {
    const submitSpy = jest.fn();
    const { getByLabelText, getByText, getByRole, getByTitle } = render(
      <Accounts {...mockProps} onCreateUser={submitSpy} />
    );
    fireEvent.click(getByRole('button', { name: /addaccount/i }));
    expect(getByTitle('formmodal')).toBeVisible();

    fireEvent.change(getByLabelText('E-mail'), { target: { value: 'email@test.com' } });
    fireEvent.click(getByRole('button', { name: /modalsubmit/i }));

    await waitFor(() => {
      expect(getByText('Please input your password')).toBeVisible();
      expect(getByText('Please confirm your password')).toBeVisible();
      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

  it('onCreateUser should not be called when passwords do not match', async () => {
    const submitSpy = jest.fn();
    const { getByLabelText, getByText, getByRole, getByTitle } = render(
      <Accounts {...mockProps} onCreateUser={submitSpy} />
    );
    fireEvent.click(getByRole('button', { name: /addaccount/i }));
    expect(getByTitle('formmodal')).toBeVisible();

    fireEvent.change(getByLabelText('E-mail'), { target: { value: 'email@test.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'password1' } });
    fireEvent.click(getByRole('button', { name: /modalsubmit/i }));

    await waitFor(() => {
      expect(getByText('The two passwords do not match')).toBeVisible();
      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

  it('onCreateUser should be called when all fields are submitted correctly', async () => {
    const submitSpy = jest.fn();
    const { getByLabelText, getByRole, getByTitle } = render(
      <Accounts {...mockProps} onCreateUser={submitSpy} />
    );
    fireEvent.click(getByRole('button', { name: /addaccount/i }));
    expect(getByTitle('formmodal')).toBeVisible();

    fireEvent.change(getByLabelText('E-mail'), { target: { value: 'test@test.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'password' } });
    fireEvent.click(getByRole('button', { name: /modalsubmit/i }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });
});
