import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, waitFor } from '@testing-library/react';
import { render } from 'tests/utils';

import ManagementSubnetModal from '..';

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
  title: 'Add Subnet Configuration',
  subnet: {
    proxyConfig: { floatingIpAddress: '1.1.1.1' },
    serviceRegionName: 'Ottawa',
    subnetAddress: '1.1.1.1',
    subnetCidrPrefix: '1',
    subnetName: '3',
  },
};

describe('<ManagementSubnetModal />', () => {
  afterEach(cleanup);

  it('Error messages should be visible when input values are invalid for Add Subnet Configuration modal', async () => {
    const subnet = {};
    const { getByRole, getByText, getByLabelText } = render(
      <ManagementSubnetModal {...mockProps} subnet={subnet} />
    );
    await waitFor(() => {
      expect(getByText('Add Subnet Configuration')).toBeVisible();
    });
    expect(getByLabelText('Zone Name').closest('input')).toBeDisabled();

    fireEvent.click(
      getByRole('button', {
        name: /save/i,
      })
    );

    await waitFor(() => {
      expect(getByText('Please enter subnet name')).toBeVisible();
      expect(getByText('Enter in the format [0-255].[0-255].[0-255].[0-255]')).toBeVisible();
      expect(
        getByText('Please enter in range [1, 32] or format [0-255].[0-255].[0-255].[0-255]')
      ).toBeVisible();
    });

    fireEvent.change(getByLabelText('Subnet CIDR Mask'), { target: { value: '64' } });

    fireEvent.click(
      getByRole('button', {
        name: /save/i,
      })
    );

    await waitFor(() => {
      expect(
        getByText(
          'Please include only numbers in range [1, 32] or format [0-255].[0-255].[0-255].[0-255]'
        )
      ).toBeVisible();
    });
  });

  it('onSuccess should be called when Add Subnet Configuration modal is submitted correctly', async () => {
    const submitSpy = jest.fn();
    const { getByRole, getByLabelText } = render(
      <ManagementSubnetModal {...mockProps} onSuccess={submitSpy} />
    );
    fireEvent.change(getByLabelText('Subnet Name'), { target: { value: 'abc' } });
    fireEvent.change(getByLabelText('Subnet IP'), { target: { value: '0.0.0.0' } });
    fireEvent.change(getByLabelText('Subnet CIDR Mask'), { target: { value: '0.0.0.0' } });
    fireEvent.click(
      getByRole('button', {
        name: /save/i,
      })
    );
    await waitFor(() => {
      expect(submitSpy).toBeCalledTimes(1);
    });
  });

  it('onSuccess should be called when Edit Subnet Configuration modal is submitted correctly', async () => {
    const submitSpy = jest.fn();
    const { getByRole, getByLabelText } = render(
      <ManagementSubnetModal
        {...mockProps}
        title="Edit Subnet Configuration"
        onSuccess={submitSpy}
      />
    );

    fireEvent.change(getByLabelText('Subnet Name'), { target: { value: 'abc' } });
    fireEvent.change(getByLabelText('Subnet IP'), { target: { value: '0.0.0.0' } });
    fireEvent.change(getByLabelText('Subnet CIDR Mask'), { target: { value: '0.0.0.0' } });
    fireEvent.click(
      getByRole('button', {
        name: /save/i,
      })
    );
    await waitFor(() => {
      expect(submitSpy).toBeCalledTimes(1);
    });
  });

  it('click on cancel button should hide Add Subnet Configuration modal', async () => {
    const submitSpy = jest.fn();
    const { getByRole, getByText } = render(
      <ManagementSubnetModal {...mockProps} onCancel={submitSpy} />
    );
    expect(getByText('Add Subnet Configuration')).toBeVisible();

    fireEvent.click(getByRole('button', { name: /cancel/i }));

    await waitFor(() => {
      expect(submitSpy).toBeCalledTimes(1);
    });
  });

  it('click on cancel button should hide Edit Subnet Configuration modal', async () => {
    const submitSpy = jest.fn();
    const { getByRole, getByText } = render(
      <ManagementSubnetModal
        {...mockProps}
        title="Edit Subnet Configuration"
        onCancel={submitSpy}
      />
    );
    expect(getByText('Edit Subnet Configuration')).toBeVisible();

    fireEvent.click(getByRole('button', { name: /cancel/i }));

    await waitFor(() => {
      expect(submitSpy).toBeCalledTimes(1);
    });
  });
});
