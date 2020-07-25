import TagManager from 'react-gtm-module';
import { conversations } from '../../settings/conversations';

const findNext = ({ id }) => conversations.find(({ trigger }) => trigger === id);

const conversationIds = () => {
  const ids = [];
  let next = conversations.find(({ id }) => id === 'hello');
  while (next) {
    ids.push(next.id);
    next = findNext(next);
  }
  return ids;
};

const countableIds = () => {
  const ids = [];
  let next = conversations.find(({ id }) => id === 'hello');
  while (next) {
    if (next.countable) ids.push(next.id);
    next = findNext(next);
  }
  return ids;
};

export const percentage = ({ id }) => conversationIds().indexOf(id) / conversationIds().length * 100;

export const remainingNumber = ({ id }) => countableIds().reverse().indexOf(id) + 1;

export const dataLayerPush = ({ id, action }) => {
  const index = conversationIds().indexOf(id) < 0 ? 99 : conversationIds().indexOf(id);
  const dataLayer = {
    event: 'analytics',
    eventCategory: 'botui-child',
    eventAction: action,
    eventLabel: `${('00' + index).slice(-2)}_${id}`,
  };
  TagManager.dataLayer({ dataLayer, dataLayerName: 'dataLayerBotuiParent' });
};