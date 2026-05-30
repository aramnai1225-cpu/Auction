// =====================================================
// FETCH PRODUCTS FROM MYSQL DATABASE
// =====================================================

// This fetch request gets product data from the backend API.
fetch("/api/products")
.then(res => res.json())
.then(data => {

    let output = "";

    // Loop through all products from the database
    data.forEach(product => {

        output += `
        <div class="card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: €${product.price}</p>

            <button class="bid-btn"
            onclick="addToCart('${product.name}', ${product.price})">
                Add to Cart
            </button>
        </div>
        `;
    });

    // Display database products only if the products container exists
    if (document.getElementById("products")) {
        document.getElementById("products").innerHTML = output;
    }
})
.catch(err => {
    console.log("Products could not be loaded:", err);
});


// =====================================================
// ADD PRODUCT TO CART
// =====================================================

function addToCart(name, price) {

    // Get existing cart data from localStorage or create empty array
    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    // Create cart item object
    let item = {
        name: name,
        price: price
    };

    // Add item to cart
    cart.push(item);

    // Save updated cart back to localStorage
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert(name + " added to cart");
}


// =====================================================
// SHOW CART ITEMS
// =====================================================

function showCart() {

    // Get cart data from localStorage
    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    let output = "";
    let total = 0;

    // Loop through cart items and calculate total
    cart.forEach((item, index) => {

        total += Number(item.price);

        output += `
        <div class="card">
            <h3>${item.name}</h3>
            <p>Price: €${item.price}</p>
            <button onclick="removeFromCart(${index})">
                Remove
            </button>
        </div>
        `;
    });

    // Display cart only if cart container exists
    if (document.getElementById("cartItems")) {
        document.getElementById("cartItems").innerHTML = output;
    }

    // Display total only if total element exists
    if (document.getElementById("total")) {
        document.getElementById("total").innerHTML =
            "Total: €" + total;
    }
}


// =====================================================
// REMOVE ITEM FROM CART
// =====================================================

function removeFromCart(index) {

    // Get cart data
    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    // Remove selected item
    cart.splice(index, 1);

    // Save updated cart
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    // Refresh cart display
    showCart();
}


// =====================================================
// SAVE REGISTRATION TO MYSQL DATABASE
// =====================================================

function saveRegistration() {

    // Get values from the registration form
    let fullname =
        document.getElementById("name").value;

    let email =
        document.getElementById("email").value;

    let phone =
        document.getElementById("phone").value;

    let auctionType =
        document.getElementById("type").value;

    let password =
        document.getElementById("password").value;

    // Validation patterns
    let namePattern = /^[A-Za-z\s]+$/;
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let phonePattern = /^\d{8,10}$/;

    // Full name validation
    if (!namePattern.test(fullname)) {
        alert("Full Name must contain only letters.");
        return;
    }

    // Email validation
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Phone validation
    if (!phonePattern.test(phone)) {
        alert("Phone Number must contain 8-10 digits.");
        return;
    }

    // Auction type validation
    if (auctionType === "") {
        alert("Please select an auction type.");
        return;
    }

    // Password validation
    if (password === "") {
        alert("Please enter a password.");
        return;
    }

    // Send registration data to backend API
    fetch("/api/register", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            fullname: fullname,
            email: email,
            phone: phone,
            auctionType: auctionType
        })
    })

    .then(res => res.json())

    .then(data => {

        // Show success message
        document.getElementById("message").innerHTML =
            "✅ Registration saved successfully!";

        // Clear form after saving
        document.getElementById("registerForm").reset();
    })

    .catch(err => {
        console.log(err);
        alert("Registration failed.");
    });
}


// =====================================================
// CONTACT FORM VALIDATION
// =====================================================

function validateForm() {

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    let phone = document.getElementById("phone").value;

    let namePattern = /^[A-Za-z\s]+$/;
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let phonePattern = /^\d{8,10}$/;

    if (!namePattern.test(name)) {
        alert("Name must contain only letters.");
        return false;
    }

    if (!emailPattern.test(email)) {
        alert("Invalid email address.");
        return false;
    }

    if (!phonePattern.test(phone)) {
        alert("Phone number must contain only digits.");
        return false;
    }

    if (message === "") {
        alert("Please enter your message.");
        return false;
    }

    alert("Form submitted successfully!");
    return true;
}


// =====================================================
// FILTER AUCTION ITEMS ON INFORMATION PAGE
// =====================================================

function filterItems() {

    let input =
        document.getElementById("searchInput").value.toUpperCase();

    let cards =
        document.getElementsByClassName("list");

    for (let i = 0; i < cards.length; i++) {

        let text = cards[i].innerText;

        if (text.toUpperCase().indexOf(input) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}


// =====================================================
// AUCTION BID SIMULATION
// =====================================================

let currentBid = 7500;
let timeLeft = 30;

function increaseBid() {

    currentBid += 100;

    if (document.getElementById("bidPrice")) {
        document.getElementById("bidPrice").innerHTML =
            currentBid;
    }

    timeLeft = 30;
}

// Auction countdown timer
setInterval(function () {

    if (document.getElementById("timer")) {

        timeLeft--;

        document.getElementById("timer").innerHTML =
            timeLeft;

        if (timeLeft <= 0) {

            alert(
                "Auction ended!\nSold for €" + currentBid
            );

            timeLeft = 30;
        }
    }

}, 1000);


// Show cart when cart page loads
showCart();