import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

const style = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    zIndex: 100
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

const onAfterOpen = () => disableBodyScroll(document.body.querySelector('.ReactModal__Content'));

const Modal = ({ isOpen, appElement, children }) => {
  useEffect(() => {
    !!isOpen && clearAllBodyScrollLocks();
  }, [isOpen]);

  return (
    <ReactModal appElement={appElement} isOpen={isOpen} onAfterOpen={onAfterOpen} style={style}>
      {children}
    </ReactModal>
  );
};

Modal.defaultProps = {
  isOpen: true
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  appElement: PropTypes.object,
  children: PropTypes.node
};

export default Modal;