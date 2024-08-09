let Name=document.getElementById("Name");
let email=document.getElementById("email");
let password=document.getElementById("password");
let type=document.getElementById("type");
let create=document.getElementById("createUser");
let search=document.getElementById("search");

//global var
let temp;

let mood="create";


document.addEventListener("DOMContentLoaded", function() {

    if(type){
        type.style.display="none"
    }
});
//add user
let userData;
//localstorage has data
if(localStorage.users != null){
    userData=JSON.parse(localStorage.users);
}
//localstorage is empty
else{
    userData=[];
}

create.onclick=function(){
        // Validate inputs
        if (validateInputs()) {
    let newUser = {
       id: getRandomInt(10, 1000),
       name:Name.value.toLowerCase(),
       email:email.value,
       password:password.value,
       type:type.value
    }
    //add user
    if(mood === "create"){
    userData.push(newUser);
    //console.log(userData);
    }
    //update user
    else{

        userData[temp] = newUser;
        //after update
        mood="create";
        create.innerHTML="Create";
        create.style.background="#6b0808";
        type.style.display="none"
    }



    localStorage.setItem("users",JSON.stringify(userData));

    //clear data
    clearData();
    //display data
    showData();
}
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }

//clear inputs

function clearData(){
    Name.value="";
    email.value="";
    password.value="";
}


//read data
function showData(){

    let table='';
    for(let i=0;i<userData.length;i++){
      if(userData[i].type == "customer") { 
      table += `
     <tr>
     <td>
    <!-- <img src="../img/img.jpg">-->
     <p>${userData[i].name}</p>
      </td>
      <td>${userData[i].email}</td>
      <td>${userData[i].password}</td>
      <td><span onclick="updateUser(${i})" class="status update">Update</span></td>
      <td><span onclick="deleteUser(${i})" class="status delete">Delete</span></td>
      </tr>`
      ;  
    //   console.log(i);
      }
      //console.log(table);
      //console.log(userData[i].type);

      if(userData.length<=0){
        table="<p>not found users</p>";
      }

}

    document.getElementById("tbody").innerHTML = table;

}

    //display data
    showData();


    
// Function to validate inputs
function validateInputs() {
    let nameRegex = /^[a-zA-Z\s]+$/; // Only letters and spaces allowed
    let emailRegex = /^[a-zA-Z0-9_.]{4,}@(yahoo|gmail|hotmail|outlook).(com|net|eg)$/; // Basic email format
    let passwordRegex = /^.{6,}$/; // Minimum 6 characters

    // Validate Name
    if (!Name.value.match(nameRegex) || Name.value.length <= 2) {
        alert("Please enter a valid name with at least 3 character.");
        return false;
    }

    // Validate Email
    if (!email.value.match(emailRegex)) {
        alert("Please enter a valid email address.");
        return false;
    }

     // Check for duplicate email
     if (isEmailDuplicate(email.value)) {
        alert("Email address is already in use. Please use a different email.");
        return false;
    }

    // Validate Password
    if (!password.value.match(passwordRegex)) {
        alert("Please enter a valid password (at least 6 characters).");
        return false;
    }

    return true;
}


// Function to check for duplicate email
function isEmailDuplicate(newEmail) {
    for (let i = 0; i < userData.length; i++) {
        if(i==temp)continue;
        if (userData[i].email === newEmail && userData[i].type == "customer" && type.value == "customer") {
            return true;
        }else if(userData[i].email === newEmail &&type.value == "seller" ){
            return true;
        }
    }
    return false;
}


//delete user

function deleteUser(i){
   // console.log(i);
   userData.splice(i,1);

   //add data in local storage after remove
   localStorage.users = JSON.stringify(userData);
    //display data after remove
   showData();
   searchData(currentSearch);

}

//update data 

function updateUser(i){
    //console.log(i);
    Name.value=userData[i].name;
    email.value=userData[i].email;
    password.value=userData[i].password;

    
    //change create to update
    create.innerHTML="Update";
    create.style.background="orange";
    type.style.display="inline-block"

    mood="update";
    
    temp = i;

    try {
        scroll({
            top: 0,
            behavior: "smooth"
        });
    } catch (error) {
        console.error("Error in smooth scrolling:", error);
    }

}

//search 
let s=document.getElementById("s");
s.onclick=()=>{
    search.focus();
   

}
//remove value in input
let x=document.getElementById("x");
x.onclick=()=>{
 search.value="";
    showData();

}

let currentSearch="";
search.addEventListener("keyup", () => {
    currentSearch=search.value;
    searchData(currentSearch);
});



//search by name
function searchData(value){

    //console.log(value);
    let table="";
    for(let i=0;i<userData.length;i++){
        if(userData[i].name.toLowerCase().includes(value.toLowerCase())&&userData[i].type=="customer"){
            table += `
            <tr>
            <td>
            <p>${userData[i].name}</p>
             </td>
             <td>${userData[i].email}</td>
             <td>${userData[i].password}</td>
             <td><span onclick="updateUser(${i})" class="status update">Update</span></td>
             <td><span onclick="deleteUser(${i})" class="status delete">Delete</span></td>
             </tr>`
             ;  
             }
        }
        document.getElementById("tbody").innerHTML = table;

    }


// //sort data 
// let lastsorted="";
// document.getElementById("username").addEventListener("click",function(){
//     if (lastsorted == "name") {
//         userData.reverse();
//         showData();
//         return;
//     }
//     userData = userData.sort(function (a, b) {
//         return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
//     });
//     lastsorted = "name";
//     showData();
// });


let lastSorted = "";
let isAscending = true;

function sortDataBy(column) {
    if (lastSorted === column) {
        userData.reverse();
        isAscending = false;
    } else {
        userData.sort(function (a, b) {
            return a[column].toLowerCase().localeCompare(b[column].toLowerCase());
        });
        isAscending = true;
        lastSorted = column;
    }

    showData();
}
//sort by name
document.getElementById("username").addEventListener("click", function () {
    sortDataBy("name");
});

//sort by email
document.getElementById("useremail").addEventListener("click", function () {
    sortDataBy("email");
});





