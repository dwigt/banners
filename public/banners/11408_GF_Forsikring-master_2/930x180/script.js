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

        var banner_elements = [
            bg = $('#bg'),
            splash = $('#splash'),
            txtbg = $('#txtbg'),
            t1 = $('#t1'),
            logo = $('#logo'),
            overlay = $('#overlay'),
            cta = $('#cta')
        ];

        var mytl;
        var loops = 0;
        var max_loops = 99;

        function setup() {
            TweenMax.set(banner, { alpha: 1 });
            reset_banner();
            animate_banner();
        }

        function animate_banner() {
            loops++;
            mytl = new TimelineMax({ delay: 0 });

            mytl
                .to(overlay, 0.5, { autoAlpha: 0 }, "scene1")
                .fromTo(bg, 9.7, { scale: 0.91 }, { scale: 1, rotationZ: 0.01, ease: Sine.easeInOut }, "scene1+=0")
                .from(txtbg, 0.5, { x: -258, autoAlpha: 0, ease: Power1.easeOut }, "scene1+=0.5")
                .staggerFrom([t1, cta], 0.5, { y: -5, autoAlpha: 0, ease: Power1.easeOut }, 0.25, "scene1+=1.2")
                .from(logo, 0.5, { y: -5, autoAlpha: 0, ease: Power1.easeOut }, "scene1+=1.45")
                .to(logo, 0.5, { y: 5, autoAlpha: 0, ease: Power1.easeIn }, "scene1+=5")
                .from(splash, 0.5, { y: -5, autoAlpha: 0, ease: Power1.easeOut }, "scene1+=5.5");

            if (loops < max_loops) {
                mytl
                    .to(overlay, 0.5, { autoAlpha: 1 }, "scene1+=9.7")
                    .set(banner, { delay: 0, onComplete: replay_banner });
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