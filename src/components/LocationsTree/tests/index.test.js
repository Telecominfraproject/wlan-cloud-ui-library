import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, waitFor, waitForElement } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from 'tests/utils';
import LocationTree from '..';

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

const treeData = [
  {
    key: 0,
    title: 'Network',
    value: '0',
    children: [
      {
        id: 2,
        key: 2,
        name: 'Menlo Park',
        parentId: 0,
        title: 'Menlo Park',
        value: '2',
        children: [
          {
            id: 3,
            key: 3,
            name: 'Building 1',
            parentId: 2,
            title: 'Building 1',
            value: '3',
            children: [
              {
                id: 4,
                key: 4,
                name: 'Floor 1',
                parentId: 3,
                title: 'Floor 1',
                value: '4',
              },
              {
                id: 5,
                key: 5,
                name: 'Floor 2',
                parentId: 3,
                title: 'Floor 2',
                value: '5',
              },
              {
                id: 6,
                key: 6,
                name: 'Floor 3',
                parentId: 3,
                title: 'Floor 3',
                value: '6',
              },
            ],
          },
          {
            id: 7,
            key: 7,
            name: 'Building 2',
            parentId: 2,
            title: 'Building 2',
            value: '7',
          },
        ],
      },
      {
        id: 8,
        key: 8,
        name: 'Ottawa',
        parentId: 0,
        title: 'Ottawa',
        value: '8',
      },
    ],
  },
];
const checkedLocations = [2, 3, 4, 5, 6, 7];
const locationPath = [{ id: 1 }];
const selectedLocation = {
  id: 7,
  parentId: 2,
  locationType: 'BUILDING',
  lastModifiedTimestamp: 1591804177219,
};

const apProfiles = [
  {
    id: 6,
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
    id: 7,
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
];

const mockProps = {
  locations: treeData,
  profiles: apProfiles,
  checkedLocations,
  locationPath: [],
  selectedLocation: {},
  onSelect: () => {},
  onCheck: () => {},
  deleteModal: false,
  editModal: false,
  addModal: false,
  apModal: false,
  onAddLocation: () => {},
  onEditLocation: () => {},
  onDeleteLocation: () => {},
  setAddModal: () => {},
  setEditModal: () => {},
  setDeleteModal: () => {},
  setApModal: () => {},
};

const DOWN_ARROW = { keyCode: 40 };

describe('<LocationTree />', () => {
  afterEach(cleanup);

  it('should call onCheck if tree node is checked', () => {
    const history = createMemoryHistory();
    const onCheckSpy = jest.fn();

    const { getByTestId } = render(
      <Router history={history}>
        <LocationTree {...mockProps} onCheck={onCheckSpy} />
      </Router>
    );
    const root = getByTestId('locationTree');
    const checkbox = root.querySelector('.ant-tree-treenode:nth-child(1) .ant-tree-checkbox');
    fireEvent.click(checkbox);
    expect(onCheckSpy).toHaveBeenCalled();
  });

  it('should call onSelect if tree node is clicked', () => {
    const history = createMemoryHistory();
    const onSelectSpy = jest.fn();

    const { getByTestId } = render(
      <Router history={history}>
        <LocationTree {...mockProps} onSelect={onSelectSpy} />
      </Router>
    );
    const root = getByTestId('locationTree');
    const location = root.querySelector(
      '.ant-tree-treenode:nth-child(1) .ant-tree-node-content-wrapper'
    );
    fireEvent.click(location);
    expect(onSelectSpy).toHaveBeenCalled();
  });

  it('should call setDeleteModal if Cancel button is clicked', () => {
    const history = createMemoryHistory();
    const setDeleteModalSpy = jest.fn();

    const { getByRole } = render(
      <Router history={history}>
        <LocationTree {...mockProps} deleteModal setDeleteModal={setDeleteModalSpy} />
      </Router>
    );
    fireEvent.click(getByRole('button', { name: /cancel/i }));
    expect(setDeleteModalSpy).toHaveBeenCalledTimes(1);
  });

  it('should call onDeleteLocation if Delete button is clicked', async () => {
    const history = createMemoryHistory();
    const onDeleteLocationSpy = jest.fn();

    const { getByRole } = render(
      <Router history={history}>
        <LocationTree
          {...mockProps}
          deleteModal
          locationPath={locationPath}
          onDeleteLocation={onDeleteLocationSpy}
        />
      </Router>
    );
    fireEvent.click(getByRole('button', { name: /delete/i }));
    await waitFor(() => {
      expect(onDeleteLocationSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('should call setAddModal if Cancel button is clicked', () => {
    const history = createMemoryHistory();
    const setAddModalSpy = jest.fn();

    const { getByRole } = render(
      <Router history={history}>
        <LocationTree {...mockProps} addModal setAddModal={setAddModalSpy} />
      </Router>
    );
    fireEvent.click(getByRole('button', { name: /cancel/i }));
    expect(setAddModalSpy).toHaveBeenCalled();
  });

  it('should not call onAddLocation on submit, if form input is invalid', async () => {
    const history = createMemoryHistory();
    const onAddLocationSpy = jest.fn();

    const { getByText, getByRole } = render(
      <Router history={history}>
        <LocationTree
          {...mockProps}
          addModal
          selectedLocation={selectedLocation}
          onAddLocation={onAddLocationSpy}
        />
      </Router>
    );
    fireEvent.click(getByRole('button', { name: /save/i }));
    await waitFor(() => {
      expect(getByText('Please enter location name')).toBeVisible();
      expect(onAddLocationSpy).not.toHaveBeenCalled();
    });
  });

  it('should call onAddLocation on submit, if form input is valid type BUILDING', async () => {
    const history = createMemoryHistory();
    const onAddLocationSpy = jest.fn();

    const { getByLabelText, getByRole } = render(
      <Router history={history}>
        <LocationTree
          {...mockProps}
          addModal
          selectedLocation={selectedLocation}
          onAddLocation={onAddLocationSpy}
        />
      </Router>
    );

    fireEvent.change(getByLabelText('New Location Name'), { target: { value: 'Floor 1' } });
    fireEvent.click(getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(onAddLocationSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('should call onAddLocation on submit, if form input is valid type SITE', async () => {
    const history = createMemoryHistory();
    const onAddLocationSpy = jest.fn();

    const { getByLabelText, getByRole } = render(
      <Router history={history}>
        <LocationTree
          {...mockProps}
          addModal
          selectedLocation={{ ...selectedLocation, locationType: 'SITE' }}
          onAddLocation={onAddLocationSpy}
        />
      </Router>
    );

    fireEvent.change(getByLabelText('New Location Name'), { target: { value: 'Building 1' } });
    fireEvent.click(getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(onAddLocationSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('should call onAddLocation on submit, if form input is valid type COUNTRY', async () => {
    const history = createMemoryHistory();
    const onAddLocationSpy = jest.fn();

    const { getByLabelText, getByRole } = render(
      <Router history={history}>
        <LocationTree
          {...mockProps}
          addModal
          selectedLocation={{ ...selectedLocation, locationType: 'COUNTRY' }}
          onAddLocation={onAddLocationSpy}
        />
      </Router>
    );

    fireEvent.change(getByLabelText('New Location Name'), { target: { value: 'Building 1' } });
    fireEvent.click(getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(onAddLocationSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('Add Location Modal should show correct location path', async () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <LocationTree
          {...mockProps}
          selectedLocation={{
            id: 8,
            key: 8,
            name: 'Ottawa',
            parentId: 0,
            title: 'Ottawa',
            value: '8',
          }}
          addModal
        />
      </Router>
    );
    expect(screen.getByText('Add Location')).toBeVisible();
  });

  it('should call setEditModal if Cancel button is clicked', () => {
    const history = createMemoryHistory();
    const setEditModalSpy = jest.fn();

    const { getByRole } = render(
      <Router history={history}>
        <LocationTree {...mockProps} editModal setEditModal={setEditModalSpy} />
      </Router>
    );
    fireEvent.click(getByRole('button', { name: /cancel/i }));
    expect(setEditModalSpy).toHaveBeenCalled();
  });

  it('should not call onEditLocation on submit, if form input is invalid', async () => {
    const history = createMemoryHistory();
    const onEditLocationSpy = jest.fn();

    const { getByText, getByRole } = render(
      <Router history={history}>
        <LocationTree
          {...mockProps}
          editModal
          selectedLocation={selectedLocation}
          onEditLocation={onEditLocationSpy}
        />
      </Router>
    );
    fireEvent.click(getByRole('button', { name: /save/i }));
    await waitFor(() => {
      expect(getByText('Please enter location name')).toBeVisible();
      expect(onEditLocationSpy).not.toHaveBeenCalled();
    });
  });

  it('should call onEditLocation on submit, if form input is valid', async () => {
    const history = createMemoryHistory();
    const onEditLocationSpy = jest.fn();

    const { getByLabelText, getByRole } = render(
      <Router history={history}>
        <LocationTree
          {...mockProps}
          editModal
          selectedLocation={selectedLocation}
          onEditLocation={onEditLocationSpy}
        />
      </Router>
    );

    fireEvent.change(getByLabelText('Location Name'), { target: { value: 'Floor 1' } });
    fireEvent.click(getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(onEditLocationSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('should call onCreateEquipment on submit, if form input is valid', async () => {
    const history = createMemoryHistory();
    const onCreateEquipment = jest.fn();

    const { getByLabelText, getByRole, getByText } = render(
      <Router history={history}>
        <LocationTree
          {...mockProps}
          apModal
          selectedLocation={selectedLocation}
          onCreateEquipment={onCreateEquipment}
        />
      </Router>
    );

    fireEvent.change(getByLabelText('Asset ID'), { target: { value: 'test' } });
    fireEvent.change(getByLabelText('Name'), { target: { value: 'test' } });

    const profile = getByLabelText('Profile');
    fireEvent.keyDown(profile, DOWN_ARROW);
    await waitForElement(() => getByText('ApProfile-3-radios'));

    fireEvent.click(getByText('ApProfile-3-radios'));

    fireEvent.click(getByRole('button', { name: /add/i }));

    await waitFor(() => {
      expect(onCreateEquipment).toHaveBeenCalledTimes(1);
    });
  });

  it('should hide setApModal if Cancel button is clicked', () => {
    const history = createMemoryHistory();
    const setApModalSpy = jest.fn();

    const { getByRole } = render(
      <Router history={history}>
        <LocationTree {...mockProps} apModal setApModal={setApModalSpy} />
      </Router>
    );
    fireEvent.click(getByRole('button', { name: /cancel/i }));
    expect(setApModalSpy).toHaveBeenCalledTimes(1);
  });
});
