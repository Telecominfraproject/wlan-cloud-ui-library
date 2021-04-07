// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

export function generateFirmware() {
  const modelId = faker.vehicle.vrm();
  const date = faker.date.recent();
  const commitId = faker.git.shortSha();
  const versionName = `${modelId}-${date}-${commitId}`;

  return {
    id: faker.random.number(50),
    modelId,
    versionName,
    description: '',
    filename: faker.internet.url(),
    commit: commitId,
    releaseDate: new Date(date).getTime(),
    validationCode: faker.random.uuid(),
    createdTimestamp: faker.time.recent(),
    lastModifiedTimestamp: faker.time.recent(),
    __typename: 'Firmware',
  };
}
