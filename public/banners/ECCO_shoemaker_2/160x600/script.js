// Hide elements before running animations
var banner = $("#banner");
TweenMax.set(banner, { alpha: 0 });


$(function() {

    var scene1 = $("#scene1");
    var scene2 = $("#scene2");
    var scene3 = $("#scene3");
    var text1Scene2 = $("#text1Scene2");
    var text2Scene2 = $("#text2Scene2");
    var text3Scene2 = $("#text3Scene2");
    var bigText = $("#bigText");
    var text4Scene2 = $("#text4Scene2");
    var bg = $("#bg");
    var cta = $("#cta");
    var logoBig = $("#logoBig");
    var logoSmall = $("#logoSmall");
    var shoe = $("#shoe");

    var banner_elements = [
        scene1,
        scene2,
        scene3,
        text1Scene2,
        text2Scene2,
        text3Scene2,
        bigText,
        text4Scene2,
        cta,
        logoBig,
        logoSmall,
        shoe,
        bg
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
            mytl = new TimelineMax({ delay: 0 });
            mytl.set(logoSmall, { scale: 0.9 })
                .set(shoe, { scale: 0.8 })
            mytl
                .from(scene1, 0.5, { alpha: 0, ease: Back.easeOut }, "scene1")
                .from(logoBig, 0.5, { alpha: 0, ease: Back.easeOut }, "scene1+=0.5")
                .to(logoBig, 0.5, { alpha: 0, ease: Back.easeIn }, "scene1+=4.5")

            .from(scene2, 0.5, { alpha: 0, ease: Back.easeOut }, "scene2")
                .staggerFrom([text1Scene2, text2Scene2, text3Scene2, text4Scene2], 0.2, { alpha: 0, x: 20, ease: Power0.easeOut }, 0.25, "scene2+=0.5")
                .from(bigText, 0.5, { alpha: 0, x: 20 }, "scene2+=1.25")
                .staggerTo([text1Scene2, text2Scene2, text3Scene2, text4Scene2], 0.2, { alpha: 0, x: -20, ease: Power0.easeIn }, 0.25, "scene2+=3.8")

            .from(scene3, 0.5, { alpha: 0, ease: Back.easeOut }, "scene3")
                .from(bg, 0.3, { alpha: 0, ease: Back.easeOut.config(2) }, "scene3")

            .from(logoSmall, 0.5, { alpha: 0, ease: Back.easeOut }, "scene3+=0.3")

            .from(shoe, 0.5, { alpha: 0, x: 180, ease: Back.easeOut.config(1) }, "scene3+=0.5")
                .to(shoe, 6, { scale: 1, rotation: 4, ease: Power3.easeOut }, "scene3+=1")

            .to(cta, 0.2, { scale: 0.9, yoyo: true, repeat: 3 }, "scene3+=4")


        

            if (loops < max_loops) {
                mytl
                    .to(logoSmall, 0.5, { alpha: 0 }, "scene3+=6")
                    .to(shoe, 0.5, { alpha: 0 }, "scene3+=6")
                    .to(cta, 0.5, { alpha: 0 }, "scene3+=6")
            
                mytl.set(banner, { delay: 0, onComplete: replay_banner });

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