import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, waitFor, waitForElement } from '@testing-library/react';
import { render, DOWN_ARROW } from 'tests/utils';

import { mockProps } from './constants';

import AddApModal from '..';

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

describe('<AddApModal />', () => {
  it('should show Add Access Point modal when visible is true', () => {
    const onCheckSpy = jest.fn();
    const { getByText } = render(<AddApModal {...mockProps} onCheck={onCheckSpy} />);
    expect(getByText('Add Access Point')).toBeVisible();
  });

  it('should not render content of Add Access Point modal when loadingProfile is true', () => {
    const onCheckSpy = jest.fn();
    const { queryByText } = render(
      <AddApModal {...mockProps} loadingProfile onCheck={onCheckSpy} />
    );
    expect(queryByText('Asset ID')).not.toBeInTheDocument();
  });

  it('should not render content of Add Access Point modal when errorProfile has value', () => {
    const onCheckSpy = jest.fn();
    const { queryByText } = render(
      <AddApModal {...mockProps} errorProfile={{ name: 'Test' }} onCheck={onCheckSpy} />
    );
    expect(queryByText('Asset ID')).not.toBeInTheDocument();
  });

  it('click on Cancel button should hide Add Access Point modal', () => {
    const onSubmitSpy = jest.fn();
    const { getAllByRole } = render(<AddApModal {...mockProps} onCancel={onSubmitSpy} />);
    fireEvent.click(getAllByRole('button', { target: { value: /cancel/i } })[0]);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });

  it('click on Add button should submit Add Access Point modal', async () => {
    const onSubmitSpy = jest.fn();
    const { getByLabelText, getByText, getByRole } = render(
      <AddApModal {...mockProps} onSubmit={onSubmitSpy} />
    );
    fireEvent.change(getByLabelText('Asset ID'), { target: { value: 'Test' } });
    fireEvent.click(getByRole('button', { name: /add/i }));
    fireEvent.change(getByLabelText('Name'), { target: { value: 'Test' } });
    const profile = getByLabelText('Profile');
    fireEvent.keyDown(profile, DOWN_ARROW);
    await waitForElement(() => getByText(mockProps.profiles[0].name));
    fireEvent.click(getByText(mockProps.profiles[0].name));
    fireEvent.click(getByRole('button', { name: /add/i }));
    await waitFor(() => {
      expect(onSubmitSpy).toHaveBeenCalledTimes(1);
    });
  });
});
