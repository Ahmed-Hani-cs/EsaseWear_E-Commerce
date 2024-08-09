function validateInput(input) {
    var inputValue = parseInt(input.value, 10);
    if (inputValue < 0 || inputValue > parseInt(input.max, 10) || isNaN(inputValue)) {
        input.value = input.min;
    }
}
const coupons = {
    "iti_5": 5,
    "iti_10": 10,
    "iti_15": 15,
    "iti_25": 25,
    "iti_50": 50
};

localStorage.setItem("coupons", JSON.stringify(coupons));
document.addEventListener("DOMContentLoaded", function () {
    let currentUserId = JSON.parse(localStorage.getItem("user"))?.id;
    let appliedCouponDiv = document.getElementById("appliedCoupon");
    let subtotalElement = document.getElementById("subtotal");
    let shippingElement = document.getElementById("shipping");
    let totalElement = document.getElementById("lastTotal");
    let applyCouponBtn = document.getElementById("applyCouponBtn");
    let couponCodeInput = document.getElementById("couponCode");
    let appliedCoupon = document.getElementById("appliedCoupon");
    let mTotal = 0;
    let subTotal = 0;
    let itemPrice = 0;

    if (currentUserId) {
        let cartData = JSON.parse(localStorage.getItem("cartData")) || [];
        let userCart = cartData.filter(item => item.userId === currentUserId);
        let cartBody = document.getElementById("cartBody");
        if (userCart.length > 0) {
            let productsData = JSON.parse(localStorage.getItem("products")) || {};

            userCart.forEach(function (cartItem) {
                var productId = cartItem.productId;
                
                if (cartItem.productId) {
                    let productIndex = -1;
                    for (let index = 0; index < productsData.length; index++) {
                        if (parseInt(productsData[index].product_id) === parseInt(productId)) {
                            productIndex = index;
                            break;
                        }
                    }

                    if (productIndex !== -1) {
                        let productDetails = productsData[productIndex];
                        if (productDetails) {
                            let totalPrice = parseFloat(productDetails.price) * parseInt(cartItem.numOfItems);
                            itemPrice = totalPrice;
                            let newRow = document.createElement("tr");
                            newRow.innerHTML = `
                                <td><a href="#" class="remove-item"><i class="fas fa-trash-alt"></i></a></td>
                                <td><img src="${productDetails.product_img}" alt="Cart Img"></td>
                                <td><h5>${productDetails.product_name}</h5></td>
                                <td><h5>$${productDetails.price}</h5></td>
                                <td><input class="w-50 pl-1" type="number" value="${cartItem.numOfItems}" min="1" max="5" oninput="validateInput(this)"  data-product-id="${productId}"></td>
                                <td><h5 class="totalPrice">$${totalPrice.toFixed(2)}</h5></td>
                                    `;
                            cartBody.appendChild(newRow);
                            let quantityInput = newRow.querySelector('input');
                            quantityInput.addEventListener('change', function () {
                                cartItem.numOfItems = parseInt(this.value);
                                totalPrice = parseFloat(productDetails.price) * parseInt(cartItem.numOfItems);
                                newRow.querySelector('.totalPrice').innerText = "$" + totalPrice.toFixed(2);
                                localStorage.setItem("cartData", JSON.stringify(cartData));
                                let initialSubtotal = calculateSubtotal();
                                subtotalElement.innerText = `$${initialSubtotal.toFixed(2)}`;
                                updateTotal();
                            });
                            let removeIcon = newRow.querySelector('.remove-item');
                            removeIcon.addEventListener('click', function (event) {
                                event.preventDefault();
                              
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
                                Swal.fire({
                                    title: "Are you sure?",
                                    text: "Do you want to delete this item from your cart?",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Yes, delete it!"
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        newRow.remove();
                                        cartData = cartData.filter(item => item.productId !== productId);
                                        localStorage.setItem("cartData", JSON.stringify(cartData));
                                        calculateSubtotal();
                                        updateTotal();
                                        location.reload();
                                        if(cartData.length < 1){
                                            shippingElement.innerText = "$0.00";
                                            cartBody.innerHTML = `<tr  height='30px'><td colspan="6">Your cart is empty</td></tr>`;
                                        }
                                        Toast.fire({
                                            icon: "Deleted",
                                            title: "the item has been deleted.",
                                            icon: "success"
                                        });
                                    }
                                });
                            });
                        }
                    }
                    else {
                        //console.warn("Product details not found for productId:", productId);
                    }
                }
            });
            function calculateSubtotal() {
                let subtotal = 0;
                let userCart = cartData.filter(item => item.userId === currentUserId);

                userCart.forEach(function (cartItem) {
                    let productId = cartItem.productId;
                    let productDetails = productsData[productId];
                    if (productDetails) {
                        subtotal += parseFloat(productDetails.price) * parseInt(cartItem.numOfItems);
                    }
                });
                subTotal = subtotal;
                subtotalElement.innerText = `$${subtotal.toFixed(2)}`;
                return subtotal;
            }

            let initialSubtotal = calculateSubtotal();
            subtotalElement.innerText = `$${initialSubtotal.toFixed(2)}`;
            updateTotal();
            applyCouponBtn.addEventListener('click', function () {
                let couponCode = couponCodeInput.value;
                const coupons = JSON.parse(localStorage.getItem("coupons")) || {};
                if (coupons.hasOwnProperty(couponCode)) {
                    appliedCoupon.innerHTML = `<h6 style='color:green' >Applied Coupon</h6>
                <p id="couponValue" style='color:green'>$${coupons[couponCode]}</p>`;
                    updateTotal();
                } else {
                    appliedCoupon.innerHTML = `<p style="color: red;">Invalid Coupon</p>
                <p id="couponValue" style='display:none'>$0</p>`;
                    updateTotal();
                }
            });
        } else {
            shippingElement.innerText = "$0.00";
            cartBody.innerHTML = `<tr  height='30px'><td colspan="6">Your cart is empty</td></tr>`;
        }
    } else {
        shippingElement.innerText = "$0.00";
        document.getElementById("cartBody").innerHTML = `<tr  height='30px'><td colspan="6">Please log in to view your cart</td></tr>`;
    }

    function updateTotal() {
        let subtotalElement = document.getElementById("subtotal");
        let shippingElement = document.getElementById("shipping");
        let couponValue = document.getElementById("couponValue") || { innerText: "$0" };

        if (subtotalElement && shippingElement) {
            let subtotal = parseFloat(subtotalElement.innerText.replace('$', '')) || 0;
            let shipping = parseFloat(shippingElement.innerText.replace('$', '')) || 0;
            let coupon = parseFloat(couponValue.innerText.replace('$', '')) || 0;
            let total = subtotal + shipping - coupon;
            totalElement.innerText = `$${total.toFixed(2)}`;
            mTotal = total;
        }
    }

    document.getElementById("k").addEventListener("click", function () {

        localStorage.setItem('totalPrice', mTotal);
        localStorage.setItem('subTotal', subTotal);
        var alertContent = document.getElementById("AlertEmptyCart");
        var cartCurrentData = JSON.parse(localStorage.getItem("cartData"))||[];
        if (cartCurrentData.length < 1) {
            alertContent.innerHTML = `<div class="alert alert-danger">
        You can't Proceed to checkout Your cart is Empty!
    </div>`;
            setTimeout(function () {
                alertContent.classList.add("hidden");
            }, 3000);
        } else {
            window.location.href = 'checkout.html';
        }
    });
});
