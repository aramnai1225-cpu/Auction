fetch("/api/products")
.then(res => res.json())
.then(data => {
    let output = "";

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

    document.getElementById("products").innerHTML = output;
});

function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        name: name,
        price: price
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " added to cart");
}
function showCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let output = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += Number(item.price);

        output += `
        <div class="card">
            <h3>${item.name}</h3>
            <p>Price: €${item.price}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        </div>
        `;
    });

    if (document.getElementById("cartItems")) {
        document.getElementById("cartItems").innerHTML = output;
        document.getElementById("total").innerHTML = "Total: €" + total;
    }
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    showCart();
}

showCart();