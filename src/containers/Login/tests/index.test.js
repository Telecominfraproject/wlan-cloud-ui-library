import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, waitFor } from '@testing-library/react';

import { render } from 'tests/utils';
import Login from '..';

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

describe('<Login />', () => {
  afterEach(cleanup);

  it('should not call onLogin if email and password is empty', async () => {
    const submitSpy = jest.fn();
    const { getByTestId, getByText } = render(<Login onLogin={submitSpy} />);
    fireEvent.submit(getByTestId('loginButton'));

    await waitFor(() => {
      expect(getByText('Please input your e-mail')).toBeVisible();
      expect(getByText('Please input your password')).toBeVisible();
      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

  it('should not call onLogin if email is empty', async () => {
    const submitSpy = jest.fn();
    const { getByLabelText, getByTestId, getByText } = render(<Login onLogin={submitSpy} />);
    const input = getByLabelText('Password');
    fireEvent.change(input, { target: { value: 'password' } });
    fireEvent.submit(getByTestId('loginButton'));

    await waitFor(() => {
      expect(input.value).toBe('password');
      expect(getByText('Please input your e-mail')).toBeVisible();
      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

  it('should not call onLogin if password is empty', async () => {
    const submitSpy = jest.fn();
    const { getByLabelText, getByTestId, getByText } = render(<Login onLogin={submitSpy} />);
    const input = getByLabelText('E-mail');
    fireEvent.change(input, { target: { value: 'test@test.com' } });
    fireEvent.submit(getByTestId('loginButton'));

    await waitFor(() => {
      expect(input.value).toBe('test@test.com');
      expect(getByText('Please input your password')).toBeVisible();
      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

  it('should not call onLogin if email is wrong', async () => {
    const submitSpy = jest.fn();
    const { getByLabelText, getByTestId, getByText } = render(<Login onLogin={submitSpy} />);
    fireEvent.change(getByLabelText('E-mail'), { target: { value: 'test' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.submit(getByTestId('loginButton'));

    await waitFor(() => {
      expect(getByText('The input is not a valid e-mail')).toBeVisible();
      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

  it('should call onLogin if inputs provided correctly', async () => {
    const submitSpy = jest.fn();
    const { getByLabelText, getByTestId } = render(<Login onLogin={submitSpy} />);
    fireEvent.change(getByLabelText('E-mail'), { target: { value: 'test@test.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.submit(getByTestId('loginButton'));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });
});
