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
        var bg = $("#bg"),
            dracula1 = $("#dracula1"),
            bat1 = $("#bat1"),
            bat2 = $("#bat2"),
            pumpkin1 = $("#pumpkin1"),
            pumpkin2 = $("#pumpkin2"),
            pumpkin3 = $("#pumpkin3"),
            pumpkin4 = $("#pumpkin4"),
            pumpkin5 = $("#pumpkin5"),
            pumpkin6 = $("#pumpkin6"),
            pumpkin7 = $("#pumpkin7");

        var pumpkinWidth = $("#pumpkincontainer").innerWidth();
        var spiderSlideWidth = pumpkinWidth + 14;
        var pumpkins = [pumpkin1,
            pumpkin2, pumpkin3, pumpkin4, pumpkin5, pumpkin6, pumpkin7
        ];
        var pumpkinsHidden = [pumpkin1,
            pumpkin2, pumpkin3, pumpkin4, pumpkin5, pumpkin6
        ];

        var banner_elements = [
            bg, dracula1, bat1, bat2, pumpkins
        ];

        var mytl;
        var loops = 0;
        var max_loops = 3;

        function setup() {
            TweenMax.set(banner, { alpha: 1 });
            reset_banner();
            animate_banner();
        }

        function hoverBatLeft(bat) {
            var tl = new TimelineMax();
            tl
                .to(bat, 2, { y: -30, rotation: 1, ease: Power0.easeNone }, "+=0")
                .to(bat, 5.75, { bezier: [{ x: 5, y: 0, rotation: 5 }, { x: 0, y: 5, rotation: 0 }, { x: -5, y: 0, rotation: -5 }, { x: 0, y: -10, rotation: 2 }], ease: Power0.easeNone }, "+=0")
            return tl;
        }

        function hoverBatRight(bat) {
            var tl = new TimelineMax();
            tl
                .to(bat, 2, { y: -5, rotation: -1, ease: Power0.easeNone }, "+=0")
                .to(bat, 5.5, { bezier: [{ x: 10, y: 0, rotation: -6 }, { x: 0, y: 7, rotation: -2 }, { x: -10, y: 0, rotation: 4 }, { x: 0, y: -7, rotation: -2 }], ease: Power0.easeNone }, "+=0")
            return tl;
        }

        function slideVertical(dracula, placement) {
            var direction = placement === "top" ? "-100%" : "100%";
            var tl = new TimelineMax();
            tl
                .from(dracula, 1, { y: direction, ease: Power2.easeIn }, "+=0")
                .to(dracula, 1, { y: direction, ease: Power2.easeOut }, "+=1")
            return tl;
        }



        function animate_banner() {
            loops++;

            mytl = new TimelineMax({ delay: 0 });

            mytl
            // .set(spiderbro, { opacity: 0 }, "start")
                .from(bg, 3, { opacity: 0, ease: Power1.easeOut }, "start")
                .staggerFrom(pumpkins, 1.5, { opacity: 0, ease: SteppedEase.config(1) }, 0.25, "start")
                .staggerTo(pumpkinsHidden, 1.5, { opacity: 0, ease: SteppedEase.config(1) }, 0.25, "start+=1.5")
                // .set(spiderbro, { opacity: 1 }, "start+=2")
                // .from(spiderbro, .75, { x: 215, ease: Power1.easeOut }, "start+=2.5")

            //2 seconds total stagger
            .staggerFrom([bat1, bat2], .75, { top: "-100%", ease: Power4.easeOut }, 0.25, "start+=1.5")

            //4 seconds
            .add(hoverBatLeft(bat1), "start+=2.25")
                .add(hoverBatRight(bat2), "start+=2.5")
                .add(slideVertical(dracula1, "top"), "start+=4.3")
            if (loops < max_loops) {
                mytl
                    .staggerTo([bat2, bat1], .5, { top: "-100%", ease: Power4.easeOut, ease: Power1.easeIn }, 0.25, "end+=0")
                    .to(spiderbro, .5, { x: -spiderSlideWidth, ease: Power1.easeIn }, "end+=0")
                    .staggerTo([
                        spider, pumpkins, bg
                    ], .25, { opacity: 0, ease: Power1.easeIn }, 0.25, "end+=.5")
                    .set(banner, { delay: 0, onComplete: replay_banner });
                console.log(mytl.duration());

            }
        }

        function replay_banner() {
            reset_banner();
            animate_banner();
        }

        function reset_banner() {
            TweenMax.killAll(false, true, false);
            TweenMax.set(banner_elements, { clearProps: "all" });
            TweenMax.set(pumpkins, { clearProps: "all" });
        }
        setup();
    });
}