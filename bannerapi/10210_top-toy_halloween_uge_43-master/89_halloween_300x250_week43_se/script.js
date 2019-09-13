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

	var banner_elements = [

	];

	var mytl;
	var loops 		= 0;
	var max_loops = 99;

	function setup(){
		TweenMax.set(banner, {alpha:1});
		reset_banner();
		animate_banner();
	}

	function animate_banner(){
		loops++;
	    mytl = new TimelineMax({delay:0});

			mytl
			  .from(['#t1'],0.4,{opacity:0, ease:Power2.easeOut})
	    	.from(['#price','#costume1'],0.4,{opacity:0,scale:0.8, ease:Power2.easeOut})
	    	.to(['#costume1'],0.4,{opacity:0, ease:Power2.easeIn},"+=1.9")
	    	.from('#costume2',0.4,{opacity:0,scale:0.8, ease:Power2.easeOut},"+=0.5")
				.to(["#t1",'#price','#costume2'],0.4,{opacity:0, ease:Power2.easeIn},"+=1.9")
				.from(['#hand1'],0.4,{opacity:0, ease:Power2.easeOut},"+=0.5")
			  .from('#t2',0.4,{opacity:0, ease:Power2.easeOut})
				.to(['#hand1', '#t2'],0.4,{opacity:0, ease:Power2.easeIn},"+=1.9")
				.from('#t3',0.4,{opacity:0, ease:Power2.easeOut}, "+=0.5")
				.from(['#skull', '#costume3'],0.4,{opacity:0,scale:0.8, ease:Power2.easeOut},"-=.25")
	    	.to(['#t3','#costume3', '#skull'],0.4,{opacity:0, ease:Power2.easeIn},"+=1.9")
				.from(['#t4'],0.4,{opacity:0, ease:Power2.easeOut})
	    	.from(['#costume4'],0.4,{opacity:0,scale:0.8, ease:Power2.easeOut},"-=.25")
				.to(['#t4','#costume4','#logo'],0.4,{opacity:0, ease:Power2.easeIn},"+=1.9")
				.from(['#t5','#last_hand'],0.4,{opacity:0, y: 100, ease:Power2.easeOut},"+=.25")
	    	.from('#logo_big',0.4,{opacity:0,scale:0.8, ease:Power2.easeOut},"-=.25")
	    	
	    ;


		if( loops < max_loops ){
		    mytl.set(banner, {delay:0, onComplete:replay_banner});
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