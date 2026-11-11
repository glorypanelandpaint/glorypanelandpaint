/// <reference types="astro/client" />

interface Window {
  posthog?: {
    capture: (event: string, properties?: Record<string, unknown>) => void;
    captureException: (error: unknown, properties?: Record<string, unknown>) => void;
    identify: (distinctId: string, properties?: Record<string, unknown>) => void;
    reset: () => void;
    [key: string]: unknown;
  };
  __posthog_initialized?: boolean;
  /** Google Tag Manager queue */
  dataLayer?: Record<string, unknown>[];
}
