// Hide elements before running animations
var banner = $("#banner");
TweenMax.set(banner, {
	alpha: 0
});

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

		var txt1 = $("#txt1")
		var txt2 = $("#txt2")
		var btn1 = $("#btn1")
		var bg = $("#bg")


		var banner_elements = [
			txt1 = $("#txt1"),
			txt2 = $("#txt2"),
			btn1 = $("#btn1"),
			bg = $("#bg"),
		];

		var mytl;
		var loops = 0;
		var max_loops = 99;

		function setup() {
			TweenMax.set(banner, {
				alpha: 1
			});
			reset_banner();
			animate_banner();
		}



		function animate_banner() {

			loops++;
			mytl = new TimelineMax({
				delay: 0
			});
			mytl.from(bg, 10, {
				x: -117, ease: Sine.easeOut
			}, "mytl")
			mytl.from(txt1, 1, {
				alpha: 0, ease: Power2.easeOut
			}, "mytl")
			mytl.to(txt1, 1, {
				alpha: 0, ease: Power2.easeOut
			}, "mytl+=3")
			mytl.from([txt2, btn1], 1, {
				alpha: 0, ease: Power2.easeOut
			}, "mytl+=3.5")
			// mytl.set(banner, {onComplete:replay_video});

			if (loops < max_loops) {
				mytl.set(banner, {
					delay: 0,
					onComplete: replay_banner
				});

			}
		}
		// Custom events //



		function replay_banner() {
			reset_banner();
			animate_banner();
		}

		function reset_banner() {
			var banner_elements_length = banner_elements.length;
			for (var i = 0; i < banner_elements_length; ++i) {
				TweenMax.killTweensOf(banner_elements[i]);
				TweenMax.set(banner_elements[i], {
					scaleX: 1,
					scaleY: 1,
					alpha: 1,
					x: 0,
					y: 0,
					rotationX: 0,
					rotationY: 0
				});
			}
		}
		setup();
	});
}