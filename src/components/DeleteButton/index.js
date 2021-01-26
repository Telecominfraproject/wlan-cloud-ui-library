import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DeleteFilled } from '@ant-design/icons';
import Modal from 'components/Modal';
import Button from 'components/Button';

const DeleteButton = ({
  className,
  onSuccess,
  showText,
  isDanger,
  content,
  modalButtonText,
  extraOnClick,
  ...restProps
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div onClick={e => e.stopPropagation()} role="button" tabIndex={0} onKeyDown={() => {}}>
      <Button
        className={className}
        danger={isDanger}
        type="primary"
        icon={!showText && <DeleteFilled />}
        onClick={() => {
          extraOnClick();
          setShowModal(true);
        }}
        {...restProps}
      >
        {showText && 'Delete'}
      </Button>
      <Modal
        onCancel={() => {
          setShowModal(false);
        }}
        onSuccess={() => {
          onSuccess();
          setShowModal(false);
        }}
        visible={showModal}
        title="Are you sure?"
        buttonText={modalButtonText}
        buttonType="danger"
        content={content}
      />
    </div>
  );
};

export default DeleteButton;

DeleteButton.propTypes = {
  className: PropTypes.string,
  onSuccess: PropTypes.func,
  showText: PropTypes.bool,
  isDanger: PropTypes.bool,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  modalButtonText: PropTypes.string,
  extraOnClick: PropTypes.func,
};

DeleteButton.defaultProps = {
  className: '',
  onSuccess: () => {},
  showText: false,
  isDanger: false,
  content: null,
  modalButtonText: 'Delete',
  extraOnClick: () => {},
};
