import { generateLocation } from './utils';

export const treeData = [
  {
    ...generateLocation(),
    children: [
      {
        ...generateLocation(),
        children: [
          {
            ...generateLocation(),
            children: [generateLocation(), generateLocation(), generateLocation()],
          },
        ],
      },
      generateLocation(),
    ],
  },
  generateLocation(),
];
