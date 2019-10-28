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
var flower_clipMask = $("#flower_clipMask"),
flower							= $("#flower_wrapper"),
brush								= $("#brush"),
// text_clipMask				= $("#text_clipMask"),
// text_wrapper				= $("#text_wrapper"),
pink_brush					= $("#pink_brush"),
t1l1								= $("#t1l1"),
t1l2								= $("#t1l2"),
t2l1								= $("#t2l1"),
t2l2								= $("#t2l2"),
cta									= $("#cta"),
lash_logo						= $("#lash_logo");
		var banner_elements = [
			flower_clipMask, flower, brush, pink_brush, t1l1, t1l2, t2l1, t2l2, cta, lash_logo
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
			.staggerFrom([lash_logo, t1l1, t1l2], 1, {opacity: 0, ease: Power1.easeOut}, .4, "start+=0")
			.to(flower_clipMask, .5, { rotation: 0, transformOrigin: "0 600px", ease: Power0.easeNone}, "flower+=0")
			.from(flower, .5,{ rotation: -90, transformOrigin: "0 600px", ease: Power0.easeNone}, "flower+=0")
			.to(brush, .5, {rotation: -90, transformOrigin: "bottom left", ease: Power0.easeNone}, "flower+=0.30")
			.to(brush, .5, {rotation: -180, transformOrigin: "bottom left", ease: Power0.easeNone}, "+=0")
			
			// .to(text_clipMask, 1.5, {rotation: -90, transformOrigin: "bottom right"}, "-=1")
			// .to(text_wrapper, 1.5, {rotation: 90, transformOrigin: "bottom right"}, "-=1.5")
    	.to([lash_logo, t1l1, t1l2], .35, {opacity: 0}, "-=.5")
			.from(pink_brush, .75, {opacity: 0, ease: Power1.easeOut}, "-=1")
			.from(t2l1, .4, {opacity: 0, ease: Power1.easeOut}, "+=0")
			.from(t2l2, .4, {opacity: 0, ease: Power1.easeOut}, "+=0")
	
			.from(cta, .75, {scale: 0, ease: Back.easeOut.config(1.8)}, "+=0")
				;
			if (loops < max_loops) {
				mytl
					mytl.to([flower, pink_brush, cta, t2l1, t2l2], .25, {opacity: 0}, "+=1.5")
				console.log(mytl.duration());

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