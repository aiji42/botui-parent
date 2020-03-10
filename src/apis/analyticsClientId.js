export const analyticsClientId = async () => {
  return await new Promise(resolve => {
    window.ga && window.ga(tracker => resolve(tracker.get('clientId')));
  });
};