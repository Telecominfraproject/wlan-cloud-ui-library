import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, waitFor, within, waitForElement } from '@testing-library/react';

import { render, DOWN_ARROW } from 'tests/utils';
import Firmware from '..';
import { mockProps } from './constants';

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

describe('<Firmware />', () => {
  it('Add Model Target Version button press should show Add Model Target Version modal', async () => {
    const { getByRole, getByText } = render(<Firmware {...mockProps} />);

    fireEvent.click(getByRole('button', { name: /add Model Target Version/i }));

    expect(getByText('Add Model Target Version', { selector: 'div' })).toBeVisible();
  });

  it('Edit Model Target Version button press should show Edit Model Target Version modal', async () => {
    const { getByRole, getByText } = render(<Firmware {...mockProps} />);

    fireEvent.click(
      getByRole('button', { name: `edit-track-${mockProps.firmwareData[0].modelId}` })
    );
    expect(getByText('Edit Model Target Version')).toBeVisible();
  });

  it('Delete Model Target Version button press should show Delete Model Target Version modal', async () => {
    const { getByRole, getByText } = render(<Firmware {...mockProps} />);
    fireEvent.click(
      getByRole('button', { name: `delete-track-${mockProps.firmwareData[0].modelId}` })
    );
    const paragraph = getByText(/Are you sure you want to delete the model target version:/i);

    expect(paragraph).toBeVisible();
    expect(within(paragraph).getByText(mockProps.trackAssignmentData[0].modelId)).toBeVisible();
  });

  it('cancel button click should hide Add Model Target Version modal', async () => {
    const { getByRole, getByText, queryByText } = render(<Firmware {...mockProps} />);

    fireEvent.click(getByRole('button', { name: /add Model Target Version/i }));

    expect(getByText('Add Model Target Version', { selector: 'div' })).toBeVisible();

    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(queryByText('Add Model Target Version', { selector: 'div' })).not.toBeInTheDocument();
    });
  });

  it('cancel button click should hide Edit Model Target Version Modal', async () => {
    const { getByRole, getByText, queryByText } = render(<Firmware {...mockProps} />);

    fireEvent.click(
      getByRole('button', { name: `edit-track-${mockProps.firmwareData[0].modelId}` })
    );

    expect(getByText('Edit Model Target Version')).toBeVisible();
    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(queryByText('Edit Model Target Version')).not.toBeInTheDocument();
    });
  });

  it('cancel button click should hide Delete Model Target Version Modal', async () => {
    const { getByRole, getByText, queryByText } = render(<Firmware {...mockProps} />);
    fireEvent.click(
      getByRole('button', { name: `delete-track-${mockProps.firmwareData[0].modelId}` })
    );
    const paragraph = getByText(/Are you sure you want to delete the model target version:/i);
    expect(paragraph).toBeVisible();
    expect(within(paragraph).getByText(mockProps.trackAssignmentData[0].modelId)).toBeVisible();

    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(
        queryByText(/Are you sure you want to delete the model target version:/i)
      ).not.toBeInTheDocument();
    });
  });

  it('onCreateTrackAssignment should be called on Add Model Target Version Modal when firmware is complete', async () => {
    const submitSpy = jest.fn();
    const { getByRole, getByText, getAllByText, getByLabelText } = render(
      <Firmware {...mockProps} onCreateTrackAssignment={submitSpy} />
    );
    fireEvent.click(getByRole('button', { name: /add Model Target Version/i }));

    expect(getByText('Add Model Target Version', { selector: 'div' })).toBeVisible();

    const model = getByLabelText('Model ID');
    fireEvent.keyDown(model, DOWN_ARROW);
    await waitForElement(() => getAllByText(mockProps.firmwareData[2].modelId)[2]);
    fireEvent.click(getAllByText(mockProps.firmwareData[2].modelId)[2]);

    const firmware = getByLabelText('Firmware Version');
    fireEvent.keyDown(firmware, DOWN_ARROW);
    await waitForElement(() => getAllByText(mockProps.firmwareVersionData[0].versionName)[2]);
    fireEvent.click(getAllByText(mockProps.firmwareVersionData[0].versionName)[2]);

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('onUpdateTrackAssignment should be called on Edit Model Target Version Modal when form is complete', async () => {
    const submitSpy = jest.fn();
    const { getByRole } = render(<Firmware {...mockProps} onUpdateTrackAssignment={submitSpy} />);
    fireEvent.click(
      getByRole('button', { name: `edit-track-${mockProps.firmwareData[0].modelId}` })
    );
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('Add Firmware button press should show Add Firmware Version modal', async () => {
    const { getByRole, getByText } = render(<Firmware {...mockProps} />);

    fireEvent.click(getByRole('button', { name: /add version/i }));

    expect(getByText('Add Firmware Version')).toBeVisible();
  });

  it('Edit Firmware Version button press should show Edit Firmware Version modal', async () => {
    const { getByRole, getByText } = render(<Firmware {...mockProps} />);

    fireEvent.click(
      getByRole('button', { name: `edit-firmware-${mockProps.firmwareData[2].modelId}` })
    );

    expect(getByText('Edit Firmware Version')).toBeVisible();
  });

  it('Delete Firmware Version button press should show Delete Firmware Version modal', async () => {
    const { getByRole, getByText } = render(<Firmware {...mockProps} />);
    fireEvent.click(
      getByRole('button', { name: `delete-firmware-${mockProps.firmwareData[2].modelId}` })
    );
    const paragraph = getByText(/Are you sure you want to delete the version:/i);
    expect(paragraph).toBeVisible();
    expect(within(paragraph).getByText(mockProps.firmwareData[2].versionName)).toBeVisible();
  });

  it('cancel button click should hide Add Firmware Vesion modal', async () => {
    const { getByRole, getByText, queryByText } = render(<Firmware {...mockProps} />);

    fireEvent.click(getByRole('button', { name: /add version/i }));

    expect(getByText('Add Firmware Version')).toBeVisible();

    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(queryByText('Add Firmware Version')).not.toBeInTheDocument();
    });
  });

  it('cancel button click should hide Edit Firmware Version Modal', async () => {
    const { getByRole, getByText, queryByText } = render(<Firmware {...mockProps} />);

    fireEvent.click(
      getByRole('button', { name: `edit-firmware-${mockProps.firmwareData[2].modelId}` })
    );

    expect(getByText('Edit Firmware Version')).toBeVisible();
    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(queryByText('Edit Firmware Version')).not.toBeInTheDocument();
    });
  });

  it('cancel button click should hide Delete Firmware Version Modal', async () => {
    const { getByRole, getByText, queryByText } = render(<Firmware {...mockProps} />);
    fireEvent.click(
      getByRole('button', { name: `delete-firmware-${mockProps.firmwareData[2].modelId}` })
    );
    const paragraph = getByText(/Are you sure you want to delete the version:/i);
    expect(paragraph).toBeVisible();
    expect(within(paragraph).getByText(mockProps.firmwareData[2].versionName)).toBeVisible();

    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(queryByText(/Are you sure you want to delete the version:/i)).not.toBeInTheDocument();
    });
  });

  it('onCreateFirmware should be called when form is complete', async () => {
    const submitSpy = jest.fn();
    const { getByText, getByRole, getByLabelText, getByTestId } = render(
      <Firmware {...mockProps} onCreateFirmware={submitSpy} />
    );
    fireEvent.click(getByRole('button', { name: /add version/i }));
    expect(getByText('Add Firmware Version')).toBeVisible();

    fireEvent.change(getByLabelText('Model ID'), { target: { value: 'test id' } });
    fireEvent.change(getByLabelText('Version Name'), { target: { value: 'test name' } });
    fireEvent.change(getByLabelText('Firmware URL'), { target: { value: 'www.test.com' } });
    fireEvent.mouseDown(getByTestId('datePicker'));
    fireEvent.click(getByText('Now'));
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('onUpdateFirmware should be saved with existing firmware data', async () => {
    const submitSpy = jest.fn();
    const { getByText, getByRole, getByTestId } = render(
      <Firmware {...mockProps} onUpdateFirmware={submitSpy} />
    );

    fireEvent.click(
      getByRole('button', { name: `edit-firmware-${mockProps.firmwareData[0].modelId}` })
    );
    expect(getByText('Edit Firmware Version')).toBeVisible();
    fireEvent.mouseDown(getByTestId('datePicker'));
    fireEvent.click(getByText('Now'));
    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('onDeleteFirmware should be called when modal is submitted', async () => {
    const submitSpy = jest.fn();
    const { getByRole } = render(<Firmware {...mockProps} onDeleteFirmware={submitSpy} />);
    fireEvent.click(
      getByRole('button', { name: `delete-firmware-${mockProps.firmwareData[2].modelId}` })
    );
    expect(getByRole('button', { name: 'Delete' }));
    fireEvent.click(getByRole('button', { name: 'Delete' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('onDeleteTrackAssignment should be called when modal is submitted', async () => {
    const submitSpy = jest.fn();
    const { getByRole } = render(<Firmware {...mockProps} onDeleteTrackAssignment={submitSpy} />);
    fireEvent.click(
      getByRole('button', { name: `delete-track-${mockProps.firmwareData[0].modelId}` })
    );
    expect(getByRole('button', { name: 'Delete' }));
    fireEvent.click(getByRole('button', { name: 'Delete' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('trackAssignmentError should show error alert', async () => {
    const { getByTestId } = render(<Firmware {...mockProps} trackAssignmentError />);

    await waitFor(() => {
      expect(getByTestId('trackAssignmentError')).toBeInTheDocument();
    });
  });

  it('firmwareError should show error alert', async () => {
    const { getByTestId } = render(<Firmware {...mockProps} firmwareError />);

    await waitFor(() => {
      expect(getByTestId('firmwareError')).toBeInTheDocument();
    });
  });
});
