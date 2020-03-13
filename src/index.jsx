// import './style.scss';
// import './handshake';
import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'
import Postmate from 'postmate'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import * as setting from './settings';

const StyledModal = styled(Modal)`
  width: 100%;
  height: 100%;
`

const base = css`
  width: 100%;
  height: 100%;
`

const openBotui = (targetRef) => () => {
  const handshake = new Postmate({
    container: targetRef.current,
    url: process.env.BOTUI_CHILD_ENDPOINT,
    name: 'botui-child',
    classListArray: ['botui-child'],
    model: { setting }
  });
  handshake.then(child => {
    child.frame.setAttribute('height', '100%');
    child.frame.setAttribute('width', '100%');
    child.frame.setAttribute('frameborder', 'no');
    child.on('readyToStartChat', () => {
      child.call('startChat');
    });

    child.on('dataLayerPush', (data) => { });
  })
}

Modal.setAppElement('#root')

const Field = () => {
  const postmanteEl = useRef(null)

  return (
    <div>
      <StyledModal
        isOpen={true}
        onAfterOpen={openBotui(postmanteEl)}
      >
        <div css={base} ref={postmanteEl} />
      </StyledModal>
    </div>
  )
}

ReactDOM.render(<Field />, document.querySelector('#root'))