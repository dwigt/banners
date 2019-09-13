// Hide elements before running animations
var banner = $("#banner");

$(function() {

    var bg = $("#bg");
    var wave1 = $("#wave1");
    var sko1 = $("#sko1");
    var sko2 = $("#sko2");
    var messi = $("#messi");
    var btn = $("#btn");
    var txt1 = $("#txt1");
    var txt2 = $("#txt2");
    var logo = $("#logo");
    var wave1 = $("#wave1");
    var svgMaskImg1 = $('#svgMask1');
    var svgMaskImg2 = $('#svgMask2');
    var svgMaskImg3 = $('#svgMask3');
    var svgMaskImg4 = $('#svgMask4');
    var svgMaskImg5 = $('#svgMask5');
    var svgMaskImg6 = $('#svgMask6');
    var svgImage = $('#svg-mask-image');
    var banner_elements = [
        wave1,
        sko1,
        sko2,
        messi,
        btn,
        txt1,
        txt2,
        logo,
        svgMaskImg1,
        svgMaskImg2,
        svgMaskImg3,
        svgMaskImg4,
        svgMaskImg5,
        svgMaskImg6,
        svgImage

    ];

    var scene1;
    var loops = 0;
    var max_loops = 99;




    function on_page_load_complete() {

        function setup() {

            TweenMax.set(banner, { alpha: 0 });
            reset_banner();
            animate_banner();
        }


        function animate_banner() {

            TweenMax.set(banner, { alpha: 1 });
            loops++;
            scene1 = new TimelineMax({ delay: 0 });
            if (loops < max_loops) {
                scene1
                    .staggerFrom([sko1, sko2], 1, { alpha: 0, ease: Sine.easeOut }, 0.6, "scene1")
                    .to(svgMaskImg1, 0.2, { morphSVG: svgMaskImg2 }, "scene1+=0.1")
                    .to(svgMaskImg1, 0.2, { morphSVG: svgMaskImg3 }, "scene1+=0.2")
                    .to(svgMaskImg1, 0.2, { morphSVG: svgMaskImg4 }, "scene1+=0.3")
                    .to(svgMaskImg1, 0.2, { morphSVG: svgMaskImg5 }, "scene1+=0.4")
                    .to(svgMaskImg1, 0.2, { morphSVG: svgMaskImg6 }, "scene1+=0.6")
                    .from(messi, 1, { alpha: 0, x: 30, ease: Power1.easeOut }, "scene1+=0.9")
                    .from([txt1, txt2], 1, { alpha: 0, ease: Power1.easeOut }, "scene1+=1.5")
                    .to(txt1, 0.5, { alpha: 0, ease: Power1.easeIn }, "scene1+=4")
                    .from(logo, 1, { alpha: 0, ease: Power1.easeOut }, "scene1+=5")
                    .from(btn, 0.2, { scale: "0", ease: Power1.easeOut }, "scene1+=5.5")
                    .to(btn, 0.3, { scale: "1.1", ease: Power1.easeOut }, "scene1+=6.3")
                    .to(btn, 0.3, { scale: "1.0", ease: Power1.easeOut }, "scene1+=6.6")
                    .to(btn, 0.3, { scale: "1.1" }, "scene1+=7")
                    .to(btn, 0.3, { scale: "1.0", ease: Power1.easeOut }, "scene1+=7.3")
                    .to(btn, 0.5, { alpha: "0", ease: Power1.easeOut }, "scene1+=9.5")
                    .to(logo, 0.5, { alpha: 0, ease: Power1.easeOut }, "scene1+=9.5")
                    .to([sko1, sko2], 0.5, { alpha: 0, ease: Power1.easeOut }, "scene1+=9.5")
                    .to(svgImage, 0.3, { alpha: "0" }, "scene1+=9.5")
                    .to(messi, 0.5, { alpha: 0, ease: Power1.easeOut }, "scene1+=9.5")
                    .to([txt1, txt2], 0.5, { alpha: 0, ease: Power1.easeOut }, "scene1+=9.5")
                    .set(banner, { delay: 0, onComplete: replay_banner });
            }

            if (loops === max_loops) {
                scene1
                    .staggerFrom([sko1, sko2], 1, { alpha: 0, ease: Sine.easeOut }, 0.6, "scene1")
                    .to(svgMaskImg1, 0.2, { morphSVG: svgMaskImg2 }, "scene1+=0.1")
                    .to(svgMaskImg1, 0.2, { morphSVG: svgMaskImg3 }, "scene1+=0.2")
                    .to(svgMaskImg1, 0.2, { morphSVG: svgMaskImg4 }, "scene1+=0.3")
                    .to(svgMaskImg1, 0.2, { morphSVG: svgMaskImg5 }, "scene1+=0.4")
                    .to(svgMaskImg1, 0.2, { morphSVG: svgMaskImg6 }, "scene1+=0.6")
                    .from(messi, 1, { alpha: 0, x: 30, ease: Power1.easeOut }, "scene1+=0.9")
                    .from([txt1, txt2], 1, { alpha: 0, ease: Power1.easeOut }, "scene1+=1.5")
                    .to(txt1, 0.5, { alpha: 0, ease: Power1.easeIn }, "scene1+=4")
                    .from(logo, 1, { alpha: 0, ease: Power1.easeOut }, "scene1+=5")
                    .from(btn, 0.2, { scale: "0", ease: Power1.easeOut }, "scene1+=5.5")
                    .to(btn, 0.3, { scale: "1.1", ease: Power1.easeOut }, "scene1+=6.3")
                    .to(btn, 0.3, { scale: "1.0", ease: Power1.easeOut }, "scene1+=6.6")
                    .to(btn, 0.3, { scale: "1.1" }, "scene1+=7")
                    .to(btn, 0.3, { scale: "1.0", ease: Power1.easeOut }, "scene1+=7.3")
            }
        }

        function replay_banner() {
            reset_banner();
            animate_banner();
        }
        setup();
    }

    function reset_banner() {
        var banner_elements_length = banner_elements.length;
        for (var i = 0; i < banner_elements_length; ++i) {
            TweenMax.killTweensOf(banner_elements[i]);
            TweenMax.set(svgMaskImg1, { morphSVG: svgMaskImg1 });
            TweenMax.set(banner_elements[i], { scaleX: 1, scaleY: 1, alpha: 1, x: 0, y: 0, rotationX: 0, rotationY: 0 });
        }
    }

    on_page_load_complete();
});