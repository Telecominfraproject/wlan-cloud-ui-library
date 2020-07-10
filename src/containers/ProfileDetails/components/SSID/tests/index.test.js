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

    const { getByText, getAllByText, getByPlaceholderText } = render(<SSIDFormComp />);

    fireEvent.click(getByText('NAT'));
    await waitFor(() => {
      expect(getAllByText('Not Applicable')[1]).toBeVisible();
    });

    fireEvent.click(getByText('Bridge'));
    await waitFor(() => {
      expect(getByText('Use Custom VLAN')).toBeVisible();
      expect(getByText('Use Default VLAN')).toBeVisible();
    });
    fireEvent.change(getByPlaceholderText('2-4095'), { target: { value: null } });

    await waitFor(() => {
      expect(getByText('Vlan expected between 1 and 4095')).toBeVisible();
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

    // const authentication = getByLabelText('Authentication');
    // const DOWN_ARROW = { keyCode: 40 };
    // fireEvent.keyDown(authentication, DOWN_ARROW);

    const node = getByLabelText('WEP Key');
    fireEvent.change(node, {
      target: { value: fireEvent.keyPress(node, { keyCode: 49 }) },
    });

    await waitFor(() => {
      expect(
        getByText(
          'Please enter exactly 10 or 26 hexadecimal digits representing a 64-bit or 128-bit key'
        )
      ).toBeVisible();
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
    await waitForElement(() => getByText('Open (No ecryption)'));
    fireEvent.click(getByText('Open (No ecryption)'));
    await waitFor(() => {
      expect(getByText('802.11k')).toBeVisible();
    });
  });
});
