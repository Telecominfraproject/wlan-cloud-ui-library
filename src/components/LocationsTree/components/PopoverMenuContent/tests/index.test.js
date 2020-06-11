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
  hide: () => {},
};

describe('<PopoverMenuContent />', () => {
  afterEach(cleanup);

  it('should open Add Location Form Modal when Add Location is clicked', () => {
    const submitSpy = jest.fn();
    const { getByRole } = render(<PopoverMenuContent {...mockProps} setAddModal={submitSpy} />);
    fireEvent.click(getByRole('button', { name: /add location/i }));
    const modal = screen.getByText('Add Location');
    expect(modal).toBeVisible();
    expect(submitSpy).toHaveBeenCalled();
  });

  it('should open Edit Location Form Modal when Edit Location is clicked', () => {
    const submitSpy = jest.fn();
    const { getByRole } = render(<PopoverMenuContent {...mockProps} setEditModal={submitSpy} />);
    fireEvent.click(getByRole('button', { name: /edit location/i }));
    const modal = screen.getByText('Edit Location');
    expect(modal).toBeVisible();
    expect(submitSpy).toHaveBeenCalled();
  });

  it('should open Delete Location Modal when Delete Location is clicked', () => {
    const submitSpy = jest.fn();
    const { getByRole } = render(<PopoverMenuContent {...mockProps} setDeleteModal={submitSpy} />);
    fireEvent.click(getByRole('button', { name: /delete location/i }));
    const modal = screen.getByText('Delete Location');
    expect(modal).toBeVisible();
    expect(submitSpy).toHaveBeenCalled();
  });
});
