<template>
<v-container fluid>
    <div class="text-center my-3">
        <p style="font-size:medium">Worship with us in person or online every Sunday at 0700hrs (ENG), 0930hrs (ENG) and 1130hrs (SWA)</p>
    </div>
    <div class="text-center my-1">
        <v-row justify="center">
            <v-col cols="12" md="10">
                <div class="video-container">
                    <iframe class="video-frame" src="https://www.youtube.com/embed/CpyQ-I7pilg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
                <v-btn class="text-none text-white" color="cyan darken-2" size="large" rounded="xl" flat>
                    Watch all sermons
                </v-btn>
            </v-col>

        </v-row>
    </div>

    <!-- Row for Video and Button -->

</v-container>
<!-- Row for Worship Title and Service Timetable -->
<v-container fluid>
    <v-row class="worship-section" justify="center">
        <v-col cols="12" md="8">
            <h2 class="text-center worship-title my-5">Worship with Us this Sunday</h2>
            <div class="text-center my-5">
                <v-row justify="center">
                    <!-- Main Service Card -->
                    <v-col cols="12" md="4"  class="d-flex justify-center">
                        <v-card class="service-card" elevation="4" rounded="lg">
                            <v-card-title class="my-8">
                                <v-icon class="mx-8" size="50">mdi-account-group-outline</v-icon>
                                <v-chip color="cyan darken-2" variant="flat" class="text-white">Main Service</v-chip>
                            </v-card-title>
                            <v-card-text style="font-size:medium">
                                <strong class="my-3">English :0700hrs & 0930hrs</strong> <br>
                                <strong>Swahili:1130hrs</strong>
                            </v-card-text>
                        </v-card>
                    </v-col>

                    <!-- Kids Service Card -->
                    <v-col cols="12" md="4" class="d-flex justify-center">
                        <v-card class="service-card" elevation="4" rounded="lg">
                            <v-card-title class="my-8">
                                <v-icon class="mx-8" size="50">mdi-human-child</v-icon>
                                <v-chip color="cyan darken-2" variant="flat" class="text-white">Kids Service</v-chip>
                            </v-card-title>
                            <v-card-text style="font-size:medium">
                                <strong class="my-3">English :0700hrs & 0930hrs</strong> <br>
                                <strong>Swahili:1130hrs</strong>
                            </v-card-text>
                        </v-card>
                    </v-col>

                    <!-- Teenagers Service Card -->
                    <v-col cols="12" md="4" class="d-flex justify-center">
                        <v-card class="service-card" elevation="4" rounded="lg">
                            <v-card-title class="my-8">
                                <v-icon class="mx-8" size="50">mdi-account-child-circle</v-icon>
                                <v-chip color="cyan darken-2" variant="flat" class="text-white">Teenagers Service</v-chip>
                            </v-card-title>
                            <v-card-text style="font-size:medium">
                                <strong>0900hrs & 1100hrs</strong>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </div>
            <div class="text-center my-8">
                <p class="service-description">
                    Our services are designed to inspire and bring us closer to God through worship, prayer, and the word. Whether you join us in person or online, you are welcome!
                </p>
            </div>
            <v-row justify="center" class="my-5">
                <v-col class="d-flex justify-center">
                    <div class="custom-toggle-container">
                        <v-btn-toggle v-model="toggle" class="custom-toggle">
                            <v-btn value="about" class="text-none custom-btn custom-btn-left">About Us</v-btn>
                            <v-btn value="visit" class="text-none custom-btn custom-btn-right">Visit Us</v-btn>
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
        <h2 class=" section-title">Getting Connected to the Church</h2>
    </div>

    <div class="text-center my-3 watermark-section">
        <p class="service-description ">
            <i> “And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together, as some are in the habit of doing, but encouraging one another—and all the more as you see the Day approaching.”</i>
        </p>
    </div>
    <div class="text-center my-5 ">
        <p class="service-descripton text-cyan text-bold">
            Hebrews 10:24-25 (NIV)
        </p>
    </div>
    <v-row>
        <!-- Fellowship Card -->
        <v-col cols="12" md="4">
            <v-hover v-slot="{ isHovering, props }">
                <v-card class="connection-card" rounded="lg" v-bind="props" :elevation="isHovering ? 24 : 6">
                    <v-img src="@/assets/fellowship.webp" height="300px" cover>
                        <v-chip class="chip-overlay text-white" variant="flat" color="cyan darken-2" >
                            Fellowship
                        </v-chip>
                    </v-img>
                    <v-card-title>
                        <v-icon class="mx-4">mdi-handshake</v-icon>
                        <span class="title">Fellowship</span>
                    </v-card-title>
                    <v-card-text>
                        Join us for fellowship and build lasting relationships within our church community.
                    </v-card-text>
                    <v-card-actions class="d-flex flex-column justify-end">
                        <v-spacer></v-spacer>
                        <v-btn text color="cyan darken-2" class="text-none" append-icon="mdi-chevron-double-right">Join Fellowship</v-btn>
                    </v-card-actions>
                </v-card>
            </v-hover>
        </v-col>

        <!-- Prayer & Bible Study Card -->
        <v-col cols="12" md="4">
            <v-hover v-slot="{ isHovering, props }">
                <v-card class="connection-card" rounded="lg" v-bind="props" :elevation="isHovering ? 24 : 6">
                    <v-img src="@/assets/prayer.jpeg" height="300px" cover>
                        <v-chip class="chip-overlay text-white" variant="flat" color="cyan darken-2" >
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
                        <v-btn text color="cyan darken-2" class="text-none" append-icon="mdi-chevron-double-right">Pray with Us</v-btn>
                    </v-card-actions>
                </v-card>
            </v-hover>
        </v-col>

        <!-- Giving Card -->
        <v-col cols="12" md="4">
            <v-hover v-slot="{ isHovering, props }">
                <v-card class="connection-card" rounded="lg" v-bind="props" :elevation="isHovering ? 24 : 6">
                    <v-img src="@/assets/giving.jpg" height="300px" cover>
                        <v-chip class="chip-overlay text-white" variant="flat" color="cyan darken-2" >
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
                        <v-btn text color="cyan darken-2" class="text-none" append-icon="mdi-chevron-double-right">Give</v-btn>
                    </v-card-actions>
                </v-card>
            </v-hover>
        </v-col>
    </v-row>
</v-container>
<v-container fluid>
    <!--  Program Schedule Section -->
    <div class="text-center my-1">
        <h2 class="section-title">
            <v-icon class="mx-3">mdi-calendar-month</v-icon>Program Schedule
        </h2>
    </div>

    <v-row justify="center" class="worship-section">
        <v-col cols="12" md="8">
            <div class="timeline">
                <!-- Tuesday -->
                <div class="timeline-item">
                    <div class="timeline-dot">
                        <v-icon color="white">mdi-calendar-month</v-icon>
                    </div>
                    <div class="timeline-content">
                        <h3 class="timeline-day">Tuesday, Sept 10, 2024</h3>
                        <p class="timeline-program">
                            <v-icon color="cyan darken-2" class="mx-3">mdi-book-open-page-variant-outline</v-icon>Bible Study
                        </p>
                        <span class="timeline-time">
                            <v-icon color="cyan darken-2" class="mx-3">mdi-clock-time-four-outline</v-icon>1800hrs - 2000hrs
                        </span>
                    </div>
                </div>

                <!-- Wednesday -->
                <div class="timeline-item">
                    <div class="timeline-dot">
                        <v-icon color="white">mdi-calendar-month</v-icon>
                    </div>
                    <div class="timeline-content">
                        <h3 class="timeline-day">Wednesday, Sept 11, 2024</h3>
                        <p class="timeline-program">
                            <v-icon color="cyan darken-2" class="mx-3">mdi-book-open-page-variant-outline</v-icon>Midweek Service
                        </p>
                        <span class="timeline-time">
                            <v-icon color="cyan darken-2" class="mx-3">mdi-clock-time-four-outline</v-icon>1800hrs - 2000hrs
                        </span>
                    </div>
                </div>

                <!-- Friday -->
                <div class="timeline-item">
                    <div class="timeline-dot">
                        <v-icon color="white">mdi-calendar-month</v-icon>
                    </div>
                    <div class="timeline-content">
                        <h3 class="timeline-day">Friday, Sept 13, 2024</h3>
                        <p class="timeline-program">
                            <v-icon color="cyan darken-2" class="mx-3">mdi-book-open-page-variant-outline</v-icon>Prayer Meeting
                        </p>
                        <span class="timeline-time">
                            <v-icon color="cyan darken-2" class="mx-3">mdi-clock-time-four-outline</v-icon>1800hrs - 2000hrs
                        </span>
                    </div>
                </div>

                <!-- Sunday -->
                <div class="timeline-item">
                    <div class="timeline-dot">
                        <v-icon color="white">mdi-calendar-month</v-icon>
                    </div>
                    <div class="timeline-content">
                        <h3 class="timeline-day">Sunday, Sept 15, 2024</h3>
                        <p class="timeline-program">
                            <v-icon color="cyan darken-2" class="mx-3">mdi-book-open-page-variant-outline</v-icon>Main Service
                        </p>
                        <span class="timeline-time">
                            <v-icon color="cyan darken-2" class="mx-3">mdi-clock-time-four-outline</v-icon>0700hrs (ENG), 0930hrs (ENG), 1130hrs (SWA)
                        </span>
                    </div>
                </div>
            </div>

            <!-- Show Calendar Button -->
            <div class="text-center mt-4">
                <v-btn color="primary" flat rounded="xl" @click="showCalendar = !showCalendar">
                    <v-icon left>mdi-calendar-month</v-icon> View all services
                </v-btn>
            </div>

            <!-- Calendar of Events -->
            <v-expand-transition>
                <v-row v-if="showCalendar" class="mt-4" justify="center">
                    <v-col cols="12" md="8">
                        <v-calendar v-model="selectedDate" color="cyan darken-2" events="events" event-color="green" :show-week="true" />
                    </v-col>
                </v-row>
            </v-expand-transition>
        </v-col>
    </v-row>
</v-container>

<v-container>
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
        <p class="service-descripton text-cyan text-bold">
            1 Peter 4:10 (NIV)
        </p>
    </div>
    <!-- Get Involved Cards -->
    <v-row>
        <!-- Construction Activities Card -->
        <v-col cols="12" md="4">
            <v-hover v-slot="{ isHovering, props }">
                <v-card class="activity-card" rounded="lg" v-bind="props" :elevation="isHovering ? 24 : 6">
                    <v-img src="@/assets/construction.webp" height="300px" cover>
                        <v-chip class="chip-overlay text-white" variant="flat" color="cyan darken-2" >
                            Construction
                        </v-chip>
                    </v-img>
                    <v-card-title>
                        <v-icon class="mx-4">mdi-hammer</v-icon>
                        <span class="title">Construction Activities</span>
                    </v-card-title>
                    <v-card-text>
                        Join our efforts to maintain and improve our church facilities. Your skills and time are valuable!
                    </v-card-text>
                    <v-card-actions class="d-flex flex-column justify-end">
                        <v-spacer></v-spacer>
                        <v-btn text color="cyan darken-2" class="text-none" append-icon="mdi-chevron-double-right">Get Involved</v-btn>
                    </v-card-actions>
                </v-card>
            </v-hover>
        </v-col>

        <!-- Discipleship Classes Card -->
        <v-col cols="12" md="4">
            <v-hover v-slot="{ isHovering, props }">
                <v-card class="activity-card" rounded="lg" v-bind="props" :elevation="isHovering ? 24 : 6">
                    <v-img src="@/assets/discipleship.webp" height="300px" cover>
                        <v-chip class="chip-overlay text-white" variant="flat" color="cyan darken-2" >
                            Discipleship Classes
                        </v-chip></v-img>
                    <v-card-title>
                        <v-icon class="mx-4">mdi-book-open-outline</v-icon>
                        <span class="title">Discipleship Classes</span>
                    </v-card-title>
                    <v-card-text>
                        Participate in our discipleship classes to grow in your faith and understanding of the scriptures.
                    </v-card-text>
                    <v-card-actions class="d-flex flex-column justify-end">
                        <v-spacer></v-spacer>
                        <v-btn text color="cyan darken-2" class="text-none" append-icon="mdi-chevron-double-right">Join a Class</v-btn>
                    </v-card-actions>
                </v-card>
            </v-hover>
        </v-col>

        <!-- Ministries Card -->
        <v-col cols="12" md="4">
            <v-hover v-slot="{ isHovering, props }">
                <v-card class="activity-card" rounded="lg" v-bind="props" :elevation="isHovering ? 24 : 6">
                    <!-- Card image with chip overlay -->
                    <v-img src="@/assets/ministry.jpg" height="300px" cover class="position-relative">
                        <!-- Chip with text "Ministry" -->
                        <v-chip class="chip-overlay text-white" variant="flat" color="cyan darken-2" >
                            Ministries
                        </v-chip>
                    </v-img>

                    <v-card-title>
                        <v-icon class="mx-4">mdi-church</v-icon>
                        <span class="title">In Ministries</span>
                    </v-card-title>

                    <v-card-text>
                        Get involved with various ministries to serve and support our community. Discover how you can make a difference!
                    </v-card-text>

                    <v-card-actions class="d-flex flex-column justify-end">
                        <v-spacer></v-spacer>
                        <v-btn text color="cyan darken-2" class="text-none text-bold" append-icon="mdi-chevron-double-right">
                            Explore Ministries
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-hover>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            latestVideo: null,
            toggle: null,
            showCalendar: false,
            selectedDate: new Date(),
            events: [{
                    name: "Bible Study",
                    start: "2024-09-10 18:00",
                    end: "2024-09-10 20:00"
                },
                {
                    name: "Midweek Service",
                    start: "2024-09-11 18:00",
                    end: "2024-09-11 20:00"
                },
                {
                    name: "Prayer Meeting",
                    start: "2024-09-13 18:00",
                    end: "2024-09-13 20:00"
                },
                {
                    name: "Main Service",
                    start: "2024-09-15 07:00",
                    end: "2024-09-15 11:30"
                },
            ],
        };
    },
    mounted() {
        this.fetchLatestVideo();
    },
    methods: {
        async fetchLatestVideo() {
            try {
                const apiKey = 'YOUR_YOUTUBE_API_KEY'; // Replace with your API key
                const channelId = 'YOUR_CHANNEL_ID'; // Replace with your channel ID
                const response = await axios.get(
                    `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=1`
                );

                if (response.data.items.length > 0) {
                    const video = response.data.items[0];
                    this.latestVideo = {
                        videoId: video.id.videoId,
                        title: video.snippet.title,
                    };
                }
            } catch (error) {
                console.error('Failed to fetch the latest video:', error);
            }
        },
    },
};
</script>

<style scoped>
.text-center {
    text-align: center;
}

.worship-section {
    margin-top: 10px;
    background-color: #E0F7FA;
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
    height: 200px;
    /* Increased height */
    width: 100%;
    /* Ensure it uses full width available */
    max-width: 400px;
    /* Increased max-width */
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
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
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
    background-color: #ff4b14;
    /* Change to your preferred color */
    color: white;
}

.custom-btn-right {
    background-color: #020202;
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
    border-left: 3px solid #00acc1;
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
    background-color: #00acc1;
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
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.timeline-day {
    font-size: 18px;
    font-weight: bold;
    margin: 0 0 5px;
    color: #00acc1;
}

.timeline-program {
    font-size: 16px;
    color: #333;
    margin: 0;
}

.timeline-time {
    display: block;
    font-size: 14px;
    color: #666;
    margin-top: 5px;
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
</style>
