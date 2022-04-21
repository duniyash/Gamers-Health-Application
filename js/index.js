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
const user = auth.currentUser;


    // if (user !== null) 
    // {
    //     // The user object has basic properties such as display name, email, etc.
    //     // The user's ID, unique to the Firebase project. Do NOT use
    //     // this value to authenticate with your backend server, if
    //     // you have one. Use User.getToken() instead.
    //     const uid = user.uid;
    //     alert(user);
    //     alert(uid);

    //     // delbtn.addEventListener('click', DeleteData(user));

    //     // const displayName = user.displayName;
    //     // const email = user.email;
    //     // const photoURL = user.photoURL;
    //     // const emailVerified = user.emailVerified;

    // }else
    // {

    // }
	

//error 
//const errorMessage = document.getElementById("errorMessage");

// onAuthStateChanged(auth, (user) => {
//     if (!user) {
//         // No user is signed in.
//         // User is signed in, see docs for a list of available properties
//         // https://firebase.google.com/docs/reference/js/firebase.User
//         window.location.replace("login.html");
//     } else {
//         // User is signed in.
//         console.log("stay");
//     }
// });  


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

    if(name !="" && email != "" && password != "" && cPassword != "" && gender != "" && keyboardRotation != "" && distanceMonitor != "" && backPain != "")
    {
        if(password == cPassword) 
        {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ... user.uid
                
               // Store User details to db user branch
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
                    // call login function
                    // login(user);
                    // window.location.href = "dashboard.html";
                })
                .catch((error) => {
                    // The write failed...
                    console.log(error);
                });

                // Store User games to db games branch
                set(ref(database, 'games/' + user.uid), {
                    armtendencies: "null",
                    backtendencies: "null",
                    eyetendencies: "null",
                    othertendencies: "null",
                    playinghourstotal: "null",
                    playinghourstoday: "null",
                    noexercises: "null",
                    favgames: "null"
                })
                .then(() => {
                    // Data saved successfully!
                    console.log('New User Data Saved Successfully!');
                    // call login function
                    // login(user);
                    window.location.href = "dashboard.html";
                })
                .catch((error) => {
                    // The write failed...
                    console.log(error);
                });

                console.log('User Signup Successfully!');
                // alert('User Signup Successfully!');
                                            
            })
            .catch(function(error)
            {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
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
            // Signed in 
            const user = userCredential.user;
            // ... user.uid  

            // Show user profile
            if (user !== null) {
                // The user object has basic properties such as display name, email, etc.
                // The user's ID, unique to the Firebase project. Do NOT use
                // this value to authenticate with your backend server, if
                // you have one. Use User.getToken() instead.
                const uid = user.uid;   

                // console.log(user);
                // console.log(uid);
                // window.alert(user);
                // window.alert(uid);
                // SelectData(uid);

                get(child(dref, 'users/' + uid))
                .then((snapshot)=>{
                    if(snapshot.exists()){
                        
                        // References
                        var usernameboxlabel = document.getElementById("usernameboxlabel");
                        var emailboxlabel = document.getElementById("emailboxlabel");
                        var passwordboxlabel = document.getElementById("passwordboxlabel");
                        var genderboxlabel = document.getElementById("genderboxlabel");
                        var distboxlabel = document.getElementById("distboxlabel");
                        var rotaboxlabel = document.getElementById("rotaboxlabel");
                        var painboxlabel = document.getElementById("painboxlabel");

                        // // var instbtn = document.getElementById("instbtn");
                        // // var selbtn = document.getElementById("selbtn");
                        // // var updbtn = document.getElementById("updbtn");
                        // // var delbtn = document.getElementById("delbtn");
                        
                        // alert(snapshot.val());

                        usernameboxlabel = snapshot.val().username;
                        emailboxlabel = snapshot.val().email;
                        passwordboxlabel = snapshot.val().password;
                        genderboxlabel = snapshot.val().gender;
                        distboxlabel = snapshot.val().keyboardRotation;
                        rotaboxlabel = snapshot.val().distanceMonitor;
                        painboxlabel = snapshot.val().backPain;
                        
                        // alert(usernameboxlabel); 
                        // alert(emailboxlabel); 
                        // alert(passwordboxlabel); 
                        // alert(genderboxlabel); 
                        // alert(distboxlabel);
                        // alert(rotaboxlabel); 
                        // alert(painboxlabel);

                        // // usernamebox.value = snapshot.val().username;
                        // // emailbox.value = snapshot.val().email;
                        // // passwordbox.value = snapshot.val().password;
                        // // genderbox.value = snapshot.val().gender;
                        // // distbox.value = snapshot.val().keyboardRotation;
                        // // rotabox.value = snapshot.val().distanceMonitor;
                        // // painbox.value = snapshot.val().backPain;

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


            }else{
                alert("No user!");
            }

            console.log('User login successfully!');
            // alert('User login successfully!');
            // call login function
            login(user);
           
            // window.location.href = "dashboard.html";

        })
        .catch(function(error)
        {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
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
        // Sign-out successful.
        // ...
        console.log('User logged out successfully!');
        // alert('User logged out successfully!');

        onAuthStateChanged(auth, (user) => {
            if (!user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                sessionStorage.removeItem('user');
                localStorage.removeItem('user');
                localStorage.removeItem('keepLoggedIn');
                window.location.replace("login.html");
                // ...
            }
        });  

    })
    .catch((error) => {
        // An error happened.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        showErrorMessage(errorMessage)
    });

});

//modal for forgor password confirmation email
var FPconfirmation = document.getElementById('FPconfirmation');

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
            //window.alert("Password reset email sent!");
            errorMessageSpan.style.display = "none";
            FPconfirmation.style.display = "block";
            setTimeout(main_page, 5000);
			function main_page() 
			{
				location.replace("login.html")
                // window.location.href = "login.html";
			}
            
            

        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            showErrorMessage(errorCode)
            
        });
    }
    else
    {
        var errorMessage = ("Please enter your email first");
        showErrorMessage(errorMessage)
    }

});

// Delete user account
function DeleteData(user){
    window.alert("Deleting!!!!!!!!!");

    deleteUser(user).then(() => {
        // User deleted.

        // // Delete user in settings
        // function DeleteData(){
        //     remove(ref(database, 'users/' + user.uid))
        //     .then(()=>{
        //         alert("Data removed successfully.");
        //     })
        //     .catch((error)=>{
        //         alert(error);
        //     });
        // }

        window.alert("User deleted.");
    }).catch((error) => {
        // An error ocurred
        // ...
    });

}


// References
var usernamebox = document.getElementById("usernamebox");
var emailbox = document.getElementById("emailbox");
var passwordbox = document.getElementById("passwordbox");
var genderbox = document.getElementById("genderbox");
var distbox = document.getElementById("distbox");
var rotabox = document.getElementById("rotabox");
var painbox = document.getElementById("painbox");

// var instbtn = document.getElementById("instbtn");
var selbtn = document.getElementById("selbtn");
var updbtn = document.getElementById("updbtn");
var delbtn = document.getElementById("delbtn");

// Userdetails in settings
// function SelectData(uid){
//     console.log(uid);
//     alert("SelectData uid 312");
//     alert(uid);

//     // get(child(dref, 'users/' + uid))
//     // .then((snapshot)=>{
//     //     alert("wada na utto 286");
//     //     if(snapshot.exists()){
//     //         alert("wada na utto 287");
//     //         usernamebox.value = snapshot.val().username;
//     //         emailbox.value = snapshot.val().email;
//     //         passwordbox.value = snapshot.val().password;
//     //         genderbox.value = snapshot.val().gender;
//     //         distbox.value = snapshot.val().keyboardRotation;
//     //         rotabox.value = snapshot.val().distanceMonitor;
//     //         painbox.value = snapshot.val().backPain;
//     //     }
//     //     else
//     //     {
//     //         alert("No data found!");
//     //     }
//     // })
//     // .catch((error) => {
//     //         const errorCode = error.code;
//     //         const errorMessage = error.message;
//     //         console.log(errorCode);
//     //         console.log(errorMessage);
//     //         window.alert(errorCode);
//     //         window.alert(errorMessage);
//     // });
// }


// Update data in settings
function UpdateData(){
    update(ref(database, 'users/' + "1m3HoXd0tNMhCBDg0GyYIfS61zs1"),{
        username: usernamebox.value,
        // email: emailbox.value,
        // password: passwordbox.value,
        // gender: genderbox.value,
        // keyboardRotation: distbox.value,
        // distanceMonitor: rotabox.value,
        // backPain: painbox.value
    })
    .then(()=>{
        alert("Data updated successfully.");
    })
    .catch((error)=>{
        alert(error);
    });
}


// Delete user in settings
// function DeleteData(){
//     remove(ref(database, 'users/' + "1m3HoXd0tNMhCBDg0GyYIfS61zs1"))
//     .then(()=>{
//         alert("Data removed successfully.");
//     })
//     .catch((error)=>{
//         alert(error);
//     });
// }


//error code function 
var errorMessageSpan = document.getElementById('errorMessageShow');
var loginCont = document.getElementById('loginContainer');
function showErrorMessage(p) {
    errorMessageSpan.style.display = "none";
    errorMessageSpan.innerHTML ="*" + p;
    errorMessageSpan.style.display = "block";
    // loginCont.style.padding = "24px";
}

// updbtn.addEventListener('click', UpdateData);
// delbtn.addEventListener('click', DeleteData);