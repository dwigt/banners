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

function politeInit(){	

$(function(){
	$('#exit_click_area').on('click', function(e){
		window.open(click_tag1, landingpagetarget);
	});

	var cta = $('#cta');
	var arrow = $('#arrow');
	var t1 = $('#t1');
	var t2 = $('#t2');
	var line = $('#line');
	var name = $('#name');

	var banner_elements = [
		cta,
		arrow,
		t1,
		t2,
		line,
		name
	];

	var mytl;
	var loops 		= 0;
	var max_loops 	= 2;

	function setup(){
		TweenMax.set(banner, {alpha:1});
		reset_banner();
		animate_banner();
	}

	function animate_banner(){
		loops++;
	    mytl = new TimelineMax({delay:1});

	    mytl.from(t1,0.5,{opacity:0,ease:Power2.easeOut})
	    	.from(line,1,{scale:0,ease:Back.easeOut})
	    	.from(name,0.5,{opacity:0,ease:Power2.easeOut},"-=.5")
	    	.to(arrow,0.25,{x:+5,yoyo:true,repeat:5})
	    	.to(t1,0.5,{opacity:0})
	    	.from(t2,0.5,{opacity:0,ease:Power2.easeOut},"+=.5")
	    	.to(name,0.5,{opacity:0},"+=2")
	    	.to(line,0.5,{scale:0,ease:Back.easeIn},"-=1")
	    	.from(cta,1,{scale:0,ease:Back.easeOut})
	    	.to(arrow,0.25,{x:+5,yoyo:true,repeat:5})




	

		if( loops < max_loops ){
	    	mytl.to(t2,0.5,{opacity:0},"+=3")
	    		.to(cta,.5,{scale:0});

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
}