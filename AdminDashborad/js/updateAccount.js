let showform=document.getElementById("showform");
let Name=document.getElementById("Name");
let email=document.getElementById("email");
let password=document.getElementById("password");
let btnUpdate=document.getElementById("updateAccount");



console.log(btnUpdate);


showform.style.display="none";

let adminData;
//localstorage has data
if(localStorage.users != null){
    adminData=JSON.parse(localStorage.users);
}

//read data
function showData(){

    let table='';
    for(let i=0;i<adminData.length;i++){
      if(adminData[i].type == "admin") { 
      table += `
     <tr>
     <td>
     <p>${adminData[i].name}</p>
      </td>
      <td>${adminData[i].email}</td>
      <td>${adminData[i].password}</td>
      <td><span onclick="updateAdmin(${i})" class="status update">Update</span></td>
      </tr>`
      ;  
      }
      //console.log(table);
      //console.log(userData[i].type);

      if(adminData.length<=0){
        table="<p>not found users</p>";
      }

}

    document.getElementById("tbody").innerHTML = table;

}
    //display data
    showData();



    //update data 
let temp;
function updateAdmin(i){
   //show form 
   showform.style.display="block";
    //
    Name.value=adminData[i].name;
    email.value=adminData[i].email;
    password.value=adminData[i].password;

    btnUpdate.style.background="orange";
    
        scroll({
            top: 0,
            behavior: "smooth"
        });

        temp=i;
}

btnUpdate.onclick=function(){
 // Validate inputs
        if (validateInputs()) {
    let newData = {
       name:Name.value.toLowerCase(),
       email:email.value,
       password:password.value,
       type:"admin",
    }

    console.log(newData);
        adminData[temp] = newData;
        //after update
        showform.style.display="none";
        console.log(adminData);
    }

    localStorage.setItem("users",JSON.stringify(adminData));
   
  //display data
  showData();

}



   
// Function to validate inputs
function validateInputs() {
    let nameRegex = /^[a-zA-Z\s]+$/; // Only letters and spaces allowed
    let emailRegex =/^[a-zA-Z0-9_.]{4,}@(yahoo|gmail|hotmail|outlook |admin).(com|net|eg)$/; // Basic email format
    let passwordRegex = /^.{6,}$/; // Minimum 6 characters

    // Validate Name
    if (!Name.value.match(nameRegex)) {
        alert("Please enter a valid name.");
        return false;
    }

    // Validate Email
    if (!email.value.match(emailRegex)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Validate Password
    if (!password.value.match(passwordRegex)) {
        alert("Please enter a valid password (at least 6 characters).");
        return false;
    }

    return true;
}





















