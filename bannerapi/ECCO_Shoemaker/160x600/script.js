// Hide elements before running animations
var banner = $("#banner");
TweenMax.set(banner, { alpha: 0 });


$(function() {

    var text1Scene2	=	$("#text1Scene2");
    var text2Scene2	=	$("#text2Scene2");
    var text3Scene2	=	$("#text3Scene2");
    var text4Scene2	=	$("#text4Scene2");
    var bigText	=	$("#bigText");
    var logoBig		=	$("#logoBig");
    var logoBig1		=	$("#logoBig1");
    var breaker	        =	$("#breaker");


    var banner_elements = [

        text1Scene2,
        text2Scene2,
        text3Scene2,
        text4Scene2,
        logoBig1,
        bigText,
        logoBig,
        breaker,
        cta
    ];

    var mytl;
    var loops = 0;
    var max_loops = 5;

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
            
            loops++;
            mytl = new TimelineMax({ delay: 0});

            replay_video();
            mytl
            
            mytl
            .to(breaker, 0.5, {alpha: 0}, "scene1")
                .from(logoBig, 0.5, {alpha:0, ease:Back.easeOut}, "scene1+=1")
                .staggerFrom([text1Scene2, text2Scene2, text3Scene2, text4Scene2, bigText, cta], 0.25, {alpha:0, x:20, ease: Power0.easeOut}, 0.25, "scene1+=1.5")

			;

            if (loops < max_loops) {
                mytl
                .to([text1Scene2, text2Scene2, text3Scene2, text4Scene2, bigText, cta, logoBig], 0.5, {alpha: 0}, "scene1+=4.5")
            	console.log(mytl.duration());
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


