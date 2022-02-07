const staggerContainer = document.getElementById('stagger-container'),
	staggers = document.querySelectorAll('[class^=stag]'),
	listElements = document.getElementsByTagName('li'),
	productImage = document.getElementById('product-image');

let staggerActive = false;

// Initial tl
const initialTl = gsap.timeline({ duration: 0.3 });

initialTl
	.from('body', {
		filter: 'blur(3px)',
		opacity: 0.3,
		duration: 0.8,
		ease: 'power2.out',
	})
	.from('#initialVideo', { opacity: 0, duration: 1 })
	.from('h1', {
		xPercent: 300,
		opacity: 0,
		delay: 0.5,
		stagger: {
			each: 0.3,
			ease: 'power2.inOut',
		},
	})
	.from('aside', {
		xPercent: -100,
		ease: 'back.out(2)',
	})
	.to('#initialVideo', { filter: 'blur(4px)', duration: 1 });

// Stagger timeline
const staggerTl = gsap.timeline({
	duration: 0.2,
	paused: true,
	onReverseComplete: function () {
		if (!staggerActive) {
			staggerTl.restart();
			staggerActive = true;
		}
	},
});

staggerTl
	.to('body', { filter: 'blur(3px)' })
	.to('aside', { xPercent: -100, ease: 'back.in(1)' })
	.staggerFrom(
		staggers,
		0.4,
		{ transform: 'scaleX(0)', opacity: 0, ease: 'power3.out', delay: 0.2 },
		0.08
	)
	.to('body', { filter: 'blur(0px)' });

// Product timeline
const prodTl = gsap.timeline({ duration: 0.6, paused: true });

prodTl.to(productImage, {
	yPercent: 100,
	ease: 'power3.inOut',
	duration: 1,
});

// Menu elements
for (let i = 0; i < listElements.length; i++) {
	const el = listElements[i];
	const hoverEl = el.childNodes[1];

	el.addEventListener('mouseover', function () {
		TweenLite.to(hoverEl, { xPercent: 100 });
	});
	el.addEventListener('mouseleave', function () {
		TweenLite.to(hoverEl, { xPercent: -250 });
	});

	el.addEventListener('click', function () {
		if (!staggerActive) {
			staggerActive = true;
			staggerTl.play().add(prodTl.play(), '-=1.5');
		} else {
			staggerTl.reverse();
			staggerActive = false;
		}
	});
}
