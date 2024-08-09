
const logedinUser = JSON.parse(localStorage.getItem('user'));
let title = document.getElementById("title");
let price = document.getElementById("price");
let count = document.getElementById("count");
let description = document.getElementById("description");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let imagePreview = document.getElementById('imgPreview');
let img = document.getElementById("img");

// validations div
let title_val = document.getElementById("title_val");
let price_val = document.getElementById("price_val");
let count_val = document.getElementById("count_val");
let category_val = document.getElementById("category_val");
let img_val = document.getElementById("img_val");

let signOut = document.getElementById("signOut");

document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || (user.type !== "seller")) {
        window.location.href = "../../html/login.html"; // Redirect to the login page
    }
});

signOut.addEventListener("click", function (event) {
    event.preventDefault();

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Swal.fire({
        title: "Are you sure?",
        text: "Do you want to sign out?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes,Sign out!"
    }).then((result) => {
        if (result.isConfirmed) {
            Toast.fire({
                title: "Sign out!",
                text: "You have signed out successfully.",
                icon: "success"
            }).then((result) => {
                window.location.href = "../../index.html";
                localStorage.removeItem("user");
            });
        } else {
            window.location.href = "../html/index.html";
        }
    });
});

let mood = 'create';
let tmp;
let dataPro;

const titleRegex = /^[a-zA-Z0-9- ]{3,}$/;
const numberRegex = /^[0-9]{1,}$/;

if (localStorage.products != null) {
    dataPro = JSON.parse(localStorage.products);
} else {
    dataPro = [];
}

submit.onclick = function (event) {
    var flag = true;
    let newPro = {
        product_name: title.value,
        price: price.value,
        count: count.value,
        description: description.value,
        category: category.value,
        product_img: imagePreview.src,
        seller: logedinUser.id,
        product_id: generateProductId()
    };
    if (titleRegex.test(title.value) && title.value.trim() != '' && description.value.trim() != '' && numberRegex.test(price.value) && price.value != 0 && count.value !=0 && numberRegex.test(count.value) && category.value != '0' && newPro.count <= 100 && img.value != '') {
        if (mood === 'create') {
            dataPro.push(newPro);
        } else {
            const indexToUpdate = dataPro.findIndex(product => product.product_id === dataPro[tmp].product_id);
            if (indexToUpdate !== -1) {
                dataPro[indexToUpdate] = newPro;
                mood = 'create';
                submit.innerHTML = "Create";
                count.style.display = 'block';
            }
        }
        clearData();
        localStorage.setItem('products', JSON.stringify(dataPro));
    } else {
        flag = false;
        if (title.value.trim() == '' || titleRegex.test(title.value) == false) {
            title.style.border = "solid 3px red";
            title_val.innerHTML = 'Title must be more than 3 char caracters and numbers and "-" only';
        } else {
            title.style.border = "solid 3px green";
            title_val.innerHTML = '';
        }
        if (price.value.trim() == '' || numberRegex.test(price.value) == false || price.value == 0) {
            price.style.border = "solid 3px red";
            price_val.innerHTML = 'Price must be a positive number only and not 0';
        } else {
            price.style.border = "solid 3px green";
            price_val.innerHTML = '';
        }
        if (count.value.trim() == '' || numberRegex.test(count.value) == false || count.value > 100 || count.value == 0) {
            count.style.border = "solid 3px red";
            count_val.innerHTML = 'Count must be between 1 and 100';
        } else {
            count.style.border = "solid 3px green";
            count_val.innerHTML = '';
        }
        if (description.value.trim() == '') {
            description.style.border = "solid 3px red";
            description_val.innerHTML = 'please write description';
        } else {
            description.style.border = "solid 3px green";
            description_val.innerHTML = '';
        }
        if (category.value == '0') {
            category.style.border = "solid 3px red";
            category_val.innerHTML = 'Choose category';
        } else {
            category.style.border = "solid 3px green";
            category_val.innerHTML = '';
        }
        if (img.value == '') {
            img.style.border = "solid 3px red";
            img_val.innerHTML = 'Choose image';
        } else {
            img.style.border = "solid 3px green";
            img_val.innerHTML = '';
        }
        event.preventDefault();
    }
    if (flag) {
        updateAndCloseModal();
        return false;
    } else {
        showData();
    }
};

function clearData() {
    title.value = '';
    price.value = '';
    count.value = '';
    category.value = '0';
    img.value = '';
    description.value = '';
    imagePreview.src = '../images/logo1.png';
    title.style.border = "";
    price.style.border = "";
    count.style.border = "";
    category.style.border = "";
    description.style.border = "";
    img.style.border = "";
    title_val.innerHTML = '';
    price_val.innerHTML = '';
    count_val.innerHTML = '';
    description_val.innerHTML = '';
    category_val.innerHTML = '';
    img_val.innerHTML = '';
}

function displayImage() {
    var input = document.getElementById('img');
    var file = input.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var imageData = e.target.result;
            // Display the image
            imagePreview.src = imageData;
        };
        reader.readAsDataURL(file);
    }
}
function showData() {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        if (dataPro[i].seller === logedinUser.id) {
            table += `
                <tr data-product-id="${dataPro[i].product_id}">
                    <td>${i + 1}</td>
                    <td>${dataPro[i].product_name}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].count}</td>
                    <td>${dataPro[i].category}</td>
                    <td><img src="${dataPro[i].product_img}" width="50px" height="50px"></td>
                    <td><button onclick="updateData(${i})" class="btn-style" style="width:100%" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" class="btn-style" style="width:100%" id="delete">delete</button></td>
                </tr>
            `;
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
img.addEventListener('change', displayImage);

function deleteData(i) {
    const productIdToDelete = dataPro[i].product_id;
    const indexToDelete = dataPro.findIndex(products => products.product_id === productIdToDelete);
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
                dataPro.splice(indexToDelete, 1); // Remove the item from the dataPro array
                localStorage.setItem('products', JSON.stringify(dataPro)); // Update the localStorage
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

var modal = document.getElementById("myModal");
var openModalBtn = document.getElementById("openModalBtn");
var closeModalBtn = document.getElementById("submit");

function openModal() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

function updateAndCloseModal() {
    let newPro = {
        product_name: title.value,
        price: price.value,
        count: count.value,
        description: description.value,
        category: category.value,
        product_img: imagePreview.src,
        seller: logedinUser.id,
        product_id: generateProductId()
    };
    if (
        titleRegex.test(title.value) &&
        title.value.trim() != '' &&
        numberRegex.test(price.value) &&
        numberRegex.test(count.value) &&
        category.value != '0' &&
        newPro.count < 100 &&
        img.value != ''
    ) {
        const indexToUpdate = dataPro.findIndex(product => dataPro[tmp] && product.product_id === dataPro[tmp].product_id);
        //const indexToUpdate = dataPro.findIndex(product => product.product_id === dataPro[tmp].product_id);
        if (indexToUpdate !== -1) {
            dataPro[indexToUpdate] = newPro; // Update the item in the dataPro array
            localStorage.setItem('products', JSON.stringify(dataPro)); // Update the localStorage
            showData();
        }
        mood = 'create';
        submit.innerHTML = 'Create';
       
        clearData();
    }
    showData();

    closeModal();
}
showData();
function updateData(i) {
    title.value = dataPro[i].product_name;
    price.value = dataPro[i].price;
    category.value = dataPro[i].category;
    description.value = dataPro[i].description,
        count.value = dataPro[i].count;
    imagePreview.src = dataPro[i].product_img;
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    openModal();
    closeModalBtn.removeEventListener("click", closeModal);
    closeModalBtn.addEventListener("click", function () {
    });
    scroll({
        top: 0,
        behavior: "smooth",
    });
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        clearData();
    }
}

let searchMood = 'title';
function getSearchMood(id) {
    let search = document.getElementById('search');
    if (id == 'searchTitle') {
        searchMood = 'title';
    } else {
        searchMood = 'category';
    }
    search.placeholder = 'Search By ' + searchMood;

    search.focus();
    search.value = '';
    showData();
}

function searchData(value) {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        if (dataPro[i].seller === logedinUser.id) {
            if (searchMood == 'title' && dataPro[i].product_name.toLowerCase().includes(value.toLowerCase())) {
                table += `
            <tr data-product-id="${dataPro[i].product_id}">
                <td>${i + 1}</td>
                <td>${dataPro[i].product_name}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].count}</td>
                <td>${dataPro[i].category}</td>
                <td><img src="${dataPro[i].product_img}" id="imgPreview" width="50px" height="50px"></td>
                <td><button onclick="updateData(${i})" class="btn-style" style="width:100%" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" class="btn-style" style="width:100%" id="delete">delete</button></td>
            </tr>
        `;
            } else if (searchMood == 'category' && dataPro[i].category.toLowerCase().includes(value.toLowerCase())) {
                table += `
            <tr data-product-id="${dataPro[i].id}">
                <td>${i + 1}</td>
                <td>${dataPro[i].product_name}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].count}</td>
                <td>${dataPro[i].category}</td>
                <td><img src="${dataPro[i].product_img}" id="imgPreview" width="50px" height="50px"></td>
                <td><button onclick="updateData(${i})" class="btn-style" style="width:100%" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" class="btn-style" style="width:100%" id="delete">delete</button></td>
            </tr>
        `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

function generateProductId() {
    return Date.now().toString();
}
