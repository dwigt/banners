// Hide elements before running animations
var banner = $("#banner");
TweenMax.set(banner, { alpha: 0 });
$(function() {
    click_tag1 = dhtml.getVar('clickTAG1', 'http://www.example.com/');
    landingpagetarget = dhtml.getVar('landingPageTarget', '_blank');
    $('#exit_click_area').on('click', function(e) {
        window.open(click_tag1, landingpagetarget);
    });
    // var polite_load = false;
    polite_load = false;


    // Runs when the page is completely loaded.		
    var t1 = new SplitText("#t1", { type: "chars" }),
        t2 = new SplitText("#t2", { type: "chars" }),
        ctat1 = new SplitText("#ctatxt", { type: "chars" }),
        scene1 = $("#scene1"),
        scene2 = $("#scene2"),
        scene3 = $("#scene3"),
        bg2 = $("#bg2"),
        swiper_chevron = $("#swiper__chevron"),
        clip = $("#clip__swiper"),
        clip__swipertext = $("#clip__swipertext"),
        swiper_bg = $("#swiper__background, #swiper__text"),
        cta = $("#cta");

    var banner_elements = [
        t1, t2, scene1, scene2,scene3,  swiper_chevron, swiper_bg, cta, bg2
    ];

    var mytl;
    var loops = 0;
    var max_loops = 3;

    // Clip setup
    var clip_swiper_width = $("#clip__swiper").width();
    var clip_swiper_height = $("#clip__swiper").height();
    var clip_swiper_end = "rect(0px " + clip_swiper_width + "px " + clip_swiper_height + "px " + clip_swiper_width + "px)";
    var clip_swiper_final = "rect(0px " + clip_swiper_width + "px " + clip_swiper_height + "px " + "0px)";
    var swipeWidth = 175;
    
    var chevronSwipeWidth = $("#banner").width() - $("#swiper__chevron").width() - $("#swiper__chevron").offset().left * 2;
    var bannerHeight = $("#banner").height();
    var bannerWidth = $("#banner").width();
    var swiperTime = 1.1;
    var scenetransitionTiming = .8;
    function setup() {
        TweenMax.set(banner, { alpha: 1 });
        reset_banner();
        animate_banner();
    }

    function animate_banner() {
        loops++;
        mytl = new TimelineMax({ delay: 0 });
        mytl
        .set(clip, { clip: clip_swiper_final }, "start")
        .staggerFrom(t1.chars, .18, { transformOrigin: "50% 100%", y: -5, scale: 0, ease: Back.easeOut.config(1.681) }, 0.022, "start+=0")

        .staggerTo(t1.chars, .16,{transformOrigin: "50% 100%", y: -1,  scale: 1.084, ease: Sine.easeInOut, yoyo: true, repeat: 3}, 0.03, "+=.12")

        .to(scene1, scenetransitionTiming, {x: -bannerWidth, ease: Power2.EaseOut}, "start+=3")
        
        .from(scene2, scenetransitionTiming, {x: bannerWidth, ease: Power2.EaseOut}, "start+=3")

        .to(clip__swipertext, swiperTime, { clip: clip_swiper_end, ease: Power4.easeOut }, "+=.3")
        .to(swiper_chevron, swiperTime, { x: chevronSwipeWidth, ease: Power4.easeOut }, "-=" + swiperTime)
        .to(bg2, swiperTime, { x: -swipeWidth, ease: Power4.easeOut }, "-=" + swiperTime)
        .to("#swiper__text", swiperTime, { x: -swipeWidth, opacity: 0, ease: Power4.easeOut }, "-=" + swiperTime)
        .to(scene2, scenetransitionTiming, {x: -bannerWidth, ease: Power2.EaseOut}, "+=.24")
        .from(scene3, scenetransitionTiming, {x: bannerWidth, ease: Power2.EaseOut}, "-=" + scenetransitionTiming)
        .from(cta, 0.42, {scale: 0, ease: Back.easeOut.config(2)}, "-=.12")
        mytl.staggerFromTo(ctat1.chars, .22, {scale: 1}, {transformOrigin: "50% 100%", scale: 1.084, ease: Sine.easeOut, yoyo: true, repeat: 3}, 0.03, "+=.12")

        if (loops < max_loops) {
            mytl
            .set(t1.chars, {opacity: 0}, "+=1.68")
            .set(scene1, {x: bannerWidth}, "+=0")
            .to(scene1, scenetransitionTiming, {x: 0}, "+=0")
            .to(scene3, scenetransitionTiming, {x: -(bannerWidth)}, "-=" + scenetransitionTiming)
            mytl.set(banner, { delay: 0, onComplete: replay_banner });
        }
    }

    function replay_banner() {
        reset_banner();
        animate_banner();
    }

    function reset_banner() {

        TweenMax.killAll(false, true, false);
        TweenMax.set([t1.chars, t2.chars], { x: 0, y: 0, opacity: 1 })

        TweenMax.set(banner_elements, { clearProps: "all" });
    }
    if (polite_load) {
        dhtml.sharedEvents.once('pageLoadComplete', setup);
        dhtml.external.initPoliteMode();
    } else {
        setup();
    }
});