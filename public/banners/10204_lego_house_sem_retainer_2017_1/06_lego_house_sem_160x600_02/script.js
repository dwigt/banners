// Hide elements before running animations
var banner = $("#banner");
TweenMax.set(banner, {alpha:0});

// if (Enabler.isInitialized()) {
//   init();
// } else {
//   Enabler.addEventListener(studio.events.StudioEvent.INIT, init);
// }

// // Runs when Enabler is ready.
// function init() {
//   if (Enabler.isPageLoaded()) {
//     politeInit();
//   } else {
//     Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, politeInit);
//   }
// };
politeInit();
// Runs when the page is completely loaded.		
function politeInit(){
	

  
$(function(){

	var img1 							= $("#img1");
	var txt1_0 							= $("#txt1_0");
	var txt1_1 							= $("#txt1_1");
	var txt1_2 							= $("#txt1_2");
	var txt1_3 							= $("#txt1_3");
	var txt2_0							= $("#txt2_0");
	var txt2_1 							= $("#txt2_1");
	var txt2_2 							= $("#txt2_2");
	var txt2_3 							= $("#txt2_3");
	var txt2_4 							= $("#txt2_4");
	var arrow     		 				= $("#arrow");


	var banner_elements = [
		arrow,
		txt1_0,
		txt1_1,
		txt1_2,
		txt1_3,
		txt2_0,
		txt2_1,
		txt2_2,
		txt2_3,
		txt2_4

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
			.staggerFrom([txt1_0, txt1_1, txt1_2, txt1_3], 0.25, {x: -5, alpha: 0, ease: Power3.easeOut}, 0.10, "scene1+=0.5")
			.staggerTo([txt1_0, txt1_1, txt1_2, txt1_3], 0.25, {x: 5, alpha: 0, ease: Power3.easeIn}, 0.10, "scene1+=3")
			.to(arrow, 0.5, {x: 10, repeat: 3, yoyo:true, ease: Power1.easeIn}, "scene1+=3")
			.staggerFrom([txt2_0, txt2_1, txt2_2, txt2_3, txt2_4], 0.25, {x: -5, alpha: 0, ease: Power3.easeOut}, 0.10, "scene1+=3.5")
			
			
	

		if( loops < max_loops ){
			scene1.staggerTo([txt2_0, txt2_1, txt2_2, txt2_3, txt2_4], 0.25, {x: 5, alpha: 0, ease: Power3.easeIn}, 0.10, "scene1+=7")
		    scene1.set(banner, {delay:0, onComplete:replay_banner});
		}

		scene2 = new TimelineMax({delay:0});
		scene2
		.to(img1, 25, {scale: 0.7}, "scene2+")
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