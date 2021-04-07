import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  fireEvent,
  waitFor,
  waitForElement,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import faker from 'faker';
import { Form } from 'antd';
import { render, DOWN_ARROW } from 'tests/utils';
import { mockAccessPoint } from '../../../tests/constants';

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

function buildGreForm() {
  return {
    name: faker.internet.userName(),
    ip: faker.internet.ip(),
  };
}

describe('<AccessPoints />', () => {
  it('should work with vlanNative is undefined', () => {
    const mockDetails = {
      ...mockAccessPoint,
      details: {
        ...mockAccessPoint.details,
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
      ...mockAccessPoint,
      details: {
        ...mockAccessPoint.details,
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
      ...mockAccessPoint,
      details: {
        ...mockAccessPoint.details,
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
      return <AccessPoints {...mockAccessPoint} form={form} />;
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
          <AccessPoints {...mockAccessPoint} form={form} />
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
          <AccessPoints {...mockAccessPoint} form={form} />
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
      const mockData = {
        ...mockAccessPoint,
        details: {
          ...mockAccessPoint.details,
          rtlsSettings: {
            enabled: true,
          },
        },
      };
      return (
        <Form form={form}>
          <AccessPoints {...mockData} form={form} />
        </Form>
      );
    };
    const { getByTestId } = render(<AccessPointComp />);

    await waitFor(() => {
      expect(getByTestId('rtlsInputFields')).toBeInTheDOM();
    });
  });

  it('error message should be displayed when RTLS input fields IP Address and Port have invalid values', async () => {
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      const mockData = {
        ...mockAccessPoint,
        details: {
          ...mockAccessPoint.details,
          rtlsSettings: {
            enabled: true,
          },
        },
      };
      return (
        <Form form={form}>
          <AccessPoints {...mockData} form={form} />
        </Form>
      );
    };
    const { getByText, getByTestId } = render(<AccessPointComp />);

    fireEvent.change(getByTestId('svrIpAdress'), { target: { value: '0.0.0' } });
    fireEvent.change(getByTestId('svrPort'), { target: { value: 123456 } });
    await waitFor(() => {
      expect(getByText('Enter in the format [0-255].[0-255].[0-255].[0-255]')).toBeVisible();
      expect(getByText('Port expected between 1 - 65535')).toBeVisible();
    });
  });

  it('error message should not be displayed when RTLS input fields IP Address and Port have valid values', async () => {
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      const mockData = {
        ...mockAccessPoint,
        details: {
          ...mockAccessPoint.details,
          rtlsSettings: {
            enabled: true,
          },
        },
      };
      return (
        <Form form={form}>
          <AccessPoints {...mockData} form={form} />
        </Form>
      );
    };
    const { getByTestId, queryByText } = render(<AccessPointComp />);

    fireEvent.change(getByTestId('svrIpAdress'), { target: { value: '0.0.0.0' } });
    fireEvent.change(getByTestId('svrPort'), { target: { value: 5 } });
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
          <AccessPoints {...mockAccessPoint} form={form} />
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
      const mockData = {
        ...mockAccessPoint,
        details: {
          ...mockAccessPoint.details,
          rtlsSettings: {
            enabled: true,
          },
        },
      };
      return (
        <Form form={form}>
          <AccessPoints {...mockData} form={form} />
        </Form>
      );
    };
    const { queryAllByText, getByText, getByTestId } = render(<AccessPointComp />);

    fireEvent.change(getByTestId('svrIpAdress'), { target: { value: '0.0.0' } });
    fireEvent.change(getByTestId('svrPort'), { target: { value: 123456 } });
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
      const mockData = {
        ...mockAccessPoint,
        details: {
          ...mockAccessPoint.details,
          rtlsSettings: {
            enabled: true,
          },
        },
      };
      return (
        <Form form={form}>
          <AccessPoints {...mockData} form={form} />
        </Form>
      );
    };
    const { queryAllByText, getByTestId, queryByText } = render(<AccessPointComp />);

    fireEvent.change(getByTestId('svrIpAdress'), { target: { value: '0.0.0.0' } });
    fireEvent.change(getByTestId('svrPort'), { target: { value: 5 } });
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
      const mockData = {
        ...mockAccessPoint,
        details: {
          ...mockAccessPoint.details,
          rtlsSettings: {
            enabled: true,
          },
        },
      };
      return (
        <Form form={form}>
          <AccessPoints {...mockData} form={form} />
        </Form>
      );
    };
    const { queryAllByText, queryByText, getByTestId } = render(<AccessPointComp />);

    await waitFor(() => {
      expect(getByTestId('svrIpAdress')).toBeVisible();
      expect(getByTestId('svrPort')).toBeVisible();
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
          <AccessPoints {...mockAccessPoint} form={form} />
        </Form>
      );
    };
    const { getByTestId, queryAllByText, getByText, container } = render(<AccessPointComp />);

    const radio = queryAllByText('Enabled');
    fireEvent.click(radio[1]);
    const select = getByTestId('select');
    fireEvent.mouseDown(select);
    await waitForElement(() => [getByText('Notice (NOTICE)')], { container });
    expect(getByText('Notice (NOTICE)')).toBeVisible();
  });

  it('on entering invalid value of SSID Profile profile in Wireless Networks (SSIDs) Enabled on This Profile should filter the options', async () => {
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <AccessPoints {...mockAccessPoint} form={form} />
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
          <AccessPoints {...mockAccessPoint} form={form} />
        </Form>
      );
    };

    const profileName = mockAccessPoint.ssidProfiles[0].name;

    const { getByText, container, getByRole } = render(<AccessPointComp />);
    const selectInputFiled = container.querySelector(
      '[data-testid=ssidProfile] > .ant-select-selector span input'
    );
    fireEvent.change(selectInputFiled, { target: { value: 'test' } });
    fireEvent.keyDown(selectInputFiled, { keyCode: 13 });

    const selectInput = container.querySelector('[data-testid=ssidProfile] > .ant-select-selector');
    fireEvent.mouseDown(selectInput);
    fireEvent.keyDown(selectInput, DOWN_ARROW);

    await waitForElement(() => getByText(profileName));
    fireEvent.click(getByText(profileName));

    await waitFor(() => {
      expect(getByRole('cell', { name: profileName })).toBeVisible();
    });
  });

  it('should work when greTunnelConfigurations is undefined', () => {
    const mockDetails = {
      ...mockAccessPoint,
      details: {
        ...mockAccessPoint.details,
        greTunnelConfigurations: undefined,
      },
    };
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return <AccessPoints {...mockDetails} form={form} />;
    };
    render(<AccessPointComp />);
  });

  it('should show modal form when add gre config is clicked ', () => {
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <AccessPoints {...mockAccessPoint} form={form} />
        </Form>
      );
    };

    const { getByTestId, getByText } = render(<AccessPointComp />);

    fireEvent.click(getByTestId('addGre'));
    expect(getByText('Add GRE Configuration')).toBeVisible();
  });

  it('gre config form should show errors on empty fields ', async () => {
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <AccessPoints {...mockAccessPoint} form={form} />
        </Form>
      );
    };

    const { getByTestId, getByText, getByRole } = render(<AccessPointComp />);

    fireEvent.click(getByTestId('addGre'));
    expect(getByText('Add GRE Configuration')).toBeVisible();

    fireEvent.click(getByRole('button', { name: /save/i }));
    await waitFor(() => {
      expect(getByText('Name field cannot be empty')).toBeVisible();
      expect(getByText('Remote IP Address field cannot be empty')).toBeVisible();
    });
  });

  it('cancel button click should hide Add Gre modal', async () => {
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <AccessPoints {...mockAccessPoint} form={form} />
        </Form>
      );
    };

    const { getByText, getByRole, getByTestId, queryByText } = render(<AccessPointComp />);

    fireEvent.click(getByTestId('addGre'));
    expect(getByText(/add gre configuration/i)).toBeVisible();

    fireEvent.click(getByRole('button', { name: /cancel/i }));

    await waitFor(() => {
      expect(queryByText(/add gre configuration/i, { selector: 'div' })).not.toBeInTheDocument();
    });
  });

  it('should add a gre config to the table ', async () => {
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <AccessPoints {...mockAccessPoint} form={form} />
        </Form>
      );
    };

    const { getByTestId, getByText, getByRole, getByLabelText } = render(<AccessPointComp />);

    const { name, ip } = buildGreForm();

    fireEvent.click(getByTestId('addGre'));
    expect(getByText(/add gre configuration/i)).toBeVisible();

    fireEvent.change(getByLabelText(/name/i), { target: { value: name } });
    fireEvent.change(getByLabelText(/remote ip address/i), { target: { value: ip } });

    fireEvent.click(getByRole('button', { name: /save/i }));

    await waitForElementToBeRemoved(() => getByText(/add gre configuration/i));

    await waitFor(() => {
      expect(
        getByRole('cell', {
          name,
        })
      ).toBeVisible();
      expect(
        getByRole('cell', {
          name: ip,
        })
      ).toBeVisible();
    });
  });
});
