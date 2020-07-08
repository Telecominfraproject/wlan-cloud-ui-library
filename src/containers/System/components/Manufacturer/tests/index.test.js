import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, waitFor } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { render } from 'tests/utils';
import Manufacturer from '..';

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
  returnedOUI: {
    manufacturerAlias: 'testAlias',
    manufacturerName: 'ZTE Corporation',
    oui: 'B0C19E',
    __typename: 'ManufacturerOuiDetails',
  },
  onSearchOUI: () => {},
  onUpdateOUI: () => {},
};
describe('<General />', () => {
  afterEach(() => {
    cleanup();
  });

  it('onSearch should be called when correct OUI string is submitted', async () => {
    const searchSpy = jest.fn();

    const { getByPlaceholderText, getByRole } = render(
      <Manufacturer {...mockProps} onSearchOUI={searchSpy} />
    );

    fireEvent.change(getByPlaceholderText('OUI String'), {
      target: { value: 'B0C19E' },
    });

    fireEvent.click(getByRole('button', { name: /find/i }));

    await waitFor(() => {
      expect(searchSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('onUpdateOUI should be called when correct OUI string is submitted', async () => {
    const searchSpy = jest.fn();
    const submitSpy = jest.fn();

    const { getByPlaceholderText, getByRole } = render(
      <Manufacturer {...mockProps} onSearchOUI={searchSpy} onUpdateOUI={submitSpy} />
    );

    fireEvent.change(getByPlaceholderText('OUI String'), {
      target: { value: 'B0C19E' },
    });

    fireEvent.click(getByRole('button', { name: /find/i }));
    await waitFor(() => {
      expect(searchSpy).toHaveBeenCalledTimes(1);
    });

    fireEvent.change(
      getByPlaceholderText('Please enter a concise and widely recognized brand name.'),
      {
        target: { value: 'testAlias' },
      }
    );

    fireEvent.click(getByRole('button', { name: /save/i }));
    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('cancel should should the OUI information', async () => {
    const searchSpy = jest.fn();
    const submitSpy = jest.fn();

    const { getByPlaceholderText, getByRole } = render(
      <Manufacturer {...mockProps} onSearchOUI={searchSpy} onUpdateOUI={submitSpy} />
    );

    fireEvent.change(getByPlaceholderText('OUI String'), {
      target: { value: 'B0C19E' },
    });

    fireEvent.click(getByRole('button', { name: /find/i }));
    await waitFor(() => {
      expect(searchSpy).toHaveBeenCalledTimes(1);
    });

    fireEvent.click(getByRole('button', { name: /cancel/i }));

    const submitButton = screen.queryByText('cancel');
    await waitFor(() => {
      expect(submitButton).not.toBeInTheDocument();
    });
  });
});
