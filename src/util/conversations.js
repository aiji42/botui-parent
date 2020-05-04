import { conversations } from '../settings/conversations';

const findNext = ({ id }) => conversations.find(({ trigger }) => trigger === id);

export const conversationIds = () => {
  const ids = [];
  let next = conversations.find(({ id }) => id === 'hello');
  while (next) {
    ids.push(next.id);
    next = findNext(next);
  }
  return ids;
};

export const countableIds = () => {
  const ids = [];
  let next = conversations.find(({ id }) => id === 'hello');
  while (next) {
    if (next.countable) ids.push(next.id);
    next = findNext(next);
  }
  return;
};