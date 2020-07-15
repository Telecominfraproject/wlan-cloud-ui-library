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
  setApModal,
  hide,
}) => {
  const history = useHistory();

  const handleBulkEdit = () => {
    history.push(`/network/access-points/bulk-edit/${locationId}`);
  };

  return (
    <div className={styles.popOver}>
      <Button
        onClick={() => {
          hide();
          setApModal(true);
        }}
      >
        Add Access Point
      </Button>
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
  setApModal: PropTypes.func,
  locationType: PropTypes.string,
  locationId: PropTypes.number,
};

PopoverMenuContent.defaultProps = {
  locationType: null,
  locationId: 0,
  setEditModal: () => {},
  setAddModal: () => {},
  setDeleteModal: () => {},
  setApModal: () => {},
};

export default PopoverMenuContent;
