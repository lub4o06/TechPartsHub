const products = [
    // CPUs
    {
        id: 1,
        name: "AMD Ryzen 9 7950X",
        category: "cpu",
        price: 699.99,
        description: "16-core, 32-thread processor with boost up to 5.7GHz",
        image: "../assets/amd_ryzen_9_7950x.png"
    },
    {
        id: 2,
        name: "Intel Core i9-13900K",
        category: "cpu",
        price: 589.99,
        description: "24-core (8P+16E) processor with up to 5.8GHz boost",
        image: "../assets/intel_core_i913900k.png"
    },
    {
        id: 3,
        name: "Intel Core i7-13700K",
        category: "cpu",
        price: 409.99,
        description: "16-core (8P+8E) processor with up to 5.4GHz boost",
        image: "../assets/intel core i7 13700k.jpg"
    },

    // Motherboards
    {
        id: 4,
        name: "ASUS ROG STRIX Z790-F",
        category: "motherboard",
        price: 399.99,
        description: "Intel Z790 ATX gaming motherboard with PCIe 5.0 and WiFi 6E",
        image: "../assets/Asus ROg z7090.jpg"
    },
    {
        id: 5,
        name: "MSI MPG B650 EDGE WIFI",
        category: "motherboard",
        price: 239.99,
        description: "AMD B650 ATX motherboard with PCIe 4.0 and WiFi 6E",
        image: "../assets/Msi MPG B650.jpg"
    },
    {
        id: 6,
        name: "GIGABYTE X670E AORUS",
        category: "motherboard",
        price: 349.99,
        description: "AMD X670E ATX motherboard with PCIe 5.0 and WiFi 6E",
        image: "../assets/GIGABYTE X670E.jpg"
    },

    // Graphics Cards
    {
        id: 7,
        name: "NVIDIA GeForce RTX 4090",
        category: "gpu",
        price: 1599.99,
        description: "24GB GDDR6X, Ray Tracing, DLSS 3.0",
        image: "../assets/geforce-rtx-40-series-gpu-4090-ari.jpg"
    },
    {
        id: 8,
        name: "AMD Radeon RX 7900 XT",
        category: "gpu",
        price: 899.99,
        description: "20GB GDDR6, Ray Tracing, FSR 3.0",
        image: "../assets/RX 7900XT.png"
    },
    {
        id: 9,
        name: "NVIDIA GeForce RTX 4070 Ti",
        category: "gpu",
        price: 799.99,
        description: "12GB GDDR6X, Ray Tracing, DLSS 3.0",
        image: "../assets/rtx 4070.png"
    },

    // RAM
    {
        id: 10,
        name: "Corsair Vengeance RGB DDR5",
        category: "ram",
        price: 189.99,
        description: "32GB (2x16GB) DDR5-6000MHz CL30",
        image: "../assets/corsair_vengeance_rgb_black.png"
    },
    {
        id: 11,
        name: "G.Skill Trident Z5 RGB",
        category: "ram",
        price: 159.99,
        description: "32GB (2x16GB) DDR5-6400MHz CL32",
        image: "../assets/g.Skill 32gb.jpg"
    },
    {
        id: 12,
        name: "Crucial DDR5 Memory",
        category: "ram",
        price: 309.99,
        description: "64GB (2x32GB) DDR5-5600MHz CL40",
        image: "../assets/crucial 64gb kit.jpg"
    }
];

let cart = [];
let currentFilter = 'all';
let searchTerm = '';

const productsGrid = document.getElementById('products-grid');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const searchInput = document.getElementById('search-input');
const filterButtons = document.querySelectorAll('.filter-btn');
const cartButton = document.getElementById('cart-button');
const cartModal = document.getElementById('cart-modal');
const productModal = document.getElementById('product-modal');
const closeButtons = document.querySelectorAll('.close');

const cartIcon = document.querySelector('.cart-icon');

function displayProducts() {
    const filteredProducts = products.filter(product => {
        const matchesFilter = currentFilter === 'all' || product.category === currentFilter;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="view-details-btn" onclick="showProductDetails(${product.id})">View Details</button>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    const modalContent = document.querySelector('.product-detail-content');
    
    modalContent.innerHTML = `
        <div class="product-detail">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h2>${product.name}</h2>
                <p class="price">$${product.price.toFixed(2)}</p>
                <p class="description">${product.description}</p>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `;
    
    const productModal = document.getElementById('product-modal');
    productModal.style.display = 'block';
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartDisplay();
    
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = 'block';
    
    const productModal = document.getElementById('product-modal');
    if (productModal) {
        productModal.style.display = 'none';
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        }
    }
    updateCartDisplay();
}

function updateCartDisplay() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <p>Your cart is empty</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `).join('');
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

searchInput.addEventListener('input', (e) => {
    searchTerm = e.target.value;
    displayProducts();
});

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentFilter = button.dataset.category;
        displayProducts();
    });
});

cartButton.addEventListener('click', () => {
    cartModal.style.display = 'block';
});

closeButtons.forEach(button => {
    button.addEventListener('click', function() {
        const modal = this.closest('.modal');
        if (modal) {
            modal.style.display = 'none';
        }
    });
});

window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = 'login.html';
    }
    
    displayProducts();
});

cartIcon.addEventListener('click', () => {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = 'block';
});