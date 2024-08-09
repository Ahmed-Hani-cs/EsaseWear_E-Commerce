
var body=document.getElementById("header")

let navbar=
`
<!-- Header -->

<nav id="navBar" class="navbar navbar-expand-lg navbar-light bg-white py-3 fixed-top">
    <div class="container">
         <img id="logo" src="../../images/logo1.png" alt="Logo Img">
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <span><i id="bar" class="fa-solid fa-bars-staggered"></i></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link link" href="../../index.html">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link link" href="../../html/product.html">Products</a>
                </li>
    
                <li class="nav-item">
                    <a class="nav-link link" href="../../about_contact pages/about.html">About</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link link" href="../../about_contact pages/contact.html">Contact Us</a>
                </li>

                <li class="nav-item">
                    <a href="../../html/cart.html" class="nav-link">
                        <i class="fa-solid fa-shopping-cart"></i>
                        <span id="prod_count">0</span>
                    </a>
                </li>               
                <li id="login" class="nav-item">
                    <a href="../../html/login.html" class="nav-link">
                        <i id="user" class="fa-solid fa-user-circle"></i>
                    </a>
                </li>
                
                <li id="ProfileLI" class="nav-item dropdown">
                    <a id="Profile" class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                        data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      
                    </a>
                    <div class="dropdown-menu" aria-labelledby="userDropdown">
                        <a class="dropdown-item" href="../../html/profile.html">Profile</a>
                        <a id="logout" class="dropdown-item" href="../../index.html">Logout</a>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</nav>

`
body.innerHTML=navbar;




// Get the current page URL
const currentPage = window.location.href;

//console.log(currentPage);

// Get all the navigation links
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

// Loop through each navigation link
navLinks.forEach(navLink => {
    // Get the href attribute of the navigation link
    const linkUrl = navLink.href;

    // Check if the current page URL is equal to the link URL
    if (currentPage === linkUrl) {
        // Add the "active" class 
        navLink.classList.add('active');
    }
});




let userId;

// Check if localStorage has user data
if (localStorage.user != null) {
    userId = JSON.parse(localStorage.user);

    let numOfCart;
    let count=0;
    // Check if localStorage has cart data
    if (localStorage.cartData != null) {
        numOfCart = JSON.parse(localStorage.cartData);

        console.log(userId.id);

        for (let i = 0; i < numOfCart.length; i++) {
            if (userId.id == numOfCart[i].userId) {
                count+=Number(numOfCart[i].numOfItems);
                document.getElementById("prod_count").innerHTML = `<span>${count}</span>`;
            } 
        }
    }
    document.getElementById("login").style.display="none";
    document.getElementById("Profile").innerHTML =`<span>${userId.name}</span>`;


     // Logout functionality
     document.getElementById("logout").addEventListener("click", function () {
        // Remove user data from localStorage
        localStorage.removeItem("user");

        // Redirect to the index page
        window.location.href = "index.html";
    });
}else{
    document.getElementById("ProfileLI").style.display="none";
}




