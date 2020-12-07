// Hide elements before running animations
var banner = $("#banner");
TweenMax.set(banner, {alpha:0});

$(function(){


	var light1			=	$("#light1");
	var clipper			=	$("#clipper");
	var vr1				=	$("#vr1");
	var vr2				=	$("#vr2");
	var vr3				=	$("#vr3");
	var txt1			=	$("#text1");

	var txt2			=	$("#text2");

	var txt3			=	$("#text3");
	var txt3_1			=	$("#text3_1");
	var btn				=	$("#btn");

	var banner_elements = [
		light1,
		vr1,
		vr2,
		vr3,
		txt1,
		txt2,
		txt3,
		txt3_1,
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
		    mytl = new TimelineMax({delay:0});

			mytl	
				.staggerFrom([txt1, btn], 0.5, {y:-5,  alpha: 0, ease: Power1.easeOut }, 0.25, "scene1+=0.5")
				.from(vr1, 2.5, {x: -5, ease:Power1.easeOut}, "scene1+=0.5")
				.from(vr1, 0.5, {alpha:0, ease: RoughEase.ease.config({ strength: 1, points: 10, taper: "none", randomize: false, clamp: true})}, "scene1+=0.5")

				.to(txt1, 0.5, {y:-5, alpha: 0, ease: Power1.easeOut}, "scene1+=2.5")


				.from(txt2, 0.5, {y:-5,  alpha: 0, ease: Power1.easeOut}, "scene1+=3.5")

				.to(vr1, 0.5, {alpha:0, ease: RoughEase.ease.config({ strength: 1, points: 10, taper: "none", randomize: false, clamp: true})}, "scene1+=3.5")

				.to(txt2, 0.5, {y:-5, alpha: 0, ease: Power1.easeOut}, "scene1+=5.6")

				.from(vr3, 2.5, {x: 5, ease:Power1.easeOut}, "scene1+=5.7")
				.from(vr3, 0.5, {alpha:0, ease: RoughEase.ease.config({ strength: 1, points: 10, taper: "none", randomize: false, clamp: true})}, "scene1+=5.7")

				.staggerFrom([txt3, txt3_1], 1, {alpha: 0, ease: Power1.easeOut}, 0.75, "scene1+=6.5")
				
				.to(vr3, 0.5, {alpha:0, ease: RoughEase.ease.config({ strength: 1, points: 10, taper: "none", randomize: false, clamp: true})}, "scene1+=7.7")
				




				
		
			if( loops < max_loops ){

		    	mytl.to([txt3, txt3_1, btn, vr1, vr3], 0.5, {alpha:0, ease:Power2.easeOut}, "scene1+=10.5")
			    mytl.set(banner, {delay:0, onComplete:replay_banner}, "scene1+=11");

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