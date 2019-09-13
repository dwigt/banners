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

	var bg 				= $("#bg");
	var logo 			= $("#logo");
	var splash 			= $("#splash");
	var t1 				= $("#t1");
	var t2 				= $("#t2");
	var btn 			= $("#btn");


	var banner_elements = [
		bg,
		logo,
		splash,
		t1,
		t2,
		btn
	];

	var mytl;
	var loops 		= 0;
	var max_loops 	= 3;

	function on_page_load_complete(){

		function setup(){
			TweenMax.set(banner, {alpha:1});
			reset_banner();
			animate_banner();
		}

		function animate_banner(){
			loops++;
		    mytl = new TimelineMax({delay:0.5});

		    mytl
		    	.to(bg,8.5, {x:-185, scale:1.21, ease:Power0.easeNone},"start")
		    	.to(splash,0.5, {x:+64, y:5, ease:Power1.easeOut,scale:0.4},"start")
		    	.from(logo,0.5, {alpha:0},"start+=0.5")
		    	.from(btn,0.5, {alpha:0},"start+=0.5")
		    	.from(t1,0.5, {alpha:0, ease:Power1.easeIn},"start+=0.5")
		    	.to(t1,0.5, {alpha:0, ease:Power1.easeOut},"start+=4.5")
		    	.from(t2,0.5, {alpha:0, ease:Power1.ease},"start+=5.5")
		    ;


		    

			if( loops < max_loops ){
			    mytl.set(banner, {delay:2, onComplete:replay_banner});
			}
		}

		function replay_banner(){
			reset_banner();
			animate_banner();
		}
		setup();
	}
	function reset_banner(){
		var banner_elements_length = banner_elements.length;
		for (var i=0;i<banner_elements_length;++i){
			TweenMax.killTweensOf(banner_elements[i]);
			TweenMax.set(banner_elements[i], {scaleX:1,scaleY:1,alpha:1,x:0,y:0,rotationX:0,rotationY:0});
		}

	}
		on_page_load_complete();
	});		
};