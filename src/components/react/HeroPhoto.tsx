import { useEffect, useRef } from 'react';

/**
 * Hero photo with a scroll parallax effect. The image lags behind the scroll,
 * revealing itself as the hero leaves. Mount/unmount is managed by Astro's
 * ClientRouter, so the effect re-initialises naturally on every navigation.
 */
export default function HeroPhoto() {
	const imgRef = useRef<HTMLImageElement>(null);

	useEffect(() => {
		let mm: { revert: () => void } | undefined;
		let cancelled = false;

		// Dynamic import keeps gsap out of the bundle for pages without a photo hero
		Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
			([{ gsap }, { ScrollTrigger }]) => {
				if (cancelled || !imgRef.current) return;
				gsap.registerPlugin(ScrollTrigger);

				mm = gsap.matchMedia().add(
					'(min-width: 769px) and (prefers-reduced-motion: no-preference)',
					() => {
						gsap.to(imgRef.current, {
							// The top gap this opens up is always above the viewport, so no oversizing needed.
							yPercent: 100,
							ease: 'none',
							scrollTrigger: {
								trigger: '.glory-hero--photo',
								start: 'top top',
								end: 'bottom top',
								scrub: true,
							},
						});
					},
				);
			},
		);

		return () => {
			cancelled = true;
			mm?.revert();
		};
	}, []);

	return (
		<picture>
			<source media="(max-width: 768px)" srcSet="/images/glory-hero-forecourt-mobile.webp" />
			<img
				ref={imgRef}
				className="glory-hero__photo"
				src="/images/glory-hero-forecourt.webp"
				alt=""
				width={1920}
				height={1098}
				loading="eager"
				fetchPriority="high"
				decoding="async"
			/>
		</picture>
	);
}
