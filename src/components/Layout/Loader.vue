<template>
<div v-if="loading" class="loader-overlay">
  <div class="">
    <v-img src="@/assets/tag.png" class="animated-logo"></v-img>
  </div>
    <!-- Replace src with the correct path to your logo -->
</div>
</template>

<script>
export default {
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style >
.loader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FFF;
    /* Semi-transparent background */
    z-index: 1000;
    /* Ensure it's on top of other elements */
}

.animated-logo {
    width: 200px;
    /* Adjusted size of the logo */
    animation: logoAnimation 3s infinite;
    /* Add animation to the logo */
}

/* Keyframes for logo animation */
@keyframes logoAnimation {
    0% {
        transform: scale(1);
        opacity: 0.3;
    }

    50% {
        transform: scale(1.1);
        opacity: 1;
    }

    100% {
        transform: scale(1);
        opacity: 0.5;
    }
}
</style>
