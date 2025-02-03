export const FB_PIXEL_ID = '1203701254882500';

export const pageview = () => {
  window.fbq('track', 'PageView');
};

// For tracking specific events
export const event = (name: string, options = {}) => {
  window.fbq('track', name, options);
}; 