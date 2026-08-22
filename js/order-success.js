// js/order-success.js

document.addEventListener("DOMContentLoaded", () => {
    const recentOrderData = localStorage.getItem("shopnest_recent_order");
    let cart = [];
    if (recentOrderData) {
        cart = JSON.parse(recentOrderData);
    }

    if (cart.length === 0) {
        // If there's no order data, redirect back to shop
        window.location.href = "products.html";
        return;
    }

    // Generate random order number
    const orderNumber = "GR" + Math.floor(100000 + Math.random() * 900000);
    document.getElementById("success-order-number").innerText = orderNumber;

    // Set Estimated Arrival date (5 days from now)
    const today = new Date();
    today.setDate(today.getDate() + 5);
    const options = { month: 'short', day: '2-digit', year: 'numeric' };
    document.getElementById("success-arrival").innerText = today.toLocaleDateString('en-US', options);

    // Get Payment Method if available (defaulting to Credit Card for this demo)
    const urlParams = new URLSearchParams(window.location.search);
    const paymentMethod = urlParams.get('method') || 'Credit Card / Online';
    document.getElementById("success-payment-method").innerText = paymentMethod;

    // Render Products
    const productsContainer = document.getElementById("success-products-container");
    let productsHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        let sizeText = item.selectedSize !== "N/A" ? ` | Size: ${item.selectedSize}` : '';
        productsHTML += `
            <div class="success-product-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="spi-info">
                    <h4>${item.name}</h4>
                    <p style="font-size: 13px; color: #666; margin-top: 5px;">
                        Color: <span style="display:inline-block; width:10px; height:10px; background-color:${item.selectedColor}; border-radius:50%; border:1px solid #ccc; margin-right:3px;"></span> ${sizeText} 
                        <br> Qty: ${item.quantity}
                    </p>
                </div>
                <div class="spi-price">
                    ₹${(item.price * item.quantity).toFixed(2)}
                </div>
            </div>
        `;
    });
    productsContainer.innerHTML = productsHTML;

    // Render Totals
    const deliveryFee = subtotal > 0 && subtotal < 1000 ? 99 : 0;
    const tax = subtotal * 0.18;
    let discount = 0;
    if (subtotal > 5000) {
        discount = subtotal * 0.10; 
    }
    const finalTotal = (subtotal + deliveryFee + tax) - discount;

    const totalsContainer = document.getElementById("success-totals-container");
    totalsContainer.innerHTML = `
        <div class="st-row">
            <span>Subtotal</span>
            <span>₹${subtotal.toFixed(2)}</span>
        </div>
        <div class="st-row">
            <span>Tax (18%)</span>
            <span>₹${tax.toFixed(2)}</span>
        </div>
        ${discount > 0 ? `
        <div class="st-row" style="color: #e53935;">
            <span>Discount (10%)</span>
            <span>-₹${discount.toFixed(2)}</span>
        </div>` : ''}
        <div class="st-row">
            <span>Delivery</span>
            <span>${deliveryFee === 0 ? 'Free' : '₹' + deliveryFee.toFixed(2)}</span>
        </div>
        <div class="st-row st-grand-total">
            <span>Total</span>
            <span>₹${finalTotal.toFixed(2)}</span>
        </div>
    `;

    // Download PDF Action (Mock)
    const downloadBtn = document.querySelector(".download-receipt-btn");
    if (downloadBtn) {
        downloadBtn.addEventListener("click", () => {
            alert("Receipt downloading feature is simulated in this demo.");
        });
    }
});
