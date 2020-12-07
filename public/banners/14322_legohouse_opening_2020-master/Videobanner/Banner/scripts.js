// Hide elements before running animations

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

var video1 = document.getElementById("video1");

// Runs when the page is completely loaded.
function politeInit() {
  Enabler.loadModule(studio.module.ModuleId.VIDEO, function () {
    studio.video.Reporter.attach("video_1", video1);
  });

  var srcNode = document.createElement("source");
  srcNode.setAttribute("type", "video/mp4");
  srcNode.setAttribute(
    "src",
    Enabler.getUrl("https://14322-legohouse-opening.s3-eu-west-1.amazonaws.com/assets/Lh_Opening_Bganimation.mp4")
  );

  video1.appendChild(srcNode);
  video1.play();

}

function bgExitHandler(e) {
  Enabler.exit("Background Exit");
}

document
  .getElementById("exit_click_area")
  .addEventListener("click", bgExitHandler, false);
