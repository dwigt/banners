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
	var logo 				= $("#logo");
	var txt1 				= $("#txt1");
	var txt2 				= $("#txt2");
	var btn 				= $("#btn");
	var breaker 		= $("#breaker");


	var banner_elements = [
		bg,
		logo,
		txt1,
		txt2,
		btn,
		breaker
	];

	var mytl;
	var loops 		= 0;
	var max_loops 	= 3;
	var panWidth = -204;
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
				.to(breaker, 0.1, {alpha: 0, ease:Power1.easeOut},"start")
				.to(bg,9, {x:panWidth, ease:Power0.easeNone},"start")
				.from(txt1, 1, {alpha: 0, y:-5, ease:Power4.easeOut},"start+=0.5")
				.from([btn, logo], 1, {alpha:0, y: -5, ease:Power4.easeOut}, "start+=1")
				

				.to(txt1,0.5, {alpha:0, y: 10, ease:Power1.easeIn},"start+=4.75")
				.from(txt2,0.5, {alpha:0, y: -10, ease:Power1.easeOut},"start+=5.25")

		    ;


		    

			if( loops < max_loops ){
					mytl
					.to(breaker, 0.5, {alpha: 1, ease:Power1.easeOut},"start+=10")
					.to(txt2,0.5, {alpha:0, ease:Power1.easeIn},"start+=10")
					.to([btn, logo], 0.5, {alpha: 0, ease:Power1.easeIn},"start+=10")
			    mytl.set(banner, {delay:0, onComplete:replay_banner});
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