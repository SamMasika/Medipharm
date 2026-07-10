<template>
<app-bar></app-bar>
<Home></Home>
<Footer></Footer>
</template>

<script>
import appBar from './appBar.vue'
import Footer from './Footer.vue';
import Home from './Home.vue';
export default {
    components: {
        appBar,
        Home,
        Footer
    },

}
</script>

<style>
/*  */
.primary-action {
    background: linear-gradient(135deg, #0A2540, #1E40AF, #93C439) !important;
    color: white !important;
    font-weight: 700;
    padding: 0 38px !important;
    font-size: 0.95rem;
    letter-spacing: 0.9px;
    text-transform: uppercase;
    box-shadow: 0 16px 45px rgba(15, 23, 42, 0.3);
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
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
    transition: opacity 2s cubic-bezier(0.23, 1, 0.32, 1),
        transform 8s cubic-bezier(0.23, 1, 0.32, 1);
    filter: brightness(0.45) contrast(1.15) saturate(0.9);
}

.hero-bg img.active {
    opacity: 1;
    transform: scale(1);
}

.hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #162456, #233781, #93c439);
    opacity: 0.92;
    z-index: 1;
}

.hero-grid {
    position: absolute;
    inset: 0;
    z-index: 2;
    background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px,
            transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 90px 90px;
    opacity: 0.45;
}

/* Container - Desktop unchanged */
.hero-container {
    position: relative !important;
    z-index: 5;
    max-width: 1520px;
    margin: 0 auto;
    padding: 0 100px;
    display: flex;
    align-items: center;
    gap: 90px;
    min-height: 100vh;
}

.hero-left h1 {
    margin-top: 20px;
    /* font-family: 'Playfair Display', serif; */
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
    background: linear-gradient(90deg, #ffffff, #aedf54, #93c439);
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

.primary-action:hover {
    transform: translateY(-6px) scale(1.04);
    box-shadow: 0 28px 60px rgba(15, 23, 42, 0.38);
}

.slider-wrapper {
    position: relative;
    flex-grow: 1;
}

.slider-text-wrapper {
    position: relative;
    height: 50px;
}

.slider-text {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    margin: 0;
    color: white;
}

/* Slide horizontal animation */
.slide-horizontal-enter-active {
    transition: all 0.6s ease;
    transform: translateX(100%);
    opacity: 0;
}

.slide-horizontal-enter-to {
    transform: translateX(0);
    opacity: 1;
}

.slide-horizontal-leave-active {
    transition: all 0.6s ease;
    position: absolute;
    width: 100%;
    transform: translateX(0);
    opacity: 1;
}

.slide-horizontal-leave-to {
    transform: translateX(-100%);
    opacity: 0;
}

.nav-link {
    margin-left: 20px;
    text-transform: uppercase;
    letter-spacing: 1.2px;
}

.text-red {
    color: #d32f2f !important;
}

.text-dark-blue {
    color: #020B2C !important;
}

.fabric-section {
    background: #020B2C;
    border-radius: 12px;
}

.fabric-card {
    cursor: pointer;
    transition: transform 0.3s ease;
}

.fabric-card:hover {
    transform: scale(1.05);
}

.red-btn {
    color: white !important;
}

.red-btn:hover {
    background-color: #9a2424 !important;
    color: white !important;
    transition: background-color 0.3s ease;
}
</style>
