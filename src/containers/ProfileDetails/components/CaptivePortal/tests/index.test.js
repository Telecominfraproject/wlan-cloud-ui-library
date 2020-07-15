import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, waitFor } from '@testing-library/react';
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
    userList: [],
    usernamePasswordFile: null,
    walledGardenWhitelist: [],
  },
};

describe('<CaptivePortalForm />', () => {
  afterEach(cleanup);

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
    fireEvent.change(getByLabelText('Session Timeout'), { target: { value: null } });

    await waitFor(() => {
      expect(getByText('Session timeout can be a number between 1 and 1440')).toBeVisible();
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
        'anticon anticon-info-circle ant-tooltip-open'
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
    fireEvent.change(getByLabelText('Redirect URL'), { target: { value: '1' } });

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
    fireEvent.click(getByRole('button', { name: /show splash page tips/i }));

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
});
