import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, waitFor, waitForElement } from '@testing-library/react';
import { render } from 'tests/utils';
import FormModal from '..';

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
};

const MISSING_NAME = 'Name field cannot be empty';
const MISSING_LOCALE = 'Locale field cannot be empty';
const INVALID_URL = 'Please enter URL in the format http://... or https://...';

const DOWN_ARROW = { keyCode: 40 };

describe('<FormModal />', () => {
  afterEach(cleanup);

  it('Invalid model error should show if model form contains invalid model id', async () => {
    const submitSpy = jest.fn();

    const { getByText, getByRole } = render(<FormModal {...mockProps} onSubmit={submitSpy} />);

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(0);
      expect(getByText(MISSING_NAME)).toBeVisible();
      expect(getByText(MISSING_LOCALE)).toBeVisible();
      expect(getByText(INVALID_URL)).toBeVisible();
    });
  });

  it('cancel button click should call onCancel', async () => {
    const cancelSpy = jest.fn();

    const { getByRole } = render(<FormModal {...mockProps} closeModal={cancelSpy} />);

    fireEvent.click(getByRole('button', { name: /cancel/i }));

    await waitFor(() => {
      expect(cancelSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('save button should call onSubmit', async () => {
    const submitSpy = jest.fn();

    const { getByText, getByRole, getByLabelText } = render(
      <FormModal {...mockProps} onSubmit={submitSpy} />
    );

    const selectedLocale = getByLabelText('Locale');

    fireEvent.keyDown(selectedLocale, DOWN_ARROW);
    await waitForElement(() => getByText('English'));
    fireEvent.click(getByText('English'));

    fireEvent.change(getByLabelText('Name'), { target: { value: 'TestName' } });
    fireEvent.change(getByLabelText('Url'), { target: { value: 'http://www.testname.com' } });

    fireEvent.click(getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });
});
