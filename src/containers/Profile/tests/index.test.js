import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, cleanup, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, ROUTES } from 'tests/utils';
import { screen } from '@testing-library/dom';
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
    {
      id: '2',
      name: 'TipWlan-cloud-Enterprise',
      profileType: 'ssid',
      __typename: 'Profile',
    },
  ],
};

describe('<Profile />', () => {
  afterEach(cleanup);

  it('should call default onReload if reload button is clicked and no onReload function is', async () => {
    const { getByRole } = render(
      <Router>
        <Profile {...mockProps} />
      </Router>
    );
    fireEvent.click(getByRole('button', { name: /reload/i }));
  });

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

  it('URL should changes to /configure/addprofile when Add Profile button is clicked', () => {
    const URL = ROUTES.addprofile;
    const { getByRole } = render(
      <Router>
        <Profile {...mockProps} />
      </Router>
    );
    fireEvent.click(getByRole('button', { name: /add profile/i }));
    expect(window.location.pathname).toEqual(URL);
  });

  it('delete profile button click should show delete modal', () => {
    const { getByText, getByRole } = render(
      <Router>
        <Profile {...mockProps} />
      </Router>
    );

    fireEvent.click(getByRole('button', { name: `delete-${mockProps.data[0].name}` }));

    const paragraph = getByText('Are you sure you want to delete the profile:');
    expect(paragraph).toBeVisible();
  });

  it('cancel button should hide delete modal', async () => {
    const { getByText, getByRole } = render(
      <Router>
        <Profile {...mockProps} />
      </Router>
    );

    fireEvent.click(getByRole('button', { name: `delete-${mockProps.data[0].name}` }));

    const paragraph = getByText('Are you sure you want to delete the profile:');
    expect(paragraph).toBeVisible();

    fireEvent.click(getByRole('button', { name: /cancel/i }));
    await waitFor(() => {
      expect(paragraph).toBeVisible();
    });
  });

  it('onDeleteProfile should be called when Delete button on modal is clicked', async () => {
    const submitSpy = jest.fn();
    const { getByRole } = render(
      <Router>
        <Profile {...mockProps} onDeleteProfile={submitSpy} />
      </Router>
    );
    fireEvent.click(getByRole('button', { name: `delete-${mockProps.data[0].name}` }));
    expect(getByRole('button', { name: 'Delete' }));
    fireEvent.click(getByRole('button', { name: 'Delete' }));

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledTimes(1);
    });
  });

  it('Clicking on table row should change url to /configure/profiles/:id', async () => {
    render(
      <Router>
        <Profile {...mockProps} />
      </Router>
    );

    fireEvent.click(screen.getByText(mockProps.data[0].name));
    expect(window.location.pathname).toEqual(`${ROUTES.profiles}/${mockProps.data[0].id}`);
  });

  it('onDeleteProfile default prop test', async () => {
    const { getByRole } = render(
      <Router>
        <Profile {...mockProps} />
      </Router>
    );
    fireEvent.click(getByRole('button', { name: `delete-${mockProps.data[0].name}` }));
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

  it('Load More Button Should show when isLastPage false and call with Default Prop', () => {
    const submitSpy = jest.fn();
    const data = {
      ...mockProps,
      isLastPage: false,
    };

    const { getByRole } = render(
      <Router>
        <Profile {...data} onDeleteProfile={submitSpy} />
      </Router>
    );
    fireEvent.click(getByRole('button', { name: 'Load More' }));
  });
});
