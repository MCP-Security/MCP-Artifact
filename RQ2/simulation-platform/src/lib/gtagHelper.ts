// src/lib/gtagHelper.ts
export const GA_TRACKING_ID = 'G-6LQ5NBSZXF'; // 你的 GA Tracking ID

declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

export const logGAEvent = (
  action: string,
  params?: Record<string, any>
) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, params);
    // console.log(`GA_EVENT: ${action}`, params); // 调试信息
  } else {
    console.log(
      `GA_EVENT_SKIPPED (gtag not ready or not in browser): ${action}`,
      params
    );
  }
};