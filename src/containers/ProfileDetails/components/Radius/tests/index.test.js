import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, waitFor, within } from '@testing-library/react';
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
          mockService: [
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
      Ottawa2: {
        model_type: 'RadiusServiceRegion',
        serverMap: {
          mockService: [
            {
              authPort: 1812,
              ipAddress: '192.168.0.1',
              model_type: 'RadiusServer',
              secret: 'testing123',
              timeout: null,
            },
          ],
        },
        regionName: 'Ottawa2',
      },
    },
    subnetConfiguration: {
      mockSubnet: {
        model_type: 'RadiusSubnetConfiguration',
        probeInterval: null,
        serviceRegionName: 'Ottawa',
        subnetAddress: '1.1.1.1',
        subnetCidrPrefix: 1,
        subnetName: 'mockSubnet',
      },
      mockSubnet2: {
        model_type: 'RadiusSubnetConfiguration',
        probeInterval: null,
        serviceRegionName: 'Ottawa',
        subnetAddress: '1.1.1.1',
        subnetCidrPrefix: 1,
        subnetName: 'mockSubnet2',
      },
    },
  },
};

describe('<RadiusForm />', () => {
  afterEach(cleanup);

  it('should work with null serviceRegionMap', async () => {
    const RadiusFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RadiusForm details={{ ...mockProps.details, serviceRegionMap: null }} form={form} />
        </Form>
      );
    };
    render(<RadiusFormComp />);
  });

  it('should work with no serviceRegionMap keys', async () => {
    const RadiusFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RadiusForm details={{ ...mockProps.details, serviceRegionMap: {} }} form={form} />
        </Form>
      );
    };
    render(<RadiusFormComp />);
  });

  it('should work with null subnetConfiguration', async () => {
    const RadiusFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RadiusForm details={{ ...mockProps.details, subnetConfiguration: null }} form={form} />
        </Form>
      );
    };
    render(<RadiusFormComp />);
  });

  it('RADIUS Probe Interval should show error message with invalid inputs', async () => {
    const RadiusFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RadiusForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByLabelText, getByText, queryByText } = render(<RadiusFormComp />);

    fireEvent.change(getByLabelText('RADIUS Probe Interval'), { target: { value: null } });
    await waitFor(() => {
      expect(getByText('Please input Radius Probe Interval')).toBeVisible();
    });

    fireEvent.change(getByLabelText('RADIUS Probe Interval'), { target: { value: 2 } });
    await waitFor(() => {
      expect(getByText('Radius Probe Interval expected between 60 and 100 or 0')).toBeVisible();
    });

    fireEvent.change(getByLabelText('RADIUS Probe Interval'), { target: { value: 61 } });
    await waitFor(() => {
      expect(
        queryByText('Radius Probe Interval expected between 60 and 100 or 0')
      ).not.toBeInTheDocument();
    });
  });

  it('Add Radius Service modal should display error message when input value for Service Name is invalid', async () => {
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

  it('Add Radius Service modal should hide when click on cancel button', async () => {
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
    expect(getByText('Add RADIUS Service')).toBeVisible();
    fireEvent.click(getByRole('button', { name: /cancel/i }));

    await waitFor(() => {
      expect(getByText('Add RADIUS Service')).not.toBeVisible();
    });
  });

  it('Add Radius Service modal should hide when click on save button', async () => {
    const RadiusFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RadiusForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByRole, getByLabelText, queryByText, getByText } = render(<RadiusFormComp />);
    fireEvent.click(getByRole('button', { name: 'Add Radius Service' }));
    fireEvent.click(getByRole('button', { name: /Add RADIUS Server/i }));

    fireEvent.change(getByLabelText('Service Name'), { target: { value: 'Test' } });
    fireEvent.change(getByLabelText('IP'), { target: { value: '0.0.0.0' } });
    fireEvent.change(getByLabelText('Port'), { target: { value: 1812 } });
    fireEvent.change(getByLabelText('Shared Secret'), { target: { value: 'abc' } });
    fireEvent.click(getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(queryByText('Server Properties')).not.toBeInTheDocument();
    });

    fireEvent.click(getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(getByText('Add RADIUS Service')).not.toBeVisible();
    });
  });

  it('Radius Service should be removed when click on Remove button', async () => {
    const RadiusFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RadiusForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByRole } = render(<RadiusFormComp />);

    const listitem = getByRole('listitem', { name: 'serviceItem-mockService' });

    expect(listitem).toBeInTheDocument();
    fireEvent.click(within(listitem).getByRole('button', { name: /remove/i }));
    expect(listitem).not.toBeInTheDocument();
  });

  it('Edit Radius Service modal should hide when click on cancel button', async () => {
    const RadiusFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RadiusForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByRole, getByText } = render(<RadiusFormComp />);

    const listitem = getByRole('listitem', { name: 'serviceItem-mockService' });

    fireEvent.click(within(listitem).getByRole('button', { name: /editService/i }));
    expect(getByText('Edit RADIUS Service')).toBeVisible();
    fireEvent.click(getByRole('button', { name: /cancel/i }));
    await waitFor(() => {
      expect(getByText('Edit RADIUS Service')).not.toBeVisible();
    });
  });

  it('Edit Radius Service modal should hide when click on save buttons with multiple Services', async () => {
    const mockDetails = {
      ...mockProps.details,
      serviceRegionMap: {
        Ottawa: {
          model_type: 'RadiusServiceRegion',
          serverMap: {
            mockService: [
              {
                authPort: 1812,
                ipAddress: '192.168.0.1',
                secret: 'testing123',
                timeout: null,
              },
            ],
            mockService2: [
              {
                authPort: 1812,
                ipAddress: '192.168.0.1',
                secret: 'testing123',
                timeout: null,
              },
            ],
          },
          regionName: 'Ottawa',
        },
      },
    };

    const RadiusFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RadiusForm details={{ ...mockDetails }} form={form} />
        </Form>
      );
    };
    const { getByRole, getByText } = render(<RadiusFormComp />);

    const listitem = getByRole('listitem', { name: 'serviceItem-mockService' });

    fireEvent.click(within(listitem).getByRole('button', { name: /editService/i }));
    expect(getByText('Edit RADIUS Service')).toBeVisible();
    fireEvent.click(getByRole('button', { name: /save/i }));
    await waitFor(() => {
      expect(getByText('Edit RADIUS Service')).not.toBeVisible();
    });
  });

  it('Add Service Zone should show error message when Zone Name has invalid value', async () => {
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

  it('Add Service Zone modal should hide on cancel button', async () => {
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
    expect(getByText('Add Service Zone Configuration')).toBeVisible();

    fireEvent.click(getByRole('button', { name: /cancel/i }));
    await waitFor(() => {
      expect(getByText('Add Service Zone Configuration')).not.toBeVisible();
    });
  });

  it('Add Service Zone modal should hide on save button', async () => {
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

    fireEvent.change(getByLabelText('Zone Name'), { target: { value: 'abc' } });
    fireEvent.click(getByRole('button', { name: /save/i }));
    await waitFor(() => {
      expect(getByText('Add Service Zone Configuration')).not.toBeVisible();
    });
  });

  it('Edit Service Zone modal should show error message when input value is invalid', async () => {
    const RadiusFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RadiusForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByRole, getByText, getByLabelText } = render(<RadiusFormComp />);

    const listitem = getByRole('listitem', { name: 'serviceZoneItem-Ottawa' });

    fireEvent.click(within(listitem).getByRole('button', { name: 'editRadiusServiceZone' }));
    fireEvent.change(getByLabelText('Zone Name'), { target: { value: null } });
    fireEvent.click(getByRole('button', { name: /save/i }));
    await waitFor(() => {
      expect(getByText('Please enter service zone')).toBeVisible();
    });
  });

  it('Edit Service Zone configuration modal should hide when cancel is clicked', async () => {
    const RadiusFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RadiusForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByRole, getByText } = render(<RadiusFormComp />);

    const listitem = getByRole('listitem', { name: 'serviceZoneItem-Ottawa' });

    fireEvent.click(within(listitem).getByRole('button', { name: 'editRadiusServiceZone' }));
    await waitFor(() => {
      expect(getByText('Edit Service Zone Configuration', { exact: true })).toBeVisible();
    });
    fireEvent.click(getByRole('button', { name: /cancel/i }));
    await waitFor(() => {
      expect(getByText('Edit Service Zone Configuration')).not.toBeVisible();
    });
  });

  it('Edit Service Zone configuration modal should hide when save button is clicked', async () => {
    const RadiusFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RadiusForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByRole, getByText } = render(<RadiusFormComp />);

    const listitem = getByRole('listitem', { name: 'serviceZoneItem-Ottawa' });

    fireEvent.click(within(listitem).getByRole('button', { name: 'editRadiusServiceZone' }));
    await waitFor(() => {
      expect(getByText('Edit Service Zone Configuration', { exact: true })).toBeVisible();
    });
    fireEvent.click(getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(getByText('Edit Service Zone Configuration')).not.toBeVisible();
    });
  });

  it('Delete Service Zone button should remove Service Zone from list', async () => {
    const RadiusFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RadiusForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByRole, queryByText } = render(<RadiusFormComp />);

    const listitem = getByRole('listitem', { name: 'serviceZoneItem-Ottawa' });
    expect(queryByText('mockSubnet')).toBeVisible();

    expect(listitem).toBeInTheDocument();
    fireEvent.click(within(listitem).getByRole('button', { name: /deleteRadiusServiceZone/i }));

    await waitFor(() => {
      expect(queryByText('mockSubnet')).not.toBeInTheDocument();
    });
  });

  it('Add Subnet Configuration modal should hide when cancel button clicked', async () => {
    const RadiusFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RadiusForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByRole, getByText, getByLabelText } = render(<RadiusFormComp />);

    const listitem = getByRole('listitem', { name: 'serviceZoneItem-Ottawa' });
    fireEvent.click(within(listitem).getByRole('button', { name: /add subnet/i }));

    expect(getByText('Add Subnet Configuration')).toBeVisible();
    expect(getByLabelText('Zone Name').closest('input')).toBeDisabled();
    fireEvent.click(getByRole('button', { name: /cancel/i }));

    await waitFor(() => {
      expect(getByText('Add Subnet Configuration')).not.toBeVisible();
    });
  });

  it('Add Subnet Configuration modal should hide when save button clicked', async () => {
    const RadiusFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RadiusForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByRole, getByText, getByLabelText } = render(<RadiusFormComp />);

    const listitem = getByRole('listitem', { name: 'serviceZoneItem-Ottawa' });
    fireEvent.click(within(listitem).getByRole('button', { name: /add subnet/i }));

    expect(getByText('Add Subnet Configuration')).toBeVisible();
    fireEvent.change(getByLabelText('Subnet Name'), { target: { value: 'Test' } });
    fireEvent.change(getByLabelText('Subnet IP'), { target: { value: '1.1.1.1' } });
    fireEvent.change(getByLabelText('Subnet CIDR Mask'), { target: { value: 1 } });

    fireEvent.click(getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(getByText('Add Subnet Configuration')).not.toBeVisible();
    });
  });

  it('Edit Subnet Configuration modal should close when cancel button is clicked', async () => {
    const RadiusFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RadiusForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByRole, getByText } = render(<RadiusFormComp />);

    const item = getByRole('row', { name: 'mockSubnet 1.1.1.1 edit delete' });

    fireEvent.click(within(item).getByRole('button', { name: /editSubnet/i }));
    expect(getByText('Edit Subnet Configuration')).toBeVisible();
    fireEvent.click(getByRole('button', { name: /cancel/i }));

    await waitFor(() => {
      expect(getByText('Edit Subnet Configuration')).not.toBeVisible();
    });
  });

  it('Edit Subnet Configuration modal should close when save button is clicked', async () => {
    const RadiusFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RadiusForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByRole, getByText } = render(<RadiusFormComp />);

    const item = getByRole('row', { name: 'mockSubnet 1.1.1.1 edit delete' });

    fireEvent.click(within(item).getByRole('button', { name: /editSubnet/i }));
    fireEvent.click(getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(getByText('Edit Subnet Configuration')).not.toBeVisible();
    });
  });

  it('click on delete button should remove subnet from management subnet list', async () => {
    const RadiusFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RadiusForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByRole, queryByText } = render(<RadiusFormComp />);

    expect(queryByText('mockSubnet')).toBeVisible();

    const item = getByRole('row', { name: 'mockSubnet 1.1.1.1 edit delete' });

    fireEvent.click(within(item).getByRole('button', { name: /deleteSubnet/i }));

    expect(queryByText('mockSubnet')).not.toBeInTheDocument();
  });
});
