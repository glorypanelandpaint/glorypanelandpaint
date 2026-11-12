/** Event properties. Never include personal details (names, phone, email, rego, messages). */
export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

/**
 * Sends an event to Google Tag Manager (dataLayer) and PostHog.
 * GTM loads after the page renders; it picks up anything already queued in dataLayer.
 */
export function trackEvent(event: string, params: AnalyticsParams = {}): void {
  if (typeof window === 'undefined') return;

  const properties = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined),
  );

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...properties });
  window.posthog?.capture(event, properties);
}
