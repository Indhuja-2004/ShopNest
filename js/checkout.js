// js/checkout.js
import { getCart } from './cart.js';

function renderCheckoutItems() {
    const checkoutItemsContainer = document.getElementById("checkout-items");
    if (!checkoutItemsContainer) return;

    const cart = getCart();
    checkoutItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        checkoutItemsContainer.innerHTML = `<p style="padding: 10px; font-size: 16px;">Your cart is empty. Please add items before checking out.</p>`;
        updateCheckoutTotals(cart);
        return;
    }

    cart.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "order-item";

        // Generate Size HTML if it's not "N/A"
        let sizeHTML = '';
        if (item.selectedSize !== "N/A") {
            sizeHTML = `Size: ${item.selectedSize} `;
        }

        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="order-item-info">
                <h4>${item.name}</h4>
                <p>Price: ₹${item.price}</p>
                <p>${sizeHTML}Color: <span style="display:inline-block; width:10px; height:10px; background-color:${item.selectedColor}; border-radius:50%; border:1px solid #ccc; margin-right:3px;"></span> | Quantity: ${item.quantity}</p>
            </div>
        `;
        checkoutItemsContainer.appendChild(itemDiv);
    });

    updateCheckoutTotals(cart);
}

function updateCheckoutTotals(cart) {
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    const deliveryFee = subtotal > 0 && subtotal < 1000 ? 99 : 0;
    const tax = subtotal * 0.18;
    
    let discount = 0;
    if (subtotal > 5000) {
        discount = subtotal * 0.10; 
    }

    const finalTotal = (subtotal + deliveryFee + tax) - discount;

    const domSubtotal = document.getElementById("checkout-subtotal");
    const domDelivery = document.getElementById("checkout-delivery");
    const domTax = document.getElementById("checkout-tax");
    const domDiscount = document.getElementById("checkout-discount");
    const domTotal = document.getElementById("checkout-total");

    if (domSubtotal) domSubtotal.innerText = `₹${subtotal.toFixed(2)}`;
    if (domDelivery) domDelivery.innerText = `₹${deliveryFee.toFixed(2)}`;
    if (domTax) domTax.innerText = `₹${tax.toFixed(2)}`;
    if (domDiscount) domDiscount.innerText = `-₹${discount.toFixed(2)}`;
    if (domTotal) domTotal.innerText = `₹${finalTotal.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", () => {
    renderCheckoutItems();

    const submitBtn = document.querySelector(".checkout-submit-btn");
    if (submitBtn) {
        submitBtn.addEventListener("click", () => {
            const cart = getCart();
            if (cart.length === 0) {
                alert("Your cart is empty!");
                return;
            }
            
            // Save current cart as recent order to display on success page
            localStorage.setItem("shopnest_recent_order", JSON.stringify(cart));
            
            // Clear the actual cart
            localStorage.setItem("shopnest_cart", JSON.stringify([]));
            
            // Redirect to success page
            window.location.href = "order-success.html";
        });
    }
});
