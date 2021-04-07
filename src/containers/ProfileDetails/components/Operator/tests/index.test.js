import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, waitFor, waitForElement } from '@testing-library/react';
import { Form } from 'antd';
import { render, DOWN_ARROW } from 'tests/utils';
import userEvent from '@testing-library/user-event';
import faker from 'faker';

import { mockOperator } from '../../../tests/constants';

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

function buildOperatorForm() {
  return {
    name: faker.internet.userName(),
    locale: 'English',
  };
}

describe('<OperatorForm />', () => {
  it('should work when operatorFriendlyName is null', async () => {
    const OperatorFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <OperatorForm details={{ ...mockOperator, operatorFriendlyName: null }} form={form} />
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
          <OperatorForm details={{ ...mockOperator, operatorFriendlyName: [] }} form={form} />
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
            details={{ ...mockOperator, serverOnlyAuthenticatedL2EncryptionNetwork: null }}
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
          <OperatorForm details={mockOperator} form={form} />
        </Form>
      );
    };
    const { getByText, getByRole } = render(<OperatorFormComp />);
    fireEvent.click(getByRole('button', { name: /add name/i }));
    expect(getByText(/add operator Name/i)).toBeVisible();
    expect(getByRole('textbox', { name: /name:/i })).toBeVisible();
  });

  it('add name modal should display an error message when both fields are empty', async () => {
    const OperatorFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <OperatorForm details={mockOperator} form={form} />
        </Form>
      );
    };
    const { getByRole, getByText } = render(<OperatorFormComp />);
    fireEvent.click(getByRole('button', { name: 'Add Name' }));
    expect(getByText(/add operator name/i)).toBeVisible();

    fireEvent.click(getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(getByText(/name field cannot be empty/i)).toBeVisible();
      expect(getByText(/locale field cannot be empty/i)).toBeVisible();
    });
  });

  it('add name modal should display an error message when the name field is empty', async () => {
    const OperatorFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <OperatorForm details={mockOperator} form={form} />
        </Form>
      );
    };
    const { getByRole, getByText, getAllByText } = render(<OperatorFormComp />);
    fireEvent.click(getByRole('button', { name: /add name/i }));
    expect(getByText(/add operator name/i)).toBeVisible();

    fireEvent.keyDown(getByRole('combobox', { name: /locale:/i }), DOWN_ARROW);
    await waitFor(() => getAllByText(/english/i)[1]);
    fireEvent.click(getAllByText(/english/i)[1]);

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
          <OperatorForm details={mockOperator} form={form} />
        </Form>
      );
    };
    const { getByRole, getByText } = render(<OperatorFormComp />);

    const { name } = buildOperatorForm();
    fireEvent.click(getByRole('button', { name: /add name/i }));
    expect(getByText(/add operator name/i)).toBeVisible();

    userEvent.type(getByRole('textbox', { name: /name:/i }), name);

    fireEvent.click(getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(getByText(/locale field cannot be empty/i)).toBeVisible();
    });
  });

  it('cancel button click should hide Add Model Add Operator modal', async () => {
    const OperatorFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <OperatorForm details={mockOperator} form={form} />
        </Form>
      );
    };
    const { getByText, getByRole, queryByText } = render(<OperatorFormComp />);

    fireEvent.click(getByRole('button', { name: /add name/i }));

    expect(getByText(/add operator name/i)).toBeVisible();

    fireEvent.click(getByRole('button', { name: /cancel/i }));

    await waitFor(() => {
      expect(queryByText(/add operator name/i)).not.toBeInTheDocument();
    });
  });

  it('Data should be added to operator table when modal submitted', async () => {
    const OperatorFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <OperatorForm details={mockOperator} form={form} />
        </Form>
      );
    };
    const { getByRole, getByLabelText, getAllByText, queryByText } = render(<OperatorFormComp />);

    const { name, locale: localeVal } = buildOperatorForm();

    fireEvent.click(getByRole('button', { name: /add Name/i }));

    expect(queryByText(/add operator name/i)).toBeVisible();

    fireEvent.change(getByLabelText('Name'), { target: { value: name } });

    const locale = getByLabelText(/locale/i);
    fireEvent.keyDown(locale, DOWN_ARROW);
    await waitForElement(() => getAllByText(localeVal)[1]);
    fireEvent.click(getAllByText(localeVal)[1]);

    fireEvent.click(getByRole('button', { name: /save/i }));
    await waitFor(() => {
      expect(queryByText(/add operator name/i)).not.toBeInTheDocument();
      expect(getByRole('cell', { name })).toBeVisible();
    });
  });
});
