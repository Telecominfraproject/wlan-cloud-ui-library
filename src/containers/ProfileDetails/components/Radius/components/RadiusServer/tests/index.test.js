import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, waitFor } from '@testing-library/react';
import { render } from 'tests/utils';

import RadiusServer from '..';

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
  onSuccess: () => {},
  onCancel: () => {},
};

describe('<RadiusServer />', () => {
  afterEach(cleanup);

  it('Error messages should be visible when input values are invalid for Server Properties form', async () => {
    const { getByRole, getByText, getByLabelText } = render(<RadiusServer {...mockProps} />);

    expect(getByText('Server Properties')).toBeVisible();

    fireEvent.change(getByLabelText('IP'), { target: { value: null } });
    fireEvent.change(getByLabelText('Port'), { target: { value: null } });
    fireEvent.change(getByLabelText('Shared Secret'), { target: { value: null } });
    fireEvent.click(getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(getByText('Enter in the format [0-255].[0-255].[0-255].[0-255]')).toBeVisible();
      expect(getByText('Port expected between 1 - 65535')).toBeVisible();
      expect(getByText('Please enter a shared secret.')).toBeVisible();
    });
  });

  it('onSuccess should be called when form is submitted correctly', async () => {
    const submitSpy = jest.fn();
    const { getByRole, getByText, getByLabelText } = render(
      <RadiusServer {...mockProps} onSuccess={submitSpy} />
    );

    expect(getByText('Server Properties')).toBeVisible();

    fireEvent.change(getByLabelText('IP'), { target: { value: '0.0.0.0' } });
    fireEvent.change(getByLabelText('Port'), { target: { value: 1812 } });
    fireEvent.change(getByLabelText('Shared Secret'), { target: { value: 'abc' } });
    fireEvent.click(getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(submitSpy).toBeCalledTimes(1);
    });
  });

  it('onCancel should be called when cancel button is clicked', async () => {
    const submitSpy = jest.fn();

    const { getByRole, getByText } = render(<RadiusServer {...mockProps} onCancel={submitSpy} />);
    expect(getByText('Server Properties')).toBeVisible();
    fireEvent.click(getByRole('button', { name: /close/i }));

    await waitFor(() => {
      expect(submitSpy).toBeCalledTimes(1);
    });
  });
});
