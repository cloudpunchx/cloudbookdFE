<template>
    <div>
        <SignedInHeader />

        <!-- WORKING HERE WITH NEW STYLES -->
        <div class="pageContent">
            <v-row>
                <v-col lg="4">
                    <!-- Currently Reading Container -->
                    <CurrentlyReading />
                </v-col>

                <v-col lg="4">
                    <div class="arch-container">
                        <v-img
                            src="../assets/ghostieReading.png"
                            class="arch-image"
                        ></v-img>
                        <ReadingChallenge class="readingChallengeContainer" />
                    </div>
                </v-col>

                <v-col lg="4">
                    <!-- Recently Read Container -->
                    <RecentlyRead />
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="auto">
                    <!-- To Be Read Container -->
                    <ToBeReadPreview />
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
    import SignedInHeader from "@/components/SignedInHeader.vue";
    import CurrentlyReading from "@/components/CurrentlyReading.vue";
    import RecentlyRead from "@/components/RecentlyRead.vue";
    import ReadingChallenge from "@/components/ReadingChallenge.vue";
    import ToBeReadPreview from "@/components/ToBeReadPreview.vue";

    export default {
        name: "HomePage",
        components: {
            SignedInHeader,
            CurrentlyReading,
            RecentlyRead,
            ReadingChallenge,
            ToBeReadPreview,
        },
    };
</script>

<style scoped>
    .pageContent {
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        justify-content: center; /* Vertical Centering */
        align-items: center; /* Horizontal Centering */
        height: 100%; /* Adjust as needed */
    }
    .arch-image {
        width: 150px; /* Adjust the width as needed */
        height: auto; /* Maintain aspect ratio */
    }

    .arch-container,
    .arch-image {
        border-top-left-radius: 50% 30%; /* Adjust the percentage as needed */
        border-top-right-radius: 50% 30%; /* Adjust the percentage as needed */
    }

    @media (min-width: 500px) {
    }

    @media (min-width: 1000px) {
        .pageContent {
            margin-top: 20px;
        }
        .arch-image {
            width: 400px; /* Adjust the width as needed */
            height: auto; /* Maintain aspect ratio */
        }
        .arch-container {
            max-width: 400px;
        }
    }
</style>
