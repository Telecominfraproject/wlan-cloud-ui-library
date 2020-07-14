import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, waitFor } from '@testing-library/react';
import { render } from 'tests/utils';

import RadiusZoneModal from '..';

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
  onSuccess: () => {},
  onCancel: () => {},
  visible: true,
  title: 'Add Service Zone Configuration',
  zone: {},
};

describe('<RadiusZoneModal />', () => {
  afterEach(cleanup);

  it('error messgae should be visible when input value is invlalid for Edit Service Zone Configuration modal', async () => {
    const { getByRole, getByText, getByLabelText } = render(<RadiusZoneModal {...mockProps} />);
    await waitFor(() => {
      expect(getByText('Add Service Zone Configuration')).toBeVisible();
    });
    fireEvent.change(getByLabelText('Zone Name'), { target: { value: null } });
    fireEvent.click(getByRole('button', { name: /save/i }));
    await waitFor(() => {
      expect(getByText('Please enter service zone')).toBeVisible();
    });
  });

  it('onSuccess should be called when save button is clicked', async () => {
    const submitSpy = jest.fn();
    const { getByRole, getByText, getByLabelText } = render(
      <RadiusZoneModal {...mockProps} onSuccess={submitSpy} />
    );

    expect(getByText('Add Service Zone Configuration')).toBeVisible();

    fireEvent.change(getByLabelText('Zone Name'), { target: { value: 'abc' } });
    fireEvent.click(getByRole('button', { name: /save/i }));
    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('onCancel should be called when cancel button is clicked', async () => {
    const submitSpy = jest.fn();
    const { getByRole, getByText } = render(
      <RadiusZoneModal {...mockProps} onCancel={submitSpy} />
    );
    expect(getByText('Add Service Zone Configuration')).toBeVisible();
    fireEvent.click(getByRole('button', { name: 'Cancel' }));
    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });
});
