import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { screen } from '@testing-library/dom';
import { render } from 'tests/utils';
import Profile from '..';

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
  isLastPage: true,
  data: [
    { details: {}, id: 1, name: 'Radius-Profile', profileType: 'ssid', __typename: 'Profile' },
  ],
};

describe('<Profile />', () => {
  afterEach(cleanup);

  it('should call onReload if reload button is clicked', async () => {
    const submitSpy = jest.fn();
    const { getByRole } = render(
      <Router>
        <Profile {...mockProps} onReload={submitSpy} />
      </Router>
    );
    fireEvent.click(getByRole('button', { name: /reload/i }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('onReload default prop test', async () => {
    const { getByRole } = render(
      <Router>
        <Profile {...mockProps} />
      </Router>
    );
    fireEvent.click(getByRole('button', { name: /reload/i }));
  });

  it('URL should changes to /addprofile when Add Profile button is clicked', () => {
    const URL = '/addprofile';
    const { getByRole } = render(
      <Router>
        <Profile {...mockProps} />
      </Router>
    );
    fireEvent.click(getByRole('button', { name: /add profile/i }));
    expect(window.location.pathname).toEqual(URL);
  });

  it('delete profile button click should show delete modal', () => {
    const { getByText } = render(
      <Router>
        <Profile {...mockProps} />
      </Router>
    );

    fireEvent.click(screen.getByTitle('delete'));

    const paragraph = getByText('Are you sure you want to delete the account:');
    expect(paragraph).toBeVisible();
  });

  it('cancel button should hide delete modal', async () => {
    const { getByText, getByRole } = render(
      <Router>
        <Profile {...mockProps} />
      </Router>
    );

    fireEvent.click(screen.getByTitle('delete'));

    const paragraph = getByText('Are you sure you want to delete the account:');
    expect(paragraph).toBeVisible();

    fireEvent.click(getByRole('button', { name: /cancel/i }));
    await waitFor(() => {
      expect(paragraph).toBeVisible();
    });
  });

  it('onDeleteProfile should be called when Delete button on modal is clicked', async () => {
    const data = {
      ...mockProps,
      data: [
        {
          details: {},
          id: 1,
          name: 'Radius-Profile',
          profileType: 'equipment_ap',
          __typename: 'Profile',
        },
      ],
    };
    const submitSpy = jest.fn();
    const { getByRole } = render(
      <Router>
        <Profile {...data} onDeleteProfile={submitSpy} />
      </Router>
    );
    fireEvent.click(screen.getByTitle('delete'));
    expect(getByRole('button', { name: 'Delete' }));
    fireEvent.click(getByRole('button', { name: 'Delete' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('onDeleteProfile default prop test', async () => {
    const data = {
      ...mockProps,
      data: [
        {
          details: {},
          id: 1,
          name: 'Radius-Profile',
          profileType: 'equipment_ap',
          __typename: 'Profile',
        },
      ],
    };
    const { getByRole } = render(
      <Router>
        <Profile {...data} />
      </Router>
    );
    fireEvent.click(screen.getByTitle('delete'));
    expect(getByRole('button', { name: 'Delete' }));
    fireEvent.click(getByRole('button', { name: 'Delete' }));
  });

  it('should work with profileType null', async () => {
    const data = {
      ...mockProps,
      data: [
        {
          details: {},
          id: 1,
          name: 'Radius-Profile',
          profileType: null,
          __typename: 'Profile',
        },
      ],
    };
    const submitSpy = jest.fn();
    const { queryByText } = render(
      <Router>
        <Profile {...data} onDeleteProfile={submitSpy} />
      </Router>
    );
    expect(queryByText('Delete')).not.toBeInTheDocument();
  });

  it('Load More Button Should show when isLastPage false', () => {
    const onLoadMore = jest.fn();
    const submitSpy = jest.fn();
    const data = {
      ...mockProps,
      isLastPage: false,
      onLoadMore,
    };

    const { getByRole } = render(
      <Router>
        <Profile {...data} onDeleteProfile={submitSpy} />
      </Router>
    );
    fireEvent.click(getByRole('button', { name: 'Load More' }));

    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it('onLoadMore default prop test', async () => {
    const data = {
      ...mockProps,
      isLastPage: false,
    };
    const { getByRole } = render(
      <Router>
        <Profile {...data} />
      </Router>
    );
    fireEvent.click(getByRole('button', { name: 'Load More' }));
  });
});
