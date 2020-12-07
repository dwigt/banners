// Hide elements before running animations
var banner = $("#banner");
TweenMax.set(banner, { alpha: 0 });

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
		var t1 = $("#t1"),
			overlay = $("#overlay"),
			cabbage = $("#cabbage"),
			friland = $("#friland"),
			logos = $("#logos"),
			chops = $("#chops"),
			thyme = $("#thyme"),
			scene2bg = $("#scene2bg"),
			t2 = $("#t2"),
			logobg = $("#logobg"),
			cta = $("#cta");

		var banner_elements = [
			t1, overlay, cabbage, friland, logos, chops, thyme, scene2bg, t2, cta, logobg
		];

		var mytl;
		var loops = 0;
		var max_loops = 3;

		function setup() {
			TweenMax.set(banner, { alpha: 1 });
			reset_banner();
			animate_banner();
			;
		}

		function animate_banner() {
			loops++;
			mytl = new TimelineMax({ delay: 0 });
			mytl
				.to(overlay, .2, { opacity: 0 }, "start")
				.staggerFrom([cabbage, friland], .4, { opacity: 0, ease: Power1.easeOut }, .2, "start")
				.from(t1, .25, { y: -5, opacity: 0, ease: Power1.easeOut }, "start+=0.2")
				.from(thyme, .6, { y: -15, x: "-100%", rotation: -35, opacity: 0, ease: Power2.easeOut }, "+=0")
				.from(chops, .6, { left: "100%", opacity: 0, ease: Power2.easeOut }, "-=.6")
				.from(logobg, .6, { opacity: 0 }, "-=.6")
				.from(logos, .5, { opacity: 0, y: -5, ease: Power1.easeOut }, "+=0")
				.from(scene2bg, .5, { opacity: 0, ease: Power1.easeOut }, "+=2.65")
				.to(scene2bg, 5, { scale: 0.91, rotation: 0.01, ease: ExpoScaleEase.config(0.91, 1) }, "-=.5")
				.from(t2, .35, { y: -5, opacity: 0, ease: Power1.easeOut }, "scene2-=4.8")
				.from(cta, .35, { opacity: 0, y: -5, ease: Power1.easeOut }, "scene2-=4.6")
				.to(cta, 0.2, { scale: 0.9, force3D: false, repeat: 3, yoyo: true }, "scene2-=2.4")
				;

			if (loops < max_loops) {
				mytl.to(overlay, .1, { opacity: 1 }, "end+=.6")
				mytl.set(banner, { delay: 0, onComplete: replay_banner });
			}
		}

		function replay_banner() {
			reset_banner();
			animate_banner();
		}

		function reset_banner() {
			TweenMax.killAll(false, true, false);
			TweenMax.set(banner_elements, { clearProps: "all" });
		}
		setup();
	});
};