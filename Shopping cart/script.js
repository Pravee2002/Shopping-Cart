document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Product 1', price: 10.00, image: 'images/product1.jpg' },
        { id: 2, name: 'Product 2', price: 20.00, image: 'images/product2.webp' },
        { id: 3, name: 'Product 3', price: 30.00, image: 'images/product3.jpg' },
        { id: 4, name: 'Product 4', price: 40.00, image: 'images/product4.webp' }
    ];

    const productList = document.getElementById('product-list');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const cartItems = document.getElementById('cart-items');

    let cart = [];

    function renderProducts() {
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>$${product.price.toFixed(2)}</p>
                <button data-id="${product.id}">Add to Cart</button>
            `;
            productList.appendChild(productElement);
        });
    }

    function updateCart() {
        cartCount.textContent = cart.length;
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotal.textContent = total.toFixed(2);
        renderCartItems();
    }

    function renderCartItems() {
        cartItems.innerHTML = '';
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <span>${item.name} - $${item.price.toFixed(2)}</span>
                <button data-index="${index}">Remove</button>
            `;
            cartItems.appendChild(cartItem);
        });
    }

    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.push(product);
            updateCart();
        }
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }

    productList.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const productId = parseInt(event.target.getAttribute('data-id'));
            addToCart(productId);
        }
    });

    cartItems.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const index = parseInt(event.target.getAttribute('data-index'));
            removeFromCart(index);
        }
    });

    renderProducts();
});
