import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, waitFor, waitForElement } from '@testing-library/react';

import { render } from 'tests/utils';
import AssignmentModal from '..';

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
  visible: true,
  title: 'Add Model Target Version',
  filteredModels: ['ea8300-ca'],
  handleSearchFirmware: () => {},
  firmwareVersionData: [
    {
      id: '3',
      modelId: 'ea8300-ca',
      versionName: 'ea8300-2020-06-25-ce03472',
      description: '',
      filename:
        'https://tip-read:tip-read@tip.jfrog.io/artifactory/tip-wlan-ap-firmware/ea8300/ea8300-2020-06-25-ce03472.tar.gz',
      commit: 'ce03472',
      releaseDate: '1596045666546',
      validationCode: 'b209deb9847bdf40a31e45edf2e5a8d7',
      createdTimestamp: '1596045666546',
      lastModifiedTimestamp: '1596045666546',
      __typename: 'Firmware',
    },
  ],
  firmwareVersionLoading: false,
  firmwareModelError: null,
  firmwareModelLoading: false,
  firmwareTrackError: null,
  firmwareTrackLoading: false,
};
const MISSING_MODEL = 'Please input your Model ID';
const MISSING_FIRMWARE = 'Please select your firmware version';
const DOWN_ARROW = { keyCode: 40 };

describe('<AssignmentModal />', () => {
  afterEach(cleanup);

  it('Title should be Add Model Target Version', async () => {
    const { getByText } = render(<AssignmentModal {...mockProps} />);

    expect(getByText('Add Model Target Version', { selector: 'div' })).toBeVisible();
  });

  it('cancel button click should call onCancel', async () => {
    const cancelSpy = jest.fn();

    const { getByRole } = render(<AssignmentModal {...mockProps} onCancel={cancelSpy} />);

    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(cancelSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('onCancel default props', async () => {
    const { getByRole } = render(<AssignmentModal {...mockProps} />);

    fireEvent.click(getByRole('button', { name: 'Cancel' }));
  });

  it('onSubmit should not be called when form is incomplete', async () => {
    const submitSpy = jest.fn();
    const { getByRole, getByText } = render(
      <AssignmentModal {...mockProps} onSubmit={submitSpy} />
    );

    expect(getByText('Add Model Target Version', { selector: 'div' })).toBeVisible();

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(0);
      expect(getByText(MISSING_MODEL)).toBeVisible();
      expect(getByText(MISSING_FIRMWARE)).toBeVisible();
    });
  });

  it('onSubmit should not be called when firmware is empty', async () => {
    const submitSpy = jest.fn();
    const searchSpy = jest.fn();

    const { getByRole, getByText, getAllByText, getByLabelText } = render(
      <AssignmentModal {...mockProps} onSubmit={submitSpy} handleSearchFirmware={searchSpy} />
    );

    expect(getByText('Add Model Target Version', { selector: 'div' })).toBeVisible();

    const model = getByLabelText('Model ID');
    fireEvent.keyDown(model, DOWN_ARROW);
    await waitForElement(() => getAllByText(mockProps.filteredModels[0])[1]);
    fireEvent.click(getAllByText(mockProps.filteredModels[0])[1]);

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(searchSpy).toHaveBeenCalled();
      expect(submitSpy).toHaveBeenCalledTimes(0);
      expect(getByText(MISSING_FIRMWARE)).toBeVisible();
    });
  });

  it('onSubmit should be called on Add Model Target Version Modal when firmware is complete', async () => {
    const submitSpy = jest.fn();
    const { getByRole, getByText, getAllByText, getByLabelText } = render(
      <AssignmentModal {...mockProps} onSubmit={submitSpy} />
    );

    const model = getByLabelText('Model ID');
    fireEvent.keyDown(model, DOWN_ARROW);
    await waitForElement(() => getAllByText(mockProps.filteredModels[0])[1]);
    fireEvent.click(getAllByText(mockProps.filteredModels[0])[1]);

    const firmware = getByLabelText('Firmware Version');
    fireEvent.keyDown(firmware, DOWN_ARROW);
    await waitForElement(() => getByText(mockProps.firmwareVersionData[0].versionName));
    fireEvent.click(getByText(mockProps.firmwareVersionData[0].versionName));

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('onSubmit should be called on Edit Model Target Version Modal when form is complete', async () => {
    const submitSpy = jest.fn();
    const { getByRole } = render(
      <AssignmentModal
        {...mockProps}
        modelId="ea8300-ca"
        firmwareVersionRecordId="3"
        onSubmit={submitSpy}
      />
    );

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('onSubmit default props', async () => {
    const { getByRole } = render(
      <AssignmentModal {...mockProps} modelId="ea8300-ca" firmwareVersionRecordId="3" />
    );

    fireEvent.click(getByRole('button', { name: 'Save' }));
  });

  it('All Model Ids Are in Use should be visible if filteredModels are empty is true for Add Model Target Version', async () => {
    const { getByText } = render(<AssignmentModal {...mockProps} filteredModels={[]} />);

    await waitFor(() => {
      expect(getByText('All Model Ids Are in Use')).toBeInTheDocument();
    });
  });
  it('Loading spinner should be visible if firmwareVersionLoading is true for Add Model Target Version', async () => {
    const { getByTestId } = render(<AssignmentModal {...mockProps} firmwareVersionLoading />);

    await waitFor(() => {
      expect(getByTestId('firmwareVersionLoading')).toBeInTheDocument();
    });
  });

  it('Loading spinner should be visible if firmwareModelLoading is true for Add Model Target Version', async () => {
    const { getByTestId } = render(<AssignmentModal {...mockProps} firmwareModelLoading />);

    await waitFor(() => {
      expect(getByTestId('firmwareLoading')).toBeInTheDocument();
    });
  });

  it('Loading spinner should be visible if firmwareTrackLoading is true for Add Model Target Version', async () => {
    const { getByTestId } = render(<AssignmentModal {...mockProps} firmwareTrackLoading />);

    await waitFor(() => {
      expect(getByTestId('firmwareLoading')).toBeInTheDocument();
    });
  });

  it('Alert error should be visible if firmwareModelError has errors for Add Model Target Version', async () => {
    const { getByTestId } = render(<AssignmentModal {...mockProps} firmwareModelError />);

    await waitFor(() => {
      expect(getByTestId('firmwareModelError')).toBeInTheDocument();
    });
  });

  it('Alert error should be visible if firmwareModelError has errors for Add Model Target Version', async () => {
    const { getByTestId } = render(<AssignmentModal {...mockProps} firmwareTrackError />);

    await waitFor(() => {
      expect(getByTestId('firmwareTrackError')).toBeInTheDocument();
    });
  });
});
