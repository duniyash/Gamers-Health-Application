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

$("#selbtn").click(function () {
  // console.log("userUid", getAuth().currentUser);
  var userUid = getAuth().currentUser.uid;
  alert(userUid);

  get(child(dref, "users/" + userUid))
    .then((snapshot) => {
      if (snapshot.exists()) {
        // References
        // var usernamebox = document.getElementById("usernamebox");
        // var emailboxlabel = document.getElementById("emailboxlabel");
        // var passwordboxlabel = document.getElementById("passwordboxlabel");
        // var genderboxlabel = document.getElementById("genderboxlabel");
        // var distboxlabel = document.getElementById("distboxlabel");
        // var rotaboxlabel = document.getElementById("rotaboxlabel");
        // var painboxlabel = document.getElementById("painboxlabel");

        // var instbtn = document.getElementById("instbtn");
        // var selbtn = document.getElementById("selbtn");
        // var updbtn = document.getElementById("updbtn");
        // var delbtn = document.getElementById("delbtn");

        alert("wada na line 454");

        // alert(snapshot.val());

        var usernameDB = snapshot.val().username;
        var emailDB = snapshot.val().email;
        var passwordDB = snapshot.val().password;
        var genderDB = snapshot.val().gender;
        var distDB = snapshot.val().keyboardRotation;
        var rotaDB = snapshot.val().distanceMonitor;
        var painDB = snapshot.val().backPain;

        // usernamebox.innerHTML="Name: "+usernameboxlabel;

        alert(usernameDB);
        alert(emailDB);
        alert(passwordDB);
        alert(genderDB);
        alert(distDB);
        alert(rotaDB);
        alert(painDB);

        // usernamebox.value = snapshot.val().username;
        // emailbox.value = snapshot.val().email;
        // passwordbox.value = snapshot.val().password;
        // genderbox.value = snapshot.val().gender;
        // distbox.value = snapshot.val().keyboardRotation;
        // rotabox.value = snapshot.val().distanceMonitor;
        // painbox.value = snapshot.val().backPain;
      } else {
        alert("No data found!");
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      window.alert(errorCode);
      window.alert(errorMessage);
    });
});

const startTimerBtn = document.querySelector("#startButton");
const closeModalBtn = document.querySelector("#close-modal");
const modal = document.querySelector("#modal");

var stream;
var timer;
var timerSeconds;

let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let canvas = document.querySelector("#canvas");

var sec = 0;
var min = 0;

var noOfExercises;
var postureOutput;

var minute = document.querySelector("#minute");
var second = document.querySelector("#second");

var checkArm;
var checkEye;
var checkBack;
var checkOther;

//on-click event to start the flow and open the modal
startTimerBtn.addEventListener("click", () => {
  clearInterval(timerSeconds);
  second.innerHTML = "00";
  minute.innerHTML = "00";
  modal.showModal();
});

//on-click event to start camera input stream
camera_button.addEventListener("click", async function () {
  stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
  video.srcObject = stream;
});

//on-click event to capture image
click_button.addEventListener("click", function () {
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
closeModalBtn.addEventListener("click", () => {
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
stopTimerBtn.addEventListener("click", () => {
  var timePlayed = min + sec / 60;

  //send time played to firebase here

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

var exerciseQueueNo;

function setExercisePriority(highPriority, avgPriority, lowPriority) {
  exerciseQueue = [
    highPriority,
    "other",
    avgPriority,
    "other",
    avgPriority,
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
