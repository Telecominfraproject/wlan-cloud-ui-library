import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, waitFor, waitForElement } from '@testing-library/react';
import { Form } from 'antd';
import { render } from 'tests/utils';

import OperatorForm from '..';

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
  operatorFriendlyName: [
    {
      asDuple: 'eng:test',
      defaultDupleSeparator: ':',
      dupleIso3Language: 'eng',
      dupleName: 'test',
      locale: 'eng',
      model_type: 'PasspointDuple',
    },
  ],
  serverOnlyAuthenticatedL2EncriptionNetwork: true,
  x509CertificateLocation: '/etc/ca.pem',
};

const DOWN_ARROW = { keyCode: 40 };

describe('<OperatorForm />', () => {
  afterEach(cleanup);

  it('should work when operatorFriendlyName is null', async () => {
    const OperatorFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <OperatorForm details={{ ...mockProps, operatorFriendlyName: null }} form={form} />
        </Form>
      );
    };
    render(<OperatorFormComp />);
  });

  it('should work with empty operatorFriendlyName', async () => {
    const OperatorFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <OperatorForm details={{ ...mockProps, operatorFriendlyName: [] }} form={form} />
        </Form>
      );
    };
    render(<OperatorFormComp />);
  });

  it('should work with null serverOnlyAuthenticatedL2EncryptionNetwork', async () => {
    const OperatorFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <OperatorForm
            details={{ ...mockProps, serverOnlyAuthenticatedL2EncryptionNetwork: null }}
            form={form}
          />
        </Form>
      );
    };
    render(<OperatorFormComp />);
  });

  it('Add Name button press should show Add Operator Name modal', async () => {
    const OperatorFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <OperatorForm details={mockProps} form={form} />
        </Form>
      );
    };
    const { getByText, getByRole } = render(<OperatorFormComp />);
    fireEvent.click(getByRole('button', { name: 'Add Name' }));
    expect(getByText('Add Operator Name')).toBeVisible();
  });

  it('add name modal should display an error message when both fields are empty', async () => {
    const OperatorFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <OperatorForm details={mockProps} form={form} />
        </Form>
      );
    };
    const { getByRole, getByText } = render(<OperatorFormComp />);
    fireEvent.click(getByRole('button', { name: 'Add Name' }));
    expect(getByText('Add Operator Name')).toBeVisible();

    fireEvent.click(getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(getByText('Name field cannot be empty')).toBeVisible();
      expect(getByText('Locale field cannot be empty')).toBeVisible();
    });
  });

  it('add name modal should display an error message when the name field is empty', async () => {
    const OperatorFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <OperatorForm details={mockProps} form={form} />
        </Form>
      );
    };
    const { getByRole, getByText, getByLabelText, getAllByText } = render(<OperatorFormComp />);
    fireEvent.click(getByRole('button', { name: 'Add Name' }));
    expect(getByText('Add Operator Name')).toBeVisible();

    const locale = getByLabelText('Locale');
    fireEvent.keyDown(locale, DOWN_ARROW);
    await waitForElement(() => getAllByText('English')[1]);
    fireEvent.click(getAllByText('English')[1]);

    fireEvent.click(getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(getByText('Name field cannot be empty')).toBeVisible();
    });
  });

  it('add name modal should display an error message when the locale field is empty', async () => {
    const OperatorFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <OperatorForm details={mockProps} form={form} />
        </Form>
      );
    };
    const { getByRole, getByText, getByLabelText } = render(<OperatorFormComp />);
    fireEvent.click(getByRole('button', { name: 'Add Name' }));
    expect(getByText('Add Operator Name')).toBeVisible();
    fireEvent.change(getByLabelText('Name'), { target: { value: 'TestName' } });

    fireEvent.click(getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(getByText('Locale field cannot be empty')).toBeVisible();
    });
  });

  it('cancel button click should hide Add Model Add Operator modal', async () => {
    const OperatorFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <OperatorForm details={mockProps} form={form} />
        </Form>
      );
    };
    const { getByText, getByRole } = render(<OperatorFormComp />);

    fireEvent.click(getByRole('button', { name: /add Name/i }));

    expect(getByText('Add Operator Name', { selector: 'div' })).toBeVisible();

    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(getByText('Add Operator Name', { selector: 'div' })).not.toBeVisible();
    });
  });

  it('Data should be added to operator table when modal submitted', async () => {
    const OperatorFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <OperatorForm details={mockProps} form={form} />
        </Form>
      );
    };
    const { getByText, getByRole, getByLabelText, getAllByText } = render(<OperatorFormComp />);

    fireEvent.click(getByRole('button', { name: /add Name/i }));

    expect(getByText('Add Operator Name', { selector: 'div' })).toBeVisible();

    fireEvent.change(getByLabelText('Name'), { target: { value: 'TestName' } });

    const locale = getByLabelText('Locale');
    fireEvent.keyDown(locale, DOWN_ARROW);
    await waitForElement(() => getAllByText('English')[1]);
    fireEvent.click(getAllByText('English')[1]);

    fireEvent.click(getByRole('button', { name: 'Save' }));
    await waitFor(() => {
      expect(getByText('Add Operator Name', { selector: 'div' })).not.toBeVisible();
      expect(getByText('TestName')).toBeVisible();
    });
  });
});
