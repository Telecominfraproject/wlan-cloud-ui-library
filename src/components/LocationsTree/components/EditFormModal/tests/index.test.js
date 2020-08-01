import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, waitFor } from '@testing-library/react';
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
  title: 'Edit Location',
  visible: true,
  onSubmit: () => {},
  onCancel: () => {},
  selectedLocation: {
    id: '2',
    lastModifiedTimestamp: '1596059377937',
    locationType: 'SITE',
    name: 'Menlo Park',
    parentId: '0',
    __typename: 'Location',
  },
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
    const { getByLabelText } = render(<EditFormModal {...mockProps} selectedLocation={null} />);
    expect(getByLabelText('Location Name').value).toBe('');
  });

  it('click on Cancel button should hide Edit Location modal', () => {
    const onSubmitSpy = jest.fn();
    const { getAllByRole } = render(<EditFormModal {...mockProps} onCancel={onSubmitSpy} />);
    fireEvent.click(getAllByRole('button', { target: { value: /cancel/i } })[0]);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });

  it('click on Save button should submit Add Access Point modal', async () => {
    const onSubmitSpy = jest.fn();
    const { getByLabelText, getByRole } = render(
      <EditFormModal {...mockProps} onSubmit={onSubmitSpy} />
    );
    fireEvent.click(getByRole('button', { name: /save/i }));
    fireEvent.change(getByLabelText('Location Name'), { target: { value: 'Test' } });
    fireEvent.click(getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(onSubmitSpy).toHaveBeenCalledTimes(1);
    });
  });
});
