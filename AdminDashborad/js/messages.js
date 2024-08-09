let search=document.getElementById("searchData");

let Messages;


if (localStorage.formData !== null) {
    Messages = JSON.parse(localStorage.formData);

   
} else {
    Messages = [];
}

// Read data
function showMessages() {

    let table = '';
for(let i=0;i<Messages.length;i++){
        table += `
            <tr>
                <td>${Messages[i].name}</td>
                <td>${Messages[i].email}</td>
                <td>${Messages[i].subject}</td>
                <td>${Messages[i].message}</td>
                <td><span onclick="deleteMessage(${i})" class="status delete">Delete</span></td>
            </tr>`;
    

    // Check if no messages are found
    if (Messages.length <= 0) {
        
        table = "<p>No messages found</p>";
    }

    document.getElementById("tbody").innerHTML = table;


    let btndeleteAll=document.getElementById("deleteAllContainer");

    if(Messages.length>0){
        btndeleteAll.innerHTML=`<button onclick="deleteAll()" id="deleteAll">Delete All Messages</button>`
    }else{
        btndeleteAll.innerHTML='';
    }
}
}


// Display data
showMessages();


//  delete a message
function deleteMessage(i) {

    Messages.splice(i, 1);
    localStorage.setItem("formData", JSON.stringify(Messages));
    showMessages(); 
}

// console.log(Messages);




//search 
let s=document.getElementById("s");
s.onclick=()=>{
    search.focus();
   

}
//remove value in input
let x=document.getElementById("x");
x.onclick=()=>{
 search.value="";
 showMessages();   

}


search.addEventListener("keyup", () => {
    searchData(search.value);
});

//search by name
function searchData(value){

    //console.log(value);
    let table="";
    for(let i=0;i<Messages.length;i++){
        if(Messages[i].name.includes(value.toLowerCase())){
            table += `
            <tr>
            <td>${Messages[i].name}</td>
            <td>${Messages[i].email}</td>
            <td>${Messages[i].subject}</td>
            <td>${Messages[i].message}</td>
            <td><span onclick="deleteMessage(${i})" class="status delete">Delete</span></td>
        </tr>`; 
             }
        }
        document.getElementById("tbody").innerHTML = table;

    }

// delete all messages
function deleteAll() {
    localStorage.removeItem("formData");
    Messages = [];
    showMessages();
    location.reload(); // Reload the page
}