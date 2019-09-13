// Hide elements before running animations
var banner = $("#banner");
TweenMax.set(banner, {alpha:0});

$(function(){
	click_tag1 = dhtml.getVar('clickTAG1', 'http://www.example.com/');
	landingpagetarget = dhtml.getVar('landingPageTarget', '_blank');
	$('#exit_click_area').on('click', function(e){
		window.open(click_tag1, landingpagetarget);
	});
	var polite_load = true;
	polite_load = false; // Comment out to enable polite load

	var text1_1		=	$("#text1_1");
	var text1_2		=	$("#text1_2");
	var text2_1		=	$("#text2_1");
	var cta			=	$(".cta");



	var banner_elements = [
		text1_1,
		text1_2,
		text2_1,
		cta

	];

	var mytl;
	var loops 		= 0;
	var max_loops 	= 3;

	//Clip setup
	var clip1_width = $("#clip_box_text1_1").width();
	var clip1_height = $("#clip_box_text1_1").height();
	var clip1_start	= "rect(0px 0px "+clip1_height+"px 0px)";

	var clip2_width = $("#clip_box_text1_2").width();
	var clip2_height = $("#clip_box_text1_2").height();
	var clip2_start	= "rect(0px 0px "+clip2_height+"px 0px)";

	var clip3_width = $("#clip_box_text2_1").width();
	var clip3_height = $("#clip_box_text2_1").height();
	var clip3_start	= "rect(0px 0px "+clip3_height+"px 0px)";

	var video = document.getElementById('video');

	$( "#exit_click_area" ).mouseover(function() {
	  TweenMax.to("#cta_orange", 0.3, {opacity:1})
	  
	});

	$( "#exit_click_area" ).mouseout(function() {
	  TweenMax.to("#cta_orange", 0.3, {opacity:0})
	  
	});


	function setup(){
		TweenMax.set(banner, {alpha:1});
		reset_banner();
		animate_banner();
		video.play();
	}

	function animate_banner(){
		loops++;
	    mytl = new TimelineMax({delay:1});

	    mytl
	    	.from(text1_1, 0.8, {delay:0 , clip:clip1_start, ease:Power0.easeNone}, "scene1")
	    	.from(cta, 0.5, {opacity:0, ease:Power2.easeOut},"+=0.5")
	    	.to([text1_1],0.5,{opacity:0, ease:Power2.easeOut}, "+=2")
	    	.from(text1_2, 0.8, {delay:0 , clip:clip2_start, ease:Power0.easeNone},"scene2")
	    	.from(text2_1, 0.8, {delay:0 , clip:clip3_start, ease:Power0.easeNone},"scene2+=0.8")
	    	
	    ;

		if( loops < max_loops ){
		    mytl.set(banner, {delay:4, onComplete:replay_banner});
		}else{
			setTimeout(function(){
				video.pause();
			},7000)
		}


	}

	function replay_banner(){
		video.pause();
		video.currentTime = 0;
		reset_banner();
		animate_banner();
		video.play()

	}

	function reset_banner(){
		TweenMax.killAll(false,true,false);
		TweenMax.set(banner_elements, {clearProps:"all"});
	}

	if(polite_load){
		dhtml.sharedEvents.once('pageLoadComplete', setup); 
		dhtml.external.initPoliteMode();
	}else{
		setup();
	}
});