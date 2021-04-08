import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, waitFor, waitForElement } from '@testing-library/react';
import { Form } from 'antd';
import { render, DOWN_ARROW } from 'tests/utils';

import { mockSsid } from '../../../tests/constants';

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

describe('<SSIDForm />', () => {
  it('should work when secureMode is null ', async () => {
    const mockDetails = {
      ...mockSsid.details,
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
      ...mockSsid.details,
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
      ...mockSsid.details,
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
      ...mockSsid.details,
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
      ...mockSsid.details,
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
      ...mockSsid.details,
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
      ...mockSsid.details,
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
      ...mockSsid.details,
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
          <SSIDForm {...mockSsid} form={form} />
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
          <SSIDForm {...mockSsid} form={form} />
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
          <SSIDForm {...mockSsid} form={form} />
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

  it('input field should remain empty if value is invalid for WEP Key input filed', async () => {
    const SSIDFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <SSIDForm {...mockSsid} form={form} />
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
          <SSIDForm {...mockSsid} form={form} />
        </Form>
      );
    };

    const { getByText, container } = render(<SSIDFormComp />);

    const selectMode = container.querySelector('[data-testid=securityMode] > .ant-select-selector');
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
      ...mockSsid.details,
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
          <SSIDForm {...mockSsid} form={form} />
        </Form>
      );
    };

    const { getByText, container } = render(<SSIDFormComp />);

    const selectMode = container.querySelector('[data-testid=securityMode] > .ant-select-selector');
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
          <SSIDForm {...mockSsid} form={form} />
        </Form>
      );
    };

    const { getByText, container, getByLabelText } = render(<SSIDFormComp />);

    const selectMode = container.querySelector('[data-testid=securityMode] > .ant-select-selector');
    fireEvent.mouseDown(selectMode);
    fireEvent.keyDown(selectMode, DOWN_ARROW);
    await waitForElement(() => getByText('WPA3 Enterprise (mixed mode)'));
    fireEvent.click(getByText('WPA3 Enterprise (mixed mode)'));
    await waitFor(() => {
      expect(getByText('RADIUS Profile')).toBeVisible();
    });
    const profile = getByLabelText('RADIUS Profile');
    fireEvent.keyDown(profile, DOWN_ARROW);
    await waitForElement(() => getByText(mockSsid.radiusProfiles[0].name));
    fireEvent.click(getByText(mockSsid.radiusProfiles[0].name));
  });

  it('Should show errors if Radius Accounting Interval is outside range of 60-600 or not 0', async () => {
    const SSIDFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <SSIDForm {...mockSsid} form={form} />
        </Form>
      );
    };

    const { getByText, container, getByLabelText, queryByText } = render(<SSIDFormComp />);

    const selectMode = container.querySelector('[data-testid=securityMode] > .ant-select-selector');
    fireEvent.mouseDown(selectMode);
    fireEvent.keyDown(selectMode, DOWN_ARROW);
    await waitForElement(() => getByText('WPA3 Enterprise (mixed mode)'));
    fireEvent.click(getByText('WPA3 Enterprise (mixed mode)'));
    await waitFor(() => {
      expect(getByText('RADIUS Accounting Interval')).toBeVisible();
    });

    const errorMsg = '0 or 60 - 600';
    fireEvent.change(getByLabelText('RADIUS Accounting Interval'), { target: { value: '59' } });
    await waitFor(() => {
      expect(getByText(errorMsg)).toBeVisible();
    });

    fireEvent.change(getByLabelText('RADIUS Accounting Interval'), { target: { value: '601' } });
    await waitFor(() => {
      expect(getByText(errorMsg)).toBeVisible();
    });

    fireEvent.change(getByLabelText('RADIUS Accounting Interval'), { target: { value: '600' } });
    await waitFor(() => {
      expect(queryByText(errorMsg)).not.toBeInTheDocument();
    });

    fireEvent.change(getByLabelText('RADIUS Accounting Interval'), { target: { value: '0' } });
    await waitFor(() => {
      expect(queryByText(errorMsg)).not.toBeInTheDocument();
    });
  });
});
