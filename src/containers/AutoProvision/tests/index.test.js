import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, waitFor, within, waitForElement } from '@testing-library/react';
import { render } from 'tests/utils';
import AutoProvision from '..';

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
  data: {
    id: '2',
    name: 'Test Customer',
    email: 'test@example.com',
    createdTimestamp: '1595550085649',
    lastModifiedTimestamp: '1595599101464',
    details: {
      model_type: 'CustomerDetails',
      autoProvisioning: {
        model_type: 'EquipmentAutoProvisioningSettings',
        enabled: true,
        locationId: 8,
        equipmentProfileIdPerModel: {
          default: 6,
          ECW5410: 7,
          TIP_AP: 7,
          ECW5211: 7,
          AP2220: 7,
          EA8300: 6,
        },
      },
    },
    __typename: 'Customer',
  },
  dataLocation: [
    {
      id: '2',
      name: 'Menlo Park',
      parentId: '0',
      locationType: 'SITE',
      __typename: 'Location',
    },
    {
      id: '3',
      name: 'Building 1',
      parentId: '2',
      locationType: 'BUILDING',
      __typename: 'Location',
    },
    {
      id: '8',
      name: 'Ottawa',
      parentId: '0',
      locationType: 'SITE',
      __typename: 'Location',
    },
  ],
  dataProfile: [
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
  loadingLoaction: false,
  loadingProfile: false,
  errorLocation: null,
  errorProfile: null,
  onUpdateCustomer: () => {},
};

const MISSING_MODEL = 'Please enter Model.';
const MISSING_PROFILE = 'Please select Access Point Profile.';
const INVALID_MODEL = 'Model already used. Please enter a new model.';
const DOWN_ARROW = { keyCode: 40 };

const models = ['default', 'ECW5410', 'TIP_AP', 'ECW5211', 'AP2220', 'EA8300'];

describe('<AutoProvision />', () => {
  afterEach(cleanup);

  it('onUpdateCustomer should be called if auto provision toggle is set to enabled  and user saves', async () => {
    const submitSpy = jest.fn();
    const { getByRole } = render(<AutoProvision {...mockProps} onUpdateCustomer={submitSpy} />);

    fireEvent.click(getByRole('switch'));

    fireEvent.click(getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('onUpdateCustomer should be called if auto provision toggle is set to disabled and user saves', async () => {
    const submitSpy = jest.fn();
    const { getByRole } = render(<AutoProvision {...mockProps} onUpdateCustomer={submitSpy} />);

    fireEvent.click(getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('onUpdateCustomer should be called if user changes auto provision location and saves', async () => {
    const submitSpy = jest.fn();

    const { getByRole, getByText, getByLabelText } = render(
      <AutoProvision {...mockProps} onUpdateCustomer={submitSpy} />
    );

    fireEvent.click(getByRole('switch'));

    const location = getByLabelText('Auto-Provisioning Location');
    fireEvent.keyDown(location, DOWN_ARROW);
    await waitForElement(() => getByText(mockProps.dataLocation[1].name));
    fireEvent.click(getByText(mockProps.dataLocation[1].name));

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('Add Model button press should show Add Model modal', async () => {
    const { getByRole, getByText } = render(<AutoProvision {...mockProps} />);

    fireEvent.click(getByRole('button', { name: /add model/i }));

    expect(getByText('Add Model', { selector: 'div' })).toBeVisible();
  });

  it('Edit Model button press should show Edit Model modal', async () => {
    const { getByRole, getByText } = render(<AutoProvision {...mockProps} />);

    fireEvent.click(
      getByRole('button', {
        name: `edit-model-${models[1]}`,
      })
    );

    expect(getByText('Edit Model')).toBeVisible();
  });

  it('Delete Model button press should show Delete Model modal', async () => {
    const { getByRole, getByText } = render(<AutoProvision {...mockProps} />);

    fireEvent.click(
      getByRole('button', {
        name: `delete-model-${models[1]}`,
      })
    );

    const paragraph = getByText('Are you sure you want to delete the model:');
    expect(paragraph).toBeVisible();
    expect(within(paragraph).getByText(models[1])).toBeVisible();
  });

  it('Cancel button press should hide Add Model modal', async () => {
    const { getByRole, getByText } = render(<AutoProvision {...mockProps} />);

    fireEvent.click(getByRole('button', { name: /add model/i }));

    expect(getByText('Add Model', { selector: 'div' })).toBeVisible();

    fireEvent.click(getByRole('button', { name: /cancel/i }));

    await waitFor(() => {
      expect(getByText('Add Model', { selector: 'div' })).not.toBeVisible();
    });
  });

  it('Cancel button press should hide Edit Model modal', async () => {
    const { getByRole, getByText } = render(<AutoProvision {...mockProps} />);

    fireEvent.click(
      getByRole('button', {
        name: `edit-model-${models[1]}`,
      })
    );

    expect(getByText('Edit Model')).toBeVisible();

    fireEvent.click(getByRole('button', { name: /cancel/i }));

    await waitFor(() => {
      expect(getByText('Edit Model')).not.toBeVisible();
    });
  });

  it('Cancel button press should hide Delete Model modal', async () => {
    const { getByRole, getByText } = render(<AutoProvision {...mockProps} />);

    fireEvent.click(
      getByRole('button', {
        name: `delete-model-${models[1]}`,
      })
    );

    const paragraph = getByText('Are you sure you want to delete the model:');
    expect(paragraph).toBeVisible();
    expect(within(paragraph).getByText(models[1])).toBeVisible();

    fireEvent.click(getByRole('button', { name: /cancel/i }));

    await waitFor(() => {
      expect(paragraph).not.toBeVisible();
    });
  });

  it('Errors should show if add model form is incomplete', async () => {
    const { getByRole, getByText, getAllByRole } = render(<AutoProvision {...mockProps} />);
    fireEvent.click(getByRole('button', { name: /add model/i }));

    expect(getByText('Add Model', { selector: 'div' })).toBeVisible();

    fireEvent.click(getAllByRole('button', { name: 'Save' })[1]);

    await waitFor(() => {
      expect(getByText(MISSING_MODEL)).toBeVisible();
      expect(getByText(MISSING_PROFILE)).toBeVisible();
    });
  });

  it('Existing model error should show if add model form contains invalid model id', async () => {
    const { getByRole, getByText, getByLabelText, getAllByRole, getAllByText } = render(
      <AutoProvision {...mockProps} />
    );

    fireEvent.click(getByRole('button', { name: /add model/i }));

    expect(getByText('Add Model', { selector: 'div' })).toBeVisible();

    fireEvent.change(getByLabelText('Model'), { target: { value: 'default' } });

    const profile = getByLabelText('Profile');
    fireEvent.keyDown(profile, DOWN_ARROW);
    await waitForElement(() => getAllByText(mockProps.dataProfile[0].name)[2]);
    fireEvent.click(getAllByText(mockProps.dataProfile[0].name)[2]);

    fireEvent.click(getAllByRole('button', { name: 'Save' })[1]);

    await waitFor(() => {
      expect(getByText(INVALID_MODEL)).toBeVisible();
    });
  });

  it('onUpdateCustomer should be called if add model form is valid', async () => {
    const submitSpy = jest.fn();
    const { getByRole, getByText, getByLabelText, getAllByRole, getAllByText } = render(
      <AutoProvision {...mockProps} onUpdateCustomer={submitSpy} />
    );

    fireEvent.click(getByRole('button', { name: /add model/i }));

    expect(getByText('Add Model', { selector: 'div' })).toBeVisible();

    fireEvent.change(getByLabelText('Model'), { target: { value: 'test' } });

    const profile = getByLabelText('Profile');
    fireEvent.keyDown(profile, DOWN_ARROW);
    await waitForElement(() => getAllByText(mockProps.dataProfile[0].name)[2]);
    fireEvent.click(getAllByText(mockProps.dataProfile[0].name)[2]);

    fireEvent.click(getAllByRole('button', { name: 'Save' })[1]);

    fireEvent.click(getAllByRole('button', { name: 'Save' })[0]);

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('onUpdateCustomer should be called if edit model form is valid', async () => {
    const submitSpy = jest.fn();
    const { getByRole, getByText, getAllByRole } = render(
      <AutoProvision {...mockProps} onUpdateCustomer={submitSpy} />
    );

    fireEvent.click(
      getByRole('button', {
        name: `edit-model-${models[2]}`,
      })
    );
    expect(getByText('Edit Model')).toBeVisible();

    fireEvent.click(getAllByRole('button', { name: 'Save' })[1]);

    fireEvent.click(getAllByRole('button', { name: 'Save' })[0]);

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('onUpdateCustomer should be called if edit model form is updated and user saves', async () => {
    const submitSpy = jest.fn();
    const { getByRole, getByText, getAllByRole, getByLabelText } = render(
      <AutoProvision {...mockProps} onUpdateCustomer={submitSpy} />
    );

    fireEvent.click(
      getByRole('button', {
        name: `edit-model-${models[2]}`,
      })
    );
    expect(getByText('Edit Model')).toBeVisible();

    fireEvent.change(getByLabelText('Model'), { target: { value: 'test' } });

    fireEvent.click(getAllByRole('button', { name: 'Save' })[1]);

    fireEvent.click(getAllByRole('button', { name: 'Save' })[0]);

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('Missing model error should show if edit model form has missing model', async () => {
    const { getByRole, getByText, getAllByRole, getByLabelText, getAllByText } = render(
      <AutoProvision {...mockProps} />
    );

    fireEvent.click(
      getByRole('button', {
        name: `edit-model-${models[1]}`,
      })
    );
    expect(getByText('Edit Model')).toBeVisible();

    fireEvent.change(getByLabelText('Model'), { target: { value: '' } });
    const profile = getByLabelText('Profile');
    fireEvent.keyDown(profile, DOWN_ARROW);
    await waitForElement(() => getAllByText(mockProps.dataProfile[0].name)[2]);
    fireEvent.click(getAllByText(mockProps.dataProfile[0].name)[2]);

    fireEvent.click(getAllByRole('button', { name: 'Save' })[1]);

    await waitFor(() => {
      expect(getByText(MISSING_MODEL)).toBeVisible();
    });
  });

  it('Invalid model error should show if edit model form contains invalid model id', async () => {
    const { getByRole, getByText, getAllByRole, getByLabelText, getAllByText } = render(
      <AutoProvision {...mockProps} />
    );

    fireEvent.click(
      getByRole('button', {
        name: `edit-model-${models[1]}`,
      })
    );
    expect(getByText('Edit Model')).toBeVisible();

    fireEvent.change(getByLabelText('Model'), { target: { value: 'default' } });
    const profile = getByLabelText('Profile');
    fireEvent.keyDown(profile, DOWN_ARROW);
    await waitForElement(() => getAllByText(mockProps.dataProfile[0].name)[2]);
    fireEvent.click(getAllByText(mockProps.dataProfile[0].name)[2]);

    fireEvent.click(getAllByRole('button', { name: 'Save' })[1]);

    await waitFor(() => {
      expect(getByText(INVALID_MODEL)).toBeVisible();
    });
  });

  it('onUpdateCustomer should be called when delete modal is submitted and user saves', async () => {
    const submitSpy = jest.fn();
    const { getByRole, getByText } = render(
      <AutoProvision {...mockProps} onUpdateCustomer={submitSpy} />
    );

    fireEvent.click(
      getByRole('button', {
        name: `delete-model-${models[1]}`,
      })
    );

    const paragraph = getByText('Are you sure you want to delete the model:');
    expect(paragraph).toBeVisible();
    expect(within(paragraph).getByText(models[1])).toBeVisible();

    fireEvent.click(getByRole('button', { name: 'Delete' }));

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('Alert error should be visible if errorProfile has errors for Form modal', async () => {
    const { getByRole, getByTestId, getByText } = render(
      <AutoProvision {...mockProps} errorProfile />
    );

    fireEvent.click(getByRole('button', { name: /add model/i }));

    expect(getByText('Add Model', { selector: 'div' })).toBeVisible();

    await waitFor(() => {
      expect(getByTestId('errorProfile')).toBeInTheDocument();
    });
  });

  it('Loading spinner should be visible if loadingProfile is true for Form modal', async () => {
    const { getByRole, getByTestId, getByText } = render(
      <AutoProvision {...mockProps} loadingProfile />
    );

    fireEvent.click(getByRole('button', { name: /add model/i }));

    expect(getByText('Add Model', { selector: 'div' })).toBeVisible();

    await waitFor(() => {
      expect(getByTestId('loadingProfile')).toBeInTheDocument();
    });
  });

  it('Loading spinner should be visible if loadingLoaction', async () => {
    const { getByTestId } = render(<AutoProvision {...mockProps} loadingLoaction />);

    await waitFor(() => {
      expect(getByTestId('loadingLoaction')).toBeInTheDocument();
    });
  });

  it('Alert error should be visible if errorLocation has errors', async () => {
    const { getByTestId } = render(<AutoProvision {...mockProps} errorLocation />);

    await waitFor(() => {
      expect(getByTestId('errorLocation')).toBeInTheDocument();
    });
  });

  it('null check', async () => {
    render(<AutoProvision />);
  });
});
