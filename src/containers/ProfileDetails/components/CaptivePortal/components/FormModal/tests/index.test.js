import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, waitFor } from '@testing-library/react';
import { render } from 'tests/utils';
import userEvent from '@testing-library/user-event';
import faker from 'faker';

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

const MISSING_USERNAME = 'Please input your username.';
const MISSING_PASSWORD = 'Please input your password.';
const INVALID_USERNAME = 'Username already used. Please enter a new username.';

function buildUserForm() {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
  };
}

const mockProps = {
  visible: true,
  usedUserNames: [buildUserForm().username],
};

describe('<FormModal />', () => {
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

  it('Invalid username error should show if user enters a username that is already a part of the user list', async () => {
    const submitSpy = jest.fn();

    const { getByText, getByRole, getByLabelText } = render(
      <FormModal {...mockProps} onSubmit={submitSpy} />
    );

    const { password, firstname, lastname } = buildUserForm();

    userEvent.type(getByRole('textbox', { name: /username/i }), mockProps.usedUserNames[0]);
    userEvent.type(getByLabelText(/password/i), password);
    userEvent.type(getByRole('textbox', { name: /first name/i }), firstname);
    userEvent.type(getByRole('textbox', { name: /last name/i }), lastname);

    fireEvent.click(getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(0);
      expect(getByText(INVALID_USERNAME)).toBeVisible();
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

  it('onCancel default props', async () => {
    const { getByRole } = render(<FormModal {...mockProps} />);

    fireEvent.click(getByRole('button', { name: /cancel/i }));
  });

  it('onSubmit default props', async () => {
    const { getByRole, getByLabelText } = render(
      <FormModal {...mockProps} username="username" firstName="firstname" lastName="lastname" />
    );

    const { password } = buildUserForm();

    userEvent.type(getByLabelText(/password/i), password);

    fireEvent.click(getByRole('button', { name: 'Save' }));
  });
});
