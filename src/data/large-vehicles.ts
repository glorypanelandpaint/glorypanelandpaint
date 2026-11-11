import type { HomeService } from './services';

/**
 * Copy for /trucks-campervans/.
 * Wording rules: no "non-structural", no list of what we don't do, no hail or leak
 * damage, and no claims about chassis or structural repairs.
 * Only .astro files import this, so none of it ends up in the browser bundle.
 */

export const largeVehiclePagePath = '/trucks-campervans/';

/**
 * Pexels stock photo (free for commercial use):
 * https://www.pexels.com/photo/scenic-campervan-parked-overlooking-french-countryside-39160102/
 * Not our own work, so the alt text only describes the picture.
 */
export const largeVehicleHeroImage = {
  src: '/images/campervan-countryside.webp',
  srcSet: '/images/campervan-countryside-640.webp 640w, /images/campervan-countryside.webp 1100w',
  width: 1100,
  height: 733,
  alt: 'Campervan parked under a tree overlooking green countryside on a clear day',
} as const;

export const largeVehicleHero = {
  eyebrow: 'Trucks · Trailers · Campervans · Motorhomes',
  subtitle:
    'Panel repairs, resprays and fibreglass work for trucks, trailers, campervans and motorhomes, from our Hornby workshop.',
} as const;

export const largeVehicleServicesIntro =
  'From a single cab respray to a whole fleet, our Hornby team repairs and refinishes trucks, trailers, campervans, motorhomes and caravans to the same standard as our cars.';

/** Display only for now; each card gets a link once it has its own page. */
export const largeVehicleServices: HomeService[] = [
  {
    title: 'Truck Spray Painting',
    description:
      'Full resprays, cab resprays, colour changes and touch-ups. We colour-match to your original paint or fleet scheme for a clean, even finish that stands up to life on the road.',
    iconSvg:
      '<rect x="8" y="8" width="8" height="13" rx="2"/><path d="M10 8V6a2 2 0 0 1 4 0v2"/><path d="M18 5h.01"/><path d="M20 7h.01"/><path d="M18 9h.01"/>',
  },
  {
    title: 'Truck Panel Repairs',
    description:
      'Dents, scrapes and accident damage repaired and refinished. We repair or replace damaged panels and blend the paint, so your truck looks right and gets back to work.',
    iconSvg:
      '<path d="m15 12-8.5 8.5a2.12 2.12 0 1 1-3-3L12 9"/><path d="M17.64 15 22 10.64"/><path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h.86c.85 0 1.65.33 2.25.93l1.25 1.25"/>',
  },
  {
    title: 'Trailer Repairs & Painting',
    description:
      'Panel repairs and refinishing for damaged or weathered trailers, repainted to match your truck or fleet colours so the whole unit looks consistent.',
    iconSvg:
      '<path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
  },
  {
    title: 'Campervans & Motorhomes',
    description:
      'Fibreglass and body panel repairs, resprays and refreshes. We look after private owners and rental fleets, including off-season refurbishments.',
    iconSvg:
      '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
  },
  {
    title: 'Fleet Contracts',
    description:
      'One workshop for repairs and refinishing across your fleet. Flexible scheduling helps keep vehicles on the road, and consistent colour matching keeps every vehicle on brand.',
    iconSvg: '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
  },
  {
    title: 'Insurance Claims',
    description:
      'We deal directly with your insurer and handle the claim from start to finish: assessment, quote, approval and repair. Send us photos to get started.',
    iconSvg: '<path d="M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  },
];

/** Quote form heading, with a way out for car owners who landed here. */
export const largeVehicleQuote = {
  heading: 'Request a free truck & campervan quote',
  vehicles: 'For trucks, trailers, campervans, motorhomes, caravans and fleets.',
  carPrompt: 'Car, SUV or ute?',
  carLinkLabel: 'Use our car quote form instead',
  carLinkHref: '/contact/',
} as const;

/** Structured data for the page (Service). */
export const largeVehicleService = {
  name: 'Truck & Campervan Repairs',
  serviceType:
    'Panel repairs, resprays and fibreglass work for trucks, trailers, campervans and motorhomes',
  description: largeVehicleServicesIntro,
  path: largeVehiclePagePath,
};
