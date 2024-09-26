<template>
<Loader :loading="loading" v-if="loading" />
<AppBar />
<v-container class="my-8 sermon-container" fluid>
    <v-row class="d-flex" justify="center">
        <v-col cols="12" md="6" >
    <div class="text-center my-8">
        <p class="sermon-title"> Online <i class="text-color"> worship experience</i>  </p>
    </div>
    <div class="my-1">
    <p class="text-center justify-text">Watch your favourite sermons or catch up on the ones that you missed. Browse our archive and watch videos on any of your devices.</p>
</div>

</v-col>
    </v-row>
</v-container>
<v-container fluid>
    <div class="text-center">
        <h2 class="sermon-title"> Recent <i class="text-color"> Broadcasts</i> </h2>
    </div>
    <v-row class="d-flex" justify="center">
        <!-- Main Video Section -->
        <v-col cols="12" md="8" v-if="selectedVideo">
            <v-card class="selected-video-card" flat rounded="lg">
                <div class="videos-container">
                    <iframe class="video-frame" :src="videoUrl" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            </v-card>
        </v-col>

        <!-- Video List Section (4 of 12 grid when video selected) -->
        <v-col cols="12" md="4" v-if="selectedVideo">
            <v-row class="d-flex" justify="center">
                <template v-if="paginatedVideos.length > 0">
                    <v-col cols="12" md="6" v-for="(video, index) in paginatedVideos" :key="index" class="mb-4">
                        <v-card flat max-width="350" class="video-card" @click="openVideo(video)">
                            <v-img :src="video.snippet.thumbnails.medium.url" aspect-ratio="16/9" class="thumbnail"></v-img>
                        </v-card>
                    </v-col>
                </template>
                <template v-else>
                    <v-col cols="12">
                        <v-alert type="info">No videos found.</v-alert>
                    </v-col>
                </template>
            </v-row>
        </v-col>

        <!-- Main Video List Section -->
        <v-col cols="12" md="8" v-if="!selectedVideo">
            <v-row class="d-flex" justify="center">
                <template v-if="paginatedVideos.length > 0">
                    <v-col cols="12" md="4" v-for="(video, index) in paginatedVideos" :key="index" class="mb-4">
                        <v-card flat max-width="350" class="video-card" @click="openVideo(video)">
                            <v-img :src="video.snippet.thumbnails.medium.url" aspect-ratio="16/9" class="thumbnail"></v-img>
                        </v-card>
                        <v-card-subtitle class="mt-2 text-black">{{ video.snippet.title }}</v-card-subtitle>
                    </v-col>
                </template>
                <template v-else>
                    <v-col cols="12">
                        <v-alert color="#A82228" variant="tonal" border="start">No videos found.</v-alert>
                    </v-col>
                </template>
            </v-row>
        </v-col>

    </v-row>

    <!-- Pagination Section (always visible) -->
    <v-row v-if="paginatedVideos.length > 0">
        <v-col cols="12" class="d-flex justify-center">
            <v-pagination v-model="currentPage" rounded="circle" :length="totalPages" @input="changePage" total-visible="2"></v-pagination>
        </v-col>
    </v-row>
</v-container>
<Footer v-if="paginatedVideos.length > 0" class="footer" />
</template>

<script>
import Footer from '@/components/Layout/Footer.vue';
import Loader from '@/components/Layout/Loader.vue';
import AppBar from '@/components/Layout/AppBar.vue';

export default {
    components: {
        AppBar,
        Footer,
        Loader,
    },
    data() {
        return {
            apiKey: 'AIzaSyAz1tlEhLzaw9eifLlq3hY1CBS2R-1Vx4Q', // Replace with your actual API key
            channelId: 'UCk6tDX_p3ZskmFygDUiAQmQ', // Replace with your actual Channel ID
            playlistId: '', // Will store the playlist ID for the channel uploads
            videos: [], // Array to hold the list of fetched videos
            currentPage: 1, // Track current page
            videosPerPage: 6, // Limit to 9 videos per page
            selectedVideo: null, // To hold the clicked video details
        };
    },
    computed: {
        // Calculate total number of pages
        totalPages() {
            return Math.ceil(this.videos.length / this.videosPerPage);
        },
        // Get videos for the current page
        paginatedVideos() {
            const start = (this.currentPage - 1) * this.videosPerPage;
            const end = start + this.videosPerPage;
            return this.videos.slice(start, end);
        },
        // Construct video URL for playback with autoplay enabled
        videoUrl() {
            return this.selectedVideo ? `https://www.youtube.com/embed/${this.selectedVideo.snippet.resourceId.videoId}?autoplay=1` : '';
        },
    },
    methods: {
        // Fetch the Uploads Playlist ID for the channel
        async fetchUploadsPlaylist() {
            try {
                const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${this.channelId}&key=${this.apiKey}`;
                const response = await fetch(channelUrl);
                const data = await response.json();
                if (data.items && data.items.length > 0) {
                    this.playlistId = data.items[0].contentDetails.relatedPlaylists.uploads;
                    await this.fetchAllVideos(); // Fetch videos after getting the playlistId
                } else {
                    console.error('No channel data found.');
                }
            } catch (error) {
                console.error('Error fetching playlist ID:', error);
            }
        },

        // Fetch all videos from the playlist
        async fetchAllVideos(pageToken = '') {
            try {
                const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${this.playlistId}&maxResults=50&pageToken=${pageToken}&key=${this.apiKey}`;
                const response = await fetch(playlistUrl);
                const data = await response.json();
                if (data.items && data.items.length > 0) {
                    this.videos = [...this.videos, ...data.items]; // Append new videos to the array
                    // If there is a nextPageToken, fetch more videos
                    if (data.nextPageToken) {
                        await this.fetchAllVideos(data.nextPageToken);
                    }
                } else {
                    console.error('No videos found.');
                }
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        },

        // Method to handle page change
        changePage(page) {
            this.currentPage = page;
        },

        // Open the video in the selected section
        openVideo(video) {
            this.selectedVideo = video;
        },

        // Reset video selection
        resetSelection() {
            this.selectedVideo = null;
        },
    },
    mounted() {
        this.fetchUploadsPlaylist();
    },
};
</script>

<style scoped>
.video-card {
    border-radius: 12px;
    border: 1px solid #e0e0e0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.sermon-container {
    position: relative;
    background: #E0CFC2;
    /* Slightly opaque white background */
    padding: 20px 40px;
    margin-top: 0;
    overflow: hidden;
    height: 300px;
}

.thumbnail {
    object-fit: cover;
    border-radius: 12px 12px 0 0;
}

.videos-container {
    position: relative;
    padding-bottom: 56.25%;
    /* 16:9 aspect ratio */
    height: 0;
    overflow: hidden;
}

.videos-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.selected-video-card {
    margin-bottom: 20px;
    padding: 0px;
    border: 1.5px solid #e9e7e7;
}
.sermon-title {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 20px;
}
.text-color {
    color:  #A82228;
}
.justify-text {
    text-align: justify;
}


</style>
