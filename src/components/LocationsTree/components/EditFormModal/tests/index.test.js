import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';
import { render } from 'tests/utils';

import EditFormModal from '..';

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
  visible: true,
  onSubmit: () => {},
  onCancel: () => {},
};

describe('<EditFormModal />', () => {
  afterEach(cleanup);

  it('if selectedLocation is defined it should populate form with values', () => {
    const { getByLabelText } = render(
      <EditFormModal {...mockProps} selectedLocation={{ name: 'Test', locationType: 'SITE' }} />
    );

    expect(getByLabelText('Location Name').value).toBe('Test');
  });

  it('if selectedLocation is not defined the form should be empty', () => {
    const { getByLabelText } = render(<EditFormModal {...mockProps} />);

    expect(getByLabelText('Location Name').value).toBe('');
  });
});
