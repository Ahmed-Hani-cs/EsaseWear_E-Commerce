//to insure that user will not enter negative numbers or numbers gt 5
function validateInput(input) {
  // Parse the input value as a number
  var inputValue = parseInt(input.value, 10);
  // Check if the value is negative or greater than the max allowed value
  if (
    inputValue < 0 ||
    inputValue > parseInt(input.max, 10) ||
    isNaN(inputValue)
  ) {
    // If negative, greater than max, or not a number, set the value to the minimum allowed value
    input.value = input.min;
  }
}
window.addEventListener("load", function () {
  //to get params from url
  let storedID = localStorage.getItem("productID");
 
  let product_item = JSON.parse(localStorage.getItem("products"));
  let product = product_item.find((item) => item.product_id == storedID);
  console.log(product.product_name);

      document.getElementById("h1").innerText = product.product_name;
    
  
  
  
  document.getElementById("price").innerText = product.price + "$";
  document.getElementById("description").innerText = product.description;
  document.getElementById("i1").src = product.product_img;
  //check if there are small images with the product if not display none
  if (product.product_img1) {
    document.getElementById("smImg1").src = product.product_img1;
    document.getElementById("smImg2").src = product.product_img2;
    document.getElementById("smImg3").src = product.product_img3;
  } else {
    for (var i = 1; i <= 3; i++) {
      var imgId = "smImg" + i;
      document.getElementById(imgId).style.display = "none";
    }
  }

  let products = JSON.parse(window.localStorage.getItem("products"));
  const selectedProduct = products.find(
    (product) => storedID == product.product_id
  );
  //second part passing data to add to cart ==================================================================

  var selectedSize = document.getElementById("select");
  document.getElementById("AddToCart").addEventListener("click", function () {
    let cartData = JSON.parse(localStorage.getItem("cartData")) || [];

    var c = JSON.parse(localStorage.getItem("products"));

    if (selectedProduct.count === 0) {
      alert("This item is out of stock");
      e.preventDefault();
      document.getElementById("AddToCart").value = "out Of Stock";
      document.getElementById("AddToCart").disabled = true;
      return;
    }
    //sweet Alerttttttttttttttttttttttttt
    let MyCurrentUser = JSON.parse(localStorage.getItem("user"));
    let currentId;
    if (MyCurrentUser) {
      currentId = MyCurrentUser.id;
    } else {
      currentId = -1;
    }

    for (let i = 0; i < cartData.length; i++) {
      if (
        cartData[i].productId == storedID &&
        cartData[i].userId == currentId
      ) {
        alert("This item is already in your cart. You can't add it again.");
        e.preventDefault();
        document.getElementById("AddToCart").disabled = true;
        return;
      }
    }
    if (selectedSize.value == 0) {
      document.getElementById(
        "alertContainer"
      ).innerHTML = `<div class="alert alert-danger">
                Please Choose the size of your product!
                </div>`;
    } else {
      document.getElementById("alertContainer").innerHTML = "";
      let numOfItems = document.getElementById("number").value;
      var sizeSelect = document.getElementById("select");
      var CheckTheExistenceOfUser = JSON.parse(localStorage.getItem("user"));
      var sizeOfProduct = sizeSelect.options[sizeSelect.selectedIndex].value;
      //check if the user is logged in or not
      if (!CheckTheExistenceOfUser) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Swal.fire({
          title: "You are not logged in!",
          text: "Please sign in to add this item to your cart!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes,Sign in!",
        }).then((result) => {
          if (result.isConfirmed) {
            Toast.fire({
              title: "login page",
              text: "move to login page",
              icon: "success",
            }).then((result) => {
              window.location.href = "../html/login.html";
            });
          }
        });
      } else {
        var currentUserId = JSON.parse(localStorage.getItem("user"))["id"];
        let priceOfItem = product.price;
        let seller = product.seller;
        //  let cartData = JSON.parse(localStorage.getItem("cartData")) || [];
        let newCartItem = {
          numOfItems: numOfItems,
          sizeOfProduct: sizeOfProduct,
          productId: storedID,
          userId: currentUserId,
          seller: seller,
          priceOfItem: priceOfItem,
        };

        cartData.push(newCartItem);
        localStorage.setItem("cartData", JSON.stringify(cartData));
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Added to cart successfully",
        });
      }
    }
    //to update the count of cart icon
    let userId2;

    // Check if localStorage has user data
    if (localStorage.user != null) {
      userId2 = JSON.parse(localStorage.user);
      let numOfCart;
      let count = 0;
      // Check if localStorage has cart data
      if (localStorage.cartData != null) {
        numOfCart = JSON.parse(localStorage.cartData);
        console.log(userId2.id);
        for (let i = 0; i < numOfCart.length; i++) {
          if (userId2.id == numOfCart[i].userId) {
            count += Number(numOfCart[i].numOfItems);
            document.getElementById(
              "prod_count"
            ).innerHTML = `<span>${count}</span>`;
          } else {
          }
        }
      }

      document.getElementById("login").style.display = "none";
      document.getElementById(
        "Profile"
      ).innerHTML = `<span>${userId2.name}</span>`;
    } else {
      document.getElementById("Profile").style.display = "none";
      document.getElementById("user").style.display = "none";
    }
  });
});
