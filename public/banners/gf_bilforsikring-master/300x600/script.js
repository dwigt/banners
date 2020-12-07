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
}

// Runs when the page is completely loaded.
function politeInit() {
  $(function() {
    var bg = document.getElementById("bg");
    var bg_flash = document.getElementById("bg_flash");
    var scene_1_text = document.getElementById("scene_1_text");
    var logo = document.getElementById("logo");
    var cta = $("#cta");
    var cursor = $(".cursor");
    var license_number_container = $(".license-number_container, #licensebg");

    var inputElements = $(".input__licenseplate");

    var banner_elements = [bg, bg_flash, scene_1_text, cta, logo];

    var mytl;
    var loops = 0;
    var max_loops = 5;

    function setup() {
      initInputs();
      TweenMax.set(banner, { alpha: 1 });
      reset_banner();
      animate_banner();
    }

    function initInputs() {
      $("#licensebg").on("click touch", function() {
        inputElements[0].focus();
      });
      inputElements.on("keyup", function() {
        var maxLength = parseInt($(this).attr("maxlength"));
        var currLength = $(this).val().length;
        var KeyID = event.which;
        var next = this.nextElementSibling;
        var prev = this.previousElementSibling;

        if (currLength === maxLength && next) {
          next.focus();
        }
        if (KeyID === 8 && currLength === 0 && prev) {
          prev.focus();
        }
        if (event.keyCode === 13) {
          cta.click();
        }
      });

      inputElements.on("focus", function(e) {
        stop_animation();
        var prev = this.previousElementSibling;
        if (!prev) {
          inputElements[0].focus();
        }
        if (prev && prev.value === "") {
          this.previousElementSibling.focus();
        }
        prevFocus = e.target;
      });

      cta.on("click", function(e) {
        var initURL =
          "https://www.gfforsikring.dk/beregn/gfforsikring?entryInsurances=car";
        inputElements.each(function() {
          initURL += "&" + $(this).attr("id") + "=" + $(this).val();
        });
        Enabler.exitOverride("license-test", initURL);
      });
    }

    function stop_animation() {
       inputElements.addClass("active");
       TweenMax.to(["#licenses", "#cursor"], 0.15, { opacity: 0 }, "end");
       TweenMax.set("#licenses", { opacity: 0, display: "none" }, "end+=.25");
       TweenMax.set("#cursor", { opacity: 0, display: "none" }, "end+=.25");
       mytl.clear();
    }

    function animate_banner() {
      mytl = new TimelineMax({});

      var create_timeline = function() {
        var licensetl = new TimelineMax({});
        return licensetl;
      };

      function animate_license(type) {
        var licensetl = create_timeline();
        
        function animate() {
          var license = $("#licenses")
            .children()
            .eq(loops);
          var split = new SplitText(license, {
            type: "chars",
            charsClass: "chars"
          });
          licensetl
            .set(license, { opacity: 1 }, "license")
            .staggerFrom(
              split.chars,
              2.5,
              { opacity: 0, ease: SteppedEase.config(1) },
              0.14,
              "license"
            )
            .to(cta, 0.25, { scale: 1.1, yoyo: true, repeat: 3 }, "+=0");
          if (loops < max_loops) {
            licensetl
              .staggerTo(
                split.chars,
                2.5,
                { opacity: 0, ease: SteppedEase.config(1) },
                -0.14,
                "license+=3.5"
              )
              .set(license, { opacity: 0 }, "license+=6")
              .set(split.chars, { clearProps: "all" }, "license+=6");
          }
        }

        function animateOut() {
          var license = $("#licenses")
            .children()
            .eq(loops);
          var split = new SplitText(license, {
            type: "chars",
            charsClass: "chars"
          });
          licensetl
              .set(license, { opacity: 1 }, "license")
              .staggerTo(
                split.chars,
                2.5,
                { opacity: 0, ease: SteppedEase.config(1) },
                -0.14,
                "license+=0"
              )
              .set(license, { opacity: 0 }, "license+=2.5")
              .set(split.chars, { clearProps: "all" }, "license+=2.5");
        }
        if (type === "out") {
          animateOut()
        }
        else {
          animate();
        }
        loops++;
      }

      // scene 1
      mytl
        .from(bg_flash, 0.35, { alpha: 1, ease: Power2.easeOut }, "start")
        .from(bg, 2.5, { scale: 1.15, ease: Power2.easeOut }, "start")
        .from(
          scene_1_text,
          0.5,
          { alpha: 0, y: -5, ease: Power2.easeOut },
          "start+=1"
        )
        .from(
          [license_number_container, cta],
          0.5,
          { alpha: 0, scale: 0.3, ease: Back.easeOut.config(1.1) },
          "start+=1.5"
        )

        .call(animate_license, ["out"], "start+=2")
        .to(cta, 0.25, { scale: 1.1, yoyo: true, repeat: 3 }, "start+=2")
        .from(
          cursor,
          0.5,
          { opacity: 0, repeat: -1, yoyo: true, ease: SteppedEase.config(1) },
          "start+=1.5"
        )
        .add(animate_license, "start+=3.75")
        .add(animate_license, "start+=8.5")
        .add(animate_license, "start+=13.25")
        .add(animate_license, "start+=18")
        .add(animate_license, "start+=22.75")
        .add(stop_animation, "start+=27.5");
    }

    function reset_banner() {
      TweenMax.killAll(false, true, false);
      TweenMax.set(banner_elements, { clearProps: "all" });
    }
    setup();
  });
}
