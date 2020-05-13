import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, waitFor } from '@testing-library/react';

import { render } from 'tests/utils';
import EditAccount from '..';

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

describe('<EditAccount />', () => {
  afterEach(cleanup);

  it('should not call onSubmit if both password fields are empty', async () => {
    const submitSpy = jest.fn();
    const { getByTestId, getByText } = render(<EditAccount email="" onSubmit={submitSpy} />);
    fireEvent.submit(getByTestId('saveButton'));

    await waitFor(() => {
      expect(getByText('Please input your new password')).toBeVisible();
      expect(getByText('Please confirm your password')).toBeVisible();
      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

  it('should not call onSubmit if new password input is empty', async () => {
    const submitSpy = jest.fn();
    const { getByLabelText, getByTestId, getByText } = render(
      <EditAccount email="" onSubmit={submitSpy} />
    );
    const input = getByLabelText('Confirm Password');
    fireEvent.change(input, { target: { value: 'password' } });
    fireEvent.submit(getByTestId('saveButton'));

    await waitFor(() => {
      expect(input.value).toBe('password');
      expect(getByText('Please input your new password')).toBeVisible();
      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

  it('should not call onSubmit if confirmed password input is empty', async () => {
    const submitSpy = jest.fn();
    const { getByLabelText, getByTestId, getByText } = render(
      <EditAccount email="" onSubmit={submitSpy} />
    );
    const input = getByLabelText('New Password');
    fireEvent.change(input, { target: { value: 'password' } });
    fireEvent.submit(getByTestId('saveButton'));

    await waitFor(() => {
      expect(input.value).toBe('password');
      expect(getByText('Please confirm your password')).toBeVisible();
      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

  it('should not call onSubmit if both password inputs do not match', async () => {
    const submitSpy = jest.fn();
    const { getByLabelText, getByTestId, getByText } = render(
      <EditAccount email="" onSubmit={submitSpy} />
    );
    fireEvent.change(getByLabelText('New Password'), { target: { value: 'password' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'password123' } });
    fireEvent.submit(getByTestId('saveButton'));

    await waitFor(() => {
      expect(getByText('The two passwords do not match')).toBeVisible();
      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

  it('should call onSubmit if both password inputs are provided correctly', async () => {
    const submitSpy = jest.fn();
    const { getByLabelText, getByTestId } = render(<EditAccount email="" onSubmit={submitSpy} />);
    fireEvent.change(getByLabelText('New Password'), { target: { value: 'password' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'password' } });
    fireEvent.submit(getByTestId('saveButton'));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });
});
