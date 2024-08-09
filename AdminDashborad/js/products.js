let search = document.getElementById("search");

let searchByTitle = document.getElementById("searchTitle");
let searchByCategory = document.getElementById("searchCatergoy");



let productData;
//localstorage has data
if (localStorage.products != null) {
    productData = JSON.parse(localStorage.getItem("products"));
}
//localstorage is empty
else {
    productData = [];
}

//console.log(productData);


let cartArr;
//localstorage has data
if (localStorage.cartData != null) {
    cartArr = JSON.parse(localStorage.cartData);
}
//localstorage is empty
else {
    cartArr = [];
}

//console.log(cartArr);


//read data
function showData() {

    let table = '';
    for (let i = 0; i < productData.length; i++) {

        table += `
     <tr>
     <td>${productData[i].product_name}</td>
      <td>${productData[i].price}</td>
      <td>${productData[i].category}</td>
      <td>${productData[i].count}</td>
      <td>${productData[i].seller}</td>
      <td><img src="../${productData[i].product_img}"></td>

      <td><span onclick="deleteProduct(${i})" class="status delete" ${isProductInCart(productData[i].product_id) ? 'disabled' : ''}>Delete</span></td>
      </tr>`
            ;
    }
  //  console.log(table);

    if (productData.length <= 0) {
        table = "<p>not found products</p>";
    }



    document.getElementById("tbody").innerHTML = table;

}


// Check if a product is in the cart
function isProductInCart(produc_Id) {

    return cartArr.some(item => parseInt(item.productId) === produc_Id);
}


//display data
showData();



//delete products

function deleteProduct(i) {
   // console.log(i);
    // Get the product ID from the productData array
    let productId = productData[i].product_id;

    // Check if the product ID is in the cartData array after converting it to an integer
    let isInCart = cartArr.some(item => parseInt(item.productId) === productId);

    if (isInCart) {

        Swal.fire({
            icon: 'error',
            title: 'Product in Cart',
            text: 'This product cannot be deleted because it is in the cart.',
        });

    } else {
        const productIdToDelete = productData[i].product_id;
        const indexToDelete = productData.findIndex(product => product.product_id === productIdToDelete);
        //console.log(indexToDelete);
        // Remove the row from the table
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                if (indexToDelete !== -1) {
                    productData.splice(i, 1); // Remove the item from the productData array
                    localStorage.products = JSON.stringify(productData); // Update the localStorage
                    showData();
                }
                Toast.fire({
                    title: "Deleted!",
                    text: "Your product has been deleted.",
                    icon: "success"
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Toast.fire({
                    Toast: "Cancelled",
                    text: "Your product is safe :)",
                    icon: "error"
                });
            }
        });
    }
}





//search 
let s = document.getElementById("s");
s.onclick = () => {
    search.focus();


}
//remove value in input
let x = document.getElementById("x");
x.onclick = () => {
    search.value = "";
    showData();

}


//search 

let searchMood = "title";


searchByTitle.addEventListener("click", () => {
    getSearchMood(searchByTitle.id);
});

searchByCategory.addEventListener("click", () => {
    getSearchMood(searchByCategory.id);
});


//search mood
function getSearchMood(id) {
    //console.log(id);

    if (id == "searchTitle") {
        searchMood = "title";
        search.placeholder = "search by title";
    } else {
        searchMood = "category";
        search.placeholder = "search by category";

    }
    search.focus();
    search.value = '';
    showData();
}


search.addEventListener("keyup", () => {
    searchData(search.value);
});

//search data
function searchData(value) {

    let table = "";
   // console.log(value);
    for (let i = 0; i < productData.length; i++) {
        if (searchMood == "title") {


            if (productData[i].product_name.toLowerCase().includes(value.toLowerCase())) {

                table += `
                <tr>
                <td>${productData[i].product_name}</td>
                 <td>${productData[i].price}</td>
                 <td>${productData[i].category}</td>
                 <td>${productData[i].count}</td>
                 <td>${productData[i].seller}</td>

                 <td><img src="../${productData[i].product_img}"></td>
                 <td><span onclick="deleteProduct(${i})" class="status delete">Delete</span></td>
                 </tr>
                 `
                    ;

            }


        }
        else {

            if (productData[i].category.includes(value.toLowerCase())) {
                console.log(productData[i].catergoy);
                table += `
                        <tr>
                        <td>${productData[i].product_name}</td>
                         <td>${productData[i].price}</td>
                         <td>${productData[i].category}</td>
                         <td>${productData[i].count}</td>
                         <td>${productData[i].seller}</td>

                         <td><img src="../${productData[i].product_img}"></td>
                         <td><span onclick="deleteProduct(${i})" class="status delete">Delete</span></td>
                         </tr>
                         `
                    ;

            }


        }


    }
    document.getElementById("tbody").innerHTML = table;

}



let lastSorted = "";
let isAscending = true;

function sortDataBy(column) {
    if (lastSorted === column) {
        productData.reverse();
        isAscending = false; // Toggle the sorting order
    } else {
        productData.sort(function (a, b) {
            // Check if the column is numeric
            const isNumeric = !isNaN(parseFloat(a[column])) && !isNaN(parseFloat(b[column]));

            
            if (isNumeric) {
                return isAscending ? parseFloat(a[column]) - parseFloat(b[column]) : parseFloat(b[column]) - parseFloat(a[column]);
            } else {
                return a[column].toLowerCase().localeCompare(b[column].toLowerCase());
            }
        });
        isAscending = true;
    }

    lastSorted = column;
    showData();
}


// Sort by name
document.getElementById("title").addEventListener("click", function () {
    sortDataBy("product_name");
});

// Sort by category
document.getElementById("category").addEventListener("click", function () {
    sortDataBy("category");
});

// Sort by price
document.getElementById("price").addEventListener("click", function () {
    sortDataBy("price");
});

// Sort by count
document.getElementById("count").addEventListener("click", function () {
    sortDataBy("count");
});

// Sort by id
document.getElementById("sellerID").addEventListener("click", function () {
    sortDataBy("seller");
});





