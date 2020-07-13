import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, waitFor } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { render } from 'tests/utils';
import userEvent from '@testing-library/user-event';
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
const ouiFile = {
  lastModified: 1594657075244,
  name: 'oui.txt.gz',
  size: 1168627,
  type: 'application/x-gzip',
  uid: 'rc-upload-1594665576877-2',
  webkitRelativePath: '',
};

describe('<General />', () => {
  afterEach(() => {
    cleanup();
  });

  it('onSearchOUI should be called when correct OUI string is submitted', async () => {
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

  it('onUpdateOUI should be called when alias string is submitted', async () => {
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

  it('cancel button should close the OUI information', async () => {
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

  it('upload functionality with correct file type', async () => {
    const uploadSpy = jest.fn();

    const { getByRole } = render(<Manufacturer {...mockProps} fileUpload={uploadSpy} />);

    const input = getByRole('button', { name: /Select File to Import.../i });
    const file = new File([''], 'oui.txt.gz', {
      ...ouiFile,
    });

    userEvent.upload(input, file);

    fireEvent.change(input);
    await waitFor(() => {
      expect(input.files[0]).toStrictEqual(file);
      expect(input.files).toHaveLength(1);
      expect(uploadSpy).toBeCalledTimes(1);
    });
  });
});
