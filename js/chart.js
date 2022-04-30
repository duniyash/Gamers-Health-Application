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


function getDashboardData(){

    // console.log("userUid", getAuth().currentUser);
    var userUid = (getAuth().currentUser).uid;
    // alert(userUid);

    get(child(dref, 'users/' + userUid))
    .then((snapshot)=>{
        if(snapshot.exists()){
            // References
            var usernameDB = snapshot.val().username;
            var welcomeMsg = "Welcome, " + usernameDB;
            document.getElementById("welcomeMsg").innerHTML = welcomeMsg;
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

    get(child(dref, 'valorant/' + userUid))
    .then((snapshot)=>{
        if(snapshot.exists()){
            
            // alert("wada na line 454");
            // alert(snapshot.val());

            // References
            var totalHoursPlayed = snapshot.val().totalHoursPlayedValorant;
            var todayhoursPlayed = snapshot.val().todayhoursPlayedValorant;
            // var exercisesCompleted = snapshot.val().exercisesCompleted;

            document.getElementById("blockHeadOne").innerHTML = totalHoursPlayed;
            document.getElementById("blockHeadTwo").innerHTML = todayhoursPlayed;
            document.getElementById("blockHeadThree").innerHTML = "0";

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


function getplayerWeekData(){

    // console.log("userUid", getAuth().currentUser);
    var userUid = (getAuth().currentUser).uid;
    // alert(userUid);

    // chart1 DB
    get(child(dref, 'plyerWeek/' + userUid))
    .then((snapshot)=>{
        if(snapshot.exists()){
            
            // alert(snapshot.val());

            // References
            var mondayDB = snapshot.val().monday;
            var tuesdayDB = snapshot.val().tuesday;
            var wednesdayDB = snapshot.val().wednesday;
            var thursdayDB = snapshot.val().thursday;
            var fridayDB = snapshot.val().friday;
            var saturdayDB = snapshot.val().saturday;
            var sundayDB = snapshot.val().sunday;
            
            var test = [mondayDB, tuesdayDB, wednesdayDB, thursdayDB, fridayDB, saturdayDB, sundayDB];

            // Chart 01

            var ctx = document.getElementById('lineChart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Game Play in Minutes per day',
                        data: test,
                        backgroundColor: [
                            '#132119'

                        ],
                        borderColor: '#389b29',

                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio :false
                }
            });

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


function getgamesChartData(){

    // console.log("userUid", getAuth().currentUser);
    var userUid = (getAuth().currentUser).uid;
    // alert(userUid);

    // chart2 DB
    get(child(dref, 'gamesChart/' + userUid))
    .then((snapshot)=>{
        if(snapshot.exists()){
            
            // alert("wada na line 454");
            // alert(snapshot.val());

            // References
            var apexDB = snapshot.val().apex;
            var fortniteDB = snapshot.val().fortnite;
            var valorantDB = snapshot.val().valorant;
            var genshinImpactDB = snapshot.val().genshinImpact;
            var eldenRingDB = snapshot.val().eldenRing;
            var leagueOfLegendsDB = snapshot.val().leagueOfLegends;

            var test = [valorantDB, apexDB, fortniteDB, genshinImpactDB, eldenRingDB, leagueOfLegendsDB];

            // Chart 03

            var ctx = document.getElementById('doughnut1').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Valorant', 'Apex', 'Fortnite', 'Genshin Impac', 'Elden Ring', 'League Of Legend'],

                    datasets: [{
                        label: 'games',
                        data: test,
                        backgroundColor: [
                            'rgba(133, 43, 16)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(133, 43, 16)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(120, 46, 139,1)'

                        ],
                        borderColor: [
                            'rgba(133, 43, 16)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(133, 43, 16)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(120, 46, 139,1)'

                        ],
                        borderWidth: 1
                    }]

                },
                options: {
                    responsive: true,
                    maintainAspectRatio :false
                }
            });

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


function exercisesChart(){

    // console.log("userUid", getAuth().currentUser);
    var userUid = (getAuth().currentUser).uid;
    // alert(userUid);

    // chart3 DB
    get(child(dref, 'exercisesChart/' + userUid))
    .then((snapshot)=>{
        if(snapshot.exists()){
            
            // alert("wada na line 454");
            // alert(snapshot.val());

            // References
            var totalArmDB = snapshot.val().totalArm;
            var totalBackDB = snapshot.val().totalBack;
            var totalEyeDB = snapshot.val().totalEye;
            var totalOtherDB = snapshot.val().totalOther;
            

            var test = [totalEyeDB, totalArmDB, totalBackDB, totalOtherDB];

            // Chart 02

            var ctx = document.getElementById('doughnut2').getContext('2d');

            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Eye', 'Arm', 'Back Posture', 'Other'],

                    datasets: [{
                        label: 'Employees',
                        data: test,
                        backgroundColor: [
                            'rgba(133, 43, 16)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(120, 46, 139,1)'

                        ],
                        borderColor: [
                            'rgba(133, 43, 16)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(120, 46, 139,1)'

                        ],
                        borderWidth: 1
                    }]

                },
                options: {
                    responsive: true,
                    maintainAspectRatio :false
                }
            });

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



setTimeout(getDashboardData, 1000);
setTimeout(getplayerWeekData, 1000);
setTimeout(getgamesChartData, 1000);
setTimeout(exercisesChart, 1000);
