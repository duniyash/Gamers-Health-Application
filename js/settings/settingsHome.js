function editNameBtn() {
  // input field apears with button
 
  
  const inputName = document.querySelector('#nameField');
  const inputGender = document.querySelector('#genderField');
  const savebtn = document.querySelector('#editDiv')
  
  inputName.innerHTML='<input type="text"> ';
  inputGender.innerHTML='<input type="text">';
  savebtn.innerHTML='<button class="btn" >Save</button>';

  


 
   
}

function editEmailBtn() {
  // input field apears with button
 
  
  const inputEmail= document.querySelector('#emailField');

  const savebtn = document.querySelector('#editBtnEmail')
  
  inputEmail.innerHTML='<input type="text"> ';
 
  savebtn.innerHTML='<button  class="btn" id="emailSaveBtn">Save Email</button>';

   
}

function editPasswordBtn() {
  // input field apears with button
 
  
  const inputEmail= document.querySelector('#passwordField');

  const savebtn = document.querySelector('#editBtnPassword')
  
  inputEmail.innerHTML='<input type="text"> ';
 
  savebtn.innerHTML='<button  class="btn" id="PasswordSaveBtn">Save Password</button>';

   
}



function onSave(id1,id2){
  const e1 =document.querySelector('#emailSaveBtn');
  e1.innerHTML='<span name="name" id="nameField">Tharuka Hirushan</span>';
}

function load(){
  document.getElementById('basicSaveBtn').style.display = "none";
  document.getElementById('editDiv').style.display = "none";
}