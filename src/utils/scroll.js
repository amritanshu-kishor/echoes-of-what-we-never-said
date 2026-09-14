/**
 * Utility to reliably reset window scroll position across desktop and mobile devices.
 * Configures history.scrollRestoration to 'manual' to prevent browser scroll persistence on navigation.
 */

if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

export const resetScroll = () => {
  if (typeof window === 'undefined') return;
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  if (document.documentElement) {
    document.documentElement.scrollTop = 0;
  }
  if (document.body) {
    document.body.scrollTop = 0;
  }
};
