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

function getProfileData()
{

    // console.log("userUid", getAuth().currentUser);
    var userUid = (getAuth().currentUser).uid;
    // alert(userUid);


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

            // alert("wada na line 454");
            
            // alert(snapshot.val());

            var usernameDB = snapshot.val().username;
            var emailDB = snapshot.val().email;
            var passwordDB = snapshot.val().password;
            var genderDB = snapshot.val().gender;
            var distDB = snapshot.val().keyboardRotation;
            var rotaDB = snapshot.val().distanceMonitor;
            var painDB = snapshot.val().backPain;
            
            // usernamebox.innerHTML="Name: "+usernameboxlabel;

            document.getElementById("nameField").innerHTML = usernameDB;

            // alert(usernameDB); 
            // alert(emailDB); 
            // alert(passwordDB); 
            // alert(genderDB); 
            // alert(distDB);
            // alert(rotaDB); 
            // alert(painDB);

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
}

setTimeout(getProfileData, 1000);


// Update data in settings
function UpdateData(){

    var userUid = (getAuth().currentUser).uid;
    alert(userUid);

    update(ref(database, 'users/' + userUid),{
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