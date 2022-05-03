// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, updateEmail, updatePassword, sendPasswordResetEmail, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, deleteUser } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getDatabase, set, get, ref, child, update, remove } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js";


const firebaseConfig = {
    apiKey: "AIzaSyBJhkQhDdkTbB-Uhhqiytfx6Fm5tVjb1Cs",
    authDomain: "physico-64e55.firebaseapp.com",
    databaseURL: "https://physico-64e55-default-rtdb.firebaseio.com",
    projectId: "physico-64e55",
    storageBucket: "physico-64e55.appspot.com",
    messagingSenderId: "919838418395",
    appId: "1:919838418395:web:4c3d8f7a3af1b0219ff3fe",
    measurementId: "G-P2KKMSZWSK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);
const storage = getStorage();
const dref = ref(database);

const startTimerBtn = document.querySelector("#startButton");
const stopTimerBtn = document.querySelector("#stopButton");
const closeModalBtn = document.querySelector("#close-modal");
const modal = document.querySelector("#modal");

let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let canvas = document.querySelector("#canvas");

var stream;
var timer;
var timerSeconds;

var sec = 0;
var min = 0;

var noOfExercises;

var postureOutput;

const minute = document.querySelector("#minute");
const second = document.querySelector("#second");


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
    url:image_data_url
  }).then((responseData) => {
    console.log(responseData);

    postureOutput = responseData.Prediction;

  });

  if (postureOutput == 'incorrect') {
    document.getElementById('resultGood').style.display='none';
    document.getElementById('resultBad').style.display='block';
  }

  else if (postureOutput == 'correct') {
    document.getElementById('resultBad').style.display='none';
    document.getElementById('resultGood').style.display='block';
    click_button.style.display = 'none';
    camera_button.style.display = 'none';
  }
  ;
  
  // data url of the image
  console.log(image_data_url);

  pushNotif();
});


//on-click event to close the camera input stream and start the timer
closeModalBtn.addEventListener("click", () => {
  if (postureOutput=='correct') {                                     // <= change incorrect to correct here
    stream.getTracks().forEach((track) => track.stop());

    startTimerBtn.style.display = 'none';
    stopTimerBtn.style.display = 'block';

    modal.close();
  
    document.getElementById('resultBad').style.display='none';
    document.getElementById('resultGood').style.display='none';

    sec=0;
    min=0;
  
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

  };
});

//on-click event to stop timer 

stopTimerBtn.addEventListener('click', () => {
  var timePlayed = min + (sec/60);

  //send time played to firebase here
  var userUid = (getAuth().currentUser).uid;
  update(ref(database, 'dashboard/' + userUid),{
    totalHoursPlayed: timePlayed,
  })
  .then(()=>{
      console.log("Data updated successfully.");
      // showErrorMessage("Data updated successfully.");
      // location.reload();
  })
  .catch((error)=>{
      console.log(error);
  });

  stopTimerBtn.style.display = 'none';
  startTimerBtn.style.display = 'block';
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


//function to push desktop notifications =>
function pushNotif(exercise) {
  let n = new Notification("REMINDER", {
    body: exercise,
    icon: "imglogo.png",
  }).show();

  //increment noOfExercises in DB

  console.log("XYZ");
}
