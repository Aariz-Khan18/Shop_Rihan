function toggleMenu() {
    if (window.innerWidth <= 768) {
        const nav = document.getElementById('navLinks');
        nav.classList.toggle('active');
    }
}

const productsData = [
    { category: "Suit (3 Piece)", name: "Suit (3 Piece)", img: "Photos/Suit (3 Piece).webp?auto=format&fit=crop&w=600&q=80" },
    { category: "Pants & Shirt", name: "Formal", img: "Photos/Formal.webp?auto=format&fit=crop&w=600&q=80" },
    { category: "Blazer", name: "Blazer", img: "Photos/Blazer.webp?auto=format&fit=crop&w=600&q=80" },
    { category: "Kurta & Pajama", name: "Kurta & Pajama", img: "Photos/Kurta & Pajama.webp?auto=format&fit=crop&w=600&q=80" },
    { category: "Indowestern", name: "Indowestern", img: "Photos/Indowestern.webp?auto=format&fit=crop&w=600&q=80" }
    { category: "Double Breasted", name: "Double Breasted", img: "Photos/Double Breasted.webp?auto=format&fit=crop&w=600&q=80" }
];

let currentCategory = 'All';

function renderProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = ""; 

    const filtered = currentCategory === 'All' 
        ? productsData 
        : productsData.filter(p => p.category === currentCategory);

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
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
    }
    currentCategory = category;
    renderProducts();
}

const reviewsData = [
    { name: "Suresh Rajput", stars: "★★★★★", text: "Mr. Malik's knowledge of premium fabrics is excellent. The 3-piece suit fits perfectly across the shoulders." },
    { name: "Rahul Verma", stars: "★★★★★", text: "Stitched my Indowestern for a friend's wedding here. It looks straight out of a premium designer boutique." },
    { name: "Amit Yadav", stars: "★★★★★", text: "Finally a tailor in Datia who understands the modern tailored cut for blazers. Highly impressed." },
    { name: "Deepak Tiwari", stars: "★★★★☆", text: "Timely delivery is their best quality. Got my pants and shirts stitched in just 3 days." },
    { name: "Rohan Yadav", stars: "★★★★★", text: "I only trust Malik Tailors for my formal wear. The Raymond fabric quality they provide is unmatched." },
    { name: "Vineet Dangi", stars: "★★★★★", text: "Best finishing in Datia. The inner lining and button work on their suits are top-class." },
    { name: "Faizan Khan", stars: "★★★★☆", text: "Good fitting for Kurta Pajama. Was a day late due to wedding season rush, but the stitching was worth the wait." },
    { name: "Manish Sharma", stars: "★★★★★", text: "Mr. Malik is a magician with fabrics. My office pants and shirts fit flawlessly." },
    { name: "Kapil Mishra", stars: "★★★★☆", text: "Premium collection of Siyaram fabrics available here. Stitching is very solid." },
    { name: "Ankit Jain", stars: "★★★★★", text: "The Jodhpuri suit I got made is fantastic. Everyone asked me where I bought it from." },
    { name: "Sameer Ali", stars: "★★★★★", text: "Best place for authentic Italian fabric and perfect measurements. No alterations needed." },
    { name: "Vikram Singh", stars: "★★★★☆", text: "Very polite behavior by Mr. Malik. Great formal wear options." },
    { name: "Yashwant Patel", stars: "★★★★★", text: "Got my wedding tuxedo stitched. Absolute perfection and zero stress. Thank you!" },
    { name: "Imran Qureshi", stars: "★★★★★", text: "My Kurta and Pajama fitting is exactly how I wanted. Traditional look with a modern cut." },
    { name: "Neeraj Kushwaha", stars: "★★★★☆", text: "Excellent collection of J-Hampstead. The stitching cost is highly reasonable for this premium quality." },
    { name: "Saurabh Gupta", stars: "★★★★★", text: "No need to go to big cities like Gwalior or Jhansi. Mr. Malik provides top-class tailoring right here in Datia." },
    { name: "Abhishek Dubey", stars: "★★★★★", text: "The velvet blazer was a hit at the party. Thanks to Malik Tailors for the suggestion." },
    { name: "Harshit Sen", stars: "★★★★☆", text: "Good fabric options. The waist fitting of the trousers is very comfortable for daily office wear." },
    { name: "Farhan Shaikh", stars: "★★★★★", text: "Their Indo-western collection is very trendy. The embroidery work on the collar was a nice touch." },
    { name: "Nitin Chouhan", stars: "★★★★★", text: "From fabric selection to final trial, the experience was seamless. 10/10 recommended." }
];

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

window.onload = () => {
    renderProducts();
    shuffleArray(reviewsData);
    renderNextReviews();
    setInterval(renderNextReviews, 5000); 
};

