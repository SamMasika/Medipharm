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