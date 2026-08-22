// js/products.js

import { addToCart } from './cart.js';

// 1. Define the product data using an Array of Objects
const products = [
    // FOOTWEAR
    {
        id: 1,
        name: "Running Shoes",
        category: "Footwear",
        price: 1599, originalPrice: 1999, discount: 20, rating: 5, reviews: 120,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80",
        colors: [
            { code: "#ff0000", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80" }, // Red
            { code: "#000000", img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=500&q=80" }, // Black
            { code: "#ffffff", img: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=500&q=80" }  // White
        ],
        sizes: ["6", "7", "8", "9", "10"]
    },
    {
        id: 11,
        name: "Casual Sneakers",
        category: "Footwear",
        price: 1299, originalPrice: 1599, discount: 15, rating: 4, reviews: 85,
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=500&q=80",
        colors: [
            { code: "#ffffff", img: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=500&q=80" },
            { code: "#000000", img: "https://images.unsplash.com/photo-1584735174965-48c48d7edce7?auto=format&fit=crop&w=500&q=80" },
            { code: "#ffdf00", img: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=500&q=80" }
        ],
        sizes: ["6", "7", "8", "9"]
    },
    {
        id: 12,
        name: "Leather Boots",
        category: "Footwear",
        price: 2999, originalPrice: 3499, discount: 14, rating: 5, reviews: 45,
        image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=500&q=80",
        colors: [
            { code: "#8b4513", img: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=500&q=80" }, // Brown
            { code: "#000000", img: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=500&q=80" }  // Black
        ],
        sizes: ["7", "8", "9", "10"]
    },

    // ELECTRONICS
    {
        id: 2,
        name: "Smart Watch",
        category: "Electronics",
        price: 2499, originalPrice: 2999, discount: 15, rating: 5, reviews: 98,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80",
        colors: [
            { code: "#000000", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80" },
            { code: "#cccccc", img: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=500&q=80" }
        ]
    },
    {
        id: 5,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 1799, originalPrice: 2199, discount: 18, rating: 5, reviews: 87,
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=500&q=80",
        colors: [
            { code: "#000000", img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=500&q=80" },
            { code: "#ffffff", img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=500&q=80" }
        ]
    },
    {
        id: 13,
        name: "Bluetooth Speaker",
        category: "Electronics",
        price: 1299, originalPrice: 1599, discount: 19, rating: 4, reviews: 150,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=500&q=80",
        colors: [
            { code: "#000000", img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=500&q=80" },
            { code: "#ff0000", img: "https://images.unsplash.com/photo-1589003071536-46c03beb5375?auto=format&fit=crop&w=500&q=80" }
        ]
    },
    {
        id: 14,
        name: "Gaming Mouse",
        category: "Electronics",
        price: 899, originalPrice: 1199, discount: 25, rating: 4, reviews: 310,
        image: "https://images.unsplash.com/photo-1593152167544-085d3b9c4938?auto=format&fit=crop&w=500&q=80",
        colors: [
            { code: "#000000", img: "https://images.unsplash.com/photo-1593152167544-085d3b9c4938?auto=format&fit=crop&w=500&q=80" },
            { code: "#ffffff", img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=500&q=80" }
        ]
    },

    // FASHION
    {
        id: 4,
        name: "Cotton T-Shirt",
        category: "Fashion",
        price: 699, originalPrice: 799, discount: 10, rating: 5, reviews: 156,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80",
        colors: [
            { code: "#ffffff", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80" },
            { code: "#000000", img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=500&q=80" },
            { code: "#0000ff", img: "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=500&q=80" }
        ],
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 6,
        name: "Casual Shirt",
        category: "Fashion",
        price: 899, originalPrice: 1099, discount: 12, rating: 4, reviews: 64,
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=500&q=80",
        colors: [
            { code: "#87ceeb", img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=500&q=80" },
            { code: "#ffffff", img: "https://images.unsplash.com/photo-1596755094514-f87e32f85e23?auto=format&fit=crop&w=500&q=80" }
        ],
        sizes: ["M", "L", "XL"]
    },
    {
        id: 15,
        name: "Denim Jacket",
        category: "Fashion",
        price: 1999, originalPrice: 2499, discount: 20, rating: 5, reviews: 210,
        image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=500&q=80",
        colors: [
            { code: "#0000ff", img: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=500&q=80" },
            { code: "#000000", img: "https://images.unsplash.com/photo-1559551409-dadc959f76b8?auto=format&fit=crop&w=500&q=80" }
        ],
        sizes: ["S", "M", "L", "XL"]
    },

    // ACCESSORIES
    {
        id: 3,
        name: "Leather Handbag",
        category: "Accessories",
        price: 1899, originalPrice: 2499, discount: 25, rating: 4, reviews: 75,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=500&q=80",
        colors: [
            { code: "#8b4513", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=500&q=80" },
            { code: "#000000", img: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=500&q=80" }
        ]
    },
    {
        id: 16,
        name: "Polarized Sunglasses",
        category: "Accessories",
        price: 999, originalPrice: 1499, discount: 33, rating: 5, reviews: 140,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=500&q=80",
        colors: [
            { code: "#000000", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=500&q=80" },
            { code: "#8b4513", img: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=500&q=80" }
        ]
    },

    // FURNITURE
    {
        id: 7,
        name: "Modern Sofa",
        category: "Furniture",
        price: 15999, originalPrice: 19999, discount: 20, rating: 5, reviews: 45,
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=500&q=80",
        colors: [
            { code: "#2d3748", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=500&q=80" },
            { code: "#e2e8f0", img: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=500&q=80" }
        ]
    },
    {
        id: 8,
        name: "Wooden Coffee Table",
        category: "Furniture",
        price: 4599, originalPrice: 5599, discount: 18, rating: 4, reviews: 32,
        image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=500&q=80",
        colors: [
            { code: "#8b4513", img: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=500&q=80" },
            { code: "#000000", img: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=500&q=80" }
        ]
    },
    {
        id: 17,
        name: "Office Chair",
        category: "Furniture",
        price: 5999, originalPrice: 7999, discount: 25, rating: 4, reviews: 88,
        image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=500&q=80",
        colors: [
            { code: "#000000", img: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=500&q=80" },
            { code: "#ffffff", img: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=500&q=80" }
        ]
    },

    // KITCHEN
    {
        id: 9,
        name: "Non-Stick Cookware Set",
        category: "Kitchen",
        price: 3499, originalPrice: 4499, discount: 22, rating: 5, reviews: 210,
        image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=500&q=80",
        colors: [
            { code: "#000000", img: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=500&q=80" },
            { code: "#b22222", img: "https://images.unsplash.com/photo-1546241072-48010ad2862c?auto=format&fit=crop&w=500&q=80" }
        ]
    },
    {
        id: 10,
        name: "Electric Blender",
        category: "Kitchen",
        price: 2199, originalPrice: 2899, discount: 24, rating: 4, reviews: 88,
        image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=500&q=80",
        colors: [
            { code: "#ffffff", img: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=500&q=80" },
            { code: "#000000", img: "https://images.unsplash.com/photo-1626806787426-5910811b6325?auto=format&fit=crop&w=500&q=80" }
        ]
    }
];

function generateStars(rating) {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        starsHTML += i <= rating ? '★' : '☆';
    }
    return starsHTML;
}

function renderProducts() {
    const productGrid = document.getElementById("product-grid");
    if (!productGrid) return;
    productGrid.innerHTML = "";

    products.forEach(product => {
        const article = document.createElement("article");
        article.className = "product-card";

        // Generate Color Swatches and attach data-img attribute
        let colorsHTML = '<div class="product-colors">';
        product.colors.forEach((colorObj, index) => {
            const checked = index === 0 ? "checked" : "";
            colorsHTML += `
                <label class="color-swatch" style="background-color: ${colorObj.code};" title="${colorObj.code}">
                    <input type="radio" class="color-radio" name="color-${product.id}" value="${colorObj.code}" data-img="${colorObj.img}" ${checked}>
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
                <img src="${product.colors[0].img}" alt="${product.name}" id="img-${product.id}">
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

        productGrid.appendChild(article);
    });

    // Color change Event Listeners for Homepage
    const colorRadios = document.querySelectorAll(".color-radio");
    colorRadios.forEach(radio => {
        radio.addEventListener("change", (e) => {
            // Get the new image URL from the clicked radio button
            const newImage = e.target.dataset.img;
            // Get the product ID from the radio button name (e.g., "color-1")
            const productId = e.target.name.split("-")[1];
            // Update the src of the image tag
            document.getElementById(`img-${productId}`).src = newImage;
        });
    });

    // Add to Cart Event Listeners
    const addButtons = document.querySelectorAll(".add-to-cart-btn");
    
    addButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const productId = parseInt(e.target.dataset.id);
            const product = products.find(p => p.id === productId);
            
            const selectedColorInput = document.querySelector(`input[name="color-${productId}"]:checked`);
            const selectedColor = selectedColorInput ? selectedColorInput.value : product.colors[0].code;
            
            // Get the correct image based on selected color
            const selectedImg = selectedColorInput ? selectedColorInput.dataset.img : product.colors[0].img;
            
            // Create a copy of the product and update its default image to the color-specific image
            const productToAdd = { ...product, image: selectedImg };

            addToCart(productToAdd, selectedColor, "N/A");
        });
    });
}

renderProducts();

export { products };
