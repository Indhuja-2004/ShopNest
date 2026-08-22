// js/cart.js

export function getCart() {
    const savedCart = localStorage.getItem("shopnest_cart");
    return savedCart ? JSON.parse(savedCart) : [];
}

export function saveCart(cartArray) {
    localStorage.setItem("shopnest_cart", JSON.stringify(cartArray));
}

// Updated to accept selectedSize
export function addToCart(product, selectedColor, selectedSize = "N/A") {
    const cart = getCart();
    
    // Now check if same ID, Color, AND Size is already in the cart!
    const existingItemIndex = cart.findIndex(item => 
        item.id === product.id && 
        item.selectedColor === selectedColor &&
        item.selectedSize === selectedSize
    );

    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            selectedColor: selectedColor,
            selectedSize: selectedSize,
            quantity: 1
        });
    }

    saveCart(cart);
    let alertMsg = `${product.name} (Color: ${selectedColor}`;
    if (selectedSize !== "N/A") alertMsg += `, Size: ${selectedSize}`;
    alertMsg += `) added to cart successfully!`;
    alert(alertMsg);
}

// ==========================================
// 2. CART PAGE UI RENDERING
// ==========================================
function renderCart() {
    const cartContainer = document.getElementById("cart-items-container");
    if (!cartContainer) return;

    const cart = getCart();
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = `<p style="padding: 20px; font-size: 18px;">Your cart is entirely empty. Go add some amazing products!</p>`;
        updateCartTotals(cart);
        appendContinueShopping(cartContainer);
        return;
    }

    cart.forEach((item, index) => {
        const article = document.createElement("article");
        article.className = "cart-item";

        // Generate Size HTML if it's not "N/A"
        let sizeHTML = '';
        if (item.selectedSize !== "N/A") {
            sizeHTML = `<span style="margin-left: 10px; font-size: 13px; color: #555;">Size: <strong>${item.selectedSize}</strong></span>`;
        }

        article.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            
            <div class="cart-item-info">
                <p class="product-category">${item.category || 'Product'}</p>
                <h3>${item.name}</h3>
                <p style="font-size: 13px; color: #555; margin-bottom: 5px;">
                    Color: <span style="display:inline-block; width:12px; height:12px; background-color:${item.selectedColor}; border-radius:50%; border:1px solid #ccc; vertical-align:middle;"></span>
                    ${sizeHTML}
                </p>
                <p class="cart-price">₹${item.price}</p>
                
                <div style="display: flex; align-items: center; gap: 10px; margin-top: 10px;">
                    <button class="qty-btn minus-btn" data-index="${index}">-</button>
                    <strong>${item.quantity}</strong>
                    <button class="qty-btn plus-btn" data-index="${index}">+</button>
                </div>
            </div>
            
            <button type="button" class="remove-btn" data-index="${index}">
                Remove
            </button>
        `;

        cartContainer.appendChild(article);
    });

    appendContinueShopping(cartContainer);
    attachCartEvents();
    updateCartTotals(cart);
}

function appendContinueShopping(container) {
    const link = document.createElement("a");
    link.href = "products.html";
    link.className = "continue-shopping";
    link.innerHTML = "&larr; Continue Shopping";
    container.appendChild(link);
}

function attachCartEvents() {
    const cart = getCart();

    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            saveCart(cart);
            renderCart();
        });
    });

    document.querySelectorAll('.plus-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            cart[index].quantity += 1;
            saveCart(cart);
            renderCart();
        });
    });

    document.querySelectorAll('.minus-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
                saveCart(cart);
                renderCart();
            } else {
                cart.splice(index, 1);
                saveCart(cart);
                renderCart();
            }
        });
    });
}

function updateCartTotals(cart) {
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

    const domSubtotal = document.getElementById("summary-subtotal");
    const domDelivery = document.getElementById("summary-delivery");
    const domTax = document.getElementById("summary-tax");
    const domDiscount = document.getElementById("summary-discount");
    const domTotal = document.getElementById("summary-total");

    if (domSubtotal) domSubtotal.innerText = `₹${subtotal.toFixed(2)}`;
    if (domDelivery) domDelivery.innerText = `₹${deliveryFee.toFixed(2)}`;
    if (domTax) domTax.innerText = `₹${tax.toFixed(2)}`;
    if (domDiscount) domDiscount.innerText = `-₹${discount.toFixed(2)}`;
    if (domTotal) domTotal.innerText = `₹${finalTotal.toFixed(2)}`;
}

renderCart();
