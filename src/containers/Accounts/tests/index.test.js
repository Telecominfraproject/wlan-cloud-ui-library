import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, waitFor, within } from '@testing-library/react';

import { render, DOWN_ARROW, ENTER_KEY } from 'tests/utils';
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
      customerId: '2',
      id: '20',
      email: 'support@mail.com',
      roles: ['SuperUser'],
    },
  ],
  currentUserId: 1,
};

const MISSING_EMAIL = 'Please input your e-mail';
const INVALID_EMAIL = 'The input is not a valid e-mail';
const INVALID_PASSWORD = 'Please input your password';
const INVALID_CONFIRMED_PASSWORD = 'Please input your password';
const INVALID_PASSWORDS = 'The two passwords do not match';

describe('<Accounts />', () => {
  it('delete user button click should show modal', async () => {
    const { getByRole, getByText } = render(<Accounts {...mockProps} />);
    fireEvent.click(getByRole('button', { name: `delete-${mockProps.data[0].email}` }));

    const paragraph = getByText(/Are you sure you want to delete the User:/i);
    expect(paragraph).toBeVisible();
    expect(within(paragraph).getByText(mockProps.data[0].email)).toBeVisible();
  });

  it('edit account button click should show FormModal', async () => {
    const { getByRole, getByText } = render(<Accounts {...mockProps} />);

    fireEvent.click(getByRole('button', { name: `edit-${mockProps.data[0].email}` }));

    expect(getByText('Edit User')).toBeVisible();
  });

  it('add account button click should show FormModal', async () => {
    const { getByRole, getByText } = render(<Accounts {...mockProps} />);

    fireEvent.click(getByRole('button', { name: /addaccount/i }));

    expect(getByText('Add User', { selector: 'div' })).toBeVisible();
  });

  it('onDeleteUser should be called when modal is submitted', async () => {
    const submitSpy = jest.fn();
    const { getByRole } = render(<Accounts {...mockProps} onDeleteUser={submitSpy} />);
    fireEvent.click(getByRole('button', { name: `delete-${mockProps.data[0].email}` }));
    expect(getByRole('button', { name: 'Delete' }));
    fireEvent.click(getByRole('button', { name: 'Delete' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('onEditUser should not be called when form is invalid', async () => {
    const submitSpy = jest.fn();
    const { getByText, getByRole } = render(<Accounts {...mockProps} onEditUser={submitSpy} />);
    fireEvent.click(getByRole('button', { name: `edit-${mockProps.data[0].email}` }));

    expect(getByText('Edit User')).toBeVisible();

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
    fireEvent.click(getByRole('button', { name: `edit-${mockProps.data[0].email}` }));
    expect(getByText('Edit User')).toBeVisible();

    fireEvent.change(getByLabelText('E-mail'), { target: { value: 'test@test.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'Password0' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'Password0' } });
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('cancel button click should hide Add User modal', async () => {
    const { getByRole, getByText, queryByText } = render(<Accounts {...mockProps} />);

    fireEvent.click(getByRole('button', { name: /addaccount/i }));
    expect(getByText('Add User', { selector: 'div' })).toBeVisible();
    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(queryByText('Add User', { selector: 'div' })).not.toBeInTheDocument();
    });
  });

  it('cancel button click should hide Edit User Modal', async () => {
    const { getByRole, getByText, queryByText } = render(<Accounts {...mockProps} />);

    fireEvent.click(getByRole('button', { name: /edit/i }));
    expect(getByText('Edit User')).toBeVisible();
    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(queryByText('Edit User')).not.toBeInTheDocument();
    });
  });

  it('cancel button click should hide Delete User Modal', async () => {
    const { getByRole, getByText, queryByText } = render(<Accounts {...mockProps} />);

    fireEvent.click(getByRole('button', { name: `delete-${mockProps.data[0].email}` }));
    expect(getByText('Are you sure?')).toBeVisible();
    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(queryByText('Are you sure?')).not.toBeInTheDocument();
    });
  });

  it('onCreateUser should not be called when form is invalid', async () => {
    const submitSpy = jest.fn();
    const { getByText, getByRole } = render(<Accounts {...mockProps} onCreateUser={submitSpy} />);
    fireEvent.click(getByRole('button', { name: /addaccount/i }));
    expect(getByText('Add User', { selector: 'div' })).toBeVisible();

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
    expect(getByText('Add User', { selector: 'div' })).toBeVisible();

    fireEvent.change(getByLabelText('Password'), { target: { value: 'Password0' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'Password0' } });
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
    expect(getByText('Add User', { selector: 'div' })).toBeVisible();

    fireEvent.change(getByLabelText('E-mail'), { target: { value: 'email' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'Password0' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'Password0' } });
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
    expect(getByText('Add User', { selector: 'div' })).toBeVisible();

    fireEvent.change(getByLabelText('E-mail'), { target: { value: 'email@test.com' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'Password0' } });
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
    expect(getByText('Add User', { selector: 'div' })).toBeVisible();

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
    expect(getByText('Add User', { selector: 'div' })).toBeVisible();

    fireEvent.change(getByLabelText('E-mail'), { target: { value: 'email@test.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'Password0' } });
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
    expect(getByText('Add User', { selector: 'div' })).toBeVisible();

    fireEvent.change(getByLabelText('E-mail'), { target: { value: 'test@test.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'Password0' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'Password0' } });

    const role = getByLabelText('Role');
    fireEvent.keyDown(role, DOWN_ARROW);
    // await waitForElement(() => getByText('SuperUser', { selector: 'div' }));
    fireEvent.keyDown(role, ENTER_KEY);
    // fireEvent.click(getByText('SuperUser', { selector: 'div' }));

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('if isLastPage is true Load More button should not be visible', async () => {
    const { queryByRole } = render(<Accounts {...mockProps} />);
    expect(queryByRole('button', { name: 'Load More' })).toBeNull();
  });

  it('if isLastPage is false Load More button should be visible', async () => {
    const { getByRole } = render(<Accounts {...mockProps} isLastPage={false} />);
    expect(getByRole('button', { name: 'Load More' })).toBeVisible();
  });

  it('onLoadMore should be called when ', async () => {
    const submitSpy = jest.fn();
    const { getByRole } = render(
      <Accounts {...mockProps} isLastPage={false} onLoadMore={submitSpy} />
    );

    fireEvent.click(getByRole('button', { name: 'Load More' }));

    expect(submitSpy).toHaveBeenCalledTimes(1);
  });
  it('onLoadMore should be called with default prop', async () => {
    const { getByRole } = render(<Accounts {...mockProps} isLastPage={false} />);

    fireEvent.click(getByRole('button', { name: 'Load More' }));
  });
});
