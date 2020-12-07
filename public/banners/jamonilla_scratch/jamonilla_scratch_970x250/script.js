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

    var banner_elements = ['.overlay', '.coin', '.cta_container', '.t1', '.t2', '.t3'];
    var clip_rects = ['.scratch1', '.clip__swiper1', '.clip__swiper2', '.clip__swiper3', '.clip__swiper4', '.clip__swiper5', '.clip__swiper6', '.clip__swiper7', '.clip__swiper8', '.clip__swiper9']

    var mytl;
    var scratchTl;
    var loops = 0;
    var max_loops = 3;

    var clip_swiper_left_to_right = "rect(0px " + "970px " + "250px " + "970px)";
    var clip_swiper_right_to_left = "rect(0px " + "0px " + "250px " + "0px)";
    var reset = "rect(0px 970px 250px 0px)"
    var scratch_duration = .5;
    

    function setup() {
      TweenMax.set('#banner', { opacity: 1 });
      reset_banner();
      animate_banner();
    }

    function animate_banner() {
      loops++;
      mytl = gsap.timeline({ delay: 0 });

      function scratch() {
        scratchTl = gsap.timeline({})
        scratchTl

        .fromTo('.coin', 1,{left: -150, top: 60}, {duration: 0.2, left: -11, top: 79, ease: "none" }, "+=0")

        .to('.clip__swiper1', { duration: scratch_duration, clip: clip_swiper_left_to_right, ease: "none" }, "+=0")
        .to('.coin', { duration: scratch_duration - 0.1, left: 307, top: -150, ease: "none" }, "-=" + (scratch_duration))

        .to('.clip__swiper2', { duration: scratch_duration, clip: clip_swiper_right_to_left, ease: "none" }, "+=0")
        .to('.coin', { duration: scratch_duration, left: 82, top: 153, ease: "none" }, "-=" + scratch_duration)

        .to('.clip__swiper3', { duration: scratch_duration, clip: clip_swiper_left_to_right, ease: "none" }, "+=0")
        .to('.coin', { duration: scratch_duration, left: 470, top: -80, ease: "none" }, "-=" + scratch_duration)

        .to('.clip__swiper4', { duration: scratch_duration, clip: clip_swiper_right_to_left, ease: "none" }, "+=0")
        .to('.coin', { duration: scratch_duration, left: 257, top: 147, ease: "none" }, "-=" + scratch_duration)
        
        .to('.clip__swiper5', { duration: scratch_duration, clip: clip_swiper_left_to_right, ease: "none" }, "+=0")
        .to('.coin', { duration: scratch_duration, left: 613, top: -44, ease: "none" }, "-=" + scratch_duration)

        .to('.clip__swiper6', { duration: scratch_duration, clip: clip_swiper_right_to_left, ease: "none" }, "+=0")
        .to('.coin', { duration: scratch_duration, left: 451, top: 153, ease: "none" }, "-=" + scratch_duration)

        .to('.clip__swiper7', { duration: scratch_duration, clip: clip_swiper_left_to_right, ease: "none" }, "+=0")
        .to('.coin', { duration: scratch_duration, left: 855, top: -32, ease: "none" }, "-=" + scratch_duration)

        .to('.clip__swiper8', { duration: scratch_duration, clip: clip_swiper_right_to_left, ease: "none" }, "+=0")
        .to('.coin', { duration: scratch_duration, left: 750, top: 240, ease: "none" }, "-=" + (scratch_duration))

        .to('.clip__swiper9', { duration: scratch_duration, clip: clip_swiper_left_to_right, ease: "none" }, "+=0")
        .to('.coin', { duration: scratch_duration, left:970, top: 54, ease: "none" }, "-=" + (scratch_duration - 0.1))
      }

      mytl
        .to('.overlay',  {duration: .5, opacity: 0, ease: "power0.easeNone" }, "start")
        .add(scratch, "start+=.3")
        .to('.t1', {duration: .25, opacity: 0, ease: Power1.easeIn }, "start+=3.2")
        .from(['.t2', '.t3'], {duration: .5, opacity: 0, ease: Power1.easeOut}, "start+=3.7")
        .to('.t3', {duration: 0.4, opacity:0.9, repeat: 15, yoyo: true, ease: "rough({ template: none.out, strength: 1, points: 100, taper: 'none', randomize: true, clamp: true})"}, "start+=3.9")
        .to('.cta_container', { duration: .3, scale: 1.1, yoyo: true, repeat: 3, ease: Power1.easeOut }, "start+=8.1")
      mytl;


      if (loops < max_loops) {
        mytl.to(
			'.overlay',
          { duration: .5, opacity: 1, ease: "power1.easeIn", onComplete: replay_banner },
          "+=1"
        );
      }
      else {
        mytl.set('.t3', {opacity: 1}, '+=0')
      }
    }

    function replay_banner() {
      reset_banner();
      animate_banner();
    }

    function reset_banner() {
      gsap.set(banner_elements, { clearProps: "all" });
      gsap.set(clip_rects, { clip: reset });
    }
    setup();
}

