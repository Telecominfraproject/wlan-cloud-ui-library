import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import styles from './index.module.scss';

const PopoverMenuContent = ({ locationData, setAddModal, setEditModal, setDeleteModal }) => {
  return (
    <ul className={styles.popOver}>
      {locationData && locationData.locationType !== 'FLOOR' && (
        <li>
          <Button
            key={0}
            role="button"
            onKeyPress={() => {}}
            onClick={() => {
              setAddModal(true);
            }}
          >
            Add Location
          </Button>
        </li>
      )}
      <li>
        <Button
          key={1}
          role="button"
          onKeyPress={() => {}}
          onClick={() => {
            setEditModal(true);
          }}
        >
          Edit Location
        </Button>
      </li>
      <li>
        <Button key={2} role="button" onKeyPress={() => {}} onClick={() => {}}>
          Bulk Edit APs
        </Button>
      </li>
      <li>
        <Button
          key={3}
          role="button"
          onKeyPress={() => {}}
          onClick={() => {
            setDeleteModal(true);
          }}
        >
          Delete Location
        </Button>
      </li>
    </ul>
  );
};
PopoverMenuContent.propTypes = {
  setEditModal: PropTypes.func.isRequired,
  setAddModal: PropTypes.func.isRequired,
  setDeleteModal: PropTypes.func.isRequired,
  locationData: PropTypes.shape({
    id: PropTypes.number,
    lastModifiedTimestamp: PropTypes.string,
    locationType: PropTypes.string,
    name: PropTypes.string,
    parentId: PropTypes.number,
  }),
};

PopoverMenuContent.defaultProps = {
  locationData: {},
};
// PopoverMenuContent.defaultProps = {};

export default PopoverMenuContent;
