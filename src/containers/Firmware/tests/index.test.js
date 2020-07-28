import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, waitFor, within, waitForElement } from '@testing-library/react';

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
  onCreateTrackAssignment: () => {},
  onUpdateTrackAssignment: () => {},
  onDeleteTrackAssignment: () => {},
  trackAssignmentLoading: false,
  firmwareLoading: false,
  firmwareTrackLoading: false,
  firmwareModelLoading: false,
  firmwareVersionLoading: false,
  trackAssignmentError: null,
  firmwareTrackError: null,
  firmwareModelError: null,
  firmwareError: null,
  firmwareData: [
    {
      id: '1',
      modelId: 'ap2220',
      versionName: 'ap2220-2020-06-25-ce03472',
      description: '',
      filename:
        'https://tip-read:tip-read@tip.jfrog.io/artifactory/tip-wlan-ap-firmware/ap2220/ap2220-2020-06-25-ce03472.tar.gz',
      commit: 'ce03472',
      releaseDate: '1595344806125',
      validationCode: 'c69370aa5b6622d91a0fba3a5441f31c',
      createdTimestamp: '1595344806128',
      lastModifiedTimestamp: '1595344806128',
      __typename: 'Firmware',
    },
    {
      id: '2',
      modelId: 'ea8300',
      versionName: 'ea8300-2020-06-25-ce03472',
      description: '',
      filename:
        'https://tip-read:tip-read@tip-read:tip-read@tip.jfrog.io/artifactory/tip-wlan-ap-firmware/ea8300/ea8300-2020-06-25-ce03472.tar.gz',
      commit: 'ce03472',
      releaseDate: '1595344806128',
      validationCode: 'b209deb9847bdf40a31e45edf2e5a8d7',
      createdTimestamp: '1595344806128',
      lastModifiedTimestamp: '1595344806128',
      __typename: 'Firmware',
    },
    {
      id: '3',
      modelId: 'ea8300-ca',
      versionName: 'ea8300-2020-06-25-ce03472',
      description: '',
      filename:
        'https://tip-read:tip-read@tip.jfrog.io/artifactory/tip-wlan-ap-firmware/ea8300/ea8300-2020-06-25-ce03472.tar.gz',
      commit: 'ce03472',
      releaseDate: '1595344806128',
      validationCode: 'b209deb9847bdf40a31e45edf2e5a8d7',
      createdTimestamp: '1595344806128',
      lastModifiedTimestamp: '1595344806128',
      __typename: 'Firmware',
    },
  ],
  trackAssignmentData: [
    {
      modelId: 'ap2220',
      firmwareVersionRecordId: '1',
      trackRecordId: '1',
      lastModifiedTimestamp: '1595350590424',
      __typename: 'FirmwareTrackAssignment',
    },
  ],
  firmwareModelData: ['ea8300-ca', 'ap2220', 'ecw5211', 'ea8300', 'ecw5410'],

  firmwareVersionData: [
    {
      id: '3',
      modelId: 'ea8300-ca',
      versionName: 'ea8300-2020-06-25-ce03472',
      description: '',
      filename:
        'https://tip-read:tip-read@tip.jfrog.io/artifactory/tip-wlan-ap-firmware/ea8300/ea8300-2020-06-25-ce03472.tar.gz',
      commit: 'ce03472',
      releaseDate: '1595344806128',
      validationCode: 'b209deb9847bdf40a31e45edf2e5a8d7',
      createdTimestamp: '1595344806128',
      lastModifiedTimestamp: '1595344806128',
      __typename: 'Firmware',
    },
  ],
};
const MISSING_MODEL = 'Please input your Model ID';
const MISSING_VERSION = 'Please input your Version Name';
const MISSING_URL = 'Please input your Firmware URL';
const MISSING_FIRMWARE = 'Please select your firmware version';
const DOWN_ARROW = { keyCode: 40 };

describe('<Firmware />', () => {
  afterEach(cleanup);

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
    const paragraph = getByText('Are you sure you want to delete the model target version:');
    expect(paragraph).toBeVisible();
    expect(within(paragraph).getByText(mockProps.trackAssignmentData[0].modelId)).toBeVisible();
  });

  it('cancel button click should hide Add Model Target Version modal', async () => {
    const { getByRole, getByText } = render(<Firmware {...mockProps} />);

    fireEvent.click(getByRole('button', { name: /add Model Target Version/i }));

    expect(getByText('Add Model Target Version', { selector: 'div' })).toBeVisible();

    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(getByText('Add Model Target Version', { selector: 'div' })).not.toBeVisible();
    });
  });

  it('cancel button click should hide Edit Model Target Version Modal', async () => {
    const { getByRole, getByText } = render(<Firmware {...mockProps} />);

    fireEvent.click(
      getByRole('button', { name: `edit-track-${mockProps.firmwareData[0].modelId}` })
    );

    expect(getByText('Edit Model Target Version')).toBeVisible();
    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(getByText('Edit Model Target Version')).not.toBeVisible();
    });
  });

  it('cancel button click should hide Delete Model Target Version Modal', async () => {
    const { getByRole, getByText } = render(<Firmware {...mockProps} />);
    fireEvent.click(
      getByRole('button', { name: `delete-track-${mockProps.firmwareData[0].modelId}` })
    );
    const paragraph = getByText('Are you sure you want to delete the model target version:');
    expect(paragraph).toBeVisible();
    expect(within(paragraph).getByText(mockProps.trackAssignmentData[0].modelId)).toBeVisible();

    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(paragraph).not.toBeVisible();
    });
  });

  it('onCreateTrackAssignment should not be called on Add Model Target Version Modal when form is incomplete', async () => {
    const submitSpy = jest.fn();
    const { getByRole, getByText } = render(
      <Firmware {...mockProps} onCreateTrackAssignment={submitSpy} />
    );
    fireEvent.click(getByRole('button', { name: /add Model Target Version/i }));

    expect(getByText('Add Model Target Version', { selector: 'div' })).toBeVisible();

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(0);
      expect(getByText(MISSING_MODEL)).toBeVisible();
      expect(getByText(MISSING_FIRMWARE)).toBeVisible();
    });
  });

  it('onCreateTrackAssignment should not be called on Add Model Target Version Modal when firmware is empty', async () => {
    const submitSpy = jest.fn();
    const searchSpy = jest.fn();

    const { getByRole, getByText, getAllByText, getByLabelText } = render(
      <Firmware
        {...mockProps}
        onCreateTrackAssignment={submitSpy}
        handleSearchFirmware={searchSpy}
      />
    );
    fireEvent.click(getByRole('button', { name: /add Model Target Version/i }));

    expect(getByText('Add Model Target Version', { selector: 'div' })).toBeVisible();

    const model = getByLabelText('Model ID');
    fireEvent.keyDown(model, DOWN_ARROW);
    await waitForElement(() => getAllByText(mockProps.firmwareData[2].modelId)[2]);
    fireEvent.click(getAllByText(mockProps.firmwareData[2].modelId)[2]);

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(searchSpy).toHaveBeenCalled();
      expect(submitSpy).toHaveBeenCalledTimes(0);
      expect(getByText(MISSING_FIRMWARE)).toBeVisible();
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
    const paragraph = getByText('Are you sure you want to delete the version:');
    expect(paragraph).toBeVisible();
    expect(within(paragraph).getByText(mockProps.firmwareData[2].versionName)).toBeVisible();
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

    fireEvent.click(
      getByRole('button', { name: `edit-firmware-${mockProps.firmwareData[2].modelId}` })
    );
    expect(getByText('Edit Firmware Version')).toBeVisible();
    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(getByText('Edit Firmware Version')).not.toBeVisible();
    });
  });

  it('cancel button click should hide Delete Firmware Version Modal', async () => {
    const { getByRole, getByText } = render(<Firmware {...mockProps} />);
    fireEvent.click(
      getByRole('button', { name: `delete-firmware-${mockProps.firmwareData[2].modelId}` })
    );
    const paragraph = getByText('Are you sure you want to delete the version:');
    expect(paragraph).toBeVisible();
    expect(within(paragraph).getByText(mockProps.firmwareData[2].versionName)).toBeVisible();

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

    fireEvent.click(getByRole('button', { name: /edit-firmware-ea8300-ca/i }));

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

    fireEvent.click(
      getByRole('button', { name: `edit-firmware-${mockProps.firmwareData[2].modelId}` })
    );
    expect(getByText('Edit Firmware Version')).toBeVisible();

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).not.toHaveBeenCalled();
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

  it('trackAssignmentLoading should show loading spinner', async () => {
    const { getByTestId } = render(<Firmware {...mockProps} trackAssignmentLoading />);

    await waitFor(() => {
      expect(getByTestId('trackAssignmentSpinner')).toBeInTheDocument();
    });
  });

  it('trackAssignmentError should show error alert', async () => {
    const { getByTestId } = render(<Firmware {...mockProps} trackAssignmentError />);

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
    const { getByTestId } = render(<Firmware {...mockProps} firmwareError />);

    await waitFor(() => {
      expect(getByTestId('firmwareError')).toBeInTheDocument();
    });
  });

  it('Loading spinner should be visible if firmwareModelLoading is true for Add Model Target Version', async () => {
    const { getByRole, getByTestId } = render(<Firmware {...mockProps} firmwareModelLoading />);

    fireEvent.click(getByRole('button', { name: /add Model Target Version/i }));

    await waitFor(() => {
      expect(getByTestId('firmwareLoading')).toBeInTheDocument();
    });
  });

  it('Loading spinner should be visible if firmwareTrackLoading is true for Add Model Target Version', async () => {
    const { getByRole, getByTestId } = render(<Firmware {...mockProps} firmwareTrackLoading />);

    fireEvent.click(getByRole('button', { name: /add Model Target Version/i }));

    await waitFor(() => {
      expect(getByTestId('firmwareLoading')).toBeInTheDocument();
    });
  });

  it('Alert error should be visible if firmwareModelError has errors for Add Model Target Version', async () => {
    const { getByRole, getByTestId } = render(<Firmware {...mockProps} firmwareModelError />);

    fireEvent.click(getByRole('button', { name: /add Model Target Version/i }));

    await waitFor(() => {
      expect(getByTestId('firmwareModelError')).toBeInTheDocument();
    });
  });

  it('Alert error should be visible if firmwareModelError has errors for Add Model Target Version', async () => {
    const { getByRole, getByTestId } = render(<Firmware {...mockProps} firmwareTrackError />);

    fireEvent.click(getByRole('button', { name: /add Model Target Version/i }));

    await waitFor(() => {
      expect(getByTestId('firmwareTrackError')).toBeInTheDocument();
    });
  });
});