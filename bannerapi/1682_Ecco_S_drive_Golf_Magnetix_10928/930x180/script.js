// Hide elements before running animations
var banner = $("#banner");
TweenMax.set(banner, { alpha: 0 });


$(function() {

    var scene1 = $("#scene1");
    var scene2 = $("#scene2");
    var scene3 = $("#scene3");
    var scene4 = $("#scene4");
    var text1Scene1 = $("#text1Scene1");
    var text2Scene1 = $("#text2Scene1");
    var text1Scene2 = $("#text1Scene2");
    var text2Scene3 = $("#text2Scene3");
    var text3Scene3 = $("#text3Scene3");
    var text4Scene3 = $("#text4Scene3");
    var text5Scene3 = $("#text5Scene3");
    var cta = $("#cta");
    var logo = $("#logo");

    var banner_elements = [
        scene1,
        scene2,
        scene3,
        scene4,
        text1Scene1,
        text2Scene1,
        text1Scene2,
        text2Scene3,
        text3Scene3,
        text4Scene3,
        text5Scene3,
        cta,
        logo
    ];

    var smylieKaufman = [
        text4Scene3,
        text5Scene3
    ];

    var mytl;
    var loops = 0;
    var max_loops = 99;

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
    function politeInit() {

        function setup() {
            TweenMax.set(banner, { alpha: 1 });
            reset_banner();
            animate_banner();
        }

        var video1 = document.getElementById('video1');

        Enabler.loadModule(studio.module.ModuleId.VIDEO, function() {
            studio.video.Reporter.attach('video_1', video1);
        });


        function animate_banner() {
            replay_video();
            loops++;
            mytl = new TimelineMax({ delay: 1 });

            mytl
                .staggerFrom([text1Scene1, text2Scene1], 0.5, { alpha: 0, x: -20, ease: Back.easeOut }, 0.25, "scene1")

            .from(scene2, 0.5, { alpha: 0, ease: Back.easeOut }, "scene2+=3")
                .from(text1Scene2, 0.5, { alpha: 0, x: -20, ease: Back.easeOut }, "scene2+=3.5")

            .from(scene3, 0.5, { alpha: 0 }, "scene3+=3")
                .staggerFrom([text2Scene3, text3Scene3, smylieKaufman], 0.5, { alpha: 0, x: -20, ease: Back.easeOut }, 0.25, "scene3+=3.5")

            .from(scene4, 0.5, { alpha: 0 }, "scene4+=3")
                .from(cta, 0.3, { alpha: 0, scale: 0.8, ease: Back.easeOut.config(2) }, "scene4+=3.5")
                .to(cta, 0.2, { scale: 0.9, yoyo: true, repeat: 3 }, "ctaBounce+=0.9");

            if (loops < max_loops) {
                console.log(mytl.duration());
                mytl.set(banner, { delay: 2, onComplete: replay_banner });

            }
        }

        function replay_video() {
            video1.currentTime = 0;
            video1.play();
        }

        function replay_banner() {
            reset_banner();
            animate_banner();
        }
        setup();

    };

    function reset_banner() {
        var banner_elements_length = banner_elements.length;
        for (var i = 0; i < banner_elements_length; ++i) {
            TweenMax.killTweensOf(banner_elements[i]);
            TweenMax.set(banner_elements[i], { scaleX: 1, scaleY: 1, alpha: 1, x: 0, y: 0, rotationX: 0, rotationY: 0 });
        }
    }

});