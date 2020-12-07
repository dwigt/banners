// Hide elements before running animations
var banner = $("#banner");


$(function(){
	click_tag1 = dhtml.getVar('clickTAG1', 'http://www.example.com/');
	landingpagetarget = dhtml.getVar('landingPageTarget', '_blank');
	$('#exit_click_area').on('click', function(e){
		window.open(click_tag1, landingpagetarget);
	});
	var polite_load = false;
	polite_load = false; // Comment out to enable polite load


	if(polite_load){
		dhtml.sharedEvents.once('pageLoadComplete', setup); 
		dhtml.external.initPoliteMode();
	}
});