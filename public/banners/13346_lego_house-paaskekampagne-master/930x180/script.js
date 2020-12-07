// Hide elements before running animations
var banner = $("#banner");
TweenMax.set(banner, { alpha: 0 });

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

    $(function() {

        var bg1 = $('.bg1'),
        bg2 = $(".bg2"),
        cta = $(".cta"),
        t1 = $(".t1"),
        t2 = $(".t2"),
        legal = $(".legal"),
        smiley = $(".smiley"),
        kimmie = $(".kimmie"),
        overlay = $(".overlay")
       

        var banner_elements = [
            bg1, bg2, cta, t1, t2, legal, smiley, kimmie
        ];
        var backgroundAnimationHeight = bg1.outerHeight() - overlay.outerHeight()


        var mytl;
        var loops = 0;
        var max_loops = 2;

        function setup() {
            TweenMax.set(banner, { alpha: 1 });
            reset_banner();
            animate_banner();
        }

        function animate_banner() {
            loops++;
            mytl = new TimelineMax({ delay: 0 });

            mytl
            .to(overlay, 0.25, {opacity: 0}, "start")
            .from(bg1, .75, {opacity: 0, ease: Power0.easeNone}, "start")
            .to(bg1, 7, {y: backgroundAnimationHeight, ease: Power0.easeNone}, "start")
            .staggerFrom([t1, smiley, t2], .75, {top: "-100%", ease: Power1.easeOut}, 0.15, "start+=.75")
            .from(bg2, .75, {opacity: 0, ease: Power0.easeNone}, "start+=7")
            .from(kimmie, .5, {y: "100%", ease: Power1.easeOut}, "start+=8")
            .to(bg2, 7, {y: backgroundAnimationHeight, ease: Power1.easeOut}, "start+=7")
              

            if (loops < max_loops) {
                mytl
                .from(overlay, 0.5, {opacity: 0, onComplete:replay_banner}, "start+=14.5")
            }
            if (loops === max_loops) {
                mytl
                   
            }
        }

        function replay_banner() {
            reset_banner();
            animate_banner();
        }

        function reset_banner() {
            TweenMax.killAll(false, true, false);
            TweenMax.set(banner_elements, { clearProps: "all" });
        }
        setup();
    });
};