import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, waitFor } from '@testing-library/react';
import { Form } from 'antd';
import { render } from 'tests/utils';

import RadiusForm from '..';

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
    model_type: 'RadiusProfile',
    profileType: 'radius',
    serviceRegionMap: {
      Ottawa: {
        model_type: 'RadiusServiceRegion',
        serverMap: {
          'Radius-Profile': [
            {
              authPort: 1812,
              ipAddress: '192.168.0.1',
              model_type: 'RadiusServer',
              secret: 'testing123',
              timeout: null,
            },
          ],
        },
        regionName: 'Ottawa',
      },
    },
    subnetConfiguration: {
      proxyConfig: { floatingIpAddress: undefined },
      serviceRegionName: 'Ottawa',
      subnetAddress: '0.0.0.0',
      subnetCidrPrefix: '0.0.0.0',
      subnetName: '312',
    },
  },
};

describe('<RadiusForm />', () => {
  afterEach(cleanup);

  it('error message should be displayed when input value for Session Timeout is invalid', async () => {
    const RadiusFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RadiusForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByLabelText, getByText } = render(<RadiusFormComp />);
    fireEvent.change(getByLabelText('RADIUS Probe Interval'), { target: { value: null } });

    await waitFor(() => {
      expect(getByText('Please input Radius Probe Interval')).toBeVisible();
    });
  });

  it('Add Radius Service modal should popup when Add Radius Service button is clicked', async () => {
    const RadiusFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RadiusForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByRole, getAllByText } = render(<RadiusFormComp />);
    fireEvent.click(getByRole('button', { name: 'Add Radius Service' }));
    await waitFor(() => {
      expect(getAllByText('Add RADIUS Service', { exact: true })[0]).toBeVisible();
    });
  });

  it('error message should be displayed when input value for Service Name is invalid', async () => {
    const RadiusFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RadiusForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByText, getByRole, getByLabelText } = render(<RadiusFormComp />);
    fireEvent.click(getByRole('button', { name: 'Add Radius Service' }));
    fireEvent.change(getByLabelText('Service Name'), { target: { value: '0 0' } });
    await waitFor(() => {
      expect(
        getByText('Please enter a name of length 1 - 32 characters, no spaces.')
      ).toBeVisible();
    });
  });

  it('click on cancel button should hide Add Radius modal', async () => {
    const RadiusFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RadiusForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByRole, getAllByText } = render(<RadiusFormComp />);
    fireEvent.click(getByRole('button', { name: 'Add Radius Service' }));
    expect(getAllByText('Add RADIUS Service', { exact: true })[0]).toBeVisible();
    fireEvent.click(getByRole('button', { name: /cancel/i }));
    await waitFor(() => {
      expect(getAllByText('Add RADIUS Service', { exact: true })[0]).not.toBeVisible();
    });
  });

  it('Server Properties card should render when Add Radius Server button is clicked', async () => {
    const RadiusFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RadiusForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByRole, getByText } = render(<RadiusFormComp />);
    fireEvent.click(getByRole('button', { name: 'Add Radius Service' }));
    fireEvent.click(getByRole('button', { name: /Add RADIUS Server/i }));

    await waitFor(() => {
      expect(getByText('Server Properties')).toBeVisible();
    });
  });

  it('click on Remove button should remove radius service item from the list', async () => {
    const RadiusFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RadiusForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByRole, queryAllByText } = render(<RadiusFormComp />);

    fireEvent.click(getByRole('button', { name: /remove/i }));

    await waitFor(() => {
      expect(queryAllByText('No Data')[0]).toBeVisible();
    });
  });

  it('click on edit button should popup Edit RADIUS Service modal', async () => {
    const RadiusFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RadiusForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByRole, getByText, getByLabelText } = render(<RadiusFormComp />);

    fireEvent.click(getByRole('button', { name: /editService/i }));

    await waitFor(() => {
      expect(getByText('Edit RADIUS Service')).toBeVisible();
      expect(getByLabelText('Service Name').closest('input')).toBeDisabled();
    });
  });

  it('click on cancel and save button should hide Edit Radius modal', async () => {
    const RadiusFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RadiusForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByRole, getAllByText } = render(<RadiusFormComp />);
    fireEvent.click(getByRole('button', { name: /editService/i }));
    expect(getAllByText('Edit RADIUS Service', { exact: true })[0]).toBeVisible();
    fireEvent.click(getByRole('button', { name: /cancel/i }));

    await waitFor(() => {
      expect(getAllByText('Edit RADIUS Service', { exact: true })[0]).not.toBeVisible();
    });

    fireEvent.click(getByRole('button', { name: /editService/i }));
    expect(getAllByText('Edit RADIUS Service', { exact: true })[0]).toBeVisible();
    fireEvent.click(getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(getAllByText('Edit RADIUS Service', { exact: true })[0]).not.toBeVisible();
    });
  });

  it('Add Service Zone configuration modal should popup when Add Service Zone button is clicked', async () => {
    const RadiusFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RadiusForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByRole, getByText } = render(<RadiusFormComp />);
    fireEvent.click(getByRole('button', { name: 'Add Service Zone' }));
    await waitFor(() => {
      expect(getByText('Add Service Zone Configuration')).toBeVisible();
    });
  });

  it('error message should be visible when Zone Name have invalid value', async () => {
    const RadiusFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RadiusForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByRole, getByText, getByLabelText } = render(<RadiusFormComp />);
    fireEvent.click(getByRole('button', { name: 'Add Service Zone' }));
    expect(getByText('Add Service Zone Configuration')).toBeVisible();

    fireEvent.change(getByLabelText('Zone Name'), { target: { value: null } });
    fireEvent.click(getByRole('button', { name: /save/i }));
    await waitFor(() => {
      expect(getByText('Please enter service zone')).toBeVisible();
    });
  });

  it('click on save and cancel button should hide Add Service Zone configuration modal', async () => {
    const RadiusFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RadiusForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByRole, getByText, getByLabelText } = render(<RadiusFormComp />);

    fireEvent.click(getByRole('button', { name: 'Add Service Zone' }));
    expect(getByText('Add Service Zone Configuration')).toBeVisible();

    fireEvent.click(getByRole('button', { name: 'Cancel' }));
    await waitFor(() => {
      expect(getByText('Add Service Zone Configuration')).not.toBeVisible();
    });

    fireEvent.click(getByRole('button', { name: 'Add Service Zone' }));
    expect(getByText('Add Service Zone Configuration')).toBeVisible();

    fireEvent.change(getByLabelText('Zone Name'), { target: { value: 'abc' } });
    fireEvent.click(getByRole('button', { name: /save/i }));
    await waitFor(() => {
      expect(getByText('Add Service Zone Configuration')).not.toBeVisible();
    });
  });

  it('Edit Service Zone configuration modal should popup when edit button is clicked', async () => {
    const RadiusFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RadiusForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByRole, getByText } = render(<RadiusFormComp />);
    fireEvent.click(getByRole('button', { name: 'editRadiusService' }));
    await waitFor(() => {
      expect(getByText('Edit Service Zone Configuration')).toBeVisible();
    });
  });

  it('error messgae should be visible when input value is invlalid for Edit Service Zone Configuration modal', async () => {
    const RadiusFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RadiusForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByRole, getByText, getByLabelText } = render(<RadiusFormComp />);
    fireEvent.click(getByRole('button', { name: 'editRadiusService' }));
    await waitFor(() => {
      expect(getByText('Edit Service Zone Configuration')).toBeVisible();
    });
    fireEvent.change(getByLabelText('Zone Name'), { target: { value: null } });
    fireEvent.click(getByRole('button', { name: /save/i }));
    await waitFor(() => {
      expect(getByText('Please enter service zone')).toBeVisible();
    });
  });

  it('Edit Service Zone configuration modal should hide when cancel or save button is clicked', async () => {
    const RadiusFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RadiusForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByRole, getByText, getAllByText } = render(<RadiusFormComp />);
    fireEvent.click(getByRole('button', { name: 'editRadiusService' }));
    await waitFor(() => {
      expect(getAllByText('Edit Service Zone Configuration', { exact: true })[0]).toBeVisible();
    });
    fireEvent.click(getByRole('button', { name: /cancel/i }));
    await waitFor(() => {
      expect(getByText('Edit Service Zone Configuration')).not.toBeVisible();
    });

    fireEvent.click(getByRole('button', { name: /editRadiusService/i }));
    await waitFor(() => {
      expect(getAllByText('Edit Service Zone Configuration', { exact: true })[0]).toBeVisible();
    });
    fireEvent.click(getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(getByText('Edit Service Zone Configuration')).not.toBeVisible();
    });
  });

  it('delete service button should remove Radius Service from list', async () => {
    const RadiusFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RadiusForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByRole, getByText } = render(<RadiusFormComp />);
    fireEvent.click(getByRole('button', { name: /deleteRadiusService/i }));
    await waitFor(() => {
      expect(getByText('No Data')).toBeVisible();
    });
  });

  it('Add Subnet Configuration modal should popup when Add Subnet button is clicked', async () => {
    const RadiusFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RadiusForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByRole, getByText } = render(<RadiusFormComp />);
    fireEvent.click(getByRole('button', { name: /add subnet/i }));
    await waitFor(() => {
      expect(getByText('Add Subnet Configuration')).toBeVisible();
    });
  });

  it('Error messages should be visible when input values are invalid for Add Subnet Configuration modal', async () => {
    const RadiusFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RadiusForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByRole, getByText, getAllByText, getByLabelText } = render(<RadiusFormComp />);
    fireEvent.click(getByRole('button', { name: /add subnet/i }));
    await waitFor(() => {
      expect(getByText('Add Subnet Configuration')).toBeVisible();
    });
    expect(getByLabelText('Zone Name').closest('input')).toBeDisabled();
    fireEvent.change(getByLabelText('Proxy Interface IP'), { target: { value: 'abc' } });

    fireEvent.click(getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(getByText('Please enter subnet name')).toBeVisible();
      expect(getAllByText('Enter in the format [0-255].[0-255].[0-255].[0-255]')[0]).toBeVisible();
      expect(getAllByText('Enter in the format [0-255].[0-255].[0-255].[0-255]')[1]).toBeVisible();
      expect(
        getByText(
          'Please include only numbers in range [1, 32] or format [0-255].[0-255].[0-255].[0-255]'
        )
      ).toBeVisible();
    });
  });

  it('cancel button click should hide Add Subnet Configuration modal', async () => {
    const RadiusFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RadiusForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByRole, getByText, getByLabelText } = render(<RadiusFormComp />);
    fireEvent.click(getByRole('button', { name: /add subnet/i }));
    await waitFor(() => {
      expect(getByText('Add Subnet Configuration')).toBeVisible();
    });
    expect(getByLabelText('Zone Name').closest('input')).toBeDisabled();
    fireEvent.click(getByRole('button', { name: /cancel/i }));

    await waitFor(() => {
      expect(getByText('Add Subnet Configuration')).not.toBeVisible();
    });
  });

  it('save button click should hide Add Subnet Configuration modal', async () => {
    const RadiusFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RadiusForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByRole, getByText, getByLabelText } = render(<RadiusFormComp />);
    fireEvent.click(getByRole('button', { name: /add subnet/i }));
    await waitFor(() => {
      expect(getByText('Add Subnet Configuration')).toBeVisible();
    });
    expect(getByLabelText('Zone Name').closest('input')).toBeDisabled();
    fireEvent.change(getByLabelText('Subnet Name'), { target: { value: 'abc' } });
    fireEvent.change(getByLabelText('Subnet IP'), { target: { value: '0.0.0.0' } });
    fireEvent.change(getByLabelText('Subnet CIDR Mask'), { target: { value: '0.0.0.0' } });

    fireEvent.click(getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(getByText('Add Subnet Configuration')).not.toBeVisible();
    });
  });

  it('Edit Subnet Configuration modal should popup when edit button from Management Subnet list is clicked', async () => {
    const RadiusFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RadiusForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByRole, getByLabelText, getByText } = render(<RadiusFormComp />);
    fireEvent.click(getByRole('button', { name: /add subnet/i }));
    await waitFor(() => {
      expect(getByText('Add Subnet Configuration')).toBeVisible();
    });
    expect(getByLabelText('Zone Name').closest('input')).toBeDisabled();
    fireEvent.change(getByLabelText('Subnet Name'), { target: { value: 'abc' } });
    fireEvent.change(getByLabelText('Subnet IP'), { target: { value: '0.0.0.0' } });
    fireEvent.change(getByLabelText('Subnet CIDR Mask'), { target: { value: '0.0.0.0' } });

    fireEvent.click(getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(getByRole('button', { name: /editSubnet/i })).toBeVisible();
    });

    fireEvent.click(getByRole('button', { name: /editSubnet/i }));

    expect(getByText('Edit Subnet Configuration')).toBeVisible();
  });
});
