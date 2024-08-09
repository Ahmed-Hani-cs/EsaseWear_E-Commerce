
var myproduct_container = document.getElementById("myproducts");
var p = JSON.parse(localStorage.getItem("products"));


for (var i in p) {
  var product = `<div class="pro ${p[i].category}">
<img  src="${p[i].product_img}" alt="product img" />
<div class="des">
  <h5 class="product-name">${p[i].product_name}</h5>
  <div class="star">
    <i class="bi bi-star-fill"></i>
    <i class="bi bi-star-fill"></i>
    <i class="bi bi-star-fill"></i>
    <i class="bi bi-star-fill"></i>
    <i class="bi bi-star"></i>
  </div>
  <h4>${p[i].price}$</h4>
</div>
</div>`;
  myproduct_container.insertAdjacentHTML("beforeend", product);
}


window.addEventListener("load", function () {
  for (let i = 0; i < p.length; i++) {
    //event listener
    document.getElementsByClassName("pro")[i].addEventListener("click", function () {
      let ID = 0;
      ID = (p[i].product_id);
      // Store the ID in localStorage
      localStorage.setItem('productID', ID);
      // Redirect to the productDetails.html page
      window.location.href = '../html/productDetails.html';
    });
  }
});
////////////////////////////////////

// filter categories by buttons
function filterProducts(category) {
  let buttons = document.querySelectorAll(".my-button");
  buttons.forEach((button) => {
    if (category.toLowerCase() == button.innerText.toLowerCase()) {
      button.classList.add("active-search");
    } else {
      button.classList.remove("active-search");
    }
  });

  let prods = document.querySelectorAll(".pro");
  prods.forEach((p) => {
    if (category == "all") {
      p.classList.remove("hide");
    } else if (p.classList.contains(category)) {
      // show the products of this category
      p.classList.remove("hide");
    } else {
      // hide other elements
      p.classList.add("hide");
    }
  });
}


//search button
let search = document.getElementById("search");
let mysearch_input = document.getElementById("search-input")
let mySearchFunction = () => {
  let searchInput = mysearch_input.value.toLowerCase();
  let category = document.querySelector(".active-search") ? document.querySelector(".active-search").innerText.toLowerCase() : "all";
  let prod_name = document.querySelectorAll(".product-name");
  let prod = document.querySelectorAll(".pro");

  prod_name.forEach((p, index) => {
    if ((p.innerText.toLowerCase().includes(searchInput) ) &&
      (category === "all" || prod[index].classList.contains(category))) {
      prod[index].classList.remove("hide");
    } else {
      prod[index].classList.add("hide");
    }
  });
};
search.addEventListener("click", mySearchFunction);
mysearch_input.addEventListener('input', mySearchFunction);


// window.onload = () => {
//   filterProducts("all");
// };
