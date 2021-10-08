import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, waitFor, act } from '@testing-library/react';
import faker from 'faker';
import { Form } from 'antd';
import { render } from 'tests/utils';

import { mockProviderId } from '../../../tests/constants';

import ProviderIdForm from '..';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('<ProviderIdForm />', () => {
  it('should work when roaming oi is null', async () => {
    const ProviderIdFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <ProviderIdForm details={{ ...mockProviderId, roamingOi: null }} form={form} />
        </Form>
      );
    };
    render(<ProviderIdFormComp />);
  });

  it('Clicking Add Roaming OI should add the first OI input to the form', async () => {
    const ProviderIdFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <ProviderIdForm details={mockProviderId} form={form} />
        </Form>
      );
    };
    const { getByText, getByPlaceholderText } = render(<ProviderIdFormComp />);

    fireEvent.click(getByText(/add roaming oi/i));

    await waitFor(() => {
      expect(getByPlaceholderText('Enter OI 1')).toBeVisible();
    });
  });

  it('Clicking the delete OI button should remove the associated OI input from the form', async () => {
    const ProviderIdFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <ProviderIdForm details={mockProviderId} form={form} />
        </Form>
      );
    };
    const { getByText, getByPlaceholderText, getByTestId } = render(<ProviderIdFormComp />);

    fireEvent.click(getByText(/add roaming oi/i));

    const input = getByPlaceholderText('Enter OI 1');
    await waitFor(() => {
      expect(input).toBeVisible();
    });

    fireEvent.click(getByTestId('removeRoamingOI0'));

    await waitFor(() => {
      expect(input).not.toBeInTheDocument();
    });
  });

  it('Error message should show if Roaming OI is not between 3 and 15 octets and configured as a hexstring', async () => {
    const ProviderIdFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <ProviderIdForm details={mockProviderId} form={form} />
        </Form>
      );
    };
    const { getByText, getByPlaceholderText, queryByText } = render(<ProviderIdFormComp />);

    fireEvent.click(getByText(/add roaming oi/i));

    const input = getByPlaceholderText('Enter OI 1');
    fireEvent.change(input, { target: { value: faker.internet.userName() } });

    const errorMsg = 'Each OI must be between 3 and 15 octets and configured as a hexstring';
    await waitFor(() => {
      expect(getByText(errorMsg)).toBeVisible();
    });

    // all faker hexaDecimal values are prepended by "0x" which the OI regex does not support
    fireEvent.change(input, { target: { value: faker.random.hexaDecimal(8).substring(2) } });

    await waitFor(() => {
      expect(queryByText(errorMsg)).not.toBeInTheDocument();
    });
  });

  it('Error message should show if Roaming OI is duplicated', async () => {
    const ProviderIdFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <ProviderIdForm details={mockProviderId} form={form} />
        </Form>
      );
    };
    const { getByText, getByPlaceholderText } = render(<ProviderIdFormComp />);

    const errorMsg = 'Enter a unique OI';
    // all faker hexaDecimal values are prepended by "0x" which the OI regex does not support
    const hexString = faker.random.hexaDecimal(8).substring(2);

    fireEvent.click(getByText(/add roaming oi/i));
    const input = getByPlaceholderText('Enter OI 1');
    fireEvent.change(input, { target: { value: hexString } });

    fireEvent.click(getByText(/add roaming oi/i));
    const input2 = getByPlaceholderText('Enter OI 2');
    fireEvent.change(input2, { target: { value: hexString } });

    await waitFor(() => {
      expect(getByText(errorMsg)).toBeVisible();
    });
  });

  it('should add a new PLMN to the table', async () => {
    const ProviderIdFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <ProviderIdForm details={mockProviderId} form={form} />
        </Form>
      );
    };
    const { getByRole, getByText, getByLabelText, getByTestId, queryByText } = render(
      <ProviderIdFormComp />
    );

    fireEvent.click(getByTestId('addPlmn'));
    expect(getByText('Add Public Land Mobile Network (PLMN)')).toBeVisible();
    fireEvent.change(getByLabelText('Mcc'), { target: { value: 240 } });
    fireEvent.change(getByLabelText('Mnc'), { target: { value: 680 } });

    await act(async () => {
      fireEvent.click(getByRole('button', { name: /save/i }));
    });

    await waitFor(() => {
      expect(queryByText('Add Public Land Mobile Network (PLMN)')).not.toBeInTheDocument();
      expect(getByText('240')).toBeVisible();
      expect(getByText('680')).toBeVisible();
    });
  });

  it('EAP method form shows error when form is submitted and authentication is not selected', async () => {
    const ProviderIdFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <ProviderIdForm details={{ ...mockProviderId.details }} form={form} />
        </Form>
      );
    };
    const { getByTestId, getByText, getByRole } = render(<ProviderIdFormComp />);

    fireEvent.click(getByTestId('addEapMethod'));
    expect(getByText('Add EAP Method')).toBeVisible();

    fireEvent.mouseDown(getByRole('combobox', { name: 'Method' }));
    fireEvent.click(getByText('EAP-MSCHAP-V2 with username/password'));

    await act(async () => {
      fireEvent.click(getByRole('button', { name: /save/i }));
    });

    await waitFor(() => {
      expect(getByText('Authentication field cannot be empty')).toBeVisible();
    });
  });

  it('EAP modal should hide when cancel button is pressed', async () => {
    const ProviderIdFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <ProviderIdForm details={{ ...mockProviderId.details }} form={form} />
        </Form>
      );
    };
    const { getByText, getByTestId, getByRole, queryByText } = render(<ProviderIdFormComp />);

    fireEvent.click(getByTestId('addEapMethod'));
    expect(getByText('Add EAP Method')).toBeVisible();

    fireEvent.click(getByRole('button', { name: /cancel/i }));
    await waitFor(() => {
      expect(queryByText('Add EAP Method')).not.toBeInTheDocument();
    });
  });

  it('Plmn modal should close when canceled', async () => {
    const ProviderIdFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <ProviderIdForm details={{ ...mockProviderId.details }} form={form} />
        </Form>
      );
    };
    const { getByTestId, getByText, getByRole, queryByText } = render(<ProviderIdFormComp />);

    fireEvent.click(getByTestId('addPlmn'));
    expect(getByText('Add Public Land Mobile Network (PLMN)')).toBeVisible();

    await act(async () => {
      fireEvent.click(getByRole('button', { name: /cancel/i }));
    });

    await waitFor(() => {
      expect(queryByText('Add Public Land Mobile Network (PLMN)')).not.toBeInTheDocument();
    });
  });

  it('plmn mcc input should only be number inputs', async () => {
    const ProviderIdFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <ProviderIdForm details={{ ...mockProviderId.details }} form={form} />
        </Form>
      );
    };
    const { getByTestId, getByText, getByRole, getByLabelText } = render(<ProviderIdFormComp />);

    fireEvent.click(getByTestId('addPlmn'));
    expect(getByText('Add Public Land Mobile Network (PLMN)')).toBeVisible();
    fireEvent.change(getByLabelText('Mcc'), { target: { value: 'test' } });
    fireEvent.change(getByLabelText('Mnc'), { target: { value: 240 } });

    await act(async () => {
      fireEvent.click(getByRole('button', { name: /save/i }));
    });

    await waitFor(() => {
      expect(getByText('Mcc field cannot be empty')).toBeVisible();
    });
  });

  it('plmn mnc input should only be number inputs', async () => {
    const ProviderIdFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <ProviderIdForm details={{ ...mockProviderId.details }} form={form} />
        </Form>
      );
    };
    const { getByTestId, getByText, getByRole, getByLabelText } = render(<ProviderIdFormComp />);

    fireEvent.click(getByTestId('addPlmn'));
    expect(getByText('Add Public Land Mobile Network (PLMN)')).toBeVisible();
    fireEvent.change(getByLabelText('Mcc'), { target: { value: 240 } });
    fireEvent.change(getByLabelText('Mnc'), { target: { value: 'test' } });

    await act(async () => {
      fireEvent.click(getByRole('button', { name: /save/i }));
    });

    await waitFor(() => {
      expect(getByText('Mnc field cannot be empty')).toBeVisible();
    });
  });
  it('should show data in eap table', async () => {
    const ProviderIdFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <ProviderIdForm
            details={{
              ...mockProviderId.details,
              eapMap: {
                'EAP-TTLS with username/password': [
                  'Expanded EAP Method: Hardware Token',
                  'Credential Type: SIM',
                ],
                'EAP-MSCHAP-V2 with username/password': [
                  'Non-EAP Inner Authentication Type: PAP',
                  'Tunneled EAP Method Credential Type: SIM',
                ],
                'EAP-TLS with certificate': ['Credential Type: Softoken'],
              },
            }}
            form={form}
          />
        </Form>
      );
    };
    const { getByText } = render(<ProviderIdFormComp />);

    expect(getByText('EAP-TTLS with username/password')).toBeVisible();
  });

  it('EAP form should display error message when fields are empty', async () => {
    const ProviderIdFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <ProviderIdForm
            details={{
              ...mockProviderId.details,
            }}
            form={form}
          />
        </Form>
      );
    };
    const { getByText, getByTestId, getByRole } = render(<ProviderIdFormComp />);

    fireEvent.click(getByTestId('addEapMethod'));
    expect(getByText('Add EAP Method')).toBeVisible();

    fireEvent.click(getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(getByText('Method field cannot be empty')).toBeVisible();
      expect(getByText('Authentication field cannot be empty')).toBeVisible();
    });
  });

  it('Plmn form should display error messages when fields are empty', async () => {
    const ProviderIdFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <ProviderIdForm
            details={{
              ...mockProviderId.details,
            }}
            form={form}
          />
        </Form>
      );
    };
    const { getByText, getByTestId, getByRole } = render(<ProviderIdFormComp />);

    fireEvent.click(getByTestId('addPlmn'));
    fireEvent.click(getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(getByText('Mcc field cannot be empty')).toBeVisible();
      expect(getByText('Mnc field cannot be empty')).toBeVisible();
    });
  });

  it('OSU form should hide when disabled', async () => {
    const ProviderIdFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <ProviderIdForm
            details={{
              ...mockProviderId.details,
            }}
            form={form}
          />
        </Form>
      );
    };
    const { queryByLabelText, getByText, getByTestId } = render(<ProviderIdFormComp />);
    fireEvent.click(getByTestId('switchToggle'));

    expect(getByText('Disabled'));
    await waitFor(() => {
      expect(queryByLabelText('Server URI')).toBeNull();
    });
  });

  it('OSU form should show when enabled', async () => {
    const ProviderIdFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <ProviderIdForm
            details={{
              ...mockProviderId.details,
            }}
            form={form}
          />
        </Form>
      );
    };
    const { getByLabelText, getByText } = render(<ProviderIdFormComp />);

    expect(getByText('Enabled')); // The switch is enabled
    await waitFor(() => {
      expect(getByLabelText('Server URI')).toBeVisible();
    });
  });

  it('OSU name modal form should show', async () => {
    const ProviderIdFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <ProviderIdForm
            details={{
              ...mockProviderId.details,
            }}
            form={form}
          />
        </Form>
      );
    };
    const { getByText, getByTestId } = render(<ProviderIdFormComp />);

    expect(getByText('Enabled')); // The switch is enabled

    fireEvent.click(getByTestId('osuName'));

    await waitFor(() => {
      expect(getByText('Add Name', { selector: 'div' })).toBeVisible();
    });
  });

  it('OSU name modal form should show when add btn clicked', async () => {
    const ProviderIdFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <ProviderIdForm
            details={{
              ...mockProviderId.details,
            }}
            form={form}
          />
        </Form>
      );
    };
    const { getByText, getByTestId } = render(<ProviderIdFormComp />);

    expect(getByText('Enabled')); // The switch is enabled

    fireEvent.click(getByTestId('osuName'));

    await waitFor(() => {
      expect(getByText('Add Name', { selector: 'div' })).toBeVisible();
    });
  });

  it('OSU description modal form should show when add btn clicked', async () => {
    const ProviderIdFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <ProviderIdForm
            details={{
              ...mockProviderId.details,
            }}
            form={form}
          />
        </Form>
      );
    };
    const { getByText, getByTestId } = render(<ProviderIdFormComp />);

    expect(getByText('Enabled')); // The switch is enabled

    fireEvent.click(getByTestId('osuDesc'));

    await waitFor(() => {
      expect(getByText('Add Description', { selector: 'div' })).toBeVisible();
    });
  });

  it('OSU icon modal form should show when add btn clicked', async () => {
    const ProviderIdFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <ProviderIdForm
            details={{
              ...mockProviderId.details,
            }}
            form={form}
          />
        </Form>
      );
    };
    const { getByText, getByTestId } = render(<ProviderIdFormComp />);

    expect(getByText('Enabled')); // The switch is enabled

    fireEvent.click(getByTestId('osuIcon'));

    await waitFor(() => {
      expect(getByText('Add Icon', { selector: 'div' })).toBeVisible();
    });
  });

  it('cancel button click should hide Add Name model', async () => {
    const ProviderIdFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <ProviderIdForm
            details={{
              ...mockProviderId.details,
            }}
            form={form}
          />
        </Form>
      );
    };
    const { getByText, getByTestId, getByRole, queryByText } = render(<ProviderIdFormComp />);

    expect(getByText('Enabled')); // The switch is enabled

    fireEvent.click(getByTestId('osuName'));

    expect(getByText('Add Name', { selector: 'div' })).toBeVisible();

    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(queryByText('Add Name', { selector: 'div' })).not.toBeInTheDocument();
    });
  });

  it('cancel button click should hide Add Description model', async () => {
    const ProviderIdFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <ProviderIdForm
            details={{
              ...mockProviderId.details,
            }}
            form={form}
          />
        </Form>
      );
    };
    const { getByText, getByTestId, getByRole, queryByText } = render(<ProviderIdFormComp />);

    expect(getByText('Enabled')); // The switch is enabled

    fireEvent.click(getByTestId('osuDesc'));

    expect(getByText('Add Description', { selector: 'div' })).toBeVisible();

    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(queryByText('Add Description', { selector: 'div' })).not.toBeInTheDocument();
    });
  });

  it('cancel button click should hide Add Icon model', async () => {
    const ProviderIdFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <ProviderIdForm
            details={{
              ...mockProviderId.details,
            }}
            form={form}
          />
        </Form>
      );
    };
    const { getByText, getByTestId, getByRole, queryByText } = render(<ProviderIdFormComp />);

    expect(getByText('Enabled')); // The switch is enabled

    fireEvent.click(getByTestId('osuIcon'));

    expect(getByText('Add Icon', { selector: 'div' })).toBeVisible();

    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(queryByText('Add Icon', { selector: 'div' })).not.toBeInTheDocument();
    });
  });

  it('save button should show error message when fields empty on Add Name modal', async () => {
    const ProviderIdFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <ProviderIdForm
            details={{
              ...mockProviderId.details,
            }}
            form={form}
          />
        </Form>
      );
    };
    const { getByText, getByTestId, getByRole } = render(<ProviderIdFormComp />);

    expect(getByText('Enabled')); // The switch is enabled
    fireEvent.click(getByTestId('osuName'));

    expect(getByText('Add Name', { selector: 'div' })).toBeVisible();

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('Name field cannot be empty')).toBeVisible();
      expect(getByText('Locale field cannot be empty')).toBeVisible();
    });
  });

  it('save button should show error message when fields empty on Add Description modal', async () => {
    const ProviderIdFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <ProviderIdForm
            details={{
              ...mockProviderId.details,
            }}
            form={form}
          />
        </Form>
      );
    };
    const { getByText, getByTestId, getByRole } = render(<ProviderIdFormComp />);

    expect(getByText('Enabled')); // The switch is enabled
    fireEvent.click(getByTestId('osuDesc'));

    expect(getByText('Add Description', { selector: 'div' })).toBeVisible();

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText('Name field cannot be empty')).toBeVisible();
      expect(getByText('Locale field cannot be empty')).toBeVisible();
    });
  });

  it('Clicking the delete Domain Name button should remove the associated Domain Name input from the form', async () => {
    const ProviderIdFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <ProviderIdForm
            details={{
              ...mockProviderId.details,
            }}
            form={form}
          />
        </Form>
      );
    };

    const { getByPlaceholderText, getByTestId, getByText } = render(<ProviderIdFormComp />);

    fireEvent.click(getByText(/add domain name/i));

    const input = getByPlaceholderText('Enter Domain Name 1');

    fireEvent.click(getByTestId('removeDomain0'));

    await waitFor(() => {
      expect(input).not.toBeInTheDocument();
    });
  });

  it('Error message should show if Domain Name is not a valid domain', async () => {
    const ProviderIdFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <ProviderIdForm
            details={{
              ...mockProviderId.details,
            }}
            form={form}
          />
        </Form>
      );
    };

    const { getByPlaceholderText, getByText, queryByText } = render(<ProviderIdFormComp />);

    fireEvent.click(getByText(/add domain name/i));

    const input = getByPlaceholderText('Enter Domain Name 1');
    fireEvent.change(input, { target: { value: faker.lorem.word() } });

    const errorMsg = 'Enter a valid Domain Name';
    await waitFor(() => {
      expect(getByText(errorMsg)).toBeVisible();
    });

    fireEvent.change(input, { target: { value: faker.internet.domainName() } });

    await waitFor(() => {
      expect(queryByText(errorMsg)).not.toBeInTheDocument();
    });
  });

  it('Error message should show if Domain Name is duplicated', async () => {
    const ProviderIdFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <ProviderIdForm
            details={{
              ...mockProviderId.details,
            }}
            form={form}
          />
        </Form>
      );
    };
    const { getByPlaceholderText, getByText } = render(<ProviderIdFormComp />);

    const errorMsg = 'Enter a unique Domain Name';
    const domainName = faker.internet.domainName();
    fireEvent.click(getByText(/add domain name/i));
    const input = getByPlaceholderText('Enter Domain Name 1');
    fireEvent.change(input, { target: { value: domainName } });

    fireEvent.click(getByText(/add domain name/i));
    const input2 = getByPlaceholderText('Enter Domain Name 2');
    fireEvent.change(input2, { target: { value: domainName } });

    await waitFor(() => {
      expect(getByText(errorMsg)).toBeVisible();
    });
  });
});
