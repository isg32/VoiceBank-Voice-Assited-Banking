"use-strict";

const output = document.querySelector(".output");
const start = document.querySelector(".start");
const stop = document.querySelector(".stop");
const body = document.querySelector("body");

const speechRecognition =
  window.speechRecognition || window.webkitSpeechRecognition;

const recognition = new speechRecognition();
recognition.lang = "en";
recognition.interimResults = true;
recognition.continous = true;

start.addEventListener("click", function () {
  recognition.start();
  console.log("recognition started");
});

recognition.onresult = (e) => {
  const transcript = e.results[0][0].transcript;
  console.log(transcript);
  output.textContent = transcript;
  checkTranscript(transcript);
};

let interval;

const checkTranscript = function (transcript) {
  if (transcript.toLowerCase().includes("keep changing colour")) {
    startChaningColor();
  }

  if (transcript.toLowerCase().includes("stop changing colour")) {
    stopChangingColor();
  }
};

const randomColor = function () {
  let color = "#";
  const hex = "0123456789ABCDEF";

  for (let i = 0; i < 6; i++) {
    color += hex[Math.floor(Math.random() * 16)];
  }
  return color;
};

startChaningColor = function () {
  if (!interval) {
    interval = setInterval(changeBgColor, 500);
  }

  function changeBgColor() {
    body.style.backgroundColor = randomColor();
  }
};

stopChangingColor = function () {
  clearInterval(interval);
  interval = null;
  body.style.backgroundColor = "white";
};
