// Hide elements before running animations
var banner = $("#banner");

$(function(){

	var bg 				= $("#bg");
	var line1 			= $("#line1");
	var line2			= $("#line2");
	var sko1			= $("#sko1");
	var sko2			= $("#sko2");
	var speed			= $("#speed");
	var logos			= $("#logos");
	var btn 			= $("#btn");

	var banner_elements = [
	line1,
	line2,
	logos,
	sko1,
	sko2,
	speed,
	btn,
	];

	var scene1;
	var loops 		= 0;
	var max_loops 	= 3;



	function on_page_load_complete(){

		function setup(){

			TweenMax.set(banner, {alpha:0});
			reset_banner();
			animate_banner();
		}

		function animate_banner(){
			TweenMax.defaultEase = Expo.easeOut;
			TweenMax.set(banner, {alpha:1});
			loops++;
		    scene1 = new TimelineMax({delay:0});

			if(loops < max_loops){
				scene1
		    	.from(speed, 1.5, {alpha:0, ease: Power1.EaseOut})
		    	.from(line1, 1, {x:606, ease: Expo.easeOut}, "scene1+=1")
		    	.from(line2, 1, {x:-606, ease: Expo.easeOut}, "scene1+=1")
		    	.from(sko1, 1.1, {x:-606, ease: Expo.EaseOut}, "scene1+=1")
		    	.from(sko2, 1.1, {x:606, ease: Expo.EaseOut}, "scene1+=1")
				.from(logos, 1, {alpha:0, ease: Power1.EaseOut}, "scene1+=2.5")

		    	.staggerFrom(btn, 0.5, {scale:0, alpha:0, ease: Back.easeOut.config(1.7)}, 0.25, "scene1+=4")
	    	    .to(btn, 0.4, {scale: "1.1", repeat:2, yoyo: true}, "scene1+=7")
				.to(btn, 0.4, {scale: "1"}, "scene1+=8.2")
		    	.staggerTo(btn, 0.4, {scale:0,alpha:0, ease: Back.easeIn.config(1.7)}, 0.25, "scene1+=10.5")
				.to(logos, 0.5, {alpha:0, ease: Power1.EaseOut}, "scene1+=11.5")
				.to(speed, 0.5, {alpha:0, ease: Power1.EaseIn}, "scene1+=12")
		    	.to(line1, 1, {x:606, ease: Expo.EaseIn}, "scene1+=12.5")
		    	.to(line2, 1, {x:-606, ease: Expo.EaseIn}, "scene1+=12.5")
		    	.to(sko1, 1.1, {x:-606, ease: Expo.EaseIn}, "scene1+=12.5")
		    	.to(sko2, 1.1, {x:606, ease: Expo.EaseIn}, "scene1+=12.5")
			    .set(banner, {delay:0, onComplete:replay_banner});
			}

			if(loops === max_loops ){
				scene1
		    	.from(speed, 1.5, {alpha:0, ease: Power1.EaseOut})
		    	.from(line1, 1, {x:606, ease: Expo.easeOut}, "scene1+=1")
		    	.from(line2, 1, {x:-606, ease: Expo.easeOut}, "scene1+=1")
		    	.from(sko1, 1.1, {x:-606, ease: Expo.EaseOut}, "scene1+=1")
		    	.from(sko2, 1.1, {x:606, ease: Expo.EaseOut}, "scene1+=1")
				.from(logos, 1, {alpha:0, ease: Power1.EaseOut}, "scene1+=2.5")
		    	.staggerFrom(btn, 0.5, {scale:0, alpha:0, ease: Back.easeOut.config(1.7)}, 0.25, "scene1+=4")
	    	    .to(btn, 0.4, {scale: "0.8", repeat:2, yoyo: true}, "scene1+=7")
				.to(btn, 0.4, {scale: "1"}, "scene1+=8.2")
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