import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import styles from './index.module.scss';

const PopoverMenuContent = ({
  locationId,
  locationType,
  setAddModal,
  setEditModal,
  setDeleteModal,
  setBulkEditApIds,
  hide,
}) => {
  const history = useHistory();

  const handleBulkEdit = () => {
    setBulkEditApIds(locationId);
    history.push(`/network/access-points/bulk-edit/${locationId}`);
  };

  return (
    <div className={styles.popOver}>
      {locationType !== 'FLOOR' && (
        <Button
          onClick={() => {
            hide();
            setAddModal(true);
          }}
        >
          Add Location
        </Button>
      )}
      {locationType !== 'NETWORK' && (
        <>
          <Button
            onClick={() => {
              hide();
              setEditModal(true);
            }}
          >
            Edit Location
          </Button>
          <Button
            onClick={() => {
              hide();
              handleBulkEdit();
            }}
          >
            Bulk Edit APs
          </Button>
          <Button
            onClick={() => {
              hide();
              setDeleteModal(true);
            }}
          >
            Delete Location
          </Button>
        </>
      )}
    </div>
  );
};
PopoverMenuContent.propTypes = {
  hide: PropTypes.func.isRequired,
  setEditModal: PropTypes.func,
  setAddModal: PropTypes.func,
  setDeleteModal: PropTypes.func,
  setBulkEditApIds: PropTypes.isRequired,
  locationType: PropTypes.string,
  locationId: PropTypes.number.isRequired,
};

PopoverMenuContent.defaultProps = {
  locationType: null,
  setEditModal: () => {},
  setAddModal: () => {},
  setDeleteModal: () => {},
};

export default PopoverMenuContent;
