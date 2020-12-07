// Hide elements before running animations
gsap.set("#banner", { opacity: 0 });

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
}

// Runs when the page is completely loaded.
function politeInit() {

    var banner_elements = ['.overlay', '.bg1', '.bg2', '.bg3', '.t1_1', '.t1_2', '.t2_1', '.t2_2', '.p1'];

    var mytl;
    var loops = 0;
    var max_loops = 2;

    function setup() {
      TweenMax.set('#banner', { opacity: 1 });
      reset_banner();
      animate_banner();
    }

    function animate_banner() {
      loops++;
      mytl = gsap.timeline({ delay: 0 });

      gsap.defaults({
        ease: "power2.out", 
        overwrite: "auto",
        smoothOrigin: false,
        duration: 1
      });

      mytl
         
         .to('.overlay',  {duration: .5, opacity: 0, ease: "power0.easeNone" }, "start")
         .fromTo('.bg1', {scale: 1}, { duration: 3.7, scale: 1, x: -32, y: -16, ease: "power0.easeNone" }, "start")
         .from('.t1_1', {duration: 2, x: -300,  ease: "power2.out" }, "start")
         .from('.t1_2', {duration: 2,x: 300,  ease: "power2.out" }, "start")
         .from('.bg2', {duration: 1, opacity: 0, ease: "power0.easeNone"}, "start+=3.7")
         .to('.bg1', { opacity: 0, ease: "power0.easeNone"}, "-=1")

         .fromTo('.bg2',  {scale: 1}, { duration: 3.7, scale: 1, x: -32, y: 32, ease: "power0.easeNone" }, "start+=3.7")

         .from('.bg3', {duration: 1, opacity: 0, ease: "power0.easeNone"}, "start+=7.5")
         .fromTo('.bg3', {scale: 0.91}, { duration: 3.7, scale: 1,  ease: "power0.easeNone" }, "start+=7.5")
         .to('.bg2', { opacity: 0, ease: "power0.easeNone"}, "-=1")

         .to('.bg3', { duration: 1, opacity: 0, ease: "power0.easeNone"}, "start+=11.25")
         .to('.t1_1', {duration: 1, x: -320,  ease: "power2.in" }, "start+=11.25")
         .to('.t1_2', {duration: 1, x: 320,  ease: "power2.in" }, "start+=11.25")
         .to(['.bg2'], {duration: .5, opacity: 0, ease: "power2.in" }, "start+=12.25")
         .from('.p1', {duration: .65, scale: 0, ease: "back.out(1.4)"}, "start+=12.5")
         .from('.t2_1',  {duration: 1.5, y: -320,  ease: "power2.out" }, "start+=12.25")
         .from('.t2_2',{duration: 1.5, y: 320,  ease: "power2.out" }, "start+=12.25")
      if (loops < max_loops) {
        mytl.to(
			'.overlay',
          { duration: .5, opacity: 1, ease: "power2.easeIn", onComplete: replay_banner },
          "+=3"
        );
      }
    }

    function replay_banner() {
      reset_banner();
      animate_banner();
    }

    function reset_banner() {
      gsap.set(banner_elements, { clearProps: "all" });
    }
    setup();
}
