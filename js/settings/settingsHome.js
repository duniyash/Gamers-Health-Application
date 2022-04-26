//navgate to basic info
function displayBasic(){
  document.getElementById("basicInfo").style.display = "block";
  document.getElementById("emailInfo").style.display = "none";
  document.getElementById("gameInfo").style.display = "none";
  document.getElementById("saveNameBtn").style.display = "none";
  document.getElementById("deleteInfo").style.display="block";
  document.getElementById("avatarDiv").style.display = "block";
}

// navigate to Email Info
function displayEmail(){
  document.getElementById("emailInfo").style.display = "block";
  document.getElementById("basicInfo").style.display = "none";
  document.getElementById("gameInfo").style.display = "none";
  document.getElementById("deleteInfo").style.display="none";
  document.getElementById("avatarDiv").style.display = "none";
}

//navigate to Gameinfo
function displayGame(){
  document.getElementById("gameInfo").style.display = "block";
  document.getElementById("emailInfo").style.display = "none";
  document.getElementById("basicInfo").style.display = "none";
  document.getElementById("deleteInfo").style.display="none";
  document.getElementById("avatarDiv").style.display = "none";
}

function editNameBtn() {
  // input field apears with button
 
  

  document.getElementById("displayName").style.display = "none";
  document.getElementById("gendarName").style.display = "none";

  document.getElementById("nameField").style.display = "block";
  document.getElementById("genderField").style.display = "block";

  document.getElementById("saveNameBtn").style.display = "block";
  document.getElementById("basicInfoBtn").style.display = "none";
}

function editEmailBtn() {
  // input field apears with button
 
  const inputEmail= document.querySelector('#emailField');
  const savebtn = document.querySelector('#editBtnEmail');
  document.getElementById("diplayEmail").style.display = "none";  
  inputEmail.innerHTML='<input type="text"class="inputField"> ';
  savebtn.innerHTML='<button  class="btn" id="emailSaveBtn" onClick="onSave(\'email\')" >Save Email</button>';

}

function editPasswordBtn() {
  // input field apears with button
 
  
  const inputEmail= document.querySelector('#passwordField');

  const savebtn = document.querySelector('#editBtnPassword');

  document.getElementById("displayPassword").style.display = "none"; 
  
  inputEmail.innerHTML='<input type="password"class="inputField"> ';
  savebtn.innerHTML='<button  class="btn" id="PasswordSaveBtn"onClick="onSave(\'password\')">Save Password</button>';

}

function onSave(btn){
  if(btn == 'name'){
    
     //remove input field while 
    document.getElementById("displayName").style.display = "block";
    document.getElementById("displayNameLabel").style.display = "block";

    document.getElementById("gendarName").style.display = "block";
    document.getElementById("genderLabel").style.display = "block";

    document.getElementById("nameField").style.display = "none";
    document.getElementById("genderField").style.display = "none";
    document.getElementById("basicInfoBtn").style.display = "block";
    document.getElementById("saveNameBtn").style.display = "none";
   
  }

  else if(btn == 'email'){
  const saveBtn = document.querySelector('#editBtnEmail');
  saveBtn.innerHTML='<button class="btn" id="editEmail" onclick="editEmailBtn()">Edit Email</button>';
  //remove input field while 
  document.getElementById("diplayEmail").style.display = "block";
  var inputEmail= document.querySelector('#emailField');
  inputEmail.innerHTML= " ";

  }
 
  else if (btn =='password'){
    const saveBtn = document.querySelector('#editBtnPassword');
    saveBtn.innerHTML=' <button class="btn" id="editPassword" onclick="editPasswordBtn()">Reset password</button>';
    //remove input field while 
    document.getElementById("displayPassword").style.display = "block";
    var inputEmail= document.querySelector('#passwordField');
    inputEmail.innerHTML= " ";
  }
}

