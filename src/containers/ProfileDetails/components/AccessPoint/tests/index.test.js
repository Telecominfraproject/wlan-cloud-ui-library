import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, waitFor, waitForElement } from '@testing-library/react';
import { Form } from 'antd';
import { render } from 'tests/utils';

import AccessPoints from '..';

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
  details: {
    equipmentDiscovery: false,
    equipmentType: 'AP',
    ledControlEnabled: true,
    model_type: 'ApNetworkConfiguration',
    networkConfigVersion: 'AP-1',
    ntpServer: { model_type: 'AutoOrManualString', auto: true, value: 'pool.ntp.org' },
    profileType: 'equipment_ap',
    radioMap: {
      is2dot4GHz: {
        model_type: 'RadioProfileConfiguration',
        bestApEnabled: true,
        bestAPSteerType: 'both',
      },
      is5GHzL: {
        model_type: 'RadioProfileConfiguration',
        bestApEnabled: true,
        bestAPSteerType: 'both',
      },
      is5GHzU: {
        model_type: 'RadioProfileConfiguration',
        bestApEnabled: true,
        bestAPSteerType: 'both',
      },
    },
    rtlsSettings: null,
    syntheticClientEnabled: true,
    syslogRelay: null,
    vlan: 0,
    vlanNative: true,
  },
  childProfileIds: [3],
  childProfiles: [
    {
      id: 3,
      name: 'TipWlan-cloud-3-radios',
      profileType: 'ssid',
      details: {
        appliedRadios: ['is2dot4GHz', 'is5GHzL', 'is5GHzU'],
        bandwidthLimitDown: 0,
        bandwidthLimitUp: 0,
        bonjourGatewayProfileId: null,
        broadcastSsid: 'enabled',
        captivePortalId: null,
        enable80211w: null,
        forwardMode: null,
        keyRefresh: 0,
        keyStr: null,
        model_type: 'SsidConfiguration',
        noLocalSubnets: false,
        profileType: 'ssid',
        radioBasedConfigs: {
          is2dot4GHz: {
            model_type: 'RadioBasedSsidConfiguration',
            enable80211r: null,
            enable80211k: null,
            enable80211v: null,
          },
          is5GHz: {
            model_type: 'RadioBasedSsidConfiguration',
            enable80211r: null,
            enable80211k: null,
            enable80211v: null,
          },
          is5GHzL: {
            model_type: 'RadioBasedSsidConfiguration',
            enable80211r: null,
            enable80211k: null,
            enable80211v: null,
          },
          is5GHzU: {
            model_type: 'RadioBasedSsidConfiguration',
            enable80211r: null,
            enable80211k: null,
            enable80211v: null,
          },
        },
        radiusServiceName: null,
        secureMode: 'open',
        ssid: 'TipWlan-cloud-3-radios',
        ssidAdminState: 'enabled',
        videoTrafficOnly: false,
        vlanId: 1,
        wepConfig: null,
      },
      __typename: 'Profile',
    }
  ],
  ssidProfiles: [
    {
      id: 2,
      name: 'TipWlan-cloud-Enterprise',
      profileType: 'ssid',
      details: {
        appliedRadios: ['is2dot4GHz', 'is5GHzL', 'is5GHzU'],
        bandwidthLimitDown: 0,
        bandwidthLimitUp: 0,
        bonjourGatewayProfileId: null,
        broadcastSsid: 'enabled',
        captivePortalId: null,
        enable80211w: null,
        forwardMode: null,
        keyRefresh: 0,
        keyStr: 'testing123',
        model_type: 'SsidConfiguration',
        noLocalSubnets: false,
        profileType: 'ssid',
        radioBasedConfigs: {
          is2dot4GHz: {
            model_type: 'RadioBasedSsidConfiguration',
            enable80211r: null,
            enable80211k: null,
            enable80211v: null,
          },
          is5GHz: {
            model_type: 'RadioBasedSsidConfiguration',
            enable80211r: null,
            enable80211k: null,
            enable80211v: null,
          },
          is5GHzL: {
            model_type: 'RadioBasedSsidConfiguration',
            enable80211r: null,
            enable80211k: null,
            enable80211v: null,
          },
          is5GHzU: {
            model_type: 'RadioBasedSsidConfiguration',
            enable80211r: null,
            enable80211k: null,
            enable80211v: null,
          },
        },
        radiusServiceName: 'Radius-Profile',
        secureMode: 'wpaEAP',
        ssid: 'Default-SSID-1594386919128',
        ssidAdminState: 'enabled',
        videoTrafficOnly: false,
        vlanId: 1,
        wepConfig: null,
      },
      __typename: 'Profile',
    },
    {
      id: 3,
      name: 'TipWlan-cloud-3-radios',
      profileType: 'ssid',
      details: {
        appliedRadios: ['is2dot4GHz', 'is5GHzL', 'is5GHzU'],
        bandwidthLimitDown: 0,
        bandwidthLimitUp: 0,
        bonjourGatewayProfileId: null,
        broadcastSsid: 'enabled',
        captivePortalId: null,
        enable80211w: null,
        forwardMode: null,
        keyRefresh: 0,
        keyStr: null,
        model_type: 'SsidConfiguration',
        noLocalSubnets: false,
        profileType: 'ssid',
        radioBasedConfigs: {
          is2dot4GHz: {
            model_type: 'RadioBasedSsidConfiguration',
            enable80211r: null,
            enable80211k: null,
            enable80211v: null,
          },
          is5GHz: {
            model_type: 'RadioBasedSsidConfiguration',
            enable80211r: null,
            enable80211k: null,
            enable80211v: null,
          },
          is5GHzL: {
            model_type: 'RadioBasedSsidConfiguration',
            enable80211r: null,
            enable80211k: null,
            enable80211v: null,
          },
          is5GHzU: {
            model_type: 'RadioBasedSsidConfiguration',
            enable80211r: null,
            enable80211k: null,
            enable80211v: null,
          },
        },
        radiusServiceName: null,
        secureMode: 'open',
        ssid: 'TipWlan-cloud-3-radios',
        ssidAdminState: 'enabled',
        videoTrafficOnly: false,
        vlanId: 1,
        wepConfig: null,
      },
      __typename: 'Profile',
    },
    {
      id: 4,
      name: 'TipWlan-cloud-2-radios',
      profileType: 'ssid',
      details: {
        appliedRadios: ['is2dot4GHz', 'is5GHz'],
        bandwidthLimitDown: 0,
        bandwidthLimitUp: 0,
        bonjourGatewayProfileId: null,
        broadcastSsid: 'enabled',
        captivePortalId: null,
        enable80211w: null,
        forwardMode: null,
        keyRefresh: 0,
        keyStr: null,
        model_type: 'SsidConfiguration',
        noLocalSubnets: false,
        profileType: 'ssid',
        radioBasedConfigs: {
          is2dot4GHz: {
            model_type: 'RadioBasedSsidConfiguration',
            enable80211r: null,
            enable80211k: null,
            enable80211v: null,
          },
          is5GHz: {
            model_type: 'RadioBasedSsidConfiguration',
            enable80211r: null,
            enable80211k: null,
            enable80211v: null,
          },
          is5GHzL: {
            model_type: 'RadioBasedSsidConfiguration',
            enable80211r: null,
            enable80211k: null,
            enable80211v: null,
          },
          is5GHzU: {
            model_type: 'RadioBasedSsidConfiguration',
            enable80211r: null,
            enable80211k: null,
            enable80211v: null,
          },
        },
        radiusServiceName: null,
        secureMode: 'open',
        ssid: 'TipWlan-cloud-2-radios',
        ssidAdminState: 'enabled',
        videoTrafficOnly: false,
        vlanId: 1,
        wepConfig: null,
      },
      __typename: 'Profile',
    },
  ],
};

describe('<AccessPoints />', () => {
  afterEach(cleanup);

  it('should work with vlanNative is undefined', () => {
    const mockDetails = {
      ...mockProps,
      details: {
        ...mockProps.details,
        vlanNative: undefined,
      },
    };
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return <AccessPoints {...mockDetails} form={form} />;
    };
    render(<AccessPointComp />);
  });

  it('should work with ntpServer is undefined', () => {
    const mockDetails = {
      ...mockProps,
      details: {
        ...mockProps.details,
        ntpServer: { auto: undefined },
      },
    };
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return <AccessPoints {...mockDetails} form={form} />;
    };
    render(<AccessPointComp />);
  });

  it('should work with rtlsSettings and syslogRelay are enabled', () => {
    const mockDetails = {
      ...mockProps,
      details: {
        ...mockProps.details,
        rtlsSettings: { enabled: true },
        syslogRelay: { enabled: true },
        syntheticClientEnabled: false,
        equipmentDiscovery: true,
      },
    };
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return <AccessPoints {...mockDetails} form={form} />;
    };
    render(<AccessPointComp />);
  });

  it('uncheck Use Default Management VLAN should show the input field for vlan value', () => {
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return <AccessPoints {...mockProps} form={form} />;
    };
    const { getByTestId } = render(<AccessPointComp />);

    const checkbox = getByTestId('vlanCheckbox');
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(false);
    expect(getByTestId('vlanInput')).toBeInTheDOM();
  });

  it('error message should be displayed if input value for vlan is invalid', async () => {
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <AccessPoints {...mockProps} form={form} />
        </Form>
      );
    };

    const { getByTestId, getByPlaceholderText, getByText } = render(<AccessPointComp />);

    const checkbox = getByTestId('vlanCheckbox');
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(false);
    const vlanInput = getByTestId('vlanInput');
    expect(vlanInput).toBeInTheDOM();
    fireEvent.change(getByPlaceholderText('2-4095'), {
      target: { value: 2 },
    });
    fireEvent.change(getByPlaceholderText('2-4095'), {
      target: { value: '123456' },
    });
    expect(vlanInput.value).toBe('123456');
    await waitFor(() => {
      expect(getByText('Vlan expected between 2 and 4095')).toBeVisible();
    });
  });

  it('uncheck Use Default Servers should show the input field for NTP value', async () => {
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <AccessPoints {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByTestId, getByPlaceholderText, getByText } = render(<AccessPointComp />);

    const checkbox = getByTestId('ntpCheckbox');
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(false);
    const input = getByPlaceholderText('Enter NTP server');
    expect(input).toBeInTheDOM();

    fireEvent.change(input, {
      target: { value: '' },
    });
    expect(input.value).toBe('');

    await waitFor(() => {
      expect(getByText('Please enter your NTP server')).toBeVisible();
    });
  });

  it('RTLS Enabled radio button click should show the RTLS input fields', async () => {
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <AccessPoints {...mockProps} form={form} />
        </Form>
      );
    };
    const { queryAllByText, getByTestId } = render(<AccessPointComp />);

    const radio = queryAllByText('Enabled');
    fireEvent.click(radio[0]);

    await waitFor(() => {
      expect(getByTestId('rtlsInputFields')).toBeInTheDOM();
    });
  });

  it('error message should be displayed when RTLS input fields IP Address and Port have invalid values', async () => {
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <AccessPoints {...mockProps} form={form} />
        </Form>
      );
    };
    const { queryAllByText, getByText, getByPlaceholderText } = render(<AccessPointComp />);

    const radio = queryAllByText('Enabled');
    fireEvent.click(radio[0]);

    fireEvent.change(getByPlaceholderText('IP Address'), { target: { value: '0.0.0' } });
    fireEvent.change(getByPlaceholderText('Port'), { target: { value: 123456 } });
    await waitFor(() => {
      expect(getByText('Enter in the format [0-255].[0-255].[0-255].[0-255]')).toBeVisible();
      expect(getByText('Port expected between 1 - 65535')).toBeVisible();
    });
  });

  it('error message should not be displayed when RTLS input fields IP Address and Port have valid values', async () => {
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <AccessPoints {...mockProps} form={form} />
        </Form>
      );
    };
    const { queryAllByText, getByPlaceholderText, queryByText } = render(<AccessPointComp />);

    const radio = queryAllByText('Enabled');
    fireEvent.click(radio[0]);

    fireEvent.change(getByPlaceholderText('IP Address'), { target: { value: '0.0.0.0' } });
    fireEvent.change(getByPlaceholderText('Port'), { target: { value: 5 } });
    await waitFor(() => {
      expect(
        queryByText('Enter in the format [0-255].[0-255].[0-255].[0-255]')
      ).not.toBeInTheDocument();
      expect(queryByText('Port expected between 1 - 65535')).not.toBeInTheDocument();
    });
  });

  it('Syslog Enabled radio button click should show the Syslog input fields', async () => {
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <AccessPoints {...mockProps} form={form} />
        </Form>
      );
    };
    const { queryAllByText, getByTestId } = render(<AccessPointComp />);

    const radio = queryAllByText('Enabled');
    fireEvent.click(radio[1]);

    await waitFor(() => {
      expect(getByTestId('syslogInputFields')).toBeInTheDOM();
    });
  });

  it('error message should be displayed when Syslog input fields IP Address and Port have invalid values', async () => {
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <AccessPoints {...mockProps} form={form} />
        </Form>
      );
    };
    const { queryAllByText, getByText, getByPlaceholderText } = render(<AccessPointComp />);

    const radio = queryAllByText('Enabled');
    fireEvent.click(radio[1]);

    fireEvent.change(getByPlaceholderText('IP Address'), { target: { value: '0.0.0' } });
    fireEvent.change(getByPlaceholderText('Port'), { target: { value: 123456 } });
    await waitFor(() => {
      expect(getByText('Enter in the format [0-255].[0-255].[0-255].[0-255]')).toBeVisible();
      expect(getByText('Port expected between 1 - 65535')).toBeVisible();
    });
    const disabledRadio = queryAllByText('Disabled');
    fireEvent.click(disabledRadio[1]);
  });

  it('error message should not be displayed when Syslog input fields IP Address and Port have valid values', async () => {
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <AccessPoints {...mockProps} form={form} />
        </Form>
      );
    };
    const { queryAllByText, getByPlaceholderText, queryByText } = render(<AccessPointComp />);

    const radio = queryAllByText('Enabled');
    fireEvent.click(radio[1]);

    fireEvent.change(getByPlaceholderText('IP Address'), { target: { value: '0.0.0.0' } });
    fireEvent.change(getByPlaceholderText('Port'), { target: { value: 5 } });
    await waitFor(() => {
      expect(
        queryByText('Enter in the format [0-255].[0-255].[0-255].[0-255]')
      ).not.toBeInTheDocument();
      expect(queryByText('Port expected between 1 - 65535')).not.toBeInTheDocument();
    });
    const disabledRadio = queryAllByText('Disabled');
    fireEvent.click(disabledRadio[1]);
  });

  it('click on disable button should hide input fields for RTLS', async () => {
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <AccessPoints {...mockProps} form={form} />
        </Form>
      );
    };
    const { queryAllByText, queryByText, getByPlaceholderText } = render(<AccessPointComp />);

    const radio = queryAllByText('Enabled');
    fireEvent.click(radio[0]);

    await waitFor(() => {
      expect(getByPlaceholderText('IP Address')).toBeVisible();
      expect(getByPlaceholderText('Port')).toBeVisible();
    });
    const disabledRadio = queryAllByText('Disabled');
    fireEvent.click(disabledRadio[0]);

    await waitFor(() => {
      expect(queryByText('IP Address')).not.toBeInTheDocument();
      expect(queryByText('Port')).not.toBeInTheDocument();
    });
  });

  it('on click dropdown should show dropdown values for Syslog', async () => {
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <AccessPoints {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByTestId, queryAllByText, getByText, container } = render(<AccessPointComp />);

    const radio = queryAllByText('Enabled');
    fireEvent.click(radio[1]);
    const select = getByTestId('select');
    fireEvent.mouseDown(select);
    await waitForElement(() => [getByText('Debug (DEBUG)')], { container });
    expect(getByText('Debug (DEBUG)')).toBeVisible();
  });

  it('on entering invalid value of SSID Profile profile in Wireless Networks (SSIDs) Enabled on This Profile should filter the options', async () => {
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <AccessPoints {...mockProps} form={form} />
        </Form>
      );
    };

    const { container } = render(<AccessPointComp />);
    const selectInputFiled = container.querySelector(
      '[data-testid=ssidProfile] > .ant-select-selector span input'
    );
    fireEvent.change(selectInputFiled, { target: { value: 'test' } });
    fireEvent.keyDown(selectInputFiled, { keyCode: 13 });
  });

  it('changing SSID Profile profile on Wireless Networks (SSIDs) Enabled on This Profile should update the table', async () => {
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <AccessPoints {...mockProps} form={form} />
        </Form>
      );
    };

    const { queryAllByText, getByText, container } = render(<AccessPointComp />);
    const selectInputFiled = container.querySelector(
      '[data-testid=ssidProfile] > .ant-select-selector span input'
    );
    fireEvent.change(selectInputFiled, { target: { value: 'test' } });
    fireEvent.keyDown(selectInputFiled, { keyCode: 13 });

    const selectInput = container.querySelector('[data-testid=ssidProfile] > .ant-select-selector');
    const DOWN_ARROW = { keyCode: 40 };
    fireEvent.mouseDown(selectInput);
    fireEvent.keyDown(selectInput, DOWN_ARROW);

    await waitForElement(() => getByText('TipWlan-cloud-Enterprise'));
    fireEvent.click(getByText('TipWlan-cloud-Enterprise'));
    await waitFor(() => {
      expect(queryAllByText('TipWlan-cloud-Enterprise')[0]).toBeVisible();
      expect(queryAllByText('TipWlan-cloud-3-radios')[0]).toBeVisible();
    });
  });

  it('click delete button sould remove item from Wireless Networks (SSIDs) Enabled on This Profile table', async () => {
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <AccessPoints {...mockProps} form={form} />
        </Form>
      );
    };

    const { getByRole, getByText } = render(<AccessPointComp />);

    fireEvent.click(getByRole('button', { target: { value: /removeSsid/i } }));
    await waitFor(() => {
      expect(getByText('No Data')).toBeVisible();
    });
  });
});
