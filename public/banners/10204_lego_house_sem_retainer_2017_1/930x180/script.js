// Hide elements before running animations
var banner = $("#banner");
TweenMax.set(banner, { alpha: 0 });

// if (Enabler.isInitialized()) {
//   init();
// } else {
//   Enabler.addEventListener(studio.events.StudioEvent.INIT, init);
// }

// // Runs when Enabler is ready.
// function init() {
//   if (Enabler.isPageLoaded()) {
//     politeInit();
//   } else {
//     Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, politeInit);
//   }
// };
politeInit();
// Runs when the page is completely loaded.		
function politeInit() {



    $(function() {

        var banner = $("#banner");
        var bg = $("#bg");
        var cta = $("#cta");
        var fish = $("#fish");
        var logo = $("#logo");
        var t1 = $("#t1");
        var t2 = $("#t2");
        var t3 = $("#t3");
        var star1_1 = $("#star1_1");
        var star1_2 = $("#star1_2");
        var star1_3 = $("#star1_3");
        var star1_4 = $("#star1_4");
        var star1_5 = $("#star1_5");
        var star1_6 = $("#star1_6");
        var star1_7 = $("#star1_7");
        var star1_8 = $("#star1_8");
        var star2_1 = $("#star2_1");
        var star2_2 = $("#star2_2");
        var star2_3 = $("#star2_3");
        var star2_4 = $("#star2_4");
        var star2_5 = $("#star2_5");
        var star2_6 = $("#star2_6");
        var star2_7 = $("#star2_7");
        var star2_8 = $("#star2_8");

        var banner_elements = [
            banner,
            bg,
            cta,
            fish1,
            fish2,
            logo,
            t1,
            t2,
            t3,
            star1_1,
            star1_2,
            star1_3,
            star1_4,
            star1_5,
            star1_6,
            star1_7,
            star1_8,
            star2_1,
            star2_2,
            star2_3,
            star2_4,
            star2_5,
            star2_6,
            star2_7,
            star2_8
        ];

        var star1 = [
            star1_6,
            star1_2,
            star1_7,
            star1_5,
            star1_8,
            star1_3,
            star1_4,
            star1_1
        ]

        var star2 = [
            star2_1,
            star2_3,
            star2_8,
            star2_4,
            star2_6,
            star2_7,
            star2_2,
            star2_5
        ]


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
            scene1 = new TimelineMax({ delay: 0 });

            scene1
                .staggerFrom(star1, 0.8, { scale: 0, rotation: -360 }, 0.7, "scene1Start+=0")
                .staggerTo(star1, 0.8, { scale: 0, rotation: 180 }, 0.7, "scene1Start+=0.7")
                .staggerFrom(star2, 0.8, { scale: 0, rotation: -360 }, 0.5, "scene1Start+=1.5")
                .staggerTo(star2, 0.8, { scale: 0, rotation: 180 }, 0.5, "scene1Start+=2.2")
                .staggerFrom([t1, t2], 0.5, { y: -5, opacity: 0, ease: Power1.easeOut }, 0.25, "scene1Start+=0.2")
                .from(fish1, 1, { x: -210, rotation: 25, ease: Power1.easeOut }, "scene1Start+=1")
                .from(fish2, 1, { y: 110, rotation: 25, ease: Power1.easeOut }, "scene1Start+=2")
                .staggerTo([t1, t2], 0.25, { y: 5, opacity: 0, ease: Power1.easeIn }, 0.25, "scene1Start+=4.2")
                .from(t3, 0.25, { y: -5, opacity: 0, ease: Power1.easeOut }, "scene1Start+=5");

            if (loops < max_loops) {
                scene1
                    .to(t3, 0.4, { y: -5, opacity: 0, ease: Power1.easeOut }, "scene1Start+=9")
                    .to(fish1, 0.5, { x: -200, ease: Power1.easeOut }, "scene1Start+=9")
                    .to(fish2, 0.5, { opacity: 0, ease: Power1.easeOut }, "scene1Start+=9")

                .set(banner, { delay: 0, onComplete: replay_banner });
            }

        }

        function replay_banner() {
            reset_banner();
            animate_banner();
        }
        setup();

        function reset_banner() {
            var banner_elements_length = banner_elements.length;
            for (var i = 0; i < banner_elements_length; ++i) {
                TweenMax.killTweensOf(banner_elements[i]);
                TweenMax.set(banner_elements[i], { scaleX: 1, scaleY: 1, alpha: 1, x: 0, y: 0, rotationX: 0, rotationY: 0 });
            }
        }
    });
};