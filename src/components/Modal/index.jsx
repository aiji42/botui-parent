import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

const style = {
  overlay: {
    width: '95%',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white'
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 'none',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: 0,
    outline: 'none',
    padding: '0'
  }
};

const Modal = ({ isOpen, children, onAfterOpen }) => {

  return (
    <div>
      <ReactModal
        appElement={document.getElementById('root')}
        isOpen={isOpen}
        onAfterOpen={onAfterOpen}
        style={style}
      >
        {children}
      </ReactModal>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node,
  onAfterOpen: PropTypes.func
};

export default Modal;