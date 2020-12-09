import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, waitFor, act } from '@testing-library/react';
import { Form } from 'antd';
import { render } from 'tests/utils';

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

const mockProps = {
  details: {
    osuFriendlyname: [
      {
        asDuple: 'eng:test',
        defaultDupleSeparator: ':',
        dupleIso3Language: 'eng',
        dupleName: 'test',
        locale: 'eng',
        model_type: 'PasspointDuple',
      },
    ],
    osuServiceDescription: [
      {
        asDuple: 'eng:test',
        defaultDupleSeparator: ':',
        dupleIso3Language: 'eng',
        dupleName: 'test',
        locale: 'eng',
        model_type: 'PasspointDuple',
      },
    ],
    osuIconList: [
      {
        imageUrl: 'https://rogers.com/icon32eng.png',
        model_type: 'PasspointOsuIcon',
        iconLocale: 'fr_CA',
      },
    ],
    naiRealmList: [
      {
        eapMap: {
          'EAP-TTLS with username/password': ['Expanded EAP Method: Hardware Token'],
        },
        encoding: 0,
        model_type: 'PasspointNaiRealmInformation',
      },
    ],
    osuServerUri: 'https://example.com/oso',
    roamingOi: [1, 2],
    mccMncList: [],
    doaminName: 'example.com',
  },
};

describe('<ProviderIdForm />', () => {
  afterEach(cleanup);

  it('should work when domain name and roaming oi is null', async () => {
    const ProviderIdFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <ProviderIdForm
            details={{ ...mockProps, domainName: null, roamingOi: null }}
            form={form}
          />
        </Form>
      );
    };
    render(<ProviderIdFormComp />);
  });

  it('should add a new PLMN to the table', async () => {
    const ProviderIdFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <ProviderIdForm details={mockProps} form={form} />
        </Form>
      );
    };
    const { getByRole, getByText, getByLabelText, getByTestId } = render(<ProviderIdFormComp />);

    fireEvent.click(getByTestId('addPlmn'));
    expect(getByText('Add Public Land Mobile Network (PLMN)')).toBeVisible();
    fireEvent.change(getByLabelText('Mcc'), { target: { value: 240 } });
    fireEvent.change(getByLabelText('Mnc'), { target: { value: 680 } });

    await act(async () => {
      fireEvent.click(getByRole('button', { name: /save/i }));
    });

    await waitFor(() => {
      expect(getByText('Add Public Land Mobile Network (PLMN)')).not.toBeVisible();
      expect(getByText('240')).toBeVisible();
      expect(getByText('680')).toBeVisible();
    });
  });

  it('EAP method form shows error when form is submitted and authentication is not selected', async () => {
    const ProviderIdFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <ProviderIdForm details={{ ...mockProps.details }} form={form} />
        </Form>
      );
    };
    const { getByTestId, getByText, getByRole } = render(<ProviderIdFormComp />);

    fireEvent.click(getByTestId('addEapMethod'));
    expect(getByText('Add EAP Method')).toBeVisible();

    fireEvent.mouseDown(getByRole('combobox', { name: 'Method:' }));
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
          <ProviderIdForm details={{ ...mockProps.details }} form={form} />
        </Form>
      );
    };
    const { getByText, getByTestId, getByRole } = render(<ProviderIdFormComp />);

    fireEvent.click(getByTestId('addEapMethod'));
    expect(getByText('Add EAP Method')).toBeVisible();

    fireEvent.click(getByRole('button', { name: /cancel/i }));
    await waitFor(() => {
      expect(getByText('Add EAP Method')).not.toBeVisible();
    });
  });

  it('Plmn modal should close when canceled', async () => {
    const ProviderIdFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <ProviderIdForm details={{ ...mockProps.details }} form={form} />
        </Form>
      );
    };
    const { getByTestId, getByText, getByRole } = render(<ProviderIdFormComp />);

    fireEvent.click(getByTestId('addPlmn'));
    expect(getByText('Add Public Land Mobile Network (PLMN)')).toBeVisible();

    await act(async () => {
      fireEvent.click(getByRole('button', { name: /cancel/i }));
    });

    await waitFor(() => {
      expect(getByText('Add Public Land Mobile Network (PLMN)')).not.toBeVisible();
    });
  });

  it('plmn mcc input should only be number inputs', async () => {
    const ProviderIdFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <ProviderIdForm details={{ ...mockProps.details }} form={form} />
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
          <ProviderIdForm details={{ ...mockProps.details }} form={form} />
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
              ...mockProps.details,
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
              ...mockProps.details,
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
              ...mockProps.details,
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
              ...mockProps.details,
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
              ...mockProps.details,
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
              ...mockProps.details,
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
              ...mockProps.details,
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
              ...mockProps.details,
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
              ...mockProps.details,
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
              ...mockProps.details,
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

    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(getByText('Add Name', { selector: 'div' })).not.toBeVisible();
    });
  });

  it('cancel button click should hide Add Description model', async () => {
    const ProviderIdFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <ProviderIdForm
            details={{
              ...mockProps.details,
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

    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(getByText('Add Description', { selector: 'div' })).not.toBeVisible();
    });
  });

  it('cancel button click should hide Add Icon model', async () => {
    const ProviderIdFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <ProviderIdForm
            details={{
              ...mockProps.details,
            }}
            form={form}
          />
        </Form>
      );
    };
    const { getByText, getByTestId, getByRole } = render(<ProviderIdFormComp />);

    expect(getByText('Enabled')); // The switch is enabled

    fireEvent.click(getByTestId('osuIcon'));

    expect(getByText('Add Icon', { selector: 'div' })).toBeVisible();

    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(getByText('Add Icon', { selector: 'div' })).not.toBeVisible();
    });
  });

  it('save button should show error message when fields empty on Add Name modal', async () => {
    const ProviderIdFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <ProviderIdForm
            details={{
              ...mockProps.details,
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
              ...mockProps.details,
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
});
