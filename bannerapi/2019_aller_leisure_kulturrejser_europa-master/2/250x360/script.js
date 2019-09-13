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
      t1 = $("#t1"),
      cta = $("#cta"),
      lensFlare = $("#lens"),
      overlay = $("#overlay")
    ];

    var bannerHeight = $("#banner").outerHeight();
    var bannerWidth = $("#banner").outerWidth();

    var mytl;
    var loops = 0;
    var max_loops = 99;

    function setup() {
      TweenMax.set(banner, { alpha: 1 });
      reset_banner();
      animate_banner();
    }

    function setupFlare() {
      var bgrCanvas = LensFlare.generateCanvas(bannerWidth, bannerHeight);
      var bgrContext = bgrCanvas.getContext('2d');
      var lensFlareCanvas;
      lensFlareCanvas = lens.appendChild(LensFlare.init(bgrCanvas, bannerWidth, bannerHeight, null, lensGenerated));


      function lensGenerated() {
        lensFlareCanvas.play(300, 210, 50, 200, 7);
      }
    };

    function animate_banner() {
      loops++;
      mytl = new TimelineMax({ delay: 0.5 });
      // GSDevTools.create({persist: false});

      mytl

      mytl.to(overlay, 0.35, { opacity: 0 }, "start+=0")
        .fromTo(bg, 9, { scale: 1.2, force3D: true, z: 0.1, rotationZ: 0.01, ease: Power0.easeNone }, { scale: 1 }, "start+=0")
        .from(t1, 0.45, { alpha: 0, y: -5, ease: Power1.easeOut }, "start+=.5")
        .add(setupFlare, "start+=2")
        .from(cta, 0.35, { alpha: 0, y: -5, ease: Power0.easeNone }, "start+=1")
        .to(cta, 0.35, { scale: 0.9, force3D: false, repeat: 3, yoyo: true, ease: Power0.easeNone }, "start+=6")
        .to(lensFlare, 0.7, { opacity: 0, x: 5 }, "start+=8")
        ;

      if (loops < max_loops) {
        mytl.to(overlay, 0.25, { opacity: 1 }, "start+=9.75")
        mytl.set(banner, { delay: 0, onComplete: replay_banner });
      }
    }

    function replay_banner() {
      reset_banner();
      animate_banner();
    }

    function reset_banner() {
      $(lens).empty();
      TweenMax.killAll(false, true, false);
      TweenMax.set(banner_elements, { clearProps: "all" });
    }
    setup();
  });
};