import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, waitFor, within, waitForElement } from '@testing-library/react';
import { render, DOWN_ARROW } from 'tests/utils';
import { mockProps } from './constants';
import AutoProvision from '..';

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

const models = ['default', 'ECW5410', 'TIP_AP', 'ECW5211', 'AP2220', 'EA8300'];

describe('<AutoProvision />', () => {
  it('onUpdateCustomer should be called if auto provision toggle is set to enabled  and user saves', async () => {
    const submitSpy = jest.fn();
    const { getByRole } = render(<AutoProvision {...mockProps} onUpdateCustomer={submitSpy} />);

    fireEvent.click(getByRole('switch'));

    fireEvent.click(getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('onUpdateCustomer default props test', async () => {
    const { getByRole } = render(<AutoProvision {...mockProps} />);

    fireEvent.click(getByRole('button', { name: 'Save' }));
  });

  it('onUpdateCustomer catch condition default props test', async () => {
    const { getByRole } = render(<AutoProvision {...mockProps} />);

    fireEvent.click(getByRole('switch'));

    fireEvent.click(getByRole('button', { name: 'Save' }));
  });

  it('onUpdateCustomer catch condition default props test', async () => {
    const { getByRole } = render(<AutoProvision {...mockProps} dataProfile={[]} />);

    fireEvent.click(getByRole('switch'));

    fireEvent.click(getByRole('button', { name: 'Save' }));
  });

  it('onUpdateCustomer should be called if auto provision toggle is set to disabled and user saves', async () => {
    const submitSpy = jest.fn();
    const { getByRole } = render(<AutoProvision {...mockProps} onUpdateCustomer={submitSpy} />);

    fireEvent.click(getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('onUpdateCustomer should be called if user changes auto provision location and saves', async () => {
    const submitSpy = jest.fn();

    const { getByRole, getByText, getByLabelText } = render(
      <AutoProvision {...mockProps} onUpdateCustomer={submitSpy} />
    );

    const location = getByLabelText('Auto-Provisioning Location');
    fireEvent.keyDown(location, DOWN_ARROW);
    await waitForElement(() => getByText(mockProps.locationsTree[0].children[0].title));
    await fireEvent.click(getByText(mockProps.locationsTree[0].children[0].title));

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('Add Model button press should show Add Model modal', async () => {
    const { getByRole, getByText } = render(<AutoProvision {...mockProps} />);

    fireEvent.click(getByRole('button', { name: /add model/i }));

    expect(getByText('Add Model', { selector: 'div' })).toBeVisible();
  });

  it('Edit Model button press should show Edit Model modal', async () => {
    const { getByRole, getByText } = render(<AutoProvision {...mockProps} />);

    fireEvent.click(
      getByRole('button', {
        name: `edit-model-${models[1]}`,
      })
    );

    expect(getByText('Edit Model')).toBeVisible();
  });

  it('Delete Model button press should show Delete Model modal', async () => {
    const { getByRole, getByText } = render(<AutoProvision {...mockProps} />);

    fireEvent.click(
      getByRole('button', {
        name: `delete-model-${models[1]}`,
      })
    );

    const paragraph = getByText(/Are you sure you want to delete the model:/i);
    expect(paragraph).toBeVisible();
    expect(within(paragraph).getByText(models[1])).toBeVisible();
  });

  it('Cancel button press should hide Add Model modal', async () => {
    const { getByRole, getByText, queryByText } = render(<AutoProvision {...mockProps} />);

    fireEvent.click(getByRole('button', { name: /add model/i }));

    expect(getByText('Add Model', { selector: 'div' })).toBeVisible();

    fireEvent.click(getByRole('button', { name: /cancel/i }));

    await waitFor(() => {
      expect(queryByText('Add Model', { selector: 'div' })).not.toBeInTheDocument();
    });
  });

  it('Cancel button press should hide Edit Model modal', async () => {
    const { getByRole, getByText, queryByText } = render(<AutoProvision {...mockProps} />);

    fireEvent.click(
      getByRole('button', {
        name: `edit-model-${models[1]}`,
      })
    );

    expect(getByText('Edit Model')).toBeVisible();

    fireEvent.click(getByRole('button', { name: /cancel/i }));

    await waitFor(() => {
      expect(queryByText('Edit Model')).not.toBeInTheDocument();
    });
  });

  it('Cancel button press should hide Delete Model modal', async () => {
    const { getByRole, getByText, queryByText } = render(<AutoProvision {...mockProps} />);

    fireEvent.click(
      getByRole('button', {
        name: `delete-model-${models[1]}`,
      })
    );

    const paragraph = getByText(/Are you sure you want to delete the model:/i);
    expect(paragraph).toBeVisible();
    expect(within(paragraph).getByText(models[1])).toBeVisible();

    fireEvent.click(getByRole('button', { name: /cancel/i }));

    await waitFor(() => {
      expect(queryByText(/Are you sure you want to delete the model:/i)).not.toBeInTheDocument();
    });
  });

  it('onUpdateCustomer should be called if add model form is valid', async () => {
    const submitSpy = jest.fn();
    const { getByRole, getByText, getByLabelText, getAllByRole } = render(
      <AutoProvision {...mockProps} onUpdateCustomer={submitSpy} />
    );

    fireEvent.click(getByRole('button', { name: /add model/i }));

    expect(getByText('Add Model', { selector: 'div' })).toBeVisible();

    fireEvent.change(getByLabelText('Model'), { target: { value: 'test' } });

    const profile = getByLabelText('Profile');
    fireEvent.keyDown(profile, DOWN_ARROW);
    await waitForElement(() => getByText(mockProps.dataProfile[0].name), { timeout: 10000 });
    fireEvent.click(getByText(mockProps.dataProfile[0].name));

    fireEvent.click(getAllByRole('button', { name: /Save/i })[1]);

    fireEvent.click(getAllByRole('button', { name: /Save/i })[0]);

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('onUpdateCustomer should be called if edit model form is valid', async () => {
    const submitSpy = jest.fn();
    const { getByRole, getByText, getAllByRole } = render(
      <AutoProvision {...mockProps} onUpdateCustomer={submitSpy} />
    );

    fireEvent.click(
      getByRole('button', {
        name: `edit-model-${models[2]}`,
      })
    );
    expect(getByText('Edit Model')).toBeVisible();

    fireEvent.click(getAllByRole('button', { name: 'Save' })[1]);

    fireEvent.click(getAllByRole('button', { name: 'Save' })[0]);

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('onUpdateCustomer should be called if edit model form is updated and user saves', async () => {
    const submitSpy = jest.fn();
    const { getByRole, getByText, getAllByRole, getByLabelText } = render(
      <AutoProvision {...mockProps} onUpdateCustomer={submitSpy} />
    );

    fireEvent.click(
      getByRole('button', {
        name: `edit-model-${models[2]}`,
      })
    );
    expect(getByText('Edit Model')).toBeVisible();

    fireEvent.change(getByLabelText('Model'), { target: { value: 'test' } });

    fireEvent.click(getAllByRole('button', { name: 'Save' })[1]);

    fireEvent.click(getAllByRole('button', { name: 'Save' })[0]);

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('onUpdateCustomer should be called when delete modal is submitted and user saves', async () => {
    const submitSpy = jest.fn();
    const { getByRole, getByText } = render(
      <AutoProvision {...mockProps} onUpdateCustomer={submitSpy} />
    );

    fireEvent.click(
      getByRole('button', {
        name: `delete-model-${models[1]}`,
      })
    );

    const paragraph = getByText(/Are you sure you want to delete the model:/i);
    expect(paragraph).toBeVisible();
    expect(within(paragraph).getByText(models[1])).toBeVisible();

    fireEvent.click(getByRole('button', { name: 'Delete' }));

    fireEvent.click(getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('Alert error should be visible if errorLocation has errors', async () => {
    const { getByTestId } = render(<AutoProvision {...mockProps} errorLocation />);

    await waitFor(() => {
      expect(getByTestId('errorLocation')).toBeInTheDocument();
    });
  });

  it('null check', async () => {
    render(<AutoProvision />);
  });
});
