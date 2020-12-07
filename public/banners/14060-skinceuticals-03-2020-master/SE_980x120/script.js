// Hide elements before running animations
var banner = $("#banner");

gsap.set(banner, { alpha: 0 });

if (Enabler.isInitialized()) {
	init();
} else {
	Enabler.addEventListener(studio.events.StudioEvent.INIT, init);
}

// Runs when Enabler is ready.
function init() {
	if (Enabler.isPageLoaded()) {
		politeInit();
	} else {
		Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, politeInit);
	}
};

// Runs when the page is completely loaded.		
function politeInit() {

	$(function () {

		var p1 = $("#p1");
		var t1 = $("#t1");
		var t2 = $("#t2");
		var t3 = $("#t3");
		var light1 = $("#light1");
		var light2 = $("#light2");

		var banner_elements = [
			p1, t1, t2, t3, light1, light2
		];

		var mytl;
		var loops = 0;
		var max_loops = 3;

		function setup() {
			gsap.set(banner, { alpha: 1 });
			reset_banner();
			animate_banner();
		}

		function animate_banner() {
			loops++;
			mytl = gsap.timeline({ delay: 0 });
			// mytl.timeScale(0.2); 
			mytl
			.to(p1, {duration: "3.333", y: -5, ease: "sine.inOut", repeat: 3, yoyo: true}, "start")
			.to(light1, {duration: "0.5", x: "100%"}, "start+=.5")
			.from(t1, {duration: "0.3", autoAlpha: 0}, "start+=.5")
			.from(t3, {duration: "0.2", autoAlpha: 0}, "start+=.7")
			.to(light2, {duration: ".5", x: "100%"}, "start+=2.5")
			.to(t1, {duration: "0.3", autoAlpha: 0}, "start+=2.5")
			.from(t2, {duration: "0.3", autoAlpha: 0}, "start+=2.5")
			;

			if (loops < max_loops) {
				mytl
				.set(light2, {x: "0%"}, "start+=3.75")
				.to(light2, {duration: ".5", x: "100%"}, "start+=5")
				.to(t2, {duration: "0.3", autoAlpha: 0}, "start+=5")
				.to(t1, {duration: "0.3", autoAlpha: 1}, "start+=5")
				.set(light2, {x: "0%"}, "start+=6")
				.to(light2, {duration: ".5", x: "100%"}, "start+=7.5")
				.to(t1, {duration: "0.3", autoAlpha: 0}, "start+=7.5")
				.to(t2, {duration: "0.3", autoAlpha: 1}, "start+=7.5")

				mytl.set(banner, { delay: 2.4, onComplete: replay_banner });
			}

		}

		function replay_banner() {
			reset_banner();
			animate_banner();
		}

		function reset_banner() {
			gsap.killTweensOf(banner_elements);
			gsap.set(banner_elements, { clearProps: "all" });
		}
		setup();
	});
};