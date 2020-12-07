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

  $(function () {

    var banner_elements = [
      bg = $("#bg"),
      planewall = $("#planewall"),
      t1 = $("#t1"),
      t2 = $("#t2"),
      cta = $("#cta"),
      overlay = $("#overlay")
    ];

    var mytl;
    var loops = 0;
    var max_loops = 3;

    function setup() {
      TweenMax.set(banner, { alpha: 1 });
      reset_banner();
      animate_banner();
    }

    function animate_banner() {
      loops++;
      mytl = new TimelineMax({ delay: 0 });
      // GSDevTools.create({persist: false});

      mytl
        .to(overlay, 0.15, { autoAlpha: 0, ease: Power0.easeNone }, "start")
        .to(bg, 9, { x: -60, ease: Power0.easeNone }, "start")
        .to(cta, 0.35, { scale: 0.95, force3D: false, repeat: 3, yoyo: true, ease: Power0.easeNone }, "start+=2")
        .from(bg, 3, { y: -32, ease: Power3.easeInOut }, "start+=4")
        .from(planewall, 3, { scale: 15, transformOrigin: '238px 118px', ease: Power3.easeInOut }, "start+=4")

        .to([t2, cta, logo], 0.35, { autoAlpha: 0 }, "start+=4")
        .from(t1, 0.35, { autoAlpha: 0, ease: Power0.easeNone }, "start+=6.5")
        .to(logo, 0.35, { autoAlpha: 1, ease: Power0.easeNone }, "start+=6.5")
        .to(cta, 0.35, { autoAlpha: 1, ease: Power0.easeNone }, "start+=6.5")
        .to(cta, 0.35, { scale: 0.95, force3D: false, repeat: 3, yoyo: true, ease: Power0.easeNone }, "start+=7.5")
    

      if (loops < max_loops) {
        mytl.to(overlay, 0.5, { autoAlpha: 1, ease: Power0.easeNone }, "start+=9.5")
        mytl.set(banner, { delay: 0, onComplete: replay_banner });
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