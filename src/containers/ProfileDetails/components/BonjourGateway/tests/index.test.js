import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, waitFor } from '@testing-library/react';
import { Form } from 'antd';
import { render } from 'tests/utils';
import { mockBonjourGateway } from '../../../tests/constants';

import BonjourGateway from '..';

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

describe('<BonjourGateway />', () => {
  it('Form should load with the initial inputs for VLAN and Services if details object is empty', async () => {
    const BonjourGatewayForm = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <BonjourGateway form={form} />
        </Form>
      );
    };

    const { getByTestId } = render(<BonjourGatewayForm />);

    await waitFor(() => {
      expect(getByTestId('vlanCustomConfig0')).toBeVisible();
      expect(getByTestId('vlanDefaultConfig0')).toBeVisible();
      expect(getByTestId('vlanInput0')).toBeVisible();
    });
  });

  it('Remove button should be disabled if only one input exists in the form', async () => {
    const BonjourGatewayForm = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <BonjourGateway form={form} />
        </Form>
      );
    };

    const { getByTestId } = render(<BonjourGatewayForm />);
    expect(getByTestId('removeButton0')).toBeDisabled();
  });

  it('Remove button should should not be disabled if only one input exists in the form', async () => {
    const BonjourGatewayForm = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <BonjourGateway form={form} />
        </Form>
      );
    };

    const { getByTestId, getByRole } = render(<BonjourGatewayForm />);

    expect(getByTestId('removeButton0')).toBeDisabled();

    fireEvent.click(getByRole('button', { name: /add service set/i }));

    expect(getByTestId('removeButton0')).not.toBeDisabled();
    expect(getByTestId('removeButton1')).not.toBeDisabled();
  });

  it('Adding a service set should add it from the form', async () => {
    const BonjourGatewayForm = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <BonjourGateway form={form} {...mockBonjourGateway} />
        </Form>
      );
    };

    const { getByRole, getByTestId } = render(<BonjourGatewayForm />);

    fireEvent.click(getByRole('button', { name: /add service set/i }));
    await waitFor(() => {
      expect(getByTestId('vlanInput4')).toBeVisible();
    });
  });

  it('Add service button should be disabled once 5 service limit is reached', async () => {
    const BonjourGatewayForm = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <BonjourGateway form={form} {...mockBonjourGateway} />
        </Form>
      );
    };

    const { getByRole, getByTestId } = render(<BonjourGatewayForm />);

    const button = getByRole('button', { name: /add service set/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(getByTestId('vlanInput4')).toBeVisible();
      expect(button).toBeDisabled();
    });
  });

  it('Removing a service set should remove from the form', async () => {
    const BonjourGatewayForm = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <BonjourGateway form={form} {...mockBonjourGateway} />
        </Form>
      );
    };

    const { getByTestId } = render(<BonjourGatewayForm />);

    const button = getByTestId('removeButton3');
    fireEvent.click(button);
    await waitFor(() => {
      expect(button).not.toBeInTheDocument();
    });
  });

  it('Removing a service set with a default VLAN selected, should show the VLAN configuration radio for the other inputs ', async () => {
    const BonjourGatewayForm = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <BonjourGateway form={form} {...mockBonjourGateway} />
        </Form>
      );
    };

    const { getByTestId } = render(<BonjourGatewayForm />);

    const button = getByTestId('removeButton0');
    fireEvent.click(button);

    await waitFor(() => {
      expect(getByTestId('vlanCustomConfig0')).toBeVisible();
      expect(getByTestId('vlanCustomConfig1')).toBeVisible();
      expect(getByTestId('vlanCustomConfig2')).toBeVisible();
    });
  });

  it('Changing a service set with a default VLAN selected to Custom, should show the VLAN configuration radio for the other inputs ', async () => {
    const BonjourGatewayForm = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <BonjourGateway form={form} {...mockBonjourGateway} />
        </Form>
      );
    };

    const { getByTestId } = render(<BonjourGatewayForm />);

    fireEvent.click(getByTestId('vlanCustomConfig0'));

    await waitFor(() => {
      expect(getByTestId('vlanCustomConfig1')).toBeVisible();
      expect(getByTestId('vlanCustomConfig2')).toBeVisible();
    });
  });

  it('Changing a service set with a custom VLAN selected to Default, should hide the VLAN configuration radio for the other inputs ', async () => {
    const BonjourGatewayForm = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <BonjourGateway form={form} {...mockBonjourGateway} />
        </Form>
      );
    };

    const { getByTestId } = render(<BonjourGatewayForm />);

    const vlanCustomConfig0 = getByTestId('vlanCustomConfig0');
    fireEvent.click(vlanCustomConfig0);
    fireEvent.click(getByTestId('vlanDefaultConfig1'));

    await waitFor(() => {
      expect(vlanCustomConfig0).not.toBeInTheDocument();
    });
  });

  it('Error messages should show if new VLAN is empty', async () => {
    const BonjourGatewayForm = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <BonjourGateway form={form} {...mockBonjourGateway} />
        </Form>
      );
    };

    const { getByRole, getByTestId, getByText } = render(<BonjourGatewayForm />);

    fireEvent.click(getByRole('button', { name: /add service set/i }));

    await waitFor(() => {
      expect(getByTestId('vlanInput4')).toBeVisible();
    });

    fireEvent.change(getByTestId('vlanInput4'), { target: { value: ' ' } });

    await waitFor(() => {
      expect(getByText('Unique VLAN expected between 2 - 4095.')).toBeVisible();
    });
  });

  it('Error messages should show if new VLAN is not unique', async () => {
    const BonjourGatewayForm = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <BonjourGateway form={form} {...mockBonjourGateway} />
        </Form>
      );
    };

    const { getByRole, getByTestId, getByText } = render(<BonjourGatewayForm />);

    fireEvent.click(getByRole('button', { name: /add service set/i }));

    await waitFor(() => {
      expect(getByTestId('vlanInput4')).toBeVisible();
    });

    fireEvent.change(getByTestId('vlanInput4'), {
      target: { value: mockBonjourGateway.details.bonjourServices[1].vlanId },
    });

    await waitFor(() => {
      expect(getByText('Unique VLAN expected between 2 - 4095.')).toBeVisible();
    });
  });
});
