// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getDatabase, get, ref, child, update } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

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
const database = getDatabase(app);
const dref = ref(database);

const startTimerBtn = document.querySelector("#startButton");
const stopTimerBtn = document.querySelector("#stopButton");
const modal = document.querySelector("#modal");
let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let canvas = document.querySelector("#canvas");
var minute = document.querySelector("#minute");
var second = document.querySelector("#second");

var stream;

var armExe = 0;
var backExe = 0;
var eyeExe = 0;
var otherExe = 0;
var sec;
var min;
var timerSeconds;
var postureOutput;

function getDashboardData(){

  var userUid = (getAuth().currentUser).uid;
  get(child(dref, 'valorant/' + userUid))
  .then((snapshot)=>{
      if(snapshot.exists()){

          // References
          var totalHoursPlayedValorant = snapshot.val().totalHoursPlayedValorant;
          var todayhoursPlayedValorant = snapshot.val().todayhoursPlayedValorant;
          
          var userUid = (getAuth().currentUser).uid;
          get(child(dref, 'apex/' + userUid))
          .then((snapshot)=>{
              if(snapshot.exists()){
                  
                  // References
                  var totalHoursPlayedApex = snapshot.val().totalHoursPlayedApex;
                  var todayhoursPlayedApex = snapshot.val().todayhoursPlayedApex;
      
                  document.getElementById("blockHeadOne").innerHTML = totalHoursPlayedValorant + totalHoursPlayedApex;
                  document.getElementById("blockHeadTwo").innerHTML = todayhoursPlayedValorant + todayhoursPlayedApex;
      
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
  video.style.display = "none";
  canvas.style.display = "none";
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
  video.style.display = "block";
  canvas.style.display = "block";
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

      if (sec == 5) {
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
  get(child(dref, 'apex/' + userUid))
  .then((snapshot)=>{
      if(snapshot.exists()){

          var todayDate = new Date().getDay()

          if (todayDate == 0) {
            var thisTimePlayed = parseInt(min);
            
          } else if (todayDate == 1) {
            var thisTimePlayed = parseInt(min);
            
          } else if (todayDate == 2) {
            var thisTimePlayed = parseInt(min);
            
          } else if (todayDate == 3) {
            var thisTimePlayed = parseInt(min);
            
          } else if (todayDate == 4) {
            var thisTimePlayed = parseInt(min);
            
          } else if (todayDate == 5) {
            var thisTimePlayed = parseInt(min);
            
          } else if (todayDate == 6) {
            var thisTimePlayed = parseInt(min);
            
          }

          // References
          var totalTimePlayed = snapshot.val().totalHoursPlayedApex;
          var todayTimePlayed = snapshot.val().todayhoursPlayedApex;
          var mondayhours = snapshot.val().mondayhoursPlayedApex;
          var tuesdayhours = snapshot.val().tuesdayhoursPlayedApex;
          var wednesdayhours = snapshot.val().wednesdayhoursPlayedApex;
          var thursdayhours = snapshot.val().thursdayhoursPlayedApex;
          var fridayhours = snapshot.val().fridayhoursPlayedApex;
          var saturdayhours = snapshot.val().saturdayhoursPlayedApex;
          var sundayhours = snapshot.val().sundayhoursPlayedApex;

          if(min != 0) {
            todayTimePlayed += thisTimePlayed; 

            if(thisTimePlayed != 0){
              totalTimePlayed += thisTimePlayed;
            }
          }

          var todayDate = new Date().getDay()

          if (todayDate == 0) {
            var thisTimePlayed = parseInt(min);
            if(thisTimePlayed != 0) {
              sundayhours += thisTimePlayed;
            }
            
          } else if (todayDate == 1) {
            var thisTimePlayed = parseInt(min);
            if(thisTimePlayed != 0) {
              mondayhours += thisTimePlayed;
            }
            
          } else if (todayDate == 2) {
            var thisTimePlayed = parseInt(min);
            if(thisTimePlayed != 0) {
              tuesdayhours += thisTimePlayed;
            }
            
          } else if (todayDate == 3) {
            var thisTimePlayed = parseInt(min);
            if(thisTimePlayed != 0) {
              wednesdayhours += thisTimePlayed;
            }
            
          } else if (todayDate == 4) {
            var thisTimePlayed = parseInt(min);
            if(thisTimePlayed != 0) {
              thursdayhours += thisTimePlayed;
            }
            
          } else if (todayDate == 5) {
            var thisTimePlayed = parseInt(min);
            if(thisTimePlayed != 0) {
              fridayhours += thisTimePlayed;
            }
            
          } else if (todayDate == 6) {
            var thisTimePlayed = parseInt(min);
            if(thisTimePlayed != 0) {
              saturdayhours += thisTimePlayed;
            }
            
          }

          // send time played to firebase here
          var userUid = (getAuth().currentUser).uid;
          update(ref(database, 'apex/' + userUid),{
            totalHoursPlayedApex: totalTimePlayed,
            todayhoursPlayedApex: todayTimePlayed,
            mondayhoursPlayedApex: mondayhours,
            tuesdayhoursPlayedApex: tuesdayhours,
            wednesdayhoursPlayedApex: wednesdayhours,
            thursdayhoursPlayedApex: thursdayhours,
            fridayhoursPlayedApex: fridayhours,
            saturdayhoursPlayedApex: saturdayhours,
            sundayhoursPlayedApex: sundayhours
          })
          .then(()=>{
              console.log("time played updated successfully.");
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

//function to set exercises
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
  
            if (exerciseQueueNo == 5) {
              exerciseQueueNo = 0;
            }
            var exerciseInQueue = exerciseQueue[exerciseQueueNo];
            exerciseQueueNo = exerciseQueueNo + 1;
            
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
            })
            .catch((error)=>{
                console.log(error);
            });
  
            pushNotif(exercise);
            console.log("Notification"+ exercise);
  
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

    console.log("XYZ");
  }
  