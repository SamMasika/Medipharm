<template>
<div class="hero-page">
    <!-- HERO SECTION -->
    <section class="hero">
        <!-- BACKGROUND -->
        <div class="hero-bg">
            <img v-for="(img, i) in heroImages" :key="i" :src="img" :class="{ active: i === heroIndex }" alt="Medifarm Pharmaceutical Facility" />
        </div>

        <!-- OVERLAYS -->
        <div class="hero-overlay"></div>
        <div class="hero-grid"></div>

        <!-- CONTENT -->
        <div class="hero-container">
            <!-- LEFT -->
            <div class="hero-left">
                <!-- BADGE -->
                <div class="hero-badge">
                    <span class="badge-dot"></span>
                    MSD MEDIPHARM
                </div>

                <!-- KICKER -->
                <div class="hero-kicker">
                    Joint Venture with MSD Medipharm
                </div>

                <h1>
                    Pharmaceutical Manufacturing
                    <span>In Tanzania</span>
                </h1>

                <!-- DESCRIPTION -->
                <p class="hero-description">
                    Elevating pharmaceutical standards across East Africa through world-class manufacturing,
                    uncompromising quality, and transformative partnerships.
                </p>

                <!-- BUTTONS -->
                <div class="hero-actions">
                    <button class="btn-primary" @click="scrollToSection('facilities')">
                        Explore Our Facilities
                    </button>
                    <button class="btn-secondary" @click="scrollToSection('partnerships')">
                        Partner With Us
                    </button>
                </div>

                <!-- METRICS -->
                <div class="hero-metrics">
                    <div class="metric-card">
                        <div class="metric-value">WHO GMP</div>
                        <div class="metric-label">Certified</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value">50M+</div>
                        <div class="metric-label">Units / Year</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value">99.8%</div>
                        <div class="metric-label">Compliance Rate</div>
                    </div>
                </div>
            </div>

            <!-- RIGHT -->
            <div class="hero-right">
                <!-- IMAGE CARD -->
                <div class="hero-card">
                    <img :src="heroImages[heroIndex]" alt="State-of-the-art pharmaceutical manufacturing" />
                    <div class="hero-card-overlay"></div>
                    <div class="hero-card-glow"></div>

                    <!-- FLOATING PREMIUM -->
                    <div class="floating-premium">
                        <div class="floating-icon">
                            <v-icon size="32" color="#ffffff">mdi-shield-check</v-icon>
                        </div>
                        <div>
                            <h4>Global Standards. Local Legacy.</h4>
                            <p>
                                Delivering innovative, affordable, and reliable medicines through cutting-edge
                                technology and uncompromising integrity.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- COMPACT CORE VALUES PANEL -->
                <div class="hero-panel">
                    <!-- Premium Header -->
                    <div class="panel-header">
                        <div class="header-badge">
                            <span class="badge-dot"></span>
                            OUR CORE VALUES
                        </div>
                        <h3>Guiding Principles</h3>
                    </div>

                    <div class="panel-item" v-for="(value, i) in displayedValues" :key="i">
                        <div class="service-icon-wrap">
                            <div class="service-icon-bg"></div>
                            <v-icon size="24" color="#ffffff">{{ value.icon }}</v-icon>
                        </div>
                        <div class="service-info">
                            <h4>{{ value.title }}</h4>
                            <p>{{ value.desc }}</p>
                        </div>
                    </div>

                    <!-- View All -->
                    <div class="view-all-wrapper">
                        <router-link to="/about/mission" class="view-all-btn">
                            See All Values
                            <v-icon size="18" class="ml-2">mdi-arrow-right</v-icon>
                        </router-link>
                    </div>
                </div>

            </div>
        </div>
    </section>
    <!-- ULTRA PREMIUM SERVICES SECTION -->
    <section class="services-section" id="services">
        <div class="section-container">
            <!-- Elegant Header -->
            <div class="services-header">
                <div class="premium-badge">
                    <span class="dot"></span>
                    OUR EXCELLENCE
                </div>
                <h2>Capabilities That Define Leadership</h2>
                <p class="section-subtitle">
                    Engineered for excellence. Built for impact. We combine cutting-edge technology,
                    uncompromising quality, and sustainable innovation.
                </p>
            </div>

            <!-- Services Grid -->
            <div class="services-grid">
                <div v-for="(service, i) in services" :key="i" class="service-card">
                    <div class="service-icon">
                        <v-icon size="46" color="white">{{ service.icon }}</v-icon>
                    </div>
                    <div class="service-body">
                        <h3>{{ service.name }}</h3>
                        <p>{{ service.description }}</p>
                    </div>
                    <div class="service-cta">
                        <router-link :to="service.route" class="premium-link">
                            Discover More <span class="arrow">→</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </section>
   <!-- ULTRA PREMIUM NEWS & MEDIA -->
<section class="news-media-section">
  <div class="section-container">
    <div class="section-header">
      <div class="premium-badge">Stories That Matter</div>
      <h2>News &amp; Media Highlights</h2>
      <p class="subtitle">Discover our journey, achievements, and impact in transforming healthcare in East Africa.</p>
    </div>

    <div class="news-grid">
      <div v-for="(news, i) in latestNews" :key="i" class="news-card" :style="{ '--delay': i * 0.1 + 's' }">
        <div class="news-visual">
          <img :src="news.image" :alt="news.title" />
          <div class="category-badge">{{ news.category }}</div>
        </div>
        
        <div class="news-content">
          <div class="news-meta">
            <span class="news-date">{{ news.date }}</span>
          </div>
          <h3>{{ news.title }}</h3>
          <p class="excerpt">{{ news.excerpt }}</p>
          
          <div class="news-footer">
            <a :href="news.link" class="read-more-link">
              Read Full Article
              <span class="arrow">⟶</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="view-all">
      <router-link to="/news" class="premium-cta">
        Explore All Stories
        <v-icon size="22">mdi-arrow-top-right</v-icon>
      </router-link>
    </div>
  </div>
</section>
</div>
</template>

<script>
import img1 from "@/assets/medifarm/medi7.jpeg";
import img2 from "@/assets/medifarm/medi10.jpeg";
import img3 from "@/assets/medifarm/medi11.jpeg";

export default {
    data() {
        return {
            heroIndex: 0,
            heroImages: [img1, img2, img3],
            displayedValues: [],
            coreValues: [{
                    title: "Quality Excellence",
                    desc: "We maintain the highest standards in every product we manufacture",
                    icon: "mdi-shield-check"
                },
                {
                    title: "Innovation",
                    desc: "Continuously developing better solutions for healthcare needs",
                    icon: "mdi-lightbulb-on"
                },
                {
                    title: "Integrity",
                    desc: "Operating with honesty, transparency, and ethical excellence",
                    icon: "mdi-handshake"
                },
                {
                    title: "Customer Focus",
                    desc: "Putting the needs of healthcare providers and patients first",
                    icon: "mdi-account-heart"
                },
                {
                    title: "Community Impact",
                    desc: "Creating jobs, reducing import dependency, and strengthening local healthcare",
                    icon: "mdi-hand-heart"
                },
            ],
            latestNews: [{
                    title: "MSD Medipharm Launches New Production Line",
                    excerpt: "State-of-the-art facility expansion to increase capacity for N95 masks and examination gloves.",
                    date: "June 15, 2026",
                    category: "Manufacturing",
                    image: require("@/assets/medifarm/medi11.jpeg"), // replace with real image
                    link: "/news/1"
                },
                {
                    title: "Partnership with Regional Health Organizations",
                    excerpt: "New collaboration to supply high-quality PPE across East Africa.",
                    date: "June 8, 2026",
                    category: "Partnerships",
                    image: require("@/assets/medifarm/medi10.jpeg"),
                    link: "/news/2"
                },
                {
                    title: "Achieving TMDA GMP Certification",
                    excerpt: "Company reaches major milestone in quality and regulatory compliance.",
                    date: "May 28, 2026",
                    category: "Compliance",
                    image: require("@/assets/medifarm/medi13.jpeg"),
                    link: "/news/3"
                }
            ],
            services: [{
                    name: "Manufacturing",
                    route: "/facilities/manufacturing",
                    description: "State-of-the-art manufacturing facilities equipped with advanced automation and strict quality control systems",
                    icon: "mdi-factory"
                },
                {
                    name: "Research & Development",
                    route: "/facilities/rnd",
                    description: "Cutting-edge R&D center focused on innovation, product development, and continuous improvement of health commodities",
                    icon: "mdi-flask"
                },
                {
                    name: "Quality Assurance & Compliance",
                    route: "/quality",
                    description: "Full TMDA licensing and GMP compliance with rigorous quality management systems and regular audits",
                    icon: "mdi-shield-check"
                },
                {
                    name: "Distribution & Supply Chain",
                    route: "/facilities/distribution",
                    description: "Reliable nationwide and regional distribution network serving hospitals, clinics, NGOs, and emergency units",
                    icon: "mdi-truck-delivery"
                },
                {
                    name: "Sustainability & Community Impact",
                    route: "/facilities/sustainability",
                    description: "Environmentally responsible manufacturing that supports job creation, reduces import dependency, and strengthens local healthcare security",
                    icon: "mdi-leaf"
                }
            ],
        };
    },
    mounted() {
        setInterval(() => {
            this.heroIndex = (this.heroIndex + 1) % this.heroImages.length;
        }, 4800);
        this.displayedValues = this.coreValues.slice(0, 3); // Show only 3
    },
    methods: {
        scrollToSection(section) {
            console.log(`Scrolling to ${section}`);
        },

    },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;900&display=swap');

:root {
    --navy: #0A2540;
    --navy-dark: #05121f;
    --blue: #1E40AF;
    --teal: #0F766E;
    --gold: #D97706;
    --gold-light: #FCD34D;
    --accent: #93C439;
}

.hero-page {
    overflow: hidden;
    background: #05070f;
}

.hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    overflow: hidden;
}

/* Background & Overlays */
.hero-bg img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transform: scale(1.12);
    transition: opacity 2s cubic-bezier(0.23, 1, 0.32, 1), transform 8s cubic-bezier(0.23, 1, 0.32, 1);
    filter: brightness(0.45) contrast(1.15) saturate(0.9);
}

.hero-bg img.active {
    opacity: 1;
    transform: scale(1);
}

.hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #162456, #233781, #93C439);
    opacity: 0.92;
    z-index: 1;
}

.hero-grid {
    position: absolute;
    inset: 0;
    z-index: 2;
    background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 90px 90px;
    opacity: 0.45;
}

/* Container - Desktop unchanged */
.hero-container {
    position: relative;
    z-index: 5;
    max-width: 1520px;
    margin: 0 auto;
    padding: 0 100px;
    display: flex;
    align-items: center;
    gap: 90px;
    min-height: 100vh;
}

/* Left Side - Desktop unchanged */
.hero-left {
    flex: 1;
    max-width: 660px;
    color: white;
}

.hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    padding: 12px 28px;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.09);
    border: 1px solid rgba(255, 255, 255, 0.18);
    backdrop-filter: blur(24px);
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: #e2e8f0;
}

.badge-dot {
    width: 10px;
    height: 10px;
    background: var(--gold-light);
    border-radius: 50%;
    box-shadow: 0 0 18px var(--gold-light);
    animation: pulse 2s infinite;
}

.hero-kicker {
    margin-top: 32px;
    font-size: 1.1rem;
    font-weight: 500;
    letter-spacing: 2px;
    color: var(--accent);
    text-transform: uppercase;
}

.hero-left h1 {
    margin-top: 18px;
    font-family: 'Playfair Display', serif;
    font-size: 3.85rem;
    line-height: 1.05;
    font-weight: 900;
    letter-spacing: -3.2px;
    color: #ffffff;
}

.hero-left h1 span {
    display: block;
    margin-top: 12px;
    font-size: 3.35rem;
    background: linear-gradient(90deg, #ffffff, #AEDF54, #93C439);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 900;
}

.hero-description {
    margin-top: 32px;
    font-size: 1.08rem;
    line-height: 1.78;
    color: rgba(241, 245, 249, 0.9);
    max-width: 580px;
}

.hero-actions {
    margin-top: 52px;
    display: flex;
    gap: 20px;
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

.hero-metrics {
    margin-top: 64px;
    display: flex;
    gap: 24px;
}

.metric-card {
    flex: 1;
    padding: 20px 22px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 28px;
    backdrop-filter: blur(24px);
}

.metric-card:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.13);
    border-color: rgba(147, 196, 57, 0.4);
}

/* Right Side & Floating Premium */
.hero-right {
    flex: 1;
    max-width: 520px;
    position: relative;
}

.hero-card {
    position: relative;
    margin-top: 30px;
    height: 520px;
    border-radius: 40px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.22);
    background: rgba(255, 255, 255, 0.02);
    box-shadow: 0 50px 120px -20px rgba(0, 0, 0, 0.55), 0 15px 35px -10px rgba(22, 36, 86, 0.35), inset 0 0 60px rgba(255, 255, 255, 0.06);
}

.hero-card:hover {
    transform: translateY(-8px);
}

.hero-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 1.6s cubic-bezier(0.23, 1, 0.32, 1);
    filter: brightness(0.82) contrast(1.08) saturate(0.98);
}

.hero-card:hover img {
    transform: scale(1.06);
}

.hero-card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 45%, rgba(22, 36, 86, 0.55) 75%, rgba(22, 36, 86, 0.75) 100%);
    z-index: 1;
}

.hero-card-glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 28% 32%, rgba(147, 196, 57, 0.28), transparent 60%),
        radial-gradient(circle at 72% 68%, rgba(35, 55, 129, 0.25), transparent 65%),
        radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.07), transparent 75%);
    mix-blend-mode: screen;
    z-index: 2;
    opacity: 0.75;
}

/* Floating Premium - No .floating-content class */
.floating-premium {
    position: absolute;
    bottom: 48px;
    left: -40px;
    width: 340px;
    opacity: 0.80;
    padding: 32px;
    background: linear-gradient(165deg, #162456, #314386);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 32px;
    backdrop-filter: blur(32px);
    box-shadow: 0 35px 80px -15px rgba(0, 0, 0, 0.5);
    z-index: 10;
    display: flex;
    gap: 22px;
}

.floating-icon {
    width: 68px;
    height: 68px;
    border-radius: 22px;
    background: linear-gradient(145deg, #162456, #233781, #93C439);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 15px 40px -10px rgba(35, 55, 129, 0.55);
    flex-shrink: 0;
}

.floating-premium h4 {
    color: white;
    font-size: 1.18rem;
    font-weight: 700;
    line-height: 1.35;
    margin: 0;
}

.floating-premium p {
    margin-top: 12px;
    font-size: 0.92rem;
    line-height: 1.65;
    color: rgba(241, 245, 249, 0.85);
}

/* Services Panel */
.hero-panel {
    margin-top: 32px;
    margin-bottom: 20px;
    padding: 24px;
    background: rgba(255, 255, 255, 0.09);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 32px;
    backdrop-filter: blur(28px);
    box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.4);
}

.panel-item {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    padding: 18px 20px;
    border-radius: 20px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.panel-item:not(:last-child) {
    margin-bottom: 8px;
}

.panel-item:hover {
    background: rgba(255, 255, 255, 0.14);
    transform: translateX(8px);
    box-shadow: 0 10px 25px rgba(147, 196, 57, 0.15);
}

.service-icon-wrap {
    position: relative;
    width: 54px;
    height: 54px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.service-icon-bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(145deg, #162456, #233781, #93C439);
    border-radius: 18px;
    box-shadow: 0 8px 20px rgba(35, 55, 129, 0.4);
}

.service-info h4 {
    font-size: 1.08rem;
    font-weight: 700;
    color: white;
    margin-top: 2px;
}

.service-info p {
    margin-top: 6px;
    font-size: 0.9rem;
    line-height: 1.65;
    color: rgba(241, 245, 249, 0.82);
}

/* Responsive - Desktop unchanged */
@media (max-width: 1280px) {
    .hero-container {
        padding: 0 60px;
        gap: 60px;
    }
}

@media (max-width: 1024px) {
    .hero-container {
        flex-direction: column;
        text-align: center;
        padding: 140px 40px 100px;
        gap: 80px;
    }

    .floating-premium {
        left: 50%;
        transform: translateX(-50%);
        bottom: 40px;
    }
}

@media (max-width: 768px) {
    .hero-left h1 {
        font-size: 2.85rem;
    }

    .hero-left h1 span {
        font-size: 2.5rem;
    }

    .hero-actions {
        flex-direction: column;
        align-items: center;
    }

    .btn-primary,
    .btn-secondary {
        width: 100%;
        max-width: 380px;
    }

    .hero-card {
        height: 460px;
    }

    .floating-premium {
        position: static;
        left: auto;
        transform: none;
        margin-top: 32px;
        width: 100%;
    }
}

@media (max-width: 480px) {
    .hero-container {
        padding: 100px 20px 80px;
    }

    .metric-card {
        flex: 1 1 100%;
        text-align: center;
    }
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.4;
    }
}

.services-section {
    padding: 110px 0;
    background:
        linear-gradient(180deg, rgba(248, 250, 252, 0.92) 0%, rgba(241, 245, 249, 0.92) 100%),
        url('@/assets/medifarm/medi7.jpeg') center/cover no-repeat;
    position: relative;
    overflow: hidden;
}

/* Subtle slow-moving background */
.services-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background: inherit;
    background-size: 110% 110%;
    animation: subtleMove 45s linear infinite;
    z-index: 0;
    opacity: 0.85;
}

/* Soft overlay */
.services-section::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, transparent 35%, rgba(255, 255, 255, 0.88) 85%);
    z-index: 1;
    pointer-events: none;
}

/* Content stays above */
.section-container,
.services-header,
.services-grid {
    position: relative;
    z-index: 2;
}

/* Gentle slow movement animation */
@keyframes subtleMove {
    0% {
        background-position: 50% 50%;
    }

    50% {
        background-position: 55% 48%;
    }

    100% {
        background-position: 50% 50%;
    }
}

.section-container {
    max-width: 1320px;
    margin: 0 auto;
    padding: 0 40px;
}

/* Header */
.services-header {
    text-align: center;
    margin-bottom: 80px;
}

.premium-badge {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    background: white;
    padding: 10px 28px;
    border-radius: 9999px;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #0A2540;
    box-shadow: 0 10px 30px rgba(10, 37, 64, 0.08);
    margin-bottom: 24px;
}

.dot {
    width: 9px;
    height: 9px;
    background: linear-gradient(145deg, #162456, #93C439);
    border-radius: 50%;
    box-shadow: 0 0 12px #93C439;
    animation: pulse 3s infinite;
}

.services-header h2 {
    font-size: 2.9rem;
    font-weight: 800;
    color: #0A2540;
    line-height: 1.08;
    margin-bottom: 20px;
}

.section-subtitle {
    max-width: 720px;
    margin: 0 auto;
    font-size: 1.15rem;
    line-height: 1.8;
    color: #475569;
}

/* Cards */
.services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
}

.service-card {
    background: white;
    border: 1px solid rgba(147, 196, 57, 0.2);
    border-radius: 28px;
    padding: 42px 36px;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
}

.service-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(145deg, #162456, #233781, #93C439);
    opacity: 0;
    transition: opacity 0.4s ease;
}

.service-card:hover::before {
    opacity: 1;
}

.service-card:hover {
    transform: translateY(-12px);
    box-shadow: 0 35px 70px -15px rgba(10, 37, 64, 0.18);
    border-color: #93C439;
}

.service-icon {
    width: 78px;
    height: 78px;
    background: linear-gradient(145deg, #162456, #233781, #93C439);
    border-radius: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 32px;
    box-shadow: 0 10px 25px rgba(22, 36, 86, 0.25);
    transition: all 0.5s ease;
}

.service-card:hover .service-icon {
    transform: scale(1.12) rotate(10deg);
    box-shadow: 0 15px 35px rgba(22, 36, 86, 0.35);
}

.service-body h3 {
    font-size: 1.55rem;
    font-weight: 700;
    color: #0A2540;
    margin-bottom: 14px;
}

.service-body p {
    color: #475569;
    line-height: 1.75;
    font-size: 1.02rem;
    flex: 1;
}

.service-cta {
    margin-top: 32px;
    padding-top: 20px;
    border-top: 1px solid rgba(147, 196, 57, 0.2);
}

.premium-link {
    color: #162456;
    font-weight: 700;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    transition: all 0.4s ease;
}

.premium-link:hover {
    color: #93C439;
    gap: 20px;
}

/* Responsive */
@media (max-width: 1100px) {
    .services-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .services-grid {
        grid-template-columns: 1fr;
    }

    .service-card {
        padding: 36px 28px;
    }
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.4;
    }
}

.hero-panel {
    margin-top: 32px;
    padding: 28px 24px;
    background: rgba(255, 255, 255, 0.09);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 28px;
    backdrop-filter: blur(28px);
    box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.4);
}

.panel-header {
    text-align: center;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.header-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: rgba(255, 255, 255, 0.12);
    padding: 6px 20px;
    border-radius: 9999px;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #e2e8f0;
    margin-bottom: 12px;
}

.badge-dot {
    width: 8px;
    height: 8px;
    background: #93C439;
    border-radius: 50%;
    box-shadow: 0 0 10px #93C439;
}

.panel-header h3 {
    color: white;
    font-size: 1.45rem;
    font-weight: 700;
    margin: 0;
}

/* Compact Panel Items */
.panel-item {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 14px 18px;
    border-radius: 18px;
    transition: all 0.3s ease;
    margin-bottom: 8px;
}

.panel-item:hover {
    background: rgba(255, 255, 255, 0.12);
    transform: translateX(6px);
}

.service-icon-wrap {
    position: relative;
    width: 46px;
    height: 46px;
    flex-shrink: 0;
}

.service-icon-bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(145deg, #162456, #233781, #93C439);
    border-radius: 14px;
}

.service-info h4 {
    font-size: 1.05rem;
    font-weight: 700;
    color: white;
    margin: 2px 0 4px;
}

.service-info p {
    font-size: 0.9rem;
    line-height: 1.5;
    color: rgba(241, 245, 249, 0.8);
}

/* View All Button */
.view-all-wrapper {
    margin-top: 16px;
    text-align: center;
}

.view-all-btn {
    display: inline-flex;
    align-items: center;
    padding: 10px 24px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 50px;
    font-weight: 600;
    font-size: 0.98rem;
    text-decoration: none;
    transition: all 0.4s ease;
}

.view-all-btn:hover {
    background: rgba(147, 196, 57, 0.2);
    border-color: #93C439;
    color: #93C439;
}

.news-media-section {
    padding: 120px 0;
    background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
}

.section-container {
    max-width: 1380px;
    margin: 0 auto;
    padding: 0 40px;
}

.section-header {
    text-align: center;
    margin-bottom: 80px;
}

.badge {
    display: inline-block;
    background: rgba(147, 196, 57, 0.12);
    color: #4A7043;
    font-size: 0.85rem;
    font-weight: 700;
    padding: 8px 26px;
    border-radius: 9999px;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 16px;
}

.section-header h2 {
    font-size: 2.9rem;
    font-weight: 800;
    color: #0A2540;
    margin-bottom: 16px;
}

.subtitle {
    font-size: 1.18rem;
    color: #475569;
    max-width: 680px;
    margin: 0 auto;
}

.news-media-section {
  padding: 130px 0;
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
}

.section-header {
  text-align: center;
  margin-bottom: 90px;
}

.premium-badge {
  display: inline-block;
  background: linear-gradient(90deg, #93C439, #4ADE80);
  color: #0A2540;
  font-size: 0.78rem;
  font-weight: 800;
  padding: 8px 28px;
  border-radius: 9999px;
  letter-spacing: 2px;
  margin-bottom: 16px;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 32px;
}

.news-card {
  background: white;
  border-radius: 32px;
  overflow: hidden;
  box-shadow: 0 20px 50px -15px rgba(10, 37, 64, 0.12);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border: 1px solid rgba(147, 196, 57, 0.12);
  animation: fadeUp 0.8s backwards var(--delay);
}

.news-card:hover {
  transform: translateY(-18px);
  box-shadow: 0 40px 85px -20px rgba(147, 196, 57, 0.28);
}

.news-visual {
  position: relative;
  height: 260px;
  overflow: hidden;
}

.news-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1s cubic-bezier(0.23, 1, 0.32, 1);
}

.news-card:hover .news-visual img {
  transform: scale(1.1);
}

.category-badge {
  position: absolute;
  top: 24px;
  left: 24px;
  background: rgba(10, 37, 64, 0.9);
  color: white;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 6px 18px;
  border-radius: 9999px;
  letter-spacing: 1px;
}

.news-content {
  padding: 36px;
}

.news-meta .news-date {
  font-size: 0.85rem;
  color: #64748B;
  margin-bottom: 12px;
}

.news-content h3 {
  font-size: 1.55rem;
  line-height: 1.35;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 16px;
}

.excerpt {
  color: #475569;
  line-height: 1.75;
  font-size: 1.02rem;
  margin-bottom: 28px;
}

.read-more-link {
  color: #162456;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  transition: all 0.4s ease;
}

.news-card:hover .read-more-link {
  color: #93C439;
  gap: 18px;
}

/* View All */
.view-all {
  text-align: center;
  margin-top: 80px;
}

.premium-cta {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 18px 48px;
  background: linear-gradient(135deg, #0A2540, #1E40AF, #93C439);
  color: white;
  font-weight: 700;
  font-size: 1.05rem;
  border-radius: 9999px;
  text-decoration: none;
  box-shadow: 0 20px 50px -10px rgba(10, 37, 64, 0.35);
  transition: all 0.5s ease;
}

.premium-cta:hover {
  transform: translateY(-4px) scale(1.03);
  box-shadow: 0 30px 70px -15px rgba(147, 196, 57, 0.4);
}
</style>
