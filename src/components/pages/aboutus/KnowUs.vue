<template>
     <Loader :loading="loading" v-if="loading" />
<div>
    <AppBar />

    <v-container fluid>
        <v-row justify="center" class="worship-section">
            <v-col cols="12" md="7">
                <div class="timeline">
                    <div class="header-section">
                        <div class="image-stack">
                            <!-- <v-img :aspect-ratio="1" class="stacked-image bg-white" src="@/assets/giving.jpg" width="100%" cover></v-img> -->
                            <v-img :aspect-ratio="1" class="stacked-image bg-white" src="@/assets/tag.png" width="80%" cover></v-img>
                        </div>
                        <div class="text-content">
                            <h4 class="title">Who We Are</h4>
                            <p class="description">
                                Welcome to <b>Bethel Revival Temple Morogoro</b>! As a vibrant
                                and welcoming community, we are dedicated to spreading the love
                                and teachings of Christ, committed to serving, supporting, and
                                uplifting our community through various programs and outreach
                                initiatives. Founded in [Year of Foundation], Bethel Revival
                                Temple began its journey under the leadership of our first
                                pastor, [Name of First Pastor]. Initially located at [Original
                                Location], we have since relocated to our current address at
                                [Current Address] to better serve our growing congregation.
                                Affiliated with the Tanzania Assemblies of God (TAG) churches,
                                we are proud to be part of a network dedicated to evangelism,
                                discipleship, and community service across Tanzania. Join us as
                                we continue to live out our mission and make a meaningful impact
                                in Morogoro and beyond.
                            </p>
                        </div>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>

    <v-container>
        <v-row>
            <v-col cols="12">
                <v-alert v-model="alert" border="start" color="cyan-darken-2" variant="tonal">
                    <h3 class="my-5">Our Values</h3>
                    <v-typography variant="body-1">
                        <ul>
                            <li>
                                <i class="mx-2">Faith</i>: We uphold the core teachings of
                                Christ as the foundation of our beliefs and actions.
                            </li>
                            <li>
                                <i class="mx-2">Compassion</i>: We are dedicated to showing love
                                and kindness to all individuals, reflecting Christ's compassion.
                            </li>
                            <li>
                                <i class="mx-2">Integrity</i>: We strive to live honestly and
                                with strong moral principles in every aspect of our lives.
                            </li>
                            <li>
                                <i class="mx-2">Community</i>: We are committed to building a
                                supportive and inclusive community where everyone feels valued.
                            </li>
                            <li>
                                <i class="mx-2">Service</i>: We actively seek opportunities to
                                serve others, both within our church and beyond, as an
                                expression of our faith.
                            </li>
                        </ul>
                    </v-typography>
                    <v-col cols="12">
                        <h3 class="my-5">Our Purpose</h3>
                        Our purpose is to be a beacon of hope and a source of strength for all
                        who seek to grow in their faith. We strive to live out the teachings
                        of Christ in every aspect of our lives, serving as a testament to His
                        love and grace.
                    </v-col>
                </v-alert>
            </v-col>
        </v-row>
    </v-container>

    <Footer />
</div>
</template>

  
  
<script>
import AppBar from "@/components/Layout/AppBar.vue";
import Footer from "@/components/Layout/Footer.vue";
import Loader from '@/components/Layout/Loader.vue';

export default {
    components: {
        AppBar,
        Footer,
        Loader
    },
    data() {
        return {
            alert: true, // You can set this to false if you don't want the alert to be shown by default
            loading: true, // Initial loading state
        };
    },
    mounted() {
    // Simulate loading delay for demonstration
    setTimeout(() => {
      this.loading = false; // Set loading to false once the page is ready
    }, 2000); // Adjust this delay as necessary
  },
};
</script>

<style scoped>
.image-stack {
    position: relative;
    width: 100%;
    /* Make sure the container is responsive */
    max-width: 400px;
    /* Limit the size for large screens */
    height: auto;
    /* Adjust height automatically based on width */
}

.stacked-image {
    /* position: absolute; */
    border-radius: 10px;
    /* Add border radius to make the images more attractive */
    top: 0;
    left: 0;
    width: 100%;
    max-width: 100%;
}

.stacked-image:nth-child(2) {
    top: 60px;
    /* Adjust this value to control the vertical overlap */
    left: 100px;
    /* Adjust this value to control the horizontal overlap */
}

.header-section {
    display: flex;
    flex-direction: column;
    /* Stack images and text vertically on small screens */
    align-items: center;
    position: relative;
}

.text-content {
    margin-top: 20px;
}

.title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
}

.description {
    font-size: 1rem;
    line-height: 1.5;
    font-weight: 300;
}

.v-container {
    margin-top: 20px;
}

@media (min-width: 600px) {
    .header-section {
        flex-direction: row;
        /* Align images and text side by side on larger screens */
        align-items: flex-start;
        justify-content: space-between;
    }

    .text-content {
        flex: 2;
        padding-left: 20px;
    }
}
</style>
