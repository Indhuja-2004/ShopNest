// js/product-details.js

import { products } from './products.js';
import { addToCart } from './cart.js';

function generateStars(rating) {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        starsHTML += i <= rating ? '★' : '☆';
    }
    return starsHTML;
}

const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));
const mainProduct = products.find(p => p.id === productId);

// ==========================================
// RENDER MAIN PRODUCT DETAILS
// ==========================================
function renderMainProduct() {
    const container = document.getElementById("product-detail-container");
    
    if (!mainProduct) {
        container.innerHTML = `<h2 style="text-align:center; padding: 50px;">Product not found!</h2>`;
        return;
    }

    document.getElementById("page-title").innerText = `${mainProduct.name} - ShopNest`;

    // Updated to use colorObj (code and img)
    let colorsHTML = '<div class="product-colors" style="margin: 15px 0;">';
    mainProduct.colors.forEach((colorObj, index) => {
        const checked = index === 0 ? "checked" : "";
        colorsHTML += `
            <label class="color-swatch" style="background-color: ${colorObj.code}; width: 30px; height: 30px;" title="${colorObj.code}">
                <input type="radio" class="main-color-radio" name="main-color" value="${colorObj.code}" data-img="${colorObj.img}" ${checked}>
            </label>
        `;
    });
    colorsHTML += '</div>';

    let sizesHTML = '';
    if (mainProduct.sizes) {
        sizesHTML += `
        <div class="product-option" style="margin-top: 20px;">
            <h3>Select Size</h3>
            <div class="size-options" style="display:flex; gap:10px; margin-top:10px;">
        `;
        mainProduct.sizes.forEach((size, index) => {
            const checked = index === 0 ? "checked" : "";
            sizesHTML += `
                <label style="cursor:pointer;">
                    <input type="radio" name="main-size" value="${size}" ${checked} style="display:none;">
                    <span style="display:inline-block; padding:8px 12px; border:1px solid #cbd5e1; border-radius:4px; font-weight:bold;">${size}</span>
                </label>
            `;
        });
        sizesHTML += `</div></div>`;
    }

    const style = document.createElement('style');
    style.innerHTML = `
        input[name="main-size"]:checked + span {
            background-color: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
        }
    `;
    document.head.appendChild(style);

    container.innerHTML = `
        <div class="product-details-layout">
            <div class="product-details-image">
                <span class="details-badge">${mainProduct.discount}% OFF</span>
                <img src="${mainProduct.colors[0].img}" alt="${mainProduct.name}" id="main-product-img">
            </div>

            <div class="product-details-info">
                <p class="product-category">${mainProduct.category}</p>
                <h1>${mainProduct.name}</h1>

                <div class="details-rating">
                    <span>${generateStars(mainProduct.rating)}</span>
                    <small>${mainProduct.rating} out of 5 (${mainProduct.reviews} Reviews)</small>
                </div>

                <div class="details-price">
                    <strong>₹${mainProduct.price}</strong>
                    <del>₹${mainProduct.originalPrice}</del>
                    <span>${mainProduct.discount}% OFF</span>
                </div>
                
                <p class="product-description" style="margin-bottom: 20px;">
                    Experience premium quality and amazing design with the ${mainProduct.name}. 
                    Perfectly suited for everyday use.
                </p>

                <h3>Select Color</h3>
                ${colorsHTML}
                
                ${sizesHTML}

                <div class="product-actions" style="margin-top: 30px;">
                    <button class="add-cart-btn" id="main-add-to-cart-btn" style="flex:1; padding: 15px; font-size:16px; font-weight:bold; background:var(--primary-color); color:white; border:none; border-radius:8px; cursor:pointer;">
                        🛒 Add to Cart
                    </button>
                </div>
                
                <div class="product-features" style="display:flex; gap:20px; margin-top:30px; border-top:1px solid #eee; padding-top:20px;">
                    <div>🚚 <span>Free Delivery</span></div>
                    <div>🔄 <span>Easy Returns</span></div>
                    <div>🔒 <span>Secure Payment</span></div>
                </div>
            </div>
        </div>
    `;

    // Dynamic Image Swapping for Main Product
    const mainColorRadios = document.querySelectorAll(".main-color-radio");
    mainColorRadios.forEach(radio => {
        radio.addEventListener("change", (e) => {
            const newImage = e.target.dataset.img;
            document.getElementById("main-product-img").src = newImage;
        });
    });

    const mainAddBtn = document.getElementById("main-add-to-cart-btn");
    mainAddBtn.addEventListener("click", () => {
        const selectedColorInput = document.querySelector(`input[name="main-color"]:checked`);
        const selectedColor = selectedColorInput ? selectedColorInput.value : mainProduct.colors[0].code;
        const selectedImg = selectedColorInput ? selectedColorInput.dataset.img : mainProduct.colors[0].img;
        
        let selectedSize = "N/A";
        if (mainProduct.sizes) {
            const sizeInput = document.querySelector(`input[name="main-size"]:checked`);
            if (sizeInput) selectedSize = sizeInput.value;
        }

        const productToAdd = { ...mainProduct, image: selectedImg };
        addToCart(productToAdd, selectedColor, selectedSize);
    });
}

// ==========================================
// RENDER RELATED PRODUCTS
// ==========================================
function renderRelatedProducts() {
    const grid = document.getElementById("related-products-grid");
    if (!mainProduct || !grid) return;

    const relatedProducts = products
        .filter(p => p.category === mainProduct.category && p.id !== mainProduct.id)
        .slice(0, 8);
        
    if (relatedProducts.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center;">No related products found.</p>`;
        return;
    }

    relatedProducts.forEach(product => {
        const article = document.createElement("article");
        article.className = "product-card";

        let colorsHTML = '<div class="product-colors">';
        product.colors.forEach((colorObj, index) => {
            const checked = index === 0 ? "checked" : "";
            colorsHTML += `
                <label class="color-swatch" style="background-color: ${colorObj.code};" title="${colorObj.code}">
                    <input type="radio" class="related-color-radio" name="color-${product.id}" value="${colorObj.code}" data-img="${colorObj.img}" ${checked}>
                </label>
            `;
        });
        colorsHTML += '</div>';

        let sizesHTML = '';
        if (product.sizes) {
            sizesHTML = `<p style="font-size:12px; color:#555; margin-bottom:5px;">Sizes: ${product.sizes.join(", ")}</p>`;
        }

        article.innerHTML = `
            <div class="product-image">
                <span class="product-badge">${product.discount}% OFF</span>
                <img src="${product.colors[0].img}" alt="${product.name}" id="related-img-${product.id}">
            </div>
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3>${product.name}</h3>
                
                ${colorsHTML}
                ${sizesHTML}

                <div class="rating">
                    ${generateStars(product.rating)} <span>(${product.reviews})</span>
                </div>
                <div class="price">
                    <strong>₹${product.price}</strong>
                    <del>₹${product.originalPrice}</del>
                </div>
                
                <div class="product-actions">
                    <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                    <a href="product-details.html?id=${product.id}" class="product-btn-outline" style="flex:1; text-align:center;">View</a>
                </div>
            </div>
        `;

        grid.appendChild(article);
    });

    // Dynamic Image Swapping for Related Products
    const relatedColorRadios = document.querySelectorAll(".related-color-radio");
    relatedColorRadios.forEach(radio => {
        radio.addEventListener("change", (e) => {
            const newImage = e.target.dataset.img;
            const productId = e.target.name.split("-")[1];
            document.getElementById(`related-img-${productId}`).src = newImage;
        });
    });

    // Add to Cart for Related Products
    const relatedAddBtns = grid.querySelectorAll(".add-to-cart-btn");
    relatedAddBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const productId = parseInt(e.target.dataset.id);
            const product = products.find(p => p.id === productId);
            
            const selectedColorInput = document.querySelector(`input[name="color-${productId}"]:checked`);
            const selectedColor = selectedColorInput ? selectedColorInput.value : product.colors[0].code;
            const selectedImg = selectedColorInput ? selectedColorInput.dataset.img : product.colors[0].img;

            const productToAdd = { ...product, image: selectedImg };
            addToCart(productToAdd, selectedColor, "N/A");
        });
    });
}

renderMainProduct();
renderRelatedProducts();
