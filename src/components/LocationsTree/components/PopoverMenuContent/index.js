import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import styles from './index.module.scss';

const PopoverMenuContent = ({ locationType, setAddModal, setEditModal, setDeleteModal, hide }) => {
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
          <Button>Bulk Edit APs</Button>
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
  locationType: PropTypes.string,
};

PopoverMenuContent.defaultProps = {
  locationType: null,
  setEditModal: () => {},
  setAddModal: () => {},
  setDeleteModal: () => {},
};

export default PopoverMenuContent;
