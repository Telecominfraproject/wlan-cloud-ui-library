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

  it('user data table is visible on load', async () => {
    const { getByTestId } = render(<Accounts {...mockProps} />);

    expect(getByTestId('table')).toBeVisible();
  });

  it('FormModal should not be visible on load', async () => {
    const { queryByTestId } = render(<Accounts {...mockProps} />);

    expect(queryByTestId('formmodal')).toBeNull();
  });

  it('Modal should not be visible on load', async () => {
    const { queryByTestId } = render(<Accounts {...mockProps} />);

    expect(queryByTestId('modalsubmit')).toBeNull();
  });

  it('add account button click should show FormModal', async () => {
    const { getByTestId } = render(<Accounts {...mockProps} />);
    fireEvent.click(getByTestId('addaccount'));

    expect(getByTestId('formmodal')).toBeVisible();
  });

  it('delete account button click should show modal', async () => {
    const { getByTestId, getByRole } = render(<Accounts {...mockProps} />);
    fireEvent.click(getByRole('button', { name: /delete/i }));

    expect(getByTestId('modalsubmit')).toBeVisible();
  });

  it('edit account button click should show FormModal', async () => {
    const { getByTestId, getByRole } = render(<Accounts {...mockProps} />);

    fireEvent.click(getByRole('button', { name: /edit/i }));

    expect(getByTestId('formmodal')).toBeVisible();
  });

  it('onEditUser should not be called when form is invalid', async () => {
    const submitSpy = jest.fn();
    const { getByTestId, getByText, getByRole } = render(
      <Accounts {...mockProps} onEditUser={submitSpy} />
    );
    fireEvent.click(getByRole('button', { name: /edit/i }));
    expect(getByTestId('formmodal')).toBeVisible();

    fireEvent.click(getByTestId('modalsubmit'));

    await waitFor(() => {
      expect(getByText('Please input your password')).toBeVisible();
      expect(getByText('Please confirm your password')).toBeVisible();
      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

  it('onEditUser should be called when all fields are submitted correctly', async () => {
    const submitSpy = jest.fn();
    const { getByTestId, getByLabelText, getByRole } = render(
      <Accounts {...mockProps} onEditUser={submitSpy} />
    );
    fireEvent.click(getByRole('button', { name: /edit/i }));
    expect(getByTestId('formmodal')).toBeVisible();

    fireEvent.change(getByLabelText('E-mail'), { target: { value: 'test@test.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'password' } });
    fireEvent.click(getByTestId('modalsubmit'));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('cancel account button click should hide FormModal', async () => {
    const { getByTestId } = render(<Accounts {...mockProps} />);
    fireEvent.click(getByTestId('addaccount'));
    expect(getByTestId('formmodal')).toBeVisible();
    fireEvent.click(getByTestId('modalcancel'));

    await waitFor(() => {
      expect(getByTestId('formmodal')).not.toBeVisible();
    });
  });

  it('onCreateUser should not be called when form is invalid', async () => {
    const submitSpy = jest.fn();
    const { getByTestId, getByText } = render(<Accounts {...mockProps} onCreateUser={submitSpy} />);
    fireEvent.click(getByTestId('addaccount'));
    expect(getByTestId('formmodal')).toBeVisible();

    fireEvent.click(getByTestId('modalsubmit'));

    await waitFor(() => {
      expect(getByText('Please input your e-mail')).toBeVisible();
      expect(getByText('Please input your password')).toBeVisible();
      expect(getByText('Please confirm your password')).toBeVisible();
      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

  it('onCreateUser should not be called when email is empty', async () => {
    const submitSpy = jest.fn();
    const { getByTestId, getByLabelText, getByText } = render(
      <Accounts {...mockProps} onCreateUser={submitSpy} />
    );
    fireEvent.click(getByTestId('addaccount'));
    expect(getByTestId('formmodal')).toBeVisible();

    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'password' } });
    fireEvent.click(getByTestId('modalsubmit'));

    await waitFor(() => {
      expect(getByText('Please input your e-mail')).toBeVisible();
      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

  it('onCreateUser should not be called when email is invalid', async () => {
    const submitSpy = jest.fn();
    const { getByTestId, getByLabelText, getByText } = render(
      <Accounts {...mockProps} onCreateUser={submitSpy} />
    );
    fireEvent.click(getByTestId('addaccount'));
    expect(getByTestId('formmodal')).toBeVisible();

    fireEvent.change(getByLabelText('E-mail'), { target: { value: 'email' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'password' } });
    fireEvent.click(getByTestId('modalsubmit'));

    await waitFor(() => {
      expect(getByText('The input is not a valid e-mail')).toBeVisible();
      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

  it('onCreateUser should not be called when new password is empty', async () => {
    const submitSpy = jest.fn();
    const { getByTestId, getByLabelText, getByText } = render(
      <Accounts {...mockProps} onCreateUser={submitSpy} />
    );
    fireEvent.click(getByTestId('addaccount'));
    expect(getByTestId('formmodal')).toBeVisible();

    fireEvent.change(getByLabelText('E-mail'), { target: { value: 'email@test.com' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'password' } });
    fireEvent.click(getByTestId('modalsubmit'));

    await waitFor(() => {
      expect(getByText('Please input your password')).toBeVisible();
      expect(getByText('The two passwords do not match')).toBeVisible();
      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

  it('onCreateUser should not be called when both password fields are empty', async () => {
    const submitSpy = jest.fn();
    const { getByTestId, getByLabelText, getByText } = render(
      <Accounts {...mockProps} onCreateUser={submitSpy} />
    );
    fireEvent.click(getByTestId('addaccount'));
    expect(getByTestId('formmodal')).toBeVisible();

    fireEvent.change(getByLabelText('E-mail'), { target: { value: 'email@test.com' } });
    fireEvent.click(getByTestId('modalsubmit'));

    await waitFor(() => {
      expect(getByText('Please input your password')).toBeVisible();
      expect(getByText('Please confirm your password')).toBeVisible();
      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

  it('onCreateUser should not be called when passwords do not match', async () => {
    const submitSpy = jest.fn();
    const { getByTestId, getByLabelText, getByText } = render(
      <Accounts {...mockProps} onCreateUser={submitSpy} />
    );
    fireEvent.click(getByTestId('addaccount'));
    expect(getByTestId('formmodal')).toBeVisible();

    fireEvent.change(getByLabelText('E-mail'), { target: { value: 'email@test.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'password1' } });
    fireEvent.click(getByTestId('modalsubmit'));

    await waitFor(() => {
      expect(getByText('The two passwords do not match')).toBeVisible();
      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

  it('onCreateUser should be called when all fields are submitted correctly', async () => {
    const submitSpy = jest.fn();
    const { getByTestId, getByLabelText } = render(
      <Accounts {...mockProps} onCreateUser={submitSpy} />
    );
    fireEvent.click(getByTestId('addaccount'));
    expect(getByTestId('formmodal')).toBeVisible();

    fireEvent.change(getByLabelText('E-mail'), { target: { value: 'test@test.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'password' } });
    fireEvent.click(getByTestId('modalsubmit'));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });
});
