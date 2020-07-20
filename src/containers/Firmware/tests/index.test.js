import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, waitFor, within } from '@testing-library/react';

import { render } from 'tests/utils';
import Firmware from '..';

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
  onCreateFirnware: () => {},
  onUpdateFirmware: () => {},
  onDeleteFirmware: () => {},
  onDeleteTrackAssignment: () => {},
  trackAssignmentLoading: false,
  firmwareLoading: false,
  firmwareTrackLoading: false,
  trackAssignmentError: {},
  firmwareError: {},
  firmwareData: [
    {
      id: '1',
      modelId: 'ap2220',
      versionName: 'ap2220-2020-06-25-ce03472',
      description: '',
      filename:
        'https://tip.jfrog.io/artifactory/tip-wlan-ap-firmware/ap2220/ap2220-2020-06-25-ce03472.tar.gz',
      commit: 'ce03472',
      releaseDate: '1595181071095',
      validationCode: 'c69370aa5b6622d91a0fba3a5441f31c',
      createdTimestamp: '1595181071100',
      lastModifiedTimestamp: '1595181071100',
      __typename: 'Firmware',
    },
  ],
  trackAssignmentData: [
    {
      modelId: 'ap2220',
      firmwareVersionRecordId: '1',
      trackRecordId: '1',
      lastModifiedTimestamp: '1595181071102',
      __typename: 'FirmwareTrackAssignment',
    },
  ],
};
const MISSING_MODEL = 'Please input your Model ID';
const MISSING_VERSION = 'Please input your Version Name';
const MISSING_URL = 'Please input your Firmware URL';
const MISSING_FIRMWARE = 'Please select your firmware version';

describe('<Firmware />', () => {
  afterEach(cleanup);

  it('Add Track Assignment button press should show Add Track Assignment modal', async () => {
    const { getByRole, getByText } = render(<Firmware {...mockProps} />);

    fireEvent.click(getByRole('button', { name: /add track assignment/i }));

    expect(getByText('Add Track Assignment', { selector: 'div' })).toBeVisible();
  });

  it('Edit Track Assignment button press should show Edit Track Assignment modal', async () => {
    const { getByRole, getByText } = render(<Firmware {...mockProps} />);

    fireEvent.click(getByRole('button', { name: /editAssignment/i }));

    expect(getByText('Edit Track Assignment')).toBeVisible();
  });

  it('Delete Track Assignment button press should show Delete Track Assignment modal', async () => {
    const { getByRole, getByText } = render(<Firmware {...mockProps} />);
    fireEvent.click(getByRole('button', { name: /deleteAssignment/i }));

    const paragraph = getByText('Are you sure you want to delete the track assignment:');
    expect(paragraph).toBeVisible();
    expect(within(paragraph).getByText(mockProps.trackAssignmentData[0].modelId)).toBeVisible();
  });

  it('cancel button click should hide Add Track Assignment modal', async () => {
    const { getByRole, getByText } = render(<Firmware {...mockProps} />);

    fireEvent.click(getByRole('button', { name: /add track assignment/i }));

    expect(getByText('Add Track Assignment', { selector: 'div' })).toBeVisible();

    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(getByText('Add Track Assignment', { selector: 'div' })).not.toBeVisible();
    });
  });

  it('cancel button click should hide Edit Track Assignment Modal', async () => {
    const { getByRole, getByText } = render(<Firmware {...mockProps} />);

    fireEvent.click(getByRole('button', { name: /editAssignment/i }));

    expect(getByText('Edit Track Assignment')).toBeVisible();
    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(getByText('Edit Track Assignment')).not.toBeVisible();
    });
  });

  it('cancel button click should hide Delete Track Assignment Modal', async () => {
    const { getByRole, getByText } = render(<Firmware {...mockProps} />);
    fireEvent.click(getByRole('button', { name: /deleteAssignment/i }));

    const paragraph = getByText('Are you sure you want to delete the track assignment:');
    expect(paragraph).toBeVisible();
    expect(within(paragraph).getByText(mockProps.trackAssignmentData[0].modelId)).toBeVisible();

    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(paragraph).not.toBeVisible();
    });
  });

  it('Add Firmware button press should show Add Firmware Version modal', async () => {
    const { getByRole, getByText } = render(<Firmware {...mockProps} />);

    fireEvent.click(getByRole('button', { name: /add version/i }));

    expect(getByText('Add Firmware Version')).toBeVisible();
  });

  it('Edit Firmware Version button press should show Edit Firmware Version modal', async () => {
    const { getByRole, getByText } = render(<Firmware {...mockProps} />);

    fireEvent.click(getByRole('button', { name: /editFirmware/i }));

    expect(getByText('Edit Firmware Version')).toBeVisible();
  });

  it('Delete Firmware Version button press should show Delete Firmware Version modal', async () => {
    const { getByRole, getByText } = render(<Firmware {...mockProps} />);
    fireEvent.click(getByRole('button', { name: /deleteFirmware/i }));

    const paragraph = getByText('Are you sure you want to delete the version:');
    expect(paragraph).toBeVisible();
    expect(within(paragraph).getByText(mockProps.firmwareData[0].versionName)).toBeVisible();
  });

  it('cancel button click should hide Add Firmware Vesion modal', async () => {
    const { getByRole, getByText } = render(<Firmware {...mockProps} />);

    fireEvent.click(getByRole('button', { name: /add version/i }));

    expect(getByText('Add Firmware Version')).toBeVisible();

    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(getByText('Add Firmware Version')).not.toBeVisible();
    });
  });

  it('cancel button click should hide Edit Firmware Version Modal', async () => {
    const { getByRole, getByText } = render(<Firmware {...mockProps} />);

    fireEvent.click(getByRole('button', { name: /editFirmware/i }));

    expect(getByText('Edit Firmware Version')).toBeVisible();
    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(getByText('Edit Firmware Version')).not.toBeVisible();
    });
  });

  it('cancel button click should hide Delete Firmware Version Modal', async () => {
    const { getByRole, getByText } = render(<Firmware {...mockProps} />);
    fireEvent.click(getByRole('button', { name: /deleteFirmware/i }));

    const paragraph = getByText('Are you sure you want to delete the version:');
    expect(paragraph).toBeVisible();
    expect(within(paragraph).getByText(mockProps.firmwareData[0].versionName)).toBeVisible();

    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(paragraph).not.toBeVisible();
    });
  });

  it('onCreateFirmware should not be called when form is invalid', async () => {
    const submitSpy = jest.fn();
    const { getByText, getByRole } = render(
      <Firmware {...mockProps} onCreateFirnware={submitSpy} />
    );
    fireEvent.click(getByRole('button', { name: /add version/i }));
    expect(getByText('Add Firmware Version')).toBeVisible();

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText(MISSING_MODEL)).toBeVisible();
      expect(getByText(MISSING_VERSION)).toBeVisible();
      expect(getByText(MISSING_URL)).toBeVisible();
      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

  it('onCreateUser should be called when form is complete', async () => {
    const submitSpy = jest.fn();
    const { getByText, getByRole, getByLabelText } = render(
      <Firmware {...mockProps} onCreateFirnware={submitSpy} />
    );
    fireEvent.click(getByRole('button', { name: /add version/i }));
    expect(getByText('Add Firmware Version')).toBeVisible();

    fireEvent.change(getByLabelText('Model ID'), { target: { value: 'test id' } });
    fireEvent.change(getByLabelText('Version Name'), { target: { value: 'test name' } });
    fireEvent.change(getByLabelText('Firmware URL'), { target: { value: 'www.test.com' } });

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

  it('onUpdateFirmware should not be called when form is invalid', async () => {
    const submitSpy = jest.fn();
    const { getByText, getByRole, getByLabelText } = render(
      <Firmware {...mockProps} onUpdateFirmware={submitSpy} />
    );

    fireEvent.click(getByRole('button', { name: /editFirmware/i }));

    expect(getByText('Edit Firmware Version')).toBeVisible();

    fireEvent.change(getByLabelText('Model ID'), { target: { value: '' } });
    fireEvent.change(getByLabelText('Version Name'), { target: { value: '' } });
    fireEvent.change(getByLabelText('Firmware URL'), { target: { value: '' } });

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(getByText(MISSING_MODEL)).toBeVisible();
      expect(getByText(MISSING_VERSION)).toBeVisible();
      expect(getByText(MISSING_URL)).toBeVisible();
      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

  it('onUpdateFirmware should be saved with existing firmware data', async () => {
    const submitSpy = jest.fn();
    const { getByText, getByRole } = render(
      <Firmware {...mockProps} onUpdateFirmware={submitSpy} />
    );

    fireEvent.click(getByRole('button', { name: /editFirmware/i }));

    expect(getByText('Edit Firmware Version')).toBeVisible();

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).not.toHaveBeenCalled();
    });
  });

  it('onDeleteFirmware should be called when modal is submitted', async () => {
    const submitSpy = jest.fn();
    const { getByRole } = render(<Firmware {...mockProps} onDeleteFirmware={submitSpy} />);
    fireEvent.click(getByRole('button', { name: /deleteFirmware/i }));
    expect(getByRole('button', { name: 'Delete' }));
    fireEvent.click(getByRole('button', { name: 'Delete' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('onDeleteTrackAssignment should be called when modal is submitted', async () => {
    const submitSpy = jest.fn();
    const { getByRole } = render(<Firmware {...mockProps} onDeleteTrackAssignment={submitSpy} />);
    fireEvent.click(getByRole('button', { name: /deleteAssignment/i }));
    expect(getByRole('button', { name: 'Delete' }));
    fireEvent.click(getByRole('button', { name: 'Delete' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('trackAssignmentLoading should show loading spinner', async () => {
    const { getByTestId } = render(<Firmware {...mockProps} trackAssignmentLoading />);

    await waitFor(() => {
      expect(getByTestId('trackAssignmentSpinner')).toBeInTheDocument();
    });
  });

  it('trackAssignmentError should show error alert', async () => {
    const { getByTestId } = render(
      <Firmware {...mockProps} trackAssignmentError={{ error: 'error' }} />
    );

    await waitFor(() => {
      expect(getByTestId('trackAssignmentError')).toBeInTheDocument();
    });
  });

  it('firmwareLoading should show loading spinner', async () => {
    const { getByTestId } = render(<Firmware {...mockProps} firmwareLoading />);

    await waitFor(() => {
      expect(getByTestId('firmwareSpinner')).toBeInTheDocument();
    });
  });

  it('firmwareError should show error alert', async () => {
    const { getByTestId } = render(<Firmware {...mockProps} firmwareError={{ error: 'error' }} />);

    await waitFor(() => {
      expect(getByTestId('firmwareError')).toBeInTheDocument();
    });
  });
});
