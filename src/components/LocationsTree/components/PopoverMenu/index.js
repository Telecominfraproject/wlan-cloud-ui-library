import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Popover } from 'antd';

import PopoverMenuContent from '../PopoverMenuContent';

const PopoverMenu = ({
  children,
  locationId,
  locationType,
  setAddModal,
  setEditModal,
  setDeleteModal,
  setApModal,
}) => {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = state => {
    setVisible(state);
  };

  return (
    <Popover
      visible={visible}
      onVisibleChange={handleVisibleChange}
      content={
        <PopoverMenuContent
          locationId={locationId}
          locationType={locationType}
          hide={() => setVisible(false)}
          setAddModal={setAddModal}
          setEditModal={setEditModal}
          setDeleteModal={setDeleteModal}
          setApModal={setApModal}
        />
      }
      placement="rightTop"
      trigger={['click', 'contextMenu']}
      destroyTooltipOnHide
    >
      {children}
    </Popover>
  );
};

PopoverMenu.propTypes = {
  children: PropTypes.node.isRequired,
  setEditModal: PropTypes.func,
  setAddModal: PropTypes.func,
  setDeleteModal: PropTypes.func,
  setApModal: PropTypes.func,
  locationType: PropTypes.string,
  locationId: PropTypes.string,
};

PopoverMenu.defaultProps = {
  locationType: null,
  locationId: '0',
  setEditModal: () => {},
  setAddModal: () => {},
  setDeleteModal: () => {},
  setApModal: () => {},
};

export default PopoverMenu;
