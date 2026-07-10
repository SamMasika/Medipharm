<template>
<div class="medipharm-media">
    <AppBar />

    <!-- HERO -->
    <section class="hero">
        <div class="hero-bg">
            <img :src="heroImage" alt="MSD Medipharm - Media Center">
        </div>
        <div class="hero-overlay"></div>
        <div class="hero-grid"></div>

				<div class="hero-container">

					<div class="hero-left">
						
							<h1 >Media Center</h1>
							<p class="hero-description">
									Capturing excellence in healthcare innovation across Africa
							</p>
	
							<div class="hero-actions">
									<button large depressed rounded class="btn-primary" @click="scrollToSection('news-section')">
											Explore Stories
									</button>
	
									<button large outlined rounded class="btn-secondary" @click="setActiveTab('Gallery')">
											View Gallery
									</button>
							</div>
					</div>
				</div>

        <div class="hero-scroll-indicator">
            <span>Scroll to discover</span>
            <div class="scroll-line"></div>
        </div>
    </section>

    <!-- TABS -->
    <div class="tabs-section">
        <v-container>
            <div class="tabs">
                <div v-for="tab in tabs" :key="tab" class="tab-item" :class="{ active: activeTab === tab }" @click="setActiveTab(tab)">
                    {{ tab }}
                </div>
            </div>
        </v-container>
    </div>

    <v-container class="content-container">
        <!-- NEWS -->
        <section v-if="activeTab === 'News'" id="news-section" class="news-section">
            <div class="section-header">
                <div class="header-decoration"></div>
                <h2>Latest News</h2>
            </div>

            <!-- Featured -->
            <div class="featured-news" @click="viewArticle(featuredNews)">
                <div class="featured-image">
                    <img :src="featuredNews.image" :alt="featuredNews.title">
                    <div class="featured-badge">Featured</div>
                </div>
                <div class="featured-info">
                    <div class="meta">
                        <span>{{ featuredNews.date }}</span>
                        <span class="dot">•</span>
                        <span>{{ featuredNews.readTime }}</span>
                    </div>
                    <h2>{{ featuredNews.title }}</h2>
                    <p>{{ featuredNews.excerpt }}</p>

                    <div class="read-more">
                        Read Full Story
                        <span class="arrow">→</span>
                    </div>
                </div>
            </div>

            <!-- News Grid -->
            <div class="news-grid">
                <div v-for="article in newsArticles" :key="article.id" class="news-card" @click="viewArticle(article)">
                    <div class="card-image">
                        <img :src="article.image" :alt="article.title">
                    </div>
                    <div class="card-content">
                        <div class="card-date">{{ article.date }}</div>
                        <h3>{{ article.title }}</h3>
                        <p>{{ article.excerpt }}</p>
                        <div class="card-footer">
                            <span class="read-time">4 min read</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- EVENTS -->
        <section v-if="activeTab === 'Events'" class="events-section">
            <div class="section-header">
                <div class="header-decoration"></div>
                <h2>Events &amp; Engagements</h2>
            </div>

            <div class="events-grid">
                <div v-for="event in events" :key="event.id" class="event-card">
                    <div class="event-date">
                        <div class="day">{{ event.day }}</div>
                        <div class="month">{{ event.month }}</div>
                    </div>
                    <div class="event-info">
                        <h3>{{ event.title }}</h3>
                        <p class="location">
                            <span class="location-icon">📍</span> {{ event.location }}
                        </p>
                        <p class="description">{{ event.description }}</p>

                        <button class="btn-primary event-action-btn">
                            Register Interest
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- GALLERY -->
        <section v-if="activeTab === 'Gallery'" class="gallery-section">
            <div class="section-header">
                <div class="header-decoration"></div>
                <h2>Visual Stories</h2>
            </div>

            <div class="gallery-filters">
                <v-btn v-for="cat in galleryCategories" :key="cat" :class="{ active: activeGalleryFilter === cat }" @click="activeGalleryFilter = cat" rounded class="filter-btn">
                    {{ cat }}
                </v-btn>
            </div>

            <div class="gallery-grid">
                <div v-for="(item, i) in filteredGallery" :key="i" class="gallery-item" @click="openLightbox(i)">
                    <img :src="item.image" :alt="item.title">
                    <div class="gallery-overlay">
                        <h4>{{ item.title }}</h4>
                        <p class="category-tag">{{ item.category }}</p>
                    </div>
                </div>
            </div>
        </section>
    </v-container>

    <!-- PREMIUM LIGHTBOX -->
    <v-dialog v-model="lightbox.show" max-width="1100" content-class="lightbox-dialog" transition="dialog-transition">
        <div class="lightbox-inner" v-if="lightbox.currentItem">
            <button class="close-btn" @click="lightbox.show = false">✕</button>

            <div class="lightbox-image-wrapper">
                <img :src="lightbox.currentItem.image" :alt="lightbox.currentItem.title" class="lightbox-img">
            </div>

            <div class="lightbox-caption">
                <div class="caption-category">{{ lightbox.currentItem.category }}</div>
                <h3>{{ lightbox.currentItem.title }}</h3>
                <p>{{ lightbox.currentItem.description }}</p>
            </div>

            <!-- Lightbox navigation -->
            <button class="lightbox-nav prev" @click="navigateLightbox(-1)">
                ←
            </button>
            <button class="lightbox-nav next" @click="navigateLightbox(1)">
                →
            </button>
        </div>
    </v-dialog>

    <Footer />
</div>
</template>

<script>
import AppBar from "../Layout/appBar.vue";
import Footer from "../Layout/Footer.vue";

// Import images
import heroImage from "@/assets/medifarm/medi15.jpeg";
import news1 from "@/assets/medifarm/medi2.jpg";
import news2 from "@/assets/medifarm/medi3.jpg";
import gallery1 from "@/assets/medifarm/medi13.jpeg";
import gallery2 from "@/assets/medifarm/medi5.jpeg";
import gallery3 from "@/assets/medifarm/medi6.jpeg";
import gallery5 from "@/assets/medifarm/medi7.jpeg";

export default {
    name: "MedipharmMediaCenter",
    components: {
        AppBar,
        Footer
    },

    data() {
        return {
            heroImage,
            activeTab: "News",
            tabs: ["News", "Events", "Gallery"],

            featuredNews: {
                id: 1,
                title: "MSD Medipharm Expands Manufacturing Capacity with New Facility",
                excerpt: "A landmark investment that will significantly boost local production of essential medicines across the continent.",
                date: "July 4, 2026",
                readTime: "8 min read",
                image: heroImage
            },
            newsArticles: [{
                    id: 2,
                    title: "New Partnership with Regional Health Networks",
                    excerpt: "Strengthening supply chain reliability and access to quality medicines across East Africa.",
                    date: "June 30, 2026",
                    image: news1
                },
                {
                    id: 3,
                    title: "WHO Prequalified Products Reach New Milestone",
                    excerpt: "Expanding access to high-quality, affordable medicines for communities across Africa.",
                    date: "June 25, 2026",
                    image: news2
                }
            ],

            events: [{
                    id: 1,
                    title: "Africa Health Expo 2026",
                    day: "15",
                    month: "SEP",
                    location: "Dar es Salaam, Tanzania",
                    description: "Showcasing our latest pharmaceutical innovations and commitment to African healthcare excellence."
                },
                {
                    id: 2,
                    title: "Stakeholder Partnership Forum",
                    day: "22",
                    month: "AUG",
                    location: "Arusha, Tanzania",
                    description: "Collaborating with healthcare leaders to build sustainable solutions for the future."
                }
            ],

            activeGalleryFilter: "All",
            galleryCategories: ["All", "Facility", "Production", "Team", "Events", "CSR"],

            lightbox: {
                show: false,
                currentItem: null,
                currentIndex: 0
            },

            galleryItems: [{
                    id: 1,
                    title: "New Factory Opening",
                    category: "Facility",
                    image: heroImage,
                    description: "Grand opening ceremony of our state-of-the-art manufacturing facility"
                },
                {
                    id: 2,
                    title: "Production Floor",
                    category: "Production",
                    image: gallery1,
                    description: "Advanced automated manufacturing lines ensuring highest quality standards"
                },
                {
                    id: 3,
                    title: "Quality Control Lab",
                    category: "Production",
                    image: gallery2,
                    description: "World-class laboratory facilities meeting international regulatory requirements"
                },
                {
                    id: 4,
                    title: "Our Dedicated Team",
                    category: "Team",
                    image: gallery3,
                    description: "The passionate professionals driving Medipharm's mission forward"
                },
                {
                    id: 5,
                    title: "Community Outreach Program",
                    category: "CSR",
                    image: gallery5,
                    description: "Medical camps and health education initiatives across Tanzania"
                }
            ]
        };
    },

    computed: {
        filteredGallery() {
            if (this.activeGalleryFilter === "All") return this.galleryItems;
            return this.galleryItems.filter(item => item.category === this.activeGalleryFilter);
        }
    },

    methods: {
        setActiveTab(tab) {
            this.activeTab = tab;
            if (tab === 'News') {
                setTimeout(() => {
                    document.getElementById('news-section') ?.scrollIntoView({
                        behavior: 'smooth'
                    });
                }, 100);
            }
        },

        viewArticle(article) {
            // In production: router.push to article detail
            alert(`Opening full article: ${article.title}`);
        },

        openLightbox(index) {
            this.lightbox.currentIndex = index;
            this.lightbox.currentItem = this.filteredGallery[index];
            this.lightbox.show = true;
        },

        navigateLightbox(direction) {
            let newIndex = this.lightbox.currentIndex + direction;
            const items = this.filteredGallery;

            if (newIndex < 0) newIndex = items.length - 1;
            if (newIndex >= items.length) newIndex = 0;

            this.lightbox.currentIndex = newIndex;
            this.lightbox.currentItem = items[newIndex];
        },

        scrollToSection(id) {
            document.getElementById(id) ?.scrollIntoView({
                behavior: "smooth"
            });
        }
    }
};
</script>

<style scoped>
.medipharm-media {
    background: #f8fafc;
}

/* HERO */
.hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    overflow: hidden;
}

.hero-bg img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.55) contrast(1.15) saturate(1.1);
    transition: transform 0.8s ease;
}

.hero:hover .hero-bg img {
    transform: scale(1.03);
}



.hero-content {
    position: relative;
    z-index: 2;
    padding: 0 8rem;
    max-width: 860px;
}

.brand-tag {
    color: #93C439;
    font-size: 1.4rem;
    letter-spacing: 12px;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 12px;
    opacity: 0.95;
}

.hero-title {
    font-size:3.5rem;
    font-weight: 900;
    line-height: 0.95;
    color: white;
    /* letter-spacing: -6px; */
    margin: 0 0 28px;
    text-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
    font-size: 1.65rem;
    line-height: 1.45;
    color: rgba(255, 255, 255, 0.92);
    margin-bottom: 2.8rem;
    max-width: 620px;
}

.hero-actions {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
}
.btn-primary,
.btn-secondary {
    padding: 18px 40px;
    border-radius: 9999px;
    font-weight: 700;
    font-size: 1.02rem;
    letter-spacing: 0.6px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border: none;
}

.btn-primary {
    background: linear-gradient(135deg, #162456, #233781, #93C439);
    color: white;
    box-shadow: 0 20px 50px -10px rgba(15, 23, 42, 0.5);
}

.btn-primary:hover {
    transform: translateY(-6px) scale(1.04);
}

.btn-secondary {
    background: transparent;
    color: white;
    border: 1.5px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(20px);
}

.btn-secondary:hover {
    border-color: var(--accent);
    background: rgba(255, 255, 255, 0.1);
}

.premium-btn {
    font-size: 1.22rem;
    font-weight: 700;
    padding: 22px 52px !important;
    border-radius: 50px !important;
    text-transform: none;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    letter-spacing: -0.02em;
}

.primary-btn {
    background: linear-gradient(90deg, #93C439, #a1d14f) !important;
    color: white !important;
    box-shadow: 0 15px 40px -10px rgba(147, 196, 57, 0.55);
}

.primary-btn:hover {
    transform: translateY(-6px) scale(1.04);
    box-shadow: 0 25px 55px -10px rgba(147, 196, 57, 0.65);
}

.secondary-btn {
    color: white !important;
    border-color: rgba(255, 255, 255, 0.7) !important;
}

.secondary-btn:hover {
    border-color: white;
    background: rgba(255, 255, 255, 0.1) !important;
    transform: translateY(-4px);
}

.hero-scroll-indicator {
    position: absolute;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    color: rgba(255, 255, 255, 0.75);
    font-size: 0.95rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 3;
}

.scroll-line {
    width: 1px;
    height: 60px;
    background: linear-gradient(transparent, rgba(255, 255, 255, 0.6), transparent);
    margin-top: 12px;
}

/* TABS */
.tabs-section {
    background: white;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.07);
    position: sticky;
    top: 0;
    z-index: 100;
}

.tabs {
    display: flex;
    justify-content: center;
    gap: 4px;
}

.tab-item {
    padding: 24px 60px;
    font-size: 1.35rem;
    font-weight: 600;
    color: #64748b;
    cursor: pointer;
    position: relative;
    transition: all 0.3s ease;
}

.tab-item:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 4px;
    background: linear-gradient(to right, #93C439, #162456);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 2px;
}

.tab-item:hover {
    color: #162456;
}

.tab-item.active {
    color: #162456;
}

.tab-item.active:after {
    left: 0;
    width: 100%;
}

/* SECTION HEADER */
.section-header {
    text-align: center;
    margin: 110px 0 80px;
}

.header-decoration {
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, #93C439, #162456);
    margin: 0 auto 20px;
}

.section-header h2 {
    font-size: 3.6rem;
    font-weight: 800;
    color: #162456;
    letter-spacing: -2px;
}

/* FEATURED NEWS */
.featured-news {
    display: grid;
    grid-template-columns: 1.05fr 1fr;
    gap: 70px;
    background: white;
    border-radius: 32px;
    overflow: hidden;
    box-shadow: 0 35px 90px rgba(22, 36, 86, 0.14);
    cursor: pointer;
    transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.featured-news:hover {
    transform: translateY(-18px);
}

.featured-image {
    position: relative;
}

.featured-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    height: 560px;
}

.featured-badge {
    position: absolute;
    top: 40px;
    left: 40px;
    background: #93C439;
    color: white;
    padding: 8px 24px;
    border-radius: 50px;
    font-size: 0.95rem;
    font-weight: 700;
    box-shadow: 0 10px 25px rgba(147, 196, 57, 0.3);
}

.featured-info {
    padding: 68px 58px 60px;
    display: flex;
    flex-direction: column;
}

.featured-info .meta {
    color: #64748b;
    font-size: 1.05rem;
    margin-bottom: 20px;
    letter-spacing: 0.5px;
}

.featured-info h2 {
    font-size: 2.75rem;
    line-height: 1.12;
    font-weight: 800;
    color: #162456;
    margin-bottom: 24px;
}

.featured-info p {
    font-size: 1.22rem;
    line-height: 1.65;
    color: #475569;
    flex-grow: 1;
}

.read-more {
    color: #93C439;
    font-weight: 700;
    font-size: 1.25rem;
    margin-top: 40px;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    transition: gap 0.3s;
}

.featured-news:hover .read-more {
    gap: 20px;
}

/* NEWS GRID */
.news-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
    gap: 52px;
    margin-top: 80px;
}

.news-card {
    background: white;
    border-radius: 28px;
    overflow: hidden;
    box-shadow: 0 25px 70px rgba(0, 0, 0, 0.09);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.news-card:hover {
    transform: translateY(-22px);
    box-shadow: 0 40px 100px rgba(22, 36, 86, 0.16);
}

.card-image img {
    width: 100%;
    height: 280px;
    object-fit: cover;
}

.card-content {
    padding: 38px;
}

.card-date {
    color: #93C439;
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 14px;
}

.card-content h3 {
    font-size: 1.65rem;
    line-height: 1.3;
    font-weight: 700;
    color: #162456;
    margin-bottom: 16px;
}

.card-content p {
    color: #475569;
    line-height: 1.6;
}

.card-footer {
    margin-top: 28px;
    padding-top: 20px;
    border-top: 1px solid #f1f5f9;
}

/* EVENTS */
.events-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
    gap: 50px;
}

.event-card {
    background: white;
    border-radius: 28px;
    overflow: hidden;
    box-shadow: 0 25px 70px rgba(0, 0, 0, 0.1);
    display: flex;
    transition: all 0.4s ease;
}

.event-card:hover {
    transform: translateY(-15px);
    box-shadow: 0 40px 90px rgba(0, 0, 0, 0.14);
}

.event-date {
    background: linear-gradient(135deg, #162456, #1e3a8a);
    color: white;
    width: 110px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px 10px;
}

.day {
    font-size: 3.2rem;
    font-weight: 800;
    line-height: 1;
}

.month {
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: 3px;
    opacity: 0.9;
}

.event-info {
    padding: 42px 48px;
    flex: 1;
}

.event-info h3 {
    font-size: 1.85rem;
    font-weight: 700;
    margin-bottom: 12px;
    color: #162456;
}

.location {
    color: #64748b;
    font-weight: 500;
    margin-bottom: 16px;
}

.location-icon {
    margin-right: 6px;
}

.description {
    color: #475569;
    line-height: 1.65;
    margin-bottom: 32px;
}

/* GALLERY */
.gallery-filters {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 14px;
    margin-bottom: 70px;
}

.filter-btn {
    text-transform: none;
    font-weight: 600;
    padding: 12px 32px !important;
}

.filter-btn.active {
    background: #162456 !important;
    color: white !important;
}

.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    gap: 32px;
}

.gallery-item {
    height: 420px;
    border-radius: 28px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
}

.gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.9s cubic-bezier(0.4, 0, 0.2, 1);
}

.gallery-item:hover img {
    transform: scale(1.08);
}

.gallery-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(transparent, rgba(22, 36, 86, 0.85));
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 40px;
    color: white;
    transition: all 0.4s ease;
}

.gallery-overlay h4 {
    font-size: 1.55rem;
    margin-bottom: 8px;
}

.category-tag {
    font-size: 0.95rem;
    opacity: 0.85;
    text-transform: uppercase;
    letter-spacing: 1px;
}

/* LIGHTBOX */
.lightbox-dialog {
    border-radius: 28px !important;
    overflow: hidden;
}

.lightbox-inner {
    position: relative;
    background: #0f172a;
    border-radius: 28px;
    overflow: hidden;
}

.lightbox-image-wrapper {
    position: relative;
}

.lightbox-img {
    width: 100%;
    max-height: 620px;
    object-fit: cover;
}

.lightbox-caption {
    padding: 48px;
    background: white;
    color: #162456;
}

.caption-category {
    color: #93C439;
    font-weight: 700;
    font-size: 1rem;
    letter-spacing: 2px;
    margin-bottom: 12px;
    text-transform: uppercase;
}

.lightbox-caption h3 {
    font-size: 2.2rem;
    margin-bottom: 18px;
}

.lightbox-caption p {
    font-size: 1.2rem;
    line-height: 1.7;
    color: #475569;
}

.close-btn {
    position: absolute;
    top: 30px;
    right: 30px;
    background: rgba(0, 0, 0, 0.75);
    color: white;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    font-size: 32px;
    z-index: 20;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
}

.close-btn:hover {
    background: #93C439;
    transform: rotate(90deg);
}

.lightbox-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.6);
    color: white;
    width: 62px;
    height: 62px;
    border-radius: 50%;
    font-size: 28px;
    border: none;
    z-index: 15;
    transition: all 0.3s;
}

.lightbox-nav:hover {
    background: #93C439;
}

.prev {
    left: 40px;
}

.next {
    right: 40px;
}

/* Responsive */
@media (max-width: 1024px) {
    .hero-content {
        padding: 0 4rem;
    }

    .featured-news {
        grid-template-columns: 1fr;
    }

    .featured-image img {
        height: 420px;
    }
}

@media (max-width: 640px) {
    .tabs {
        flex-wrap: wrap;
    }

    .tab-item {
        padding: 18px 32px;
        font-size: 1.15rem;
    }
}
</style>
