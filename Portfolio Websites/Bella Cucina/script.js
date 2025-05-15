const menuData = {
    appetizers: [
        {
            id: 'app1',
            name: 'Bruschetta',
            description: 'Toasted bread topped with tomatoes, garlic, and fresh basil',
            price: 8.99,
            image: './assets/Bruschetta.jpg'
        },
        {
            id: 'app2',
            name: 'Caprese Salad',
            description: 'Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze',
            price: 10.99,
            image: './assets/Caprese Salad.jpg'
        },
        {
            id: 'app3',
            name: 'Calamari Fritti',
            description: 'Crispy fried calamari served with marinara sauce',
            price: 12.99,
            image: './assets/Calamari Fritti.jpg'
        },
        {
            id: 'app4',
            name: 'Antipasto Platter',
            description: 'Selection of Italian meats, cheeses, olives, and marinated vegetables',
            price: 15.99,
            image: './assets/Antipasto Platter.jpg'
        }
    ],
    pastas: [
        {
            id: 'pasta1',
            name: 'Spaghetti Carbonara',
            description: 'Classic carbonara with pancetta, egg, and pecorino cheese',
            price: 16.99,
            image: './assets/Spaghetti Carbonara.jpg'
        },
        {
            id: 'pasta2',
            name: 'Fettuccine Alfredo',
            description: 'Creamy fettuccine with parmesan cheese and butter',
            price: 15.99,
            image: './assets/Fettuccine Alfredo.jpg'
        },
        {
            id: 'pasta3',
            name: 'Lasagna Bolognese',
            description: 'Layers of pasta, rich meat sauce, and bechamel',
            price: 17.99,
            image: './assets/Lasagna Bolognese.avif'
        },
        {
            id: 'pasta4',
            name: 'Penne Arrabbiata',
            description: 'Spicy tomato sauce with garlic and red chili peppers',
            price: 14.99,
            image: './assets/Penne Arrabbiata.jpg'
        }
    ],
    pizzas: [
        {
            id: 'pizza1',
            name: 'Margherita',
            description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
            price: 13.99,
            image: './assets/Margherita.jpg'
        },
        {
            id: 'pizza2',
            name: 'Quattro Formaggi',
            description: 'Four cheese pizza with mozzarella, gorgonzola, fontina, and parmesan',
            price: 15.99,
            image: './assets/Quattro Formaggi.jpg'
        },
        {
            id: 'pizza3',
            name: 'Prosciutto & Arugula',
            description: 'Topped with prosciutto, arugula, and shaved parmesan',
            price: 16.99,
            image: './assets/Prosciutto & Arugula.jpg'
        },
        {
            id: 'pizza4',
            name: 'Diavola',
            description: 'Spicy pizza with tomato sauce, mozzarella, and spicy salami',
            price: 15.99,
            image: './assets/Diavola.jpg'
        }
    ],
    desserts: [
        {
            id: 'dessert1',
            name: 'Tiramisu',
            description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone',
            price: 8.99,
            image: './assets/Tiramisu.jpg'
        },
        {
            id: 'dessert2',
            name: 'Panna Cotta',
            description: 'Creamy vanilla custard with mixed berry compote',
            price: 7.99,
            image: './assets/Panna Cotta.jpg'
        },
        {
            id: 'dessert3',
            name: 'Cannoli',
            description: 'Crispy pastry shells filled with sweet ricotta cream and chocolate chips',
            price: 6.99,
            image: './assets/Cannoli.jpg'
        },
        {
            id: 'dessert4',
            name: 'Gelato Selection',
            description: 'Choice of three scoops: vanilla, chocolate, strawberry, or pistachio',
            price: 5.99,
            image: './assets/Gelato Selection.webp'
        }
    ]
};

// DOM Elements
const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const nav = document.getElementById('nav');
const menuTabs = document.querySelectorAll('.menu-tab');
const menuContent = document.getElementById('menuContent');
const testimonialSlider = document.getElementById('testimonialSlider');
const sliderNav = document.getElementById('sliderNav');
const orderMenu = document.getElementById('orderMenu');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const orderModal = document.getElementById('orderModal');
const closeOrderModal = document.getElementById('closeOrderModal');
const orderDetails = document.getElementById('orderDetails');
const deliveryForm = document.getElementById('deliveryForm');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');
const backToTop = document.getElementById('backToTop');
const toast = document.getElementById('toast');

// Cart Array
let cart = [];

// Active Tab
let activeCategory = 'appetizers';

// Initialize the page
function init() {
    // Load menu tabs
    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            menuTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            activeCategory = tab.dataset.category;
            loadMenuItems(activeCategory);
        });
    });

    // Load initial menu items
    loadMenuItems(activeCategory);

    // Load order menu
    loadOrderMenu();

    // Initialize testimonial slider
    initTestimonialSlider();

    // Event listeners
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    window.addEventListener('scroll', handleScroll);
    checkoutBtn.addEventListener('click', openOrderModal);
    closeOrderModal.addEventListener('click', closeModal);
    deliveryForm.addEventListener('submit', submitOrder);
    contactForm.addEventListener('submit', submitContactForm);
    newsletterForm.addEventListener('submit', submitNewsletterForm);

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === orderModal) {
            closeModal();
        }
    });
}

// Toggle Mobile Menu
function toggleMobileMenu() {
    nav.classList.toggle('active');
    mobileMenuBtn.textContent = nav.classList.contains('active') ? '✕' : '☰';
}

// Handle Scroll Events
function handleScroll() {
    // Header background
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Back to top button
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

// Load Menu Items
function loadMenuItems(category) {
    menuContent.innerHTML = '';
    menuData[category].forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-item-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="price">$${item.price.toFixed(2)}</div>
            </div>
        `;
        menuContent.appendChild(menuItem);
    });
}

// Initialize Testimonial Slider
function initTestimonialSlider() {
    const testimonials = testimonialSlider.querySelectorAll('.testimonial');
    
    // Create slider dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
        dot.dataset.index = index;
        dot.addEventListener('click', () => {
            setActiveTestimonial(index);
        });
        sliderNav.appendChild(dot);
    });

    // Auto slide
    let currentIndex = 0;
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        setActiveTestimonial(currentIndex);
    }, 5000);
}

// Set Active Testimonial
function setActiveTestimonial(index) {
    const testimonials = testimonialSlider.querySelectorAll('.testimonial');
    const dots = sliderNav.querySelectorAll('.slider-dot');
    
    testimonials.forEach(t => t.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
}

// Load Order Menu
function loadOrderMenu() {
    Object.keys(menuData).forEach(category => {
        const categoryContainer = document.createElement('div');
        categoryContainer.innerHTML = `
            <h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
            <div class="category-items" id="${category}Items"></div>
        `;
        orderMenu.appendChild(categoryContainer);

        const categoryItems = document.getElementById(`${category}Items`);
        
        menuData[category].forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            menuItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="menu-item-content">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="price">$${item.price.toFixed(2)}</div>
                    <button class="add-to-cart" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">Add to Cart</button>
                </div>
            `;
            categoryItems.appendChild(menuItem);
        });
    });

    // Add event listeners to add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Add to Cart
function addToCart(e) {
    const button = e.target;
    const id = button.dataset.id;
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);

    // Check if item is already in cart
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id,
            name,
            price,
            quantity: 1
        });
    }

    updateCart();
    showToast(`${name} added to cart`);
}

// Update Cart
function updateCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        cartTotal.textContent = 'Total: $0.00';
        return;
    }

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-quantity">
                <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn increase" data-id="${item.id}">+</button>
            </div>
            <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;

    // Add event listeners to quantity buttons
    document.querySelectorAll('.quantity-btn.decrease').forEach(button => {
        button.addEventListener('click', decreaseQuantity);
    });

    document.querySelectorAll('.quantity-btn.increase').forEach(button => {
        button.addEventListener('click', increaseQuantity);
    });
}

// Decrease Quantity
function decreaseQuantity(e) {
    const id = e.target.dataset.id;
    const item = cart.find(item => item.id === id);

    if (item.quantity > 1) {
        item.quantity--;
    } else {
        cart = cart.filter(item => item.id !== id);
    }

    updateCart();
}

// Increase Quantity
function increaseQuantity(e) {
    const id = e.target.dataset.id;
    const item = cart.find(item => item.id === id);
    item.quantity++;
    updateCart();
}

// Open Order Modal
function openOrderModal() {
    if (cart.length === 0) {
        showToast('Your cart is empty');
        return;
    }

    let total = 0;
    let orderDetailsHTML = '<h4>Order Summary</h4><ul>';
    
    cart.forEach(item => {
        orderDetailsHTML += `<li>${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</li>`;
        total += item.price * item.quantity;
    });
    
    orderDetailsHTML += `</ul><p><strong>Total: $${total.toFixed(2)}</strong></p>`;
    orderDetails.innerHTML = orderDetailsHTML;
    
    orderModal.classList.add('open');
}

// Close Modal
function closeModal() {
    orderModal.classList.remove('open');
}

// Submit Order
function submitOrder(e) {
    e.preventDefault();
    showToast('Your order has been placed successfully!');
    closeModal();
    cart = [];
    updateCart();
}

// Submit Contact Form
function submitContactForm(e) {
    e.preventDefault();
    showToast('Your message has been sent. We\'ll get back to you soon!');
    contactForm.reset();
}

// Submit Newsletter Form
function submitNewsletterForm(e) {
    e.preventDefault();
    showToast('Thank you for subscribing to our newsletter!');
    newsletterForm.reset();
}

// Show Toast Notification
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);