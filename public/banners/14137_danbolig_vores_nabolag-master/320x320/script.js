gsap.set("#banner", { opacity: 0 });

if (Enabler.isInitialized()) {
  init();
} else {
  Enabler.addEventListener(studio.events.StudioEvent.INIT, init);
}

function init() {
  if (Enabler.isPageLoaded()) {
    politeInit();
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, politeInit);
  }
}

function politeInit() {

    var banner_elements = ['.scene1', '.scene2', '.scene3', '.t1', '.star', '.inner_star', '.star1', '.star2', '.houses_container', '.shape1', '.shape2', '.shape3', '.t2', '.favorit1', '.favorit2', '.favorit3', '.favorit4', '.favoritpin1', '.favoritpin2' , '.favoritpin3', '.favoritpin4', '.bg3', '.t3', '.phone', '.bg4', '.heart', '.t4', '.appstore'];
    var pins =  ['.favorit1', '.favoritpin4', '.favorit3', '.favoritpin2' ,'.favorit4', '.favoritpin1','.favorit2',  '.favoritpin3']
    var mytl;
    var loops = 0;
    var max_loops = 2;
    
    function setup() {
      gsap.set('#banner', { opacity: 1 });
      reset_banner();
      animate_banner();
    }

    function animate_banner() {
      loops++;
      mytl = gsap.timeline();

      mytl
      .to('.overlay',{ duration: .5, opacity: 0, ease: "power1.easeIn" },"start")
      .add(scene1(), 'scene1')
      .add(scene2(), 'scene2+=2')
      .add(scene3(), 'scene3+=2')
      .add(scene4(), 'scene4+=2')
     
      

      
      function stars() {
        star = gsap.timeline();
        var duration = '.15'
        star
        .from(['.star-pulse1','.star-pulse2', '.star-pulse3'], {duration: .5, scale: 0, ease: "power1.out", stagger: {each: 0.25, ease: "none"} }, 'start')
        
        .to('.star-pulse1', {duration: duration, scale: 1.5, yoyo: true, repeat: 1}, '+=0')
        .to('.star-pulse-inner1', {duration: duration, backgroundColor: '#93e6b0', yoyo: true, repeat: 1}, '-=' + duration)
        .from('.star1_2', {duration: duration, opacity: 0}, '-=' + duration)

        .to('.star-pulse2', {duration: duration, scale: 1.5, yoyo: true, repeat: 1}, '+=0')
        .to('.star-pulse-inner2', {duration: duration, backgroundColor: '#93e6b0', yoyo: true, repeat: 1}, '-=' + duration)
        .from('.star2_2', {duration: duration, opacity: 0}, '-=' + duration)

        .to('.star-pulse3', {duration: duration, scale: 1.5, yoyo: true, repeat: 1}, '+=0')
        .to('.star-pulse-inner3', {duration: duration, backgroundColor: '#93e6b0', yoyo: true, repeat: 1}, '-=' + duration)
        .from('.star3_2', {duration: duration, opacity: 0}, '-=' + duration)
        return star;
      }

      function scene1() {
        var houseArr = ['.house2','.house5','.house1', '.house3', '.house4']
        scene1 = gsap.timeline();
        scene1
        .from(houseArr.reverse(), {duration: .5, scale: 0, ease: "power1.out", stagger: {each: 0.25, ease: "none"}}, '+=0')
        .add(stars(), '+=0')

        return scene1
      }
      
      function scene2() {
        scene2 = gsap.timeline();
        scene2
        .from(['.bg2', '.t2'], {duration: .15, ease: "power1.out", opacity: 0}, '+=0')
        .from(['.shape1', '.shape2', '.shape3'], {opacity: 0, ease: "power1.out"}, '+=0')
        .from(pins, {duration: .4, scale: 0, ease: "power1.out", stagger: {each: .2,ease: "none"}}, "+=0")
       
        return scene2
      }

      function scene3() {
        scene3 = gsap.timeline();
        scene3
        .from(['.bg3'], {duration: .15, ease: "power1.out",opacity: 0}, '+=0')
        .from( '.t3', {duration: .35, ease: "power1.out",opacity: 0}, '+=.1')
        .from('.phone', {duration: .5, x: '320px', ease: "power1.out"}, '+=.1')
        return scene3
      }

      function scene4() {
        scene4 = gsap.timeline();
        scene4
        .from(['.bg4'], {duration: .15, opacity: 0, ease: "power1.out", }, 'scene4+=0')
        .from(['.heart', '.t4', '.appstore'], {duration: .35, opacity: 0, ease: "power1.out" }, 'scene4+=0.1')
        return scene4
      }
     

      if (loops < max_loops) {
        mytl.to('.overlay',{ duration: .5, opacity: 1, ease: "power1.out", delay: 3, onComplete: replay_banner },"+=0");
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
