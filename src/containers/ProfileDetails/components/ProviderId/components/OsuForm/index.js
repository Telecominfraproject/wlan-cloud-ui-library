import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Checkbox } from 'antd';
import PasspointLocaleTable from 'components/PasspointLocaleTable';
import { Switch, Input, RoleProtectedBtn, CheckboxGroup } from 'components/WithRoles';

import FormModal from '../FormModal';

const { Item } = Form;

const OsuForm = ({ osuDetails, onSubmit, removeItem, handleOnFormChange }) => {
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
                message: 'Please enter a Server URI',
              },
              {
                type: 'url',
                message: 'Please enter Server URI in the format http://... or https://...',
              },
            ]}
          >
            <Input placeholder="Enter Server URI" />
          </Item>

          <Item
            name="osuNaiStandalone"
            label="NAI Standalone"
            rules={[
              {
                required: true,
                message: 'Please enter a NAI Standalone',
              },
            ]}
            tooltip="NAI Standalone specifies the OSU NAI value for OSEN authentication when using a standalone OSU BSS"
          >
            <Input placeholder="Enter NAI Standalone" />
          </Item>

          <Item
            name="osuNaiShared"
            label="NAI Shared"
            rules={[
              {
                required: true,
                message: 'Please enter a NAI Shared',
              },
              {
                max: 256,
                message: 'NAI Shared cannot be more than 256 characters',
              },
            ]}
            tooltip="NAI Shared specifies the OSU NAI value for OSEN authentication when using a shared BSS (Single SSID) for OSU"
          >
            <Input placeholder="Enter NAI Shared" />
          </Item>

          <Item name="osuMethodList" label="Method List">
            <CheckboxGroup>
              <Checkbox key="soap_xml_spp" value={1}>
                SOAP XML SPP
              </Checkbox>
              <Checkbox key="oma_dm" value={0}>
                OMA DM
              </Checkbox>
            </CheckboxGroup>
          </Item>

          <Card
            title="Name:"
            bordered={false}
            extra={
              <RoleProtectedBtn onClick={() => setNameModal(true)} data-testid="osuName">
                Add
              </RoleProtectedBtn>
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
              <RoleProtectedBtn onClick={() => setDescModal(true)} data-testid="osuDesc">
                Add
              </RoleProtectedBtn>
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
              <RoleProtectedBtn onClick={() => setIconModal(true)} data-testid="osuIcon">
                Add
              </RoleProtectedBtn>
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
