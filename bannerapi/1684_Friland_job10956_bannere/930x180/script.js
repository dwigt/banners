var banner = $("#banner");
TweenMax.set(banner, { alpha: 0 });

var QueryString = function() {
    var query_string = {};
    var query = window.location.href.split("#")[1] || "";
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = pair[1];
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], pair[1]];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(pair[1]);
        }
    }
    return query_string;
}();

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

// Hide elements before running animations
var bg1 = $("#bg1");
var bg2 = $("#bg2");
var logo1 = $("#logo1");
var logo2 = $("#logo2");
var motiv1 = $("#motiv1");
var motiv2 = $("#motiv2");
var txt1 = $("#txt1");
var txt2 = $("#txt2");
var logo2 = $("#logo2");
var logo2sc2 = $("#logo2sc2");
var logo3sc2 = $("#logo3sc2");
var logo3sc3 = $("#logo3sc3");
var btn = $("#btn");
var scene1 = $("#scene1");
var scene2 = $("#scene2");
var scene3 = $("#scene3");
var bg2sc2 = $("#bg2sc2");
var bg1sc2 = $("#bg1sc2");

function politeInit() {

    $(function() {

        var scene1;
        var scene2;
        var scene3;


        var loop = 0;
        var max_loop = 99;






        function next_scene(scene) {
            if (scene == 1) {
                animate_scene2();
            }
            if (scene == 2) {
                animate_scene3();
            } else if (scene == 3) {
                reset_banner();
                animate_scene1();
            }
        }


        var bannerElements = [
            banner,
            bg1,
            bg2,
            logo1,
            logo2,
            motiv1,
            motiv2,
            txt1,
            txt2,
            logo2sc2,
            logo2sc3,
            logo3sc2,
            logo3sc3,
            btn,
            bg1sc2,
            bg2sc2
        ];


        reset_banner();
        TweenMax.from(bg1, 1, { alpha: 0, ease: Back.easeOut.config(1) })

        function animate_scene1(next) {
            TweenMax.set(banner, { alpha: 1 });
            TweenMax.set($("#scene1"), { alpha: 1 });
            TweenMax.set($("#scene2"), { alpha: 0 });
            TweenMax.set($("#scene3"), { alpha: 0 });


            loop++;
            scene1 = new TimelineMax({ delay: 0 });
            scene1
                .from(logo2, 0.7, { x: 250, ease: Power3.easeOut }, "scene1+=0")
                .from(logo1, 0.7, { x: -250, ease: Power3.easeOut }, "scene1+=0")
                .from(motiv1, 1, { y: -180, ease: Power3.easeOut }, "scene1+=0.7")
                .to(logo1, 0.5, { x: -250, ease: Power3.easeIn }, "scene1+=4")
                .to(logo2, 0.5, { x: 250, ease: Power3.easeIn }, "scene1+=4")
                .to(motiv1, 0.5, { y: -180, ease: Power3.easeIn }, "scene1+=4")
            if (!next) {
                scene1.set(banner, { delay: 0 });
                scene1
                ;
                scene1.set(banner, { delay: 0, onComplete: next_scene, onCompleteParams: [1] }, "end");
            }

            ;


        }

        function animate_scene2(next) {
            TweenMax.set(banner, { alpha: 1 });
            TweenMax.set($("#scene2"), { alpha: 1 });
            TweenMax.set($("#scene1"), { alpha: 0 });
            TweenMax.set($("#scene3"), { alpha: 0 });


            scene2 = new TimelineMax({ delay: 0 });
            scene2
                .from(motiv2, 1, { y: 350, ease: Power1.easeOut }, "scene2+=0")
                .from(txt1, 0.7, { x: -250, ease: Power3.easeOut }, "scene2+=0.8")
                .from(logo2sc2, 0.7, { x: 250, ease: Power3.easeOut }, "scene2+=0.8")
                .to(txt1, 1.1, { alpha: 0, ease: Back.easeOut.config(1) }, "scene2+=3")
                .to(motiv2, 1, { y: -360, ease: Power1.easeIn }, "scene2+=3")
                .to(logo2sc2, 1.1, { alpha: 0, ease: Power3.easeOut }, "scene2+=3")
                .to(bg1sc2, 1, { y: -180, ease: Power1.easeIn }, "scene2+=3")
                .from(bg2sc2, 1, { y: 180, ease: Power1.easeIn }, "scene2+=3")

            if (!next) {
                scene2.set(banner, { delay: 0 });;
                scene2.set(banner, { delay: 0, onComplete: next_scene, onCompleteParams: [2] }, "end");
            }

            ;
        }

        function animate_scene3(next) {
            TweenMax.set(banner, { alpha: 1 });
            TweenMax.set($("#scene3"), { alpha: 1 });
            TweenMax.set($("#scene1"), { alpha: 0 });
            TweenMax.set($("#scene2"), { alpha: 0 });


            scene3 = new TimelineMax({ delay: 0 });
            scene3
                .from(txt2, 0.5, { alpha: 0, ease: Power0.easeNone }, "scene3+=0")
                .from(btn, 0.5, { alpha: 0, scale: 0.8, ease: Back.easeOut.config(2) }, "scene3+=0")
                .from(logo3sc3, 0.7, { x: 250, ease: Power3.easeOut }, "scene3+=1")
                .to(logo3sc3, 0.7, { alpha: 0, ease: Power3.easeOut }, "scene3+=3")
                .from(logo2sc3, 0.7, { alpha: 0, ease: Power3.easeOut }, "scene3+=3.3")
                .to(btn, .7, { scale: 0.9, yoyo: true, repeat: 3, ease: Back.easeOut.config(1) }, "scene3+=3.3")
            if (!next && loop < max_loop) {
                scene3
                    .to([txt2, btn, logo2sc3], .5, { alpha: 0, ease: Power3.easeOut }, "scene3+=7")
                    .to(bg2, .5, { alpha: 0, ease: Power3.easeOut }, "scene3+=7.5")
                    .set(banner, { delay: 0 });;
                scene3.set(banner, { delay: 0, onComplete: next_scene, onCompleteParams: [3] }, "end");
            }



        }


        function reset_banner() {
            var bl = bannerElements.length;
            for (var i = 0; i < bl; ++i) {
                TweenMax.killTweensOf(bannerElements[i]);
                TweenMax.set(bannerElements[i], { scaleX: 1, scaleY: 1, alpha: 1, x: 0, y: 0 });
            }
        }

        if (typeof QueryString.tag !== "undefined") {
            if (QueryString.tag != "") {
                document.getElementById("clickTAG").href = decodeURIComponent(QueryString.tag) + document.getElementById("clickTAG").href;
            }
        }

        if (typeof QueryString.debug !== "undefined") {
            if (typeof QueryString.scene !== "undefined") {
                if (QueryString.scene == 1) {
                    animate_scene1(true);
                }
                if (QueryString.scene == 2) {
                    animate_scene2(true);
                } else {
                    animate_scene3(true);
                }
            } else {
                setTimeout(function() { animate_scene1(); }, 10);
            }
        } else {
            setTimeout(function() { animate_scene1(); }, 10);
        }


    });
}