import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, waitFor } from '@testing-library/react';
import { Form } from 'antd';
import { render } from 'tests/utils';

import { mockRf } from '../../../tests/constants';

import RFForm from '..';

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

describe('<RFForm />', () => {
  // test default values of form
  it('Form should load with the initial values if details object is empty', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm form={form} />
        </Form>
      );
    };

    const { queryByText } = render(<RFFormComp />);

    await waitFor(() => {
      expect(queryByText('Enter Maximum Devices for is2dot4GHz')).not.toBeInTheDocument();
      expect(queryByText('Enter Maximum Devices for is5GHz')).not.toBeInTheDocument();
      expect(queryByText('Enter Maximum Devices for is5GHzU')).not.toBeInTheDocument();
      expect(queryByText('Enter Maximum Devices for is5GHzL')).not.toBeInTheDocument();

      expect(queryByText('Enter RTS/CTS threshold for is2dot4GHz')).not.toBeInTheDocument();
      expect(queryByText('Enter RTS/CTS threshold for is5GHz')).not.toBeInTheDocument();
      expect(queryByText('Enter RTS/CTS threshold for is5GHzU')).not.toBeInTheDocument();
      expect(queryByText('Enter RTS/CTS threshold for is5GHzL')).not.toBeInTheDocument();

      expect(queryByText('Enter Rx Cell Size for is2dot4GHz')).not.toBeInTheDocument();
      expect(queryByText('Enter Rx Cell Size for is5GHz')).not.toBeInTheDocument();
      expect(queryByText('Enter Rx Cell Size for is5GHzU')).not.toBeInTheDocument();
      expect(queryByText('Enter Rx Cell Size for is5GHzL')).not.toBeInTheDocument();

      expect(queryByText('Enter Probe Response Threshold for is2dot4GHz')).not.toBeInTheDocument();
      expect(queryByText('Enter Probe Response Threshold for is5GHz')).not.toBeInTheDocument();
      expect(queryByText('Enter Probe Response Threshold for is5GHzU')).not.toBeInTheDocument();
      expect(queryByText('Enter Probe Response Threshold for is5GHzL')).not.toBeInTheDocument();

      expect(
        queryByText('Enter Client Disconnect Threshold for is2dot4GHz')
      ).not.toBeInTheDocument();
      expect(queryByText('Enter Client Disconnect Threshold for is5GHz')).not.toBeInTheDocument();
      expect(queryByText('Enter Client Disconnect Threshold for is5GHzU')).not.toBeInTheDocument();
      expect(queryByText('Enter Client Disconnect Threshold for is5GHzL')).not.toBeInTheDocument();

      expect(queryByText('Enter EIRP Tx Power for is2dot4GHz')).not.toBeInTheDocument();
      expect(queryByText('Enter EIRP Tx Power for is5GHz')).not.toBeInTheDocument();
      expect(queryByText('Enter EIRP Tx Power for is5GHzU')).not.toBeInTheDocument();
      expect(queryByText('Enter EIRP Tx Power for is5GHzL')).not.toBeInTheDocument();

      expect(queryByText('Enter Scan Frequency for is2dot4GHz')).not.toBeInTheDocument();
      expect(queryByText('Enter Scan Frequency for is5GHz')).not.toBeInTheDocument();
      expect(queryByText('Enter Scan Frequency for is5GHzU')).not.toBeInTheDocument();
      expect(queryByText('Enter Scan Frequency for is5GHzL')).not.toBeInTheDocument();

      expect(queryByText('Enter Scan Duration for is2dot4GHz')).not.toBeInTheDocument();
      expect(queryByText('Enter Scan Duration for is5GHz')).not.toBeInTheDocument();
      expect(queryByText('Enter Scan Duration for is5GHzU')).not.toBeInTheDocument();
      expect(queryByText('Enter Scan Duration for is5GHzL')).not.toBeInTheDocument();

      expect(queryByText('Enter Min Load for is2dot4GHz')).not.toBeInTheDocument();
      expect(queryByText('Enter Min Load for is5GHz')).not.toBeInTheDocument();
      expect(queryByText('Enter Min Load for is5GHzU')).not.toBeInTheDocument();
      expect(queryByText('Enter Min Load for is5GHzL')).not.toBeInTheDocument();

      expect(queryByText('Enter SNR for is2dot4GHz')).not.toBeInTheDocument();
      expect(queryByText('Enter SNR for is5GHz')).not.toBeInTheDocument();
      expect(queryByText('Enter SNR for is5GHzU')).not.toBeInTheDocument();
      expect(queryByText('Enter SNR for is5GHzL')).not.toBeInTheDocument();

      expect(queryByText('Enter Noise Floor for is2dot4GHz')).not.toBeInTheDocument();
      expect(queryByText('Enter Noise Floor for is5GHz')).not.toBeInTheDocument();
      expect(queryByText('Enter Noise Floor for is5GHzU')).not.toBeInTheDocument();
      expect(queryByText('Enter Noise Floor for is5GHzL')).not.toBeInTheDocument();

      expect(queryByText('Enter Noise Floor Time for is2dot4GHz')).not.toBeInTheDocument();
      expect(queryByText('Enter Noise Floor Time for is5GHz')).not.toBeInTheDocument();
      expect(queryByText('Enter Noise Floor Time for is5GHzU')).not.toBeInTheDocument();
      expect(queryByText('Enter Noise Floor Time for is5GHzL')).not.toBeInTheDocument();

      expect(queryByText('Enter Non WIFI for is2dot4GHz')).not.toBeInTheDocument();
      expect(queryByText('Enter Non WIFI for is5GHz')).not.toBeInTheDocument();
      expect(queryByText('Enter Non WIFI for is5GHzU')).not.toBeInTheDocument();
      expect(queryByText('Enter Non WIFI for is5GHzL')).not.toBeInTheDocument();

      expect(queryByText('Enter Non WIFI Time for is2dot4GHz')).not.toBeInTheDocument();
      expect(queryByText('Enter Non WIFI Time for is5GHz')).not.toBeInTheDocument();
      expect(queryByText('Enter Non WIFI Time for is5GHzU')).not.toBeInTheDocument();
      expect(queryByText('Enter Non WIFI Time for is5GHzL')).not.toBeInTheDocument();

      expect(queryByText('0 - 100')).not.toBeInTheDocument();
      expect(queryByText('0 - 65535 (Bytes)')).not.toBeInTheDocument();
      expect(queryByText('-100 - -40 dBm')).not.toBeInTheDocument();
      expect(queryByText('0 - 100 dBm')).not.toBeInTheDocument();
      expect(queryByText('0 - 100 sec')).not.toBeInTheDocument();
      expect(queryByText('0 - 100 ms')).not.toBeInTheDocument();
      expect(queryByText('-90 - -50 dBm')).not.toBeInTheDocument();
      expect(queryByText('0 - 512 APs')).not.toBeInTheDocument();
      expect(queryByText('0 - 100%')).not.toBeInTheDocument();
      expect(queryByText('-90 - -10 dB')).not.toBeInTheDocument();
      expect(queryByText('120 - 600 seconds')).not.toBeInTheDocument();
      expect(queryByText('0 - 500 sec')).not.toBeInTheDocument();
    });
  });

  // test Maximum Devices invalid inputs
  it('error if the Maximum Devices exceeds 100 for the is2dot4GHz setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Maximum Devices for is2dot4GHz'), {
      target: { value: -1 },
    });

    await waitFor(() => {
      expect(getByText('0 - 100')).toBeVisible();
    });
  });

  it('error if the Maximum Devices exceeds 100 for the is5GHz setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Maximum Devices for is5GHz'), {
      target: { value: -1 },
    });

    await waitFor(() => {
      expect(getByText('0 - 100')).toBeVisible();
    });
  });

  it('error if the Maximum Devices exceeds 100 for the is5GHzU setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Maximum Devices for is5GHzU'), {
      target: { value: -1 },
    });

    await waitFor(() => {
      expect(getByText('0 - 100')).toBeVisible();
    });
  });

  it('error if the Maximum Devices exceeds 100 for the is5GHzL setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Maximum Devices for is5GHzL'), {
      target: { value: -1 },
    });

    await waitFor(() => {
      expect(getByText('0 - 100')).toBeVisible();
    });
  });
  // test RTS/CTS threshold invalid inputs
  it('RTS/CTS threshold value must be positive for the is2dot4GHz setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter RTS/CTS threshold for is2dot4GHz'), {
      target: { value: -1 },
    });

    await waitFor(() => {
      expect(getByText('0 - 65535 (Bytes)')).toBeVisible();
    });
  });

  it('RTS/CTS threshold value must be positive for the is5GHz setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter RTS/CTS threshold for is5GHz'), {
      target: { value: -1 },
    });

    await waitFor(() => {
      expect(getByText('0 - 65535 (Bytes)')).toBeVisible();
    });
  });

  it('RTS/CTS threshold value must be positive for the is5GHzU setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter RTS/CTS threshold for is5GHzU'), {
      target: { value: -1 },
    });

    await waitFor(() => {
      expect(getByText('0 - 65535 (Bytes)')).toBeVisible();
    });
  });

  it('RTS/CTS threshold value must be positive for the is5GHzL setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter RTS/CTS threshold for is5GHzL'), {
      target: { value: -1 },
    });

    await waitFor(() => {
      expect(getByText('0 - 65535 (Bytes)')).toBeVisible();
    });
  });
  // test Rx Cell Size invalid inputs
  it('error if the Rx Cell Size exceeds bounds for the is2dot4GHz setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Rx Cell Size for is2dot4GHz'), {
      target: { value: -101 },
    });

    await waitFor(() => {
      expect(getByText('-100 - 0 dBm')).toBeVisible();
    });
  });

  it('error if the Rx Cell Size exceeds bounds for the is5GHz setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Rx Cell Size for is5GHz'), {
      target: { value: -101 },
    });

    await waitFor(() => {
      expect(getByText('-100 - 0 dBm')).toBeVisible();
    });
  });

  it('error if the Rx Cell Size exceeds bounds for the is5GHzU setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Rx Cell Size for is5GHzU'), {
      target: { value: -101 },
    });

    await waitFor(() => {
      expect(getByText('-100 - 0 dBm')).toBeVisible();
    });
  });

  it('error if the Rx Cell Size exceeds bounds for the is5GHzL setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Rx Cell Size for is5GHzL'), {
      target: { value: -101 },
    });

    await waitFor(() => {
      expect(getByText('-100 - 0 dBm')).toBeVisible();
    });
  });

  // test Probe Response Threshold invalid inputs
  it('error if the Probe Response Threshold exceeds bounds for the is2dot4GHz setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Probe Response Threshold for is2dot4GHz'), {
      target: { value: -101 },
    });

    await waitFor(() => {
      expect(getByText('-100 - -40 dBm')).toBeVisible();
    });
  });

  it('error if the Probe Response Threshold exceeds bounds for the is5GHz setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Probe Response Threshold for is5GHz'), {
      target: { value: -101 },
    });

    await waitFor(() => {
      expect(getByText('-100 - -40 dBm')).toBeVisible();
    });
  });

  it('error if the Probe Response Threshold exceeds bounds for the is5GHzU setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Probe Response Threshold for is5GHzU'), {
      target: { value: -101 },
    });

    await waitFor(() => {
      expect(getByText('-100 - -40 dBm')).toBeVisible();
    });
  });

  it('error if the Probe Response Threshold exceeds bounds for the is5GHzL setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp {...mockRf} />);

    fireEvent.change(getByPlaceholderText('Enter Probe Response Threshold for is5GHzL'), {
      target: { value: -101 },
    });

    await waitFor(() => {
      expect(getByText('-100 - -40 dBm')).toBeVisible();
    });
  });
  // test Client Disconnect Threshold invalid inputs
  it('error if the Client Disconnect Threshold exceeds bounds for the is2dot4GHz setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Client Disconnect Threshold for is2dot4GHz'), {
      target: { value: -101 },
    });

    await waitFor(() => {
      expect(getByText('-100 - 0 dBm')).toBeVisible();
    });
  });

  it('error if the Client Disconnect Threshold exceeds bounds for the is5GHz setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Client Disconnect Threshold for is5GHz'), {
      target: { value: -101 },
    });

    await waitFor(() => {
      expect(getByText('-100 - 0 dBm')).toBeVisible();
    });
  });

  it('error if the Client Disconnect Threshold exceeds bounds for the is5GHzU setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Client Disconnect Threshold for is5GHzU'), {
      target: { value: -101 },
    });

    await waitFor(() => {
      expect(getByText('-100 - 0 dBm')).toBeVisible();
    });
  });

  it('error if the Client Disconnect Threshold exceeds bounds for the is5GHzL setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Client Disconnect Threshold for is5GHzL'), {
      target: { value: -101 },
    });

    await waitFor(() => {
      expect(getByText('-100 - 0 dBm')).toBeVisible();
    });
  });
  // test EIRP Tx Power invalid inputs
  it('error if the EIRP Tx Power exceeds bounds for the is2dot4GHz setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter EIRP Tx Power for is2dot4GHz'), {
      target: { value: -1 },
    });

    await waitFor(() => {
      expect(getByText('1 - 32 dBm')).toBeVisible();
    });
  });

  it('error if the EIRP Tx Power exceeds bounds for the is5GHz setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter EIRP Tx Power for is5GHz'), {
      target: { value: -1 },
    });

    await waitFor(() => {
      expect(getByText('1 - 32 dBm')).toBeVisible();
    });
  });

  it('error if the EIRP Tx Power exceeds bounds for the is5GHzU setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter EIRP Tx Power for is5GHzU'), {
      target: { value: -1 },
    });

    await waitFor(() => {
      expect(getByText('1 - 32 dBm')).toBeVisible();
    });
  });

  it('error if the EIRP Tx Power exceeds bounds for the is5GHzL setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter EIRP Tx Power for is5GHzL'), {
      target: { value: -1 },
    });

    await waitFor(() => {
      expect(getByText('1 - 32 dBm')).toBeVisible();
    });
  });
  // test Scan Frequency invalid inputs
  it('error if the Scan Frequency exceeds bounds for the is2dot4GHz setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Scan Frequency for is2dot4GHz'), {
      target: { value: -1 },
    });

    await waitFor(() => {
      expect(getByText('10 - 100 seconds')).toBeVisible();
    });
  });

  it('error if the Scan Frequency exceeds bounds for the is5GHz setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Scan Frequency for is5GHz'), {
      target: { value: -1 },
    });

    await waitFor(() => {
      expect(getByText('10 - 100 seconds')).toBeVisible();
    });
  });

  it('error if the Scan Frequency exceeds bounds for the is5GHzU setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Scan Frequency for is5GHzU'), {
      target: { value: -1 },
    });

    await waitFor(() => {
      expect(getByText('10 - 100 seconds')).toBeVisible();
    });
  });

  it('error if the Scan Frequency exceeds bounds for the is5GHzL setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Scan Frequency for is5GHzL'), {
      target: { value: -1 },
    });

    await waitFor(() => {
      expect(getByText('10 - 100 seconds')).toBeVisible();
    });
  });
  // test Scan Duration invalid inputs
  it('error if the Scan Duration exceeds bounds for the is2dot4GHz setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Scan Duration for is2dot4GHz'), {
      target: { value: -1 },
    });

    await waitFor(() => {
      expect(getByText('50 - 100 milliseconds')).toBeVisible();
    });
  });

  it('error if the Scan Duration exceeds bounds for the is5GHz setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Scan Duration for is5GHz'), {
      target: { value: -1 },
    });

    await waitFor(() => {
      expect(getByText('50 - 100 milliseconds')).toBeVisible();
    });
  });

  it('error if the Scan Duration exceeds bounds for the is5GHzU setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Scan Duration for is5GHzU'), {
      target: { value: -1 },
    });

    await waitFor(() => {
      expect(getByText('50 - 100 milliseconds')).toBeVisible();
    });
  });

  it('error if the Scan Duration exceeds bounds for the is5GHzL setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Scan Duration for is5GHzL'), {
      target: { value: -1 },
    });

    await waitFor(() => {
      expect(getByText('50 - 100 milliseconds')).toBeVisible();
    });
  });

  // test Min Load invalid inputs
  it('error if the Min Load exceeds bounds for the is2dot4GHz setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Min Load for is2dot4GHz'), {
      target: { value: -1 },
    });

    await waitFor(() => {
      expect(getByText('0 - 100%')).toBeVisible();
    });
  });

  it('error if the Min Load exceeds bounds for the is5GHz setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Min Load for is5GHz'), {
      target: { value: -1 },
    });

    await waitFor(() => {
      expect(getByText('0 - 100%')).toBeVisible();
    });
  });

  it('error if the Min Load exceeds bounds for the is5GHzU setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Min Load for is5GHzU'), {
      target: { value: -1 },
    });

    await waitFor(() => {
      expect(getByText('0 - 100%')).toBeVisible();
    });
  });

  it('error if the Min Load exceeds bounds for the is5GHzL setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Min Load for is5GHzL'), {
      target: { value: -1 },
    });

    await waitFor(() => {
      expect(getByText('0 - 100%')).toBeVisible();
    });
  });
  // test SNR invalid inputs
  it('error if the SNR exceeds bounds for the is2dot4GHz setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter SNR for is2dot4GHz'), {
      target: { value: -1 },
    });

    await waitFor(() => {
      expect(getByText('0 - 100%')).toBeVisible();
    });
  });

  it('error if the SNR exceeds bounds for the is5GHz setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter SNR for is5GHz'), {
      target: { value: -1 },
    });

    await waitFor(() => {
      expect(getByText('0 - 100%')).toBeVisible();
    });
  });

  it('error if the SNR exceeds bounds for the is5GHzU setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter SNR for is5GHzU'), {
      target: { value: -1 },
    });

    await waitFor(() => {
      expect(getByText('0 - 100%')).toBeVisible();
    });
  });

  it('error if the SNR exceeds bounds for the is5GHzL setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter SNR for is5GHzL'), {
      target: { value: -1 },
    });

    await waitFor(() => {
      expect(getByText('0 - 100%')).toBeVisible();
    });
  });

  // test Noise Floor invalid inputs
  it('error if the Noise Floor exceeds bounds for the is2dot4GHz setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Noise Floor for is2dot4GHz'), {
      target: { value: -91 },
    });

    await waitFor(() => {
      expect(getByText('-90 - -10 dB')).toBeVisible();
    });
  });

  it('error if the Noise Floor exceeds bounds for the is5GHz setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Noise Floor for is5GHz'), {
      target: { value: -91 },
    });

    await waitFor(() => {
      expect(getByText('-90 - -10 dB')).toBeVisible();
    });
  });

  it('error if the Noise Floor exceeds bounds for the is5GHzU setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Noise Floor for is5GHzU'), {
      target: { value: -91 },
    });

    await waitFor(() => {
      expect(getByText('-90 - -10 dB')).toBeVisible();
    });
  });

  it('error if the Noise Floor exceeds bounds for the is5GHzL setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Noise Floor for is5GHzL'), {
      target: { value: -91 },
    });

    await waitFor(() => {
      expect(getByText('-90 - -10 dB')).toBeVisible();
    });
  });
  // test Noise Floor Time invalid inputs
  it('error if the Noise Floor Time exceeds bounds for the is2dot4GHz setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Noise Floor Time for is2dot4GHz'), {
      target: { value: -121 },
    });

    await waitFor(() => {
      expect(getByText('120 - 600 seconds')).toBeVisible();
    });
  });

  it('error if the Noise Floor Time exceeds bounds for the is5GHz setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Noise Floor Time for is5GHz'), {
      target: { value: -121 },
    });

    await waitFor(() => {
      expect(getByText('120 - 600 seconds')).toBeVisible();
    });
  });

  it('error if the Noise Floor Time exceeds bounds for the is5GHzU setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Noise Floor Time for is5GHzU'), {
      target: { value: -121 },
    });

    await waitFor(() => {
      expect(getByText('120 - 600 seconds')).toBeVisible();
    });
  });

  it('error if the Noise Floor Time exceeds bounds for the is5GHzL setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Noise Floor Time for is5GHzL'), {
      target: { value: -121 },
    });

    await waitFor(() => {
      expect(getByText('120 - 600 seconds')).toBeVisible();
    });
  });
  // test Non WIFI invalid inputs
  it('error if the Non WIFI exceeds bounds for the is2dot4GHz setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Non WIFI for is2dot4GHz'), {
      target: { value: -1 },
    });

    await waitFor(() => {
      expect(getByText('0 - 100%')).toBeVisible();
    });
  });

  it('error if the Non WIFI exceeds bounds for the is5GHz setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Non WIFI for is5GHz'), {
      target: { value: -1 },
    });

    await waitFor(() => {
      expect(getByText('0 - 100%')).toBeVisible();
    });
  });

  it('error if the Non WIFI exceeds bounds for the is5GHzU setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Non WIFI for is5GHzU'), {
      target: { value: -1 },
    });

    await waitFor(() => {
      expect(getByText('0 - 100%')).toBeVisible();
    });
  });

  it('error if the Non WIFI exceeds bounds for the is5GHzL setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Non WIFI for is5GHzL'), {
      target: { value: -1 },
    });

    await waitFor(() => {
      expect(getByText('0 - 100%')).toBeVisible();
    });
  });
  // test Non WIFI Time invalid inputs
  it('error if the Non WIFI Time exceeds bounds for the is2dot4GHz setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Non WIFI Time for is2dot4GHz'), {
      target: { value: -1 },
    });

    await waitFor(() => {
      expect(getByText('0 - 500 seconds')).toBeVisible();
    });
  });

  it('error if the Non WIFI Time exceeds bounds for the is5GHz setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Non WIFI Time for is5GHz'), {
      target: { value: -1 },
    });

    await waitFor(() => {
      expect(getByText('0 - 500 seconds')).toBeVisible();
    });
  });

  it('error if the Non WIFI Time exceeds bounds for the is5GHzU setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Non WIFI Time for is5GHzU'), {
      target: { value: -1 },
    });

    await waitFor(() => {
      expect(getByText('0 - 500 seconds')).toBeVisible();
    });
  });

  it('error if the Non WIFI Time exceeds bounds for the is5GHzL setting', async () => {
    const RFFormComp = () => {
      const [form] = Form.useForm();
      return (
        <Form form={form}>
          <RFForm {...mockRf} form={form} />
        </Form>
      );
    };

    const { getByText, getByPlaceholderText } = render(<RFFormComp />);

    fireEvent.change(getByPlaceholderText('Enter Non WIFI Time for is5GHzL'), {
      target: { value: -1 },
    });

    await waitFor(() => {
      expect(getByText('0 - 500 seconds')).toBeVisible();
    });
  });
});
