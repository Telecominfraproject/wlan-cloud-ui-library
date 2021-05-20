import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  fireEvent,
  waitFor,
  waitForElement,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

function buildProxyForm() {
  return {
    acctPort: faker.internet.port(),
    acctServer: faker.internet.ip(),
    acctSharedSecret: faker.internet.password(),
    passphrase: faker.internet.password(),
    port: faker.internet.port(),
    server: faker.internet.ip(),
    sharedSecret: faker.internet.password(),
    realm: faker.internet.domainName(),
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
      expect(getByText('VLAN expected between 2 and 4095')).toBeVisible();
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
    const { getByTestId, getByPlaceholderText } = render(<AccessPointComp />);

    const checkbox = getByTestId('ntpCheckbox');
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(false);
    const input = getByPlaceholderText('Enter NTP server...');
    expect(input).toBeInTheDocument();
  });

  it('error message should be displayed if NTP server does not contain at least 1 subdomain label', async () => {
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
    const input = getByPlaceholderText('Enter NTP server...');
    expect(input).toBeInTheDocument();
    fireEvent.change(input, {
      target: { value: 'test' },
    });

    await waitFor(() => {
      expect(
        getByText('Hostnames must have at least 1 subdomain label. e.g. ntp.pool.org')
      ).toBeVisible();
    });
  });

  it('error message should be displayed if NTP server list contains duplicate values', async () => {
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <AccessPoints {...mockAccessPoint} form={form} />
        </Form>
      );
    };
    const { getAllByRole, getByTestId, getByPlaceholderText, getByText } = render(
      <AccessPointComp />
    );

    const checkbox = getByTestId('ntpCheckbox');
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(false);
    const input = getByPlaceholderText('Enter NTP server...');
    expect(input).toBeInTheDocument();

    const addBtn = getAllByRole('button', { name: 'Add' })[0];
    const hostname = faker.internet.domainName();
    fireEvent.change(input, {
      target: { value: hostname },
    });
    fireEvent.click(addBtn);

    await waitFor(() => {
      expect(getByText(hostname)).toBeVisible();
    });

    fireEvent.change(input, {
      target: { value: hostname },
    });

    await waitFor(() => {
      expect(getByText('This item already exists in the server list')).toBeVisible();
    });
  });

  it('error message should be displayed if server is an invalid hostname', async () => {
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
    const input = getByPlaceholderText('Enter NTP server...');
    expect(input).toBeInTheDocument();
    fireEvent.change(input, {
      target: { value: '!test.com' },
    });

    await waitFor(() => {
      expect(getByText('Unrecognized hostname')).toBeVisible();
    });
  });

  it('error message should be displayed if hostname label exceeds 63 characters', async () => {
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
    const input = getByPlaceholderText('Enter NTP server...');
    expect(input).toBeInTheDocument();
    fireEvent.change(input, {
      target: { value: `${faker.helpers.repeatString('test', 16)}.com` },
    });

    await waitFor(() => {
      expect(getByText('Hostname labels must be between 1 and 63 characters long')).toBeVisible();
    });
  });

  it('error message should be displayed if hostname exceeds 253 characters', async () => {
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
    const input = getByPlaceholderText('Enter NTP server...');
    expect(input).toBeInTheDocument();
    fireEvent.change(input, {
      target: { value: `${faker.helpers.repeatString('test.com', 50)}` },
    });

    await waitFor(() => {
      expect(getByText('Hostnames may not exceed 253 characters in length')).toBeVisible();
    });
  });

  it('hostname should be added to NTP Server list if it passes all checks', async () => {
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <AccessPoints {...mockAccessPoint} form={form} />
        </Form>
      );
    };
    const { getByTestId, getByPlaceholderText, getByText, getAllByRole } = render(
      <AccessPointComp />
    );

    const checkbox = getByTestId('ntpCheckbox');
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(false);
    const input = getByPlaceholderText('Enter NTP server...');
    expect(input).toBeInTheDocument();

    const hostname = faker.internet.domainName();
    fireEvent.change(input, {
      target: { value: hostname },
    });

    fireEvent.click(getAllByRole('button', { name: 'Add' })[0]);

    await waitFor(() => {
      expect(getByText(hostname)).toBeVisible();
    });
  });

  it('error message should be shown if 4 items are already added to NTP server list', async () => {
    const AccessPointComp = () => {
      const [form] = Form.useForm();

      const mockDetails = {
        ...mockAccessPoint,
        details: {
          ...mockAccessPoint.details,
          ntpServer: {
            auto: false,
            value: '0.pool.ntp.org:1.pool.ntp.org:2.pool.ntp.org:3.pool.ntp.org',
          },
        },
      };

      return (
        <Form form={form}>
          <AccessPoints {...mockDetails} form={form} />
        </Form>
      );
    };
    const { getByPlaceholderText, queryByText } = render(<AccessPointComp />);

    const input = getByPlaceholderText('Enter NTP server...');
    expect(input).toBeInTheDocument();

    fireEvent.change(input, {
      target: { value: faker.internet.domainName() },
    });

    await waitFor(() => {
      expect(queryByText('Unable to add more than 4 items to the server list')).toBeVisible();
    });
  });

  it('removing a NTP Server should remove it from the server list', async () => {
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <AccessPoints {...mockAccessPoint} form={form} />
        </Form>
      );
    };
    const { getByTestId, getByPlaceholderText, getAllByRole, queryByText } = render(
      <AccessPointComp />
    );

    const checkbox = getByTestId('ntpCheckbox');
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(false);
    const input = getByPlaceholderText('Enter NTP server...');
    expect(input).toBeInTheDocument();

    const hostname = faker.internet.domainName();
    fireEvent.change(input, {
      target: { value: hostname },
    });
    fireEvent.click(getAllByRole('button', { name: 'Add' })[0]);

    await waitFor(() => {
      expect(queryByText(hostname)).toBeVisible();
    });

    fireEvent.click(getAllByRole('button', { name: 'Remove' })[0]);

    await waitFor(() => {
      expect(queryByText(hostname)).not.toBeInTheDocument();
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

  it('Clicking the Add Radius Proxy Configuration button should show the first Proxy Configuration form', async () => {
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <AccessPoints {...mockAccessPoint} form={form} />
        </Form>
      );
    };

    const { getByTestId, getByText } = render(<AccessPointComp />);

    fireEvent.click(getByTestId('addProxy'));
    expect(getByText(/proxy configuration 1/i)).toBeVisible();
  });

  it('Clicking the Remove Proxy button should remove the associated Proxy Configuration form', async () => {
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <AccessPoints {...mockAccessPoint} form={form} />
        </Form>
      );
    };

    const { getByTestId, getByText, queryByText } = render(<AccessPointComp />);

    fireEvent.click(getByTestId('addProxy'));
    expect(getByText(/proxy configuration 1/i)).toBeVisible();

    fireEvent.click(getByTestId('removeProxy0'));
    expect(queryByText(/proxy configuration 1/i)).not.toBeInTheDocument();
  });

  it('Error should show if Authentication server and Accounting server are not valid', async () => {
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <AccessPoints {...mockAccessPoint} form={form} />
        </Form>
      );
    };

    const { getByTestId, getByText, getByLabelText, queryByText, getByPlaceholderText } = render(
      <AccessPointComp />
    );

    fireEvent.click(getByTestId('addProxy'));
    expect(getByText(/proxy configuration 1/i)).toBeVisible();

    const { acctServer, server } = buildProxyForm();

    fireEvent.change(getByLabelText('Authentication Server'), {
      target: { value: faker.lorem.word() },
    });

    const errorMessage = 'Enter in the format [0-255].[0-255].[0-255].[0-255]';

    await waitFor(() => {
      expect(getByText(errorMessage)).toBeVisible();
    });

    fireEvent.change(getByLabelText('Authentication Server'), { target: { value: server } });

    await waitFor(() => {
      expect(queryByText(errorMessage)).not.toBeInTheDocument();
    });

    fireEvent.change(getByPlaceholderText('Enter Accounting Server'), {
      target: { value: faker.lorem.word() },
    });

    await waitFor(() => {
      expect(getByText(errorMessage)).toBeVisible();
    });

    fireEvent.change(getByPlaceholderText('Enter Accounting Server'), {
      target: { value: acctServer },
    });

    await waitFor(() => {
      expect(queryByText(errorMessage)).not.toBeInTheDocument();
    });
  });

  it('Error should show if Authentication port and Accounting port are not valid', async () => {
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <AccessPoints {...mockAccessPoint} form={form} />
        </Form>
      );
    };

    const { getByTestId, getByText, getByLabelText, queryByText, getByPlaceholderText } = render(
      <AccessPointComp />
    );

    fireEvent.click(getByTestId('addProxy'));
    expect(getByText(/proxy configuration 1/i)).toBeVisible();

    const { acctPort, port } = buildProxyForm();

    fireEvent.change(getByLabelText('Authentication Port'), {
      target: { value: faker.random.number({ min: -100, max: 0 }) },
    });

    const errorMessage = 'Port expected between 1 - 65535';

    await waitFor(() => {
      expect(getByText(errorMessage)).toBeVisible();
    });

    fireEvent.change(getByLabelText('Authentication Port'), { target: { value: port } });

    await waitFor(() => {
      expect(queryByText(errorMessage)).not.toBeInTheDocument();
    });

    fireEvent.change(getByPlaceholderText('Enter Accounting Port'), {
      target: {
        value: faker.random.number({ min: 65536, max: 100000 }),
      },
    });

    await waitFor(() => {
      expect(getByText(errorMessage)).toBeVisible();
    });

    fireEvent.change(getByPlaceholderText('Enter Accounting Port'), {
      target: { value: acctPort },
    });

    await waitFor(() => {
      expect(queryByText(errorMessage)).not.toBeInTheDocument();
    });
  });

  it('Clicking the Add Realm button should add another Realm Domain input', async () => {
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <AccessPoints {...mockAccessPoint} form={form} />
        </Form>
      );
    };

    const { getByTestId, getByText, getByRole, getByPlaceholderText } = render(<AccessPointComp />);

    fireEvent.click(getByTestId('addProxy'));
    expect(getByText(/proxy configuration 1/i)).toBeVisible();

    fireEvent.click(getByRole('button', { name: /add realm/i }));

    await waitFor(() => {
      expect(getByPlaceholderText('Enter Realm 2')).toBeInTheDocument();
    });
  });

  it('Clicking the Remove Realm button should remove Realm Domain input', async () => {
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <AccessPoints {...mockAccessPoint} form={form} />
        </Form>
      );
    };

    const { getByTestId, getByText, getByRole, getByPlaceholderText } = render(<AccessPointComp />);

    fireEvent.click(getByTestId('addProxy'));
    expect(getByText(/proxy configuration 1/i)).toBeVisible();

    fireEvent.click(getByRole('button', { name: /add realm/i }));

    const input = getByPlaceholderText('Enter Realm 2');
    await waitFor(() => {
      expect(input).toBeInTheDocument();
    });

    fireEvent.click(getByTestId('removeRealm1'));

    await waitFor(() => {
      expect(input).not.toBeInTheDocument();
    });
  });

  it('Should show error if Realm input is not a valid domain', async () => {
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <AccessPoints {...mockAccessPoint} form={form} />
        </Form>
      );
    };

    const { getByTestId, getByText, getByPlaceholderText, queryByText } = render(
      <AccessPointComp />
    );

    const { realm } = buildProxyForm();

    fireEvent.click(getByTestId('addProxy'));
    expect(getByText(/proxy configuration 1/i)).toBeVisible();

    const errorMessage = 'Enter a valid Realm Domain';

    const realmInput = getByPlaceholderText('Enter Realm 1');
    fireEvent.change(realmInput, { target: { value: faker.lorem.word() } });
    await waitFor(() => {
      expect(getByText(errorMessage)).toBeVisible();
    });

    fireEvent.change(realmInput, { target: { value: realm } });
    await waitFor(() => {
      expect(queryByText(errorMessage)).not.toBeInTheDocument();
    });
  });

  it('Should show error if Realm input is not unique', async () => {
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <AccessPoints {...mockAccessPoint} form={form} />
        </Form>
      );
    };

    const { getByTestId, getByText, getByPlaceholderText, getByRole } = render(<AccessPointComp />);

    const { realm } = buildProxyForm();

    fireEvent.click(getByTestId('addProxy'));
    expect(getByText(/proxy configuration 1/i)).toBeVisible();

    const realmInput = getByPlaceholderText('Enter Realm 1');
    fireEvent.change(realmInput, { target: { value: realm } });

    fireEvent.click(getByRole('button', { name: /add realm/i }));

    const realmInput2 = getByPlaceholderText('Enter Realm 2');
    fireEvent.change(realmInput2, { target: { value: realm } });

    await waitFor(() => {
      expect(getByText('Enter a unique Realm Domain')).toBeVisible();
    });
  });

  it('CA Certification File should be uploaded and added if it is a .pem file', async () => {
    const uploadSpy = jest.fn();
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <AccessPoints {...mockAccessPoint} form={form} fileUpload={uploadSpy} />
        </Form>
      );
    };

    const file = {
      uid: 'rc-upload-1621356980215-7',
      lastModified: 1596641328733,
      name: 'cacert.pem',
      type: 'application/x-x509-ca-cert',
      originFileObj: { uid: 'rc-upload-1621356980215-7' },
      response: { url: 'test' },
    };

    const { getByTestId, getByText } = render(<AccessPointComp />);

    fireEvent.click(getByTestId('addProxy'));
    expect(getByText(/proxy configuration 1/i)).toBeVisible();

    const input = getByTestId('caCertFile0');
    userEvent.upload(input, file);

    await waitFor(() => {
      expect(input.files[0]).toStrictEqual(file);
      expect(input.files).toHaveLength(1);
      expect(uploadSpy).toBeCalledTimes(1);
      expect(getByText(file.name)).toBeVisible();
    });
  });

  it('CA Certificate File should not be uploaded if it is not a .pem file', async () => {
    const uploadSpy = jest.fn();
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <AccessPoints {...mockAccessPoint} form={form} fileUpload={uploadSpy} />
        </Form>
      );
    };

    const file = {
      uid: 'rc-upload-1621356980215-7',
      lastModified: 1596641328733,
      name: 'test.jpeg',
      type: 'image/jpeg',
      originFileObj: { uid: 'rc-upload-1621356980215-7' },
      response: { url: 'test' },
    };

    const { getByTestId, getByText, queryByText } = render(<AccessPointComp />);

    fireEvent.click(getByTestId('addProxy'));
    expect(getByText(/proxy configuration 1/i)).toBeVisible();

    const input = getByTestId('caCertFile0');
    userEvent.upload(input, file);

    await waitFor(() => {
      expect(uploadSpy).not.toBeCalled();
      expect(queryByText(file.name)).not.toBeInTheDocument();
    });
  });

  it('Client Certification File should be uploaded and added if it is a .pem file', async () => {
    const uploadSpy = jest.fn();
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <AccessPoints {...mockAccessPoint} form={form} fileUpload={uploadSpy} />
        </Form>
      );
    };

    const file = {
      uid: 'rc-upload-1621356980215-7',
      lastModified: 1596641328733,
      name: 'clientcert.pem',
      type: 'application/x-x509-ca-cert',
      originFileObj: { uid: 'rc-upload-1621356980215-7' },
      response: { url: 'test' },
    };

    const { getByTestId, getByText } = render(<AccessPointComp />);

    fireEvent.click(getByTestId('addProxy'));
    expect(getByText(/proxy configuration 1/i)).toBeVisible();

    const input = getByTestId('clientCertFile0');
    userEvent.upload(input, file);

    await waitFor(() => {
      expect(input.files[0]).toStrictEqual(file);
      expect(input.files).toHaveLength(1);
      expect(uploadSpy).toBeCalledTimes(1);
      expect(getByText(file.name)).toBeVisible();
    });
  });

  it('Client Certificate File should not be uploaded if it is not a .pem file', async () => {
    const uploadSpy = jest.fn();
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <AccessPoints {...mockAccessPoint} form={form} fileUpload={uploadSpy} />
        </Form>
      );
    };

    const file = {
      uid: 'rc-upload-1621356980215-7',
      lastModified: 1596641328733,
      name: 'test.jpeg',
      type: 'image/jpeg',
      originFileObj: { uid: 'rc-upload-1621356980215-7' },
      response: { url: 'test' },
    };

    const { getByTestId, getByText, queryByText } = render(<AccessPointComp />);

    fireEvent.click(getByTestId('addProxy'));
    expect(getByText(/proxy configuration 1/i)).toBeVisible();

    const input = getByTestId('clientCertFile0');
    userEvent.upload(input, file);

    await waitFor(() => {
      expect(uploadSpy).not.toBeCalled();
      expect(queryByText(file.name)).not.toBeInTheDocument();
    });
  });

  it('Client Key File should be uploaded and added if it is a .key file', async () => {
    const uploadSpy = jest.fn();
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <AccessPoints {...mockAccessPoint} form={form} fileUpload={uploadSpy} />
        </Form>
      );
    };

    const file = {
      uid: 'rc-upload-1621356980215-7',
      lastModified: 1596641328733,
      name: 'clientkey_dec.key',
      originFileObj: { uid: 'rc-upload-1621356980215-7' },
      response: { url: 'test' },
    };

    const { getByTestId, getByText } = render(<AccessPointComp />);

    fireEvent.click(getByTestId('addProxy'));
    expect(getByText(/proxy configuration 1/i)).toBeVisible();

    const input = getByTestId('clientKeyFile0');
    userEvent.upload(input, file);

    await waitFor(() => {
      expect(input.files[0]).toStrictEqual(file);
      expect(input.files).toHaveLength(1);
      expect(uploadSpy).toBeCalledTimes(1);
      expect(getByText(file.name)).toBeVisible();
    });
  });

  it('Client Key File should not be uploaded if it is not a .key file', async () => {
    const uploadSpy = jest.fn();
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <AccessPoints {...mockAccessPoint} form={form} fileUpload={uploadSpy} />
        </Form>
      );
    };

    const file = {
      uid: 'rc-upload-1621356980215-7',
      lastModified: 1596641328733,
      name: 'test.jpeg',
      type: 'image/jpeg',
      originFileObj: { uid: 'rc-upload-1621356980215-7' },
      response: { url: 'test' },
    };

    const { getByTestId, getByText, queryByText } = render(<AccessPointComp />);

    fireEvent.click(getByTestId('addProxy'));
    expect(getByText(/proxy configuration 1/i)).toBeVisible();

    const input = getByTestId('clientKeyFile0');
    userEvent.upload(input, file);

    await waitFor(() => {
      expect(uploadSpy).not.toBeCalled();
      expect(queryByText(file.name)).not.toBeInTheDocument();
    });
  });

  it('Changing the RadSec setting should change default values for Accounting Port and Authentication Port', async () => {
    const AccessPointComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <AccessPoints {...mockAccessPoint} form={form} />
        </Form>
      );
    };

    const { getByTestId, getByText, getByLabelText, getByPlaceholderText, container } = render(
      <AccessPointComp />
    );

    fireEvent.click(getByTestId('addProxy'));
    expect(getByText(/proxy configuration 1/i)).toBeVisible();

    const authPort = getByLabelText('Authentication Port');
    expect(authPort.value).toBe('2083');

    const acctPort = getByPlaceholderText('Enter Accounting Port');
    expect(acctPort.value).toBe('2083');

    // disable button
    fireEvent.click(
      container.querySelector('#radiusProxyConfigurations_0_useRadSec > label:nth-child(1)')
    );

    expect(authPort.value).toBe('1812');
    expect(acctPort.value).toBe('1813');

    // enable button
    fireEvent.click(
      container.querySelector('#radiusProxyConfigurations_0_useRadSec > label:nth-child(2)')
    );

    expect(authPort.value).toBe('2083');
    expect(acctPort.value).toBe('2083');
  });
});
