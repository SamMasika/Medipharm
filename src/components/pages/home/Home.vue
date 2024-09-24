<template>
<v-container fluid class="">
    <div class="text-center my-1">
        <p style="font-size:medium"><i>Worship with us in person or online every Sunday</i> </p>
    </div>
    <div class="text-center my-1">
        <v-row justify="center">
            <v-col cols="12" md="10">
                <div class="video-container">
                    <iframe class="video-frame" src="https://www.youtube.com/embed/WRkDboupLx4" title="IBADA YA JUMAPILI _ 1_ 02.06.2024" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
                <v-btn class="text-none custom-view-color" size="large" rounded="xl" flat>
                    <v-icon size="30">mdi-youtube</v-icon> Watch all sermons
                </v-btn>
            </v-col>
        </v-row>
    </div>
    <!-- Row for Video and Button -->
</v-container>
<!-- Daily Bread Container -->
<v-container fluid class="daily-bread-container no-margin-padding">
    <section class="daily-bread-section">
        <!-- Title Section -->
        <div class="text-center my-5">
            <h2 class="text-white">
                <v-icon>mdi-book-open</v-icon> Today's Daily Bread
            </h2>
        </div>

        <!-- Quote Section -->
        <div class="text-center watermark-section">
            <p class="my-3 text-white"><i>{{ formattedDate }}</i></p>
            <p class="service-description text-white">
                <i>
                    “And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together, as some are in the habit of doing, but encouraging one another—and all the more as you see the Day approaching.”
                </i>
            </p>
        </div>

        <!-- Scripture Reference Section -->
        <div class="text-center my-5">
            <p class="service-description text-white text-bold">
                Hebrews 10:24-25 (NIV)
            </p>
        </div>
    </section>
</v-container>

<!-- Schedule Container -->
<v-container fluid class="schedule-container no-margin-padding">
    <v-row class="worship-section" justify="center">
        <v-col cols="12" md="10">
            <h2 class="text-center worship-title my-1">Our Churches</h2>
            <v-slide-group v-model="slideModel" center-active class="service-carousel no-arrows" :continuous="false">
                <v-slide-group-item v-for="(service, index) in services" :key="index">
                    <v-card class="service-card ma-4" height="100%" width="330px" elevation="0" rounded="lg">
                        <v-img :src="service.image" height="250px" cover></v-img>
                        <v-card-title class="d-flex align-center">
                            <v-spacer></v-spacer>
                            <v-icon class="mx-5" size="40">{{ service.icon }}</v-icon>
                            <v-chip size="small" variant="flat" class="custom-chip-color">
                                {{ service.title }}
                            </v-chip>

                            <v-spacer></v-spacer>
                        </v-card-title>
                    </v-card>
                </v-slide-group-item>
            </v-slide-group>

            <div class="text-center my-3">
                <p class="service-description">
                    Our services are designed to inspire and bring us closer to God through worship, prayer, and the word. Whether you join us in person or online, you are welcome!
                </p>
            </div>

            <v-row justify="center" class="my-2">
                <v-col class="d-flex justify-center">
                    <div class="custom-toggle-container">
                        <v-btn-toggle v-model="toggle" class="custom-toggle">
                            <v-btn value="about" class="text-none text-white custom-btn custom-btn-left" @click="handleToggle">About Us</v-btn>
                            <v-btn value="visit" class="text-none custom-btn text-white custom-btn-right">Visit Us</v-btn>
                        </v-btn-toggle>
                        <v-icon class="icon-on-toggle" color="white">mdi-microphone</v-icon>
                    </div>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</v-container>
<!-- Row for Getting Connected to the Church -->
<v-container>
    <div class="text-center my-5 ">
        <h2 class=" section-title">Get Connected</h2>
    </div>

    <div class="text-center my-3 watermark-section">
        <p class="service-description ">
            <i> “And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together, as some are in the habit of doing, but encouraging one another—and all the more as you see the Day approaching.”</i>
        </p>
    </div>
    <div class="text-center my-5 ">
        <p class="service-descripton bible-verse text-bold">
            Hebrews 10:24-25 (NIV)
        </p>
    </div>
    <v-row>
        <!-- Fellowship Card -->
        <v-col cols="12" md="4">
            <v-hover v-slot="{ isHovering, props }">
                <v-card class="connection-card" rounded="lg" v-bind="props" :elevation="isHovering ? 24 : 5">
                    <v-img src="@/assets/fellowship.webp" height="300px" w cover>
                        <v-chip class="chip-overlay custom-chip-color" variant="flat">
                            Ushemasi
                        </v-chip>
                    </v-img>
                    <v-card-title>
                        <v-icon class="mx-4">mdi-handshake</v-icon>
                        <span class="title">Ushemasi</span>
                    </v-card-title>
                    <v-card-text>
                        Join us for fellowship and build lasting relationships within our church community.
                    </v-card-text>
                    <v-card-actions class="d-flex flex-column justify-end">
                        <v-spacer></v-spacer>
                        <v-btn text class="text-none custom-btn-color" append-icon="mdi-chevron-double-right">Join Ushemasi</v-btn>
                    </v-card-actions>
                </v-card>
            </v-hover>
        </v-col>

        <!-- Prayer & Bible Study Card -->
        <v-col cols="12" md="4">
            <v-hover v-slot="{ isHovering, props }">
                <v-card class="connection-card" rounded="lg" v-bind="props" :elevation="isHovering ? 24 : 5">
                    <v-img src="@/assets/prayer.jpeg" height="300px" cover>
                        <v-chip class="chip-overlay custom-chip-color" variant="flat">
                            Prayer & Bible Study
                        </v-chip>
                    </v-img>
                    <v-card-title>
                        <v-icon class="mx-4">mdi-book-open-variant</v-icon>
                        <span class="title">Prayer & Bible Study</span>
                    </v-card-title>
                    <v-card-text>
                        Engage in prayer and Bible study sessions to grow spiritually and deepen your understanding of the Word.
                    </v-card-text>
                    <v-card-actions class="d-flex flex-column justify-end">
                        <v-spacer></v-spacer>
                        <v-btn class="text-none custom-btn-color" append-icon="mdi-chevron-double-right">Pray with Us</v-btn>
                    </v-card-actions>
                </v-card>
            </v-hover>
        </v-col>

        <!-- Giving Card -->
        <v-col cols="12" md="4">
            <v-hover v-slot="{ isHovering, props }">
                <v-card class="connection-card" rounded="lg" v-bind="props" :elevation="isHovering ? 24 : 5">
                    <v-img src="@/assets/giving.jpg" height="300px" cover>
                        <v-chip class="chip-overlay custom-chip-color" variant="flat">
                            Giving
                        </v-chip>
                    </v-img>
                    <v-card-title>
                        <v-icon class="mx-4">mdi-cash</v-icon>
                        <span class="title">Giving</span>
                    </v-card-title>
                    <v-card-text>
                        Support the church and its missions through your generous giving.
                    </v-card-text>
                    <v-card-actions class="d-flex flex-column justify-end">
                        <v-spacer></v-spacer>
                        <v-btn class="text-none custom-btn-color" append-icon="mdi-chevron-double-right">Give</v-btn>
                    </v-card-actions>
                </v-card>
            </v-hover>
        </v-col>
    </v-row>
</v-container>

<v-container fluid class="schedule-container">
    <!-- Program Schedule Section -->
    <div class="text-center my-1">
        <h2 class="section-title">
            <v-icon class="mx-3 custom-icon-color">mdi-calendar-month</v-icon>Weekly Programs
        </h2>
    </div>

    <v-row justify="center" class="worship-section">
        <v-col cols="12" md="8">
            <div class="timeline">
                <!-- Monday -->
                <div class="timeline-item">
                    <div class="timeline-dot">
                        <v-icon color="white">mdi-calendar-month</v-icon>
                    </div>
                    <div class="timeline-content">
                        <h3 class="timeline-day">Monday</h3>
                        <div class="d-flex align-center" style="width: 100%;">
                            <p class="timeline-program">
                                <v-icon class="mx-3 custom-icon-color">mdi-human-male-female</v-icon>CA’s
                            </p>
                            <p class="timeline-time">
                                <v-icon class="mx-3 custom-icon-color">mdi-clock-time-four-outline</v-icon>04:00 PM - 06:00 PM
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Tuesday -->
                <div class="timeline-item">
                    <div class="timeline-dot">
                        <v-icon color="white">mdi-calendar-month</v-icon>
                    </div>
                    <div class="timeline-content">
                        <h3 class="timeline-day">Tuesday</h3>
                        <div class="d-flex align-center" style="width: 100%;">
                            <p class="timeline-program">
                                <v-icon class="mx-3 custom-icon-color">mdi-group</v-icon>WWK, CMF, Waongofu Wapya
                            </p>
                            <p class="timeline-time">
                                <v-icon class="mx-3 custom-icon-color">mdi-clock-time-four-outline</v-icon>04:00 - 06:00 PM
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Wednesday -->
                <div class="timeline-item">
                    <div class="timeline-dot">
                        <v-icon color="white">mdi-calendar-month</v-icon>
                    </div>
                    <div class="timeline-content">
                        <h3 class="timeline-day">Wednesday</h3>

                        <v-hover v-slot:default="{ props }">
                            <div v-bind="props" class="choir-rehearsal-panel" @click="showServicesOnWednesday = !showServicesOnWednesday">
                                <v-icon class="mx-3 custom-icon-color">mdi-church</v-icon>
                                <span>Services</span>
                                <v-spacer></v-spacer>
                                <v-icon class="ml-3 custom-icon-color" v-if="!showServicesOnWednesday">mdi-menu-down</v-icon>
                                <v-icon class="ml-3 custom-icon-color" v-if="showServicesOnWednesday">mdi-menu-up</v-icon>
                            </div>
                            <v-expand-transition>
                                <div v-if="showServicesOnWednesday" class="choir-rehearsals-list">
                                    <div class="d-flex align-center">
                                        <p class="timeline-program">
                                            <v-icon class="mx-3 custom-icon-color">mdi-church</v-icon>First Service
                                        </p>
                                        <p class="timeline-time">
                                            <v-icon class="mx-3 custom-icon-color">mdi-clock-time-four-outline</v-icon>06:00 AM - 07:00 AM
                                        </p>
                                    </div>
                                    <div class="d-flex align-center">
                                        <p class="timeline-program">
                                            <v-icon class="mx-3 custom-icon-color">mdi-church</v-icon> Second Service
                                        </p>
                                        <p class="timeline-time">
                                            <v-icon class="mx-3 custom-icon-color">mdi-clock-time-four-outline</v-icon>03:00 PM - 05:00 PM
                                        </p>
                                    </div>
                                    <div class="d-flex align-center">
                                        <p class="timeline-program">
                                            <v-icon class="mx-3 custom-icon-color">mdi-church</v-icon>Third Service
                                        </p>
                                        <p class="timeline-time">
                                            <v-icon class="mx-3 custom-icon-color">mdi-clock-time-four-outline</v-icon>06:00 PM - 07:00 PM
                                        </p>
                                    </div>

                                </div>
                            </v-expand-transition>
                        </v-hover>
                        <div class="d-flex align-center" style="width: 100%;">
                            <p class="timeline-program">
                                <v-icon class="mx-3 custom-icon-color">mdi-music</v-icon>Walawi
                            </p>
                            <p class="timeline-time">
                                <v-icon class="mx-3 custom-icon-color">mdi-clock-time-four-outline</v-icon>01:00 Usiku - 03:00 Usiku
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Thursday -->
                <div class="timeline-item">
                    <div class="timeline-dot">
                        <v-icon color="white">mdi-calendar-month</v-icon>
                    </div>
                    <div class="timeline-content">
                        <h3 class="timeline-day">Thursday</h3>
                        <div class="d-flex align-center" style="width: 100%;">
                            <p class="timeline-program">
                                <v-icon class="mx-3 custom-icon-color">mdi-group</v-icon>Waongofu Wapya
                            </p>
                            <p class="timeline-time">
                                <v-icon class="mx-3 custom-icon-color">mdi-clock-time-four-outline</v-icon>04:00 PM - 06:00 PM
                            </p>
                        </div>
                        <v-hover v-slot:default="{ props }">
                            <div v-bind="props" class="choir-rehearsal-panel" @click="showChoirRehearsalsOnThursday = !showChoirRehearsalsOnThursday">
                                <v-icon class="mx-3 custom-icon-color">mdi-music</v-icon>
                                <span>Choir Rehearsals</span>
                                <v-spacer></v-spacer>
                                <v-icon class="ml-3 custom-icon-color" v-if="!showChoirRehearsalsOnThursday">mdi-menu-down</v-icon>
                                <v-icon class="ml-3 custom-icon-color" v-if="showChoirRehearsalsOnThursday">mdi-menu-up</v-icon>
                            </div>
                            <v-expand-transition>
                                <div v-if="showChoirRehearsalsOnThursday" class="choir-rehearsals-list">
                                    <div class="d-flex align-center">
                                        <p class="timeline-program">
                                            <v-icon class="mx-3 custom-icon-color">mdi-music</v-icon>Living Gospel Choir
                                        </p>
                                        <p class="timeline-time">
                                            <v-icon class="mx-3 custom-icon-color">mdi-clock-time-four-outline</v-icon>06:00 AM - 10:00 AM
                                        </p>
                                    </div>
                                    <div class="d-flex align-center">
                                        <p class="timeline-program">
                                            <v-icon class="mx-3 custom-icon-color">mdi-music</v-icon> Living Word Choir
                                        </p>
                                        <p class="timeline-time">
                                            <v-icon class="mx-3 custom-icon-color">mdi-clock-time-four-outline</v-icon>06:00 AM - 10:00 AM
                                        </p>
                                    </div>
                                    <div class="d-flex align-center">
                                        <p class="timeline-program">
                                            <v-icon class="mx-3 custom-icon-color">mdi-music</v-icon>Living Water Choir
                                        </p>
                                        <p class="timeline-time">
                                            <v-icon class="mx-3 custom-icon-color">mdi-clock-time-four-outline</v-icon>03:00 PM - 06:00 PM
                                        </p>
                                    </div>
                                    <div class="d-flex align-center">
                                        <p class="timeline-program">
                                            <v-icon class="mx-3 custom-icon-color">mdi-music</v-icon>Living Hope Choir
                                        </p>
                                        <p class="timeline-time">
                                            <v-icon class="mx-3 custom-icon-color">mdi-clock-time-four-outline</v-icon>03:00 PM - 06:00 PM
                                        </p>
                                    </div>
                                </div>
                            </v-expand-transition>
                        </v-hover>
                    </div>
                </div>

                <!-- Friday -->
                <div class="timeline-item">
                    <div class="timeline-dot">
                        <v-icon color="white">mdi-calendar-month</v-icon>
                    </div>
                    <div class="timeline-content">
                        <h3 class="timeline-day">Ijumaa</h3>
                        <div class="d-flex align-center" style="width: 100%;">
                            <p class="timeline-program">
                                <v-icon class="mx-3 custom-icon-color">mdi-frequently-asked-questions</v-icon>Mountain Of Prayer (Morning & Evening)
                            </p>
                            <p class="timeline-time">
                                <v-icon class="mx-3 custom-icon-color">mdi-clock-time-four-outline</v-icon>06:00 AM - 07:00 AM, 03:00 PM - 06:00 PM
                            </p>
                        </div>
                        <div class="d-flex align-center" style="width: 100%;">
                            <p class="timeline-program">
                                <v-icon class="mx-3 custom-icon-color">mdi-weather-night</v-icon>Overnight
                            </p>
                            <p class="timeline-time">
                                <v-icon class="mx-3 custom-icon-color">mdi-clock-time-four-outline</v-icon>09:00 PM - 5:00 AM
                            </p>
                        </div>
                        <v-hover v-slot:default="{ props }">
                            <div v-bind="props" class="choir-rehearsal-panel" @click="showChoirRehearsalsOnFriday = !showChoirRehearsalsOnFriday">
                                <v-icon class="mx-3 custom-icon-color">mdi-music</v-icon>
                                <span>Choir Rehearsals</span>
                                <v-spacer></v-spacer>
                                <v-icon class="ml-3 custom-icon-color" v-if="!showChoirRehearsalsOnFriday">mdi-menu-down</v-icon>
                                <v-icon class="ml-3 custom-icon-color" v-if="showChoirRehearsalsOnFriday">mdi-menu-up</v-icon>
                            </div>
                            <v-expand-transition>
                                <div v-if="showChoirRehearsalsOnFriday" class="choir-rehearsals-list">
                                    <div class="d-flex align-center">
                                        <p class="timeline-program">
                                            <v-icon class="mx-3 custom-icon-color">mdi-music</v-icon>Victory Choir
                                        </p>
                                        <p class="timeline-time">
                                            <v-icon class="mx-3 custom-icon-color">mdi-clock-time-four-outline</v-icon>05:00 Jioni - 07:00 PM
                                        </p>
                                    </div>
                                </div>
                            </v-expand-transition>
                        </v-hover>
                    </div>
                </div>

                <!-- Saturday -->
                <div class="timeline-item">
                    <div class="timeline-dot">
                        <v-icon color="white">mdi-calendar-month</v-icon>
                    </div>

                    <div class="timeline-content">
                        <h3 class="timeline-day">Saturday</h3>
                        <div class="d-flex align-center " style="width: 100%;">
                            <p class="timeline-program">
                                <v-icon class="mx-3 custom-icon-color">mdi-group</v-icon>Victory Church Service
                            </p>
                            <p class="timeline-time">
                                <v-icon class="mx-3 custom-icon-color">mdi-clock-time-four-outline</v-icon>8:00 - 11:00 AM
                            </p>
                        </div>
                        <v-hover v-slot:default="{ props }">
                            <div v-bind="props" class="choir-rehearsal-panel" @click="showChoirRehearsalsOnSaturday = !showChoirRehearsalsOnSaturday">
                                <v-icon class="mx-3 custom-icon-color">mdi-music</v-icon>
                                <span>Choir Rehearsals</span>
                                <v-spacer></v-spacer>
                                <v-icon class="ml-3 custom-icon-color" v-if="!showChoirRehearsalsOnSaturday">mdi-menu-down</v-icon>
                                <v-icon class="ml-3 custom-icon-color" v-if="showChoirRehearsalsOnSaturday">mdi-menu-up</v-icon>
                            </div>
                            <v-expand-transition>
                                <div v-if="showChoirRehearsalsOnSaturday" class="choir-rehearsals-list">
                                    <div v-for="(rehearsal, index) in saturdayRehearsals" :key="index" class="d-flex align-center">
                                        <p class="timeline-program">
                                            <v-icon class="mx-3 custom-icon-color">mdi-music</v-icon>{{ rehearsal.name }}
                                        </p>
                                        <p class="timeline-time">
                                            <v-icon class="mx-3 custom-icon-color">mdi-clock-time-four-outline</v-icon>{{ rehearsal.time }}
                                        </p>
                                    </div>
                                </div>
                            </v-expand-transition>
                        </v-hover>

                    </div>
                </div>

            </div>
            <div class="d-flex justify-center">
                <v-btn class="text-none custom-view-color" rounded="xl" prepend-icon="mdi-calendar-month" @click="goToCalendar">
                    View all Events
                </v-btn>
            </div>

        </v-col>
    </v-row>
</v-container>

<v-container class="my-8">
    <!-- Section Title -->
    <div class="text-center my-5">
        <h2 class="section-title">Get Involved</h2>
    </div>

    <div class="text-center my-3 watermark-section">
        <p class="service-description ">
            <i> “Each of you should use whatever gift you have received to serve others, as faithful stewards of God’s grace in its various forms.”</i>
        </p>
    </div>
    <div class="text-center my-5 ">
        <p class="service-description bible-verse ">
            1 Peter 4:10 (NIV)
        </p>
    </div>

    <!-- Get Connected Cards -->
    <v-row>
        <!-- Worship Teams & Choir Card -->
        <v-col cols="12" md="4">
            <v-hover v-slot="{ isHovering, props }">
                <v-card class="activity-card" rounded="lg" v-bind="props" :elevation="isHovering ? 24 : 5">
                    <v-img src="@/assets/worship.jpg" height="300px" cover>
                        <v-chip class="chip-overlay custom-chip-color" variant="flat">
                            Worship Teams & Choir
                        </v-chip>
                    </v-img>
                    <v-card-title>
                        <v-icon class="mx-4">mdi-music</v-icon>
                        <span class="title">Worship Teams & Choir</span>
                    </v-card-title>
                    <v-card-text>
                        Join our worship teams and choir to use your musical talents in leading others in praise and worship.
                    </v-card-text>
                    <v-card-actions class="d-flex flex-column justify-end">
                        <v-spacer></v-spacer>
                        <v-btn class="text-none custom-btn-color" append-icon="mdi-chevron-double-right">Get Involved</v-btn>
                    </v-card-actions>
                </v-card>
            </v-hover>
        </v-col>

        <!-- Teaching Children Classes Card -->
        <v-col cols="12" md="4">
            <v-hover v-slot="{ isHovering, props }">
                <v-card class="activity-card" rounded="lg" v-bind="props" :elevation="isHovering ? 24 : 5">
                    <v-img src="@/assets/childrens.jpg" height="300px" cover>
                        <v-chip class="chip-overlay custom-chip-color" variant="flat">
                            Teaching Children
                        </v-chip>
                    </v-img>
                    <v-card-title>
                        <v-icon class="mx-4">mdi-teach</v-icon>
                        <span class="title">Teaching Children Classes</span>
                    </v-card-title>
                    <v-card-text>
                        Use your passion for teaching by helping children grow in their understanding of God’s word.
                    </v-card-text>
                    <v-card-actions class="d-flex flex-column justify-end">
                        <v-spacer></v-spacer>
                        <v-btn class="text-none custom-btn-color" append-icon="mdi-chevron-double-right">Join the Team</v-btn>
                    </v-card-actions>
                </v-card>
            </v-hover>
        </v-col>

        <!-- Media Team Card -->
        <v-col cols="12" md="4">
            <v-hover v-slot="{ isHovering, props }">
                <v-card class="activity-card" rounded="lg" v-bind="props" :elevation="isHovering ? 24 : 5">
                    <v-img src="@/assets/media.jpeg" height="300px" cover>
                        <v-chip class="chip-overlay custom-chip-color" variant="flat">
                            Media Team
                        </v-chip>
                    </v-img>
                    <v-card-title>
                        <v-icon class="mx-4">mdi-video</v-icon>
                        <span class="title">Media Team</span>
                    </v-card-title>
                    <v-card-text>
                        Serve through media by managing sound, video, and technical aspects of our services.
                    </v-card-text>
                    <v-card-actions class="d-flex flex-column justify-end">
                        <v-spacer></v-spacer>
                        <v-btn class="text-none custom-btn-color" append-icon="mdi-chevron-double-right">Join the Media Team</v-btn>
                    </v-card-actions>
                </v-card>
            </v-hover>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import home from '@/mixins/home';
export default {
    mixins: [home],
    data() {
        return {
            scriptureTitle: "Today's Daily Bread",
            scripture: "Philippians 4:13 - I can do all things through Christ who strengthens me.",
            message: "No matter what challenges you face today, remember that God gives you the strength to overcome.",
            currentDate: new Date(),
            slideModel: 0,
            toggle: 'about',
            showChoirRehearsalsOnSaturday: false,
            showChoirRehearsalsOnFriday: false,
            showChoirRehearsalsOnThursday: false,
            showChoirRehearsalsOnWednesday: false,
            showServicesOnWednesday: false,
            saturdayRehearsals: [{
                    name: 'Living Gospel Choir',
                    time: '06:00 AM - 08:00 AM'
                },

                {
                    name: 'Living Word Choir',
                    time: '08:00 AM - 10:00 AM'
                },
                {
                    name: 'Living Water Choir',
                    time: '10:00 AM - 12:00 PM'
                },
                {
                    name: 'Living Hope Choir',
                    time: '12:00 PM - 01:00 PM'
                },
                {
                    name: 'Victory Choir',
                    time: '01:00 PM - 02:00 PM'
                },
                {
                    name: 'Walawi Shagwe',
                    time: '03:00 PM - 06:00 PM'
                },
                {
                    name: 'Levites',
                    time: '03:00 PM - 06:00 PM'
                }
            ],
            services: [{
                    title: 'Main Church(Swahili Church)',
                    icon: 'mdi-account-group-outline',
                    times: 'English: 0700hrs & 0930hrs\nSwahili: 1130hrs',
                    image: require('@/assets/church1.webp'),
                },
                {
                    title: 'International Church',
                    icon: 'mdi-human-child',
                    times: 'English: 0700hrs & 0930hrs\nSwahili: 1130hrs',
                    image: require('@/assets/church2.jpg'),
                },
                {
                    title: 'Victory Church',
                    icon: 'mdi-human-male-female',
                    times: '0900hrs & 1100hrs',
                    image: require('@/assets/church3.jpg'),
                },
                {
                    title: 'Deaf Church',
                    icon: 'mdi-human-male-female',
                    times: '1200hrs & 1400hrs',
                    image: require('@/assets/church4.jpg'),
                },
                {
                    title: 'Children Church',
                    icon: 'mdi-human-male-child',
                    times: '1500hrs & 1700hrs',
                    image: require('@/assets/children.jpg'),
                },
            ],
        };
    },
    mounted() {
        this.startAutoSlide();
    },
    computed: {
        formattedDate() {
            return this.currentDate.toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        },
    },
    methods: {
        startAutoSlide() {
            setInterval(() => {
                this.slideModel = (this.slideModel + 1) % this.services.length;
            }, 3000); // Slide every 4 seconds
        },
        handleToggle() {
            this.$router.push('/about'); // Redirect to the '/about' path
        },

        goToCalendar() {
            this.$router.push('/calendar');
        },
    },
};
</script>

<style>

.text-center {
    text-align: center;
}

.custom-icon-color {
    color: #A82228;
    /* cyan darken-2 */
}

.custom-chip-color {
    background-color: #A82228;
    /* cyan darken-2 */
    color: white;
    /* For text color */
}

.custom-view-color {
    color: white !important;
    /* cyan darken-2 for text */
    background-color: #A82228;
    /* No background by default */
    border: 1px solid transparent;
    /* Invisible border by default */
    box-shadow: 0 0px 0px rgba(0, 0, 0, 0.2);
    /* Default shadow for elevation effect */
    border-radius: 8px;
    /* Rounded corners */

}

.custom-btn-color {
    color: #800000 !important;
    /* cyan darken-2 for text */
    background-color: transparent;
    /* No background by default */
    border: 1px solid transparent;
    /* Invisible border by default */
    box-shadow: 0 0px 0px rgba(0, 0, 0, 0.2);
    /* Default shadow for elevation effect */
    border-radius: 8px;
    /* Rounded corners */

}

.custom-btn-color:hover {
    background-color: #A82228;
    /* cyan darken-2 background on hover */
    color: white !important;
    /* Text color changes to white on hover */
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
    /* Elevation effect on hover */
    /* Optional: visible border on hover */
}

.custom-icon-color:hover {

    color: white !important;
}

.worship-section {
    margin-top: 10px;
    background-color: #E0CFC2;
    height: auto;
    /* Adjust height as needed */
}

.worship-title {
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 24px;
}

.service-card {
    margin: 10px;
    width: 100%;
    background-color: #ffffff;
}

.service-description {
    font-size: 16px;
    color: #555;
    margin-top: 70px;
    max-width: 800px;
    /* Set a max width for better readability */
    margin: 0 auto;
    /* Center align the paragraph */
}

.video-container {
    position: relative;
    padding-bottom: 50%;
    /* Aspect ratio 16:9 */
    height: 0;
    overflow: hidden;
    border-radius: 12px;
    /* box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); */
    border: 1px solid #ddd;
    margin: 20px 0;
}

.video-frame {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
}

.custom-toggle-container {
    position: relative;
    display: inline-block;
    /* Ensures the container adjusts to button size */
}

.custom-toggle {
    display: flex;
    border-radius: 35px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: auto;
    /* Adjust to fit content */
    max-width: 300px;
    /* Set a max-width if needed */
}

.custom-btn {
    flex: 1;
    border: none;
    margin: 0;
    border-radius: 0;
    font-size: 14px;
    /* Adjust font size as needed */
    height: 40px;
    /* Adjust height as needed */
}

.custom-btn-left {
    background-color: #A82228;
    /* Change to your preferred color */
    color: white;
}

.custom-btn-right {
    background-color: #000000;
    /* Change to your preferred color */
    color: white;
}

.custom-btn-left+.custom-btn-right {
    border-left: 1px solid #fff;
    /* Border between the buttons */
}

.icon-on-toggle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
    /* Adjust icon size as needed */
    color: #000;
    /* Adjust icon color */
    z-index: 1;
    /* Ensure the icon appears on top */
}

.section-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
}

.connection-card {
    margin: 10px;
    min-height: 500px;
    /* Set minimum height to align all cards */
}

.title {
    font-weight: bold;
    font-size: 18px;
}

.v-btn {
    text-transform: none;
    font-size: 14px;
}

.watermark-section {
    position: relative;
    /* This allows absolute positioning of the watermark */
    padding: 20px;
}

.watermark-section::before {
    content: "“";
    /* Quotation mark as the watermark */
    font-family: serif;
    /* Use a classic serif font for the quotation mark */
    font-size: 400px;
    /* Adjust size based on the design */
    color: rgba(0, 0, 0, 0.05);
    /* Light grey with transparency */
    position: absolute;
    top: 130%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 0;
    /* Puts the watermark behind the section's content */
    pointer-events: none;
    /* Ensures it doesn't interfere with any user interactions */
}

.section-title {
    position: relative;
    z-index: 1;
    /* Ensures the title stays above the watermark */
    margin-bottom: 20px;
    /* Adds spacing between the title and the watermark */
}

.section-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
}

/* Timeline styling */
.timeline {
    position: relative;
    margin: 20px 0;
    padding: 20px 0;
    border-left: 3px solid #A82228;
}

.timeline-item {
    position: relative;
    padding: 20px 0 20px 40px;
    margin-bottom: 10px;
}

.timeline-dot {
    position: absolute;
    left: -17px;
    top: 20px;
    width: 30px;
    height: 30px;
    background-color: #A82228;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.timeline-content {
    background-color: #ffffff;
    padding: 10px 15px;
    border-radius: 8px;
    /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); */
}

.timeline-day {
    font-size: 18px;
    font-weight: bold;
    margin: 0 0 5px;
    color: #A82228;
}
.bible-verse {
    font-size: 18px;
    font-weight: bold;
    color: #A82228;
    font-style: italic;
}

.timeline-program {
    font-size: 16px;
    color: #333;
    margin: 0;
    padding-top: 5px;
    font-style: normal;
    font-weight: 100;
    flex: 1;
}

.timeline-time {
    display: block;
    font-size: 14px;
    color: #666;
    font-style: normal;
    margin-top: 0px;
}

.section-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
}

.activity-card {
    margin: 10px;
    min-height: 100%;
    /* Set minimum height to align all cards */
}

.title {
    font-weight: bold;
    font-size: 18px;
}

.v-btn {
    text-transform: none;
    font-size: 14px;
}

/* Hover effect */
.v-hover:hover .v-card {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.position-relative {
    position: relative;
}

.chip-overlay {
    position: absolute;
    top: 16px;
    /* Adjust as needed */
    right: 16px;
    /* Adjust as needed */
    z-index: 1;
    /* Ensure it appears on top */
}

.service-card {
    max-width: 500px;
    transition: transform 0.3s ease-in-out;
}

.service-card:hover {
    transform: scale(1.05);
    /* background-color: #32dffd; */
}

.service-carousel {
    width: 100%;
    overflow: hidden;
}

.custom-toggle-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.custom-toggle {
    border-radius: 50px;
}

.icon-on-toggle {
    margin-top: 10px;
}

.daily-bread-container {
    position: relative;
    background: #A82228;
    /* Slightly opaque white background */
    padding: 20px 40px;

    overflow: hidden;
}

.schedule-container {
    position: relative;
    background: #E0CFC2;
    /* Slightly opaque white background */
    padding: 20px 40px;
    margin-top: 0;

    overflow: hidden;
}

.daily-bread-section {
    position: relative;
    /* margin-top: 50px; */
    margin-bottom: 0;
    height: 100%;
    z-index: 2;
    /* Ensures content is above the background image */
}

.watermark-section {
    padding: 20px;
    border-radius: 8px;
}

.service-description {
    font-size: 18px;
    color: #555;
    font-style: italic;
    line-height: 1.5;
}

.text-cyan {
    color: #A82228;
    /* Custom cyan color to match your theme */
}

.text-bold {
    font-weight: bold;
}

/* Faded Logo Background */
.daily-bread-container::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 600px;
    /* Adjust size as needed */
    height: 600px;
    /* Adjust size as needed */
    background-image: url('@/assets/tag.png');
    /* Replace with your actual logo path */
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    transform: translate(-50%, -50%);
    opacity: 0.06;
    /* Adjust opacity for a subtle faded look */
    z-index: 1;
    /* Behind the content */
}

.schedule-container::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 800px;
    /* Adjust size as needed */
    height: 600px;
    /* Adjust size as needed */
    background-image: url('@/assets/schedul.png');
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

.choir-rehearsal-panel {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 10px;
    border-radius: 4px;
    font-weight: bold;
    background-color: #ffffff;
    transition: background-color 0.3s, color 0.3s;
}

.choir-rehearsal-panel:hover {
    background-color: #A82228;
    color: white;
}

/* Ensuring the icons also turn white on hover */
.choir-rehearsal-panel:hover .custom-icon-color {
    color: white;
}

.choir-rehearsals-list {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 10px;
    background-color: #ffffff;
}

.timeline-time {
    margin: 0;
}

.no-margin-padding {
    margin: 0 !important;
    padding: 0 !important;
}

.daily-bread-container,
.schedule-container {
    margin-bottom: 0 !important;
}

.daily-bread-section,
.worship-section {
    padding: 0 !important;
}
</style>
