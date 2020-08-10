import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, waitFor, waitForElement } from '@testing-library/react';
import { Form } from 'antd';
import { render } from 'tests/utils';

import CaptivePortalForm from '..';

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
    authenticationType: 'guest',
    backgroundFile: null,
    backgroundPosition: 'left_top',
    backgroundRepeat: 'no_repeat',
    browserTitle: 'Access the network as Guest',
    expiryType: 'unlimited',
    externalCaptivePortalURL: null,
    externalPolicyFile: null,
    headerContent: 'Captive Portal',
    logoFile: null,
    macWhiteList: [],
    maxUsersWithSameCredentials: 42,
    model_type: 'CaptivePortalConfiguration',
    name: 'Captive-portal',
    profileType: 'captive_portal',
    radiusAuthMethod: 'CHAP',
    radiusServiceName: null,
    redirectURL: '',
    sessionTimeoutInMinutes: 60,
    successPageMarkdownText: 'Welcome to the network',
    userAcceptancePolicy: 'Use this network at your own risk. No warranty of any kind.',
    userList: [
      [
        {
          model_type: 'TimedAccessUserRecord',
          username: 'test',
          password: 'test',
          activationTime: null,
          expirationTime: null,
          numDevices: 0,
          userDetails: {
            model_type: 'TimedAccessUserDetails',
            firstName: 'test',
            lastName: 'test',
            passwordNeedsReset: false,
          },
          userMacAddresses: [],
          lastModifiedTimestamp: 0,
        },
      ],
    ],
    usernamePasswordFile: null,
    walledGardenAllowlist: ['1.1.1.1'],
  },
  radiusProfiles: [
    {
      id: '1',
      name: 'Radius-Profile',
      profileType: 'radius',
      details: {
        model_type: 'RadiusProfile',
        subnetConfiguration: {
          test: {
            model_type: 'RadiusSubnetConfiguration',
            subnetAddress: '111.111.111.11',
            subnetCidrPrefix: 9,
            subnetName: 'test',
            proxyConfig: {
              model_type: 'RadiusProxyConfiguration',
              floatingIpAddress: '222.222.222.22',
              floatingIfCidrPrefix: null,
              floatingIfGwAddress: null,
              floatingIfVlan: null,
              sharedSecret: null,
            },
            probeInterval: null,
            serviceRegionName: 'Ottawa',
          },
        },
        serviceRegionMap: {
          Ottawa: {
            model_type: 'RadiusServiceRegion',
            serverMap: {
              'Radius-Profile': [
                {
                  model_type: 'RadiusServer',
                  ipAddress: '192.168.0.1',
                  secret: 'testing123',
                  authPort: 1812,
                  timeout: null,
                },
              ],
            },
            regionName: 'Ottawa',
          },
        },
        profileType: 'radius',
      },
      __typename: 'Profile',
    },
  ],
};

const DOWN_ARROW = { keyCode: 40 };

describe('<CaptivePortalForm />', () => {
  afterEach(cleanup);
  global.URL.createObjectURL = jest.fn();

  it('should work when authenticationType is null ', async () => {
    const mockDetails = {
      ...mockProps.details,
      details: {
        authenticationType: null,
      },
    };
    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockDetails} form={form} />
        </Form>
      );
    };
    render(<CaptivePortalFormComp />);
  });

  it('should work when logoFile and backGroundFile is not null ', async () => {
    const mockDetails = {
      ...mockProps.details,
      details: {
        logoFile: {
          apExportUrl: 'example.com',
          fileType: 'image/jpeg',
        },
        backgroundFile: {
          apExportUrl: 'example.com',
          fileType: 'image/jpeg',
        },
      },
    };
    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockDetails} form={form} />
        </Form>
      );
    };
    render(<CaptivePortalFormComp />);
  });

  it('should work when externalCaptivePortalURL is true ', async () => {
    const mockDetails = {
      ...mockProps.details,
      details: {
        externalCaptivePortalURL: true,
      },
    };
    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockDetails} form={form} />
        </Form>
      );
    };
    render(<CaptivePortalFormComp />);
  });

  // it('changing authentication mode to Captive Portal User List should display Manage Captive Portal Users button', async () => {
  //   const mockDetails = {
  //     ...mockProps.details,
  //     details: {
  //       externalCaptivePortalURL: true,
  //     },
  //   };
  //   const CaptivePortalFormComp = () => {
  //     const [form] = Form.useForm();
  //     return (
  //       <Form form={form}>
  //         <CaptivePortalForm {...mockDetails} form={form} />
  //       </Form>
  //     );
  //   };
  //   const { getByRole, getByText, container } = render(<CaptivePortalFormComp />);

  //   const DOWN_ARROW = { keyCode: 43 };
  //   const authentication = container.querySelector(
  //     '[data-testid=authenticationMode] > .ant-select-selector'
  //   );

  //   fireEvent.mouseDown(authentication);
  //   fireEvent.keyDown(authentication, DOWN_ARROW);
  //   await waitForElement(() => getByText('Captive Portal User List'));
  //   fireEvent.click(getByText('Captive Portal User List'));

  //   expect(getByRole('button', { name: 'Manage Captive Portal Users' })).toBeVisible();
  // });

  // it('changing authentication mode to RADIUS should render RADIUS card', async () => {
  //   const mockDetails = {
  //     ...mockProps.details,
  //     details: {
  //       externalCaptivePortalURL: true,
  //     },
  //   };
  //   const CaptivePortalFormComp = () => {
  //     const [form] = Form.useForm();
  //     return (
  //       <Form form={form}>
  //         <CaptivePortalForm {...mockDetails} form={form} />
  //       </Form>
  //     );
  //   };
  //   const { getByText, getAllByText, container } = render(<CaptivePortalFormComp />);

  //   const DOWN_ARROW = { keyCode: 43 };
  //   const authentication = container.querySelector(
  //     '[data-testid=authenticationMode] > .ant-select-selector'
  //   );

  //   fireEvent.mouseDown(authentication);
  //   fireEvent.keyDown(authentication, DOWN_ARROW);
  //   await waitForElement(() => getByText('RADIUS'));
  //   fireEvent.click(getByText('RADIUS'));

  //   await waitFor(() => {
  //     expect(getAllByText('RADIUS')[1]).toBeVisible();
  //   });
  // });

  it('error message should be displayed when input value for Session Timeout is invalid', async () => {
    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByLabelText, getByText } = render(<CaptivePortalFormComp />);
    fireEvent.change(getByLabelText('Session Timeout'), {
      target: { value: 15000 },
    });

    await waitFor(() => {
      expect(getByText('Session timeout can be a number between 1 and 1440')).toBeVisible();
    });
  });

  it('error message should not be displayed when input value for Session Timeout is valid', async () => {
    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByLabelText, queryByText } = render(<CaptivePortalFormComp />);
    fireEvent.change(getByLabelText('Session Timeout'), {
      target: { value: 5 },
    });

    await waitFor(() => {
      expect(
        queryByText('Session timeout can be a number between 1 and 1440')
      ).not.toBeInTheDocument();
    });
  });

  it('click on remove button should delete item from whitelist', async () => {
    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { queryByText, getByRole } = render(<CaptivePortalFormComp />);
    await waitFor(() => {
      expect(queryByText('1.1.1.1')).toBeInTheDocument();
    });

    fireEvent.click(getByRole('button', { name: 'Remove' }));

    await waitFor(() => {
      expect(queryByText('1.1.1.1')).not.toBeInTheDocument();
    });
  });

  it('hover on Session Timeout should display tooltip msg', async () => {
    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { container } = render(<CaptivePortalFormComp />);
    fireEvent.mouseOver(container.querySelector('.ant-input-wrapper.ant-input-group > span span'));

    await waitFor(() => {
      expect(container.querySelector('.ant-input-wrapper.ant-input-group > span span')).toHaveClass(
        'ant-tooltip-open Tooltip'
      );
    });
  });

  it('error message should be displayed when input value for Redirect URL is invalid', async () => {
    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByLabelText, getByText } = render(<CaptivePortalFormComp />);
    fireEvent.change(getByLabelText('Redirect URL'), {
      target: { value: '1' },
    });

    await waitFor(() => {
      expect(getByText('Please enter URL in the format http://... or https://...')).toBeVisible();
    });
  });

  it('changing radio button of Splash Page to Externally should render External Splash Page Card', async () => {
    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockProps} form={form} />
        </Form>
      );
    };

    const { getByText } = render(<CaptivePortalFormComp />);
    fireEvent.click(getByText('Externally Hosted'));

    await waitFor(() => {
      expect(getByText('External Splash Page')).toBeVisible();
    });

    fireEvent.click(getByText('Access Point Hosted'));
  });

  it('error message should be displayed when input value for URL for External Splash Page is invalid', async () => {
    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getAllByPlaceholderText, getByText } = render(<CaptivePortalFormComp />);
    fireEvent.click(getByText('Externally Hosted'));
    fireEvent.change(getAllByPlaceholderText('http://... or https://...')[1], {
      target: { value: '1' },
    });

    await waitFor(() => {
      expect(getByText('Please enter URL in the format http://... or https://...')).toBeVisible();
    });
  });

  it('tips should be displayed when Show Splash Page Tips button is clicked', async () => {
    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByRole, getByText } = render(<CaptivePortalFormComp />);
    fireEvent.click(getByText('Externally Hosted'));
    fireEvent.click(
      getByRole('button', {
        name: /show splash page tips/i,
      })
    );

    await waitFor(() => {
      expect(
        getByText(
          'Add your external Splash Page URL into the field above. Save your configuration once satisfied.'
        )
      ).toBeVisible();
    });
  });

  it('body content of Splash Page Content should change when User Acceptance Policy Text and Login Success Text button are cicked', async () => {
    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByRole, getByText, getByTestId } = render(<CaptivePortalFormComp />);

    fireEvent.click(getByText('Splash Page Content'));

    fireEvent.click(
      getByRole('button', {
        name: /login success text/i,
      })
    );
    expect(getByTestId('bodyContent')).toHaveDisplayValue('Welcome to the network');

    fireEvent.click(
      getByRole('button', {
        name: /user acceptance policy text/i,
      })
    );
    expect(getByTestId('bodyContent')).toHaveDisplayValue(
      'Use this network at your own risk. No warranty of any kind.'
    );
  });

  it('error should be visible if input value exceeds length of 253 characters ', async () => {
    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByPlaceholderText, getByText } = render(<CaptivePortalFormComp />);
    const whileListInput = getByPlaceholderText('Hostname, IP, or IP range...');
    fireEvent.change(whileListInput, {
      target: {
        value:
          'oogle.asdasdasdasdasdasdasdkahsdhakshdkjahsdasdasdasdasdasdasdaassss.sddasdasdasdsadsadasdasdasdsadsadsadsadasdasdasdasdasd.sadsadsadasasdsaddsad.ssaassasdsdsdsdsdsdsdsd.sdddsadsadsadsdsadasvdjhsadhasbdhbashdbjasbdjhasbdhjbasdsabha.asdadsagdsahjdhsajhdgasj',
      },
    });

    await waitFor(() => {
      expect(getByText('Hostnames may not exceed 253 characters in length.')).toBeVisible();
    });
  });

  it('error should be visible if input value is unrecognized and invalid', async () => {
    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByPlaceholderText, getByText } = render(<CaptivePortalFormComp />);
    const whileListInput = getByPlaceholderText('Hostname, IP, or IP range...');

    fireEvent.change(whileListInput, {
      target: {
        value: 'ads#$%.RE3L',
      },
    });
    await waitFor(() => {
      expect(getByText('Unrecognized hostname, IPv4 address, or IP range.')).toBeVisible();
    });

    fireEvent.change(whileListInput, {
      target: {
        value:
          '*oogle.asdasdasdasdasdasdasdkahsdhakshdkjahsdasdasdasdasdasdasdaassss.sddasdasdasdsadsadasdasdasdsadsadsadsadasdasdasdasdasd.sadsadsadasasdsaddsad.ssaassasdsdsdsdsdsdsdsd.sdddsadsadsadsdsadasvdjhsadhasbdhbashdbjasbdjhasbdhjbasdsabha.asdadsagdsahjdhsajhdgasj',
      },
    });
    await waitFor(() => {
      expect(getByText('Unrecognized hostname, IPv4 address, or IP range.')).toBeVisible();
    });
    fireEvent.change(whileListInput, {
      target: {
        value: '192.168.1.1-1 1.1.1.1',
      },
    });
    await waitFor(() => {
      expect(getByText('Unrecognized hostname, IPv4 address, or IP range.')).toBeVisible();
    });
    fireEvent.change(whileListInput, {
      target: {
        value: '0 0 0 0',
      },
    });
    await waitFor(() => {
      expect(getByText('Unrecognized hostname, IPv4 address, or IP range.')).toBeVisible();
    });
  });

  it('should work when input value for Configure is valid', async () => {
    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByPlaceholderText, queryByText } = render(<CaptivePortalFormComp />);
    const whileListInput = getByPlaceholderText('Hostname, IP, or IP range...');

    fireEvent.change(whileListInput, {
      target: {
        value: 'googl.*',
      },
    });

    await waitFor(() => {
      expect(
        queryByText('The * wildcard may not be combined with other characters in a hostname label.')
      ).not.toBeInTheDocument();
    });
    fireEvent.change(whileListInput, {
      target: {
        value: '192.168.1.1-192.168.1.1',
      },
    });
    await waitFor(() => {
      expect(
        queryByText('The * wildcard may not be combined with other characters in a hostname label.')
      ).not.toBeInTheDocument();
    });
  });

  it('error should be visible if Hostname label cotain * wildcard', async () => {
    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByPlaceholderText, getByText } = render(<CaptivePortalFormComp />);
    const whileListInput = getByPlaceholderText('Hostname, IP, or IP range...');

    fireEvent.change(whileListInput, {
      target: {
        value: 'googl.*com dolor sit amet, consectetur adipiscing elit',
      },
    });

    await waitFor(() => {
      expect(
        getByText('The * wildcard may not be combined with other characters in a hostname label.')
      ).toBeVisible();
    });
  });

  it('error should be visible if Second-level domain labels contain * wildcard', async () => {
    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByPlaceholderText, getByText } = render(<CaptivePortalFormComp />);
    const whileListInput = getByPlaceholderText('Hostname, IP, or IP range...');

    fireEvent.change(whileListInput, {
      target: {
        value:
          'L*orem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id magna vulputate, semper est nec, commodo nunc',
      },
    });

    await waitFor(() => {
      expect(getByText('Second-level domain labels may not contain a * wildcard.')).toBeVisible();
    });
  });

  it('error should be visible if Hostname Label greater than 63 ', async () => {
    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByPlaceholderText, getByText } = render(<CaptivePortalFormComp />);
    const whileListInput = getByPlaceholderText('Hostname, IP, or IP range...');

    fireEvent.change(whileListInput, {
      target: {
        value:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id magna vulputate, semper est nec, commodo nunc. Class aptent taciti sociosqu ad litora torquent per conubia nostra.ipsm',
      },
    });

    await waitFor(() => {
      expect(getByText('Hostname labels must be between 1 and 63 characters long.')).toBeVisible();
    });
  });

  it('error should be visible if input value does`t have subdomain ', async () => {
    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByPlaceholderText, getByText } = render(<CaptivePortalFormComp />);
    const whileListInput = getByPlaceholderText('Hostname, IP, or IP range...');

    fireEvent.change(whileListInput, {
      target: { value: 'a b c' },
    });

    await waitFor(() => {
      expect(
        getByText('Hostnames must have at least 1 subdomain label. e.g. mycompany.com')
      ).toBeVisible();
    });
  });

  it('error should be visible if input value in whitelist is already exists', async () => {
    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByPlaceholderText, getByText } = render(<CaptivePortalFormComp />);
    const whileListInput = getByPlaceholderText('Hostname, IP, or IP range...');

    fireEvent.change(whileListInput, {
      target: {
        value: '1.1.1.1',
      },
    });

    await waitFor(() => {
      expect(getByText('This item already exists in the whitelist.')).toBeVisible();
    });
  });

  it('error should be visible when new item is added and whitelist have already 32 items in the list', async () => {
    for (let i = 0; i < 40; i += 1) {
      mockProps.details.walledGardenAllowlist.push(`${i}.${i}.${i}.${i}`);
    }
    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByPlaceholderText, queryByText } = render(<CaptivePortalFormComp />);
    const whileListInput = getByPlaceholderText('Hostname, IP, or IP range...');

    fireEvent.change(whileListInput, {
      target: {
        value: '1.1.1.1',
      },
    });

    await waitFor(() => {
      expect(queryByText('Unable to add more than 32 items to the whitelist.')).toBeInTheDocument();
    });
  });

  it('error should be visible if combine length of characters of all items exceeds 2,000 characters ', async () => {
    mockProps.details.walledGardenAllowlist = [];

    for (let i = 0; i < 20; i += 1) {
      let value;
      for (let j = 0; j < 100; j += 1) {
        value += `${j} `;
      }
      mockProps.details.walledGardenAllowlist.push(value);
    }
    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByPlaceholderText, queryByText } = render(<CaptivePortalFormComp />);
    const whileListInput = getByPlaceholderText('Hostname, IP, or IP range...');

    fireEvent.change(whileListInput, {
      target: {
        value: '1.1.1.1',
      },
    });

    await waitFor(() => {
      expect(
        queryByText('Unable to exceed 2,000 characters for all combined whitelist items.')
      ).toBeInTheDocument();
    });
  });

  it('click on add button should add item to the whitelist', async () => {
    mockProps.details.walledGardenAllowlist = [];

    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByPlaceholderText, getByText, getAllByRole } = render(<CaptivePortalFormComp />);
    const whileListInput = getByPlaceholderText('Hostname, IP, or IP range...');

    fireEvent.change(whileListInput, {
      target: {
        value: '1.1.1.1',
      },
    });
    fireEvent.click(getAllByRole('button', 'Add')[7]);
    await waitFor(() => {
      expect(getByText('1.1.1.1')).toBeVisible();
    });
  });

  it('uploading a logo image in other then png/jpg should display error message', () => {
    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByTestId, getByText } = render(<CaptivePortalFormComp />);

    const gifFile = new File(['(⌐□_□)'], 'testImg.gif', {
      type: 'image/gif',
    });

    fireEvent.change(getByTestId('logoFile'), { target: { files: [gifFile] } });
    expect(getByText('You can only upload JPG/PNG file!')).toBeVisible();
  });

  it('uploading a logo image in png format should add image on screen', () => {
    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByTestId, getByRole, getByText } = render(<CaptivePortalFormComp />);

    const pngFile = new File(['(⌐□_□)'], 'testImg.png', {
      type: 'image/png',
    });

    fireEvent.change(getByTestId('logoFile'), { target: { files: [pngFile] } });
    expect(getByText(/testImg\.png/)).toBeInTheDocument();

    fireEvent.click(getByRole('button', { name: /remove file/i }));
  });

  it('uploading a logo image in jpg format should add image on screen', () => {
    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByTestId, getByText } = render(<CaptivePortalFormComp />);

    const jpgFile = new File(['(⌐□_□)'], 'testImg.jpg', {
      type: 'image/jpg',
    });

    fireEvent.change(getByTestId('logoFile'), { target: { files: [jpgFile] } });
    expect(getByText(/testImg\.jpg/)).toBeInTheDocument();
  });

  it('uploading a logo image size greater then 400KB should display error message', () => {
    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByTestId, getByText } = render(<CaptivePortalFormComp />);

    fireEvent.change(getByTestId('logoFile'), {
      target: {
        files: [
          {
            uid: 'rc-upload-1595008718690-73',
            lastModified: 1595008730671,
            lastModifiedDate: undefined,
            name: 'testImg.jpg',
            size: 440954545646,
            type: 'image/jpg',
            percent: 0,
            originFileObj: { uid: 'rc-upload-1595008718690-73' },
          },
        ],
      },
    });
    expect(getByText('Image must smaller than 400KB!')).toBeVisible();
  });

  it('deleting uploaded logo image should remove image from screen', async () => {
    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByTestId, getByRole, getByText, queryByText } = render(<CaptivePortalFormComp />);

    const pngFile = new File(['(⌐□_□)'], 'testImg.png', {
      type: 'image/png',
    });

    fireEvent.change(getByTestId('logoFile'), { target: { files: [pngFile] } });
    expect(getByText(/testImg\.png/)).toBeInTheDocument();

    fireEvent.click(getByRole('button', { name: /remove file/i }));

    await waitFor(() => {
      expect(queryByText(/testImg\.png/)).not.toBeInTheDocument();
    });
  });

  it('uploading a background image in other then png/jpg should display error message', () => {
    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getAllByText, getAllByTestId } = render(<CaptivePortalFormComp />);

    const gifFile = new File(['(⌐□_□)'], 'testImg.gif', {
      type: 'image/gif',
    });

    fireEvent.change(getAllByTestId('backgroundFile')[0], { target: { files: [gifFile] } });
    expect(getAllByText('You can only upload JPG/PNG file!')[0]).toBeVisible();
  });

  it('uploading a background image in png format should add image on screen', () => {
    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getAllByTestId, getByRole, getByText } = render(<CaptivePortalFormComp />);

    const pngFile = new File(['(⌐□_□)'], 'testImg.png', {
      type: 'image/png',
    });

    fireEvent.change(getAllByTestId('backgroundFile')[0], { target: { files: [pngFile] } });
    expect(getByText(/testImg\.png/)).toBeInTheDocument();

    fireEvent.click(getByRole('button', { name: /remove file/i }));
  });

  it('uploading a background image in jpg format should add image on screen', () => {
    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getAllByTestId, getByText } = render(<CaptivePortalFormComp />);

    const jpgFile = new File(['(⌐□_□)'], 'testImg.jpg', {
      type: 'image/jpg',
      response: { url: 'example.com' },
    });

    fireEvent.change(getAllByTestId('backgroundFile')[0], {
      target: {
        files: [
          jpgFile,
          {
            uid: 'rc-upload-1595008718690-73',
            lastModified: 1595008730671,
            lastModifiedDate: undefined,
            name: 'testImg.jpg',
            size: 440954,
            type: 'image/jpg',
            response: { url: 'example.com' },
            percent: 0,
            originFileObj: { uid: 'rc-upload-1595008718690-73' },
          },
        ],
      },
    });
    expect(getByText(/testImg\.jpg/)).toBeInTheDocument();
  });

  it('uploading a background image size greater then 400KB should display error message', () => {
    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getAllByTestId, getAllByText } = render(<CaptivePortalFormComp />);

    fireEvent.change(getAllByTestId('backgroundFile')[0], {
      target: {
        files: [
          {
            uid: 'rc-upload-1595008718690-73',
            lastModified: 1595008730671,
            lastModifiedDate: undefined,
            name: 'testImg.jpg',
            size: 440954545646,
            type: 'image/jpg',
            percent: 0,
            originFileObj: { uid: 'rc-upload-1595008718690-73' },
          },
        ],
      },
    });
    expect(getAllByText('Image must smaller than 400KB!')[1]).toBeVisible();
  });

  it('deleting uploaded background image should remove image from screen', async () => {
    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getAllByTestId, getByRole, getByText, queryByText } = render(<CaptivePortalFormComp />);

    const pngFile = new File(['(⌐□_□)'], 'testImg.png', {
      type: 'image/png',
    });

    fireEvent.change(getAllByTestId('backgroundFile')[0], { target: { files: [pngFile] } });
    expect(getByText(/testImg\.png/)).toBeInTheDocument();

    fireEvent.click(getByRole('button', { name: /remove file/i }));

    await waitFor(() => {
      expect(queryByText(/testImg\.png/)).not.toBeInTheDocument();
    });
  });

  it('Changing the authentication setting to Captive Portal User List should show the user list card', async () => {
    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByLabelText, getByText } = render(<CaptivePortalFormComp />);

    const authentication = getByLabelText('Authentication');
    fireEvent.keyDown(authentication, DOWN_ARROW);
    await waitForElement(() => getByText('Captive Portal User List'));
    fireEvent.click(getByText('Captive Portal User List'));

    await waitFor(() => {
      expect(getByText('User List')).toBeInTheDocument();
    });
  });

  it('User should be shown in user list table after being added', async () => {
    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByLabelText, getByText, getAllByText, getByRole } = render(
      <CaptivePortalFormComp />
    );

    const authentication = getByLabelText('Authentication');
    fireEvent.keyDown(authentication, DOWN_ARROW);
    await waitForElement(() => getByText('Captive Portal User List'));
    fireEvent.click(getByText('Captive Portal User List'));

    fireEvent.click(getByRole('button', { name: /add user/i }));

    const paragraph = getByText('Add User', { selector: 'div' });
    expect(paragraph).toBeVisible();

    fireEvent.change(getByLabelText('Username'), { target: { value: 'username' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.change(getByLabelText('First Name'), { target: { value: 'firstname' } });
    fireEvent.change(getByLabelText('Last Name'), { target: { value: 'lastname' } });
    fireEvent.click(getByRole('button', { name: `Save` }));

    await waitFor(() => {
      expect(getAllByText('Username')[0]).toBeInTheDocument();
    });
  });

  it('Updated user should be shown in user list table after being updated', async () => {
    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByLabelText, getByText, getAllByText, getByRole } = render(
      <CaptivePortalFormComp />
    );

    const authentication = getByLabelText('Authentication');
    fireEvent.keyDown(authentication, DOWN_ARROW);
    await waitForElement(() => getByText('Captive Portal User List'));
    fireEvent.click(getByText('Captive Portal User List'));

    fireEvent.click(
      getByRole('button', { name: `edit-${mockProps.details.userList[0].username}` })
    );

    fireEvent.change(getByLabelText('Username'), { target: { value: 'username1' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.change(getByLabelText('First Name'), { target: { value: 'firstname' } });
    fireEvent.change(getByLabelText('Last Name'), { target: { value: 'lastname' } });
    fireEvent.click(getByRole('button', { name: `Save` }));

    await waitFor(() => {
      expect(getAllByText('username1')[0]).toBeInTheDocument();
    });
  });

  it('Deleted user should not be shown in user list table after being deleted', async () => {
    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByLabelText, getByText, getByRole } = render(<CaptivePortalFormComp />);

    const authentication = getByLabelText('Authentication');
    fireEvent.keyDown(authentication, DOWN_ARROW);
    await waitForElement(() => getByText('Captive Portal User List'));
    fireEvent.click(getByText('Captive Portal User List'));

    const button = getByRole('button', {
      name: `delete-${mockProps.details.userList[0].username}`,
    });

    fireEvent.click(button);

    fireEvent.click(getByRole('button', { name: `Delete` }));

    await waitFor(() => {
      expect(button).not.toBeInTheDocument();
    });
  });

  it('Changing the authentication setting to Radius should show the Radius card', async () => {
    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByLabelText, getByText } = render(<CaptivePortalFormComp />);

    const authentication = getByLabelText('Authentication');
    fireEvent.keyDown(authentication, DOWN_ARROW);
    await waitForElement(() => getByText('RADIUS'));
    fireEvent.click(getByText('RADIUS'));

    await waitFor(() => {
      expect(getByLabelText('Service')).toBeInTheDocument();
    });
  });

  it('Radius card should show radius profiles and authentication modes', async () => {
    const CaptivePortalFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <CaptivePortalForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getAllByLabelText, getByText, getAllByText } = render(<CaptivePortalFormComp />);

    const authentication = getAllByLabelText('Authentication')[0];
    fireEvent.keyDown(authentication, DOWN_ARROW);
    await waitForElement(() => getByText('RADIUS'));
    fireEvent.click(getByText('RADIUS'));

    const radiusAuthentication = getAllByLabelText('Authentication')[1];
    fireEvent.keyDown(radiusAuthentication, DOWN_ARROW);
    await waitForElement(() => getByText('Password (PAP)'));
    fireEvent.click(getByText('Password (PAP)'));

    const radiusService = getAllByLabelText('Service')[0];
    fireEvent.keyDown(radiusService, DOWN_ARROW);
    await waitForElement(() => getAllByText(mockProps.radiusProfiles[0].name)[0]);
    fireEvent.click(getAllByText(mockProps.radiusProfiles[0].name)[0]);

    expect(getAllByText('Password (PAP)')[0]).toBeInTheDocument();
    expect(getAllByText(mockProps.radiusProfiles[0].name)[0]).toBeInTheDocument();
  });
});
