export type PageSeo = {
    title: string;
    description: string;
    focusKeyword: string;
    path: string;
    /** Exclude from search engine indexing (functional/utility pages). */
    noindex?: boolean;
};

export const siteSeo = {
    defaultTitle: 'Glory Panel & Paint',
    titleTemplate: '%s | Glory Panel & Paint',
    locale: 'en-NZ',
} as const;

/** Migrated from glory-website-master/wp-config/set-seo.php */
export const pageSeo: Record<string, PageSeo> = {
    home: {
        path: '/',
        focusKeyword: 'panel beaters Christchurch',
        title: 'Panel Beaters Christchurch | Glory Panel & Paint',
        description:
			'Christchurch panel beating, spray painting & insurance repairs. 5.0★ from 330+ Google reviews. Free courtesy car, all insurers, guaranteed work. Book online.',
    },
    services: {
        path: '/services/',
        focusKeyword: 'panel beating and spray painting Christchurch',
        title: 'Panel Beating & Spray Painting Christchurch | Glory Panel & Paint',
        description:
			'Panel beating, spray painting, smash & chassis repairs, rust and fleet work in Christchurch. Spies Hecker waterborne paint and guaranteed workmanship.',
    },
    insurance: {
        path: '/insurance/',
        focusKeyword: 'insurance car repairs Christchurch',
        title: 'Insurance Claim Car Repairs Christchurch | Glory Panel & Paint',
        description:
			'We handle your insurance claim from start to finish. All major NZ insurers accepted. Book a free vehicle assessment with Glory Panel & Paint, Hornby.',
    },
    about: {
        path: '/about/',
        focusKeyword: 'panel and paint Christchurch',
        title: 'About Us | Glory Panel & Paint, Hornby Christchurch',
        description:
			'Glory Panel & Paint is a leading Christchurch panel and paint workshop in Hornby — quality, honesty and reliable repairs you can trust.',
    },
    contact: {
        path: '/contact/',
        focusKeyword: 'panel beater Hornby Christchurch',
        title: 'Contact Us | Glory Panel & Paint, Hornby Christchurch',
        description:
			'Contact Glory Panel & Paint, 13–15 Smarts Rd, Hornby, Christchurch. Call 03 420 2022 or request a free quote online with photos of the damage.',
    },
    'book-online': {
        path: '/book-online/',
        focusKeyword: 'book car assessment Christchurch',
        title: 'Book Online | Vehicle Assessment | Glory Panel & Paint',
        description:
			'Book your free vehicle assessment online. Pick a time, tell us about your vehicle and upload damage photos. Glory Panel & Paint, Hornby, Christchurch.',
    },
    'book-appointment': {
        path: '/book-appointment/',
        focusKeyword: 'book car assessment Christchurch',
        title: 'Book Appointment | Glory Panel & Paint',
        description:
			'Schedule your free vehicle assessment at Glory Panel & Paint, Hornby Christchurch. Choose a date and time that works for you.',
        // Step 2 of the booking funnel — keep search traffic on /book-online/
        noindex: true,
    },
    'book-cancel': {
        path: '/book-cancel/',
        focusKeyword: 'cancel appointment',
        title: 'Cancel Appointment | Glory Panel & Paint',
        description: 'Cancel your vehicle assessment appointment at Glory Panel & Paint.',
        noindex: true,
    },
    'not-found': {
        path: '/404/',
        focusKeyword: 'page not found',
        title: 'Page Not Found | Glory Panel & Paint',
        description:
			'Sorry, we couldn\'t find that page. Head back to Glory Panel & Paint for panel beating, spray painting and insurance repairs in Christchurch.',
        noindex: true,
    },
    'privacy-policy': {
        path: '/privacy-policy/',
        focusKeyword: 'privacy policy',
        title: 'Privacy Policy | Glory Panel & Paint',
        description:
			'Privacy policy for Glory Panel & Paint. How we collect, use and protect your personal information when you contact us or book online.',
    },
};

export function getPageSeo(slug: keyof typeof pageSeo): PageSeo {
    return pageSeo[slug];
}
