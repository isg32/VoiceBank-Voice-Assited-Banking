"use strict";

const output = document.querySelector(".output");
const start = document.querySelector(".start");
const stop = document.querySelector(".stop");
const body = document.querySelector("body");

const speechRecognition =
  window.speechRecognition || window.webkitSpeechRecognition;

const recognition = new speechRecognition();
recognition.lang = "en";
recognition.interimResults = true;
recognition.continuous = true;

let latestTranscript = "";
let isListening = false;

start.addEventListener("click", function () {
  recognition.start();
  console.log("recognition started");
  isListening = true;
});

recognition.onresult = (e) => {
  latestTranscript = "";
  for (let i = 0; i < e.results.length; i++) {
    latestTranscript = e.results[i][0].transcript;
  }

  output.textContent = latestTranscript;
  console.log(latestTranscript);

  setTimeout(function () {
    latestTranscript = "";
    console.log("New Latest Transcript");
    console.log(latestTranscript);
  }, 3000);
  checkTranscript(latestTranscript);
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

const startChaningColor = function () {
  if (!interval) {
    interval = setInterval(changeBgColor, 500);
  }

  function changeBgColor() {
    body.style.backgroundColor = randomColor();
  }
};

const stopChangingColor = function () {
  clearInterval(interval);
  interval = null;
  body.style.backgroundColor = "white";
};
