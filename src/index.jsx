import React from 'react';
import ReactDOM from 'react-dom';
import ErrorBoundary from './components/ErrorBoundary';
import ShouldStartChat from './components/ShouldStartChst';
import Handshake from './components/Handshake';
import Modal from './components/Modal';
import MainField from './components/MainField';
import { launchCondition } from './settings';

if (launchCondition) {
  const rootElment = document.createElement('div');
  document.body.insertBefore(rootElment, document.body.firstChild);

  ReactDOM.render(
    <ErrorBoundary>
      <ShouldStartChat>
        <Modal appElement={rootElment} >
          <Handshake>
            {(handshake) => <MainField {...handshake} />}
          </Handshake>
        </Modal>
      </ShouldStartChat>
    </ErrorBoundary>,
    rootElment
  );
}