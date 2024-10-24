<template>
<AppBar />
<Loader :loading="loading" v-if="loading" />
<v-container fluid class="back-container">
    <v-row justify="center" class="my-8">
        <v-col cols="12" md="7">
            <div>
                <div class="header-section">
                    <div class="image-stack d-flex">
                        <v-img :aspect-ratio="1" class="stacked-image bg-white" src="@/assets/mtokambali.jpg" width="70%" height="80%" cover></v-img>
                        <v-img :aspect-ratio="1" class="stacked-image bg-white" src="@/assets/mtokambali.jpg" width="100%" height="100%" cover></v-img>
                    </div>
                    <div class="about-container">
                        <h2 class="my-">Pillar of <i class="text-color">Truths</i> </h2>
                        <p class="description my-8">
                          The Bible is our all-sufficient rule for faith and practice. This Pillars of Truth is intended simply as a basis of fellowship among us (i.e., that we all speak the same thing, 1 Corinthians 1:10; Acts 2:42). The phraseology employed in this Statement is not inspired nor contended for, but the truth set forth is held to be essential to a full-gospel ministry. No claim is made that it covers all Biblical truth, only that it covers our need as to these fundamental doctrines.
                        </p>
                    </div>
                </div>
            </div>
        </v-col>
    </v-row>
</v-container>
<v-container fluid>
    <v-row justify="center">
        <v-col cols="12" md="8">
            <v-alert v-model="alert" border="start" class="text-color  belief-container mx-8 " variant="tonal">
                <v-row cl>
                    <v-col cols md="6">
                        <h3 class="my-5">1. The <i> Scripture inspired</i> </h3>
                        <p>
                            The Scriptures, both the Old and New Testaments, are verbally inspired of God and are the revelation of God to man, the infallible, authoritative rule of faith and conduct.
                            2 Timothy 3:15-17 · 1 Thessalonians 2:13 · 2 Peter 1:21
                        </p>

                    </v-col>
                    <v-col cols md="6">
                        <h3 class="my-5">2. The <i> One True God</i> </h3>
                        <p>
                            The one true God has revealed Himself as the eternally self-existent “I AM,” the Creator of heaven and earth and the Redeemer of mankind. He has further revealed Himself as embodying the principles of relationship and association as Father, Son and Holy Spirit.
                            Deuteronomy 6:4 · 2 Corinthians 13:14 · Matthew 28:19 · Mark 12:29
                        </p>

                    </v-col>
                </v-row>
            </v-alert>
        </v-col>
    </v-row>

    <v-row justify="center">
        <v-col cols="12" md="8">
            <v-row class="belief-container">
                <v-col cols md="6">
                    <h3 class="my-5">3. The <i> Deity of The Lord Jesus Christ</i> </h3>
                    <p>
                        We believe in the Virgin Birth, Sinless Life, Miraculous Ministry, Substitutionary Atoning Death, Bodily Resurrection, Triumphant Ascension and Abiding Intercession of the Lord Jesus Christ and in His personal, visible, bodily return in power and glory as the blessed hope of all believers
                    </p>
                    <p>
                      Isaiah 7:14 · Matthew 1:23 · Hebrews 7:25-26 · 1 Peter 2:22 · Acts 2:22 · Acts 10:38 · 2 Corinthians 5:21 · Hebrews 9:12 · Luke 24:39 · 1 Corinthians 15:4 · Acts 1:9 · Ephesians 4:8-10 · Romans 8:34 · 1 Corinthians 15:22-24, 51-57 · 1 Thessalonians 4:13-18 · Revelation 20:1-6
                    </p>

                </v-col>
                <v-col cols md="6">
                    <h3 class="my-5"> 4. The <i>Fall of Man</i> </h3>
                    <p>
                        We believe in the fall of man, who was created pure and upright, but fell by voluntary transgression. Isaiah 7:14 · Matthew 1:23 · Hebrews 7:25-26 · 1 Peter 2:22 · Acts 2:22 · Acts 10:38 · 2 Corinthians 5:21 · Hebrews 9:12 · Luke 24:39 · 1 Corinthians 15:4 · Acts 1:9 · Ephesians 4:8-10 · Romans 8:34 · 1 Corinthians 15:22-24, 51-57 · 1 Thessalonians 4:13-18 · Revelation 20:1-6
                        Genesis 1:26-31 · Genesis 3:1-7 · Romans 5:12-21
                    </p>

                </v-col>
            </v-row>

        </v-col>
    </v-row>
    <v-row justify="center">
        <v-col cols="12" md="8">
            <v-alert v-model="alert" border="start" class="text-color  belief-container mx-8 " variant="tonal">
                <v-row cl>
                    <v-col cols md="6">
                        <h3 class="my-5">5. The <i> Salvation of Man</i> </h3>
                        <p>
                          We believe in salvation through faith in Christ, who, according to the Scriptures, died for our sins, was buried and was raised from the dead on the third day, and that through His Blood we have Redemption
                          Titus 2:11 · Titus 3:5-7 · Romans 10:8-15 · 1 Corinthians 15:3-4
                        </p>
                        <p>
                          This experience is also known as the new birth, and is an instantaneous and complete operation of the Holy Spirit upon initial faith in the Lord Jesus Christ.
                          John 3:5-6 · James 1:18 · 1 Peter 1:23 · 1 John 5:1
                        </p>

                    </v-col>
                    <v-col cols md="6">
                        <h3 class="my-5">6. The <i> Ordinances of The Church</i> </h3>
                        <p>
                          We believe that all who have truly repented and believed in Christ as Lord and Savior are commanded to be baptized by immersion in water.
                          Matthew 28:19 · Acts 10:47-48 · Acts 2:38-39
                        </p>

                    </v-col>
                </v-row>
            </v-alert>
        </v-col>
    </v-row>

    <v-row justify="center">
        <v-col cols="12" md="8">
            <v-row class="belief-container">
                <v-col cols md="6">
                    <h3 class="my-5">7. Baptism <i> in The Holy Spirit</i> </h3>
                    <p>
                      We believe in the baptism in the Holy Spirit as an inducement of the believer with power for service, the essential, biblical evidence of which is the speaking with other tongues as the Spirit gives utterance.
                      Acts 1:4-5, 8 · Acts 2:4 · Acts 10:44-46 · Acts 11:14-16 · Acts 19:6
                    </p>
                </v-col>
                <v-col cols md="6">
                    <h3 class="my-5"> 8. The initial physical evidence of the baptism in The Holy Spirit </h3>
                    <p>
                      We believe in the operation of the gifts of the Holy Spirit and the gifts of Christ in the Church today.
                      1 Corinthians 12:4-11 · 1 Corinthians 12:28 · Ephesians 4:7-16
                    </p>

                </v-col>
            </v-row>

        </v-col>
    </v-row>
    <v-row justify="center">
        <v-col cols="12" md="8">
            <v-alert v-model="alert" border="start" class="text-color  belief-container mx-8 " variant="tonal">
                <v-row cl>
                    <v-col cols md="6">
                        <h3 class="my-5">9. The <i> Sanctification</i> </h3>
                        <p>
                          We believe in holiness of life and conduct in obedience to the command of God.
Hebrews 12:14 · 1 Peter 1:14-16 · 1 Thessalonians 5:23 · 1 John 2:6
                        </p>

                    </v-col>
                    <v-col cols md="6">
                        <h3 class="my-5">10. The Church <i> and its mission</i> </h3>
                        <p>
                          We believe the church has a mission to seek and save all who are lost in sin.
                          Acts 1:8 · Matthew 28:19-20 · Mark 16:15-16
                        </p>

                    </v-col>
                </v-row>
            </v-alert>
        </v-col>
    </v-row>

    <v-row justify="center">
        <v-col cols="12" md="8">
            <v-row class="belief-container">
                <v-col cols md="6">
                    <h3 class="my-5">11. The <i>ministry </i> </h3>
                    <p>
                      We believe a divinely called and biblically ordained leadership ministry serves the church.
                      Mark 16:15-20 · John 4:23-24 · Ephesians 4:11-16 · Psalms 112:9
                    </p>

                </v-col>
                <v-col cols md="6">
                    <h3 class="my-5">12. Divine <i>healing</i> </h3>
                    <p>
                      We believe that deliverance from sickness, by Divine Healing is provided in the Atonement
                      Isaiah 53:4-5 · Matthew 8:16-17 · James 5:13-16
                    </p>

                </v-col>
            </v-row>

        </v-col>
    </v-row>
    <v-row justify="center">
        <v-col cols="12" md="8">
            <v-alert v-model="alert" border="start" class="text-color  belief-container mx-8 " variant="tonal">
                <v-row cl>
                    <v-col cols md="6">
                        <h3 class="my-5">13. The <i> blessed hope</i> </h3>
                        <p>
                          We believe in the bodily resurrection of all men, the everlasting conscious bliss of all who truly believe in our Lord Jesus Christ and the everlasting conscious punishment of all whose names are not written in the Book of Life.
                        </p>
                        <p>
                          Daniel 12:2-3 · John 5:28-29 · Matthew 25:46 · 1 Corinthians 15:22-24 · 1 Thessalonians 1:9 · Revelation 20:10-15
                        </p>

                    </v-col>
                    <v-col cols md="6">
                        <h3 class="my-5">14. The <i> millenial reign of Christ</i> </h3>
                        <p>
                          We believe the second coming of Christ includes the rapture of the saints, which is our blessed hope, followed by the visible return of Christ with His saints to reign on earth for one thousand years.
                          Zechariah 14:5 · Matthew 24:27 · Matthew 24:30 · Revelation 1:7 · Revelation 19:11-14 · Revelation 20:1-6
                        </p>

                    </v-col>
                </v-row>
            </v-alert>
        </v-col>
    </v-row>

    <v-row justify="center">
        <v-col cols="12" md="8">
            <v-row class="belief-container">
                <v-col cols md="6">
                    <h3 class="my-5">15. The<i> final judgement</i> </h3>
                    <p>
                      We believe there will be a final judgment in which the wicked dead will be raised and judged according to their works.
                    </p>
                    <p>
                      Matthew 25:46 · Mark 9:43-48 · Revelation 19:20 · Revelation 20:11-15 · Revelation 21:8
                    </p>

                </v-col>
                <v-col cols md="6">
                    <h3 class="my-5"> 16. <i>The new heavens and the new earth</i> </h3>
                    <p>
                      “We, according to His promise, look for new heavens and a new earth wherein dwelleth righteousness.”
                      2 Peter 3:13 · Revelation 21 · Revelation 2
                    </p>

                </v-col>
            </v-row>

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

}
</script>

<style>
.belief-container {
    padding: 40px 60px;
}

.belief-container p {
    text-align: justify;
    line-height: 2.2; /* Adjusts the line spacing within paragraphs */
    margin-bottom: 20px; /* Adds space between paragraphs */
}

.belief-container p br {
    display: block !important;
    margin-bottom: 20px !important;
}
.about-container {
    padding: 0px 20px;
}

.about-container p {
    text-align: justify;
    line-height: 2.2; /* Adjusts the line spacing within paragraphs */
    margin-bottom: 20px; /* Adds space between paragraphs */
}

.about-container p br {
    display: block !important;
    margin-bottom: 20px !important;
}
</style>
