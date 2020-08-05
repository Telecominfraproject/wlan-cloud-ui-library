import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, waitFor, waitForElement } from '@testing-library/react';
import { render } from 'tests/utils';
import AddApModal from '..';

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
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
  visible: true,
  buttonText: 'Add',
  title: 'Add Access Point',
  profiles: [
    {
      id: '6',
      name: 'ApProfile-3-radios',
      profileType: 'equipment_ap',
      details: {
        equipmentDiscovery: false,
        equipmentType: 'AP',
        ledControlEnabled: true,
        model_type: 'ApNetworkConfiguration',
        networkConfigVersion: 'AP-1',
        ntpServer: { model_type: 'AutoOrManualString', auto: true, value: 'pool.ntp.org' },
        profileType: 'equipment_ap',
        radioMap: {
          is2dot4GHz: {
            model_type: 'RadioProfileConfiguration',
            bestApEnabled: true,
            bestAPSteerType: 'both',
          },
          is5GHzL: {
            model_type: 'RadioProfileConfiguration',
            bestApEnabled: true,
            bestAPSteerType: 'both',
          },
          is5GHzU: {
            model_type: 'RadioProfileConfiguration',
            bestApEnabled: true,
            bestAPSteerType: 'both',
          },
        },
        rtlsSettings: null,
        syntheticClientEnabled: true,
        syslogRelay: null,
        vlan: 0,
        vlanNative: true,
      },
      __typename: 'Profile',
    },
    {
      id: '7',
      name: 'ApProfile-2-radios',
      profileType: 'equipment_ap',
      details: {
        equipmentDiscovery: false,
        equipmentType: 'AP',
        ledControlEnabled: true,
        model_type: 'ApNetworkConfiguration',
        networkConfigVersion: 'AP-1',
        ntpServer: { model_type: 'AutoOrManualString', auto: true, value: 'pool.ntp.org' },
        profileType: 'equipment_ap',
        radioMap: {
          is2dot4GHz: {
            model_type: 'RadioProfileConfiguration',
            bestApEnabled: true,
            bestAPSteerType: 'both',
          },
          is5GHz: {
            model_type: 'RadioProfileConfiguration',
            bestApEnabled: true,
            bestAPSteerType: 'both',
          },
        },
        rtlsSettings: null,
        syntheticClientEnabled: true,
        syslogRelay: null,
        vlan: 0,
        vlanNative: true,
      },
      __typename: 'Profile',
    },
    {
      id: '8',
      name: 'EnterpriseApProfile',
      profileType: 'equipment_ap',
      details: {
        equipmentDiscovery: false,
        equipmentType: 'AP',
        ledControlEnabled: true,
        model_type: 'ApNetworkConfiguration',
        networkConfigVersion: 'AP-1',
        ntpServer: { model_type: 'AutoOrManualString', auto: true, value: 'pool.ntp.org' },
        profileType: 'equipment_ap',
        radioMap: {
          is2dot4GHz: {
            model_type: 'RadioProfileConfiguration',
            bestApEnabled: true,
            bestAPSteerType: 'both',
          },
          is5GHz: {
            model_type: 'RadioProfileConfiguration',
            bestApEnabled: true,
            bestAPSteerType: 'both',
          },
          is5GHzL: {
            model_type: 'RadioProfileConfiguration',
            bestApEnabled: true,
            bestAPSteerType: 'both',
          },
          is5GHzU: {
            model_type: 'RadioProfileConfiguration',
            bestApEnabled: true,
            bestAPSteerType: 'both',
          },
        },
        rtlsSettings: null,
        syntheticClientEnabled: true,
        syslogRelay: null,
        vlan: 0,
        vlanNative: true,
      },
      __typename: 'Profile',
    },
  ],
  loadingProfile: false,
  errorProfile: false,
};

const DOWN_ARROW = { keyCode: 40 };

describe('<AddApModal />', () => {
  afterEach(cleanup);

  it('should show Add Access Point modal when visible is true', () => {
    const onCheckSpy = jest.fn();
    const { getByText } = render(<AddApModal {...mockProps} onCheck={onCheckSpy} />);
    expect(getByText('Add Access Point')).toBeVisible();
  });

  it('should not render content of Add Access Point modal when loadingProfile is true', () => {
    const onCheckSpy = jest.fn();
    const { queryByText } = render(
      <AddApModal {...mockProps} loadingProfile onCheck={onCheckSpy} />
    );
    expect(queryByText('Asset ID')).not.toBeInTheDocument();
  });

  it('should not render content of Add Access Point modal when errorProfile has value', () => {
    const onCheckSpy = jest.fn();
    const { queryByText } = render(
      <AddApModal {...mockProps} errorProfile={{ name: 'Test' }} onCheck={onCheckSpy} />
    );
    expect(queryByText('Asset ID')).not.toBeInTheDocument();
  });

  it('click on Cancel button should hide Add Access Point modal', () => {
    const onSubmitSpy = jest.fn();
    const { getAllByRole } = render(<AddApModal {...mockProps} onCancel={onSubmitSpy} />);
    fireEvent.click(getAllByRole('button', { target: { value: /cancel/i } })[0]);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });

  it('click on Add button should submit Add Access Point modal', async () => {
    const onSubmitSpy = jest.fn();
    const { getByLabelText, getByText, getByRole } = render(
      <AddApModal {...mockProps} onSubmit={onSubmitSpy} />
    );
    fireEvent.change(getByLabelText('Asset ID'), { target: { value: 'Test' } });
    fireEvent.click(getByRole('button', { name: /add/i }));
    fireEvent.change(getByLabelText('Name'), { target: { value: 'Test' } });
    const profile = getByLabelText('Profile');
    fireEvent.keyDown(profile, DOWN_ARROW);
    await waitForElement(() => getByText('ApProfile-3-radios'));
    fireEvent.click(getByText('ApProfile-3-radios'));
    fireEvent.click(getByRole('button', { name: /add/i }));
    await waitFor(() => {
      expect(onSubmitSpy).toHaveBeenCalledTimes(1);
    });
  });
});
