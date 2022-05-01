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
            var welcomeMsg = "Welcome, " + (snapshot.val().username);
            document.getElementById("welcomeMsg").innerHTML = welcomeMsg;
        }
        else
        {
            alert("No data found! ==> Line 43");
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
            
            // alert("wada na line 454");
            // alert(snapshot.val());

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


function getplayerWeekData(){

    // console.log("userUid", getAuth().currentUser);
    var userUid = (getAuth().currentUser).uid;
    // alert(userUid);

    // chart1 DB
    get(child(dref, 'valorant/' + userUid))
    .then((snapshot)=>{
        if(snapshot.exists()){
            
            // alert(snapshot.val());

            // References
            var mondayDB = snapshot.val().mondayhoursPlayedValorant;
            var tuesdayDB = snapshot.val().tuesdayhoursPlayedValorant;
            var wednesdayDB = snapshot.val().wednesdayhoursPlayedValorant;
            var thursdayDB = snapshot.val().thursdayhoursPlayedValorant;
            var fridayDB = snapshot.val().fridayhoursPlayedValorant;
            var saturdayDB = snapshot.val().saturdayhoursPlayedValorant;
            var sundayDB = snapshot.val().sundayhoursPlayedValorant;
            
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
            alert("No data found! ==> Line 157");
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
    get(child(dref, 'valorant/' + userUid))
    .then((snapshot)=>{
        if(snapshot.exists()){
            
            // alert("wada na line 454");
            // alert(snapshot.val());

            // References
            var valorantDB = snapshot.val().totalHoursPlayedValorant;


            var test = [valorantDB, 0];

            // Chart 03

            var ctx = document.getElementById('doughnut1').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Valorant', 'Apex'],

                    datasets: [{
                        label: 'games',
                        data: test,
                        backgroundColor: [
                            'rgba(133, 43, 16)',
                            'rgba(54, 162, 235, 1)'
                        ],
                        borderColor: [
                            'rgba(133, 43, 16)',
                            'rgba(54, 162, 235, 1)'
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
            alert("No data found! ==> Line 231");
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
    get(child(dref, 'exercises/' + userUid))
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
            alert("No data found! ==> Line 306");
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
