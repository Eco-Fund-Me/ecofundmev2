import mixpanel from 'mixpanel-browser';
 
const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
 
export const initMixpanel = () => {
  if (!MIXPANEL_TOKEN) {
    console.warn('Mixpanel token is missing! Check your .env file.');
    return;
  }
 
   mixpanel.init(MIXPANEL_TOKEN, {
    autocapture: true, // Enables Mixpanel's autocapture feature
    debug: process.env.NODE_ENV !== 'production', // Debug logging in dev
    track_pageview: false, // We'll handle page views manually for Next.js routing
    persistence: 'localStorage', // Recommended for more reliable persistence
  });
}