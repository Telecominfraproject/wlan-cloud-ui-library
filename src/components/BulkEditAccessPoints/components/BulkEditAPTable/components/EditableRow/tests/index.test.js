import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from 'tests/utils';
import { Form } from 'antd';
import { EditableRow, EditableContext } from '..';

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
  index: 0,
};

describe('<EditableRow />', () => {
  it('Should work with default props', () => {
    const EditableRowComp = () => {
      const [form] = Form.useForm();
      return (
        <div form={form}>
          <EditableContext.Provider value={form}>
            <EditableRow {...mockProps} />
          </EditableContext.Provider>
        </div>
      );
    };
    render(<EditableRowComp />);
  });
});
