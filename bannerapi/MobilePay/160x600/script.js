// Hide elements before running animations
var banner = $("#banner");
TweenMax.set(banner, { alpha: 0 });
$(function() {
    click_tag1 = dhtml.getVar('clickTAG1', 'http://www.example.com/');
    landingpagetarget = dhtml.getVar('landingPageTarget', '_blank');
    $('#exit_click_area').on('click', function(e) {
        window.open(click_tag1, landingpagetarget);
    });
    var polite_load = true;
    polite_load = false; // Comment out to enable polite load


    // Runs when the page is completely loaded.		
    var piggybank = $("#piggybank"),
        coin1 = $("#coin1"),
        coin2 = $("#coin2"),
        coin3 = $("#coin3"),
        t1 = new SplitText("#t1", { type: "lines, chars" }),
        t2 = new SplitText("#t2", { type: "lines,chars" }),
        t3 = $("#t3"),
        swiper_chevron = $("#swiper__chevron"),
        clip = $("#clip__swiper"),
        clip__swipertext = $("#clip__swipertext"),
        swiper_bg = $("#swiper__background, #swiper__text");

    var banner_elements = [
        piggybank, coin1, coin2, coin3, t1, t2, t3, swiper_chevron, clip, swiper_bg, clip__swipertext
    ];

    var mytl;
    var loops = 0;
    var max_loops = 3;

    // Clip setup
    var clip_swiper_width = $("#clip__swiper").width();
    var clip_swiper_height = $("#clip__swiper").height();
    var clip_swiper_end = "rect(0px " + clip_swiper_width + "px " + clip_swiper_height + "px " + clip_swiper_width + "px)";
    var clip_swiper_begin = "rect(0px " + clip_swiper_width + "px " + clip_swiper_height + "px " + "20px)";
    var clip_swiper_final = "rect(0px " + clip_swiper_width + "px " + clip_swiper_height + "px " + "0px)";
    var swiperWidth = clip_swiper_width - $("#swiper__chevron").width();

    function setup() {
        TweenMax.set(banner, { alpha: 1 });
        reset_banner();
        animate_banner();
    }

    function animate_banner() {
        loops++;
        mytl = new TimelineMax({ delay: 0 });
        mytl
            .to(overlay, 0.1, { opacity: 0 }, "start")

        .to(coin1, .75, { y: 150, rotation: 30, opacity: 1, ease: Power3.easeIn }, "start+=.1")
            .to(coin2, .75, { y: 150, rotation: -30, opacity: 1, ease: Power3.easeIn }, "-=0.3")
            .to(coin3, .75, { y: 150, rotation: 30, opacity: 1, ease: Power3.easeIn }, "-=0.5")

        .staggerFrom(t1.chars, .75, { opacity: 0, y: 5, ease: Power1.easeOut }, 0.025, "-=1")

        .to(piggybank, .75, { left: "-100%", opacity: 0, ease: Power2.easeOut }, "-=0")
            .staggerFrom(t2.chars, .15, { opacity: 0, y: 5, ease: Power1.easeOut }, 0.015, "+=0")
            .from(swiper_chevron, .25, { scale: 0, rotation: 180, ease: Back.easeOut.config(1.5) }, "+=0")

        .to(clip, .75, { clip: clip_swiper_begin, ease: Power1.easeOut }, "+=0")
            .set(clip, { clip: clip_swiper_final }, "+=0")
            .from(swiper_bg, .75, { x: -187, ease: Power1.easeOut }, "-=.75")

        .to(clip__swipertext, .75, { clip: clip_swiper_end }, "+=1")
            .to(swiper_chevron, .75, { x: swiperWidth }, "-=.75")


        .to(swiper_chevron, .5, { x: 0 }, "-=0")
            .to(clip__swipertext, .5, { clip: clip_swiper_begin }, "-=.5")
            .to([t1.chars, t2.chars], 0.5, { opacity: 0, top: 5, ease: Power1.easeIn }, "-=.5")
            .from(t3, .5, { opacity: 0, y: -5, ease: Power1.easeOut }, "-=0")

        if (loops < max_loops) {
            mytl
                .to(overlay, 0.2, { opacity: 1 }, "+=1.8")
            console.log(mytl.duration());
            mytl.set(banner, { delay: 0, onComplete: replay_banner });
        }
    }

    function replay_banner() {
        reset_banner();
        animate_banner();
    }

    function reset_banner() {

        TweenMax.killAll(false, true, false);
        TweenMax.set([t1.chars, t2.chars, t3.chars], { x: 0, opacity: 1 })

        TweenMax.set(banner_elements, { clearProps: "all" });
    }
    if (polite_load) {
        dhtml.sharedEvents.once('pageLoadComplete', setup);
        dhtml.external.initPoliteMode();
    } else {
        setup();
    }
});