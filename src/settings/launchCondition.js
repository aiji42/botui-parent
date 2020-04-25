const conditions = JSON.parse(process.env.BOTUI_LAUNCH_CONDITION || '{}');

export const launchCondition = Object.keys(conditions).every(key => {
  if (key === 'host') return document.location.host.includes(conditions[key]);
  if (key === 'pathname') return document.location.pathname.includes(conditions[key]);
  if (key === 'search') return document.location.search.includes(conditions[key]);
  if (key === 'referrer') return document.referrer.includes(conditions[key]);
});