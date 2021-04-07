import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, waitFor } from '@testing-library/react';
import { render } from 'tests/utils';
import VersionModal from '..';

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
  title: 'Add Firmware Version',
};

const MISSING_MODEL = 'Please input your Model ID';
const MISSING_VERSION = 'Please input your Version Name';
const MISSING_URL = 'Please input your Firmware URL';

describe('<VersionModal />', () => {
  it('Title should be Add Firmware Version', async () => {
    const { getByText } = render(<VersionModal {...mockProps} />);

    expect(getByText('Add Firmware Version')).toBeVisible();
  });

  it('cancel button click should call onCancel', async () => {
    const cancelSpy = jest.fn();

    const { getByRole } = render(<VersionModal {...mockProps} onCancel={cancelSpy} />);

    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(cancelSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('onCancel default props', async () => {
    const { getByRole } = render(<VersionModal {...mockProps} />);
    fireEvent.click(getByRole('button', { name: 'Cancel' }));
  });

  it('onSubmit should not be called when form is incomplete', async () => {
    const submitSpy = jest.fn();
    const { getByRole, getByText } = render(<VersionModal {...mockProps} onSubmit={submitSpy} />);

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(0);
      expect(getByText(MISSING_MODEL)).toBeVisible();
      expect(getByText(MISSING_VERSION)).toBeVisible();
      expect(getByText(MISSING_URL)).toBeVisible();
    });
  });

  it('onSubmit should be called on Edit Version Modal when form is complete', async () => {
    const submitSpy = jest.fn();
    const { getByRole } = render(
      <VersionModal
        {...mockProps}
        modelId="ap2220"
        versionName="ap2220-2020-06-25-ce03472"
        description="test"
        commit="ce03472"
        releaseDate="1596045666543"
        filename="https://tip-read:tip-read@tip.jfrog.io/artifactory/tip-wlan-ap-firmware/ap2220/ap2220-2020-06-25-ce03472.tar.gz"
        validationCode="c69370aa5b6622d91a0fba3a5441f31c"
        onSubmit={submitSpy}
      />
    );

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('onSubmit should be called when form is complete', async () => {
    const submitSpy = jest.fn();
    const { getByRole, getByLabelText } = render(
      <VersionModal {...mockProps} onSubmit={submitSpy} />
    );

    fireEvent.change(getByLabelText('Model ID'), { target: { value: 'test id' } });
    fireEvent.change(getByLabelText('Version Name'), { target: { value: 'test name' } });
    fireEvent.change(getByLabelText('Firmware URL'), { target: { value: 'www.test.com' } });

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('onSubmit default props', async () => {
    const { getByRole } = render(
      <VersionModal
        {...mockProps}
        modelId="ap2220"
        versionName="ap2220-2020-06-25-ce03472"
        description="test"
        commit="ce03472"
        releaseDate="1596045666543"
        filename="https://tip-read:tip-read@tip.jfrog.io/artifactory/tip-wlan-ap-firmware/ap2220/ap2220-2020-06-25-ce03472.tar.gz"
        validationCode="c69370aa5b6622d91a0fba3a5441f31c"
      />
    );

    fireEvent.click(getByRole('button', { name: 'Save' }));
  });
});
