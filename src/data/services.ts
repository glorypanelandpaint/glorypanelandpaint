export type HomeService = {
	title: string;
	description: string;
	/** Raw SVG child markup (paths, rects, etc.) */
	iconSvg: string;
};

export const homeServices: HomeService[] = [
	{
		title: 'Insurance Claims',
		description: 'We manage the whole claim with your insurer, start to finish.',
		iconSvg: '<path d="M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
	},
	{
		title: 'Panel Beating',
		description: 'Dents and accident damage repaired to factory standard.',
		iconSvg:
			'<path d="m15 12-8.5 8.5a2.12 2.12 0 1 1-3-3L12 9"/><path d="M17.64 15 22 10.64"/><path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h.86c.85 0 1.65.33 2.25.93l1.25 1.25"/>',
	},
	{
		title: 'Spray Painting',
		description: 'Spies Hecker waterborne paint with a flawless colour match.',
		iconSvg:
			'<rect x="8" y="8" width="8" height="13" rx="2"/><path d="M10 8V6a2 2 0 0 1 4 0v2"/><path d="M18 5h.01"/><path d="M20 7h.01"/><path d="M18 9h.01"/>',
	},
	{
		title: 'Smash & Chassis Repairs',
		description: 'Structural straightening on computerised measuring jigs.',
		iconSvg:
			'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
	},
	{
		title: 'Private & Car Dealers',
		description: 'Repairs and pre-sale tidy-ups for private owners and dealers.',
		iconSvg:
			'<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
	},
	{
		title: 'Fleet Services',
		description: 'Fast, reliable repairs to keep your business vehicles moving.',
		iconSvg:
			'<path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
	},
];

export type ServiceDetail = {
	id: string;
	eyebrow: string;
	title: string;
	description: string;
	image: string;
	imageAlt: string;
	ctaLabel: string;
	ctaHref: string;
};

export const serviceDetails: ServiceDetail[] = [
	{
		id: 'insurance-claims',
		eyebrow: 'Insurance',
		title: 'Insurance Claim Repairs in Christchurch',
		description:
			'We deal directly with all major insurers and manage your claim from start to finish — assessment, quote, approval and repair. You drop the car off, we handle the paperwork.',
		image: '/images/glory-forecourt-cars.webp',
		imageAlt: 'Cars at GLORY Panel & Paint, Hornby Christchurch — we handle claims for all insurers',
		ctaLabel: 'Book an assessment',
		ctaHref: '/book-online/',
	},
	{
		id: 'panel-beating',
		eyebrow: 'Panel beating',
		title: 'Panel Beating in Christchurch',
		description:
			'Dents, creases and accident damage repaired back to factory lines by experienced panel beaters. We restore strength and shape, not just appearance.',
		image: '/images/glory-forecourt-ferrari-urus.webp',
		imageAlt: 'Ferrari and Lamborghini Urus outside the GLORY Panel & Paint workshop, Christchurch',
		ctaLabel: 'Get a free quote',
		ctaHref: '/contact/',
	},
	{
		id: 'spray-painting',
		eyebrow: 'Spray painting',
		title: 'Car Spray Painting in Christchurch',
		description:
			'Premium Spies Hecker waterborne paint in our professional spray booth, with computerised colour matching for an invisible, durable finish.',
		image: '/images/glory-ferrari-488.webp',
		imageAlt: 'Ferrari 488 with a flawless paint finish at GLORY Panel & Paint, Christchurch',
		ctaLabel: 'Get a free quote',
		ctaHref: '/contact/',
	},
	{
		id: 'smash-chassis',
		eyebrow: 'Structural',
		title: 'Smash & Chassis Repairs',
		description:
			'Major collision and structural damage straightened on computerised measuring jigs to manufacturer specifications — so your car is safe as well as straight.',
		image: '/images/glory-porsche-911.webp',
		imageAlt: 'Porsche 911 Turbo at GLORY Panel & Paint, Christchurch',
		ctaLabel: 'Book an assessment',
		ctaHref: '/book-online/',
	},
	{
		id: 'private-dealers',
		eyebrow: 'Private & dealers',
		title: 'Private & Car Dealer Work',
		description:
			'Repairs and pre-sale presentation work for private owners and motor dealers — quality finishes on time, at a fair price.',
		image: '/images/glory-forecourt-lamborghini-sign.webp',
		imageAlt: 'White Lamborghini Gallardo and Porsche outside the GLORY Panel & Paint sign, Christchurch',
		ctaLabel: 'Get a free quote',
		ctaHref: '/contact/',
	},
	{
		id: 'fleet',
		eyebrow: 'Fleet',
		title: 'Fleet Services',
		description:
			'Fast, dependable repairs and refinishing to keep your business vehicles on the road and looking sharp. Flexible scheduling for fleet operators.',
		image: '/images/glory-hero-forecourt-mobile.webp',
		imageAlt: 'Jaguar F-Type outside the GLORY Panel & Paint workshop, Hornby Christchurch',
		ctaLabel: 'Talk to us',
		ctaHref: '/contact/',
	},
];

export type AdvantageCard = {
	title: string;
	description: string;
	iconSvg: string;
};

export const advantageCards: AdvantageCard[] = [
	{
		title: 'Spies Hecker Paint',
		description: 'Premium waterborne paint system for a durable, factory-quality finish.',
		iconSvg: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
	},
	{
		title: 'Modern Equipment',
		description: 'Computerised colour matching and chassis measuring for precise repairs.',
		iconSvg:
			'<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M20 9h2M20 14h2M2 9h2M2 14h2"/>',
	},
	{
		title: 'Quality Workmanship',
		description:
			'Qualified spray painters and panel beaters delivering a clean, high-quality finish on every repair.',
		iconSvg: '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
	},
];
