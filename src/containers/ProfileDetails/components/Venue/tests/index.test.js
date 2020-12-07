import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, waitFor, waitForElement } from '@testing-library/react';
import { Form } from 'antd';
import { render } from 'tests/utils';

import VenueForm from '..';

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
    model_type: 'PasspointVenueProfile',
    profileType: 'passpoint_venue',
    venueNameSet: [
      {
        asDuple: 'fra:Exemple de lieu',
        defaultDupleSeparator: ':',
        dupleName: 'Exemple de lieu',
        locale: 'fra',
        model_type: 'PasspointVenueName',
        venueUrl: 'http://www.example.com/info-fra',
      },
    ],
    venueTypeAssignment: {
      model_type: 'ProfileVenueTypeAssignment',
      venueDescription: null,
      venueGroupId: 2,
      venueTypeId: 8,
    },
  },
};

const DOWN_ARROW = { keyCode: 40 };

describe('<VenueForm />', () => {
  afterEach(cleanup);

  it('should still work when venueNameSet is null', async () => {
    const VenueFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <VenueForm details={{ ...mockProps.details, venueNameSet: null }} form={form} />
        </Form>
      );
    };
    render(<VenueFormComp />);
  });

  it('should still work with no venueNameSet', async () => {
    const VenueFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <VenueForm details={{ ...mockProps.details, venueNameSet: [] }} form={form} />
        </Form>
      );
    };
    render(<VenueFormComp />);
  });

  it('should still work when venueTypeAssignment is null', async () => {
    const VenueFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <VenueForm details={{ ...mockProps.details, venueTypeAssignment: null }} form={form} />
        </Form>
      );
    };
    render(<VenueFormComp />);
  });

  it('should still work with no venueTypeAssignment', async () => {
    const VenueFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <VenueForm details={{ ...mockProps.details, venueTypeAssignment: {} }} form={form} />
        </Form>
      );
    };
    render(<VenueFormComp />);
  });

  it('Add Name Modal should display error message when fields are empty', async () => {
    const VenueFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <VenueForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByText, getByRole } = render(<VenueFormComp />);
    fireEvent.click(getByRole('button', { name: 'Add Name' }));
    expect(getByText('Add Name')).toBeVisible();

    fireEvent.click(getByRole('button', { name: /save/i }));
    await waitFor(() => {
      expect(getByText('Name field cannot be empty')).toBeVisible();
      expect(getByText('Locale field cannot be empty')).toBeVisible();
      expect(getByText('Please enter URL in the format http://... or https://...')).toBeVisible();
    });
  });

  it('Add Modal should display error message when invalid URL is inputed', async () => {
    const VenueFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <VenueForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByText, getByRole, getByLabelText } = render(<VenueFormComp />);
    fireEvent.click(getByRole('button', { name: 'Add Name' }));
    expect(getByText('Add Name')).toBeVisible();

    fireEvent.change(getByLabelText('Url'), { target: { value: 'ww0' } });
    await waitFor(() => {
      expect(getByText('Please enter URL in the format http://... or https://...')).toBeVisible();
    });
  });

  it('Add Modal should hide when cancel button is clicked', async () => {
    const VenueFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <VenueForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByText, getByRole, getByLabelText } = render(<VenueFormComp />);
    fireEvent.click(getByRole('button', { name: 'Add Name' }));
    expect(getByText('Add Name')).toBeVisible();

    fireEvent.click(getByRole('button', { name: /cancel/i }));
    await waitFor(() => {
      expect(getByLabelText('Name')).not.toBeVisible();
      expect(getByLabelText('Locale')).not.toBeVisible();
      expect(getByLabelText('Url')).not.toBeVisible();
    });
  });

  it('Add Model should hide when save button is clicked successfully', async () => {
    const VenueFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <VenueForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByText, getByRole, getByLabelText } = render(<VenueFormComp />);
    fireEvent.click(getByRole('button', { name: 'Add Name' }));
    expect(getByText('Add Name')).toBeVisible();

    const selectedLocale = getByLabelText('Locale');

    fireEvent.keyDown(selectedLocale, DOWN_ARROW);
    await waitForElement(() => getByText('English'));
    fireEvent.click(getByText('English'));

    fireEvent.change(getByLabelText('Name'), { target: { value: 'TestName' } });
    fireEvent.change(getByLabelText('Url'), { target: { value: 'http://www.testname.com' } });

    fireEvent.click(getByRole('button', { name: /save/i }));
    await waitFor(() => {
      expect(getByText('TestName')).toBeVisible();
      expect(getByText('http://www.testname.com')).toBeVisible();
    });
  });

  it('Add Model url should be saved in lowercase', async () => {
    const VenueFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <VenueForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByText, getByRole, getByLabelText } = render(<VenueFormComp />);
    fireEvent.click(getByRole('button', { name: 'Add Name' }));
    expect(getByText('Add Name')).toBeVisible();

    const selectedLocale = getByLabelText('Locale');

    fireEvent.keyDown(selectedLocale, DOWN_ARROW);
    await waitForElement(() => getByText('English'));
    fireEvent.click(getByText('English'));

    fireEvent.change(getByLabelText('Name'), { target: { value: 'TestName' } });
    fireEvent.change(getByLabelText('Url'), { target: { value: 'hTtP://wWw.TeSTnAmE.cOm' } });

    fireEvent.click(getByRole('button', { name: /save/i }));
    await waitFor(() => {
      expect(getByText('http://www.testname.com')).toBeVisible();
    });
  });

  it('Venue Name should be removed when remove button is clicked', async () => {
    const VenueFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <VenueForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { queryByText, getByLabelText } = render(<VenueFormComp />);
    fireEvent.click(getByLabelText('delete'));

    await waitFor(() => {
      expect(queryByText('Exemple de lieu')).not.toBeInTheDocument();
      expect(queryByText('http://www.example.com/info-fra')).not.toBeInTheDocument();
    });
  });

  it('changing venue group should show new type dropdown reset to value 0, for assembly', async () => {
    const VenueFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <VenueForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByText, queryByText, container } = render(<VenueFormComp />);
    const selectGroup = container.querySelector('[data-testid=venueGroup] > .ant-select-selector');
    fireEvent.mouseDown(selectGroup);
    fireEvent.keyDown(selectGroup, DOWN_ARROW);

    await waitForElement(() => getByText('Assembly'));
    fireEvent.click(getByText('Assembly'));
    await waitFor(() => {
      expect(queryByText('Unspecified Assembly')).toBeVisible();
    });
  });

  it('changing venue group should show new type dropdown and reset value 0, for business', async () => {
    const VenueFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <VenueForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByText, queryByText, container } = render(<VenueFormComp />);
    const selectGroup = container.querySelector('[data-testid=venueGroup] > .ant-select-selector');
    fireEvent.mouseDown(selectGroup);
    fireEvent.keyDown(selectGroup, DOWN_ARROW);

    await waitForElement(() => getByText('Assembly'));
    fireEvent.click(getByText('Assembly'));
    fireEvent.mouseDown(selectGroup);
    fireEvent.keyDown(selectGroup, DOWN_ARROW);
    await waitForElement(() => getByText('Business'));
    fireEvent.click(getByText('Business'));
    await waitFor(() => {
      expect(queryByText('Unspecified Business')).toBeVisible();
    });
  });

  it('changing venue group should show new type dropdown reset value 0, for educational', async () => {
    const VenueFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <VenueForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByText, queryByText, container } = render(<VenueFormComp />);
    const selectGroup = container.querySelector('[data-testid=venueGroup] > .ant-select-selector');
    fireEvent.mouseDown(selectGroup);
    fireEvent.keyDown(selectGroup, DOWN_ARROW);

    await waitForElement(() => getByText('Educational'));
    fireEvent.click(getByText('Educational'));
    await waitFor(() => {
      expect(queryByText('Unspecified Educational')).toBeVisible();
    });
  });

  it('changing venue group should show new type dropdown and reset to value 0, for Factory and Industrial', async () => {
    const VenueFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <VenueForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByText, queryByText, container } = render(<VenueFormComp />);
    const selectGroup = container.querySelector('[data-testid=venueGroup] > .ant-select-selector');
    fireEvent.mouseDown(selectGroup);
    fireEvent.keyDown(selectGroup, DOWN_ARROW);

    await waitForElement(() => getByText('Factory and Industrial'));
    fireEvent.click(getByText('Factory and Industrial'));
    await waitFor(() => {
      expect(queryByText('Unspecified Factory and Industrial')).toBeVisible();
    });
  });

  it('changing venue group should show new type dropdown and reset to value 0, for Institutional', async () => {
    const VenueFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <VenueForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByText, queryByText, container } = render(<VenueFormComp />);
    const selectGroup = container.querySelector('[data-testid=venueGroup] > .ant-select-selector');
    fireEvent.mouseDown(selectGroup);
    fireEvent.keyDown(selectGroup, DOWN_ARROW);

    await waitForElement(() => getByText('Institutional'));
    fireEvent.click(getByText('Institutional'));
    await waitFor(() => {
      expect(queryByText('Unspecified Institutional')).toBeVisible();
    });
  });

  it('changing venue group should show new type dropdown and reset to value 0, for Mercantile', async () => {
    const VenueFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <VenueForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByText, queryByText, container } = render(<VenueFormComp />);
    const selectGroup = container.querySelector('[data-testid=venueGroup] > .ant-select-selector');
    fireEvent.mouseDown(selectGroup);
    fireEvent.keyDown(selectGroup, DOWN_ARROW);

    await waitForElement(() => getByText('Mercantile'));
    fireEvent.click(getByText('Mercantile'));
    await waitFor(() => {
      expect(queryByText('Unspecified Mercantile')).toBeVisible();
    });
  });

  it('changing venue group should show new type dropdown and reset to value 0, for Residential', async () => {
    const VenueFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <VenueForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByText, queryByText, container } = render(<VenueFormComp />);
    const selectGroup = container.querySelector('[data-testid=venueGroup] > .ant-select-selector');
    fireEvent.mouseDown(selectGroup);
    fireEvent.keyDown(selectGroup, DOWN_ARROW);

    await waitForElement(() => getByText('Residential'));
    fireEvent.click(getByText('Residential'));
    await waitFor(() => {
      expect(queryByText('Unspecified Residential')).toBeVisible();
    });
  });

  it('changing venue group should show new type dropdown and reset to value 0, for Storage', async () => {
    const VenueFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <VenueForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByText, queryByText, container } = render(<VenueFormComp />);
    const selectGroup = container.querySelector('[data-testid=venueGroup] > .ant-select-selector');
    fireEvent.mouseDown(selectGroup);
    fireEvent.keyDown(selectGroup, DOWN_ARROW);

    await waitForElement(() => getByText('Storage'));
    fireEvent.click(getByText('Storage'));
    await waitFor(() => {
      expect(queryByText('Unspecified Storage')).toBeVisible();
    });
  });

  it('changing venue group should show new type dropdown and reset to value 0, for Utility and Miscellaneous', async () => {
    const VenueFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <VenueForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByText, queryByText, container } = render(<VenueFormComp />);
    const selectGroup = container.querySelector('[data-testid=venueGroup] > .ant-select-selector');
    fireEvent.mouseDown(selectGroup);
    fireEvent.keyDown(selectGroup, DOWN_ARROW);

    await waitForElement(() => getByText('Utility and Miscellaneous'));
    fireEvent.click(getByText('Utility and Miscellaneous'));
    await waitFor(() => {
      expect(queryByText('Unspecified Utility and Miscellaneous')).toBeVisible();
    });
  });

  it('changing venue group should show new type dropdown and reset to value 0, for Vehicular', async () => {
    const VenueFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <VenueForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByText, queryByText, container } = render(<VenueFormComp />);
    const selectGroup = container.querySelector('[data-testid=venueGroup] > .ant-select-selector');
    fireEvent.mouseDown(selectGroup);
    fireEvent.keyDown(selectGroup, DOWN_ARROW);

    await waitForElement(() => getByText('Vehicular'));
    fireEvent.click(getByText('Vehicular'));
    await waitFor(() => {
      expect(queryByText('Unspecified Vehicular')).toBeVisible();
    });
  });

  it('changing venue group should show new type dropdown and reset to value 0, for Outdoor', async () => {
    const VenueFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <VenueForm {...mockProps} form={form} />
        </Form>
      );
    };
    const { getByText, queryByText, container } = render(<VenueFormComp />);
    const selectGroup = container.querySelector('[data-testid=venueGroup] > .ant-select-selector');
    fireEvent.mouseDown(selectGroup);
    fireEvent.keyDown(selectGroup, DOWN_ARROW);

    await waitForElement(() => getByText('Outdoor'));
    fireEvent.click(getByText('Outdoor'));
    await waitFor(() => {
      expect(queryByText('Unspecified Outdoor')).toBeVisible();
    });
  });
});
