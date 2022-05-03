// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, sendPasswordResetEmail, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

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

//modal for forgor password confirmation email
var FPconfirmation = document.getElementById('FPconfirmation');

// KeepLoggedIn function
function login(user){
    let KeepLoggedIn = document.getElementById('customSwitch1').checked;

    if(!KeepLoggedIn){
        sessionStorage.setItem('user', JSON.stringify(user));
        window.location="dashboard.html";
    }
    else
    {
        localStorage.setItem('keepLoggedIn', 'yes');
        localStorage.setItem('user', JSON.stringify(user));
        window.location="dashboard.html";
    }
}

// Create a New User
$("#btnsignup").click(function()
{
    var name = document.getElementById('name').value;  
    var email = document.getElementById('email').value;  
    var password = document.getElementById('password').value;
    var cPassword = document.getElementById('confirmPassword').value;
    var gender = document.getElementById('gender').value;
    var keyboardRotation = document.getElementById('keyboardRotation').value;
    var distanceMonitor = document.getElementById('distanceMonitor').value;
    var backPain = document.getElementById('backPain').value;

    if(name != "" && email != "" && password != "" && cPassword != "" && gender != "" && keyboardRotation != "" && distanceMonitor != "" && backPain != "")
    {
        if(password == cPassword) 
        {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                
                // Store User details to db user branch
                set(ref(database, 'users/' + user.uid), {
                    username: name,
                    email: email,
                    password: password,
                    gender: gender,
                    keyboardRotation: keyboardRotation,
                    distanceMonitor: distanceMonitor,
                    backPain: backPain,
                    image: "https://firebasestorage.googleapis.com/v0/b/physico-64e55.appspot.com/o/noprofil.jpg?alt=media&token=fbb6ac98-d892-43a9-ab1d-a393dc8620bc"
                })
                .then(() => {
                    // Data saved successfully!
                    console.log('New user data created successfully!');
                })
                .catch((error) => {
                    // The write failed...
                    console.log(error);
                });

                // Store exercises data to db exercises branch
                set(ref(database, 'exercises/' + user.uid), {
                    lowPriority: "",
                    avgPriority: "",
                    highPriority: "",
                    totalExercises: 0,
                    totalEye: 0,
                    totalArm: 0,
                    totalBack: 0,
                    totalOther: 0
                })
                .then(() => {
                    // Data saved successfully!
                    console.log('New exercises data created successfully!');
                })
                .catch((error) => {
                    // The write failed...
                    console.log(error);
                });

                // Store valorant data to db valorant branch
                set(ref(database, 'valorant/' + user.uid), {
                    totalHoursPlayedValorant: 0,
                    todayhoursPlayedValorant: 0,
                    mondayhoursPlayedValorant: 0,
                    tuesdayhoursPlayedValorant: 0,
                    wednesdayhoursPlayedValorant: 0,
                    thursdayhoursPlayedValorant: 0,
                    fridayhoursPlayedValorant: 0,
                    saturdayhoursPlayedValorant: 0,
                    sundayhoursPlayedValorant: 0,
                })
                .then(() => {
                    // Data saved successfully!
                    console.log('New valorant data created successfully!');
                })
                .catch((error) => {
                    // The write failed...
                    console.log(error);
                });

                // Store apex data to db valorant branch
                set(ref(database, 'apex/' + user.uid), {
                    totalHoursPlayedApex: 0,
                    todayhoursPlayedApex: 0,
                    mondayhoursPlayedApex: 0,
                    tuesdayhoursPlayedApex: 0,
                    wednesdayhoursPlayedApex: 0,
                    thursdayhoursPlayedApex: 0,
                    fridayhoursPlayedApex: 0,
                    saturdayhoursPlayedApex: 0,
                    sundayhoursPlayedApex: 0,
                })
                .then(() => {
                    // Data saved successfully!
                    console.log('New valorant data created successfully!');
                    assignPriority(keyboardRotation, distanceMonitor, backPain);
                    window.location.href = "dashboard.html";
                })
                .catch((error) => {
                    // The write failed...
                    console.log(error);
                });

                console.log('New user signup successfully!');  

            })
            .catch(function(error)
            {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                if (errorCode == "auth/weak-password") {
                    errorMessage = "Password Should Be At Least 6 Characters";
                } else if (errorCode == "auth/email-already-in-use") {
                    errorMessage = "This email is already in use";
                } else if (errorCode == "auth/invalid-email") {
                    errorMessage = "The entered emali incorrect";
                } else if (errorCode == "auth/network-request-failed") {
                    errorMessage = "No Internet. Check Your Connection";
                }
                showErrorMessage(errorMessage)
            });
        }
        else
        {
            var errorMessage = "Passwords do not match";
            showErrorMessage(errorMessage)
        }
    }
    else
    {
        var errorMessage = "fill all blanks";
        showErrorMessage(errorMessage)
    }

});


// User login
$("#btnlogin").click(function()
{
    var email = document.getElementById('email').value;  
    var password = document.getElementById('password').value;

    if(email != "" && password != "")
    {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User login successfully!');
            login(user);
        })
        .catch(function(error)
        {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            if (errorCode == "auth/user-not-found") {
                errorMessage = "This user is not found";
            } else if (errorCode == "auth/wrong-password") {
                errorMessage = "The entered password incorrect";
            }else if (errorCode == "auth/invalid-email") {
                errorMessage = "The entered emali incorrect";
            } else if (errorCode == "auth/network-request-failed") {
                errorMessage = "No Internet. Check Your Connection";
            }
            showErrorMessage(errorMessage);
        });
    }
    else
    {
        var errorMessage = "fill all blanks";
        showErrorMessage(errorMessage);
    }

});


// User logout
$("#btn-logout").click(function()
{
    signOut(auth)
    .then(() => {
        console.log('User logged out successfully!');

        onAuthStateChanged(auth, (user) => {
            if (!user) {
                sessionStorage.removeItem('user');
                localStorage.removeItem('user');
                localStorage.removeItem('keepLoggedIn');
                window.location.replace("login.html");
            }
        });  

    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
    });

});


// Reset password
$("#btnresetPassword").click(function()
{
    var email = document.getElementById('email').value;

    if (email != "") 
    {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            errorMessageSpan.style.display = "none";
            FPconfirmation.style.display = "block";
            setTimeout(main_page, 5000);
			function main_page() 
			{
				location.replace("login.html")
			}
            
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            if (errorCode == "auth/user-not-found") {
                errorMessage = "This user is not found";
            } else if (errorCode == "auth/invalid-email") {
                errorMessage = "The entered emali incorrect";
            } else if (errorCode == "auth/network-request-failed") {
                errorMessage = "No Internet. Check Your Connection";
            }
            showErrorMessage(errorMessage)
            
        });
    }
    else
    {
        var errorMessage = ("Please enter your email first");
        showErrorMessage(errorMessage)
    }

});

//error code function 
var errorMessageSpan = document.getElementById('errorMessageShow');
var loginCont = document.getElementById('loginContainer');
function showErrorMessage(p) {
    errorMessageSpan.style.display = "none";
    errorMessageSpan.innerHTML ="*" + p;
    errorMessageSpan.style.display = "block";
}


//priority assignment
var avgPriority;
var highPriority;
var lowPriority;

function assignPriority(keyboardRotation, distanceMonitor, backPain) {

    //eye strain
    if (distanceMonitor <= 30) {
        if(highPriority==null) {
            highPriority="eye";
        } else if (avgPriority==null) {
            avgPriority="eye";
        } else {
            lowPriority="eye";
        }
    } else if (distanceMonitor > 60) {
        if(lowPriority==null) {
            lowPriority="eye";
        } else if (avgPriority==null) {
            avgPriority="eye";
        } else {
            highPriority="eye";
        }
    } else {
        if(avgPriority==null) {
            avgPriority="eye";
        } else if (highPriority==null) {
            highPriority="eye";
        } else {
            lowPriority="eye";
        }
    }

    //arm strain
    if ( keyboardRotation >= 70){
        if(highPriority==null) {
            highPriority="arm";
        } else if (avgPriority==null) {
            avgPriority="arm";
        } else {
            lowPriority="arm";
        }
        
    } else if (keyboardRotation <= 40 ){
        if(lowPriority==null) {
            lowPriority="arm";
        } else if (avgPriority==null) {
            avgPriority="arm";
        } else {
            highPriority="arm";
        }

    } else {
        if(avgPriority==null) {
            avgPriority="arm";
        } else if (lowPriority==null) {
            lowPriority="arm";
        } else {
            highPriority="arm";
        }
    };

    //back pain
    if (backPain=="often"){
        if(highPriority==null) {
            highPriority="back";
        } else if (avgPriority==null) {
            avgPriority="back";
        } else {
            lowPriority="back";
        }

    } else if (backPain=="rarely" ){
        if(avgPriority==null) {
            avgPriority="back";
        } else if (lowPriority==null) {
            lowPriority="back";
        } else {
            highPriority="back";
        }

    } else {
        if(lowPriority==null) {
            lowPriority="back";
        } else if (avgPriority==null) {
            avgPriority="back";
        } else {
            highPriority="back";
        }
    }

    //update priority data with user inputs
    var userUid = (getAuth().currentUser).uid;
    update(ref(database, 'exercises/' + userUid),{
        highPriority: highPriority,
        avgPriority: avgPriority,
        lowPriority: lowPriority
    })
    .then(()=>{
        console.log("Priority Data updated Successfully!");
    })
    .catch((error)=>{
        console.log(error);
    });

};