import Postmate from 'postmate';
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import actions from '../../handshake/actions';
import * as setting from '../../settings';
import TagManager from 'react-gtm-module';
import { conversationIds } from '../../util/conversations';

const dataLayerPush = ({ id, action }) => {
  const index = conversationIds().indexOf(id) < 0 ? 99 : conversationIds().indexOf(id);
  const dataLayer = {
    event: 'analytics',
    eventCategory: 'botui-child',
    eventAction: action,
    eventLabel: `${('00' + index).slice(-2)}_${id}`,
  };
  TagManager.dataLayer({ dataLayer, dataLayerName: 'dataLayerBotuiParent' });
};

const makeHandshakeChild = async (el) => {
  const handshake = new Postmate({
    container: el,
    url: process.env.BOTUI_CHILD_ENDPOINT,
    name: 'botui-child',
    classListArray: ['botui-child'],
    model: { setting }
  });
  const child = await handshake;
  child.frame.setAttribute('height', '100%');
  child.frame.setAttribute('width', '100%');
  child.frame.setAttribute('frameborder', 'no');
  Object.keys(actions).forEach(key => {
    child.on(key, async (data) => child.call('publishMessage', [key, await actions[key](data)]));
  });
  child.on('updateStatus', dataLayerPush);

  return child;
};

const Handshake = ({ children }) => {
  const handshakeElement = useRef(null);
  const [handshakeChild, setHandshakeChild] = useState(null);
  useEffect(() => { makeHandshakeChild(handshakeElement.current).then(setHandshakeChild); }, []);

  return (
    <>{children({ handshakeChild, handshakeElement })}</>
  );
};

Handshake.propTypes = {
  children: PropTypes.any
};

export default Handshake;