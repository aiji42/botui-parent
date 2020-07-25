import React from 'react';
import ReactDOM from 'react-dom';
import ErrorBoundary from './components/ErrorBoundary';
import ShouldStartChat from './components/ShouldStartChat';
import Modal from './components/Modal';
import MainField from './components/MainField';
import Communicator from './components/Communicator';
import ChatBot from './components/ChatBot';
import { launchCondition } from './settings';

if (launchCondition) {
  const rootElment = document.createElement('div');
  document.body.insertBefore(rootElment, document.body.firstChild);

  ReactDOM.render(
    <ErrorBoundary>
      <ShouldStartChat>
        <Modal appElement={rootElment} >
          <Communicator>
            <ChatBot>
              <MainField />
            </ChatBot>
          </Communicator>
        </Modal>
      </ShouldStartChat>
    </ErrorBoundary>,
    rootElment
  );
}