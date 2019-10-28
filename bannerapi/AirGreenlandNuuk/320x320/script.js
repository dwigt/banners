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
			logo = $("#logo"),
			bg1 = $("#bg1"),
			bg2 = $("#bg2"),
			bg3 = $("#bg3"),
			bg4 = $("#bg4"),
			bg5 = $("#bg5")

		var banner_elements = [
			t1, logo, bg1, bg2, bg3, bg4, bg5
		];

		var mytl;
		var loops = 0;
		var max_loops = 2;

		function setup() {
			TweenMax.set(banner, { alpha: 1 });
			reset_banner();
			animate_banner();
		}

		function animate_banner() {
			loops++;
			mytl = new TimelineMax({ delay: 0 });

			mytl
				.from(bg1, 3, { scale: 1.1, ease: ExpoScaleEase.config(1.1, 1), rotation: 0.01 }, "start")
				.to(bg1, 2, { opacity: 0 }, "start+=3")
				.from(bg2, 2, { opacity: 0 }, "start+=3")
				.from(bg2, 3, { scale: 1.1, ease: ExpoScaleEase.config(1.1, 1), rotation: 0.01 }, "start+=3")
				.to(bg2, 2, { opacity: 0 }, "start+=6")
				.from(bg3, 2, { opacity: 0 }, "start+=6")
				.from(bg3, 3, { scale: 1.1, ease: ExpoScaleEase.config(1.1, 1), rotation: 0.01 }, "start+=6")
				.to(bg3, 2, { opacity: 0 }, "start+=9")
				.from(bg4, 2, { opacity: 0 }, "start+=9")
				.from(bg4, 3, { scale: 1.1, ease: ExpoScaleEase.config(1.1, 1), rotation: 0.01 }, "start+=9")
				.to(bg4, 2, { opacity: 0 }, "start+=12")
				.from(bg5, 2, { opacity: 0 }, "start+=12")
				.from(bg5, 3, { scale: 1.1, ease: ExpoScaleEase.config(1.1, 1), rotation: 0.01 }, "start+=12")
				;

			if (loops < max_loops) {
				mytl.set(bg1, { opacity: 1, scale: 1.1 }, "start+=14")
				mytl.to([bg5], .5, { opacity: 0 }, "start+=14.5")
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