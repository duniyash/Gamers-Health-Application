// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getAuth,
  sendPasswordResetEmail,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import {
  getDatabase,
  set,
  get,
  ref,
  child,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
import {
  getStorage,
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBJhkQhDdkTbB-Uhhqiytfx6Fm5tVjb1Cs",
  authDomain: "physico-64e55.firebaseapp.com",
  databaseURL: "https://physico-64e55-default-rtdb.firebaseio.com",
  projectId: "physico-64e55",
  storageBucket: "physico-64e55.appspot.com",
  messagingSenderId: "919838418395",
  appId: "1:919838418395:web:4c3d8f7a3af1b0219ff3fe",
  measurementId: "G-P2KKMSZWSK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);
const storage = getStorage();
const dref = ref(database);


const startTimerBtn = document.querySelector("#startButton");
const stopTimerBtn = document.querySelector("#stopButton");
// const closeModalBtn = document.querySelector("#close-modal");
const modal = document.querySelector("#modal");

var stream;
var thisTimePlayed;
var todayTimePlayed;
var totalTimePlayed;
let today;
// var timer;
var timerSeconds;

let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let canvas = document.querySelector("#canvas");

var sec = 0;
var min = 0;

// var noOfExercises;
var postureOutput;

var minute = document.querySelector("#minute");
var second = document.querySelector("#second");

// var checkArm;
// var checkEye;
// var checkBack;
// var checkOther;

//on-click event to start the flow and open the modal
$("#startButton").click(function()
{
  clearInterval(timerSeconds);
  second.innerHTML = "00";
  minute.innerHTML = "00";
  modal.showModal();
});

//on-click event to start camera input stream
$("#start-camera").click(async function()
{
  stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
  video.srcObject = stream;
});

//on-click event to capture image
$("#click-photo").click(function()
{
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  let image_data_url = canvas.toDataURL("image/jpeg");

  sendHttpRequest("POST", "http://localhost:5000/url", {
    url: image_data_url,
  }).then((responseData) => {
    console.log(responseData);

    postureOutput = responseData.Prediction;
  });

  if (postureOutput == "incorrect") {
    document.getElementById("resultGood").style.display = "none";
    document.getElementById("resultBad").style.display = "block";
  } else if (postureOutput == "correct") {
    document.getElementById("resultBad").style.display = "none";
    document.getElementById("resultGood").style.display = "block";
    click_button.style.display = "none";
    camera_button.style.display = "none";
  }
  // data url of the image
  console.log(image_data_url);

  pushNotif();
});

//on-click event to close the camera input stream and start the timer
$("#close-modal").click(function()
{
  if (postureOutput == "correct") {
    // <= change incorrect to correct here
    stream.getTracks().forEach((track) => track.stop());

    startTimerBtn.style.display = "none";
    stopTimerBtn.style.display = "block";

    modal.close();

    document.getElementById("resultBad").style.display = "none";
    document.getElementById("resultGood").style.display = "none";

    sec = 0;
    min = 0;

    timerSeconds = setInterval(() => {
      if (sec < 10) {
        second.innerHTML = "0" + sec;
      } else {
        second.innerHTML = sec;
      }
      sec++;

      if (sec == 61) {
        sec = 0;
        second.innerHTML = "0" + sec;
        min++;
        if (min < 10) {
          minute.innerHTML = "0" + min;
        } else {
          minute.innerHTML = min;
        }
      }

      if (min == 20) {
        pushNotif("exercise");
      }
    }, 1000);
  }
});

//on-click event to stop timer
$("#stopButton").click(function()
{
  
  switch (new Date().getDay()) {
    case 0:
      todayday = "Sunday";
      thisTimePlayed = min + sec / 60;
      break;
    case 1:
      todayday = "Monday";
      thisTimePlayed = min + sec / 60;
      break;
    case 2:
      todayday = "Tuesday";
      thisTimePlayed = min + sec / 60;
      break;
    case 3:
      todayday = "Wednesday";
      thisTimePlayed = min + sec / 60;
      break;
    case 4:
      todayday = "Thursday";
      thisTimePlayed = min + sec / 60;
      break;
    case 5:
      todayday = "Friday";
      thisTimePlayed = min + sec / 60;
      break;
    case  6:
      todayday = "Saturday";
      thisTimePlayed = min + sec / 60;
  }

  console.log(todayday);

  todayTimePlayed += thisTimePlayed;
  totalTimePlayed += todayTimePlayed;

  //send time played to firebase here
  var userUid = (getAuth().currentUser).uid;
  update(ref(database, 'valorant/' + userUid),{
    totalHoursPlayedValorant: totalTimePlayed,
    todayhoursPlayedValorant: todayTimePlayed,
    mondayhoursPlayedValorant: 0,
    tuesdayhoursPlayedValorant: 0,
    wednesdayhoursPlayedValorant: 0,
    thursdayhoursPlayedValorant: 0,
    fridayhoursPlayedValorant: 0,
    saturdayhoursPlayedValorant: 0,
    sundayhoursPlayedValorant: 0
  })
  .then(()=>{
      console.log("Data updated successfully.");
      // showErrorMessage("Data updated successfully.");
      // location.reload();
  })
  .catch((error)=>{
      console.log(error);
  });

  stopTimerBtn.style.display = "none";
  startTimerBtn.style.display = "block";
  clearInterval(timerSeconds);
});

//function to connect =>
const sendHttpRequest = (method, url, data) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");
    xhr.setRequestHeader("Content-type", "application/json");

    xhr.responseType = "json";

    xhr.onload = () => {
      resolve(xhr.response);
    };

    xhr.send(JSON.stringify(data));
  });
  return promise;
};

//function to set exercises =>

var exerciseQueueNo = 0;

function setExercisePriority() {
  
  // firebase


  var exerciseQueue = [
    highPriority,
    "other",
    avgPriority,
    "other",
    lowPriority,
    "other",
  ];

  var exerciseInQueue = exerciseQueue[exerciseQueueNo];
  var exercise;

  //assign value to exercise to exercise variable using exercise in queue
  if (exerciseInQueue == "arm") {
    //assign an arm exercise to exercise variable
  } else if (exerciseInQueue == "back") {
    //assign a back exercise to exercise variable
  } else if (exerciseInQueue == "eye") {
    //assign an eye exercise to exercise variable
    //firebase assign
    // firebase update wxw count
  } else {
    //assign an other exercise to exercise variable
  }

  pushNotif(exercise);

  if (exerciseQueueNo == 5) {
    exerciseQueueNo = 0;
  } else {
    exerciseQueueNo = exerciseQueueNo + 1;
  };
}

//function to push desktop notifications =>
function pushNotif(exercise) {
  let n = new Notification("REMINDER", {
    body: exercise,
    icon: "imglogo.png",
  }).show();

  //increment noOfExercises in DB

  console.log("XYZ");
}
