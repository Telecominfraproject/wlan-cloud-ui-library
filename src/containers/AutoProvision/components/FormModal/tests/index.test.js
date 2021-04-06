import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, waitFor, waitForElement } from '@testing-library/react';
import { render, DOWN_ARROW } from 'tests/utils';
import FormModal from '..';

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
  title: 'Add Model',
  usedModels: ['default'],
  loadingProfile: false,
  profiles: [
    {
      id: '6',
      name: 'ApProfile-3-radios',
      profileType: 'equipment_ap',
      details: {
        model_type: 'ApNetworkConfiguration',
        networkConfigVersion: 'AP-1',
        equipmentType: 'AP',
        vlanNative: true,
        vlan: 0,
        ntpServer: {
          model_type: 'AutoOrManualString',
          auto: true,
          value: 'pool.ntp.org',
        },
        syslogRelay: null,
        rtlsSettings: null,
        syntheticClientEnabled: true,
        ledControlEnabled: true,
        equipmentDiscovery: false,
        radioMap: {
          is2dot4GHz: {
            model_type: 'RadioProfileConfiguration',
            bestApEnabled: true,
            bestAPSteerType: 'both',
          },
          is5GHzU: {
            model_type: 'RadioProfileConfiguration',
            bestApEnabled: true,
            bestAPSteerType: 'both',
          },
          is5GHzL: {
            model_type: 'RadioProfileConfiguration',
            bestApEnabled: true,
            bestAPSteerType: 'both',
          },
        },
        profileType: 'equipment_ap',
      },
      __typename: 'Profile',
    },
    {
      id: '7',
      name: 'ApProfile-2-radios',
      profileType: 'equipment_ap',
      details: {
        model_type: 'ApNetworkConfiguration',
        networkConfigVersion: 'AP-1',
        equipmentType: 'AP',
        vlanNative: true,
        vlan: 0,
        ntpServer: {
          model_type: 'AutoOrManualString',
          auto: true,
          value: 'pool.ntp.org',
        },
        syslogRelay: null,
        rtlsSettings: null,
        syntheticClientEnabled: true,
        ledControlEnabled: true,
        equipmentDiscovery: false,
        radioMap: {
          is5GHz: {
            model_type: 'RadioProfileConfiguration',
            bestApEnabled: true,
            bestAPSteerType: 'both',
          },
          is2dot4GHz: {
            model_type: 'RadioProfileConfiguration',
            bestApEnabled: true,
            bestAPSteerType: 'both',
          },
        },
        profileType: 'equipment_ap',
      },
      __typename: 'Profile',
    },
    {
      id: '8',
      name: 'EnterpriseApProfile',
      profileType: 'equipment_ap',
      details: {
        model_type: 'ApNetworkConfiguration',
        networkConfigVersion: 'AP-1',
        equipmentType: 'AP',
        vlanNative: true,
        vlan: 0,
        ntpServer: {
          model_type: 'AutoOrManualString',
          auto: true,
          value: 'pool.ntp.org',
        },
        syslogRelay: null,
        rtlsSettings: null,
        syntheticClientEnabled: true,
        ledControlEnabled: true,
        equipmentDiscovery: false,
        radioMap: {
          is5GHz: {
            model_type: 'RadioProfileConfiguration',
            bestApEnabled: true,
            bestAPSteerType: 'both',
          },
          is2dot4GHz: {
            model_type: 'RadioProfileConfiguration',
            bestApEnabled: true,
            bestAPSteerType: 'both',
          },
          is5GHzU: {
            model_type: 'RadioProfileConfiguration',
            bestApEnabled: true,
            bestAPSteerType: 'both',
          },
          is5GHzL: {
            model_type: 'RadioProfileConfiguration',
            bestApEnabled: true,
            bestAPSteerType: 'both',
          },
        },
        profileType: 'equipment_ap',
      },
      __typename: 'Profile',
    },
  ],
};

const MISSING_MODEL = 'Please enter Model.';
const MISSING_PROFILE = 'Please select Access Point Profile.';
const INVALID_MODEL = 'Model already used. Please enter a new model.';

describe('<FormModal />', () => {
  it('Loading spinner should be visible if loadingProfile is true for Form modal', async () => {
    const { getByTestId } = render(<FormModal {...mockProps} loadingProfile />);

    await waitFor(() => {
      expect(getByTestId('loadingProfile')).toBeInTheDocument();
    });
  });

  it('Alert error should be visible if errorProfile has errors for Form Modal', async () => {
    const { getByTestId } = render(<FormModal {...mockProps} errorProfile />);

    await waitFor(() => {
      expect(getByTestId('errorProfile')).toBeInTheDocument();
    });
  });

  it('Invalid model error should show if model form contains invalid model id', async () => {
    const submitSpy = jest.fn();

    const { getByText, getByRole, getByLabelText } = render(
      <FormModal {...mockProps} onSubmit={submitSpy} />
    );

    fireEvent.change(getByLabelText('Model'), { target: { value: 'default' } });
    const profile = getByLabelText('Profile');
    fireEvent.keyDown(profile, DOWN_ARROW);
    await waitForElement(() => getByText(mockProps.profiles[0].name));
    fireEvent.click(getByText(mockProps.profiles[0].name));

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(0);
      expect(getByText(INVALID_MODEL)).toBeVisible();
    });
  });

  it('Missing model error should show if model form has missing model', async () => {
    const submitSpy = jest.fn();

    const { getByText, getByRole, getByLabelText } = render(
      <FormModal {...mockProps} onSubmit={submitSpy} />
    );

    fireEvent.change(getByLabelText('Model'), { target: { value: '' } });
    const profile = getByLabelText('Profile');
    fireEvent.keyDown(profile, DOWN_ARROW);
    await waitForElement(() => getByText(mockProps.profiles[0].name));
    fireEvent.click(getByText(mockProps.profiles[0].name));

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(0);
      expect(getByText(MISSING_MODEL)).toBeVisible();
    });
  });

  it('Errors should show if model form is incomplete', async () => {
    const submitSpy = jest.fn();

    const { getByText, getByRole } = render(<FormModal {...mockProps} onSubmit={submitSpy} />);

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(0);
      expect(getByText(MISSING_MODEL)).toBeVisible();
      expect(getByText(MISSING_PROFILE)).toBeVisible();
    });
  });

  it('cancel button click should call onCancel', async () => {
    const cancelSpy = jest.fn();

    const { getByRole } = render(<FormModal {...mockProps} onCancel={cancelSpy} />);

    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    await waitFor(() => {
      expect(cancelSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('onCancel default props', async () => {
    const { getByRole } = render(<FormModal {...mockProps} />);

    fireEvent.click(getByRole('button', { name: 'Cancel' }));
  });

  it('onSubmit default props', async () => {
    const { getByRole } = render(<FormModal {...mockProps} model="test" profileId="6" />);

    fireEvent.click(getByRole('button', { name: 'Save' }));
  });
});
