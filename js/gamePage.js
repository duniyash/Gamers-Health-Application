// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, sendPasswordResetEmail, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
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

$("#selbtn").click(function()
{

    // console.log("userUid", getAuth().currentUser);
    var userUid = (getAuth().currentUser).uid;
    alert(userUid);


    get(child(dref, 'users/' + userUid))
    .then((snapshot)=>{
        if(snapshot.exists()){
            
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
            window.alert(errorCode);
            window.alert(errorMessage);
    });
});


const startTimerBtn = document.querySelector('#startButton');
const closeModalBtn = document.querySelector('#close-modal')
const modal = document.querySelector('#modal');

var stream;
var timer;
var timerSeconds;

const minute = document.querySelector('#minute');
const second = document.querySelector('#second');


startTimerBtn.addEventListener('click', () => {
	clearInterval(timerSeconds);
	second.innerHTML = "00";
	minute.innerHTML = "00";
    modal.showModal();
})

closeModalBtn.addEventListener('click', () => {
    stream.getTracks().forEach(track => track.stop())
    modal.close();

	var sec = 0;
	var min = 0;

	timerSeconds = setInterval(() => {
		if ( sec < 10 ) {
			second.innerHTML = "0"+sec;
		}
		else {
			second.innerHTML = sec;
		}
		sec++;

		if ( sec == 61) {
			sec = 0;
			second.innerHTML = "0"+sec;
			min++;
			if ( min < 10 ) {
				minute.innerHTML = "0"+min;
			}
			else {
				minute.innerHTML = min;
			}
		}

		if ( min == 20 ) {
			pushNotif();
		}

		}, 1000);

})

let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let canvas = document.querySelector("#canvas");

camera_button.addEventListener('click', async function() {
   	stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
	video.srcObject = stream;
});

click_button.addEventListener('click', function() {
   	canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
   	let image_data_url = canvas.toDataURL('image/jpeg');

	pushNotif();
   	// data url of the image
   	console.log(image_data_url);
});

function pushNotif(){
	var exercise = "ASBVASD";

	let n = new Notification ( 'REMINDER', {
		'body': exercise,
		'icon': 'img\logo.png'
	}).show();
	console.log("XYZ");
}

