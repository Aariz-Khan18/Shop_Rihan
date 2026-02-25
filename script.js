function toggleMenu() {
    if (window.innerWidth <= 768) {
        const nav = document.getElementById('navLinks');
        nav.classList.toggle('active');
    }
}

const productsData = [
    { category: "Suit (3 Piece)", name: "Suit (3 Piece)", img: "Photos/suit-3-piece.webp" },
    { category: "Pants & Shirt", name: "Formal", img: "Photos/formal.webp" },
    { category: "Blazer", name: "Blazer", img: "Photos/blazer.webp" },
    { category: "Kurta & Pajama", name: "Kurta & Pajama", img: "Photos/kurta-pajama.webp" },
    { category: "Indowestern", name: "Indowestern", img: "Photos/indowestern.webp" },
    { category: "Double Breasted", name: "Double Breasted", img: "Photos/double-breasted.webp" }
];

let currentCategory = 'All';

function renderProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = "";

    const filtered = currentCategory === 'All'
        ? productsData
        : productsData.filter(p => p.category === currentCategory);

    if (filtered.length === 0) {
        grid.innerHTML = "<p>No products found.</p>";
        return;
    }

    filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.img}" alt="${product.name}" loading="lazy">
            <h3 class="product-title">${product.name}</h3>
        `;
        grid.appendChild(card);
    });
}

function filterProducts(category, event) {
    if (event) {
        document.querySelectorAll('.filter-btn').forEach(btn =>
            btn.classList.remove('active')
        );
        event.target.classList.add('active');
    }

    currentCategory = category;
    renderProducts();
}

/* ================= REVIEWS ================= */

const reviewsData = [ /* your review data unchanged */ ];

let currentReviewIndex = 0;
const reviewsToShow = 3;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function renderNextReviews() {
    const container = document.getElementById('dynamic-reviews');
    container.classList.add('fade-out');

    setTimeout(() => {
        container.innerHTML = '';

        const isMobile = window.innerWidth <= 768;
        const displayCount = isMobile ? 1 : reviewsToShow;

        for (let i = 0; i < displayCount; i++) {
            if (currentReviewIndex >= reviewsData.length) {
                currentReviewIndex = 0;
                shuffleArray(reviewsData);
            }

            const review = reviewsData[currentReviewIndex];

            const card = document.createElement('div');
            card.className = 'review-box';
            card.innerHTML = `
                <div class="stars">${review.stars}</div>
                <p>"${review.text}"</p>
                <h4>- ${review.name}</h4>
            `;

            container.appendChild(card);
            currentReviewIndex++;
        }

        container.classList.remove('fade-out');
    }, 500);
}

window.addEventListener('load', () => {
    renderProducts();
    shuffleArray(reviewsData);
    renderNextReviews();
    setInterval(renderNextReviews, 5000);
});
