import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, waitFor, waitForElement, within } from '@testing-library/react';
import { Form } from 'antd';
import { render, DOWN_ARROW } from 'tests/utils';
import userEvent from '@testing-library/user-event';
import faker from 'faker';

import { mockCaptivePortal } from '../../../tests/constants';

import CaptivePortalForm from '..';

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

function buildUserForm() {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
  };
}

// eslint-disable-next-line react/prop-types
const CaptivePortalFormComp = ({ mockDetails = mockCaptivePortal }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form}>
      <CaptivePortalForm {...mockDetails} form={form} />
    </Form>
  );
};

describe('<CaptivePortalForm />', () => {
  let file;

  beforeEach(() => {
    file = new File([''], 'testImg.png', { type: 'image/png', size: 4000 });
  });

  beforeAll(done => {
    done();
  });
  global.URL.createObjectURL = jest.fn();

  it('should work when authenticationType is null ', async () => {
    const mockDetails = {
      ...mockCaptivePortal.details,
      details: {
        authenticationType: null,
      },
    };
    render(<CaptivePortalFormComp mockDetails={mockDetails} />);
  });

  it('should work when logoFile and backGroundFile is not null ', async () => {
    const mockDetails = {
      ...mockCaptivePortal.details,
      details: {
        logoFile: {
          apExportUrl: 'example.com',
          fileType: 'image/jpeg',
        },
        backgroundFile: {
          apExportUrl: 'example.com',
          fileType: 'image/jpeg',
        },
      },
    };

    render(<CaptivePortalFormComp mockDetails={mockDetails} />);
  });

  it('should work when externalCaptivePortalURL is true ', async () => {
    const mockDetails = {
      ...mockCaptivePortal.details,
      details: {
        externalCaptivePortalURL: true,
      },
    };

    render(<CaptivePortalFormComp mockDetails={mockDetails} />);
  });

  it('changing authentication mode to Captive Portal User List should display Manage Captive Portal Users button', async () => {
    const mockDetails = {
      ...mockCaptivePortal.details,
      details: {
        externalCaptivePortalURL: true,
      },
    };

    const { getByText, getByLabelText } = render(
      <CaptivePortalFormComp mockDetails={mockDetails} />
    );

    fireEvent.keyDown(getByLabelText('Authentication'), DOWN_ARROW);
    await waitForElement(() => getByText('Captive Portal User List'));
    fireEvent.click(getByText('Captive Portal User List'));

    await waitFor(() => {
      expect(getByText('User List')).toBeVisible();
    });
  });

  it('changing authentication mode to RADIUS should render RADIUS card', async () => {
    const mockDetails = {
      ...mockCaptivePortal.details,
      details: {
        externalCaptivePortalURL: true,
      },
    };

    const { getByText, getAllByText, getByLabelText } = render(
      <CaptivePortalFormComp mockDetails={mockDetails} />
    );
    fireEvent.keyDown(getByLabelText('Authentication'), DOWN_ARROW);
    await waitForElement(() => getByText('RADIUS'));
    fireEvent.click(getByText('RADIUS'));

    await waitFor(() => {
      expect(getAllByText('RADIUS')[1]).toBeVisible();
    });
  });

  it('error message should be displayed when input value for Session Timeout is invalid', async () => {
    const { getByLabelText, getByText } = render(<CaptivePortalFormComp />);
    fireEvent.change(getByLabelText('Session Timeout'), {
      target: { value: 15000 },
    });

    await waitFor(() => {
      expect(getByText('Session timeout can be a number between 1 and 1440')).toBeVisible();
    });
  });

  it('error message should not be displayed when input value for Session Timeout is valid', async () => {
    const { getByLabelText, queryByText } = render(<CaptivePortalFormComp />);
    fireEvent.change(getByLabelText('Session Timeout'), {
      target: { value: 5 },
    });

    await waitFor(() => {
      expect(
        queryByText('Session timeout can be a number between 1 and 1440')
      ).not.toBeInTheDocument();
    });
  });

  it('click on remove button should delete item from whitelist', async () => {
    const { queryByText, getByRole } = render(<CaptivePortalFormComp />);
    await waitFor(() => {
      expect(queryByText('1.1.1.1')).toBeInTheDocument();
    });

    fireEvent.click(getByRole('button', { name: 'Remove' }));

    await waitFor(() => {
      expect(queryByText('1.1.1.1')).not.toBeInTheDocument();
    });
  });

  it('hover on Session Timeout should display tooltip msg', async () => {
    const { container } = render(<CaptivePortalFormComp />);
    fireEvent.mouseOver(container.querySelector('.ant-input-wrapper.ant-input-group > span span'));

    await waitFor(() => {
      expect(container.querySelector('.ant-input-wrapper.ant-input-group > span span')).toHaveClass(
        'ant-tooltip-open'
      );
    });
  });

  it('error message should be displayed when input value for Redirect URL is invalid', async () => {
    const { getByLabelText, getByText } = render(<CaptivePortalFormComp />);
    fireEvent.change(getByLabelText('Redirect URL'), {
      target: { value: '1' },
    });

    await waitFor(() => {
      expect(getByText('Please enter URL in the format http://... or https://...')).toBeVisible();
    });
  });

  // it('changing radio button of Splash Page to Externally should render External Splash Page Card', async () => {
  //   const { getByText } = render(<CaptivePortalFormComp />);
  //   fireEvent.click(getByText('Externally Hosted'));

  //   await waitFor(() => {
  //     expect(getByText('External Splash Page')).toBeVisible();
  //   });

  //   fireEvent.click(getByText('Access Point Hosted'));
  // });

  // it('error message should be displayed when input value for URL for External Splash Page is invalid', async () => {
  //   const { getAllByPlaceholderText, getByText } = render(<CaptivePortalFormComp />);
  //   fireEvent.click(getByText('Externally Hosted'));
  //   fireEvent.change(getAllByPlaceholderText('http://... or https://...')[1], {
  //     target: { value: '1' },
  //   });

  //   await waitFor(() => {
  //     expect(getByText('Please enter URL in the format http://... or https://...')).toBeVisible();
  //   });
  // });

  // it('tips should be displayed when Show Splash Page Tips button is clicked', async () => {
  //   const { getByRole, getByText } = render(<CaptivePortalFormComp />);
  //   fireEvent.click(getByText('Externally Hosted'));
  //   fireEvent.click(
  //     getByRole('button', {
  //       name: /show splash page tips/i,
  //     })
  //   );

  //   await waitFor(() => {
  //     expect(
  //       getByText(
  //         'Add your external Splash Page URL into the field above. Save your configuration once satisfied.'
  //       )
  //     ).toBeVisible();
  //   });
  // });

  it('body content of Splash Page Content should change when User Acceptance Policy Text and Login Success Text button are cicked', async () => {
    const { getByRole, getByText, getByTestId } = render(<CaptivePortalFormComp />);

    fireEvent.click(getByText('Splash Page Content'));

    fireEvent.click(
      getByRole('button', {
        name: /login success text/i,
      })
    );
    expect(getByTestId('successPageMarkdownText')).toHaveDisplayValue('Welcome to the network');

    fireEvent.click(
      getByRole('button', {
        name: /user acceptance policy text/i,
      })
    );
    expect(getByTestId('userAcceptancePolicy')).toHaveDisplayValue(
      'Use this network at your own risk. No warranty of any kind.'
    );
  });

  it('error should be visible if input value exceeds length of 253 characters ', async () => {
    const { getByPlaceholderText, getByText } = render(<CaptivePortalFormComp />);
    const whileListInput = getByPlaceholderText('Hostname...');
    fireEvent.change(whileListInput, {
      target: {
        value: `${faker.helpers.repeatString('test.com', 50)}`,
      },
    });

    await waitFor(() => {
      expect(getByText('Hostnames may not exceed 253 characters in length.')).toBeVisible();
    });
  });

  it('error should be visible if input value is unrecognized and invalid', async () => {
    const { getByPlaceholderText, getByText } = render(<CaptivePortalFormComp />);
    const whileListInput = getByPlaceholderText('Hostname...');

    fireEvent.change(whileListInput, {
      target: {
        value: 'ads#$%.RE3L',
      },
    });
    await waitFor(() => {
      expect(getByText('Unrecognized hostname.')).toBeVisible();
    });
  });

  it('should work when input value for Configure is valid', async () => {
    const { getByPlaceholderText, queryByText } = render(<CaptivePortalFormComp />);
    const whileListInput = getByPlaceholderText('Hostname...');

    fireEvent.change(whileListInput, {
      target: {
        value: 'googl.*',
      },
    });

    await waitFor(() => {
      expect(
        queryByText('The * wildcard may not be combined with other characters in a hostname label.')
      ).not.toBeInTheDocument();
    });
    fireEvent.change(whileListInput, {
      target: {
        value: '192.168.1.1-192.168.1.1',
      },
    });
    await waitFor(() => {
      expect(
        queryByText('The * wildcard may not be combined with other characters in a hostname label.')
      ).not.toBeInTheDocument();
    });
  });

  it('error should be visible if Hostname label cotain * wildcard', async () => {
    const { getByPlaceholderText, getByText } = render(<CaptivePortalFormComp />);
    const whileListInput = getByPlaceholderText('Hostname...');

    fireEvent.change(whileListInput, {
      target: {
        value: 'googl.*com dolor sit amet, consectetur adipiscing elit',
      },
    });

    await waitFor(() => {
      expect(
        getByText('The * wildcard may not be combined with other characters in a hostname label.')
      ).toBeVisible();
    });
  });

  it('error should be visible if Second-level domain labels contain * wildcard', async () => {
    const { getByPlaceholderText, getByText } = render(<CaptivePortalFormComp />);
    const whileListInput = getByPlaceholderText('Hostname...');

    fireEvent.change(whileListInput, {
      target: {
        value:
          'L*orem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id magna vulputate, semper est nec, commodo nunc',
      },
    });

    await waitFor(() => {
      expect(getByText('Second-level domain labels may not contain a * wildcard.')).toBeVisible();
    });
  });

  it('error should be visible if Hostname Label greater than 63 ', async () => {
    const { getByPlaceholderText, getByText } = render(<CaptivePortalFormComp />);
    const whileListInput = getByPlaceholderText('Hostname...');

    fireEvent.change(whileListInput, {
      target: {
        value:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id magna vulputate, semper est nec, commodo nunc. Class aptent taciti sociosqu ad litora torquent per conubia nostra.ipsm',
      },
    });

    await waitFor(() => {
      expect(getByText('Hostname labels must be between 1 and 63 characters long.')).toBeVisible();
    });
  });

  it('error should be visible if input value does`t have subdomain ', async () => {
    const { getByPlaceholderText, getByText } = render(<CaptivePortalFormComp />);
    const whileListInput = getByPlaceholderText('Hostname...');

    fireEvent.change(whileListInput, {
      target: { value: 'a b c' },
    });

    await waitFor(() => {
      expect(
        getByText('Hostnames must have at least 1 subdomain label. e.g. mycompany.com')
      ).toBeVisible();
    });
  });

  it('error should be visible if input value in whitelist is already exists', async () => {
    const { getByPlaceholderText, getByText, getAllByRole } = render(<CaptivePortalFormComp />);
    const whileListInput = getByPlaceholderText('Hostname...');

    const hostname = faker.internet.domainName();
    fireEvent.change(whileListInput, {
      target: {
        value: hostname,
      },
    });
    fireEvent.click(getAllByRole('button', 'Add')[7]);
    await waitFor(() => {
      expect(getByText(hostname)).toBeVisible();
    });

    fireEvent.change(whileListInput, {
      target: {
        value: hostname,
      },
    });

    await waitFor(() => {
      expect(getByText('This item already exists in the whitelist.')).toBeVisible();
    });
  });

  it('error should be visible when new item is added and whitelist have already 32 items in the list', async () => {
    for (let i = 0; i < 40; i += 1) {
      mockCaptivePortal.details.walledGardenAllowlist.push(faker.internet.domainName());
    }

    const { getByPlaceholderText, queryByText } = render(<CaptivePortalFormComp />);
    const whileListInput = getByPlaceholderText('Hostname...');

    fireEvent.change(whileListInput, {
      target: {
        value: faker.internet.domainName(),
      },
    });

    await waitFor(() => {
      expect(queryByText('Unable to add more than 32 items to the whitelist.')).toBeInTheDocument();
    });
  });

  it('error should be visible if combine length of characters of all items exceeds 2,000 characters ', async () => {
    mockCaptivePortal.details.walledGardenAllowlist = [];

    for (let i = 0; i < 20; i += 1) {
      let value;
      for (let j = 0; j < 100; j += 1) {
        value += faker.internet.domainName();
      }
      mockCaptivePortal.details.walledGardenAllowlist.push(value);
    }

    const { getByPlaceholderText, queryByText } = render(<CaptivePortalFormComp />);
    const whileListInput = getByPlaceholderText('Hostname...');

    fireEvent.change(whileListInput, {
      target: {
        value: faker.internet.domainName(),
      },
    });

    await waitFor(() => {
      expect(
        queryByText('Unable to exceed 2,000 characters for all combined whitelist items.')
      ).toBeInTheDocument();
    });
  });

  it('click on add button should add item to the whitelist', async () => {
    mockCaptivePortal.details.walledGardenAllowlist = [];

    const { getByPlaceholderText, getByText, getAllByRole } = render(<CaptivePortalFormComp />);
    const whileListInput = getByPlaceholderText('Hostname...');

    const hostname = faker.internet.domainName();
    fireEvent.change(whileListInput, {
      target: {
        value: hostname,
      },
    });
    fireEvent.click(getAllByRole('button', 'Add')[7]);
    await waitFor(() => {
      expect(getByText(hostname)).toBeVisible();
    });
  });

  it('uploading a logo image in other than png/jpg format should display error message', async () => {
    const { getByTestId, getAllByText } = render(<CaptivePortalFormComp />);

    Object.defineProperty(file, 'type', { value: 'image/gif' });

    const input = getByTestId('logoFile');
    userEvent.upload(input, file);

    await waitFor(() => {
      expect(getAllByText('You can only upload a JPG/PNG file!')[0]).toBeVisible();
    });
  });

  it('uploading a logo image in png format should add image on screen', async () => {
    const { getByTestId, getByText } = render(<CaptivePortalFormComp />);

    const input = getByTestId('logoFile');
    userEvent.upload(input, file);
    await (() => {
      expect(getByText(file.name)).toBeInTheDocument();
      expect(input.files).toHaveLength(1);
    });
  });

  it('uploading a logo image in jpg format should add image on screen', async () => {
    const { getByTestId, getByText } = render(<CaptivePortalFormComp />);

    const input = getByTestId('logoFile');
    userEvent.upload(input, file);
    await waitFor(() => {
      expect(getByText(file.name)).toBeInTheDocument();
      expect(input.files).toHaveLength(1);
    });
  });

  it('uploading a logo image with file size greater then 400KB should display error message', async () => {
    const { getByTestId, getAllByText } = render(<CaptivePortalFormComp />);

    Object.defineProperty(file, 'size', { value: 2236188 });

    const input = getByTestId('logoFile');
    userEvent.upload(input, file);

    await waitFor(() => {
      expect(getAllByText('Image must be smaller than 400KB!')[0]).toBeVisible();
    });
  });

  it('deleting uploaded logo image should remove image from screen', async () => {
    const { getByTestId, getByRole, getByText, queryByText } = render(<CaptivePortalFormComp />);

    const input = getByTestId('logoFile');
    userEvent.upload(input, file);

    await waitFor(() => {
      expect(getByText(file.name)).toBeInTheDocument();
      expect(input.files).toHaveLength(1);
    });

    fireEvent.click(getByRole('button', { name: /remove file/i }));

    await waitFor(() => {
      expect(queryByText(file.name)).not.toBeInTheDocument();
    });
  });

  it('uploading a background image in other than png/jpg format should display error message', async () => {
    const { getByTestId, getAllByText } = render(<CaptivePortalFormComp />);

    Object.defineProperty(file, 'type', { value: 'image/gif' });

    const input = getByTestId('backgroundFile');
    userEvent.upload(input, file);

    await waitFor(() => {
      expect(getAllByText('You can only upload a JPG/PNG file!')[0]).toBeVisible();
    });
  });

  it('uploading a background image in png format should add image on screen', async () => {
    const { getByTestId, getByText } = render(<CaptivePortalFormComp />);

    const input = getByTestId('backgroundFile');
    userEvent.upload(input, file);
    await waitFor(() => {
      expect(getByText(file.name)).toBeInTheDocument();
      expect(input.files).toHaveLength(1);
    });
  });

  it('uploading a background image in jpg format should add image on screen', async () => {
    const { getByTestId, getByText } = render(<CaptivePortalFormComp />);

    const input = getByTestId('backgroundFile');
    userEvent.upload(input, file);
    await waitFor(() => {
      expect(getByText(file.name)).toBeInTheDocument();
      expect(input.files).toHaveLength(1);
    });
  });

  it('uploading a backgroundFile image with file size greater then 400KB should display error message', async () => {
    const { getByTestId, getAllByText } = render(<CaptivePortalFormComp />);

    Object.defineProperty(file, 'size', { value: 2236188 });

    const input = getByTestId('backgroundFile');
    userEvent.upload(input, file);

    await waitFor(() => {
      expect(getAllByText('Image must be smaller than 400KB!')[0]).toBeVisible();
    });
  });

  it('deleting uploaded background image should remove image from screen', async () => {
    const { getByTestId, getByRole, getByText, queryByText } = render(<CaptivePortalFormComp />);

    const input = getByTestId('backgroundFile');
    userEvent.upload(input, file);

    await waitFor(() => {
      expect(getByText(file.name)).toBeInTheDocument();
      expect(input.files).toHaveLength(1);
    });

    fireEvent.click(getByRole('button', { name: /remove file/i }));

    await waitFor(() => {
      expect(queryByText(file.name)).not.toBeInTheDocument();
    });
  });

  it('clicking the preview image button should show the image in a modal with its image title', async () => {
    const { getByTestId, getByRole, getByText, queryByText } = render(<CaptivePortalFormComp />);

    const input = getByTestId('backgroundFile');
    userEvent.upload(input, file);

    await waitFor(() => {
      expect(getByText(file.name)).toBeInTheDocument();
      expect(input.files).toHaveLength(1);
    });

    fireEvent.click(getByRole('link', { name: /preview file/i }));

    const title = queryByText(file.name, { selector: 'div' });
    await waitFor(() => {
      expect(title).toBeVisible();
    });

    fireEvent.click(getByRole('button', { name: /close/i }));

    await waitFor(() => {
      expect(title).not.toBeVisible();
    });
  });

  it('Changing the authentication setting to Captive Portal User List should show the user list card', async () => {
    const { getByLabelText, getByText } = render(<CaptivePortalFormComp />);

    const authentication = getByLabelText('Authentication');
    fireEvent.keyDown(authentication, DOWN_ARROW);
    await waitForElement(() => getByText('Captive Portal User List'));
    fireEvent.click(getByText('Captive Portal User List'));

    await waitFor(() => {
      expect(getByText('User List')).toBeInTheDocument();
    });
  });

  it('Deleted user should not be shown in user list table after being deleted', async () => {
    const { getByLabelText, getByText, getByRole } = render(<CaptivePortalFormComp />);

    const authentication = getByLabelText('Authentication');
    fireEvent.keyDown(authentication, DOWN_ARROW);
    await waitForElement(() => getByText('Captive Portal User List'));
    fireEvent.click(getByText('Captive Portal User List'));

    const button = getByRole('button', {
      name: `delete-${mockCaptivePortal.details.userList[0].username}`,
    });

    fireEvent.click(button);

    fireEvent.click(getByRole('button', { name: `Delete` }));

    await waitFor(() => {
      expect(button).not.toBeInTheDocument();
    });
  });

  it('Changing the authentication setting to Radius should show the Radius card', async () => {
    const { getByLabelText, getByText } = render(<CaptivePortalFormComp />);

    const authentication = getByLabelText('Authentication');
    fireEvent.keyDown(authentication, DOWN_ARROW);
    await waitForElement(() => getByText('RADIUS'));
    fireEvent.click(getByText('RADIUS'));

    await waitFor(() => {
      expect(getByLabelText('Service')).toBeInTheDocument();
    });
  });

  it('Radius card should show radius profiles and authentication modes', async () => {
    const { getAllByLabelText, getByText, getAllByText } = render(<CaptivePortalFormComp />);

    const authentication = getAllByLabelText('Authentication')[0];
    fireEvent.keyDown(authentication, DOWN_ARROW);
    await waitForElement(() => getByText('RADIUS'));
    fireEvent.click(getByText('RADIUS'));

    const radiusAuthentication = getAllByLabelText('Authentication')[1];
    fireEvent.keyDown(radiusAuthentication, DOWN_ARROW);
    await waitForElement(() => getByText('Password (PAP)'));
    fireEvent.click(getByText('Password (PAP)'));

    const radiusService = getAllByLabelText('Service')[0];
    fireEvent.keyDown(radiusService, DOWN_ARROW);
    await waitForElement(() => getAllByText(mockCaptivePortal.radiusProfiles[0].name)[0]);
    fireEvent.click(getAllByText(mockCaptivePortal.radiusProfiles[0].name)[0]);

    expect(getAllByText('Password (PAP)')[0]).toBeInTheDocument();
    expect(getAllByText(mockCaptivePortal.radiusProfiles[0].name)[0]).toBeInTheDocument();
  });

  it('Add User button press should show Add User modal', async () => {
    const { getByLabelText, getByText, getByRole } = render(<CaptivePortalFormComp />);

    const authentication = getByLabelText('Authentication');
    fireEvent.keyDown(authentication, DOWN_ARROW);
    await waitForElement(() => getByText('Captive Portal User List'));
    fireEvent.click(getByText('Captive Portal User List'));

    fireEvent.click(getByRole('button', { name: /add user/i }));

    expect(getByText('Add User', { selector: 'div' })).toBeVisible();
  });

  it('Edit User button press should show Edit User modal', async () => {
    const { getByLabelText, getByText, getByRole } = render(<CaptivePortalFormComp />);

    const authentication = getByLabelText('Authentication');
    fireEvent.keyDown(authentication, DOWN_ARROW);
    await waitForElement(() => getByText('Captive Portal User List'));
    fireEvent.click(getByText('Captive Portal User List'));

    fireEvent.click(
      getByRole('button', { name: `edit-${mockCaptivePortal.details.userList[0].username}` })
    );
    expect(getByText('Edit User')).toBeVisible();
  });

  it('Delete User button press should show Delete User modal', async () => {
    const { getByLabelText, getByText, getByRole } = render(<CaptivePortalFormComp />);

    const authentication = getByLabelText('Authentication');
    fireEvent.keyDown(authentication, DOWN_ARROW);
    await waitForElement(() => getByText('Captive Portal User List'));
    fireEvent.click(getByText('Captive Portal User List'));

    fireEvent.click(
      getByRole('button', { name: `delete-${mockCaptivePortal.details.userList[0].username}` })
    );

    const paragraph = getByText(/Are you sure you want to delete the user:/i);
    expect(paragraph).toBeVisible();
    expect(
      within(paragraph).getByText(mockCaptivePortal.details.userList[0].username)
    ).toBeVisible();
  });

  it('Cancel button press should hide Add User modal', async () => {
    const { getByLabelText, getByText, getByRole, queryByText } = render(<CaptivePortalFormComp />);

    const authentication = getByLabelText('Authentication');
    fireEvent.keyDown(authentication, DOWN_ARROW);
    await waitForElement(() => getByText('Captive Portal User List'));
    fireEvent.click(getByText('Captive Portal User List'));

    fireEvent.click(getByRole('button', { name: /add user/i }));

    const paragraph = getByText('Add User', { selector: 'div' });
    expect(paragraph).toBeVisible();
    fireEvent.click(getByRole('button', { name: `Cancel` }));
    await waitFor(() => {
      expect(queryByText('Add User', { selector: 'div' })).not.toBeInTheDocument();
    });
  });

  it('Cancel button press should hide Edit User modal', async () => {
    const { getByLabelText, getByText, getByRole, queryByText } = render(<CaptivePortalFormComp />);

    const authentication = getByLabelText('Authentication');
    fireEvent.keyDown(authentication, DOWN_ARROW);
    await waitForElement(() => getByText('Captive Portal User List'));
    fireEvent.click(getByText('Captive Portal User List'));

    fireEvent.click(
      getByRole('button', { name: `edit-${mockCaptivePortal.details.userList[0].username}` })
    );
    expect(getByText('Edit User')).toBeVisible();
    fireEvent.click(getByRole('button', { name: /Cancel/i }));
    await waitFor(() => {
      expect(queryByText('Edit User')).not.toBeInTheDocument();
    });
  });

  it('Cancel button press should hide Delete User modal', async () => {
    const { getByLabelText, getByText, getByRole, queryByText } = render(<CaptivePortalFormComp />);

    const authentication = getByLabelText('Authentication');
    fireEvent.keyDown(authentication, DOWN_ARROW);
    await waitForElement(() => getByText('Captive Portal User List'));
    fireEvent.click(getByText('Captive Portal User List'));

    fireEvent.click(
      getByRole('button', { name: `delete-${mockCaptivePortal.details.userList[0].username}` })
    );

    const paragraph = getByText(/Are you sure you want to delete the user:/i);
    expect(paragraph).toBeVisible();
    expect(
      within(paragraph).getByText(mockCaptivePortal.details.userList[0].username)
    ).toBeVisible();

    fireEvent.click(getByRole('button', { name: /Cancel/i }));
    await waitFor(() => {
      expect(queryByText(/Are you sure you want to delete the user:/i)).not.toBeInTheDocument();
    });
  });

  it('Correct form submission on Add User Modal', async () => {
    const { getByLabelText, getByText, getByRole } = render(<CaptivePortalFormComp />);

    const { username, password, firstname, lastname } = buildUserForm();

    const authentication = getByLabelText('Authentication');
    fireEvent.keyDown(authentication, DOWN_ARROW);
    await waitFor(() => {
      getByText('Captive Portal User List');
    });
    fireEvent.click(getByText(/captive portal user list/i));

    fireEvent.click(getByRole('button', { name: /add user/i }));

    expect(getByText(/add user/i, { selector: 'div' })).toBeVisible();

    userEvent.type(getByRole('textbox', { name: /username/i }), username);
    userEvent.type(getByLabelText(/password/i), password);
    userEvent.type(getByRole('textbox', { name: /first name/i }), firstname);
    userEvent.type(getByRole('textbox', { name: /last name/i }), lastname);

    fireEvent.click(
      getByRole('button', {
        name: /save/i,
      })
    );

    await waitFor(() => {
      expect(getByRole('cell', { name: username })).toBeInTheDocument();
    });
  }, 10000);

  it('Correct form submission on Edit User Modal', async () => {
    const { getByLabelText, getByText, getByRole } = render(<CaptivePortalFormComp />);

    const authentication = getByLabelText('Authentication');
    fireEvent.keyDown(authentication, DOWN_ARROW);
    await waitForElement(() => getByText('Captive Portal User List'));
    fireEvent.click(getByText('Captive Portal User List'));

    fireEvent.click(
      getByRole('button', { name: `edit-${mockCaptivePortal.details.userList[0].username}` })
    );
    const paragraph = getByText('Edit User');
    expect(paragraph).toBeVisible();

    const testUsername = 'test-username';

    fireEvent.change(getByLabelText('Username'), { target: { value: testUsername } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.change(getByLabelText('First Name'), { target: { value: 'firstname' } });
    fireEvent.change(getByLabelText('Last Name'), { target: { value: 'lastname' } });

    fireEvent.click(getByRole('button', { name: `Save` }));
    await waitFor(() => {
      expect(getByText(testUsername)).toBeInTheDocument();
    });
  });

  it('Delete button on Delete Modal should delete user', async () => {
    const { getByLabelText, getByText, getByRole } = render(<CaptivePortalFormComp />);

    const authentication = getByLabelText('Authentication');
    fireEvent.keyDown(authentication, DOWN_ARROW);
    await waitForElement(() => getByText('Captive Portal User List'));
    fireEvent.click(getByText('Captive Portal User List'));

    const button = getByRole('button', {
      name: `delete-${mockCaptivePortal.details.userList[0].username}`,
    });

    fireEvent.click(button);

    const paragraph = getByText(/Are you sure you want to delete the user:/i);
    expect(paragraph).toBeVisible();
    expect(
      within(paragraph).getByText(mockCaptivePortal.details.userList[0].username)
    ).toBeVisible();

    fireEvent.click(getByRole('button', { name: 'Delete' }));

    await waitFor(() => {
      expect(button).not.toBeInTheDocument();
    });
  });
});
