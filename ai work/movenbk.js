const nav = document.getElementById('nav');
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

const onScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 20);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

burger?.addEventListener('click', () => {
	const open = burger.classList.toggle('open');
	navLinks?.classList.toggle('open', open);
	burger.setAttribute('aria-expanded', String(open));
});

navLinks?.querySelectorAll('a').forEach(link => {
	link.addEventListener('click', () => {
		burger?.classList.remove('open');
		navLinks.classList.remove('open');
		burger?.setAttribute('aria-expanded', 'false');
	});
});

const layer = document.getElementById('petals');
const glyphs = ['❀', '✿', '❁', '✦'];
const count = window.innerWidth < 640 ? 9 : 16;

for (let i = 0; layer && i < count; i++) {
	const petal = document.createElement('span');
	petal.className = 'petal';
	petal.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
	petal.style.left = Math.random() * 100 + 'vw';
	petal.style.fontSize = 10 + Math.random() * 16 + 'px';
	petal.style.animationDuration = 13 + Math.random() * 16 + 's';
	petal.style.animationDelay = -Math.random() * 26 + 's';
	petal.style.setProperty('--drift', (Math.random() * 160 - 80).toFixed(0) + 'px');
	layer.appendChild(petal);
}

const movingBackground = document.querySelector('.bg');
if (movingBackground) {
	let frame = 0;
	let pointerX = 0;
	let pointerY = 0;

	const renderBackground = () => {
		frame = 0;
		const x = (pointerX - window.innerWidth / 2) / window.innerWidth;
		const y = (pointerY - window.innerHeight / 2) / window.innerHeight;
		movingBackground.style.setProperty('--bg-x', (x * 22).toFixed(2) + 'px');
		movingBackground.style.setProperty('--bg-y', (y * 17).toFixed(2) + 'px');
		movingBackground.style.setProperty('--bg-rotate', (x * .45).toFixed(2) + 'deg');
		movingBackground.style.setProperty('--bg-scale', (1 + Math.abs(x * y) * .018).toFixed(3));
	};

	window.addEventListener('pointermove', event => {
		pointerX = event.clientX;
		pointerY = event.clientY;
		if (!frame) frame = requestAnimationFrame(renderBackground);
	}, { passive: true });

	window.addEventListener('pointerleave', () => {
		movingBackground.style.setProperty('--bg-x', '0px');
		movingBackground.style.setProperty('--bg-y', '0px');
		movingBackground.style.setProperty('--bg-rotate', '0deg');
		movingBackground.style.setProperty('--bg-scale', '1');
	});
}
