// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';
import { generateLocation } from 'components/LocationsTree/tests/utils';
import { generateApProfile } from 'containers/ProfileDetails/tests/utils';

export const mockProps = {
  data: {
    id: '2',
    name: faker.internet.userName(),
    email: faker.internet.email(),
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
  dataLocation: [generateLocation(), generateLocation(), generateLocation()],
  dataProfile: [
    generateApProfile({
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
    }),
    generateApProfile({
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
    }),
  ],
  loadingLoaction: false,
  loadingProfile: false,
  errorLocation: null,
  errorProfile: null,
};
