import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { saveStoreValue, findStoredValue } from '../../dataStore';
import TagManager from 'react-gtm-module';

const tagManagerArgs = {
  gtmId: 'GTM-KB5R8M2',
  dataLayer: {
    serviceCode: process.env.SERVICE_CODE,
    stage: process.env.NODE_ENV
  },
  dataLayerName: 'dataLayerBotuiParent'
};
TagManager.initialize(tagManagerArgs);

const ShouldStartChat = ({ children }) => {
  const shouldStart = useMemo(() => {
    return saveStoreValue('activeate',
      findStoredValue('activeate',
        Math.random() <= process.env.BOTUI_ACTIVATE_RATE
      )
    );
  }, []);
  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        event: 'analytics', eventCategory: 'botui-parent', eventAction: 'activate',
        eventLabel: shouldStart ? 'true' : 'false',
      },
      dataLayerName: 'dataLayerBotuiParent'
    });
  }, []);

  return (
    <>
      {shouldStart && children}
    </>
  );
};

ShouldStartChat.propTypes = {
  children: PropTypes.any
};

export default ShouldStartChat;
