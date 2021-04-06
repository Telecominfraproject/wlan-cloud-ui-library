import { generateApProfile } from 'containers/ProfileDetails/tests/utils';

export const mockProps = {
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
  visible: true,
  buttonText: 'Add',
  title: 'Add Access Point',
  profiles: [
    generateApProfile({
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
    }),
    generateApProfile({
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
    }),

    generateApProfile({
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
    }),
  ],
  loadingProfile: false,
  errorProfile: false,
};
