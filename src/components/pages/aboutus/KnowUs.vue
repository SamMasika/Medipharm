<template>
<Loader :loading="loading" v-if="loading" />
<div v-else>
    <AppBar />
    <v-container fluid class="back-container">
        <v-row justify="center" class="align-center my-8">
            <v-col cols="12" md="7" class="d-flex align-center justify-center my-8">
                <v-row>
                    <v-col cols="12" md="4" class="image-stack-container my-8 d-flex justify-center">
                        <!-- Image for medium and larger devices -->
                        <!-- <v-img class="stacked-image" src="@/assets/mtokambali.jpg" max-height="180px" max-width="45%" cover aspect-ratio="16/9" /> -->
                        <!-- Centered image for small devices -->
                        <v-img class="stacked-image d-none d-md-flex d-lg-flex" src="@/assets/mtokambali.jpg" max-height="350px" max-width="100%" cover aspect-ratio="16/9" />
                    </v-col>
                    <v-col cols="12" md="8" class="contact-info-container belief-container">
                        <h2 class="my-">Who<i class="text-color"> We Are</i></h2>
                        <p class="description ">
                            Welcome to <b>Bethel Revival Temple Morogoro</b>! As a vibrant and welcoming community, we are dedicated to spreading the love and teachings of Christ, committed to serving, supporting, and uplifting our community through various programs and outreach initiatives. The church started in 1987 under <i class="text-color"> <b>Pastor Barnabas Mtokambali</b> </i> , had less than ten members. Services
                            began to be held at Mwembesongo Primary School. God has been increasing the church for those who
                            are saved and reaching 4329 members at present.
                            Affiliated with the Tanzania Assemblies of God (TAG) churches, we are proud to be part of a network dedicated to evangelism, discipleship, and community service across Tanzania. Join us as we continue to live out our mission and make a meaningful impact in Morogoro and beyond.
                        </p>
                        <p class="my-5 text-color"><i>“The 13 years of Revival fire, we want the Lord and his Power”</i></p>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>

    <v-container>
        <v-row>
            <v-col cols="12">
                <v-alert v-model="alert" border="start" class="text-color belief-container" variant="tonal">
                    <h3 class="my-5">Our Values</h3>
                    <v-typography variant="body-1" class="values-list">
                        <ul>
                            <li>
                                <i class="mx-2">STEWARDHIP (1Cor 4:1-2)</i>: As good stewards of Jesus Christ, we must be trustworthy to effectively reach our targets with great care.
                            </li>
                            <li>
                                <i class="mx-2">SERVANTHOOD</i>: Called to serve and not to be served, we must prioritize serving God through self-sacrifice and uplifting others (Matthew 20:25-28, John 13:1-17, Ephesians 6:5-8, Philippians 2:5-8).
                            </li>
                            <li>
                                <i class="mx-2">SACRIFICE</i>: We are called to sacrifice our lives to build the Kingdom and body of Christ, focusing on giving rather than receiving (Romans 12:1-2).
                            </li>
                            <li>
                                <i class="mx-2">LOVE</i>: Love is essential for unity and efficiency, fostering respect and obedience within the body of Christ (1 Corinthians 13; Romans 12:3-8; Ephesians 4:1-16; 1 Peter 4:8-11).
                            </li>
                            <li>
                                <i class="mx-2">PUNCTUALITY</i>: Time is valuable, and we must manage it effectively (Ephesians 5:15-16).
                            </li>
                            <li>
                                <i class="mx-2">RISK TAKING</i>: True faith dares to achieve the impossible, guided by vision and belief (Ephesians 3:20-21, Hebrews 11:6).
                            </li>
                            <li>
                                <i class="mx-2">CREATIVITY</i>: Innovation and creativity are essential in our fast-changing world, requiring effort and confidence (Exodus 36:1-8).
                            </li>
                            <li>
                                <i class="mx-2">EXCELLENCE</i>: Our goal is to glorify God, ensuring everything we do is done excellently (1 Corinthians 10:31).
                            </li>
                            <li>
                                <i class="mx-2">PRAYERS</i>: Prayer is vital, as we recognize our dependence on Jesus for all things (Luke 11:1-13, 1 Thessalonians 5:17-18, Ephesians 6:18, 1 Chronicles 29:12). Remember to pray for your work/job always.
                            </li>
                        </ul>
                    </v-typography>
                    <v-col cols="12">
                        <h3 class="my-5">Our Purpose</h3>
                        <p>Bethel Revival Temple exists for several reasons: <strong><i>Worship</i></strong>, <strong><i>Fellowship</i></strong>, <strong><i>Evangelism</i></strong>, <strong><i>Ministry/Service</i></strong>, <strong><i>Discipleship</i></strong>.</p>
                        <p class="my-3"><strong>Description of our reasons for being:</strong></p>
                        <v-typography variant="body-1" class="purpose-list">
                            <ul>
                                <li>
                                    <i class="mx-2">Worship</i>: An act of showing sincere love to God through the Power and anointing of the Holy Spirit (John 4:19-24; Hebrews 10:25; 1 Corinthians 1:21; Ephesians 5:19; Romans 12:1; Psalms 150).
                                </li>
                                <li>
                                    <i class="mx-2">Fellowship</i>: Strengthening love, unity, and care among believers (Acts 2:42, 44; John 13:34, 35; Romans 15:26).
                                </li>
                                <li>
                                    <i class="mx-2">Evangelism</i>: Preaching the good news of Jesus Christ, a responsibility for all church members (Acts 1:8; Matthew 28:19, 20).
                                </li>
                                <li>
                                    <i class="mx-2">Ministry/Service</i>: Demonstrating God's love through the use of the Holy Spirit's gifts (Luke 4:18, 19; John 13:3, 14).
                                </li>
                                <li>
                                    <i class="mx-2">Discipleship</i>: Teaching the Word of God for growth in salvation and effective service (Matthew 28:19-20; Ephesians 4:11-17).
                                </li>
                            </ul>
                        </v-typography>
                    </v-col>
                </v-alert>
            </v-col>
        </v-row>
    </v-container>

    <v-container>
        <!-- Section Title -->
        <div class="text-center my-2">
            <h2 class="section-title">Our Pastors</h2>
        </div>
        <div class="text-center my-3 watermark-section">
            <p class="service-description">
                <i>“So Christ Himself gave the apostles, the prophets, the evangelists, <strong>the pastors</strong>, and teachers, to equip His people for works of service, so that the body of Christ may be built up.”</i>
            </p>
        </div>
        <div class="text-center">
            <p class="service-description bible-verse text-bold">
                <i>Ephesians 4:11-12 (NIV)</i>
            </p>
        </div>
        <div class="text-center d-flex">
            <v-avatar size="480" color="blue-grey-lighten-5">
                <v-img src="@/assets/mtoka.png" alt="Senior Pastor" class="my-3" cover  style="object-fit: cover; display: flex; align-items: center; justify-content: center;"></v-img>
            </v-avatar>
            <div class="text-center" style="padding: 150px 70px;">
                <h3 class="my-1">Bishop Dr. Barnabas W. Mtokambali:</h3>
                <p class="text-color"><i>SENIOR PASTOR: Worship, Leadership and Vision.</i></p>
            </div>
        </div>
    </v-container>
    <v-container fluid>
        <v-row justify="center">
            <v-col cols="12" md="10">
                <v-slide-group v-model="slideModel" center-active class="service-carousel " :continuous="false">
                    <v-slide-group-item v-for="(pastor, index) in pastors" :key="index">
                        <v-card class="service-card ma-4 card-bordered" width="300px" elevation="0" rounded="lg">
                            <v-card-title class="d-flex justify-center my-3">
                                <v-avatar size="250" color="blue-grey-lighten-5">
                                    <v-img :src="pastor.image" alt="Pastor Image" class="uniform-img" cover style="object-fit: cover; display: flex; align-items: center; justify-content: center;">
                                    </v-img>
                                </v-avatar>

                            </v-card-title>
                            <v-card-text class="text-center " style="font-size:medium">
                                <strong>{{ pastor.name }}</strong>
                                <p class="text-color"> <i>{{ pastor.description }}</i> </p>
                            </v-card-text>
                        </v-card>
                    </v-slide-group-item>
                </v-slide-group>
            </v-col>
        </v-row>
    </v-container>

    <v-container fluid>
        <v-row justify="center">
            <v-col cols="12" md="8">
                <v-alert v-model="alert" border="start" class="text-color about-container mx-8" variant="tonal">
                    <h3 class="my-5">Our beliefs</h3>
                    <p>
                        This “Foundations of Faith” contains the 16 doctrines of the Assemblies of God. These are non-negotiable tenets of faith that all Assemblies of God churches adhere to. Four of these, Salvation, the Baptism in the Holy Spirit, Divine Healing, and the Second Coming of Christ are considered Cardinal Doctrines which are essential to the church’s core mission of reaching the world for Christ.
                    </p>
                    <div class="my-8">
                        <v-btn class="custom-view-color" rounded="xl" append-icon="mdi-menu-right" @click="goToBelief">Our Foundations of Faith</v-btn>
                    </div>
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
import loaderSet from '@/mixins/loaderSet.js'
export default {
    mixins:[loaderSet],
    components: {
        AppBar,
        Footer,
        Loader
    },
    data() {
        return {
            alert: true, // You can set this to false if you don't want the alert to be shown by default
            slideModel: 0,
            pastors: [{
                    name: "Yona Mganga",
                    description: "Ministry & Administration, Mission, Churches Building; Family & Marriage; all church departments.",
                    image: require("@/assets/pastors/Yona Mganga.png"),
                },
                {
                    name: "Lilian Mariki",
                    description: "Fellowship, Intercessory and Deliverance, Visitors.",
                    image: require("@/assets/pastors/Lilian Mariki.png"),

                },
                {
                    name: "Wema Khuni",
                    description: "Music and praise, Director of church building, Strategic plan; International Correspondences & Cluster G.",
                    image: require("@/assets/pastors/Wema Khuni.png"),
                },
                {
                    name: "Shanel Silayo",
                    description: "Church security, courtship, & Cluster C. ",
                    image: require("@/assets/pastors/Shanel Silayo.png"),
                },
                {
                    name: "Sarah Silayo",
                    description: "Students & children (Children’s Church & CASFETA Junior).",
                    image: require("@/assets/pastors/Sarah Silayo.png"),
                },
                {
                    name: "Alicia Gwama",
                    description: "Deaf ministry, Caleb ministry, & Cluster A.",
                    image: require("@/assets/pastors/Alicia Gwama.png"),
                },
                {
                    name: "Joel Ephraim",
                    description: "Projects & physical developments, CASFETA Campus, international church & fellowship, MEL, & Cluster D.",
                    image: require("@/assets/pastors/Joel Ephraim.png"),
                },
                {
                    name: "Agrey Kapinga",
                    description: "PCF, Do not pass me, ushers, & Cluster H.",
                    image: require("@/assets/pastors/Agrey Kapinga.png"),
                },
                {
                    name: "Athanas Hiluka",
                    description: "Discipleship and literature, radio ministry, & Cluster B. ",
                    image: require("@/assets/pastors/Athanas Hiluka.png"),
                },
                {
                    name: "Aurelia Luziro",
                    description: "Evangelism, new believers, baptism, & Cluster F.",
                    image: require("@/assets/pastors/Aurelia Luziro.png"),
                },
                {
                    name: "Gregory Peter",
                    description: "CASFETA Secondary, Victory Church, & Cluster J.",
                    image: require("@/assets/pastors/Gregory Peter.png"),
                },
                {
                    name: "Jastin Muro",
                    description: "Church cashier, counseling, reception, and guidance.",
                    image: require("@/assets/pastors/Justine Muro.png"),
                },
            ],
        };
    },
    methods: {
        startAutoSlide() {
            setInterval(() => {
                this.slideModel = (this.slideModel + 1) % this.pastors.length;
            }, 3000); // Slide every 4 seconds
        },
        handleToggle() {

            this.$router.push('/about'); // Redirect to the '/about' path

        },
        goToBelief() {
            this.$router.push('/belief');
        },
    },
    mounted() {
        // Simulate loading delay for demonstration
     
        this.startAutoSlide();
    },
};
</script>

<style>
.text-color {
    color: #A82228 !important;
}

.image-stack {
    position: relative;
    width: 300%;
    /* Make sure the container is responsive */
    max-width: 600px;
    gap: 10px;
    /* Limit the size for large screens */
    height: auto;
    /* Adjust height automatically based on width */
}

.card-bordered {
    border: 0.5px solid #e0e0e0;
    /* Add the desired border color and width */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* Optional: add a subtle shadow */
    border-radius: 12px;
    /* Ensures the border follows the rounded corners */
}

.stacked-image {
    /* position: absolute; */
    border-radius: 10px;
    /* Add border radius to make the images more attractive */
    top: 0;
    left: 0;
    width: 100%;
    max-width: 200%;
}

.stacked-image:nth-child(2) {
    top: 100px;
    /* Adjust this value to control the vertical overlap */
    left: -70px;
    /* Adjust this value to control the horizontal overlap */
}

.header-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: 80px;
    position: relative;
    gap: 190px;
    /* Adds space between the image stack and the text */
}

.text-content {
    margin-top: 20px;
}

.description {
    font-size: 1rem;
    line-height: 1.5;
    /* text-align: justify; */
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

.activity-card {
    margin-bottom: 16px;
}

.values-list ul,
.purpose-list ul {
    list-style: none;
    padding-left: 0;
}

.values-list li,
.purpose-list li {
    margin-bottom: 1.5em;
}

.values-list i,
.purpose-list i {
    font-style: italic;
    margin-right: 0.5em;
}

.values-list p,
.purpose-list p {
    margin-bottom: 1em;
    line-height: 1.6;
}

.back-container {
    position: relative;
    background: #E9D3CD;
    /* Slightly opaque white background */
    padding: 20px 40px;
    margin-top: 0;
    /* margin-bottom: 0; */
    overflow: hidden;
}

.back-container::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 800px;
    /* Adjust size as needed */
    height: 600px;
    /* Adjust size as needed */
    background-image: url('@/assets/tag.png');
    /* Replace with your actual logo path */
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    transform: translate(-50%, -50%);
    opacity: 0.04;
    /* Adjust opacity for a subtle faded look */
    z-index: 1;
    /* Behind the content */
}

.uniform-img {
    width: 781px;
    /* Set a fixed width */
    height: 666px;
    /* Set a fixed height */
    object-fit: cover;
    /* Ensures the image is cropped and fits within the box */
    /* border-radius: 50%;  */
}

.avatar-border {
    border: 3px solid #A82228;
    /* Adds a solid border with the chosen color */
    padding: 5px;
    /* Optional: adds space between the image and the border */
}
</style>
