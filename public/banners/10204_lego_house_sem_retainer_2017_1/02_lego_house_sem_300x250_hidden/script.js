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

	var img1 							= $("#img1");
	var txt2 							= $("#txt2");
	var rollover 					= $("#rollover");
	var clip_content      = $("#clip_content");
	var arrow     		 		= $("#arrow");


	var banner_elements = [
		img1,
		txt2,
		clip_content,
		rollover,
		arrow,
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
	    scene1 = new TimelineMax({delay:0});

			scene1
			.from(img1, 0.25, {alpha: 0, ease: Power3.easeOut}, "scene1")
			.to(img1, 7, {scale: 0.7, ease: Power3.easeOut}, "scene1+=0.3")
			.to(arrow, 0.5, {x: 10, repeat: 3, yoyo:true, ease: Power1.easeIn}, "scene1+=3")
	

		if( loops < max_loops ){
				scene1.to([img1], 0.25, {alpha:0}, "scene1+=8")
		    scene1.set(banner, {delay:0, onComplete:replay_banner});
		}
	}

	function replay_banner(){
		reset_banner();
		animate_banner();
	}
		setup();
	function reset_banner(){
		var banner_elements_length = banner_elements.length;
		for (var i=0;i<banner_elements_length;++i){
			TweenMax.killTweensOf(banner_elements[i]);
			TweenMax.set(banner_elements[i], {scaleX:1,scaleY:1,alpha:1,x:0,y:0,rotationX:0,rotationY:0});
	}
	}

	});		
};