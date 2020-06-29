import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, waitFor } from '@testing-library/react';
import { render } from 'tests/utils';
import { Form } from 'antd';
import { EditableCell } from '..';
import { EditableContext } from '../../EditableRow';

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
  title: '',
  editable: false,
  dataIndex: '',
  record: {},
  handleSave: () => {},
};
describe('<EditableCell />', () => {
  afterEach(cleanup);

  it('Ap data should be displayed in editable form in ant form element, when table cell is clicked.', () => {
    const EditableCellComp = () => {
      const [form] = Form.useForm();
      return (
        <div form={form}>
          <EditableContext.Provider value={form}>
            <EditableCell {...mockProps} editable />
          </EditableContext.Provider>
        </div>
      );
    };
    const { getByTestId } = render(<EditableCellComp />);
    const tableCell = getByTestId('bulkEditTableCell');
    fireEvent.click(tableCell);
    const formElement = getByTestId('bulkEditFormElement');
    expect(formElement).toBeInTheDocument();
  });

  it('handleSave should not be called when input filed is empty and Enter key is pressed', async () => {
    const handleSaveSpy = jest.fn();
    const EditableCellComp = () => {
      const [form] = Form.useForm();
      return (
        <div form={form}>
          <EditableContext.Provider value={form}>
            <EditableCell {...mockProps} editable handleSave={handleSaveSpy} />
          </EditableContext.Provider>
        </div>
      );
    };
    const { getByTestId } = render(<EditableCellComp />);
    const tableCell = getByTestId('bulkEditTableCell');
    fireEvent.click(tableCell);
    const input = getByTestId('bulkEditFormInput');
    fireEvent.change(input, { target: { value: '' } });
    expect(input.value).toBe('');
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });
    await waitFor(() => {
      expect(handleSaveSpy).not.toHaveBeenCalled();
    });
  });
});
