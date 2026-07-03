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
  components: { appBar,Home, Footer },

}
</script>

<style >

/*  */

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
