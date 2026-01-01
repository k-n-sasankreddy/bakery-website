const products = [
    {
        id: 1,
        name: "Chocolate Brownie",
        price: 250,
        desc: "Rich, fudgy brownie with Belgian chocolate",
        image: "https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=500&h=400&fit=crop"
    },
    {
        id: 2,
        name: "Red Velvet Cake",
        price: 450,
        desc: "Classic red velvet with cream cheese frosting",
        image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=500&h=400&fit=crop"
    },
    {
        id: 3,
        name: "Croissant",
        price: 120,
        desc: "Buttery, flaky French croissant",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&h=400&fit=crop"
    },
    {
        id: 4,
        name: "Blueberry Muffin",
        price: 150,
        desc: "Moist muffin bursting with fresh blueberries",
        image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=500&h=400&fit=crop"
    },
    {
        id: 5,
        name: "Sourdough Bread",
        price: 200,
        desc: "Artisan sourdough with perfect crust",
        image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=500&h=400&fit=crop"
    },
    {
        id: 6,
        name: "Apple Pie",
        price: 350,
        desc: "Homestyle apple pie with cinnamon",
        image: "https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=500&h=400&fit=crop"
    },
    {
        id: 7,
        name: "Chocolate Eclair",
        price: 180,
        desc: "Light choux pastry with chocolate glaze",
        image: "https://images.unsplash.com/photo-1616534900864-45d0da88d9bd?w=700&auto=format&fit=crop&q=60"
    },
    {
        id: 8,
        name: "Lemon Tart",
        price: 280,
        desc: "Tangy lemon curd in buttery pastry",
        image: "https://images.unsplash.com/photo-1543508185-225c92847541?w=700&auto=format&fit=crop&q=60"
    }
];

let cart = [];

// Page Navigation
function showPage(pageName) {
    document.querySelectorAll(".page").forEach(p =>
        p.classList.remove("active")
    );
    document.getElementById(pageName).classList.add("active");

    if (pageName === "menu") displayProducts();
    if (pageName === "cart") displayCart();
}

// Display Products
function displayProducts() {
    const grid = document.getElementById("productsGrid");

    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" class="product-image" alt="${product.name}">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-desc">${product.desc}</p>
                <p class="product-price">₹${product.price}</p>
                <button class="add-to-cart"
                        onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join("");
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const item = cart.find(i => i.id === productId);

    if (item) {
        item.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartCount();
    alert(`${product.name} added to cart!`);
}

// Cart Count
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cartCount").textContent = count;
}

// Display Cart
function displayCart() {
    const cartContainer = document.getElementById("cartItems");

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty</h3>
                <p>Add some delicious treats from our menu!</p>
                <button class="btn" onclick="showPage('menu')">
                    Browse Menu
                </button>
            </div>
        `;
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    cartContainer.innerHTML = `
        ${cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" class="cart-item-image">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>₹${item.price} × ${item.quantity}</p>
                </div>
                <div class="cart-item-actions">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `).join("")}

        <div class="cart-summary">
            <h2>Total: ₹${total}</h2>
            <button class="btn">Proceed to Checkout</button>
        </div>
    `;
}

// Quantity Update
function updateQuantity(id, change) {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
        removeFromCart(id);
    } else {
        updateCartCount();
        displayCart();
    }
}

// Remove Item
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartCount();
    displayCart();
}

// Contact Form
function handleSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value ;
    const message = document.getElementById('message').value;
    
    // Get current date and time
    const now = new Date();
    const dateTime = now.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    // Create contact data string
    const contactData = `
=================================================
ARTISAN BAKERY - CONTACT FORM SUBMISSION
=================================================

Date & Time: ${dateTime}

Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}

=================================================
`;
    
    // Save to localStorage
    saveContactSubmission(contactData);
    
    // Create downloadable text file
    downloadContactData(contactData, `contact_${Date.now()}.txt`);
    
    alert("Thank you for your message! We will get back to you soon.\n\nYour contact information has been saved and downloaded.");
    e.target.reset();
}

// Save contact submission to localStorage
function saveContactSubmission(data) {
    const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    submissions.push({
        timestamp: Date.now(),
        data: data
    });
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
}

// Download contact data as text file
function downloadContactData(data, filename) {
    const blob = new Blob([data], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}
// Initialize
displayProducts();

