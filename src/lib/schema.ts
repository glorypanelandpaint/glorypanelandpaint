import { business } from '../data/business';
import { googleReviewsUrl } from '../data/reviews';

type FaqItem = {
	question: string;
	answer: string;
};

type BreadcrumbItem = {
	name: string;
	path: string;
};

type ServiceSchemaInput = {
	name: string;
	serviceType: string;
	description: string;
	path: string;
};

/** Absolute URL on the live site, e.g. siteUrl('/images/og-image.jpg'). */
function siteUrl(path: string): string {
	return new URL(path, business.url).href;
}

const localBusinessId = `${business.url}#localbusiness`;

/** Based in Christchurch, but we take work from anywhere in New Zealand. */
const areaServed = [
	{ '@type': 'City', name: 'Christchurch' },
	{ '@type': 'Country', name: 'New Zealand' },
];

/** Truck, trailer, campervan and fleet services (see /trucks-campervans/). */
const largeVehicleServices = [
	'Truck Spray Painting',
	'Truck Panel Repairs',
	'Trailer Repairs & Painting',
	'Campervan & Motorhome Repairs',
	'Fleet Contracts',
];

export function autoBodyShopSchema() {
	const home = business.url;
	return {
		'@context': 'https://schema.org',
		'@type': 'AutoBodyShop',
		'@id': localBusinessId,
		name: business.name,
		url: home,
		image: siteUrl('/images/og-image.jpg'),
		telephone: business.phoneTel,
		email: business.email,
		priceRange: '$$',
		address: {
			'@type': 'PostalAddress',
			streetAddress: `${business.address.street}, Hornby`,
			addressLocality: 'Christchurch',
			addressRegion: business.address.region,
			postalCode: business.address.postalCode,
			addressCountry: business.address.country,
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: business.geo.latitude,
			longitude: business.geo.longitude,
		},
		hasMap: googleReviewsUrl,
		areaServed,
		hasOfferCatalog: {
			'@type': 'OfferCatalog',
			name: 'Truck & Campervan Repairs',
			itemListElement: largeVehicleServices.map((name) => ({
				'@type': 'Offer',
				itemOffered: { '@type': 'Service', name },
			})),
		},
		sameAs: [business.social.facebook, business.social.instagram],
		openingHoursSpecification: business.openingHoursSpecification.map((slot) => ({
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: slot.dayOfWeek,
			opens: slot.opens,
			closes: slot.closes,
		})),
	};
}

export function serviceSchema({ name, serviceType, description, path }: ServiceSchemaInput) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Service',
		name,
		serviceType,
		description,
		url: siteUrl(path),
		provider: { '@id': localBusinessId },
		areaServed,
	};
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: siteUrl(item.path),
		})),
	};
}

export function faqPageSchema(items: FaqItem[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: items.map((item) => ({
			'@type': 'Question',
			name: item.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: item.answer,
			},
		})),
	};
}

export const insuranceFaq: FaqItem[] = [
	{
		question: 'Which insurance companies do you accept?',
		answer:
			'We accept claims from all major New Zealand insurers - including IAG, AMI, State, NZI, Vero, Tower, AA Insurance, AON, Lumley and Swann. We manage your insurance claim from start to finish.',
	},
	{
		question: 'Do you provide a free courtesy car?',
		answer:
			'Yes - we provide a free courtesy car while we repair your vehicle, so you can stay on the road (subject to availability).',
	},
	{
		question: 'Can I choose my repairer?',
		answer:
			"Yes! As the owner, you're in charge of who repairs your vehicle. There's a myth floating around that your insurance company chooses the repairer, or will need you to get multiple quotes - this is no longer the case. You have freedom of choice over who carries out the repairs.",
	},
];
