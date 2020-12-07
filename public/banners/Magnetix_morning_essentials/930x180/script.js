// Hide elements before running animations
var banner = $("#banner");
TweenMax.set(banner, { alpha: 0 });

$(function() {

    var text1 = $("#text1");
    var text2_1 = $("#text2_1");
    var text2_2 = $("#text2_2");
    var text3_1 = $("#text3_1");
    var text3_2 = $("#text3_2");
    var light1 = $("#light1");
    var light2 = $("#light2");
    var light3 = $("#light3");
    var light4 = $("#light4");
    var tech_lines = $("#tech_lines");

    var banner_elements = [
        text1,
        text2_1,
        text2_2,
        text3_1,
        text3_2,
        light1,
        light2,
        light3,
        light4,
        tech_lines
    ];

    var mytl;
    var loops = 0;
    var max_loops = 99;

    function on_page_load_complete() {

        function setup() {
            TweenMax.set(banner, { alpha: 1 });
            reset_banner();
            animate_banner();
        }

        function animate_banner() {
            loops++;
            mytl = new TimelineMax({ delay: 0.5 });

            mytl
                .from(tech_lines, 0.5, { y: 100, ease: Power1.easeOut }, "scene1Start")
                .from(tech_lines, 0.5, { alpha: 0, ease: RoughEase.ease.config({ strength: 1, points: 10, taper: "none", randomize: false, clamp: true }) }, "scene1Start")

            .from(text1, 0.5, { y: -10, alpha: 0, ease: Power2.easeOut }, "scene1Start+=0.5")
                .staggerFrom([light1, light2, light3, light4], 0.5, { alpha: 0, ease: RoughEase.ease.config({ strength: 1, points: 10, taper: "none", randomize: false, clamp: true }) }, 0.25, "scene1Start+=0.5")
                .to(text1, 0.5, { alpha: 0, ease: Power2.easeOut }, "scene1End+=1.5")
                .staggerTo([light1, light2, light3, light4], 0.5, { alpha: 0, ease: RoughEase.ease.config({ strength: 1, points: 10, taper: "none", randomize: false, clamp: true }) }, 0.25, "scene1End+=1.5")

            .staggerFrom([text2_1, text2_2], 0.5, { y: -10, alpha: 0, ease: Power2.easeOut }, 0.25, "scene2Start")
                .staggerTo([light3, light2, light1, light4], 0.5, { alpha: 1, ease: RoughEase.ease.config({ strength: 1, points: 10, taper: "none", randomize: false, clamp: true }) }, 0.25, "scene2Start")
                .to([text2_1, text2_2], 0.5, { alpha: 0, ease: Power2.easeOut }, "scene2End+=1.5")
                .staggerTo([light3, light2, light1, light4], 0.5, { alpha: 0, ease: RoughEase.ease.config({ strength: 1, points: 10, taper: "none", randomize: false, clamp: true }) }, 0.25, "scene2End+=1.5")

            .staggerFrom([text3_1, text3_2], 0.5, { y: -10, alpha: 0, ease: Power2.easeOut }, 0.25, "scene3Start")
                .staggerTo([light2, light4, light1, light3], 0.5, { alpha: 1, ease: RoughEase.ease.config({ strength: 1, points: 10, taper: "none", randomize: false, clamp: true }) }, 0.25, "scene3Start");
            if (loops < max_loops) {

                mytl.to([text3_1, text3_2, tech_lines, light1, light2, light3, light4], 0.5, { alpha: 0, ease: Power2.easeOut }, "scene3End+=1.5")
                mytl.set(banner, { delay: 0, onComplete: replay_banner });

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
            TweenMax.set(banner_elements[i], { scaleX: 1, scaleY: 1, alpha: 1, x: 0, y: 0, rotationX: 0, rotationY: 0 });
        }
    }

    on_page_load_complete();
});