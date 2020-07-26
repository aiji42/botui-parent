import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import Close from './Close';
import Open from './Open';
import TagManager from 'react-gtm-module';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { css } from '@emotion/core';

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

const closeButton = css`
  position: absolute;
  right: 16px;
  top: 6px;
`;

const openButton = css`
  position: fixed;
  bottom: 20px;
  right: 10px;
  z-index: 100;
  background: white;
  border: 4px solid #62cfc1;
  border-radius: 50px;
  padding: 20px 15px;
  box-shadow: 0 1px;
`;

const onAfterOpen = () => disableBodyScroll(document.body.querySelector('.ReactModal__Content'));
const onAfterClose = () => clearAllBodyScrollLocks();

const Modal = ({ isOpen: initialOpen, appElement, children }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  useEffect(() => {
    return () => {
      const eventLabel = isOpen ? 'close' : 'reOpen';
      TagManager.dataLayer({
        dataLayer: { event: 'analytics', eventCategory: 'botui-parent', eventAction: 'display', eventLabel },
        dataLayerName: 'dataLayerBotuiParent'
      });
    };
  }, [isOpen]);

  return (
    <>
      <ReactModal appElement={appElement} isOpen={isOpen} onAfterOpen={onAfterOpen} onAfterClose={onAfterClose} style={style}>
        <div css={closeButton}><Close onClick={() => { setIsOpen(false); }} /></div>
        {children}
      </ReactModal>
      <div css={openButton}><Open onClick={() => { setIsOpen(true); }} /></div>
    </>
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