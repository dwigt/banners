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
		var bannerHeight = $("#banner").outerHeight();


		var svgViewbox = document.querySelector("#svg").getAttribute("viewBox");
		var svgViewboxArr = svgViewbox.split(" ");
		var svgScaleFactor = svgViewboxArr[3] / bannerHeight;

		var svgHeight = bannerHeight * svgScaleFactor;

		var snowflakes = $(".cls-1");
		var splitText1 = new SplitText("#t1", { type: "chars"});
		var splitText2 = new SplitText("#t2", {type: "chars"})
		var t1 = splitText1.chars;
		var t2 = splitText2.chars;
		var banner_elements = [
			snowflakes
		];

		var mytl;
		var loops = 0;
		var max_loops = 3;

		function setup() {
			TweenMax.set(banner, { alpha: 1 });
			reset_banner();
			animate_banner();
		}

		function animate_banner() {
			loops++;

			mytl = new TimelineMax({ delay: 0 })

			snowflakes.each(function (index, element) {
				mytl.call(flakeAnimations, [index, element])
			})
			mytl

			.staggerFrom(t1, 0.45, { opacity: 0, ease: Power1.easeOut }, 0.05, "start")
			.from(cta, 0.45, {scale:0, ease:  Back.easeOut.config(2.5)}, "start+=1.25")
			.to(t1, 0.25, {opacity: 0, ease: Power1.easeIn,}, "start+=4")
			.staggerFrom(t2, 0.45, { opacity: 0, ease: Power1.easeOut, }, 0.05, "start+=4.25")
			.to(cta, 0.3, {scale: 1.25, yoyo: true, repeat: 1, ease: Power1.easeInOut,},"start+=6")
				;
			if (loops < max_loops) {
				mytl.set(banner, { delay: 2, onComplete: replay_banner });
			}
			if (loops >= max_loops) {
				mytl
				.set(snowflakes, {x: 0, y: 0}, "+=0")
				.set(t2, { opacity: 0 }, "+=0")
				.set(t1, { x: 0, y: 0, opacity: 1 }, "+=0")
				.add(function() {TweenMax.pauseAll()}, "+=0")
			}
		}



		function flakeAnimations(index, element) {

			// flakeTL = new TimelineMax({ delay: 0 })

			var distanceFromTop = element.getBBox().y;
			var elementHeight = element.getBBox().height;
			var distanceFromTopAfterTransform = element.getBoundingClientRect().top * svgScaleFactor;
			var pxPerSecond = 70;

			var distance = (svgHeight + elementHeight - distanceFromTop);
			var rotation = -(Math.random() * (180 - 80) + 80);


			var velocity = ((svgHeight - distanceFromTopAfterTransform + (elementHeight * 4)) / pxPerSecond);
			// var velocity = (Math.random() * (5 - 4) + 4);
			animate_flake(element);

			function animate_flake(element) {
				TweenMax.to(element, velocity, { y: distance, rotation: rotation, ease: Linear.easeNone, onComplete: flakeHasFallen, onCompleteParams: [index, element] });
			}

			function flakeHasFallen(index, element) {
				TweenMax.set(element, { y: 0 - (distanceFromTop + elementHeight), rotation: 0, ease: Linear.easeNone, onComplete: flakeAnimations, onCompleteParams: [index, element] });
			}
		}

		function replay_banner() {
			reset_banner();
			animate_banner();
		}

		function reset_banner() {
			TweenMax.killAll(false, true, false);
			TweenMax.set([t1, t2], { x: 0, y: 0, opacity: 1 })
			TweenMax.set(banner_elements, { clearProps: "all" });
		}
		setup();
	});
};