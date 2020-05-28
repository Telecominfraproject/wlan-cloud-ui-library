import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent } from '@testing-library/react';
import { render } from 'tests/utils';
import LocationTree from '..';

describe('<LocationTree />', () => {
  afterEach(cleanup);
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
  it('should call onCheck if tree node is checked', () => {
    const onSelectSpy = jest.fn();
    const onCheckSpy = jest.fn();

    const { getByTestId } = render(
      <LocationTree
        locations={treeData}
        checkedLocations={checkedLocations}
        onSelect={onSelectSpy}
        onCheck={onCheckSpy}
      />
    );
    const root = getByTestId('locationTree');
    const checkbox = root.querySelector('.ant-tree-treenode:nth-child(1) .ant-tree-checkbox');
    fireEvent.click(checkbox);
    expect(onCheckSpy).toHaveBeenCalled();
  });

  it('should call onSelect if tree node is clicked', () => {
    const onSelectSpy = jest.fn();
    const onCheckSpy = jest.fn();

    const { getByTestId } = render(
      <LocationTree
        locations={treeData}
        checkedLocations={checkedLocations}
        onSelect={onSelectSpy}
        onCheck={onCheckSpy}
      />
    );
    const root = getByTestId('locationTree');
    const locationName = root.querySelector(
      '.ant-tree-treenode:nth-child(1) .ant-tree-node-content-wrapper'
    );
    fireEvent.click(locationName);
    expect(onSelectSpy).toHaveBeenCalled();
  });
});
