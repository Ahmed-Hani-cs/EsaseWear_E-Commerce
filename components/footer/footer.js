
var footer=document.getElementById("footer")
let footerContent=
`
<footer class="mt-5 py-5">
<div class="row container mx-auto pt-5">
    <div class="footer-one col-12 col-mg-6 col-lg-3">
        <img id="logo" src="../../images/logo1.png" alt="Footer Img">
        <p class="pt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi voluptatem corrupti enim
            assumenda
            sequi ullam animi cumque, optio fugiat ut sapiente</p>
    </div>
    <div class="footer-one col-12 col-mg-6 col-lg-3 mb-3">
        <h5 class="pb-2">Featured</h5>
        <ul class="text-uppercase list-unstyled ">
            <li><a href="#" onclick="updateFilter('all')">All</a></li>
            <li><a href="#" onclick="updateFilter('topwear')">Topwear</a></li>
            <li><a href="#" onclick="updateFilter('bottomwear')">Bottomwear</a></li>
            <li><a href="#" onclick="updateFilter('jacket')">Jacket</a></li>
            <li><a href="#" onclick="updateFilter('shoes')">Shoes</a></li>
            
        </ul>
    </div>
    <div class="footer-one col-12 col-mg-6 col-lg-3 mb-3">
        <h5 class="pb-2">Contact Us</h5>
        <div>
            <h6 class="text-uppercase">Address</h6>
            <p>123, Mansoura Egypt</p>
        </div>
        <div>
            <h6 class="text-uppercase">Phone</h6>
            <p>0_777_5000</p>
        </div>
        <div>
            <h6 class="text-uppercase">Email</h6>
            <p>ITI@gmail.com</p>
        </div>
    </div>
    <div class="footer-one col-12 col-mg-6 col-lg-3">
        <h5 class="pb-2">Instagram</h5>
        <div class="row">
            <img class="img-fluid w-25 h-100 m-2" src="../../images/insta/1.jpg" alt="Instagram Img">
            <img class="img-fluid w-25 h-100 m-2" src="../../images/insta/2.jpg" alt="Instagram Img">
            <img class="img-fluid w-25 h-100 m-2" src="../../images/insta/3.jpg" alt="Instagram Img">
            <img class="img-fluid w-25 h-100 m-2" src="../../images/insta/4.jpg" alt="Instagram Img">
            <img class="img-fluid w-25 h-100 m-2" src="../../images/insta/5.jpg" alt="Instagram Img">
        </div>
    </div>

</div>
<div class="copyright mt-5">
    <div class="row container mx-auto">
        <div class="col-12 col-md-6 col-lg-3 mb-4">
            <img src="../../images/payment.png" alt="">
        </div>
        <div class="col-12 col-md-6 col-lg-4 text-nowrap mb-2">
            <p>Lorem ipsum dolor sit amet consectetur</p>
        </div>
        <div id="footer-social" class="col-12 col-md-6 col-lg-4">
            <a href=""><i class="fa-brands fa-facebook-f"></i></a>
            <a href=""><i class="fa-brands fa-x-twitter"></i></a>
            <a href=""><i class="fa-brands fa-linkedin-in"></i></a>
        </div>
    </div>
</div>
</footer>
`
footer.innerHTML=footerContent;


// Filter function
function updateFilter(category) {
    let buttons = document.querySelectorAll(".my-button");
    buttons.forEach((button) => {
        if (category.toLowerCase() === button.innerText.toLowerCase()) {
            button.classList.add("active-search");
        } else {
            button.classList.remove("active-search");
        }
    });

    let prods = document.querySelectorAll(".pro");
    prods.forEach((p) => {
        if (category === "all") {
            p.classList.remove("hide");
        } else if (p.classList.contains(category)) {
            // Show the products of this category
            p.classList.remove("hide");
        } else {
            // Hide other elements
            p.classList.add("hide");
        }
    });

    // Call the search function after updating the filter
    mySearchFunction();
}