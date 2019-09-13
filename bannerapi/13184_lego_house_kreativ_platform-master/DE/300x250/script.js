// Hide elements before running animations
var banner = $("#banner");
TweenMax.set(banner, {alpha:0});

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
function politeInit(){		
  
$(function(){

	var bg1 = $('.bg1');
	var bg2 = $('.bg2');
	var bg3 = $('.bg3');
	var bg4 = $('.bg4');
	var cta1 = $('.cta1'); 
	var cta2 = $('.cta2');
	var cta3 = $('.cta3');
	var cta4 = $('.cta4');

	var banner_elements = [
		bg1, bg2, bg3, bg4, cta1, cta2, cta3, cta4
	];


	var mytl;
	var loops 		= 0;
	var max_loops 	= 3;

	function setup(){
		TweenMax.set(banner, {alpha:1});
		reset_banner();
		animate_banner();
	}

	function animate_banner(){
		loops++;
		mytl = new TimelineMax({delay:0});

		mytl
		.to([bg1, cta1], 1, {right: "-100%", ease: Power1.easeOut}, "start+=3")
		.from([bg2, cta2], 1, {right: "100%", ease: Power1.easeOut}, "start+=3")
		.to([bg2, cta2], 1, {right: "-100%", ease: Power1.easeOut}, "start+=6")
		.from([bg3, cta3], 1, {right: "100%", ease: Power1.easeOut}, "start+=6")
		;


		if( loops < max_loops ){
			mytl
			.to([bg3, cta3], 1, {right: "-100%", ease: Power1.easeOut}, "start+=9")	
			.from([bg4, cta4], 1, {right: "100%", ease: Power1.easeOut, onComplete:replay_banner}, "start+=9")
		}
		if( loops === max_loops ){
			mytl
			.to([bg3, cta3], 1, {right: "-100%", ease: Power1.easeOut}, "start+=9")	
			.from([bg4, cta4], 1, {right: "100%", ease: Power1.easeOut}, "start+=9")
		}	
	}

	function replay_banner(){
		reset_banner();
		animate_banner();
	}

	function reset_banner(){
		TweenMax.killAll(false,true,false);
		TweenMax.set(banner_elements, {clearProps:"all"});
	}
		setup();
	});		
};
