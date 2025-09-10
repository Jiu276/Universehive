// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Products Data
const productsData = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        category: "electronics",
        price: 299,
        originalPrice: 399,
        rating: 4.5,
        reviews: 324,
        image: "https://cdn.pixabay.com/photo/2018/09/17/14/27/headphones-3683983_1280.jpg",
        description: "Experience crystal-clear audio with active noise cancellation and 30-hour battery life.",
        features: [
            "Active Noise Cancellation",
            "30-hour battery life",
            "Premium leather ear cushions",
            "Foldable design",
            "Bluetooth 5.0"
        ],
        badge: "Editor's Choice"
    },
    {
        id: 2,
        name: "Smartwatch Pro 2025",
        category: "gadgets",
        price: 449,
        rating: 5.0,
        reviews: 512,
        image: "https://cdn.pixabay.com/photo/2019/08/26/22/02/apple-watch-4437290_1280.jpg",
        description: "Advanced health tracking, GPS, and 7-day battery life in a sleek design.",
        features: [
            "Heart rate monitoring",
            "GPS tracking",
            "7-day battery life",
            "Water resistant",
            "Sleep tracking"
        ],
        badge: "Hot"
    }
    // Add more products as needed
];

// Sort functionality
const sortSelect = document.getElementById('sortSelect');
sortSelect?.addEventListener('change', (e) => {
    const sortValue = e.target.value;
    sortProducts(sortValue);
});

function sortProducts(sortBy) {
    const productCards = Array.from(document.querySelectorAll('.product-card'));
    const container = document.querySelector('.products-grid');
    
    productCards.sort((a, b) => {
        switch(sortBy) {
            case 'rating':
                const ratingA = parseFloat(a.dataset.rating || '0');
                const ratingB = parseFloat(b.dataset.rating || '0');
                return ratingB - ratingA;
            case 'price-low':
                const priceA = parseFloat(a.dataset.price || '0');
                const priceB = parseFloat(b.dataset.price || '0');
                return priceA - priceB;
            case 'price-high':
                const priceAHigh = parseFloat(a.dataset.price || '0');
                const priceBHigh = parseFloat(b.dataset.price || '0');
                return priceBHigh - priceAHigh;
            case 'newest':
                return b.dataset.id - a.dataset.id;
            default:
                return 0;
        }
    });
    
    productCards.forEach(card => {
        container.appendChild(card);
        card.style.animation = 'fadeIn 0.5s ease';
    });
}

// Search functionality
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

function searchProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        const productDesc = card.querySelector('.product-description').textContent.toLowerCase();
        
        if (productName.includes(searchTerm) || productDesc.includes(searchTerm)) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

searchBtn?.addEventListener('click', searchProducts);
searchInput?.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        searchProducts();
    }
});

// Category filtering
const categoryLinks = document.querySelectorAll('.dropdown-menu a[data-category]');
categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const category = link.dataset.category;
        filterByCategory(category);
    });
});

function filterByCategory(category) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

// Load more products
const loadMoreBtn = document.querySelector('.btn-load-more');
let currentProductCount = 9;

loadMoreBtn?.addEventListener('click', () => {
    // Simulate loading more products
    const productsGrid = document.querySelector('.products-grid');
    
    for (let i = 0; i < 3; i++) {
        const randomProduct = productsData[Math.floor(Math.random() * productsData.length)];
        const newCard = createProductCard(randomProduct);
        productsGrid.appendChild(newCard);
    }
    
    currentProductCount += 3;
    
    // Hide button if enough products loaded
    if (currentProductCount >= 18) {
        loadMoreBtn.style.display = 'none';
    }
});

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.category = product.category;
    card.dataset.rating = product.rating;
    card.dataset.price = product.price;
    card.dataset.id = product.id;
    
    card.innerHTML = `
        ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-overlay">
                <button class="btn-view-details">View Details</button>
            </div>
        </div>
        <div class="product-content">
            <h3>${product.name}</h3>
            <div class="product-rating">
                <div class="stars">
                    ${generateStars(product.rating)}
                </div>
                <span>${product.rating} (${product.reviews} reviews)</span>
            </div>
            <p class="product-description">${product.description}</p>
            <div class="product-price">
                <span class="current-price">$${product.price}</span>
                ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
            </div>
            <div class="product-actions">
                <a href="#" class="btn-primary">Read Review</a>
                <a href="#" class="btn-secondary">Buy Now</a>
            </div>
        </div>
    `;
    
    card.style.animation = 'fadeIn 0.5s ease';
    return card;
}

function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// View Details Modal
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-view-details')) {
        e.preventDefault();
        const productCard = e.target.closest('.product-card');
        showProductModal(productCard);
    }
});

function showProductModal(productCard) {
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    
    const productName = productCard.querySelector('h3').textContent;
    const productImage = productCard.querySelector('.product-image img').src;
    const productRating = productCard.querySelector('.product-rating').innerHTML;
    const productPrice = productCard.querySelector('.product-price').innerHTML;
    const productDescription = productCard.querySelector('.product-description').textContent;
    
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-body">
                <img src="${productImage}" alt="${productName}" class="modal-image">
                <div class="modal-info">
                    <h2>${productName}</h2>
                    <div class="modal-rating">
                        ${productRating}
                    </div>
                    <div class="modal-price">
                        ${productPrice}
                    </div>
                    <p class="modal-description">${productDescription}</p>
                    <div class="modal-features">
                        <h3>Key Features</h3>
                        <ul>
                            <li>Premium build quality</li>
                            <li>Latest technology</li>
                            <li>Extended warranty</li>
                            <li>Free shipping</li>
                            <li>30-day return policy</li>
                        </ul>
                    </div>
                    <div class="product-actions">
                        <a href="#" class="btn-primary">Read Full Review</a>
                        <a href="#" class="btn-secondary">Buy Now</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
    
    // Close modal
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
    });
}

// Category cards click
const categoryCards = document.querySelectorAll('.category-card');
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const categoryName = card.querySelector('h3').textContent.toLowerCase().replace(' ', '-');
        // Scroll to products and filter by category
        document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
        // You can add filtering logic here based on the category
    });
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Initialize product data attributes
document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        // Extract rating from stars
        const ratingText = card.querySelector('.product-rating span')?.textContent;
        const rating = ratingText ? parseFloat(ratingText.match(/[\d.]+/)?.[0] || '0') : 0;
        card.dataset.rating = rating;
        
        // Extract price
        const priceText = card.querySelector('.current-price')?.textContent;
        const price = priceText ? parseFloat(priceText.replace(/[^0-9.]/g, '')) : 0;
        card.dataset.price = price;
        
        // Set ID
        card.dataset.id = index + 1;
    });
});