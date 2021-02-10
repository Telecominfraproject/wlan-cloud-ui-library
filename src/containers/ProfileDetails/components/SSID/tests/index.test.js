import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, waitFor, waitForElement } from '@testing-library/react';
import { Form } from 'antd';
import { render } from 'tests/utils';

import SSIDForm from '..';

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
  radiusProfiles: [
    {
      __typename: 'Profile',
      id: '9',
      name: 'Radius-Profile',
      profileType: 'radius',
      details: {
        model_type: 'RadiusProfile',
        primaryRadiusAuthServer: null,
        secondaryRadiusAuthServer: null,
        primaryRadiusAccountingServer: null,
        secondaryRadiusAccountingServer: null,
        profileType: 'radius',
      },
    },

    {
      __typename: 'Profile',
      id: '15',
      name: 'radius-profile-2021-01-26T19:14:49.513Z',
      profileType: 'radius',
      details: {
        model_type: 'RadiusProfile',
        primaryRadiusAuthServer: {
          model_type: 'RadiusServer',
          ipAddress: '127.0.0.1',
          secret: 'secret',
          port: 1812,
          timeout: 5,
        },
        secondaryRadiusAuthServer: null,
        primaryRadiusAccountingServer: {
          model_type: 'RadiusServer',
          ipAddress: '127.0.0.1',
          secret: 'secret',
          port: 1813,
          timeout: 5,
        },
        secondaryRadiusAccountingServer: null,
        profileType: 'radius',
      },
    },
  ],
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
    secureMode: 'wep',
    ssid: 'Default-SSID-1594386919128',
    ssidAdminState: 'enabled',
    videoTrafficOnly: false,
    vlanId: 1,
    wepConfig: null,
  },
};

describe('<SSIDForm />', () => {
  afterEach(cleanup);

  it('should work when secureMode is null ', async () => {
    const mockDetails = {
      ...mockProps.details,
      secureMode: null,
    };

    const SSIDFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <SSIDForm details={{ ...mockDetails }} form={form} />
        </Form>
      );
    };
    render(<SSIDFormComp />);
  });

  it('should work when ssid is null ', async () => {
    const mockDetails = {
      ...mockProps.details,
      ssid: null,
    };

    const SSIDFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <SSIDForm details={{ ...mockDetails }} form={form} />
        </Form>
      );
    };
    render(<SSIDFormComp />);
  });

  it('should work when broadcastSsid is null ', async () => {
    const mockDetails = {
      ...mockProps.details,
      broadcastSsid: null,
    };

    const SSIDFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <SSIDForm details={{ ...mockDetails }} form={form} />
        </Form>
      );
    };
    render(<SSIDFormComp />);
  });

  it('should work when appliedRadios are null ', async () => {
    const mockDetails = {
      ...mockProps.details,
      appliedRadios: null,
    };

    const SSIDFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <SSIDForm details={{ ...mockDetails }} form={form} />
        </Form>
      );
    };
    render(<SSIDFormComp />);
  });

  it('should work when noLocalSubnets is true', async () => {
    const mockDetails = {
      ...mockProps.details,
      noLocalSubnets: true,
    };

    const SSIDFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <SSIDForm details={{ ...mockDetails }} form={form} />
        </Form>
      );
    };
    render(<SSIDFormComp />);
  });

  it('should work when captivePortalId is 1', async () => {
    const mockDetails = {
      ...mockProps.details,
      captivePortalId: 1,
    };

    const SSIDFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <SSIDForm details={{ ...mockDetails }} form={form} />
        </Form>
      );
    };
    render(<SSIDFormComp />);
  });

  it('should work when vlanId is null', async () => {
    const mockDetails = {
      ...mockProps.details,
      vlanId: null,
    };

    const SSIDFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <SSIDForm details={{ ...mockDetails }} form={form} />
        </Form>
      );
    };
    render(<SSIDFormComp />);
  });

  it('should work when wepConfig is not null', async () => {
    const mockDetails = {
      ...mockProps.details,
      wepConfig: {
        wepKeys: [
          {
            txKeyConverted: 3434,
          },
        ],
      },
    };

    const SSIDFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <SSIDForm details={{ ...mockDetails }} form={form} />
        </Form>
      );
    };
    render(<SSIDFormComp />);
  });

  it('error message should be visible when input value for Profile Name is invalid', async () => {
    const SSIDFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <SSIDForm {...mockProps} form={form} />
        </Form>
      );
    };

    const { getByText, getByLabelText, getAllByPlaceholderText } = render(<SSIDFormComp />);
    fireEvent.change(getByLabelText('SSID Name'), { target: { value: null } });
    fireEvent.change(getAllByPlaceholderText('0-100')[0], { target: { value: null } });
    fireEvent.change(getAllByPlaceholderText('0-100')[1], { target: { value: null } });

    await waitFor(() => {
      expect(getByText('Please input your new SSID name')).toBeVisible();
      expect(
        getByText('Downstream bandwidth limit can be a number between 0 and 100.')
      ).toBeVisible();
      expect(
        getByText('Upstream bandwidth limit can be a number between 0 and 100.')
      ).toBeVisible();
      fireEvent.change(getAllByPlaceholderText('0-100')[0], { target: { value: 1000 } });
      fireEvent.change(getAllByPlaceholderText('0-100')[1], { target: { value: 1000 } });
      expect(
        getByText('Downstream bandwidth limit can be a number between 0 and 100.')
      ).toBeVisible();
      expect(
        getByText('Upstream bandwidth limit can be a number between 0 and 100.')
      ).toBeVisible();
    });
  });

  it('toggle between Bridge and NAT should change VLAN property', async () => {
    const SSIDFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <SSIDForm {...mockProps} form={form} />
        </Form>
      );
    };

    const { getByText, queryByText, getAllByText, getByPlaceholderText } = render(<SSIDFormComp />);

    fireEvent.click(getByText('NAT'));
    await waitFor(() => {
      expect(getAllByText('Not Applicable')[1]).toBeVisible();
    });

    fireEvent.click(getByText('Bridge'));
    await waitFor(() => {
      expect(getByText('Use Custom VLAN')).toBeVisible();
      expect(getByText('Use Default VLAN')).toBeVisible();
    });

    fireEvent.click(getByText('Use Custom VLAN'));

    fireEvent.change(getByPlaceholderText('1-4095'), { target: { value: null } });
    await waitFor(() => {
      expect(getByText('Vlan expected between 1 and 4095')).toBeVisible();
    });

    fireEvent.change(getByPlaceholderText('1-4095'), { target: { value: 4096 } });
    await waitFor(() => {
      expect(getByText('Vlan expected between 1 and 4095')).toBeVisible();
    });

    fireEvent.change(getByPlaceholderText('1-4095'), { target: { value: 1 } });
    await waitFor(() => {
      expect(queryByText('Vlan expected between 1 and 4095')).not.toBeInTheDocument();
    });
  });

  it('error message should be visible when WEP Key input has invalid value', async () => {
    const SSIDFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <SSIDForm {...mockProps} form={form} />
        </Form>
      );
    };

    const { getByText, getByLabelText } = render(<SSIDFormComp />);

    expect(
      getByText(
        'When using WEP, high performance features like 11n and 11ac will not work with this SSID.'
      )
    ).toBeVisible();
    expect(getByText('WEP Key')).toBeVisible();

    const node = getByLabelText('WEP Key');
    fireEvent.change(node, { target: { value: 1234567890 } });

    fireEvent.change(node, {
      target: { value: fireEvent.keyPress(node, { key: 1, code: 49, charCode: 49 }) },
    });
    // fireEvent.change(node, { target: { value: 1 } });
    await waitFor(() => {
      expect(
        getByText(
          'Please enter exactly 10 or 26 hexadecimal digits representing a 64-bit or 128-bit key'
        )
      ).toBeVisible();
    });
  });

  it('input filed should remain empty if value is invalid for WEP Key input filed', async () => {
    const SSIDFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <SSIDForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByLabelText } = render(<SSIDFormComp />);

    const node = getByLabelText('WEP Key');

    fireEvent.change(node, {
      target: { value: fireEvent.keyPress(node, { key: 'a', code: 65, charCode: 65 }) },
    });
    await waitFor(() => {
      expect(node.value).toBe('false');
    });
  });

  it('changing Mode select option should update Roaming card', async () => {
    const SSIDFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <SSIDForm {...mockProps} form={form} />
        </Form>
      );
    };

    const { getByText, container } = render(<SSIDFormComp />);

    const selectMode = container.querySelector('[data-testid=securityMode] > .ant-select-selector');
    const DOWN_ARROW = { keyCode: 40 };
    fireEvent.mouseDown(selectMode);
    fireEvent.keyDown(selectMode, DOWN_ARROW);
    await waitForElement(() => getByText('Open (No Encryption)'));
    fireEvent.click(getByText('Open (No Encryption)'));
    await waitFor(() => {
      expect(getByText('802.11k')).toBeVisible();
    });
  });

  it('changing Mode select option to WPA & WPA2 Personal (mixed mode) should update Roaming card', async () => {
    const mockDetails = {
      ...mockProps.details,
      secureMode: 'wpa2Radius',
    };

    const SSIDFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <SSIDForm details={{ ...mockDetails }} form={form} />
        </Form>
      );
    };

    const { getByText, container } = render(<SSIDFormComp />);

    const selectMode = container.querySelector('[data-testid=securityMode] > .ant-select-selector');
    const DOWN_ARROW = { keyCode: 40 };
    fireEvent.mouseDown(selectMode);
    fireEvent.keyDown(selectMode, DOWN_ARROW);
    await waitForElement(() => getByText('WPA & WPA2 Personal (mixed mode)'));
    fireEvent.click(getByText('WPA & WPA2 Personal (mixed mode)'));
    await waitFor(() => {
      expect(getByText('Security Key')).toBeVisible();
    });
  });

  it('changing Mode select option to Enterprise mode should show RADIUS profile select and RADIUS Accounting Interval field ', async () => {
    const SSIDFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <SSIDForm {...mockProps} form={form} />
        </Form>
      );
    };

    const { getByText, container } = render(<SSIDFormComp />);

    const selectMode = container.querySelector('[data-testid=securityMode] > .ant-select-selector');
    const DOWN_ARROW = { keyCode: 40 };
    fireEvent.mouseDown(selectMode);
    fireEvent.keyDown(selectMode, DOWN_ARROW);
    await waitForElement(() => getByText('WPA3 Enterprise (mixed mode)'));
    fireEvent.click(getByText('WPA3 Enterprise (mixed mode)'));
    await waitFor(() => {
      expect(getByText('RADIUS Profile')).toBeVisible();
      expect(getByText('RADIUS Accounting Interval')).toBeVisible();
    });
  });

  it('Radius Profiles should be shown in the Radius profiles select', async () => {
    const SSIDFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <SSIDForm {...mockProps} form={form} />
        </Form>
      );
    };

    const { getByText, container, getByLabelText } = render(<SSIDFormComp />);

    const selectMode = container.querySelector('[data-testid=securityMode] > .ant-select-selector');
    const DOWN_ARROW = { keyCode: 40 };
    fireEvent.mouseDown(selectMode);
    fireEvent.keyDown(selectMode, DOWN_ARROW);
    await waitForElement(() => getByText('WPA3 Enterprise (mixed mode)'));
    fireEvent.click(getByText('WPA3 Enterprise (mixed mode)'));
    await waitFor(() => {
      expect(getByText('RADIUS Profile')).toBeVisible();
    });
    const profile = getByLabelText('RADIUS Profile');
    fireEvent.keyDown(profile, DOWN_ARROW);
    await waitForElement(() => getByText(mockProps.radiusProfiles[0].name));
    fireEvent.click(getByText(mockProps.radiusProfiles[0].name));
  });

  it('Should show errors if Radius Accounting Interval is outside range of 60-600', async () => {
    const SSIDFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <SSIDForm {...mockProps} form={form} />
        </Form>
      );
    };

    const { getByText, container, getByLabelText } = render(<SSIDFormComp />);

    const selectMode = container.querySelector('[data-testid=securityMode] > .ant-select-selector');
    const DOWN_ARROW = { keyCode: 40 };
    fireEvent.mouseDown(selectMode);
    fireEvent.keyDown(selectMode, DOWN_ARROW);
    await waitForElement(() => getByText('WPA3 Enterprise (mixed mode)'));
    fireEvent.click(getByText('WPA3 Enterprise (mixed mode)'));
    await waitFor(() => {
      expect(getByText('RADIUS Accounting Interval')).toBeVisible();
    });
    fireEvent.change(getByLabelText('RADIUS Accounting Interval'), { target: { value: '59' } });
    await waitFor(() => {
      expect(
        getByText('RADIUS accounting interval can be a number between 60 and 600')
      ).toBeVisible();
    });
    fireEvent.change(getByLabelText('RADIUS Accounting Interval'), { target: { value: '600' } });
  });
});
