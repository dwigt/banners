// Hide elements before running animations
var banner = $("#banner");
TweenMax.set(banner, {
	alpha: 0
});

$(function () {

	var txt1 = $("#txt1")
	var txt2 = $("#txt2")
	var btn1 = $("#btn1")


	var banner_elements = [
		txt1 = $("#txt1"),
		txt2 = $("#txt2"),
		btn1 = $("#btn1")
	];

	var mytl;
	var loops = 0;
	var max_loops = 99;

	function on_page_load_complete() {

		function setup() {
			TweenMax.set(banner, {
				alpha: 1
			});
			reset_banner();
			animate_banner();
		}
		var video1 = document.getElementById('video1');

		Enabler.loadModule(studio.module.ModuleId.VIDEO, function () {
			studio.video.Reporter.attach('video_1', video1);
		});

		function bgExitHandler(e) {
		  Enabler.exit('Background Exit');
		}

		document.getElementById('exit_click_area').addEventListener('click', bgExitHandler, false);



		function animate_banner() {

			loops++;
			mytl = new TimelineMax({
				delay: 0
			});
			mytl.from([txt1, btn1], 1, {
				alpha: 0
			}, "mytl")
			mytl.to(txt1, 1, {
				alpha: 0
			}, "mytl+=3")
			mytl.from(txt2, 1, {
				alpha: 0
			}, "mytl+=3.5")
			// mytl.set(banner, {onComplete:replay_video});

			if (loops < max_loops) {
				mytl.set(banner, {
					delay: 4,
					onComplete: replay_banner
				});

			}
		}
		// Custom events //



		function restartVideo() {
			var video = document.getElementById("video1");
			video.currentTime = 0;
			video.play();
		}

		function replay_banner() {
			restartVideo();
			reset_banner();
			animate_banner();
		}
		setup();
	}

	function reset_banner() {
		var banner_elements_length = banner_elements.length;
		for (var i = 0; i < banner_elements_length; ++i) {
			TweenMax.killTweensOf(banner_elements[i]);
			TweenMax.set(banner_elements[i], {
				scaleX: 1,
				scaleY: 1,
				alpha: 1,
				x: 0,
				y: 0,
				rotationX: 0,
				rotationY: 0
			});
		}
	}

	on_page_load_complete();
});