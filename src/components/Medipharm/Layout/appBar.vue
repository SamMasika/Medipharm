<template>
<div>
    <!-- NAVBAR -->
    <!-- NAVBAR -->
    <v-app-bar class="medifarm-nav" height="88" flat fixed elevation="0">
        <div class="nav-shell">

            <!-- BRAND -->
            <div class="brand-block">
                <router-link to="/" class="logo-wrap">
                    <img :src="coat" alt="Coat of Arms" width="60" />
                </router-link>
            </div>

            <!-- NAV - Now visible from Large screens -->
            <nav class="command-nav d-none d-lg-flex">
                <router-link to="/" class="cmd-item" :class="{ active: isActive('/') }">
                    Home
                </router-link>

                <!-- About Us -->
                <!-- About Us -->
                <v-menu offset-y open-on-hover transition="scale-transition" content-class="premium-dropdown">
                    <template v-slot:activator="{ props }">
                        <div class="cmd-item dropdown-trigger" v-bind="props" :class="{ active: isActive('/about') }">
                            About Us
                            <v-icon size="20" class="ml-1 arrow">mdi-menu-down</v-icon>
                        </div>
                    </template>
                    <v-card class="dropdown-card wide-dropdown" min-width="540" flat>
                        <div class="menu-grid two-column">
                            <!-- Better for About Us -->
                            <div v-for="(item, i) in aboutLinks" :key="i" class="menu-item" @click="$router.push(item.route)">
                                <div class="item-icon">
                                    <!-- Use this for all icons in dropdowns -->
                                    <v-icon size="26" color="#93C439">mdi-factory</v-icon>
                                </div>
                                <div class="item-content">
                                    <div class="menu-item-title">{{ item.name }}</div>
                                    <div class="menu-item-desc">{{ item.description }}</div>
                                </div>
                                <div class="menu-arrow">→</div>
                            </div>
                        </div>
                    </v-card>
                </v-menu>

                <!-- Facilities & Products remain similar, just make sure they have <div class="menu-arrow">→</div> at the end -->
                <!-- Facilities -->
                <v-menu offset-y open-on-hover transition="scale-transition" content-class="premium-dropdown">
                    <template v-slot:activator="{ props }">
                        <div class="cmd-item dropdown-trigger" v-bind="props" :class="{ active: isActive('/facilities') }">
                            Our Facilities
                            <v-icon size="20" class="ml-1 arrow">mdi-menu-down</v-icon>
                        </div>
                    </template>
                    <v-card class="dropdown-card wide-dropdown" min-width="540" flat>
                        <div class="menu-grid two-column">
                            <div v-for="(item, i) in facilitiesLinks" :key="i" class="menu-item" @click="$router.push(item.route)">
                                <div class="item-icon">
                                    <v-icon size="26" color="#162456">mdi-factory</v-icon>
                                </div>
                                <div class="item-content">
                                    <div class="menu-item-title">{{ item.name }}</div>
                                    <div class="menu-item-desc">{{ item.description }}</div>
                                </div>
                                <div class="menu-arrow">→</div>
                            </div>
                        </div>
                    </v-card>
                </v-menu>

                <!-- Products -->
                <v-menu offset-y open-on-hover transition="scale-transition" content-class="premium-dropdown">
                    <template v-slot:activator="{ props }">
                        <div class="cmd-item dropdown-trigger" v-bind="props" :class="{ active: isActive('/products') }">
                            Products
                            <v-icon size="20" class="ml-1 arrow">mdi-menu-down</v-icon>
                        </div>
                    </template>
                    <v-card class="dropdown-card wide-dropdown mega-menu" min-width="540" flat>

                        <div class="menu-grid two-column">
                            <div v-for="(item, i) in productsLinks" :key="i" class="menu-item" @click="$router.push(item.route)">
                                <div class="item-icon">
                                    <v-icon size="28" color="#162456">mdi-package-variant</v-icon>
                                </div>
                                <div class="item-content">
                                    <div class="menu-item-title">{{ item.name }}</div>
                                    <div class="menu-item-desc">{{ item.description }}</div>
                                </div>
                                <div class="menu-arrow">→</div>
                            </div>
                        </div>

                        <div class="menu-footer">
                            <router-link to="/products" class="explore-all">
                                View Complete Product Catalog
                                <span class="arrow">→</span>
                            </router-link>
                        </div>
                    </v-card>
                </v-menu>

                <router-link to="/news" class="cmd-item" :class="{ active: isActive('/news') }">
                    News & Media
                </router-link>
            </nav>

            <!-- ACTIONS -->
            <div class="actions">
              
                <v-btn class="primary-action d-none d-lg-flex" rounded size="large" @click="requestConsultation">
                    Get In Touch
                    <v-icon end size="20">mdi-arrow-right</v-icon>
                </v-btn>
  <!-- === LANGUAGE SWITCHER === -->
                <v-menu offset-y open-on-hover transition="scale-transition" content-class="premium-dropdown">
                    <template v-slot:activator="{ props }">
                        <div class="lang-switcher cmd-item" v-bind="props">
                            <span class="flag">{{ currentLang.flag }}</span>
                            <span class="lang-code">{{ currentLang.code.toUpperCase() }}</span>
                            <v-icon size="20" class="ml-1 arrow">mdi-menu-down</v-icon>
                        </div>
                    </template>
                    <v-card class="dropdown-card lang-dropdown" min-width="220" flat>
                        <div class="lang-list">
                            <div v-for="lang in languages" :key="lang.code" class="lang-option" :class="{ active: lang.code === currentLang.code }" @click="switchLanguage(lang)">
                                <span class="flag">{{ lang.flag }}</span>
                                <span class="lang-name">{{ lang.name }}</span>
                                <v-icon v-if="lang.code === currentLang.code" color="#93C439" size="20" class="ml-auto">mdi-check</v-icon>
                            </div>
                        </div>
                    </v-card>
                </v-menu>
                <!-- Hamburger Menu - Only for tablets & mobile -->
                <v-btn icon class="d-lg-none" @click="drawer = true" size="x-large" variant="text">
                    <v-icon size="28">mdi-menu</v-icon>
                </v-btn>
            </div>
            <div class="brand-block ma-11">
                <router-link to="/" class="logo-wrap">
                    <img :src="logo" alt="Medifarm Logo" />
                </router-link>
            </div>

        </div>
    </v-app-bar>
    <!-- DRAWER -->
    <v-navigation-drawer v-model="drawer" right temporary class="medifarm-drawer" width="360">
        <div class="drawer-top">
            <img :src="logo" alt="Medifarm" />
            <v-btn icon @click="drawer = false" size="large">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </div>

        <div class="drawer-body">
            <!-- Main Links -->
            <div v-for="(link, i) in mainLinks" :key="i" class="drawer-link" @click="navigate(link.route)">
                {{ link.name }}
            </div>

            <!-- About Us -->
            <div class="drawer-section">
                <div class="drawer-section-title">About Us</div>
                <div v-for="(item, i) in aboutLinks" :key="`about-${i}`" class="drawer-sublink" @click="navigate(item.route)">
                    {{ item.name }}
                </div>
            </div>

            <!-- Facilities -->
            <div class="drawer-section">
                <div class="drawer-section-title">Our Facilities</div>
                <div v-for="(item, i) in facilitiesLinks" :key="`fac-${i}`" class="drawer-sublink" @click="navigate(item.route)">
                    {{ item.name }}
                </div>
            </div>

            <!-- Products -->
            <div class="drawer-section">
                <div class="drawer-section-title">Products</div>
                <div v-for="(item, i) in productsLinks" :key="`prod-${i}`" class="drawer-sublink" @click="navigate(item.route)">
                    {{ item.name }}
                </div>
            </div>
            <!-- Language Switcher in Drawer -->
            <div class="drawer-section">
                <div class="drawer-section-title">Language</div>
                <div v-for="lang in languages" :key="lang.code" class="drawer-sublink" :class="{ active: lang.code === currentLang.code }" @click="switchLanguage(lang)">
                    <span class="flag mr-3">{{ lang.flag }}</span>
                    {{ lang.name }}
                </div>
            </div>
            <v-btn class="drawer-cta mt-8" block rounded size="large" @click="requestConsultation">
                Get In Touch
            </v-btn>
        </div>
    </v-navigation-drawer>
</div>
</template>

<script>
import logo from '@/assets/medifarm/logo.png';
import coat from '@/assets/medifarm/coat.png';

export default {
    data() {
        return {
            drawer: false,
            logo,
            coat,
            currentLang: {
                code: 'en',
                name: 'English',
                flag: '🇬🇧'
            },
            languages: [{
                    code: 'en',
                    name: 'English',
                    flag: '🇬🇧'
                },
                {
                    code: 'sw',
                    name: 'Swahili',
                    flag: '🇹🇿'
                },
                {
                    code: 'fr',
                    name: 'Français',
                    flag: '🇫🇷'
                },
                {
                    code: 'ar',
                    name: 'العربية',
                    flag: '🇸🇦'
                },
                // Add more languages as needed
            ],
            mainLinks: [{
                    name: "Home",
                    route: "/"
                },
                {
                    name: "Quality & Compliance",
                    route: "/quality"
                },
                {
                    name: "News & Media",
                    route: "/news"
                },
            ],
            aboutLinks: [{
                    name: "Our Story",
                    route: "/about",
                    description: "Discover our journey of excellence since 1998"
                },
                {
                    name: "Leadership Team",
                    route: "/about/leadership",
                    description: "Meet the visionary leaders driving innovation"
                },
                {
                    name: "Mission & Values",
                    route: "/about/mission",
                    description: "Our commitment to quality, integrity, and sustainability"
                },
                {
                    name: "Careers",
                    route: "/about/careers",
                    description: "Join our growing global team of professionals"
                },
            ],
            facilitiesLinks: [{
                    name: "Manufacturing",
                    route: "/facilities/manufacturing",
                    description: "State-of-the-art manufacturing facilities equipped with advanced automation and strict quality control"
                },
                {
                    name: "Research & Development",
                    route: "/facilities/rnd",
                    description: "Cutting-edge R&D center dedicated to innovation and product development"
                },
                {
                    name: "Distribution Network",
                    route: "/facilities/distribution",
                    description: "Robust global distribution network ensuring timely and safe delivery worldwide"
                },
                {
                    name: "Sustainability",
                    route: "/facilities/sustainability",
                    description: "Committed to environmentally responsible practices and sustainable manufacturing"
                },
            ],
            productsLinks: [{
                    name: "Surgical Face Mask 3-Ply",
                    route: "/products/pharma",
                    description: "High-quality 3-ply surgical masks with excellent filtration and comfort"
                },
                {
                    name: "N95 Respirator Mask with Valve",
                    route: "/products/herbal",
                    description: "Advanced N95 protection with exhale valve for enhanced breathability"
                },
                {
                    name: "N95 Respirator Mask without Valve",
                    route: "/products/vet",
                    description: "Premium N95 respirator offering maximum protection and secure fit"
                },
                {
                    name: "Examination Gloves Powder-Free",
                    route: "/products/devices",
                    description: "Latex-free, powder-free nitrile gloves with superior dexterity and sensitivity"
                },
                {
                    name: "Examination Gloves Powdered",
                    route: "/products/devices",
                    description: "Classic powdered nitrile gloves designed for easy donning and reliable protection"
                },
            ],
        };
    },

    methods: {
        switchLanguage(lang) {
            this.currentLang = lang;
            // TODO: Integrate with vue-i18n or your translation system here
            // Example: this.$i18n.locale = lang.code;
            this.drawer = false;
        },
        isActive(route) {
            if (route === '/') {
                return this.$route.path === '/'; // Only exact match for Home
            }
            return this.$route.path === route || this.$route.path.startsWith(route + '/');
        },

        navigate(route) {
            this.$router.push(route);
            this.drawer = false;
        },

        requestConsultation() {
            this.$router.push('/contact');
            this.drawer = false;
        },
    },
};
</script>

<style scoped>
.medifarm-nav {
    background: rgba(255, 255, 255, 0.97) !important;
    backdrop-filter: blur(32px);
    border-bottom: 1px solid rgba(10, 37, 64, 0.1);
    position: sticky;
    top: 0;
    z-index: 9999;
    box-shadow: 0 10px 40px rgba(5, 18, 31, 0.12);
}

.nav-shell {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1580px;
    margin: 0 auto;
    padding: 0 60px;
}

/* BRAND */
.brand-block .logo-wrap img {
    height: 60px;
    margin-right: 20px;
    max-width: 100%;
    transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.brand-block .logo-wrap:hover img {
    transform: scale(1.08);
}

/* NAV */
.command-nav {
    display: flex;
    align-items: center;
    gap: 36px;
    margin: 0 auto;
}

.cmd-item {
    color: #0A2540;
    font-weight: 600;
    font-size: 0.95rem;
    letter-spacing: 0.8px;
    text-decoration: none;
    text-transform: uppercase;
    position: relative;
    padding: 12px 10px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: 8px;
}

.dropdown-trigger {
    padding-right: 6px;
}

.cmd-item:hover,
.cmd-item.active {
    background: linear-gradient(90deg, #93C439, #374370, #162456);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.cmd-item::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 3px;
    background: linear-gradient(135deg, #162456, #374370, #93C439);
    transition: width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    border-radius: 3px;
}

.cmd-item:hover::after,
.cmd-item.active::after {
    width: 100%;
}

/* Dropdown Arrow */
.arrow {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-trigger:hover .arrow {
    transform: rotate(180deg);
}

/* PREMIUM DROPDOWN - Enhanced for Vuetify 3 */
.premium-dropdown {
    margin-top: 12px !important;
    border-radius: 20px !important;
    box-shadow: 0 25px 80px -12px rgba(10, 37, 64, 0.28) !important;
    z-index: 9999 !important;
}

.premium-list-item {
    min-height: 56px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    padding-left: 24px !important;
    padding-right: 24px !important;
}

.premium-list-item:hover {
    background: rgba(147, 196, 57, 0.09);
    transform: translateX(10px);
    color: #162456;
}

/* ACTIONS */
.actions {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 16px;
}

/* DRAWER */
.medifarm-drawer {
    background: linear-gradient(145deg, #162456, #233781, #374370);
    color: white;
}

.drawer-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 28px 32px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.18);
}

.drawer-top img {
    height: 58px;
}

.drawer-body {
    padding: 32px;
}

.drawer-link {
    padding: 22px 0;
    font-size: 1.12rem;
    font-weight: 600;
    border-bottom: 1px solid rgba(255, 255, 255, 0.14);
    cursor: pointer;
    transition: all 0.3s ease;
}

.drawer-link:hover {
    color: #93C439;
    padding-left: 20px;
}

.drawer-section {
    margin-top: 32px;
}

.drawer-section-title {
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    opacity: 0.85;
    margin-bottom: 14px;
    padding-left: 6px;
}

.drawer-sublink {
    padding: 15px 0;
    padding-left: 16px;
    font-size: 1.05rem;
    font-weight: 500;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    cursor: pointer;
    transition: all 0.3s ease;
}

.drawer-sublink:hover {
    color: #FCD34D;
    padding-left: 28px;
}

.drawer-cta {
    background: linear-gradient(135deg, #93C439, #0F766E) !important;
    color: white !important;
    font-weight: 700;
    padding: 22px !important;
    font-size: 1.1rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    box-shadow: 0 12px 35px rgba(147, 196, 57, 0.35);
}

/* RESPONSIVE */
@media (max-width: 1280px) {
    .nav-shell {
        padding: 0 40px;
    }
}

@media (max-width: 768px) {
    .nav-shell {
        padding: 0 20px;
    }
}

/* ====================== ULTRA PREMIUM MENUS ====================== */

.premium-dropdown {
    margin-top: 20px !important;
    z-index: 9999 !important;
}

.dropdown-card {
    border-radius: 32px;
    margin-top: 35px;
    border: 1px solid rgba(147, 196, 57, 0.25);
    background: rgba(255, 255, 255, 0.975);
    backdrop-filter: blur(28px);
    box-shadow: 0 50px 110px -20px rgba(10, 37, 64, 0.35),
        inset 0 1px 0 rgba(255, 255, 255, 0.6);
    overflow: hidden;
    position: relative;
}

/* Top accent line */
.dropdown-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #93C439, #1E40AF, #93C439);
}

.wide-dropdown {
    padding: 36px 40px;
}

/* Grid */
.menu-grid {
    display: grid;
    gap: 16px;
}

.two-column {
    grid-template-columns: repeat(2, 1fr);
}

/* Menu Item with Beautiful Hover Arrow */
.menu-item {
    padding: 26px 28px;
    border-radius: 24px;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    display: flex;
    align-items: flex-start;
    gap: 20px;
    position: relative;
}

.menu-item:hover {
    transform: translateY(-8px);
    box-shadow: 0 28px 60px -15px rgba(147, 196, 57, 0.28);
    background: white;
}

/* Arrow */
.menu-arrow {
    margin-left: auto;
    align-self: center;
    font-size: 1.9rem;
    font-weight: 300;
    color: #93C439;
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-item:hover .menu-arrow {
    opacity: 1;
    transform: translateX(0);
    color: #4ADE80;
}

/* Icon & Content */
.item-icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(147, 196, 57, 0.1);
    border-radius: 16px;
    transition: all 0.5s ease;
    flex-shrink: 0;
}

.menu-item:hover .item-icon {
    background: rgba(147, 196, 57, 0.2);
    transform: scale(1.12) rotate(12deg);
}

.item-content {
    flex: 1;
}

.menu-item-title {
    font-weight: 700;
    font-size: 1.13rem;
    color: #0A2540;
    margin-bottom: 8px;
    letter-spacing: -0.3px;
}

.menu-item-desc {
    font-size: 0.93rem;
    line-height: 1.55;
    color: #475569;
}

/* Products Mega Footer */
.menu-footer {
    margin-top: 40px;
    padding-top: 28px;
    border-top: 1px solid rgba(147, 196, 57, 0.22);
    text-align: center;
}

.explore-all {
    font-weight: 700;
    font-size: 1.1rem;
    color: #162456;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 10px 28px;
    border-radius: 50px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.explore-all:hover {
    background: rgba(147, 196, 57, 0.1);
    color: #93C439;
    gap: 22px;
}

/* Dropdown Arrow */
.arrow {
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-trigger:hover .arrow {
    transform: rotate(180deg);
}

/* Nav Link */
.cmd-item:hover,
.cmd-item.active {
    background: linear-gradient(90deg, #93C439, #374370, #162456);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

/* === LANGUAGE SWITCHER STYLES === */
.lang-switcher {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.lang-switcher:hover {
    background: rgba(147, 196, 57, 0.1);
}

.flag {
    font-size: 1.4rem;
    line-height: 1;
}

.lang-code {
    font-weight: 700;
    letter-spacing: 0.5px;
}

/* Lang Dropdown */
.lang-dropdown {
    padding: 12px 8px;
    border-radius: 20px;
}

.lang-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.lang-option {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 20px;
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-weight: 500;
}

.lang-option:hover {
    background: rgba(147, 196, 57, 0.12);
    transform: translateX(6px);
}

.lang-option.active {
    background: rgba(147, 196, 57, 0.18);
    font-weight: 700;
}

/* Drawer language */
.drawer-sublink .flag {
    font-size: 1.3rem;
}
</style>
