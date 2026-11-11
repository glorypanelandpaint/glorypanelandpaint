import { useEffect, useState } from 'react';

type NavItem = {
	label: string;
	href: string;
	active?: boolean;
};

/** The gold button at the end of the menu. */
export type NavCta = {
	label: string;
	href: string;
};

export const BOOK_ONLINE: NavCta = { label: 'Book Online', href: '/book-online/' };

interface Props {
	currentPath: string;
	navItems: NavItem[];
	/** Replaces the Book Online button, e.g. with a link to the page's own quote form. */
	cta?: NavCta;
}

export default function MobileNav({ currentPath, navItems, cta = BOOK_ONLINE }: Props) {
	const [open, setOpen] = useState(false);

	const ctaActive =
		cta.href === BOOK_ONLINE.href &&
		(currentPath === '/book-online/' || currentPath.startsWith('/book-appointment'));

	useEffect(() => {
		document.body.style.overflow = open ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setOpen(false);
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, []);

	return (
		<div className="glory-mobile-nav">
			<button
				type="button"
				className="glory-mobile-nav__toggle"
				aria-expanded={open}
				aria-controls="glory-mobile-drawer"
				aria-label={open ? 'Close menu' : 'Open menu'}
				onClick={() => setOpen((v) => !v)}
			>
				<svg viewBox="0 0 24 24" width="34" height="34" fill="currentColor" aria-hidden="true">
					{open ? (
						<path
							d="M6 6l12 12M18 6L6 18"
							stroke="currentColor"
							strokeWidth="2.5"
							strokeLinecap="round"
							fill="none"
						/>
					) : (
						<>
							<rect y="4" width="24" height="2.5" rx="1" />
							<rect y="10.75" width="24" height="2.5" rx="1" />
							<rect y="17.5" width="24" height="2.5" rx="1" />
						</>
					)}
				</svg>
			</button>

			{open && (
				<div
					className="glory-mobile-nav__backdrop"
					aria-hidden="true"
					onClick={() => setOpen(false)}
				/>
			)}

			<nav
				id="glory-mobile-drawer"
				className={`glory-mobile-nav__drawer${open ? ' is-open' : ''}`}
				aria-label="Mobile navigation"
				aria-hidden={!open}
			>
				<ul className="glory-mobile-nav__list">
					{navItems.map((item) => (
						<li key={item.href}>
							<a
								href={item.href}
								aria-current={item.active ? 'page' : undefined}
								onClick={() => setOpen(false)}
							>
								{item.label}
							</a>
						</li>
					))}
					<li className="glory-nav-cta">
						<a
							href={cta.href}
							aria-current={ctaActive ? 'page' : undefined}
							onClick={() => setOpen(false)}
						>
							{cta.label}
						</a>
					</li>
				</ul>
			</nav>
		</div>
	);
}
