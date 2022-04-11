// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, sendPasswordResetEmail, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getDatabase, set, ref, update, child, remove } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
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

const signupBtn = document.getElementById('#btnsignup');

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

    if(name !="" && email != "" && password != "" && cPassword != "" && gender != "" && keyboardRotation != "" && distanceMonitor != "" && backPain != "")
    {
        if(password == cPassword) 
        {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ... user.uid
                
                set(ref(database, 'users/' + user.uid), {
                    username: name,
                    email: email,
                    password: password,
                    gender: gender,
                    keyboardRotation: keyboardRotation,
                    distanceMonitor: distanceMonitor,
                    backPain: backPain
                })
                .then(() => {
                    // Data saved successfully!
                    console.log('New User Data Saved Successfully!');
                    window.location.href = "dashboard.html";
                })
                .catch((error) => {
                    // The write failed...
                    console.log(error);
                });

                console.log('User Signup Successfully!');
                alert('User Signup Successfully!');
                                            
            })
            .catch(function(error)
            {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                window.alert(errorCode);
            });
        }
        else
        {
            window.alert("Password does not match the confirme password.");
        }
    }
    else
    {
        window.alert("Please fill out all fields.");
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
            // Signed in 
            const user = userCredential.user;
            // ...
            console.log('User login successfully!');
            alert('User login successfully!');
            window.location.href = "dashboard.html";

        })
        .catch(function(error)
        {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            window.alert(errorCode);
        });
    }
    else
    {
        window.alert("Please fill out all fields.");
    }

});


// User logout
$("#btn-logout").click(function()
{
    signOut(auth)
    .then(() => {
        // Sign-out successful.
        // ...
        console.log('User logged out successfully!');
        alert('User logged out successfully!');

        onAuthStateChanged(auth, (user) => {
            if (!user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                window.location.href = "login.html";
                // ...
            }
        });  

    })
    .catch((error) => {
        // An error happened.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        alert(errorCode);
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
            // Password reset email sent!
            // ..
            window.alert("Password reset email sent!");

        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            alert(errorCode);
        });
    }
    else
    {
        window.alert("Please enter your email first!");
    }

});