import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import styles from './index.module.scss';

const PopoverMenuContent = ({ locationType, setAddModal, setEditModal, setDeleteModal }) => {
  return (
    <div className={styles.popOver}>
      {locationType !== 'FLOOR' && (
        <Button
          onClick={() => {
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
              setEditModal(true);
            }}
          >
            Edit Location
          </Button>
          <Button>Bulk Edit APs</Button>
          <Button
            onClick={() => {
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
