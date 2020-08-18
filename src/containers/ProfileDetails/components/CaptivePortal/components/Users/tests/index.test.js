import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, waitFor, within } from '@testing-library/react';
import { render } from 'tests/utils';
import Users from '..';

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
  userList: [
    {
      model_type: 'TimedAccessUserRecord',
      username: 'test',
      password: 'test',
      activationTime: null,
      expirationTime: null,
      numDevices: 0,
      userDetails: {
        model_type: 'TimedAccessUserDetails',
        firstName: 'test',
        lastName: 'test',
        passwordNeedsReset: false,
      },
      userMacAddresses: [],
      lastModifiedTimestamp: 0,
    },
    {
      model_type: 'TimedAccessUserRecord',
      username: 'test2',
      password: 'test2',
      activationTime: null,
      expirationTime: null,
      numDevices: 0,
      userDetails: {
        model_type: 'TimedAccessUserDetails',
        firstName: 'test2',
        lastName: 'test2',
        passwordNeedsReset: false,
      },
      userMacAddresses: [],
      lastModifiedTimestamp: 0,
    },
  ],
};

describe('<Users />', () => {
  beforeEach(cleanup);

  it('Add User button press should show Add User modal', async () => {
    const { getByRole, getByText } = render(<Users {...mockProps} />);

    fireEvent.click(getByRole('button', { name: /add user/i }));

    expect(getByText('Add User', { selector: 'div' })).toBeVisible();
  });

  it('Edit User button press should show Edit User modal', async () => {
    const { getByRole, getByText } = render(<Users {...mockProps} />);

    fireEvent.click(getByRole('button', { name: `edit-${mockProps.userList[0].username}` }));
    expect(getByText('Edit User')).toBeVisible();
  });

  it('Delete User button press should show Delete User modal', async () => {
    const { getByRole, getByText } = render(<Users {...mockProps} deleteUserModal />);
    fireEvent.click(getByRole('button', { name: `delete-${mockProps.userList[0].username}` }));

    const paragraph = getByText('Are you sure you want to delete the user:');
    expect(paragraph).toBeVisible();
    expect(within(paragraph).getByText(mockProps.userList[0].username)).toBeVisible();
  });

  it('Cancel button press should hide Add User modal', async () => {
    const { getByRole, getByText } = render(<Users {...mockProps} />);

    fireEvent.click(getByRole('button', { name: /add user/i }));

    const paragraph = getByText('Add User', { selector: 'div' });
    expect(paragraph).toBeVisible();
    fireEvent.click(getByRole('button', { name: `Cancel` }));
    await waitFor(() => {
      expect(paragraph).not.toBeVisible();
    });
  });

  it('Cancel button press should hide Edit User modal', async () => {
    const { getByRole, getByText } = render(<Users {...mockProps} />);

    fireEvent.click(getByRole('button', { name: `edit-${mockProps.userList[0].username}` }));
    const paragraph = getByText('Edit User');
    expect(paragraph).toBeVisible();
    fireEvent.click(getByRole('button', { name: `Cancel` }));
    await waitFor(() => {
      expect(paragraph).not.toBeVisible();
    });
  });

  it('Cancel button press should hide Delete User modal', async () => {
    const { getByRole, getByText } = render(<Users {...mockProps} />);
    fireEvent.click(getByRole('button', { name: `delete-${mockProps.userList[0].username}` }));

    const paragraph = getByText('Are you sure you want to delete the user:');
    expect(paragraph).toBeVisible();
    expect(within(paragraph).getByText(mockProps.userList[0].username)).toBeVisible();

    fireEvent.click(getByRole('button', { name: `Cancel` }));
    await waitFor(() => {
      expect(paragraph).not.toBeVisible();
    });
  });

  it('Correct form submission on Add User Modal', async () => {
    const submitSpy = jest.fn();

    const { getByRole, getByText, getByLabelText } = render(
      <Users {...mockProps} handleAddUser={submitSpy} />
    );

    fireEvent.click(getByRole('button', { name: /add user/i }));

    const paragraph = getByText('Add User', { selector: 'div' });
    expect(paragraph).toBeVisible();

    fireEvent.change(getByLabelText('Username'), { target: { value: 'username' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.change(getByLabelText('First Name'), { target: { value: 'firstname' } });
    fireEvent.change(getByLabelText('Last Name'), { target: { value: 'lastname' } });
    fireEvent.click(getByRole('button', { name: `Save` }));
    await waitFor(() => {
      expect(submitSpy).toBeCalledTimes(1);
    });
  });

  it('Correct form submission on Edit User Modal', async () => {
    const submitSpy = jest.fn();

    const { getByRole, getByText, getByLabelText } = render(
      <Users {...mockProps} handleUpdateUser={submitSpy} />
    );

    fireEvent.click(getByRole('button', { name: `edit-${mockProps.userList[1].username}` }));
    const paragraph = getByText('Edit User');
    expect(paragraph).toBeVisible();

    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });

    fireEvent.click(getByRole('button', { name: `Save` }));
    await waitFor(() => {
      expect(submitSpy).toBeCalledTimes(1);
    });
  });

  it('Delete button on Delete Modal should delete user', async () => {
    const submitSpy = jest.fn();
    const { getByRole, getByText } = render(<Users {...mockProps} handleDeleteUser={submitSpy} />);
    fireEvent.click(getByRole('button', { name: `delete-${mockProps.userList[0].username}` }));

    const paragraph = getByText('Are you sure you want to delete the user:');
    expect(paragraph).toBeVisible();
    expect(within(paragraph).getByText(mockProps.userList[0].username)).toBeVisible();

    fireEvent.click(getByRole('button', { name: 'Delete' }));
    await waitFor(() => {
      expect(submitSpy).toBeCalledTimes(1);
    });
  });

  it('handleAddUser default props', async () => {
    const { getByRole, getByText, getByLabelText } = render(<Users {...mockProps} />);

    fireEvent.click(getByRole('button', { name: /add user/i }));

    const paragraph = getByText('Add User', { selector: 'div' });
    expect(paragraph).toBeVisible();

    fireEvent.change(getByLabelText('Username'), { target: { value: 'username' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.change(getByLabelText('First Name'), { target: { value: 'firstname' } });
    fireEvent.change(getByLabelText('Last Name'), { target: { value: 'lastname' } });
    fireEvent.click(getByRole('button', { name: `Save` }));
  });

  it('handleUpdateUser default props', async () => {
    const { getByRole, getByText, getByLabelText } = render(<Users {...mockProps} />);

    fireEvent.click(getByRole('button', { name: `edit-${mockProps.userList[1].username}` }));
    const paragraph = getByText('Edit User');
    expect(paragraph).toBeVisible();

    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });

    fireEvent.click(getByRole('button', { name: `Save` }));
  });
  it('handleDeleteUser default props', async () => {
    const { getByRole, getByText } = render(<Users {...mockProps} />);
    fireEvent.click(getByRole('button', { name: `delete-${mockProps.userList[0].username}` }));

    const paragraph = getByText('Are you sure you want to delete the user:');
    expect(paragraph).toBeVisible();
    expect(within(paragraph).getByText(mockProps.userList[0].username)).toBeVisible();

    fireEvent.click(getByRole('button', { name: 'Delete' }));
  });
});
