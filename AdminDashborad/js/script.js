const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});



// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');


//Check if there is a previous state stored in localStorage

const isSidebarHidden = localStorage.getItem('sidebarHidden') === 'true';

// Set the state of the list based on a value stored in localStorage

if (isSidebarHidden) {
  sidebar.classList.add('hide');
}

menuBar.addEventListener('click', function () {
  sidebar.classList.toggle('hide');
  
// Save the list state to localStorage
  localStorage.setItem('sidebarHidden', sidebar.classList.contains('hide'));
});


// Update the list state when the window size changes
function updateSidebar() {
  if (window.innerWidth < 768) {
    sidebar.classList.add('hide');
  } else {
    sidebar.classList.remove('hide');
  }
}

// Listen for the window resize event and the list status event

window.addEventListener('resize', function () {
  updateSidebar();
});


// Update the list state when the page is loaded and the code is executed
window.addEventListener('load', function () {
  updateSidebar();
  
  window.addEventListener('beforeunload', function () {
    localStorage.setItem('sidebarHidden', sidebar.classList.contains('hide'));
  });
  
});



//protect admin and seller

document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || (user.type !== "admin")) {
        window.location.href = "../../html/login.html"; // Redirect to the login page
    }
});



 

// document.addEventListener("DOMContentLoaded", function () {
//     const user = JSON.parse(localStorage.getItem("user"));

//     if (!user || user.type !== "admin") {
//         window.location.href = "../login.html"; // Redirect to the login page
//     }
// });



//number of massages



let MessagesCount;
//localstorage has data
if(localStorage.formData != null){
    MessagesCount=JSON.parse(localStorage.formData);
}


document.addEventListener("DOMContentLoaded", function () {
	
	//number of masseges


	let countOfOMessages = 0;

	// Assuming productData is an array of products
	for (let i = 0; i < MessagesCount.length; i++) {
		
		countOfOMessages++;
		
	}

	// console.log(countOfOMessages);

	// Update HTML element content
	let numberOfMessagesElement =	document.getElementById("numOfMessages");
	numberOfMessagesElement.innerHTML = `<span>${countOfOMessages}</span>`;

});





let userCount;
//localstorage has data
if(localStorage.users != null){
    userCount=JSON.parse(localStorage.users);
}



document.addEventListener("DOMContentLoaded", function() {
	let countCustomer = 0;
	let countSeller=0;
	// Count the number of elements with type "customer"
	for (let i = 0; i < userCount.length; i++) {
		if (userCount[i].type === "customer") {
			countCustomer++;
		}else if(userCount[i].type === "seller"){
			countSeller++;
		}
	}

	
	//console.log(countCustomer);


	// Update HTML element content
	let numberOfCustomerElement = document.getElementById("numberOfCustomer");
	let numberOfSellerElement = document.getElementById("numberOfSeller");
	if (numberOfCustomerElement) {
		numberOfCustomerElement.innerHTML = `<span>${countCustomer}</span>`;
	} 
	if (numberOfSellerElement) {
		numberOfSellerElement.innerHTML = `<span>${countSeller}</span>`;
	} 

});


let productCount;
//localstorage has data
if(localStorage.products != null){
    productCount=JSON.parse(localStorage.products);
}




document.addEventListener("DOMContentLoaded", function () {
	let countOfProducts = 0;

	// Assuming productData is an array of products
	for (let i = 0; i < productCount.length; i++) {
		// Example: Count only products with a certain condition (e.g., count products with price > 50)
			countOfProducts++;
		
	}

	// console.log(countOfProducts);

	// Update HTML element content
	let numberOfProductElement = document.getElementById("numberOfProduct");
	numberOfProductElement.innerHTML = `<span>${countOfProducts}</span>`;
});



//count of orders

let ordersCount=[];
//localstorage has data
if(localStorage.OrderData != null){
    ordersCount=JSON.parse(localStorage.OrderData);
}



document.addEventListener("DOMContentLoaded", function () {
	let countOfOrders = 0;

	// Assuming productData is an array of products
	for (let i = 0; i <ordersCount.length; i++) {
		// Example: Count only products with a certain
		countOfOrders++;
		
	}

	// console.log(countOfOrders);

	// Update HTML element content
	let numberOfOrdersElement = document.getElementById("numberOfOrders");
	numberOfOrdersElement.innerHTML = `<span>${countOfOrders}</span>`;


	//number of masseges


	let countOfOMessages = 0;

	// Assuming productData is an array of products
	for (let i = 0; i < MessagesCount.length; i++) {
		
		countOfOMessages++;
		
	}

	// console.log(countOfOMessages);

	// Update HTML element content
	let numberOfMessagesElement =	document.getElementById("numOfMessages");
	numberOfMessagesElement.innerHTML = `<span>${countOfOMessages}</span>`;



});




//logout

document.addEventListener("DOMContentLoaded", function () {
    

    //  the logout button element
    const logoutBtn = document.getElementById("logoutBtn");

   
    logoutBtn.addEventListener("click", function (e) {
        e.preventDefault();

    
		alert(" You have successfully logged out.")
        // Redirect to the home page 
        window.location.href = '../../index.html';
		localStorage.removeItem("user");
    });
});



