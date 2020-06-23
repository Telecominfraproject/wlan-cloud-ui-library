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
  setBulkEditApIds,
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
          setBulkEditApIds={setBulkEditApIds}
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
  setBulkEditApIds: PropTypes.func.isRequired,
  locationType: PropTypes.string,
  locationId: PropTypes.number.isRequired,
};

PopoverMenu.defaultProps = {
  locationType: null,
  setEditModal: () => {},
  setAddModal: () => {},
  setDeleteModal: () => {},
};

export default PopoverMenu;
