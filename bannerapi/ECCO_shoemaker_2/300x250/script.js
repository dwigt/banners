// Hide elements before running animations
var banner = $("#banner");
TweenMax.set(banner, { alpha: 0 });


$(function() {

    var text1Scene2	=	$("#text1Scene2");
    var text2Scene2	=	$("#text2Scene2");
    var text3Scene2	=	$("#text3Scene2");
    var bigText	=	$("#bigText");
    var logoBig		=	$("#logoBig");
    var logoBig1		=	$("#logoBig1");
    var bg	        =	$("#bg");
    var bg1	        =	$("#bg1");
    var cta			=	$("#cta");
    var shoe	    =	$("#shoe");
    var scene3		=	$("#scene3");
	


    var banner_elements = [

        text1Scene2,
        text2Scene2,
        text3Scene2,
        logoBig1,
        bigText,
        logoBig,
        bg,
        cta,
        shoe,
        bg1,
        scene3
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
            
            loops++;
            mytl = new TimelineMax({ delay: 0});
            mytl.set(shoe, {scale:0.8})
            mytl
            
            mytl.to(bg,0.5, {alpha:0, ease:Back.easeOut}, "scene1")
                
                .from(logoBig, 0.5, {alpha:0, ease:Back.easeOut}, "scene1+=1")
                .staggerFrom([text1Scene2, text2Scene2, text3Scene2], 0.25, {alpha:0, x:20, ease: Power0.easeOut}, 0.25, "scene1+=1.5")
                .from(bigText, 0.5, {alpha:0, x:20}, "scene1+=2.25")
                .from(scene3, 0.5, {alpha:0, ease:Back.easeOut}, "scene1+=4.5")
                .set([text1Scene2, text2Scene2, text3Scene2, bigText, logoBig], {alpha: 0}, "scene1+=4.5")
                .from(bg1, 0.3, {alpha:0, ease:Back.easeOut.config(2)}, "scene1+=4.5")
                .from(logoBig1, 0.5, {alpha:0, ease:Back.easeOut}, "scene3+=0.3")
                .from(shoe, 0.5, {alpha:0, x:180,  ease: Back.easeOut.config(1)}, "scene3+=0.5")
                .to(shoe, 6, {scale:1, rotation: 4, ease: Power3.easeOut}, "scene3+=1")
                .to(cta, 0.2, {scale: 0.9, yoyo:true, repeat:3}, "scene3+=4")
			;

            if (loops < max_loops) {
                mytl
                
                .staggerTo([cta, shoe, logoBig1], 0.25, {alpha:0, x:-20, ease: Power0.easeIn}, 0.15, "scene3+=5")
                replay_video();
                mytl.to(bg, 0.25, {alpha: 0}, "scene3+=5.2")
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


