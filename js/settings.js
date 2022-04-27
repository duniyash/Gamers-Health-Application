// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, updateEmail, updatePassword, sendPasswordResetEmail, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
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

function getProfileData()
{

    // console.log("userUid", getAuth().currentUser);
    var userUid = (getAuth().currentUser).uid;
    // alert(userUid);

    get(child(dref, 'users/' + userUid))
    .then((snapshot)=>{
        if(snapshot.exists()){
            
            var usernameDB = snapshot.val().username;
            var emailDB = snapshot.val().email;
            var passwordDB = snapshot.val().password;
            var genderDB = snapshot.val().gender;
            var distDB = snapshot.val().keyboardRotation;
            var rotaDB = snapshot.val().distanceMonitor;
            var painDB = snapshot.val().backPain;

            document.getElementById("displayName").innerHTML = usernameDB;
            document.getElementById("gendarName").innerHTML = genderDB;
            document.getElementById("diplayEmail").innerHTML = emailDB;
            document.getElementById("displayPassword").innerHTML = passwordDB;
            document.getElementById("backPainSpan").innerHTML = painDB;
            document.getElementById("kayboardSpan").innerHTML = distDB;
            document.getElementById("distanceSpan").innerHTML = rotaDB;

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
            // window.alert(errorCode);
            // window.alert(errorMessage);
    });
}

setTimeout(getProfileData, 1000);


// Update Name in settings
$("#saveNameBtn").click(function()
{
    var newName = document.getElementById('newName').value; 

    if(newName !="")
    {
        var userUid = (getAuth().currentUser).uid;
        update(ref(database, 'users/' + userUid),{
            username: newName,
        })
        .then(()=>{
            showErrorMessage("Data updated successfully.");
            location.reload();
        })
        .catch((error)=>{
            showErrorMessage(error);
        });
    }
    else
    {
        var errorMessage = ("Please enter your New Name");
        showErrorMessage(errorMessage)
    }
});

// Update Gender in settings
$("#saveGenderBtn").click(function()
{
    var newGendar = document.getElementById('newGendar').value; 

    if(newGendar !="")
    {
        var userUid = (getAuth().currentUser).uid;
        update(ref(database, 'users/' + userUid),{
            gender: newGendar,
        })
        .then(()=>{
            showErrorMessage("Data updated successfully.");
            location.reload();
        })
        .catch((error)=>{
            showErrorMessage(error);
        });
    }
    else
    {
        var errorMessage = ("Please enter your Gender");
        showErrorMessage(errorMessage)
    }
});

// Update Back Pain in settings
$("#backPainSaveBtn").click(function()
{
    var backPainSelect = document.getElementById('backPainSelect').value; 

    if(backPainSelect !="")
    {
        var userUid = (getAuth().currentUser).uid;
        update(ref(database, 'users/' + userUid),{
            backPain: backPainSelect,
        })
        .then(()=>{
            showErrorMessage("Data updated successfully.");
            location.reload();
        })
        .catch((error)=>{
            showErrorMessage(error);
        });
    }
    else
    {
        var errorMessage = ("Please enter your backPain");
        showErrorMessage(errorMessage)
    }
});

// Update kayboard in settings
$("#kayboardSaveBtn").click(function()
{
    var kayboardSelect = document.getElementById('kayboardSelect').value; 

    if(kayboardSelect !="")
    {
        var userUid = (getAuth().currentUser).uid;
        update(ref(database, 'users/' + userUid),{
            keyboardRotation: kayboardSelect,
        })
        .then(()=>{
            showErrorMessage("Data updated successfully.");
            location.reload();
        })
        .catch((error)=>{
            showErrorMessage(error);
        });
    }
    else
    {
        var errorMessage = ("Please enter your kayboard");
        showErrorMessage(errorMessage)
    }
});

// Update Distance in settings
$("#distanceSaveBtn").click(function()
{
    var distanceSelect = document.getElementById('distanceSelect').value; 

    if(distanceSelect !="")
    {
        var userUid = (getAuth().currentUser).uid;
        update(ref(database, 'users/' + userUid),{
            distanceMonitor: distanceSelect,
        })
        .then(()=>{
            showErrorMessage("Data updated successfully.");
            location.reload();
        })
        .catch((error)=>{
            showErrorMessage(error);
        });
    }
    else
    {
        var errorMessage = ("Please enter your distance");
        showErrorMessage(errorMessage)
    }
});

// Update Email in settings
$("#emailSaveBtn").click(function()
{
    var newEmail = document.getElementById('newEmail').value; 

    if(newEmail !="")
    {
        updateEmail(auth.currentUser, newEmail)
        .then(() => {
            
            // Email updated!
            var userUid = (getAuth().currentUser).uid;
            update(ref(database, 'users/' + userUid),{
                email: newEmail,
            })
            .then(()=>{
                
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

                });

            })
            .catch((error)=>{
                alert(error);
            });

          }).catch((error) => {
            // An error occurred
            showErrorMessage(error);
          });
    }
    else
    {
        var errorMessage = ("Please enter your New Email");
        showErrorMessage(errorMessage)
    }
});

// Update Password in settings
$("#PasswordSaveBtn").click(function()
{
    var newPassword = document.getElementById('newPassword').value; 

    if(newPassword !="")
    {
        var user = getAuth().currentUser;
        updatePassword(user, newPassword)
        .then(() => {
            
            // Update successful.
            var userUid = (getAuth().currentUser).uid;
            update(ref(database, 'users/' + userUid),{
                password: newPassword,
            })
            .then(()=>{
                showErrorMessage("Data updated successfully.");
                location.reload();
            })
            .catch((error)=>{
                alert(error);
            });

          }).catch((error) => {
            // An error occurred
            showErrorMessage(error);
          });
    }
    else
    {
        var errorMessage = ("Please enter New Password");
        showErrorMessage(errorMessage)
    }
});







// Delete user account
function DeleteData(){

    window.alert("Deleting!!!!!!!!!");
    var userUid = (getAuth().currentUser).uid;
    alert(userUid);

    deleteUser(getAuth().currentUser).then(() => {
        // User deleted.

        // // Delete user in settings
        // function DeleteData(userUid){
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
        alert(error);
    });

}


//error code function 
var errorMessageSpan = document.getElementById('errorMessageShow');
var loginCont = document.getElementById('loginContainer');
function showErrorMessage(p) {
    errorMessageSpan.style.display = "none";
    errorMessageSpan.innerHTML ="*" + p;
    errorMessageSpan.style.display = "block";
    // loginCont.style.padding = "24px";
}