import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import { fireEvent, cleanup, waitFor } from '@testing-library/react';
import { render } from 'tests/utils';
import Alarms from '..';

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
  data: [
    {
      alarmCode: 'MemoryUtilization',
      createdTimestamp: '1596564234684',
      details: {
        model_type: 'AlarmDetails',
        message: 'Available memory is too low',
        affectedEquipmentIds: null,
        generatedBy: null,
        contextAttrs: null,
      },
      equipment: { id: '7', name: 'AP 7', __typename: 'Equipment' },
      severity: 'error',
      __typename: 'Alarm',
    },
    {
      alarmCode: 'MemoryUtilization',
      createdTimestamp: '1596564234796',
      details: {
        model_type: 'AlarmDetails',
        message: 'Available memory is too low',
        affectedEquipmentIds: null,
        generatedBy: null,
        contextAttrs: null,
      },
      equipment: { id: '14', name: 'AP 14', __typename: 'Equipment' },
      severity: 'requiresAttention',
      __typename: 'Alarm',
    },
    {
      alarmCode: 'MemoryUtilization',
      createdTimestamp: '1596564234885',
      details: {
        model_type: 'AlarmDetails',
        message: 'Available memory is too low',
        affectedEquipmentIds: null,
        generatedBy: null,
        contextAttrs: null,
      },
      equipment: { id: '21', name: 'AP 21', __typename: 'Equipment' },
      severity: 'error',
      __typename: 'Alarm',
    },
    {
      alarmCode: 'MemoryUtilization',
      createdTimestamp: '1596564234957',
      details: {
        model_type: 'AlarmDetails',
        message: 'Available memory is too low',
        affectedEquipmentIds: null,
        generatedBy: null,
        contextAttrs: null,
      },
      equipment: { id: '28', name: 'AP 28', __typename: 'Equipment' },
      severity: 'test',
      __typename: 'Alarm',
    },
  ],
  isLastPage: true,
};

describe('<Alarms />', () => {
  afterEach(() => {
    cleanup();
  });

  it('should work with the default props', async () => {
    const { getAllByText } = render(
      <Router>
        <Alarms {...mockProps} />
      </Router>
    );
    await waitFor(() => {
      expect(getAllByText('MemoryUtilization')[(0, 1, 2, 3)]).toBeVisible();
    });
  });

  it('should work with the default onLoadMore and onReload function', async () => {
    const { getByRole, container } = render(
      <Router>
        <Alarms {...mockProps} isLastPage={false} />
      </Router>
    );
    const reloadButton = container.querySelector('.ant-btn.Button.ant-btn-icon-only');
    fireEvent.click(reloadButton);
    fireEvent.click(getByRole('button', { name: /load more/i }));
  });
});
