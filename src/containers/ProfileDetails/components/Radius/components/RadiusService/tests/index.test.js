import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, waitFor } from '@testing-library/react';
import { render } from 'tests/utils';

import RadiusServiceModal from '..';

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
  visible: true,
  title: 'Add RADIUS Service',
  service: { ips: [{ authPort: 1812, ipAddress: '1.1.1.1', secret: '123' }] },
  disabled: false,
};

describe('<RadiusServiceModal />', () => {
  afterEach(cleanup);

  it('error message should be displayed when input value for Service Name is invalid', async () => {
    const { getByText, getByRole, getByLabelText } = render(<RadiusServiceModal {...mockProps} />);
    expect(getByText('Add RADIUS Service')).toBeVisible();
    fireEvent.change(getByLabelText('Service Name'), { target: { value: '0 0' } });
    fireEvent.click(getByRole('button', { name: 'Save' }));
    await waitFor(() => {
      expect(
        getByText('Please enter a name of length 1 - 32 characters, no spaces.')
      ).toBeVisible();
    });
  });

  it('onSuccess should be called when form is submitted correctly', async () => {
    const submitSpy = jest.fn();
    const { getByRole, getByText, getByLabelText } = render(
      <RadiusServiceModal {...mockProps} onSuccess={submitSpy} />
    );
    expect(getByText('Add RADIUS Service')).toBeVisible();
    fireEvent.change(getByLabelText('Service Name'), { target: { value: 'abc' } });

    fireEvent.click(getByRole('button', { name: /Add RADIUS Server/i }));

    expect(getByText('Server Properties')).toBeVisible();
    expect(getByRole('button', { name: /submit/i })).toBeVisible();

    fireEvent.change(getByLabelText('IP'), { target: { value: '0.0.0.0' } });
    fireEvent.change(getByLabelText('Port'), { target: { value: 1812 } });
    fireEvent.change(getByLabelText('Shared Secret'), { target: { value: 'abc' } });
    fireEvent.click(getByRole('button', { name: /submit/i }));
    fireEvent.click(getByText(/save/i));

    await waitFor(() => {
      expect(submitSpy).toBeCalledTimes(1);
    });
  });

  it('onCancel should be called when cancel button is clicked', async () => {
    const submitSpy = jest.fn();

    const { getByRole, getByText } = render(
      <RadiusServiceModal {...mockProps} onCancel={submitSpy} />
    );
    expect(getByText('Add RADIUS Service')).toBeVisible();
    fireEvent.click(getByRole('button', { name: /cancel/i }));

    await waitFor(() => {
      expect(submitSpy).toBeCalledTimes(1);
    });
  });
});
