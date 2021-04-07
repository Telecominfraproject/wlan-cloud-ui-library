// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

const lastModifiedTimestamp = faker.time.recent();

export const mockProps = {
  data: [
    {
      customerId: '2',
      macAddress: faker.internet.mac(),
      createdTimestamp: '0',
      lastModifiedTimestamp,
      details: {
        model_type: 'ClientInfoDetails',
        alias: null,
        clientType: 0,
        apFingerprint: null,
        userName: null,
        hostName: null,
        lastUsedCpUsername: null,
        lastUserAgent: null,
        doNotSteer: false,
        blocklistDetails: {
          model_type: 'BlocklistDetails',
          enabled: true,
          startTime: null,
          endTime: null,
        },
      },
      __typename: 'Client',
    },
    {
      customerId: faker.random.number(50),
      macAddress: faker.internet.mac(),
      createdTimestamp: '0',
      lastModifiedTimestamp,
      __typename: 'Client',
    },
  ],
};
