import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Switch, Form, Input, Button } from 'antd';
import LocaleItem from 'components/LocaleItem';
import PasspointLocaleTable from 'components/PasspointLocaleTable';
import Modal from 'components/Modal';
import FormModal from '../FormModal';

const { Item } = Form;

const OsuForm = ({ osuDetails, onSubmit, removeItem }) => {
  const [osuEnabled, setOsuEnabled] = useState(
    osuDetails?.osuServerUri !== null && osuDetails?.osuServerUri !== ''
  );

  const [nameModal, setNameModal] = useState(false);
  const [descModal, setDescModal] = useState(false);
  const [iconModal, setIconModal] = useState(false);

  const [iconForm] = Form.useForm();

  const handleCloseModal = index => {
    if (index === 'osuFriendlyName') {
      setNameModal(false);
    }
    if (index === 'osuServiceDescription') {
      setDescModal(false);
    }
    if (index === 'osuIconList') {
      iconForm.resetFields();
      setIconModal(false);
    }
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 15 },
  };

  const handleAddIcon = () => {
    iconForm.validateFields().then(values => {
      onSubmit(values, 'osuIconList');
      iconForm.resetFields();
      setIconModal(false);
    });
  };

  return (
    <Card
      title={
        <>
          Online Sign Up (OSU){' '}
          <Switch
            checkedChildren="Enabled"
            unCheckedChildren="Disabled"
            style={{ marginLeft: '1rem' }}
            onChange={() => setOsuEnabled(!osuEnabled)}
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
              <Button onClick={() => setNameModal(true)} data-testid="osuName">
                Add
              </Button>
            }
          >
            <PasspointLocaleTable
              tableData={osuDetails?.osuFriendlyName}
              dataIndex="osuFriendlyName"
              removeName={removeItem}
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
              <Button onClick={() => setDescModal(true)} data-testid="osuDesc">
                Add
              </Button>
            }
          >
            <PasspointLocaleTable
              tableData={osuDetails?.osuServiceDescription}
              dataIndex="osuServiceDescription"
              removeName={removeItem}
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
              <Button onClick={() => setIconModal(true)} data-testid="osuIcon">
                Add
              </Button>
            }
          >
            <PasspointLocaleTable
              tableData={osuDetails?.osuIconList}
              dataIndex="osuIconList"
              removeName={removeItem}
            />
          </Card>

          <Item name="osuIconList" noStyle>
            <Modal
              onSuccess={handleAddIcon}
              onCancel={() => handleCloseModal('osuIconList')}
              title="Add Icon"
              visible={iconModal}
              content={
                <Form {...layout} form={iconForm}>
                  <Item
                    name="imageUrl"
                    label="Url:"
                    rules={[
                      {
                        required: true,
                        message: 'Url field cannot be empty',
                      },
                    ]}
                  >
                    <Input placeholder="Enter the image url" />
                  </Item>
                  <LocaleItem name="iconLocale" />
                </Form>
              }
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
};

OsuForm.defaultProps = {
  osuDetails: {},
};

export default OsuForm;
