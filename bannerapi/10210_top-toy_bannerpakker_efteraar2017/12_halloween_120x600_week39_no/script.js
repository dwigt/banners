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

	var bats = $("#bats"),
		costume1 = $("#costume1"),
		costume2 = $("#costume2"),
		costume3 = $("#costume3"),
		costume4 = $("#costume4"),
		costume5 = $("#costume5"),
		t1 = $("#t1"),
		t2 = $("#t2"),
		t3 = $("#t3"),
		t4 = $("#t4"),
		cta = $("#cta");

	var banner_elements = [
		bats,
		t1,
		t2,
		t4,
		t3,
		cta,
		costume1,
		costume2,
		costume3,
		costume4,
		costume5
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

	    mytl.staggerFrom([t1,t2],0.5,{opacity:0,scale:.8, ease:Power2.easeOut},0.25)
	    	.from([costume1,bats],0.5,{opacity:0, scale:.8, ease:Power2.easeOut})
	    	.to(costume1,0.5,{opacity:0, ease:Power2.easeOut},"+=1.75")
	    	.from(costume2,0.5,{opacity:0, scale:.8, ease:Power2.easeOut})
	    	.to(costume2,0.5,{opacity:0, ease:Power2.easeOut},"+=1.75")
	    	.from(costume3,0.5,{opacity:0,scale:.8, ease:Power2.easeOut})
	    	.to([costume3,t1,t2],0.5,{opacity:0, ease:Power2.easeOut},"+=1.75")
	    	.from([costume4,t3],0.5,{opacity:0,scale:.8, ease:Power2.easeOut})
	    	.to([costume4,t3],0.5,{opacity:0, ease:Power2.easeOut},"+=1.75")
	    	.from([costume5,t4],0.5,{opacity:0, scale:.8, ease:Power2.easeOut})
	    	.to([costume5,t4,t2,bats],0.5,{opacity:0, ease:Power2.easeOut},"+=1.75")
	    	.from(cta,0.5,{opacity:0,scale:.8, ease:Power2.easeOut});


	    	
		    
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