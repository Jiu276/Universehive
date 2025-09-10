// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Search Functionality
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const blogGrid = document.getElementById('blogGrid');

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const articles = document.querySelectorAll('.blog-card');
    
    articles.forEach(article => {
        const title = article.querySelector('h3').textContent.toLowerCase();
        const content = article.querySelector('p').textContent.toLowerCase();
        const category = article.dataset.category;
        
        if (title.includes(searchTerm) || content.includes(searchTerm) || category.includes(searchTerm)) {
            article.style.display = 'block';
            article.style.animation = 'fadeIn 0.5s ease';
        } else {
            article.style.display = 'none';
        }
    });
}

searchBtn?.addEventListener('click', performSearch);
searchInput?.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Category Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const blogCards = document.querySelectorAll('.blog-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        blogCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Dropdown Category Links
const categoryLinks = document.querySelectorAll('.dropdown-menu a[data-category]');
categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const category = link.dataset.category;
        
        // Find and click the corresponding filter button
        const filterBtn = document.querySelector(`.filter-btn[data-filter="${category}"]`);
        if (filterBtn) {
            filterBtn.click();
            // Scroll to blog section
            document.querySelector('.blog-section').scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Pagination
const pageButtons = document.querySelectorAll('.page-btn');
let currentPage = 1;
const articlesPerPage = 9;

function updatePagination() {
    const allArticles = Array.from(document.querySelectorAll('.blog-card:not([style*="display: none"])'));
    const totalPages = Math.ceil(allArticles.length / articlesPerPage);
    
    // Hide all articles
    allArticles.forEach(article => article.style.display = 'none');
    
    // Show articles for current page
    const start = (currentPage - 1) * articlesPerPage;
    const end = start + articlesPerPage;
    const currentArticles = allArticles.slice(start, end);
    
    currentArticles.forEach(article => {
        article.style.display = 'block';
        article.style.animation = 'fadeIn 0.5s ease';
    });
    
    // Update page buttons
    pageButtons.forEach((btn, index) => {
        if (btn.querySelector('i')) return; // Skip arrow buttons
        
        btn.classList.toggle('active', parseInt(btn.textContent) === currentPage);
    });
}

pageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.disabled) return;
        
        if (btn.querySelector('.fa-chevron-left')) {
            if (currentPage > 1) {
                currentPage--;
                updatePagination();
            }
        } else if (btn.querySelector('.fa-chevron-right')) {
            currentPage++;
            updatePagination();
        } else {
            currentPage = parseInt(btn.textContent);
            updatePagination();
        }
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

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    // Simulate subscription
    alert(`Thank you for subscribing with email: ${email}`);
    e.target.reset();
});

// Smooth Scroll for Hero Button
const heroButton = document.querySelector('.hero .btn-primary');
heroButton?.addEventListener('click', () => {
    document.querySelector('.blog-section').scrollIntoView({ 
        behavior: 'smooth' 
    });
});

// Social Widget Toggle
const widgetToggle = document.querySelector('.widget-toggle');
const widgetLinks = document.querySelector('.widget-links');

widgetToggle?.addEventListener('click', () => {
    widgetLinks.style.opacity = widgetLinks.style.opacity === '1' ? '0' : '1';
    widgetLinks.style.visibility = widgetLinks.style.visibility === 'visible' ? 'hidden' : 'visible';
});

// Remove lazy loading to prevent images from disappearing
// All images will load normally

// Article Data
const articleData = [
    {
        id: 1,
        title: "Quantum Computing: Breaking New Boundaries",
        category: "Technology",
        author: "Sarah Chen",
        date: "August 15, 2025",
        image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
        content: `
            <p>Quantum computing represents one of the most significant technological breakthroughs of our time. Unlike classical computers that use bits (0s and 1s), quantum computers use quantum bits or qubits, which can exist in multiple states simultaneously through a phenomenon called superposition.</p>
            
            <h3>The Power of Quantum Supremacy</h3>
            <p>In 2025, we're witnessing unprecedented advances in quantum computing capabilities. Major tech companies and research institutions have achieved quantum supremacy in various practical applications, from drug discovery to financial modeling.</p>
            
            <h3>Real-World Applications</h3>
            <ul>
                <li><strong>Drug Discovery:</strong> Simulating molecular interactions at unprecedented scales</li>
                <li><strong>Cryptography:</strong> Developing unbreakable encryption methods</li>
                <li><strong>Climate Modeling:</strong> Processing vast amounts of environmental data</li>
                <li><strong>Artificial Intelligence:</strong> Accelerating machine learning algorithms</li>
            </ul>
            
            <h3>Challenges and Opportunities</h3>
            <p>Despite remarkable progress, quantum computing still faces significant challenges. Maintaining quantum coherence, reducing error rates, and scaling up the number of qubits remain active areas of research. However, recent breakthroughs in error correction and quantum networking are paving the way for more stable and powerful quantum systems.</p>
            
            <h3>The Future Landscape</h3>
            <p>As we move forward, quantum computing will likely coexist with classical computing, each handling tasks best suited to their strengths. The hybrid approach promises to unlock solutions to problems previously thought impossible to solve.</p>
        `
    },
    {
        id: 2,
        title: "Mindful Living: A Guide to Daily Wellness",
        category: "Lifestyle",
        author: "Emma Wilson",
        date: "July 28, 2025",
        image: "https://cdn.pixabay.com/photo/2015/07/02/10/23/training-828741_1280.jpg",
        content: `
            <p>In our fast-paced digital world, mindful living has become more important than ever. It's about being present in the moment, aware of our thoughts and feelings without judgment, and making conscious choices that align with our values.</p>
            
            <h3>Morning Rituals for Mindfulness</h3>
            <p>Starting your day with intention sets the tone for everything that follows. Consider incorporating these practices:</p>
            <ul>
                <li>5-minute meditation upon waking</li>
                <li>Gratitude journaling</li>
                <li>Mindful breathing exercises</li>
                <li>Digital-free first hour</li>
            </ul>
            
            <h3>Integrating Mindfulness at Work</h3>
            <p>The workplace can be a source of stress, but mindfulness techniques can transform your professional life. Take regular breaks to stretch, practice the Pomodoro Technique, and create boundaries between work and personal time.</p>
            
            <h3>Evening Wind-Down Practices</h3>
            <p>Quality sleep is essential for wellbeing. Establish an evening routine that includes turning off screens an hour before bed, gentle yoga or stretching, and perhaps some light reading or calming music.</p>
            
            <h3>The Science Behind Mindfulness</h3>
            <p>Research shows that regular mindfulness practice can reduce cortisol levels, improve immune function, and increase gray matter in brain regions associated with learning, memory, and emotional regulation.</p>
        `
    },
    {
        id: 3,
        title: "Digital Marketing Trends That Define 2025",
        category: "Business",
        author: "Michael Torres",
        date: "June 10, 2025",
        image: "https://images.pexels.com/photos/67112/pexels-photo-67112.jpeg",
        content: `
            <p>The digital marketing landscape of 2025 is dramatically different from just a few years ago. AI-driven personalization, immersive experiences, and ethical marketing practices are now at the forefront of successful strategies.</p>
            
            <h3>AI-Powered Personalization</h3>
            <p>Artificial Intelligence has revolutionized how brands connect with consumers. Predictive analytics and machine learning algorithms now enable hyper-personalized content delivery, ensuring each customer receives relevant messages at the optimal time.</p>
            
            <h3>The Rise of Interactive Content</h3>
            <p>Static content is becoming obsolete. Brands are investing in:</p>
            <ul>
                <li>Augmented Reality (AR) product trials</li>
                <li>Interactive infographics and calculators</li>
                <li>Gamified learning experiences</li>
                <li>Virtual Reality (VR) brand experiences</li>
            </ul>
            
            <h3>Voice Search Optimization</h3>
            <p>With smart speakers in nearly every home, optimizing for voice search has become crucial. Natural language processing and conversational keywords are now essential components of SEO strategies.</p>
            
            <h3>Sustainability Marketing</h3>
            <p>Consumers increasingly support brands that demonstrate genuine commitment to environmental and social causes. Transparency, authenticity, and measurable impact are key to successful sustainability marketing.</p>
        `
    },
    {
        id: 4,
        title: "Tropical Paradise: Best Islands to Visit",
        category: "Travel",
        author: "Lisa Anderson",
        date: "May 22, 2025",
        image: "https://cdn.pixabay.com/photo/2017/03/05/00/34/panorama-2117310_1280.jpg",
        content: `
            <p>Escape to paradise with our guide to the world's most stunning tropical islands. From pristine beaches to vibrant coral reefs, these destinations offer the perfect blend of relaxation and adventure.</p>
            
            <h3>Maldives: Luxury Redefined</h3>
            <p>The Maldives continues to set the standard for luxury island getaways. With overwater bungalows, world-class diving sites, and unparalleled service, it's the ultimate romantic destination.</p>
            
            <h3>Bali: Cultural Paradise</h3>
            <p>Beyond its famous beaches, Bali offers rich cultural experiences, ancient temples, terraced rice fields, and a thriving wellness scene. The island perfectly balances tradition with modern comfort.</p>
            
            <h3>Seychelles: Nature's Masterpiece</h3>
            <p>Home to unique granite formations, endemic species, and some of the world's most photographed beaches, Seychelles is a UNESCO World Heritage paradise.</p>
            
            <h3>Hidden Gems to Explore</h3>
            <ul>
                <li><strong>Faroe Islands:</strong> Dramatic cliffs and untouched nature</li>
                <li><strong>Palawan, Philippines:</strong> Underground rivers and lagoons</li>
                <li><strong>Cook Islands:</strong> Polynesian culture and pristine reefs</li>
                <li><strong>Azores, Portugal:</strong> Volcanic landscapes and whale watching</li>
            </ul>
            
            <h3>Sustainable Island Tourism</h3>
            <p>As travelers, we must protect these paradises. Choose eco-friendly accommodations, respect local cultures, and participate in conservation efforts to ensure these islands remain pristine for future generations.</p>
        `
    },
    {
        id: 5,
        title: "Superfoods: Nature's Nutritional Powerhouses",
        category: "Health",
        author: "Dr. James Park",
        date: "April 15, 2025",
        image: "https://cdn.pixabay.com/photo/2016/08/11/08/04/vegetables-1584999_1280.jpg",
        content: `
            <p>Superfoods have gained immense popularity, and for good reason. These nutrient-dense foods pack powerful health benefits that can transform your diet and overall wellbeing.</p>
            
            <h3>Top Superfoods of 2025</h3>
            <p>Recent research has highlighted these nutritional champions:</p>
            <ul>
                <li><strong>Moringa:</strong> Contains all essential amino acids and powerful antioxidants</li>
                <li><strong>Black Garlic:</strong> Aged garlic with enhanced antioxidant properties</li>
                <li><strong>Sea Buckthorn:</strong> Rich in omega-7 fatty acids and vitamin C</li>
                <li><strong>Baobab:</strong> High in fiber, vitamin C, and prebiotics</li>
            </ul>
            
            <h3>Incorporating Superfoods Daily</h3>
            <p>Start your day with a smoothie bowl topped with goji berries, chia seeds, and cacao nibs. Add spirulina to your afternoon juice, and sprinkle hemp seeds on your salad for dinner.</p>
            
            <h3>The Science of Antioxidants</h3>
            <p>Antioxidants neutralize free radicals that cause cellular damage. Superfoods like blueberries, matcha, and turmeric contain exceptionally high levels of these protective compounds.</p>
            
            <h3>Beyond the Hype</h3>
            <p>While superfoods are beneficial, remember that a balanced, varied diet is key to optimal health. No single food can provide all the nutrients your body needs.</p>
        `
    },
    {
        id: 6,
        title: "Cybersecurity Best Practices for 2025",
        category: "Technology",
        author: "Alex Johnson",
        date: "March 8, 2025",
        image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg",
        content: `
            <p>As our lives become increasingly digital, cybersecurity has never been more critical. The threats of 2025 are sophisticated, but with the right practices, you can protect your digital identity.</p>
            
            <h3>The Evolving Threat Landscape</h3>
            <p>Cybercriminals are using AI to create more convincing phishing attacks, deepfakes for social engineering, and quantum computing to break traditional encryption.</p>
            
            <h3>Essential Security Measures</h3>
            <ul>
                <li><strong>Multi-Factor Authentication:</strong> Use biometric and hardware keys</li>
                <li><strong>Zero Trust Architecture:</strong> Verify everything, trust nothing</li>
                <li><strong>Regular Security Audits:</strong> Assess vulnerabilities monthly</li>
                <li><strong>Encrypted Communications:</strong> Use end-to-end encryption for all sensitive data</li>
            </ul>
            
            <h3>Personal Cybersecurity Hygiene</h3>
            <p>Update your passwords regularly using a password manager, enable automatic software updates, and be cautious with public Wi-Fi networks. Consider using a VPN for all online activities.</p>
            
            <h3>Emerging Technologies for Protection</h3>
            <p>Blockchain-based identity verification, quantum-resistant encryption, and AI-powered threat detection are becoming mainstream tools in the cybersecurity arsenal.</p>
        `
    },
    {
        id: 7,
        title: "Sustainable Home Design Trends",
        category: "Lifestyle",
        author: "Rachel Green",
        date: "February 20, 2025",
        image: "https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_1280.jpg",
        content: `
            <p>Sustainable home design is no longer just a trend—it's a necessity. Modern homeowners are embracing eco-friendly materials, energy-efficient systems, and biophilic design principles.</p>
            
            <h3>Materials That Make a Difference</h3>
            <p>Reclaimed wood, bamboo flooring, recycled metal, and low-VOC paints are becoming standard choices. These materials reduce environmental impact while creating beautiful, healthy living spaces.</p>
            
            <h3>Energy Independence</h3>
            <p>Solar panels, home batteries, and smart energy management systems are making homes increasingly self-sufficient. Many homeowners are achieving net-zero energy consumption.</p>
            
            <h3>Biophilic Design Elements</h3>
            <ul>
                <li>Living walls and vertical gardens</li>
                <li>Natural light optimization</li>
                <li>Indoor water features</li>
                <li>Natural materials and textures</li>
            </ul>
            
            <h3>Smart Home Integration</h3>
            <p>IoT devices optimize energy usage, monitor air quality, and automate systems for maximum efficiency. Smart thermostats alone can reduce energy consumption by up to 30%.</p>
        `
    },
    {
        id: 8,
        title: "Remote Work Revolution: Building Virtual Teams",
        category: "Business",
        author: "David Miller",
        date: "February 5, 2025",
        image: "https://cdn.pixabay.com/photo/2015/05/31/15/07/business-792113_1280.jpg",
        content: `
            <p>The remote work revolution has fundamentally changed how we build and manage teams. Success in 2025 requires new strategies for communication, collaboration, and culture building.</p>
            
            <h3>Tools for Virtual Collaboration</h3>
            <p>Beyond video conferencing, teams are using virtual reality meeting spaces, AI-powered project management tools, and asynchronous communication platforms to stay connected.</p>
            
            <h3>Building Team Culture Remotely</h3>
            <ul>
                <li>Virtual coffee breaks and social hours</li>
                <li>Online team-building activities</li>
                <li>Digital recognition programs</li>
                <li>Shared virtual workspaces</li>
            </ul>
            
            <h3>Productivity in the Digital Age</h3>
            <p>Focus on outcomes rather than hours worked. Implement flexible schedules, respect time zones, and establish clear boundaries between work and personal life.</p>
            
            <h3>The Hybrid Model</h3>
            <p>Many companies are adopting hybrid models, combining remote work with occasional in-person collaboration. This approach offers flexibility while maintaining team cohesion.</p>
        `
    },
    {
        id: 9,
        title: "HIIT Workouts: Maximum Results in Minimum Time",
        category: "Health",
        author: "Coach Maria",
        date: "January 18, 2025",
        image: "https://cdn.pixabay.com/photo/2017/08/07/14/02/man-2604149_1280.jpg",
        content: `
            <p>High-Intensity Interval Training (HIIT) has revolutionized fitness by delivering impressive results in just 20-30 minutes. This science-backed approach maximizes calorie burn and improves cardiovascular health.</p>
            
            <h3>The Science Behind HIIT</h3>
            <p>HIIT triggers excess post-exercise oxygen consumption (EPOC), meaning you continue burning calories hours after your workout. Studies show HIIT can burn 25-30% more calories than traditional exercise.</p>
            
            <h3>Sample 20-Minute HIIT Routine</h3>
            <ul>
                <li>Warm-up: 3 minutes light jogging</li>
                <li>Round 1: 30s burpees, 30s rest</li>
                <li>Round 2: 30s mountain climbers, 30s rest</li>
                <li>Round 3: 30s jump squats, 30s rest</li>
                <li>Repeat 3-4 times</li>
                <li>Cool-down: 3 minutes stretching</li>
            </ul>
            
            <h3>Benefits Beyond Weight Loss</h3>
            <p>HIIT improves insulin sensitivity, increases VO2 max, builds lean muscle, and enhances mental resilience. It's also been shown to slow cellular aging.</p>
            
            <h3>Making HIIT Sustainable</h3>
            <p>Start with 2-3 sessions per week, allow adequate recovery time, and progressively increase intensity. Listen to your body and adjust workouts based on your fitness level.</p>
        `
    },
    {
        id: 10,
        title: "European Cities: A Cultural Journey",
        category: "Travel",
        author: "Tom Bennett",
        date: "January 5, 2025",
        image: "https://cdn.pixabay.com/photo/2016/11/18/19/01/paris-1836415_1280.jpg",
        content: `
            <p>Europe's cities offer an unparalleled blend of history, culture, and modern innovation. From ancient Rome to futuristic Copenhagen, each destination tells a unique story.</p>
            
            <h3>Prague: The City of a Hundred Spires</h3>
            <p>Prague's Gothic architecture, cobblestone streets, and rich history make it a fairytale destination. Don't miss the astronomical clock, Charles Bridge, and the stunning Prague Castle.</p>
            
            <h3>Barcelona: Where Art Meets Life</h3>
            <p>Gaudí's masterpieces, Mediterranean beaches, and vibrant street life create an intoxicating atmosphere. The city seamlessly blends modernist architecture with Gothic quarters.</p>
            
            <h3>Copenhagen: Sustainability Pioneer</h3>
            <p>The Danish capital leads in sustainable urban living, with bike-friendly streets, green spaces, and innovative architecture. Experience hygge culture in cozy cafes and design stores.</p>
            
            <h3>Hidden European Gems</h3>
            <ul>
                <li><strong>Porto, Portugal:</strong> Port wine and azulejo tiles</li>
                <li><strong>Tallinn, Estonia:</strong> Medieval charm meets digital innovation</li>
                <li><strong>Ljubljana, Slovenia:</strong> Green capital with dragon bridges</li>
                <li><strong>Bergen, Norway:</strong> Gateway to the fjords</li>
            </ul>
            
            <h3>Cultural Etiquette Tips</h3>
            <p>Learn basic greetings in local languages, respect dining customs, and be mindful of photography restrictions at religious sites. Europeans appreciate visitors who show cultural awareness.</p>
        `
    }
];

// Store article data in localStorage for article page
localStorage.setItem('articleData', JSON.stringify(articleData));

// Sort articles by date (newest to oldest)
function sortArticlesByDate() {
    const blogGrid = document.getElementById('blogGrid');
    if (!blogGrid) return;
    
    const articles = Array.from(blogGrid.querySelectorAll('.blog-card'));
    
    // Define month order for sorting (full and abbreviated)
    const monthOrder = {
        'January': 1, 'Jan': 1,
        'February': 2, 'Feb': 2,
        'March': 3, 'Mar': 3,
        'April': 4, 'Apr': 4,
        'May': 5,
        'June': 6, 'Jun': 6,
        'July': 7, 'Jul': 7,
        'August': 8, 'Aug': 8,
        'September': 9, 'Sep': 9,
        'October': 10, 'Oct': 10,
        'November': 11, 'Nov': 11,
        'December': 12, 'Dec': 12
    };
    
    // Add data-date attribute to each article based on articleData
    articles.forEach((article, index) => {
        const articleId = parseInt(article.querySelector('a').href.split('id=')[1]);
        const articleInfo = articleData.find(a => a.id === articleId);
        if (articleInfo) {
            // Parse date string like "August 15, 2025"
            const dateParts = articleInfo.date.split(' ');
            const month = monthOrder[dateParts[0]];
            const day = parseInt(dateParts[1].replace(',', ''));
            const year = parseInt(dateParts[2]);
            // Create sortable date value (YYYYMMDD)
            const sortableDate = year * 10000 + month * 100 + day;
            article.setAttribute('data-sort-date', sortableDate);
        }
    });
    
    // Sort articles by data-sort-date
    articles.sort((a, b) => {
        const dateA = parseInt(a.getAttribute('data-sort-date') || 0);
        const dateB = parseInt(b.getAttribute('data-sort-date') || 0);
        return dateB - dateA; // Newest first
    });
    
    // Clear and re-append sorted articles
    articles.forEach(article => {
        blogGrid.appendChild(article);
    });
}

// Initialize sorting when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(sortArticlesByDate, 100); // Small delay to ensure DOM is ready
    
    // Create animated particles
    createParticles();
});

// Create floating particles effect
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay and duration
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        
        // Random size
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random color from gradient colors - bright palette
        const colors = ['rgba(255, 107, 157, 0.4)', 'rgba(254, 196, 100, 0.4)', 'rgba(102, 217, 239, 0.4)', 'rgba(250, 139, 255, 0.4)'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particlesContainer.appendChild(particle);
    }
}

// Add smooth scroll effect
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});