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

    var t1 = new SplitText("#t1", { type: "chars" }),
        t1Chars = t1.chars;
    var t2 = new SplitText("#t2", { type: "chars" }),
        t2Chars = t2.chars;
    var lottie = $("#lottieContainer");
    var cta = $("#cta")

    $(function() {

        var banner_elements = [
            lottie, cta
        ];
        var mytl;
        var loops = 0;
        var max_loops = 3;

        function setup() {
            TweenMax.set(banner, { alpha: 1 });
            reset_banner();
            animate_banner();
        }

        var animation = bodymovin.loadAnimation({
            container: document.getElementById('lottie'), // Required
            path: 'assets/bilFaar.json', // Required
            renderer: 'svg/canvas/html', // Required
            loop: true,
            name: "Hello World", // Name for future reference. Optional.
        })

        function animate_banner() {
            loops++;

            mytl = new TimelineMax({ delay: 0 });
            mytl
            if (loops === 1) {
                mytl
                    .from(cta, 0.5, { opacity: 0, scale: 0.4, ease: Back.easeOut.config(1.7) }, "start+=2")

            }
            mytl
                .add(function() { animation.play() }, "start")
                .from(lottie, 1.5, { x: "100%", ease: Power1.easeOut, }, "start")
                .staggerFrom(t1Chars, 0.7, { opacity: 0, x: -5 }, 0.01, "start+=1.5")
                .to(t1Chars, .25, { opacity: 0 }, "+=3")
                .staggerFrom(t2Chars, 0.7, { opacity: 0, x: -5 }, 0.01, "+=0")
                .to(cta, 0.2, { scale: 0.9, force3D: false, repeat: 3, yoyo: true }, "+=0")
                .add(function() { animation.play() }, "start+=4.5")

            if (loops < max_loops) {
                mytl
                    .to(lottie, 1, { x: -20, opacity: 0, ease: Power1.easeOut, }, "+=2.8")
                    .to(t2Chars, .25, { opacity: 0 }, "-=1")
                    .set(banner, { delay: 0, onComplete: replay_banner });
            }
            if (loops === max_loops) {
                mytl.add(function() { animation.stop(); }, "+=2.8")
            }
        }

        function replay_banner() {
            animation.stop();
            reset_banner();
            animate_banner();
        }

        function reset_banner() {
            TweenMax.set([t1.chars, t2.chars], { x: 0, y: 0, opacity: 1 });
            TweenMax.killAll(false, true, false);
            TweenMax.set(banner_elements, { clearProps: "all" });
        }
        setup();
    });
}