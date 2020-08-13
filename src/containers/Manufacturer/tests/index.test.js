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

describe('<Manufacturer />', () => {
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

  it('onUpdateOUI should not be called when onUpdateOUI has invalid function', async () => {
    const searchSpy = jest.fn();
    const submitSpy = jest.fn();

    const { getByPlaceholderText, getByRole } = render(
      <Manufacturer {...mockProps} onSearchOUI={searchSpy} onUpdateOUI={123} />
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
      expect(submitSpy).not.toHaveBeenCalled();
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

    const { getByTestId } = render(<Manufacturer {...mockProps} fileUpload={uploadSpy} />);

    const input = getByTestId('ouiUpload');
    const file = {
      uid: 'rc-upload-1596641326119-8',
      lastModified: 1596641328733,
      lastModifiedDate: undefined,
      name: 'oui.txt.gz',
      size: 3,
      type: 'application/x-gzip',
      percent: 0,
      originFileObj: { uid: 'rc-upload-1596641326119-8' },
      response: { url: 'test' },
    };

    userEvent.upload(input, file);

    fireEvent.change(input);
    await waitFor(() => {
      expect(input.files[0]).toStrictEqual(file);
      expect(input.files).toHaveLength(1);
      expect(uploadSpy).toBeCalledTimes(1);
    });
  });

  it('upload should be accepted with with correct file type', async () => {
    const uploadSpy = jest.fn();

    const { getByTestId } = render(<Manufacturer {...mockProps} fileUpload={uploadSpy} />);

    const input = getByTestId('ouiUpload');
    const file = new File(['oui'], 'oui.txt.gz', {
      type: 'application/x-gzip',
    });

    userEvent.upload(input, file);

    fireEvent.change(input);
    await waitFor(() => {
      expect(input.files[0]).toStrictEqual(file);
      expect(input.files).toHaveLength(1);
      expect(uploadSpy).toBeCalledTimes(1);
    });
  });

  it('upload should not be accepted with incorrect file type', async () => {
    const uploadSpy = jest.fn();

    const { getByTestId } = render(<Manufacturer {...mockProps} fileUpload={uploadSpy} />);

    const input = getByTestId('ouiUpload');
    const file = {
      uid: 'rc-upload-1596641326119-8',
      lastModified: 1596641328733,
      lastModifiedDate: undefined,
      name: 'oui.txt.gz',
      size: 3,
      type: 'incorrectType.file',
      percent: 0,
      originFileObj: { uid: 'rc-upload-1596641326119-8' },
    };

    userEvent.upload(input, file);

    fireEvent.change(input);
    await waitFor(() => {
      expect(input.files[0]).toStrictEqual(file);
      expect(input.files).toHaveLength(1);
      expect(uploadSpy).toBeCalledTimes(0);
    });
  });

  it('upload should not be accepted with incorrect file size', async () => {
    const uploadSpy = jest.fn();

    const { getByTestId } = render(<Manufacturer {...mockProps} fileUpload={uploadSpy} />);

    const input = getByTestId('ouiUpload');
    const file = new File(['oui'], 'oui.txt.gz', {
      type: 'application/x-gzip',
    });

    Object.defineProperty(file, 'size', { value: 100000000 });

    userEvent.upload(input, file);

    fireEvent.change(input);
    await waitFor(() => {
      expect(input.files[0]).toStrictEqual(file);
      expect(input.files).toHaveLength(1);
      expect(uploadSpy).toBeCalledTimes(0);
    });
  });
});
