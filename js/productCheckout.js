
window.addEventListener("load", function () {


    document.getElementById('submitButton').addEventListener('click', function (event) {


        let myData = {};
        let myAllData = [];
        var allValid = true;
        //check if cart is empty

        var form = document.getElementById('checkoutForm');
        var data = document.getElementsByTagName("input");
        var errormsg = document.getElementsByClassName("invalid-feedback");
        let inputField = document.getElementById("fn");
        let lnInputField = document.getElementById("ln");
        //to return field to the default style
        for (let i = 0; i < data.length; i++) {
            data[i].addEventListener('keyup', function () {
                if (/^[A-Za-z]{3,}$/.test(data[i].value.trim())) {
                    errormsg[i].innerText = "";
                    data[i].style.border = "1px solid black";
                    data[i].classList.add('is-valid');
                } else {
                  
                    data[i].style.border = "1px solid red";
                    form.classList.add('was-validated');
                    data[i].classList.add('is-invalid');

                    allValid = false;
                }
                if (data[i].id === "phone") {
                    if (/^(010|011|012)[0-9]{8}$/.test(data[i].value.trim())) {
                        data[i].style.border = "1px solid black";
                        data[i].classList.add('is-valid');
                    }
                }
                if (data[i].id === "email") {
                    if (/^[a-zA-Z0-9_.]{4,}@(yahoo|gmail|hotmail|outlook).(com|net|eg)$/.test(data[i].value.trim())) {
                        data[i].style.border = "1px solid black";
                        data[i].classList.add('is-valid');
                    }
                }
                if (data[i].id === "Expirtaion") {
                    if (/^[a-zA-Z0-9_.]{4,}@(yahoo|gmail|hotmail|outlook).(com|net|eg)$/.test(data[i].value.trim())) {
                        data[i].style.border = "1px solid black";
                        data[i].classList.add('is-valid');
                    }
                }
                if (data[i].id === "CVV") {
                    if (/^[0-9]{3,4}$/.test(data[i].value.trim())) {
                        data[i].style.border = "1px solid black";
                        data[i].classList.add('is-valid');
                        
                    }
                }
                if (data[i].id === "inputZip") {
                    if (/^[0-9]{4,5}$/.test(data[i].value.trim())) {
                        data[i].style.border = "1px solid black";
                        data[i].classList.add('is-valid');
                        
                    }
                }
                if (data[i].id === "fnCard") {
                    if (/^[A-Za-z]{3,}$/.test(data[i].value.trim())) {
                        data[i].style.border = "1px solid black";
                        data[i].classList.add('is-valid');
                        
                    }
                }


            });
        }
        for (let i = 0; i < data.length; i++) {
            if (data[i].value.trim() === "") {
                event.preventDefault();
                form.classList.add('was-validated');
                data[i].style.border = "1px red solid";
                data[i].classList.add('is-invalid');
                // Set the flag to false when a validation fails

            } else {
                data[i].style.border = "1px black solid";
            }
            //store fields in array
            var c = document.getElementsByTagName("label")[i].innerText;
            myData[c] = data[i].value;

        }
        //radio buttons
        var radioButtons = document.querySelectorAll('input[type="radio"]');
        var radioSelected = false;
        for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].checked) {
                radioSelected = true;
            }
            radioButtons[i].addEventListener("click", function () {
                document.getElementById("alertContainer").innerHTML = "";
            });
        }
        document.getElementById('Expirtaion').addEventListener("input", function (event) {
            var expirationInput = document.getElementById('Expirtaion');
            var expirationDate = new Date(expirationInput.value + "T00:00:00");
            var currentDate = new Date();
            if (expirationDate < currentDate) {
                expirationInput.setCustomValidity('Invalid expiration date');
                expirationInput.classList.add('is-invalid');
                allValid = false;
                event.preventDefault();
                console.log(expirationDate);
            } else {
                expirationInput.setCustomValidity('');
                expirationInput.classList.remove('is-invalid');
                expirationInput.style.border = "1px solid black";
            }
        });
        if (!radioSelected) {
            document.getElementById("alertContainer").innerHTML = `<div class="alert alert-danger">
            You must shoose the payment method
          </div>`;
            event.preventDefault();
            allValid = false;
        } else {
            document.getElementById("alertContainer").innerHTML = "";

        }
        function generateProductId() {
            return Date.now().toString();
        }
        var productId = [0];
        var numOfItems = [0];
        var sellers1 = [0];
        for (let i = 0; i < JSON.parse(localStorage.getItem("cartData")).length; i++) {
            productId[i] = JSON.parse(localStorage.getItem("cartData"))[i]['productId'];
            numOfItems[i] = JSON.parse(localStorage.getItem("cartData"))[i]['numOfItems'];
            sellers1[i] = JSON.parse(localStorage.getItem("cartData"))[i]['seller'];
        }
        let myData1 = {
            "First name": document.getElementById('fn').value,
            "Last name": document.getElementById('ln').value,
            "Email address": document.getElementById('email').value,
            "Phone Number": document.getElementById('phone').value,
            "Street address": document.getElementById('street').value,
            "Town/City": document.getElementById('inputCity').value,
            "Country/Region": document.getElementById('country').value,
            "Zip Code": document.getElementById('inputZip').value,
            "Name On Card": document.getElementById('fnCard').value,
            "Credit Card": document.getElementById('credit').value,
            "Expirtaion": document.getElementById('Expirtaion').value,
            "CVV": document.getElementById('CVV').value,
            "Order notes (optional)": document.getElementById('orderNotes').value,
            "Shipping address is the same as my billing address": document.getElementById('check1').checked,
            "Save this information for next time": document.getElementById('check2').checked,
            "Date of Order": new Date(),
            "status of order": "pending",
            "products total price ": JSON.parse(localStorage.getItem('totalPrice')),
            "quantity": JSON.parse(localStorage.getItem('cartData')),
            "productId": productId,
            "numOfItems": numOfItems,
            "sellers": sellers1,
            "Order Id": generateProductId(),
        };
        //

        var mCart = JSON.parse(localStorage.getItem("cartData"));
        if (!mCart || mCart.length === 0) {
            document.getElementById("alertContainer").innerHTML = `<div class="alert alert-danger">
            You Cart Is Empty Please add some items firstly!
          </div>`;
            allValid = false;
            console.log("sorry");
        }

        let existingData = localStorage.getItem("OrderData");
        if (existingData) {
            myAllData = JSON.parse(existingData);
        }
        myAllData.push(myData1)
        //finally all validation come true
        if (allValid) {
            function updateLocalStorageStock() {
                var myCart = JSON.parse(localStorage.getItem("cartData"));
                var mproducts = JSON.parse(localStorage.getItem("products"));
                //to reduce the selled product from our stock
                for (let i = 0; i < myCart.length; i++) {
                    let efg = myCart[i]["productId"];
                    //cout of selled items
                    let selledones = myCart[i]['numOfItems'];
                    console.log("id in cart : " + efg);
                    console.log("selled items " + selledones);

                    var productIdToFind = efg;

                    //corresponding id
                    var foundProduct = Object.values(mproducts).find(product => product.product_id == productIdToFind);
                    //total count
                    foundProduct['count'] -= selledones;
                }

                // Move this line outside the loop
                localStorage.setItem("products", JSON.stringify(mproducts));
            }
            updateLocalStorageStock();
            errormsg.innerText = "";
            //to store data in local storage
            localStorage.setItem("OrderData", JSON.stringify(myAllData));
            localStorage.removeItem("cartData");
            localStorage.removeItem("totalPrice");
            localStorage.removeItem("subTotal");
            Swal.fire({
                title: "succeeded!",
                text: "Your order has been successfully submitted, and we will stay in touch with you.",
                icon: "success",
                confirmButtonText: "OK"
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log("User clicked OK!");
                    window.location.href = '../index.html';
                    window.history.replaceState(null, null, '/path/to/redirect/page.html');
                }
            });
        }
    });
});