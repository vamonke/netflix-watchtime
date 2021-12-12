var startAt = new Date();
console.log('Started Netflix at ' + startAt);

let observer = new MutationObserver((mutations) => {
  for (let mutation of mutations) {
    for (let addedNode of mutation.addedNodes) {
      var classList = addedNode.classList;
      if (!classList) return;
      
      if (classList.contains("SeamlessControls--container")) {
        console.log("Found credits container");
        addCreditsMessage(addedNode);
      }

      if (classList.contains("watch-video--evidence-overlay-container")) {
        console.log("Found overlay container");
        addPausedMessage();
      }
    }
  }
});

function getDuration() {
  return Date.now() - startAt;
}

function getMessage() {
  var duration = getDuration();

  var durationInSec = parseInt(duration, 10) / 1000;
  var hours = Math.floor(durationInSec / 3600);
  var minutes = Math.floor((durationInSec - hours * 3600) / 60);
  var seconds = Math.floor(durationInSec - hours * 3600 - minutes * 60);

  // if (hours < 10) hours = "0" + hours;
  // if (minutes < 10) minutes = "0" + minutes;
  // if (seconds < 10) seconds = "0" + seconds;

  var message = "You've been on Netflix for ";

  if (hours > 0) message += " " + hours + "h";
  if (minutes > 0) message += " " + minutes + "min";
  if (seconds > 0) message += " " + seconds + "s";

  return message;
}

function addCreditsMessage(parentNode) {
  $(parentNode).css({ backgroundColor: "rgba(0, 0, 0, 0.6)" });
  // $(".SeamlessControls--background-artwork-visible").css({
  //   opacity: 0.2,
  // });

  var object = {
    id: "watchtime-credits-msg",
    // class: "",
    text: getMessage(),
    css: {
      position: "absolute",
      top: "45vh",
      fontSize: "5em",
      right: "0",
      left: "0",
      margin: "0 auto",
      width: "60vw",
      textAlign: "center",
      fontWeight: "bold",
    },
  };
  var element = $("<div/>", object);
  element.appendTo(parentNode);
}

function addPausedMessage() {
  if (getDuration() < 60000) return; // Ignore if less than 1 min

  var object = {
    id: "watchtime-paused-msg",
    // class: "",
    text: getMessage(),
    css: {
      fontSize: "2.4rem",
      fontWeight: "bold",
      marginTop: "3rem",
    },
  };
  var element = $("<div/>", object);

  $("div[data-uia='evidence-overlay']").append(element);
}


observer.observe(document, { childList: true, subtree: true });

// .SeamlessControls--background-artwork-visible 0.2
