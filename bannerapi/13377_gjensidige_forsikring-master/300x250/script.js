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
        var arms1 = MorphSVGPlugin.convertToPath("#arms1"),
            arms2 = MorphSVGPlugin.convertToPath("#arms2"),
            leg1_1 = MorphSVGPlugin.convertToPath("#leg1_1"),
            leg1_2 = MorphSVGPlugin.convertToPath("#leg1_2"),
            leg2_1 = MorphSVGPlugin.convertToPath("#leg2_1"),
            leg2_2 = MorphSVGPlugin.convertToPath("#leg2_2"),
            symbols = $("#symbols"),
            face = $("#face"),
            t1 = $("#t1"),
            t2 = $("#t2"),
            hand1 = $("#hand1"),
            hand2 = $("#hand2"),
            head = $("#head"),
            svgManContainer = $("#svgManContainer");
        svgCarContainer = $("#lottieContainer");

        var t1 = new SplitText("#t1", { type: "chars" }),
            t1Chars = t1.chars;
        var t2 = new SplitText("#t2", { type: "chars" }),
            t2Chars = t2.chars;

        var banner_elements = [
            arms1, leg1_1, leg1_2, leg2_1, leg2_2, symbols, face, t1, t2, hand1, hand2, head, svgManContainer, svgCarContainer
        ];

        var mytl;
        var loops = 0;
        var max_loops = 3;

        var repeat = 13;
        var animationLength = .5

        function setup() {
            TweenMax.set(banner, { alpha: 1 });
            reset_banner();
            animate_banner();
        }

        var animation = bodymovin.loadAnimation({
            container: document.getElementById('lottie'), // Required
            path: 'assets/car.json', // Required
            renderer: 'svg/canvas/html', // Required
            loop: true,
        })

        function animate_banner() {
            loops++;
            mytl = new TimelineMax({ delay: 0 });
            mytl
                .set(face, { fill: "#F8BEA8" })
                .add(function() { animation.play() }, "start")
                .from(svgCarContainer, 1, { x: "-100%", rotation: 5, ease: Back.easeOut.config(1) }, "start")
                .to(arms1, animationLength, { morphSVG: arms2, yoyo: true, repeat: repeat, ease: Power2.easeIn }, "start")
                .to(leg1_2, animationLength, { morphSVG: leg2_1, yoyo: true, repeat: repeat, ease: Power2.easeIn }, "start")
                .to(leg1_1, animationLength, { morphSVG: leg2_2, yoyo: true, repeat: repeat, ease: Power2.easeIn }, "start")
                .to(hand1, animationLength, { y: 10, yoyo: true, repeat: repeat, ease: Power2.easeIn }, "start")
                .to(hand2, animationLength, { y: 10, yoyo: true, repeat: repeat, ease: Power2.easeIn }, "start")
                .to(svgManContainer, animationLength, { y: -10, yoyo: true, repeat: repeat, ease: Power1.easeInOut }, "start+=" + animationLength)
                .to(face, 1.2, { fill: "#E52629", repeat: 3, yoyo: true, ease: Power2.easeOut }, "start+=.5")
                .staggerFrom(t1Chars, 0.5, { opacity: 0, x: -5, ease: Power2.easeOut }, 0.01, "start+=0.5")
                .from(symbols, 1.2, { opacity: 0, yoyo: true, repeat: 5 }, "start+=1")
                .to(t1Chars, .25, { opacity: 0, ease: Power2.easeIn }, "start+=4")
                .staggerFrom(t2Chars, 0.8, { opacity: 0, x: -5, ease: Power2.easeOut }, 0.01, "start+=4.25")
            if (loops < max_loops) {
                mytl
                    .to(t2Chars, .25, { opacity: 0 }, "start+=8")
                    .to(svgCarContainer, .25, { opacity: 0, x: -5 }, "start+=8")
                mytl.set(banner, { delay: 0, onComplete: replay_banner });
            }
            if (loops === max_loops) {
                mytl.add(function() { animation.stop(); }, "start+=10")
            }
        }

        function replay_banner() {
            reset_banner();
            animate_banner();
            animation.stop()
        }

        function reset_banner() {
            TweenMax.killAll(false, true, false);
            TweenMax.set([t1.chars, t2.chars], { x: 0, y: 0, opacity: 1 });
            TweenMax.set(arms1, { morphSVG: arms1 });
            TweenMax.set(leg1_1, { morphSVG: leg1_1 });
            TweenMax.set(leg1_2, { morphSVG: leg1_2 });
            TweenMax.set(banner_elements, { clearProps: "all" });
        }
        setup();
    });
};