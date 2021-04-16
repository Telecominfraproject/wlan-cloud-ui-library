import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Button } from 'antd';
import { Switch, Input } from 'components/WritableInputs';
import PasspointLocaleTable from 'components/PasspointLocaleTable';
import { useWritableInput } from 'contexts/InputDisabledContext';
import FormModal from '../FormModal';

const { Item } = Form;

const OsuForm = ({ osuDetails, onSubmit, removeItem, handleOnFormChange }) => {
  const { roleIsWritable } = useWritableInput();
  const [osuEnabled, setOsuEnabled] = useState(
    osuDetails?.osuServerUri !== null && osuDetails?.osuServerUri !== ''
  );

  const [nameModal, setNameModal] = useState(false);
  const [descModal, setDescModal] = useState(false);
  const [iconModal, setIconModal] = useState(false);

  const handleCloseModal = index => {
    if (index === 'osuFriendlyName') {
      setNameModal(false);
    }
    if (index === 'osuServiceDescription') {
      setDescModal(false);
    }
    if (index === 'osuIconList') {
      setIconModal(false);
    }
  };

  return (
    <Card
      title={
        <>
          Online Sign Up (OSU)
          <Switch
            checkedChildren="Enabled"
            unCheckedChildren="Disabled"
            style={{ marginLeft: '1rem' }}
            onChange={() => {
              setOsuEnabled(!osuEnabled);
              handleOnFormChange();
            }}
            defaultChecked={osuEnabled}
            data-testid="switchToggle"
          />
        </>
      }
      bodyStyle={!osuEnabled ? { padding: '0' } : {}}
    >
      {osuEnabled && (
        <>
          <Item
            name="osuServerUri"
            label="Server URI:"
            rules={[
              {
                required: true,
                message: 'Server uri field cannot be empty',
              },
            ]}
          >
            <Input placeholder="Enter a value for server uri" />
          </Item>

          <Card
            title="Name:"
            bordered={false}
            extra={
              roleIsWritable && (
                <Button onClick={() => setNameModal(true)} data-testid="osuName">
                  Add
                </Button>
              )
            }
          >
            <PasspointLocaleTable
              tableData={osuDetails?.osuFriendlyName}
              dataIndex="osuFriendlyName"
              removeRow={removeItem}
            />
          </Card>
          <Item name="osuFriendlyName" noStyle>
            <FormModal
              title="Add Name"
              fieldName="osuFriendlyName"
              onSubmit={onSubmit}
              visible={nameModal}
              closeModal={handleCloseModal}
            />
          </Item>

          <Card
            title="Description:"
            bordered={false}
            extra={
              roleIsWritable && (
                <Button onClick={() => setDescModal(true)} data-testid="osuDesc">
                  Add
                </Button>
              )
            }
          >
            <PasspointLocaleTable
              tableData={osuDetails?.osuServiceDescription}
              dataIndex="osuServiceDescription"
              removeRow={removeItem}
            />
          </Card>
          <Item name="osuServiceDescription" noStyle>
            <FormModal
              title="Add Description"
              fieldName="osuServiceDescription"
              onSubmit={onSubmit}
              visible={descModal}
              closeModal={handleCloseModal}
            />
          </Item>

          <Card
            title="Icons:"
            bordered={false}
            extra={
              roleIsWritable && (
                <Button onClick={() => setIconModal(true)} data-testid="osuIcon">
                  Add
                </Button>
              )
            }
          >
            <PasspointLocaleTable
              tableData={osuDetails?.osuIconList}
              dataIndex="osuIconList"
              removeRow={removeItem}
              rowKey="imageUrl"
            />
          </Card>

          <Item name="osuIconList" noStyle>
            <FormModal
              title="Add Icon"
              fieldName="osuIconList"
              onSubmit={onSubmit}
              visible={iconModal}
              closeModal={handleCloseModal}
            />
          </Item>
        </>
      )}
    </Card>
  );
};

OsuForm.propTypes = {
  osuDetails: PropTypes.instanceOf(Object),
  onSubmit: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  handleOnFormChange: PropTypes.func,
};

OsuForm.defaultProps = {
  osuDetails: {},
  handleOnFormChange: () => {},
};

export default OsuForm;
