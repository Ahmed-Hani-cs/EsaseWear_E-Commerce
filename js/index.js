function renderProduct() {
  // Retrieve products from local storage
  const products = JSON.parse(localStorage.getItem("products"));

  // Get the element where you want to render the products
  const productsContainer = document.getElementById("products-container");
  const shoesContainer = document.getElementById("shoes-container");

  // Check if there are products in local storage
  if (products && products.length > 0) {
    // Clear existing content in the container
    let count = 0;
    for (let i = 0; i < products.length; i++) {
      let productHTML = `
        <div class="product text-center col-12 col-md-4 col-lg-3 p" data-product-id="${products[i].product_id}">
          <div class="Product_image">
            <img class="img-fluid mb-3" src="${products[i].product_img}" alt="product">
          </div>
          <div class="star">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
          <h5 class="p-name">${products[i].product_name}</h5>
          <h4 class="p-price">${products[i].price}$</h4>
        </div>
      `;


      if (products[i].category == "topwear" && count < 4) {
        count++;
        // Append the product HTML to the container
        productsContainer.innerHTML += productHTML;
      } else if (products[i].category == "shoes" && count < 8) {
        count++;
        shoesContainer.innerHTML += productHTML;
      }
    }
  } else {
    productsContainer.innerHTML = "<p>No products available</p>";
  }

  // Add event listener to all product elements
  document.querySelectorAll(".product").forEach(productElement => {
    productElement.addEventListener("click", function () {
      // Retrieve the product ID from the clicked product
      const productId = this.getAttribute("data-product-id");
      // Store the ID in localStorage
      localStorage.setItem('productID', productId);
      // Redirect to the productDetails.html page
      window.location.href = 'html/productDetails.html';
    });
  });
}

renderProduct();