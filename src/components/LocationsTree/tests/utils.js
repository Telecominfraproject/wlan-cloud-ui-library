// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

export function generateLocation() {
  const id = faker.random.number();
  return {
    key: id,
    id,
    title: faker.address.city(),
    parentId: id - 1,
    value: id.toString(),
    locationType: faker.lorem.word(),
    __typename: 'Location',
  };
}
