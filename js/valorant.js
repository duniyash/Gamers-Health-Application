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
var totalHoursPlayed;
var todayhoursPlayed;
let today;
var mondayhours = 0;
var tuesdayhours = 0;
var wednesdayhours = 0;
var thursdayhours = 0;
var fridayhours = 0;
var saturdayhours = 0;
var sundayhours = 0;
var armExe = 0;
var backExe = 0;
var eyeExe = 0;
var otherExe = 0;
// var timer;
var timerSeconds;

let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let canvas = document.querySelector("#canvas");

var sec;
var min;

// var noOfExercises;
var postureOutput;

var minute = document.querySelector("#minute");
var second = document.querySelector("#second");

function getDashboardData()
{
  var userUid = (getAuth().currentUser).uid;
  get(child(dref, 'valorant/' + userUid))
    .then((snapshot)=>{
        if(snapshot.exists()){
            
            // References
            totalHoursPlayed = snapshot.val().totalHoursPlayedValorant;
            todayhoursPlayed = snapshot.val().todayhoursPlayedValorant;

            document.getElementById("blockHeadOne").innerHTML = totalHoursPlayed;
            document.getElementById("blockHeadTwo").innerHTML = todayhoursPlayed;

        }
        else
        {
            alert("No data found! ==> Line 69");
        }
    })
    .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
    });  

    get(child(dref, 'exercises/' + userUid))
    .then((snapshot)=>{
        if(snapshot.exists()){
            
            // References
            var totalExercises = snapshot.val().totalExercises;
            document.getElementById("blockHeadThree").innerHTML = totalExercises;

        }
        else
        {
            alert("No data found! ==> Line 93");
        }
    })
    .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
    });
}

setTimeout(getDashboardData, 1000);

//on-click event to start the flow and open the modal
$("#startButton").click(function()
{
  exerciseQueueNo = 0;
  click_button.style.display = "block";
  camera_button.style.display = "block";
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
    doPostureOutput(postureOutput);
  });

  //console.log(postureOutput);

  
  // data url of the image
  //console.log(image_data_url);

  //pushNotif();
});

function doPostureOutput(postureOutput) {
  if (postureOutput == "correct") {
    document.getElementById("resultGood").style.display = "none";
    document.getElementById("resultBad").style.display = "block";
    console.log(postureOutput)
  } else if (postureOutput == "incorrect") {
    document.getElementById("resultBad").style.display = "none";
    document.getElementById("resultGood").style.display = "block";
    click_button.style.display = "none";
    camera_button.style.display = "none";
    console.log(postureOutput)
  }
}

//on-click event to close the camera input stream and start the timer
$("#close-modal").click(function()
{
  if (postureOutput == "incorrect") {
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

      if (sec == 3) {
        sendExercise();
      }
    }, 1000);
  }

});

//on-click event to stop timer
$("#stopButton").click(function()
{
  clearInterval(timerSeconds);

  var userUid = (getAuth().currentUser).uid;
  get(child(dref, 'valorant/' + userUid))
  .then((snapshot)=>{
      if(snapshot.exists()){

          var todayDate = new Date().getDay()

          if (todayDate == 0) {
            today = "Sunday";
            thisTimePlayed = parseInt(min);
            sundayhours += thisTimePlayed;
          } else if (todayDate == 1) {
            today = "Monday";
            thisTimePlayed = parseInt(min);
            mondayhours += thisTimePlayed
          } else if (todayDate == 2) {
            today = "Tuesday";
            thisTimePlayed = parseInt(min);
            tuesdayhours += thisTimePlayed
          } else if (todayDate == 3) {
            today = "Wednesday";
            thisTimePlayed = parseInt(min);
            wednesdayhours += thisTimePlayed
          } else if (todayDate == 4) {
            today = "Thursday";
            thisTimePlayed = parseInt(min);
            thursdayhours += thisTimePlayed
          } else if (todayDate == 5) {
            today = "Friday";
            thisTimePlayed = parseInt(min);
            fridayhours += thisTimePlayed
          } else if (todayDate == 6) {
            today = "Saturday";
            thisTimePlayed = parseInt(min);
            saturdayhours += thisTimePlayed
          }
        
          console.log(today);

          // References
          todayTimePlayed = snapshot.val().totalHoursPlayedValorant;
          totalTimePlayed = snapshot.val().todayhoursPlayedValorant;

          console.log(todayTimePlayed + " 291");
          console.log(totalTimePlayed + " 292");

          if(min != 0) {
            todayTimePlayed += min; 
            totalTimePlayed += todayTimePlayed; 
          }
          
          console.log(todayTimePlayed + " 299");
          console.log(totalTimePlayed + " 300");

          // //send time played to firebase here
          var userUid = (getAuth().currentUser).uid;
          update(ref(database, 'valorant/' + userUid),{
            totalHoursPlayedValorant: totalTimePlayed,
            todayhoursPlayedValorant: todayTimePlayed,
            mondayhoursPlayedValorant: mondayhours,
            tuesdayhoursPlayedValorant: tuesdayhours,
            wednesdayhoursPlayedValorant: wednesdayhours,
            thursdayhoursPlayedValorant: thursdayhours,
            fridayhoursPlayedValorant: fridayhours,
            saturdayhoursPlayedValorant: saturdayhours,
            sundayhoursPlayedValorant: sundayhours
          })
          .then(()=>{
              console.log("Data updated successfully.");
              // showErrorMessage("Data updated successfully.");
              // location.reload();
          })
          .catch((error)=>{
              console.log(error);
          });

      }
      else
      {
          alert("No data found! ==> Line 301");
      }
  })
  .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
  });

  stopTimerBtn.style.display = "none";
  startTimerBtn.style.display = "block";
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
var exerciseQueue = [];

function sendExercise() {
  
  // Read priority data
  var userUid = (getAuth().currentUser).uid;
  get(child(dref, 'exercises/' + userUid))
  .then((snapshot)=>{
      if(snapshot.exists()){
          // References
          var highPriority = snapshot.val().highPriority;
          var avgPriority = snapshot.val().avgPriority;
          var lowPriority = snapshot.val().lowPriority;
          var totExercises = snapshot.val().totalExercises;
          var totArm = snapshot.val().totalArm;
          var totBack = snapshot.val().totalBack;
          var totEye = snapshot.val().totalEye;
          var totOther = snapshot.val().totalOther;

          console.log(highPriority);
          console.log(avgPriority);
          console.log(lowPriority);

          exerciseQueue = [ highPriority, "other", avgPriority, "other", lowPriority, "other" ];

          var exerciseInQueue = exerciseQueue[exerciseQueueNo];
          var exercise;

          //assign value to exercise to exercise variable using exercise in queue
          if (exerciseInQueue == "arm") {
            //assign an arm exercise to exercise variable
            exercise = "Open & close hands 10 times.";
            armExe++ ;
          } else if (exerciseInQueue == "back") {
            //assign a back exercise to exercise variable
            exercise = "Stand up, bend over & stretch your back to try touching your toes. Lie on your stomach on the floor with the forearms touching the ground and hold a plank for 20 seconds.";
            backExe++ ;
          } else if (exerciseInQueue == "eye") {
            //assign an eye exercise to exercise variable
            exercise = "Blink eyes every 4 seconds for 20 seconds. Close eyes and roll them for 10 seconds. Focus on different items in your room.";
            eyeExe++ ;
          } else {
            //assign an other exercise to exercise variable
            exercise = "Drink water.";
            otherExe++ ;
          }

          var totalExercises = eyeExe + armExe + backExe + otherExe;

          totExercises += totalExercises;
          totArm += armExe;
          totBack += backExe;
          totEye += eyeExe;
          totOther += otherExe;

          totalExercises = 0;
          armExe = 0;
          backExe = 0;
          eyeExe = 0;
          otherExe = 0;

          //update exercises count data in DB
          var userUid = (getAuth().currentUser).uid;
          update(ref(database, 'exercises/' + userUid),{
              totalExercises: totExercises, 
              totalEye: totEye,
              totalArm: totArm,
              totalBack: totBack,
              totalOther: totOther
          })
          .then(()=>{
              console.log("Exercises count data updated successfully.");
              // showErrorMessage("Data updated successfully.");
              // location.reload();
          })
          .catch((error)=>{
              console.log(error);
          });

          // pushNotif(exercise);
          console.log("Notification"+ exercise);

          if (exerciseQueueNo == 5) {
            exerciseQueueNo = 0;
          } else {
            exerciseQueueNo = exerciseQueueNo + 1;
          };

      }
      else
      {
          alert("No data found!");
      }
  })
  .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
  }); 


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
