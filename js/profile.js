
document.getElementById("logout2").addEventListener("click" , ()=>{
    window.location.href = "../html/login.html";
     // Remove user data from localStorage
     localStorage.removeItem("user");
  })
  document.addEventListener("DOMContentLoaded", function() {  
    // get thr user from localStorage  
  var user = JSON.parse(localStorage.getItem("user"));
  var userName = user.name;
  var email = user.email;
  // get username input from form and set value to userName
  document.getElementById("username").value = userName;
  document.getElementById("e-mail").value = email;
  
  });
  
  //store update in each user and users local storge
  
  document.getElementById("submit").addEventListener("click", () => {
      var submitButton = document.getElementById("submit");
      var user = JSON.parse(localStorage.getItem("user"));
      var users = JSON.parse(localStorage.getItem("users")); // Retrieve users array
      var userName = document.getElementById("username").value;
      var email = document.getElementById("e-mail").value;
      user.name = userName;
      user.email = email;
      var namePattern = /^[a-zA-Z\s]+$/; // Only letters and spaces allowed
      if (!namePattern.test(userName) || userName.length <= 2) {
        alert("Please enter a valid name with only alphabetical characters and length greater than 2.");
        return;
    }
      if (userName === '' || email === '') {
          alert("Please enter values in the fields");
      } else {
          // Update user object in users array
          var index = users.findIndex(u => u.id === user.id); // Assuming each user has an id property
          if (index !== -1) {
              users[index] = user;
              localStorage.setItem("users", JSON.stringify(users)); // Store updated users array
              alert("update succesfully");
          } else {
              console.error("User not found in users array");
          }
          localStorage.setItem("user", JSON.stringify(user)); // Store updated user object
      }
  });
  
  
  
  
  //password
  /*
  document.getElementById("submitPassword").addEventListener("click", function updatePassword() {
      var user = JSON.parse(localStorage.getItem("user"));
   
      var currentPassword = document.getElementById("Currentpassword").value;
      var newPassword = document.getElementById("Newpassword").value;
      var confirmNewPassword = document.getElementById("Confirmnewpassword").value;
      var errorMessage = document.getElementById("errorMessage");
  
      if (newPassword === confirmNewPassword) {
          // Update user's password
          user.password = confirmNewPassword;
  
          // Store the updated user object back into local storage
          localStorage.setItem("user", JSON.stringify(user));
          var users = JSON.parse(localStorage.getItem("users"));
      }
  });*/
  
  document.getElementById("submitPassword").addEventListener("click", function updatePassword() {
      var user = JSON.parse(localStorage.getItem("user"));
      var users = JSON.parse(localStorage.getItem("users"));
  
      var currentPassword = document.getElementById("Currentpassword").value;
      var newPassword = document.getElementById("Newpassword").value;
      var confirmNewPassword = document.getElementById("Confirmnewpassword").value;
      var newemail = document.getElementById("e-mail").value; 
      var newusername = document.getElementById("username").value; 
      var errorMessage = document.getElementById("errorMessage");
  
      if (newPassword === confirmNewPassword) {
          // Update user's password
          user.password = confirmNewPassword;
  
          // Update user information in the users array
          var currentUserIndex = users.findIndex(function(userItem) {
              return userItem.id === user.id;
          });
  
          if (currentUserIndex !== -1) {
              users[currentUserIndex].password = newPassword;
              // Update other user information if needed (e.g., email, name)
              users[currentUserIndex].email = newemail;
              users[currentUserIndex].name = newusername;
  
  
              if( document.getElementById("Currentpassword").value === '' ||  document.getElementById("Newpassword").value === '' ||   document.getElementById("Confirmnewpassword").value === '' ){
                  alert ("Fileds can not be emp");
              }
              else{
                  localStorage.setItem("users", JSON.stringify(users));
  
                  // Store the updated user object back into local storage
                  localStorage.setItem("user", JSON.stringify(user));
               
                  alert(" updated successfully!");
  
              }
           
              // Store the updated users array back into local storage
            
  
              //clear input fields
              document.getElementById("Currentpassword").value = "";
              document.getElementById("Newpassword").value = "";
              document.getElementById("Confirmnewpassword").value = "";
              
             
          } else {
              alert("User not found in users array!");
          }
      } 
      else{
          alert("confiremd passowod not like the enterd passwoed")
      }
  });
  