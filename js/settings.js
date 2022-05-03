// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, updateEmail, updatePassword, onAuthStateChanged, signOut, deleteUser } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getDatabase, get, ref, child, update } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
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

    var userUid = (getAuth().currentUser).uid;
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
            var imageDB = snapshot.val().image;

            document.getElementById("displayName").innerHTML = usernameDB;
            document.getElementById("gendarName").innerHTML = genderDB;
            document.getElementById("diplayEmail").innerHTML = emailDB;
            document.getElementById("displayPassword").innerHTML = passwordDB;
            document.getElementById("backPainSpan").innerHTML = painDB;
            document.getElementById("kayboardSpan").innerHTML = distDB;
            document.getElementById("distanceSpan").innerHTML = rotaDB;
            myimg.src = imageDB
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

            var userUid = (getAuth().currentUser).uid;
            get(child(dref, 'exercises/' + userUid))
            .then((snapshot)=>{
                if(snapshot.exists()){
                    
                    // References
                    var keyboardRotation = snapshot.val().keyboardRotation;
                    var distanceMonitor = snapshot.val().distanceMonitor;
                    var backPain = snapshot.val().backPain;

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

                    assignPriority(keyboardRotation, distanceMonitor, backPain);

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
            
            var userUid = (getAuth().currentUser).uid;
            get(child(dref, 'exercises/' + userUid))
            .then((snapshot)=>{
                if(snapshot.exists()){
                    
                    // References
                    var keyboardRotation = snapshot.val().keyboardRotation;
                    var distanceMonitor = snapshot.val().distanceMonitor;
                    var backPain = snapshot.val().backPain;

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

                    assignPriority(keyboardRotation, distanceMonitor, backPain);

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
            
            var userUid = (getAuth().currentUser).uid;
            get(child(dref, 'exercises/' + userUid))
            .then((snapshot)=>{
                if(snapshot.exists()){
                    
                    // References
                    var keyboardRotation = snapshot.val().keyboardRotation;
                    var distanceMonitor = snapshot.val().distanceMonitor;
                    var backPain = snapshot.val().backPain;

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

                    assignPriority(keyboardRotation, distanceMonitor, backPain);

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

                    console.log('User logged out successfully!');

                    onAuthStateChanged(auth, (user) => {
                        if (!user) {
                            sessionStorage.removeItem('user');
                            localStorage.removeItem('user');
                            localStorage.removeItem('keepLoggedIn');
                            window.location.replace("login.html");
                        }
                    });  

                });

            })
            .catch((error)=>{
                alert(error);
            });

          }).catch((error) => {
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

var files = [];
var reader = new FileReader();
var input = document.createElement('input');
input.type = 'file';
var name = null;
var extention = null;

input.onchange = e => 
{
    files = e.target.files;

    extention = GetFileExt(files[0]);
    name = GetFileName(files[0]);    
    console.log(name);
    console.log(extention);
    
    if((extention !== ".jpg")){
        showErrorMessage('Only support jpg formats');
        return;
    }

    reader.readAsDataURL(files[0]);
}

reader.onload = function()
{
    myimg.src = reader.result;
    console.log(myimg);
}

// Image Select Button
$("#selectImg").click(function()
{
    input.click();
});

function GetFileExt(file)
{
    var temp = file.name.split('.');
    var ext = temp.slice((temp.length-1),temp.length);
    return '.' + ext[0];
}

function GetFileName(file)
{
    var temp = file.name.split('.');
    var fname = temp.slice(0,-1).join('.');
    return fname;
}

// Image Upload Button
$("#savePhotoBtn").click(function()
{

    var ImgToUpload = files[0];

    if(files.length == 0){
        showErrorMessage('Add a Image first.');
        return;
    }

    var ImgName = name + extention;

    if((extention !== ".jpg")){
        showErrorMessage('Only support jpg formats');
        return;
    }

    if(!ValidateName()){
        showErrorMessage('name can not contain ".", "#", "$", "[", or "]"');
        return;
    }

    const metaData ={
        contentType: ImgToUpload.type
    }

    const storageRef = sRef(storage, "Images/" +ImgName);

    const UploadTask = uploadBytesResumable(storageRef, ImgToUpload, metaData);

    UploadTask.on('sate-changed', (snapshot)=>{
        var progess = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        showErrorMessage("Uploading " + progess + "%");
    },
    (error) => {
        alert("error: image not uploaded!")
    },
    ()=>{
        getDownloadURL(UploadTask.snapshot.ref).then((DownloadURL)=>{
            SaveURLtoRealtimeDB(DownloadURL);
        });
    }
    );

    // functions for realtime database
    function SaveURLtoRealtimeDB(URL) {

        var userUid = (getAuth().currentUser).uid;
        update(ref(database, 'users/' + userUid),{
            image: URL,
        })
        .then(()=>{
            showErrorMessage("Data updated successfully.");
        })
        .catch((error)=>{
            alert(error);
        });

    }

    // can't contain ".", "#", "$", "[", or "]"
    function ValidateName ()
    {
        var regex = /[\.#$\[\]]/
        return !(regex.test(name));
    }

});


// Delete user account
$("#onDeleteYes").click(function()
{

    deleteUser(getAuth().currentUser).then(() => {
        
        // User deleted.
        sessionStorage.removeItem('user');
        localStorage.removeItem('user');
        localStorage.removeItem('keepLoggedIn');
        window.location.replace("login.html");

    }).catch((error) => 
    {
        // An error ocurred
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        if (errorCode == "auth/requires-recent-login") {
            errorMessage = "auth requires recent login";
        }
        showErrorMessage(errorMessage)
        
    });
    
});

//error code function 
var errorMessageSpan = document.getElementById('errorMessageShow');
var loginCont = document.getElementById('loginContainer');
function showErrorMessage(p) {
    errorMessageSpan.style.display = "none";
    errorMessageSpan.innerHTML ="*" + p;
    errorMessageSpan.style.display = "block";
    // loginCont.style.padding = "24px";
}


setTimeout(getProfileData, 1000);