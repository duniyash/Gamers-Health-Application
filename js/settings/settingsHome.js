//navgate to basic info
function displayBasic()
{
  document.getElementById("deleteAccount").style.display = "block";
  document.getElementById("basicInfo").style.display = "block";
  document.getElementById("deleteInfo").style.display="block";
  document.getElementById("avatarDiv").style.display = "block";
  document.getElementById("editNameBtn").style.display = "block";
  document.getElementById("editGenderBtn").style.display = "block";
  document.getElementById("displayName").style.display = "block";
  document.getElementById("gendarName").style.display = "block";
  document.getElementById("name").style.display = "none";
  document.getElementById("gendar").style.display = "none";
  document.getElementById("emailInfo").style.display = "none";
  document.getElementById("gameInfo").style.display = "none";
  document.getElementById("saveNameBtn").style.display = "none";
  document.getElementById("saveGenderBtn").style.display = "none";
  document.getElementById("onDeleteNo").style.display = "none";
  document.getElementById("onDeleteYes").style.display = "none";
}

// navigate to Email Info
function displayEmail()
{
  document.getElementById("emailInfo").style.display = "block";
  document.getElementById("diplayEmail").style.display = "block";
  document.getElementById("displayPassword").style.display = "block";
  document.getElementById("editEmailBtn").style.display = "block";
  document.getElementById("editPassword").style.display = "block";
  document.getElementById("saveNameBtn").style.display = "none";
  document.getElementById("emailSaveBtn").style.display = "none";
  document.getElementById("newPassword").style.display = "none";
  document.getElementById("PasswordSaveBtn").style.display = "none";
  document.getElementById("newEmail").style.display = "none";
  document.getElementById("basicInfo").style.display = "none";
  document.getElementById("gameInfo").style.display = "none";
  document.getElementById("deleteInfo").style.display="none";
  document.getElementById("avatarDiv").style.display = "none";
}

//navigate to Gameinfo
function displayGame()
{
  document.getElementById("gameInfo").style.display = "block";
  document.getElementById("emailInfo").style.display = "none";
  document.getElementById("basicInfo").style.display = "none";
  document.getElementById("deleteInfo").style.display="none";
  document.getElementById("avatarDiv").style.display = "none";

  document.getElementById("backPainSpan").style.display = "block";
  document.getElementById("backPainEditBtn").style.display = "block";
  document.getElementById("kayboardSpan").style.display = "block";
  document.getElementById("kayboardEditBtn").style.display = "block";
  document.getElementById("distanceSpan").style.display = "block";
  document.getElementById("distanceEditBtn").style.display = "block";

  document.getElementById("backPainSelect").style.display = "none";
  document.getElementById("kayboardSelect").style.display = "none";
  document.getElementById("distanceSelect").style.display = "none";

  document.getElementById("backPainSaveBtn").style.display = "none";
  document.getElementById("kayboardSaveBtn").style.display = "none";
  document.getElementById("distanceSaveBtn").style.display = "none";
}

function editNameBtn() 
{
  document.getElementById("displayName").style.display = "none";
  document.getElementById("editNameBtn").style.display = "none";
  document.getElementById("nameField").style.display = "block";
  document.getElementById("name").style.display = "block";
  document.getElementById("saveNameBtn").style.display = "block";
}

function editGenderBtn() 
{
  document.getElementById("gendarName").style.display = "none";
  document.getElementById("genderField").style.display = "block";
  document.getElementById("gendar").style.display = "block";
  document.getElementById("saveGenderBtn").style.display = "block";
  document.getElementById("editGenderBtn").style.display = "none";
}

function onDelete() 
{
  document.getElementById("deleteAccount").style.display = "none";
  document.getElementById("onDeleteNo").style.display = "block";
  document.getElementById("onDeleteYes").style.display = "block";
}

function onDeleteNo() 
{
  document.getElementById("deleteAccount").style.display = "block";
  document.getElementById("onDeleteNo").style.display = "none";
  document.getElementById("onDeleteYes").style.display = "none";
}

function onDeleteYes() 
{
  document.getElementById("deleteAccount").style.display = "block";
  document.getElementById("onDeleteNo").style.display = "none";
  document.getElementById("onDeleteYes").style.display = "none";
}

function editEmailBtn() 
{
  document.getElementById("diplayEmail").style.display = "none";  
  document.getElementById("editEmailBtn").style.display = "none";  
  document.getElementById("emailSaveBtn").style.display = "block";  
  document.getElementById("newEmail").style.display = "block";
}

function editPasswordBtn() 
{
  document.getElementById("displayPassword").style.display = "none"; 
  document.getElementById("editPassword").style.display = "none";  
  document.getElementById("PasswordSaveBtn").style.display = "block";  
  document.getElementById("newPassword").style.display = "block";
}

function editbackPainBtn() 
{
  document.getElementById("backPainSpan").style.display = "none"; 
  document.getElementById("backPainEditBtn").style.display = "none";  
  document.getElementById("backPainSelect").style.display = "block";  
  document.getElementById("backPainSaveBtn").style.display = "block";
}

function editkayboardBtn() 
{
  document.getElementById("kayboardSpan").style.display = "none"; 
  document.getElementById("kayboardEditBtn").style.display = "none";  
  document.getElementById("kayboardSelect").style.display = "block";  
  document.getElementById("kayboardSaveBtn").style.display = "block";
}

function editdistanceBtn() 
{
  document.getElementById("distanceSpan").style.display = "none"; 
  document.getElementById("distanceEditBtn").style.display = "none";  
  document.getElementById("distanceSelect").style.display = "block";  
  document.getElementById("distanceSaveBtn").style.display = "block";
}

function onSave(btn){

  if(btn == 'name1')
  {
    document.getElementById("displayName").style.display = "block";
    document.getElementById("displayNameLabel").style.display = "block";
    document.getElementById("nameField").style.display = "none";
    document.getElementById("editNameBtn").style.display = "block";
    document.getElementById("saveNameBtn").style.display = "none";
  }

  else if(btn == 'name2')
  {
     document.getElementById("gendarName").style.display = "block";
     document.getElementById("genderLabel").style.display = "block";
     document.getElementById("genderField").style.display = "none";
     document.getElementById("editGenderBtn").style.display = "block";
     document.getElementById("saveGenderBtn").style.display = "none";
  }

  else if(btn == 'email')
  {
    document.getElementById("diplayEmail").style.display = "block";  
    document.getElementById("editEmailBtn").style.display = "block";  
    document.getElementById("emailSaveBtn").style.display = "none";  
    document.getElementById("newEmail").style.display = "none";
  }
 
  else if (btn =='password'){
    document.getElementById("displayPassword").style.display = "block";
    document.getElementById("editPassword").style.display = "block";
    document.getElementById("PasswordSaveBtn").style.display = "none";  
    document.getElementById("newPassword").style.display = "none";
  }

  else if (btn =='backPain'){
    document.getElementById("backPainSelect").style.display = "none";
    document.getElementById("backPainSaveBtn").style.display = "none";
    document.getElementById("backPainSpan").style.display = "block";
    document.getElementById("backPainEditBtn").style.display = "block";
  }

  else if (btn =='kayboard'){
    document.getElementById("kayboardSelect").style.display = "none";
    document.getElementById("kayboardSaveBtn").style.display = "none";
    document.getElementById("kayboardSpan").style.display = "block";
    document.getElementById("kayboardEditBtn").style.display = "block";
  }

  else if (btn =='distance'){
    document.getElementById("distanceSelect").style.display = "none";
    document.getElementById("distanceSaveBtn").style.display = "none";
    document.getElementById("distanceSpan").style.display = "block";  
    document.getElementById("distanceEditBtn").style.display = "block";
  }
}

