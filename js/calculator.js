

// ==========================================
// 1. STANDARD CALCULATOR LOGIC
// ==========================================

// DOM Elements
const display = document.getElementById("calc-display");
const keys = document.querySelectorAll(".calc-btn");

// Calculator State Variables
let currentInput = "0";
let previousInput = null;
let operator = null;
let awaitingNextNumber = false;

// Function to update the display text
function updateDisplay(value) {
    // Basic error handling for length to prevent overflow
    if (value.length > 12) {
        display.value = value.substring(0, 12);
    } else {
        display.value = value;
    }
}

// Function to perform math calculations safely (No eval!)
function calculate(n1, op, n2) {
    const num1 = parseFloat(n1);
    const num2 = parseFloat(n2);

    // If either value is not a valid number, return the first number
    if (isNaN(num1) || isNaN(num2)) return n1;

    switch (op) {
        case "+": return (num1 + num2).toString();
        case "-": return (num1 - num2).toString();
        case "*": return (num1 * num2).toString();
        case "/": 
            // Basic error handling: Prevent division by zero
            if (num2 === 0) return "Error";
            return (num1 / num2).toString();
        case "%": 
            return (num1 % num2).toString();
        default: 
            return n2;
    }
}

// Add Event Listeners to all calculator buttons using forEach
keys.forEach(button => {
    button.addEventListener("click", (e) => {
        // Destructuring: Get 'action' and 'val' from dataset (data-action, data-val)
        const { action, val } = e.target.dataset;
        
        // If data-val is not present, fallback to the button's inner text
        const btnValue = val || e.target.innerText;

        // If it's a number or decimal (no action specified)
        if (!action) {
            if (currentInput === "0" || currentInput === "Error" || awaitingNextNumber) {
                // Replace 0 with the number, or start a new number
                currentInput = btnValue;
                awaitingNextNumber = false;
            } else {
                // Prevent multiple decimals in a single number
                if (btnValue === "." && currentInput.includes(".")) return;
                currentInput += btnValue;
            }
            updateDisplay(currentInput);
            return;
        }

        // If it's the Clear button (C)
        if (action === "clear") {
            currentInput = "0";
            previousInput = null;
            operator = null;
            awaitingNextNumber = false;
            updateDisplay(currentInput);
            return;
        }

        // If it's the Delete button (DEL)
        if (action === "delete") {
            if (currentInput === "Error") {
                currentInput = "0";
            } else if (currentInput.length > 1) {
                // Remove the last character
                currentInput = currentInput.slice(0, -1);
            } else {
                currentInput = "0";
            }
            updateDisplay(currentInput);
            return;
        }

        // If it's an operator (+, -, *, /, %)
        if (action === "operator") {
            if (operator && !awaitingNextNumber && previousInput) {
                // Chaining operators (e.g., 5 + 5 + 2)
                currentInput = calculate(previousInput, operator, currentInput);
                updateDisplay(currentInput);
            }
            previousInput = currentInput;
            operator = btnValue;
            awaitingNextNumber = true;
            return;
        }

        // If it's the Equals button (=)
        if (action === "calculate") {
            if (operator && previousInput) {
                // Calculate and update
                currentInput = calculate(previousInput, operator, currentInput);
                updateDisplay(currentInput);
                
                // Reset state for the next calculation
                previousInput = null;
                operator = null;
                awaitingNextNumber = true;
            }
            return;
        }
    });
});


// ==========================================
// 2. SHOPPING CALCULATOR LOGIC
// ==========================================

// DOM Elements for Shopping Calculator
const shopBtn = document.getElementById("calculate-shopping-btn");
const resultBox = document.getElementById("shopping-result-box");

const resSubtotal = document.getElementById("res-subtotal");
const resDiscount = document.getElementById("res-discount");
const resTax = document.getElementById("res-tax");
const resTotal = document.getElementById("res-total");

// Add Event Listener for the Calculate button
shopBtn.addEventListener("click", () => {
    
    // 1. Get input values and convert them to Numbers strictly
    // If the input is empty, Number() returns 0. The || 0 ensures a fallback.
    const price = Number(document.getElementById("shop-price").value);
    const qty = Number(document.getElementById("shop-qty").value);
    const discountPercent = Number(document.getElementById("shop-discount").value) || 0;
    const taxPercent = Number(document.getElementById("shop-tax").value) || 0;

    // Reset error messages (hide them initially)
    document.querySelectorAll(".error-msg").forEach(msg => msg.style.display = "none");

    let hasError = false;

    // 2. Validate user input (Basic error handling)
    if (price <= 0 || isNaN(price)) {
        document.getElementById("err-price").style.display = "block";
        hasError = true;
    }
    if (qty <= 0 || isNaN(qty)) {
        document.getElementById("err-qty").style.display = "block";
        hasError = true;
    }
    if (discountPercent < 0 || discountPercent > 100) {
        document.getElementById("err-discount").style.display = "block";
        hasError = true;
    }
    if (taxPercent < 0) {
        document.getElementById("err-tax").style.display = "block";
        hasError = true;
    }

    // Stop execution if there's any error
    if (hasError) {
        resultBox.style.display = "none";
        return;
    }

    // 3. Perform Calculations using standard arithmetic
    const subtotal = price * qty;
    
    // Calculate how much discount is applied
    const discountAmount = (subtotal * discountPercent) / 100;
    const priceAfterDiscount = subtotal - discountAmount;
    
    // Calculate how much tax is applied
    const taxAmount = (priceAfterDiscount * taxPercent) / 100;
    
    // Calculate final total
    const finalTotal = priceAfterDiscount + taxAmount;

    // 4. Update the DOM with the rounded values using toFixed(2)
    // toFixed(2) is a Number method that rounds to 2 decimal places and returns a string
    resSubtotal.innerText = `₹${subtotal.toFixed(2)}`;
    resDiscount.innerText = `- ₹${discountAmount.toFixed(2)}`;
    resTax.innerText = `+ ₹${taxAmount.toFixed(2)}`;
    resTotal.innerText = `₹${finalTotal.toFixed(2)}`;

    // Show the result box with smooth transition (managed via CSS display property)
    resultBox.style.display = "block";
});
