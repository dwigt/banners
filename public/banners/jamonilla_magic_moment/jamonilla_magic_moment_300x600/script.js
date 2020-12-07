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
         
         .to('.overlay',  {duration: 0.7, opacity: 0, ease: "none" }, "start")
         .from('.bg1',  { duration: 0.7, opacity: 0, ease: "none" }, "start")
         .from('.bg1',  { duration: 3.3, z: 0.1, rotationZ: 0.01, force3D:true, x: -30, y: -30, ease: "none" }, "start")
         .from('.t1_1', {duration: 2, x: -300,  ease: "power2.out" }, "start")
         .from('.t1_2', {duration: 2,x: 300,  ease: "power2.out" }, "start")
         .from('.bg2', {duration: 0.7, opacity: 0, ease: "none"}, "start+=3.3")
         .to('.bg1', { opacity: 0, ease: "none"}, "-=.7")

         .from('.bg2',  { duration: 3.3, z: 0.1, rotationZ: 0.01, force3D:true, x: -30, y: 60, ease: "none" }, "start+=3.3")
         
         .from('.bg3', {duration: 0.7, z: 0.1, rotationZ: 0.01, force3D:true, opacity: 0, ease: "none"}, "start+=6.6")
         .to('.bg2', { opacity: 0, ease: "none"}, "-=.7")
         .fromTo('.bg3', {scale: 0.91}, { duration: 3.3, scale: 1,  ease: "none" }, "start+=6.6")

         .to('.bg3', { duration: 1, opacity: 0, ease: "none"}, "start+=9.9")
         .to('.t1_1', {duration: 1, x: -300,  ease: "power2.in" }, "start+=9.9")
         .to('.t1_2', {duration: 1, x: 300,  ease: "power2.in" }, "start+=9.9")
         .to(['.bg2'], {duration: .5, opacity: 0, ease: "power2.in" }, "start+=10.9")
         .from('.p1', {duration: .65, scale: 0, ease: "back.out(1.4)"}, "start+=10.9")
         .from('.t2_1',  {duration: 1.5, x: -400,  ease: "power2.out" }, "start+=10.9")
         .from('.t2_2',{duration: 1.5, x: 400,  ease: "power2.out" }, "start+=10.9")
      if (loops < max_loops) {
        mytl.to(
			'.overlay',
          { duration: .5, opacity: 1, ease: "power2.easeIn", onComplete: replay_banner },
          "+=4.1"
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
