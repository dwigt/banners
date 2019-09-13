// Hide elements before running animations
var banner = $("#banner");
TweenMax.set(banner, {alpha:0});

$(function(){
	clickTAGvalue = dhtml.getVar('clickTAG', 'http://www.example.com');//banner will receive clickTAG value - if not defined, banner will land to example.com
    landingpagetarget = dhtml.getVar('landingPageTarget', '_blank');//landingPageTarget variable enables to change target from Adform system.
	var clickArea = document.getElementById('exit_click_area');
	
    clickArea.onclick = function() {
        window.open(clickTAGvalue,landingpagetarget); //when banner is clicked it will open new window directing to clickTAG value
	}
	var polite_load = true;
	polite_load = false; // Comment out to enable polite load


	var drawline	= $('#path');
	var cliprect 	= $('#cliprect');
	var spool 		= $('#spool');
	var txt1 		= $('#txt1');
	var txt2 		= $('#txt2');
	var txt3 		= $('#txt3');
	var txt4 		= $('#txt4');
	var txt0		= $('#txt0');

	var banner_elements = [
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
	    mytl = new TimelineMax({delay:0});

		mytl
		.from(spool, 2, {y: -200}, "scene1+=3.0")
		.to(txt0, 2, {autoAlpha: 0}, "scene1+=3.0")
		.fromTo(drawline, 15, {drawSVG:"0%"}, {drawSVG:"100%"}, "scene1+=5.0")
		.from(txt1, 1, {autoAlpha: 0}, "scene1+=6.0")
		.from(txt2, 1, {autoAlpha: 0}, "scene1+=10.0")
		.to(txt1, 1, {autoAlpha: 0}, "scene1+=10")
		.from(txt3, 1, {autoAlpha: 0}, "scene1+=12.0")
		.to(txt2, 1, {autoAlpha: 0}, "scene1+=14")
		.to(txt3, 0.5, {autoAlpha: 0}, "scene1+=14.5")
		.from(txt4, 1, {autoAlpha: 0}, "scene1+=15.0")
	    ;

		// if( loops < max_loops ){
		//     mytl.set(banner, {delay:0, onComplete:replay_banner});
		// }
	}

	function replay_banner(){
		reset_banner();
		animate_banner();
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