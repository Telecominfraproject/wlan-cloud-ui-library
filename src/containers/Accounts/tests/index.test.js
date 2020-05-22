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
};

describe('<Accounts />', () => {
  afterEach(cleanup);

  it('FormModal should not be visible on load', async () => {
    const { queryByTestId } = render(<Accounts {...mockProps} />);

    expect(queryByTestId('formmodal')).toBeNull();
  });

  it('add account button click should show FormModal', async () => {
    const { getByTestId } = render(<Accounts {...mockProps} />);
    fireEvent.click(getByTestId('addaccount'));

    expect(getByTestId('formmodal')).toBeVisible();
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

  it('onCreateUser should be called', async () => {
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
