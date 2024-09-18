<template>
<AppBar />
<Loader :loading="loading" v-if="loading" />
<v-container fluid>
    <v-row justify="center" class="">
        <v-col cols="12" md="7">
            <div>
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
                            Temple began its journey under the leadership of our
                            pastor, [Name of First Pastor]. Located at [Original
                            Location].
                            Affiliated with the Tanzania Assemblies of God (TAG) churches,
                            we are proud to be part of a network dedicated to evangelism,
                            discipleship, and community service across Tanzania. Join us as
                            we continue to live out our mission and make a meaningful impact
                            in Morogoro and beyond.
                        </p>

                        <p class="my-5 text-color"><i>“The 13 years of Revival fire, we want the Lord and his Power”</i></p>
                    </div>
                </div>
            </div>
        </v-col>
    </v-row>
</v-container>

<v-container>
    <v-row>
        <v-col cols="12">
            <v-alert v-model="alert" border="start" class="text-color daily-bread-container" variant="tonal">
                <h3 class="my-5">Our Values</h3>
                <v-typography variant="body-1" class="values-list">
                    <ul>
                        <li>
                            <i class="mx-2">STEWARDHIP (1Cor 4:1-2)</i>: BRT as good stewards of Jesus Christ, we have to be trustworthy so as integrity given to each one of us can be used well to reach the intended targets in great care.
                        </li>
                        <li>
                            <i class="mx-2">SERVANTHOOD</i>: BRT as servants of Jesus Christ we have being called to serve and not to be served. In that case, we have to serve God through sacrificing as well putting others forward. (Matthew 20:25-28, John 13:1-17, Ephesians 6:5-8, Philippians 2:5-8)
                        </li>
                        <li>
                            <i class="mx-2">SACRIFICE</i>: The Bible orders us to sacrifice our lives so as to build the Kingdom and body of Christ. In that case, the major issue in our ministry is not looking on what we get or what we will harvest but what to give and offer for the welfare of Christ’s body “Sacrificial service”. (Romans 12:1-2)
                        </li>
                        <li>
                            <i class="mx-2">LOVE</i>: Selfishness is an enemy of unity and solidarity, which can weaken great power of efficiency in performance. In that case, we have to fulfill our ministry as a team. We are organs and joints in one body that is Christ’s body so we should communicate what is true, to be well obedient and respecting one another in love bond. (1Corth 13; Romans 12:3-8; Ephesians 4:1-16; 1Peter 4:8-11) “Team based operation”
                        </li>
                        <li>
                            <i class="mx-2">PUNCTUALITY</i>: Time is an important raw material in our performance. Every person should be on time and all things are to be done on time, in that case, every person should save time. (Ephesians 5:15-16)
                        </li>
                        <li>
                            <i class="mx-2">RISK TAKING</i>: A true faith dares to do great things that are impossible in man’s intelligence, but are only able to God. Then we should have vision “faith and risk taking”. (Ephesians 3:20-21, Hebrews 11:6)
                        </li>
                        <li>
                            <i class="mx-2">CREATIVITY</i>: In a fast changing world, innovation and creativity in performance will help going together on time. In that case, effort and confidence are very important in area of work “innovation and creativity”. (Exodus 36:1-8)
                        </li>
                        <li>
                            <i class="mx-2">EXCELLENCE</i>: Since our major fulfillment is that; everything we do is all about glorifying God, everything to be done that we put on our hands; it must be done in Excellency. (1Corth 10:31). In that case be one should be aware that trustworthy and integrity are important pillars of excellence.
                        </li>
                        <li>
                            <i class="mx-2">PRAYERS</i>: We great consideration is on prayers because we believe and accept that without the Lord Jesus we are unable to do anything (Luke 11:1-13, 1Thess 5:17-18, Ephesians 6:18, 1Chronicles 29:12). So with all of that you should not forget to pray for your work/job in always. We all are looking forward to REVIVAL.
                        </li>
                    </ul>
                </v-typography>
                <v-col cols="12">
                    <h3 class="my-5">Our Purpose</h3>
                    <p>Bethel Revival Temple church is there, for reasons, which are; <strong><i>Worship</i></strong>, <strong><i>Fellowship</i></strong>, <strong><i>Evangelism</i></strong>, <strong><i>Ministry/service</i></strong>, <strong><i>Discipleship</i></strong>.</p>
                    <p class="my-3"><strong>Description on our reasons for being:</strong></p>
                    <v-typography variant="body-1" class="purpose-list">
                        <ul>
                            <li>
                                <i class="mx-2">Worship</i>: Is an act of showing sincere love to God, meeting up with the Power and anointment of Holy Spirit through Word of God, prayers, offerings, praising (singing) and holiness. <i>(John: 19-24; Hebrews 10:25; 1Corth 1:21; Ephesians 5:19; 1Thes 5:17-18; Romans 12:1; Psalms 150)</i>
                            </li>
                            <li>
                                <i class="mx-2">Fellowship</i>: Is to strengthen love, unity, caring and solidarity to all believers in all situations. <i>(Acts 2:42, 44; John 13:34,35; Romans 15:26; 2Corth 8:4; 1Corth 11:28-30; John 1:6-7 & Ephesians 4:2,3; Romans 12:5; 1Corth 12:12-27; Ephesians 2:19-22; 1Corth 13:1-8)</i>
                            </li>
                            <li>
                                <i class="mx-2">Evangelism</i>: Is preaching the good News of Jesus Christ. It is a responsibility of every church member. <i>(Acts 1:8; Matthew 28:19, 20; Romans 10:14 & 15:12; 2Corth 5:18, 20; 1Peter 2:9, 10; 1Corth 9:10-23; Hebrews 5:14)</i>
                            </li>
                            <li>
                                <i class="mx-2">Ministry/service</i>: Is demonstrating the Love of God by all church members. All believers should use the gifts of Holy Spirit so as to serve in different services. <i>(Luke 4:18,19; John 13:3, 14; Matthew 25:37-40, 20:26-28; 1Corth 12:4-7; Romans 12:3-8; 1Corth 14:12; Zechariah 4:6, Ephesians 4:12, 1Peter 4:10-11)</i>
                            </li>
                            <li>
                                <i class="mx-2">Discipleship</i>: Is simply teaching the Word of God so as a Christian to grow up in salvation until to resemble with Christ and to be able to serve God effectively and efficiently. <i>(Matthew 28:19-20; Colossians 1:9-11; Ephesians 4:11-17; Luke 9:23,24; Acts 20:20,27; Hebrews 5:14)</i>
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
        <h2 class="section-title">Our
            pastors</h2>
    </div>
    <div class="text-center my-3 watermark-section">
        <p class="service-description ">
            <i> “So Christ Himself gave the apostles, the prophets, the evangelists, <strong>the pastors</strong> and teachers, to equip his people for works of service, so that the body of Christ may be built up.”</i>
        </p>
    </div>
    <div class="text-center  ">
        <p class="service-descripton text-cyan text-bold">
            <i>Ephesians 4:11-12 (NIV)</i>
        </p>
    </div>
    <div class="text-center  d-flex">
        <v-avatar size="450">
            <!-- <v-img src="@/assets/construction.webp" alt="Senior Pastor" cover></v-img> -->
            <v-icon size="430">mdi-account-circle</v-icon>
        </v-avatar>
        <div class="text-center " style="padding:150px 70px;">
            <h3 class="my-1">Bishop Dr. Barnabas W. Mtokambali:</h3>
            <p><i>SENIOR PASTOR: Worship, Leadership and Vision.</i></p>
        </div>
    </div>
    <!-- Get Involved Cards -->
</v-container>
<v-container fluid>
    <v-row justify="center">
        <v-col cols="12" md="10">
            <v-slide-group v-model="slideModel" center-active class="service-carousel " :continuous="false">
                <v-slide-group-item v-for="(pastor, index) in pastors" :key="index">
                    <v-card class="service-card ma-4" height="100%" width="330px" elevation="8" rounded="lg">
                        <v-card-title class="d-flex justify-center my-3">
                            <v-avatar size="250">
                                <v-icon size="230">mdi-account-circle</v-icon>
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
<Footer />
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
            slideModel: 0,
            loading: true, // Initial loading state
            pastors: [{
                    name: "Yona Mganga",
                    description: "Ministry & Administration, Mission, Churches Building; Family & Marriage; all church departments.",
                },
                {
                    name: "Lilian Mariki",
                    description: "Fellowship, Intercessory and Deliverance, Visitors.",
                },
                {
                    name: "Wema Khuni",
                    description: "Music and praise, Director of church building, Strategic plan; International Correspondences & Cluster G.",
                },
                {
                    name: "Shanel Silayo",
                    description: "Church security, courtship, & Cluster C. ",
                },
                {
                    name: "Sarah Silayo",
                    description: "Students & children (Children’s Church & CASFETA Junior).",
                },
                {
                    name: "Alicia Gwama",
                    description: "Deaf ministry, Caleb ministry, & Cluster A.",
                },
                {
                    name: "Joel Ephraim",
                    description: "Projects & physical developments, CASFETA Campus, international church & fellowship, MEL, & Cluster D.",
                },
                {
                    name: "Agrey Kapinga",
                    description: "PCF, Do not pass me, ushers, & Cluster H.",
                },
                {
                    name: "Athanas Hiluka",
                    description: "Discipleship and literature, radio ministry, & Cluster B. ",
                },
                {
                    name: "Aurelia Luziro",
                    description: "Evangelism, new believers, baptism, & Cluster F.",
                },
                {
                    name: "Gregory Peter",
                    description: "CASFETA Secondary, Victory Church, & Cluster J.",
                },
                {
                    name: "Jastin Muro",
                    description: "Church cashier, counseling, reception, and guidance.",
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
    },
    mounted() {
        // Simulate loading delay for demonstration
        setTimeout(() => {
            this.loading = false; // Set loading to false once the page is ready
        }, 2000); // Adjust this delay as necessary

        this.startAutoSlide();
    },
};
</script>

<style scoped>
.text-color {
    color: #0097A7;
}

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
</style>
