import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup } from '@testing-library/react';
import { render } from 'tests/utils';
import { screen } from '@testing-library/dom';
import PopoverMenuContent from '..';

const mockProps = {
  locationData: {},
  setAddModal: () => {},
  setEditModal: () => {},
  setDeleteModal: () => {},
};

describe('<PopoverMenuContent />', () => {
  afterEach(cleanup);

  it('should open Add Location Form Modal when Add Location is clicked', () => {
    const { getByRole } = render(<PopoverMenuContent {...mockProps} />);
    fireEvent.click(getByRole('button', { name: /add location/i }));
    const addModal = screen.getByText('Add Location');
    expect(addModal).toBeTruthy();
  });

  it('should open Edit Location Form Modal when Edit Location is clicked', () => {
    const { getByRole } = render(<PopoverMenuContent {...mockProps} />);
    fireEvent.click(getByRole('button', { name: /edit location/i }));
    const editModal = screen.getByText('Edit Location');
    expect(editModal).toBeTruthy();
  });
});
