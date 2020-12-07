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

        var bg = $('.bg'),
        t1 = $(".t1"),
        t2 = $(".t2"),
        kimmie = $(".kimmie"),
        kimmiecharacter = $(".kimmiecharacter")
        overlay = $(".overlay")
       

        var banner_elements = [
            bg, t1, t2, kimmie, kimmiecharacter, overlay
        ];

        var mytl;
        var loops = 0;
        var max_loops = 2;

        function setup() {
            TweenMax.set(banner, { alpha: 1 });
            reset_banner();
            animate_banner();
        }

        function hoverKimmie() {
            var tl = new TimelineMax();
            tl
                .to(kimmie, 6, {  bezier: [{ delay: 0.4, y: -10, rotation: -2 }, {  y: 10, rotation: 2 }, {  y: -6, rotation: -1 }, { y: 5, rotation: 1 }, ], ease: Power0.easeNone }, "-=0")
                .to(kimmiecharacter, 2.6, {  delay: 0.4, bezier: [{ rotation: -7 }, { rotation: 7 } ], ease: Power0.easeNone}, "-=6")
                .to(kimmiecharacter, 2.6, {  bezier: [{ rotation: -5 }, { rotation: 4 }], ease: Power0.easeNone }, "-=3")
            return tl;
        }

        function animate_banner() {
            loops++;
            mytl = new TimelineMax({ delay: 0 });

            mytl
            .to(overlay, 0.25, {opacity: 0}, "start")
            .from(kimmie, .65, {y: -300, ease: Power1.easeOut }, "start+=1")
            .from(kimmiecharacter, .75, { rotation: 20, ease: Power0.easeNone}, "start+=1")
            .add(hoverKimmie(), "start+=1.75")
            .add(hoverKimmie(), "start+=7.5")
            

            if (loops < max_loops) {
                mytl
                .to(kimmiecharacter, .25, { y: 0, rotation: 0, ease: Power0.easeNone}, "start+=12.5")
                .to(kimmie, .65, {y: -300, rotation: -5, ease: Power1.easeIn }, "start+=13")
                .from(overlay, 0.5, {opacity: 0, onComplete:replay_banner}, "start+=13.25")
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